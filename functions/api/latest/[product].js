// GET /api/latest/{product}
//
// 데스크탑 앱의 "업데이트 확인" 기능이 부르는 엔드포인트.
// 최신 버전 / 다운로드 URL / 변경사항을 JSON 으로 돌려준다.
//
// 캐시: 5분.

import { findLatestRelease, PLATFORM_PATTERNS } from "../../_shared/products.js";

export const onRequest = async ({ params, request, waitUntil }) => {
  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const { release, product, error } = await findLatestRelease(params.product);
  if (error) {
    return Response.json(
      { released: false, name: product?.name ?? params.product, reason: error },
      {
        headers: {
          "Cache-Control": "public, max-age=300",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const platformOf = (filename) => {
    for (const [key, patterns] of Object.entries(PLATFORM_PATTERNS)) {
      if (patterns.some((re) => re.test(filename))) return key;
    }
    return "other";
  };

  const body = {
    released: true,
    name: product.name,
    version: release.tag_name.slice(product.tag.length),
    tag: release.tag_name,
    publishedAt: release.published_at,
    notes: release.body || "",
    assets: (release.assets || []).map((a) => ({
      name: a.name,
      platform: platformOf(a.name),
      url: a.browser_download_url,
      size: a.size,
      downloadCount: a.download_count,
    })),
  };

  const response = Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
