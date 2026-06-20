// GET /download/{product}/{platform}
//
// 흐름:
//   1. 슬러그 → release 태그 prefix 매핑 확인
//   2. GitHub API 로 최신 release 찾기
//   3. 플랫폼에 맞는 .exe / .dmg / .AppImage 등 에셋 찾기
//   4. browser_download_url 로 302 redirect → 유저는 GitHub Releases CDN 에서 직접 다운로드
//
// 캐시: 5분 (새 release 올리고 최대 5분 후 반영)

import { PLATFORM_PATTERNS, findLatestRelease } from "../../_shared/products.js";

export const onRequest = async ({ params, waitUntil, request }) => {
  const patterns = PLATFORM_PATTERNS[params.platform];
  if (!patterns) {
    return new Response("platform not supported (use: win, mac, linux)", { status: 400 });
  }

  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const { release, product, error, status } = await findLatestRelease(params.product);
  if (error) return notReleasedYet(product?.name ?? params.product, error);

  const asset = (release.assets || []).find((a) =>
    patterns.some((re) => re.test(a.name))
  );
  if (!asset) {
    return notReleasedYet(
      product.name,
      `no ${params.platform} asset in ${release.tag_name}`
    );
  }

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: asset.browser_download_url,
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};

function notReleasedYet(productName, reason) {
  return new Response(
    `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<title>${productName} — 곧 출시</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",Pretendard,sans-serif;
       display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;
       color:#1d1d1f;text-align:center;background:#fafafa}
  .card{background:#fff;border-radius:20px;padding:48px 40px;max-width:480px;
        box-shadow:0 18px 48px rgba(0,0,0,.08)}
  h1{font-size:32px;font-weight:800;letter-spacing:-0.5px}
  p{color:#515154;margin-top:14px;line-height:1.6}
  a.home{display:inline-block;margin-top:32px;padding:12px 28px;background:#007aff;
         color:#fff;text-decoration:none;border-radius:999px;font-weight:600}
  small{color:#a0a0a5;font-size:12px;margin-top:24px;display:block}
</style></head><body>
<div class="card">
  <h1>${productName}</h1>
  <p>출시 준비 중입니다.<br>곧 다운로드 가능해집니다.</p>
  <a class="home" href="/">홈으로 돌아가기</a>
  <small>${reason}</small>
</div></body></html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
