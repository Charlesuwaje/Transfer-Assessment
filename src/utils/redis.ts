

import Redis from "ioredis";
import { randomUUID } from "crypto";

const enabled = process.env.USE_REDIS_IDEMPOTENCY_LOCK === "true";
export const redis = enabled && process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function acquireIdempotencyLock(key: string, ttlMs = 15000) {
    if (!redis) return { ok: true as const, token: "no-redis" };

    const token = randomUUID();
    const res = await redis.set(`idem:${key}`, token, "PX", ttlMs, "NX");
    return { ok: res === "OK", token };
}

const RELEASE_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;

export async function releaseIdempotencyLock(key: string, token: string) {
    if (!redis) return;
    await redis.eval(RELEASE_LUA, 1, `idem:${key}`, token);
}
