/*!
 * ودجت "اكتشف ذوقك القرائي" — مكتبة الأصيل
 * يُضاف بسطر واحد داخل أي موقع مكتبة رقمية منشور مسبقًا:
 *   <script src="https://<app-origin>/widget.js"></script>
 * يظهر كتبويب عائم على حافة الشاشة، وعند الضغط عليه تنفتح لوحة تخصيص وتوصية منزلقة
 * (داخل iframe معزول تمامًا) دون أن يغادر الزائر صفحة الموقع المضيف أو يفقد سياقه فيها.
 */
(function () {
  "use strict";
  if (window.__maktabaWidgetLoaded) return;
  window.__maktabaWidgetLoaded = true;

  var currentScript = document.currentScript;
  var scriptSrc = currentScript ? currentScript.src : "";
  var APP_ORIGIN = (function () {
    try {
      return new URL(scriptSrc).origin;
    } catch (e) {
      return window.location.origin;
    }
  })();
  var EMBED_URL = APP_ORIGIN + "/embed";
  var PANEL_WIDTH = "460px";
  var Z = 2147483000; // فوق أي عنصر يفترض أن يملكه الموقع المضيف

  var css =
    "#mkw-tab{all:initial;position:fixed;top:50%;right:0;transform:translateY(-50%);z-index:" + Z + ";" +
    "background:linear-gradient(135deg,#4EACE9 0%,#1880C3 100%);color:#fff;border:none;" +
    "padding:16px 12px;border-radius:10px 0 0 10px;box-shadow:-4px 0 18px rgba(24,128,195,.35);" +
    "display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;" +
    "font-family:'IBM Plex Sans Arabic',Tahoma,Arial,sans-serif;transition:transform .25s,opacity .25s;}" +
    "#mkw-tab:hover{padding-right:16px;}" +
    "#mkw-tab.mkw-hide{opacity:0;pointer-events:none;transform:translateY(-50%) translateX(12px);}" +
    "#mkw-tab .mkw-icon{font-size:17px;}" +
    "#mkw-tab .mkw-text{writing-mode:vertical-rl;font-size:13px;font-weight:600;letter-spacing:.3px;}" +
    "#mkw-overlay{all:initial;position:fixed;inset:0;background:rgba(14,18,26,.42);z-index:" + (Z - 2) + ";" +
    "opacity:0;pointer-events:none;transition:opacity .3s;}" +
    "#mkw-overlay.mkw-show{opacity:1;pointer-events:auto;}" +
    "#mkw-panel{all:initial;position:fixed;top:0;bottom:0;right:0;width:min(" + PANEL_WIDTH + ",100vw);" +
    "z-index:" + (Z - 1) + ";background:#EEF4F8;box-shadow:-14px 0 50px rgba(10,20,40,.28);" +
    "transform:translateX(100%);transition:transform .38s cubic-bezier(.4,0,.2,1);}" +
    "#mkw-panel.mkw-open{transform:translateX(0);}" +
    "#mkw-panel iframe{display:block;width:100%;height:100%;border:none;}" +
    "@media (max-width:520px){#mkw-panel{width:100vw;}}";

  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var tab = document.createElement("button");
  tab.id = "mkw-tab";
  tab.setAttribute("aria-label", "اكتشف ذوقك القرائي");
  tab.innerHTML = '<span class="mkw-icon">✦</span><span class="mkw-text">اكتشف ذوقك القرائي</span>';

  var overlay = document.createElement("div");
  overlay.id = "mkw-overlay";

  var panel = document.createElement("div");
  panel.id = "mkw-panel";

  var iframe = document.createElement("iframe");
  iframe.title = "اكتشف ذوقك القرائي";
  iframe.setAttribute("loading", "lazy");
  var iframeLoaded = false;

  function ensureIframeLoaded() {
    if (!iframeLoaded) {
      iframe.src = EMBED_URL;
      iframeLoaded = true;
    }
  }

  panel.appendChild(iframe);

  function openPanel() {
    ensureIframeLoaded();
    panel.classList.add("mkw-open");
    overlay.classList.add("mkw-show");
    tab.classList.add("mkw-hide");
    document.body.style.overflow = "hidden";
  }
  function closePanel() {
    panel.classList.remove("mkw-open");
    overlay.classList.remove("mkw-show");
    tab.classList.remove("mkw-hide");
    document.body.style.overflow = "";
  }

  tab.addEventListener("click", openPanel);
  overlay.addEventListener("click", closePanel);
  window.addEventListener("message", function (event) {
    if (event.origin !== APP_ORIGIN) return;
    if (event.data && event.data.type === "maktaba-widget:close") closePanel();
  });

  function mount() {
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    document.body.appendChild(tab);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  window.MaktabaWidget = { open: openPanel, close: closePanel };
})();
