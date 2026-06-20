// POST /license/verify   body: { key: string, deviceId?: string }
//
// Cloudflare KV 네임스페이스 "LICENSES" 를 바인딩하면 실제 검증이 동작한다.
// 바인딩 방법: Cloudflare 대시보드 → Pages 프로젝트 → Settings → Functions
//             → KV namespace bindings → Variable name: LICENSES

export const onRequest = async ({ request, env }) => {
  if (request.method !== "POST") {
    return new Response("method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ valid: false, error: "invalid json" }, { status: 400 });
  }

  const { key, deviceId } = body || {};
  if (typeof key !== "string" || key.length < 8) {
    return Response.json({ valid: false, error: "missing key" }, { status: 400 });
  }

  if (!env.LICENSES) {
    return Response.json({
      valid: false,
      error: "license storage not configured (bind KV namespace LICENSES)",
    });
  }

  const record = await env.LICENSES.get(key, "json");
  if (!record) {
    return Response.json({ valid: false, error: "unknown key" });
  }

  if (record.expiresAt && Date.now() > record.expiresAt) {
    return Response.json({ valid: false, error: "expired" });
  }

  if (record.maxDevices && deviceId) {
    const devices = new Set(record.devices || []);
    if (!devices.has(deviceId)) {
      if (devices.size >= record.maxDevices) {
        return Response.json({ valid: false, error: "device limit reached" });
      }
      devices.add(deviceId);
      record.devices = [...devices];
      await env.LICENSES.put(key, JSON.stringify(record));
    }
  }

  return Response.json({
    valid: true,
    plan: record.plan ?? "unknown",
    expiresAt: record.expiresAt ?? null,
  });
};
