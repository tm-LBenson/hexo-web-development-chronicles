var defaultEncoding = 2; // 网站默认语言，1: 繁體中文, 2: 简体中文
var translateDelay = 0; //延迟时间,若不在前, 要设定延迟翻译时间, 如100表示100ms,默认为0
var cookieDomain = "https://blog.17lai.site/"; //更改为你的博客网址
var msgToTraditionalChinese = "繁"; //此处可以更改为你想要显示的文字
var msgToSimplifiedChinese = "简"; //同上，但两处均不建议更改
var translateButtonId = "translateLink"; //默认互换id
var currentEncoding = defaultEncoding;
var targetEncodingCookie = "targetEncoding" + cookieDomain.replace(/\./g, "");
var targetEncoding = (getCookie(targetEncodingCookie) == null ? defaultEncoding : getCookie(targetEncodingCookie));
var translateButtonObject;
function translateText(txt) {
	if (txt == "" || txt == null) return "";
	if (currentEncoding == 1 && targetEncoding == 2) return Simplized(txt);
	else if (currentEncoding == 2 && targetEncoding == 1) return Traditionalized(txt);
	else return txt
}
function translateBody(fobj) {
	if (typeof (fobj) == "object") var objs = fobj.childNodes;
	else var objs = document.body.childNodes;
	for (var i = 0; i < objs.length; i++) {
		var obj = objs.item(i);
		if ("||BR|HR|TEXTAREA|".indexOf("|" + obj.tagName + "|") > 0 || obj == translateButtonObject) continue;
		if (obj.title != "" && obj.title != null) obj.title = translateText(obj.title);
		if (obj.alt != "" && obj.alt != null) obj.alt = translateText(obj.alt);
		if (obj.tagName == "INPUT" && obj.value != "" && obj.type != "text" && obj.type != "hidden") obj.value = translateText(obj.value);
		if (obj.nodeType == 3) obj.data = translateText(obj.data);
		else translateBody(obj)
	}
}
function translatePage() {
	if (targetEncoding == 1) {
		currentEncoding = 1;
		targetEncoding = 2;
		translateButtonObject.innerHTML = msgToTraditionalChinese;
		setCookie(targetEncodingCookie, targetEncoding, 7);
		translateBody()
	} else if (targetEncoding == 2) {
		currentEncoding = 2;
		targetEncoding = 1;
		translateButtonObject.innerHTML = msgToSimplifiedChinese;
		setCookie(targetEncodingCookie, targetEncoding, 7);
		translateBody()
	}
}
function JTPYStr() {
	return ''
}
function FTPYStr() {
	return ''
}
function Traditionalized(cc) {
	var str = '';
	var ss = JTPYStr();
	var tt = FTPYStr();
	for (var i = 0; i < cc.length; i++) {
		if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1) str += tt.charAt(ss.indexOf(cc.charAt(i)));
		else str += cc.charAt(i)
	}
	return str
}
function Simplized(cc) {
	var str = '';
	var ss = JTPYStr();
	var tt = FTPYStr();
	for (var i = 0; i < cc.length; i++) {
		if (cc.charCodeAt(i) > 10000 && tt.indexOf(cc.charAt(i)) != -1) str += ss.charAt(tt.indexOf(cc.charAt(i)));
		else str += cc.charAt(i)
	}
	return str
}
function setCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString()
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/"
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}
function translateInitilization() {
	translateButtonObject = document.getElementById(translateButtonId);
	if (translateButtonObject) {
		with (translateButtonObject) {
			if (typeof (document.all) != "object") {
				href = "javascript:translatePage();"
			} else {
				href = "#";
				onclick = new Function("translatePage(); return false;")
			}
		}
		if (currentEncoding != targetEncoding) {
			setTimeout("translateBody()", translateDelay);
			if (targetEncoding == 1) translateButtonObject.innerHTML = msgToSimplifiedChinese;
			else translateButtonObject.innerHTML = msgToTraditionalChinese
		}
	}
}
