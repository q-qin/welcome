(function(window) {
	window.JKEventHandler = {
		browser: function() {
			var u = navigator.userAgent.toLowerCase();
			var app = navigator.appVersion.toLowerCase();
			return {
				txt: u, // 浏览器版本信息
				version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
				msie: /msie/.test(u) && !/opera/.test(u), // IE内核
				mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
				safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
				chrome: /chrome/.test(u), //是否为chrome
				opera: /opera/.test(u), //是否为oprea
				presto: u.indexOf('presto/') > -1, //opera内核
				webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
				gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
				mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
				android: u.indexOf('android') > -1, //android终端
				iPhone: u.indexOf('iphone') > -1, //是否为iPhone
				iPad: u.indexOf('ipad') > -1, //是否iPad
				weixin: /micromessenger/.test(u), //微信
				QQBrowse: u.indexOf(' QQ') > -1 || u.indexOf(' qq') > -1,
			}
		},
		callNativeFunction: function(functionString, params, callBack) {
			var methodName = (functionString.replace(/function\s?/mi, "").split("("))[0];
			var callBackName = methodName + 'CallBack';
			var message;
			if (!callBack) {
				message = {
					'methodName': methodName,
					'params': params
				};
				if (this.browser().ios) {
					window.webkit.messageHandlers.JKEventHandler.postMessage(message);
				} else if (this.browser().android) {
					android.JKEventHandler(JSON.stringify(message));
				}
			} else {
				message = {
					'methodName': methodName,
					'params': params,
					'callBackName': callBackName
				};
				if (!Event._listeners[callBackName]) {
					Event.addEvent(callBackName, function(data) {
						callBack(data);
					});
				}
				if (this.browser().ios) {
					window.webkit.messageHandlers.JKEventHandler.postMessage(message);
				} else if (this.browser().android) {
					android.JKEventHandler(JSON.stringify(message));
				}
			}
		},
		callBack: function(callBackName, data) {
			Event.fireEvent(callBackName, data);
		},
		removeAllCallBacks: function(data) {
			Event._listeners = {};
		}
	}
	var Event = {
		_listeners: {},
		addEvent: function(type, fn) {
			if (typeof this._listeners[type] === "undefined") {
				this._listeners[type] = [];
			}
			if (typeof fn === "function") {
				this._listeners[type].push(fn);
			}
			return this;
		},
		fireEvent: function(type, param) {
			var arrayEvent = this._listeners[type];
			if (arrayEvent instanceof Array) {
				for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
					if (typeof arrayEvent[i] === "function") {
						arrayEvent[i](param);
					}
				}
			}
			return this;
		},
		removeEvent: function(type, fn) {
			var arrayEvent = this._listeners[type];
			if (typeof type === "string" && arrayEvent instanceof Array) {
				if (typeof fn === "function") {
					for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
						if (arrayEvent[i] === fn) {
							this._listeners[type].splice(i, 1);
							break;
						}
					}
				} else {
					delete this._listeners[type];
				}
			}
			return this;
		}
	};
})(window)

export default window.JKEventHandler