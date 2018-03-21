// 传入psd宽度
(function (baseWidth) {
  var doc = window.document,
    html = doc.documentElement,
    option = html.getAttribute('data-use-rem');
  if (option === null) return;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = html.clientWidth || 375;
      html.style.fontSize = 100 * clientWidth / baseWidth + 'px';
    };
  if (!doc.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(750)