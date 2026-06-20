// GET /health — 배포 후 살아있는지 확인용.
export const onRequest = () =>
  Response.json({ ok: true, ts: Date.now(), service: "onetap-ios" });
