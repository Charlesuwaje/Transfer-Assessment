import { Request, Response, NextFunction } from "express";
// import { TransferService } from "../services/ transfer.service";
import { TransferService } from "../services/transfer.service";

export async function postTransfer(req: Request, res: Response, next: NextFunction) {
  try {
    const body = (req as any).validatedBody ?? req.body;

    const result = await TransferService.transfer(body);

    if (result.status === "PENDING") return res.status(202).json(result);
    if (result.status === "FAILED") return res.status(409).json(result);

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}
