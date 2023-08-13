// ==UserScript==
// @name         Hook
// @namespace    https://github.com/JaycgbEDC/Script/Js
// @version      0.1
// @description  hook function in crawling
// @author       Kribe
// @homepage     https://github.com/JaycgbEDC/Script/blob/main/Js/Hook/Hook.user.js
// @supportURL   https://github.com/JaycgbEDC/Script/issues
// @match        *://*/*
// @icon         https://s1.imagehub.cc/images/2023/08/12/default.th.jpeg
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// ==/UserScript==
content-script-start.js
(function () {
    'use strict';
    debugger;
    const hookFunctionDebugger = () => {
        Function.prototype.constructor_ = Function.prototype.constructor;
        Function.prototype.constructor = function (a) {
            if(a == "debugger") {
                return function (){};
            }
            return Function.prototype.constructor_(a);
        };
    };

    const hookCookie = () => {
        var cookie_cache = document.cookie;
        Object.defineProperty(document, 'cookie', {
            get: function () {
                return cookie_cache;
            },

            set: function (val) {
                GM_log('Setting cookie', val);
                // 填写cookie名
                if (val.indexOf('m=') != -1) {
                    debugger;
                }
                var cookie = val.split(";")[0];
                var ncookie = cookie.split("=");
                var flag = false;
                var cache = cookie_cache.split("; ");
                cache = cache.map(function (a) {
                    if (a.split("=")[0] === ncookie[0]) {
                        flag = true;
                        return cookie;
                    }
                    return a;
                })
                cookie_cache = cache.join("; ");
                if (!flag) {
                    cookie_cache += cookie + "; ";
                }
                return cookie_cache;
            }
        });
    };

    const hookSetInterval = () => {
        let setInterval_ = setInterval;
        setInterval = function() {GM_log("setInterval")};
        setInterval.toString = function() {
            GM_log("有函数正在检测setInterval是否被hook");
            return setInterval_.toString();
        }
    }

    (() => {
        /* 注册用户脚本菜单 */
        const menu1 = GM_registerMenuCommand(`${GM_getValue("hookFunctionDebugger") === true ? '✅' : '⬜'} Hook FunctionDebugger`, (event) => {
            if (GM_getValue("hookFunctionDebugger") === true) {
                GM_setValue("hookFunctionDebugger", false);
            } else {
                GM_setValue("hookFunctionDebugger", true);
            }
            window.location.reload(true);
        });

        const menu2 = GM_registerMenuCommand(`${GM_getValue("hookCookie") === true ? '✅' : '⬜'} Hook Cookie`, (event) => {
            if (GM_getValue("hookCookie") === true) {
                GM_setValue("hookCookie", false);
            } else {
                GM_setValue("hookCookie", true);
            }
            window.location.reload(true);
        });

        const menu3 = GM_registerMenuCommand(`${GM_getValue("hookSetInterval") === true ? '✅' : '⬜'} Hook setInterval`, (event) => {
            if (GM_getValue("hookSetInterval") === true) {
                GM_setValue("hookSetInterval", false);
            } else {
                GM_setValue("hookSetInterval", true);
            }
            window.location.reload(true);
        });
    })();

    if (GM_getValue("hookFunctionDebugger") === true) {
        hookFunctionDebugger();
    }
    if (GM_getValue("hookCookie") === true) {
        hookCookie();
    }
    if (GM_getValue("hookSetInterval") === true) {
        hookSetInterval();
    }
})();