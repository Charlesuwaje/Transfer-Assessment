import Joi from "joi";

export const transferSchema = Joi.object({
  fromWalletId: Joi.string().uuid().required(),
  toWalletId: Joi.string().uuid().required(),
  amount: Joi.string().required(),
  idempotencyKey: Joi.string().min(8).required()
});
