
import { v4 as uuidv4 } from "uuid";
import { sequelize, Wallet, TransactionLog, LedgerEntry } from "../db";
import { D } from "../utils/money";
// import { acquireIdempotencyLock, releaseIdempotencyLock } from "../utils/redis";
import { acquireIdempotencyLock, releaseIdempotencyLock } from "../utils/redis";


type TransferInput = {
  fromWalletId: string;
  toWalletId: string;
  amount: string;
  idempotencyKey: string;
};

type TransferResult =
  | { id: string; status: "SUCCESS" }
  | { id: string; status: "PENDING"; reason?: string }
  | { id: string; status: "FAILED"; reason?: string };

export class TransferService {
  static async transfer(input: TransferInput): Promise<TransferResult> {
    const { fromWalletId, toWalletId, amount, idempotencyKey } = input;

    const amt = D(amount);
    if (amt.lte(0))
     return { id: "N/A", status: "FAILED", reason: "amount must be > 0" };
    if (fromWalletId === toWalletId)
     return { id: "N/A", status: "FAILED", reason: "you can not transfer to the same wallet" };

    const lock = await acquireIdempotencyLock(idempotencyKey);
    if (!lock.ok)
   return { id: "N/A", status: "PENDING", reason: "duplicate in-flight" };

    try {
      return await sequelize.transaction(async (t) => {
        const existing = await TransactionLog.findOne({
          where: { idempotencyKey },
          transaction: t,
          lock: t.LOCK.UPDATE
        });

        if (existing) {
          if (existing.status === "SUCCESS")
           return { id: existing.id, status: "SUCCESS" as const };
          if (existing.status === "PENDING")
           return { id: existing.id, status: "PENDING" as const };
          return {
            id: existing.id,
            status: "FAILED" as const,
            reason: existing.errorMessage ?? undefined
          };
        }

        const log = await TransactionLog.create(
          {
            id: uuidv4(),
            idempotencyKey,
            fromWalletId,
            toWalletId,
            amount: amt.toString(),
            status: "PENDING",
            errorMessage: null
          },
          { transaction: t }
        );

        const [a, b] = [fromWalletId, toWalletId].sort();
        const wallets = await Wallet.findAll({
          where: { id: [a, b] },
          transaction: t,
          lock: t.LOCK.UPDATE
        });

        const from = wallets.find((w) => w.id === fromWalletId);
        const to = wallets.find((w) => w.id === toWalletId);

        if (!from || !to) 
        return await this.failAndReturn(log.id, "Wallet not found", t);
        if (from.currency !== to.currency)
         return await this.failAndReturn(log.id, "Currency mismatch", t);

        const fromBal = D(from.balance);
        if (fromBal.lt(amt)) return await this.failAndReturn(log.id, "Insufficient funds", t);

        await LedgerEntry.bulkCreate(
          [
            {
              id: uuidv4(),
              transactionLogId: log.id,
              walletId: from.id,
              direction: "DEBIT",
              amount: amt.toString()
            },
            {
              id: uuidv4(),
              transactionLogId: log.id,
              walletId: to.id,
              direction: "CREDIT",
              amount: amt.toString()
            }
          ],
          { transaction: t }
        );

        from.balance = fromBal.minus(amt).toString();
        to.balance = D(to.balance).plus(amt).toString();
        await from.save({ transaction: t });
        await to.save({ transaction: t });

        log.status = "SUCCESS";
        await log.save({ transaction: t });

        return { id: log.id, status: "SUCCESS" as const };
      });
    } finally {
      await releaseIdempotencyLock(idempotencyKey, lock.token);
    }
  }

  private static async failAndReturn(logId: string, reason: string, t: any): Promise<TransferResult> {
    await TransactionLog.update(
      { status: "FAILED", errorMessage: reason },
      { where: { id: logId }, transaction: t }
    );
    return { id: logId, status: "FAILED", reason };
  }
}
