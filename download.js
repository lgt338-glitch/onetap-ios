// 사용자 OS 를 감지해서 [data-download="<슬러그>"] 가 붙은 링크의
// href 를 /download/<슬러그>/<플랫폼> 으로 자동 교체합니다.
//
// HTML 사용 예:
//   <a data-download="reboot" href="/download/reboot/win">무료 다운로드</a>
//
// 기본값(JS 비활성·기타 OS)은 Windows. macOS 만 자동으로 .dmg 로 전환.

(function () {
  const ua = navigator.userAgent || "";
  const isMac = /Macintosh|Mac OS X/i.test(ua);
  const isLinux = !isMac && /Linux/i.test(ua) && !/Android/i.test(ua);
  const platform = isMac ? "mac" : isLinux ? "linux" : "win";
  const platformLabel = isMac ? "macOS" : isLinux ? "Linux" : "Windows";

  function apply() {
    document.querySelectorAll("[data-download]").forEach((el) => {
      const slug = el.getAttribute("data-download");
      if (!slug) return;
      el.setAttribute("href", `/download/${slug}/${platform}`);
      if (el.dataset.downloadLabel === "true") {
        el.textContent = `${platformLabel}용 무료 다운로드 →`;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
