import request from "supertest";
import app from "../src/app";
import { sequelize } from "../src/db/sequelize";
import { Wallet } from "../src/models/Wallet";
import { TransactionLog } from "../src/models/TransactionLog";

const FROM_ID = "11111111-1111-1111-1111-111111111111";
const TO_ID = "22222222-2222-2222-2222-222222222222";

beforeAll(async () => {
  await sequelize.authenticate();
});

beforeEach(async () => {
  await TransactionLog.destroy({ where: {} });
  await Wallet.destroy({ where: {} });

  await Wallet.create({
    id: FROM_ID,
    userId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    currency: "NGN",
    balance: "1000.00"
  });

  await Wallet.create({
    id: TO_ID,
    userId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    currency: "NGN",
    balance: "0.00"
  });
});

afterAll(async () => {
  await sequelize.close();
});

test("idempotency: same key twice applies transfer once (double tap)", async () => {
  const payload = {
    fromWalletId: FROM_ID,
    toWalletId: TO_ID,
    amount: "10.00",
    idempotencyKey: "doubletap-0001"
  };

  const r1 = await request(app).post("/transfer").send(payload);
  expect([200, 202]).toContain(r1.status);

  const r2 = await request(app).post("/transfer").send(payload);
  expect([200, 202]).toContain(r2.status);

  const logs = await TransactionLog.findAll({
    where: { idempotencyKey: "doubletap-0001" }
  });

  expect(logs.length).toBe(1);

  const from = await Wallet.findByPk(FROM_ID);
  const to = await Wallet.findByPk(TO_ID);

  expect(Number(from?.balance)).toBe(990);
  expect(Number(to?.balance)).toBe(10);
});

test("race: two concurrent requests with same key still applies transfer once", async () => {
  const payload = {
    fromWalletId: FROM_ID,
    toWalletId: TO_ID,
    amount: "10.00",
    idempotencyKey: "doubletap-0002"
  };

  const [r1, r2] = await Promise.all([
    request(app).post("/transfer").send(payload),
    request(app).post("/transfer").send(payload)
  ]);

  expect([200, 202]).toContain(r1.status);
  expect([200, 202]).toContain(r2.status);

  const logs = await TransactionLog.findAll({
    where: { idempotencyKey: "doubletap-0002" }
  });

  expect(logs.length).toBe(1);

  const from = await Wallet.findByPk(FROM_ID);
  const to = await Wallet.findByPk(TO_ID);

  expect(Number(from?.balance)).toBe(990);
  expect(Number(to?.balance)).toBe(10);
});
