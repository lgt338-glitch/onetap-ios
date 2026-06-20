// GET /firmware/{identifier}
//
// 사용자가 어떤 iPhone/iPad 모델을 가지고 있든, 그 모델의
// "현재 Apple 이 서명 중인 IPSW 펌웨어 직링크" 목록을 돌려준다.
// 데스크탑 앱은 이 응답의 url 을 그대로 받아 Apple CDN 에서
// 직접 다운로드하므로 우리 인프라는 트래픽을 거의 쓰지 않는다.
//
// 캐시: Cloudflare edge cache 1시간.

export const onRequest = async ({ params, request, waitUntil }) => {
  const id = params.identifier;
  if (!/^[A-Za-z0-9,]+$/.test(id)) {
    return Response.json({ error: "invalid identifier" }, { status: 400 });
  }

  const cacheKey = new Request(request.url, request);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let upstream;
  try {
    upstream = await fetch(`https://api.ipsw.me/v4/device/${id}?type=ipsw`, {
      headers: { "User-Agent": "onetap-ios/0.1 (+cloudflare-pages)" },
      cf: { cacheEverything: true, cacheTtl: 3600 },
    });
  } catch {
    return Response.json({ error: "upstream unreachable" }, { status: 502 });
  }

  if (!upstream.ok) {
    return Response.json({ error: `upstream ${upstream.status}` }, { status: 502 });
  }

  const data = await upstream.json();
  const signed = (data.firmwares || []).filter((f) => f.signed);

  const body = {
    device: { identifier: data.identifier, name: data.name },
    signed: signed.map((f) => ({
      version: f.version,
      buildid: f.buildid,
      url: f.url,                 // Apple CDN 직링크
      filesize: f.filesize,
      sha1: f.sha1sum,
      md5: f.md5sum,
      released: f.releasedate,
    })),
    upstream: "api.ipsw.me",
    generatedAt: new Date().toISOString(),
  };

  const response = Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
