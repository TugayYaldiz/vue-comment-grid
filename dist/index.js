!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports["vue-js-grid"] = factory() : root["vue-js-grid"] = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "/dist/", __webpack_require__(__webpack_require__.s = 15);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        function isArray(val) {
            return "[object Array]" === toString.call(val);
        }
        function isArrayBuffer(val) {
            return "[object ArrayBuffer]" === toString.call(val);
        }
        function isFormData(val) {
            return "undefined" != typeof FormData && val instanceof FormData;
        }
        function isArrayBufferView(val) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(val) : val && val.buffer && val.buffer instanceof ArrayBuffer;
        }
        function isString(val) {
            return "string" == typeof val;
        }
        function isNumber(val) {
            return "number" == typeof val;
        }
        function isUndefined(val) {
            return void 0 === val;
        }
        function isObject(val) {
            return null !== val && "object" == typeof val;
        }
        function isDate(val) {
            return "[object Date]" === toString.call(val);
        }
        function isFile(val) {
            return "[object File]" === toString.call(val);
        }
        function isBlob(val) {
            return "[object Blob]" === toString.call(val);
        }
        function isFunction(val) {
            return "[object Function]" === toString.call(val);
        }
        function isStream(val) {
            return isObject(val) && isFunction(val.pipe);
        }
        function isURLSearchParams(val) {
            return "undefined" != typeof URLSearchParams && val instanceof URLSearchParams;
        }
        function trim(str) {
            return str.replace(/^\s*/, "").replace(/\s*$/, "");
        }
        function isStandardBrowserEnv() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document);
        }
        function forEach(obj, fn) {
            if (null !== obj && void 0 !== obj) if ("object" != typeof obj && (obj = [ obj ]), 
            isArray(obj)) for (var i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj); else for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && fn.call(null, obj[key], key, obj);
        }
        function merge() {
            function assignValue(val, key) {
                "object" == typeof result[key] && "object" == typeof val ? result[key] = merge(result[key], val) : result[key] = val;
            }
            for (var result = {}, i = 0, l = arguments.length; i < l; i++) forEach(arguments[i], assignValue);
            return result;
        }
        function extend(a, b, thisArg) {
            return forEach(b, function(val, key) {
                a[key] = thisArg && "function" == typeof val ? bind(val, thisArg) : val;
            }), a;
        }
        var bind = __webpack_require__(8), isBuffer = __webpack_require__(24), toString = Object.prototype.toString;
        module.exports = {
            isArray: isArray,
            isArrayBuffer: isArrayBuffer,
            isBuffer: isBuffer,
            isFormData: isFormData,
            isArrayBufferView: isArrayBufferView,
            isString: isString,
            isNumber: isNumber,
            isObject: isObject,
            isUndefined: isUndefined,
            isDate: isDate,
            isFile: isFile,
            isBlob: isBlob,
            isFunction: isFunction,
            isStream: isStream,
            isURLSearchParams: isURLSearchParams,
            isStandardBrowserEnv: isStandardBrowserEnv,
            forEach: forEach,
            merge: merge,
            extend: extend,
            trim: trim
        };
    }, function(module, exports) {
        function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || "", cssMapping = item[3];
            if (!cssMapping) return content;
            if (useSourceMap && "function" == typeof btoa) {
                var sourceMapping = toComment(cssMapping);
                return [ content ].concat(cssMapping.sources.map(function(source) {
                    return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
                })).concat([ sourceMapping ]).join("\n");
            }
            return [ content ].join("\n");
        }
        function toComment(sourceMap) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }
        module.exports = function(useSourceMap) {
            var list = [];
            return list.toString = function() {
                return this.map(function(item) {
                    var content = cssWithMappingToString(item, useSourceMap);
                    return item[2] ? "@media " + item[2] + "{" + content + "}" : content;
                }).join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, function(module, exports, __webpack_require__) {
        function addStylesToDom(styles) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j]));
                    domStyle.parts.length > item.parts.length && (domStyle.parts.length = item.parts.length);
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j]));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function createStyleElement() {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", head.appendChild(styleElement), styleElement;
        }
        function addStyle(obj) {
            var update, remove, styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');
            if (styleElement) {
                if (isProduction) return noop;
                styleElement.parentNode.removeChild(styleElement);
            }
            if (isOldIE) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement()), update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), 
                remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else styleElement = createStyleElement(), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                styleElement.parentNode.removeChild(styleElement);
            };
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
            if (media && styleElement.setAttribute("media", media), options.ssrId && styleElement.setAttribute(ssrIdKey, obj.id), 
            sourceMap && (css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */", css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), 
            styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        var hasDocument = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !hasDocument) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var listToStyles = __webpack_require__(19), stylesInDom = {}, head = hasDocument && (document.head || document.getElementsByTagName("head")[0]), singletonElement = null, singletonCounter = 0, isProduction = !1, noop = function() {}, options = null, ssrIdKey = "data-vue-ssr-id", isOldIE = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        module.exports = function(parentId, list, _isProduction, _options) {
            isProduction = _isProduction, options = _options || {};
            var styles = listToStyles(parentId, list);
            return addStylesToDom(styles), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                newList ? (styles = listToStyles(parentId, newList), addStylesToDom(styles)) : styles = [];
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, function(module, exports) {
        module.exports = function(rawScriptExports, compiledTemplate, functionalTemplate, injectStyles, scopeId, moduleIdentifier) {
            var esModule, scriptExports = rawScriptExports = rawScriptExports || {}, type = typeof rawScriptExports.default;
            "object" !== type && "function" !== type || (esModule = rawScriptExports, scriptExports = rawScriptExports.default);
            var options = "function" == typeof scriptExports ? scriptExports.options : scriptExports;
            compiledTemplate && (options.render = compiledTemplate.render, options.staticRenderFns = compiledTemplate.staticRenderFns, 
            options._compiled = !0), functionalTemplate && (options.functional = !0), scopeId && (options._scopeId = scopeId);
            var hook;
            if (moduleIdentifier ? (hook = function(context) {
                context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, 
                context || "undefined" == typeof __VUE_SSR_CONTEXT__ || (context = __VUE_SSR_CONTEXT__), 
                injectStyles && injectStyles.call(this, context), context && context._registeredComponents && context._registeredComponents.add(moduleIdentifier);
            }, options._ssrRegister = hook) : injectStyles && (hook = injectStyles), hook) {
                var functional = options.functional, existing = functional ? options.render : options.beforeCreate;
                functional ? (options._injectStyles = hook, options.render = function(h, context) {
                    return hook.call(context), existing(h, context);
                }) : options.beforeCreate = existing ? [].concat(existing, hook) : [ hook ];
            }
            return {
                esModule: esModule,
                exports: scriptExports,
                options: options
            };
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(23);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(process) {
            function setContentTypeIfUnset(headers, value) {
                !utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"]) && (headers["Content-Type"] = value);
            }
            var utils = __webpack_require__(0), normalizeHeaderName = __webpack_require__(27), DEFAULT_CONTENT_TYPE = {
                "Content-Type": "application/x-www-form-urlencoded"
            }, defaults = {
                adapter: function() {
                    var adapter;
                    return "undefined" != typeof XMLHttpRequest ? adapter = __webpack_require__(9) : void 0 !== process && (adapter = __webpack_require__(9)), 
                    adapter;
                }(),
                transformRequest: [ function(data, headers) {
                    return normalizeHeaderName(headers, "Content-Type"), utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data) ? data : utils.isArrayBufferView(data) ? data.buffer : utils.isURLSearchParams(data) ? (setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8"), 
                    data.toString()) : utils.isObject(data) ? (setContentTypeIfUnset(headers, "application/json;charset=utf-8"), 
                    JSON.stringify(data)) : data;
                } ],
                transformResponse: [ function(data) {
                    if ("string" == typeof data) try {
                        data = JSON.parse(data);
                    } catch (e) {}
                    return data;
                } ],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function(status) {
                    return status >= 200 && status < 300;
                }
            };
            defaults.headers = {
                common: {
                    Accept: "application/json, text/plain, */*"
                }
            }, utils.forEach([ "delete", "get", "head" ], function(method) {
                defaults.headers[method] = {};
            }), utils.forEach([ "post", "put", "patch" ], function(method) {
                defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
            }), module.exports = defaults;
        }).call(exports, __webpack_require__(26));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__Comment_vue__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_1__Sign_vue__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
        __webpack_exports__.a = {
            name: "Comments",
            props: {
                baseURL: {
                    type: String,
                    required: !0
                },
                apiKey: {
                    type: String,
                    required: !0
                },
                nodeName: {
                    type: String,
                    required: !0
                },
                maxUserNameLength: {
                    type: String,
                    default: "30"
                },
                maxCommentLength: {
                    type: String,
                    default: "1000"
                },
                initialMessageLimit: {
                    type: String,
                    default: "10"
                },
                maxLineLimit: {
                    type: String,
                    default: "40"
                },
                maxShowingDepth: {
                    type: String,
                    default: "5"
                },
                background: {
                    type: String,
                    default: "transparent"
                },
                commentBackgroundColor: {
                    teype: String,
                    default: "white"
                },
                commentTextColor: {
                    teype: String,
                    default: "#1d2129"
                },
                userNameColor: {
                    teype: String,
                    default: "rgb(6, 177, 183)"
                }
            },
            data: function() {
                return {
                    loading: !0,
                    showSignPanel: !1,
                    comments: [],
                    newComment: "",
                    styleShadow: {
                        boxShadow: "2px -2px rgba(" + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + ",0.6)"
                    },
                    limit: parseInt(this.initialMessageLimit),
                    alertMessage: "",
                    alertClass: "",
                    alert: !1,
                    idToken: null,
                    userId: null,
                    isAdmin: null,
                    userName: "",
                    expiresIn: null,
                    auth: !1,
                    wrapperSize: "",
                    requestLoading: !1,
                    logOutTimer: null
                };
            },
            methods: {
                checkAutoLogin: function() {
                    var token = localStorage.getItem("commentToken");
                    if (token) {
                        var expirationDate = localStorage.getItem("commentExpirationDate"), now = new Date(), remainingTime = Math.floor((new Date(expirationDate).getTime() - now.getTime()) / 1e3);
                        if (!(now >= expirationDate)) {
                            var userId = localStorage.getItem("commentUserId"), userName = localStorage.getItem("commentUserName");
                            if ("undefined" != localStorage.getItem("commentAdmin")) {
                                var data = [ token, userId, userName, remainingTime, !0 ];
                                this.signUser(data);
                            } else {
                                var _data = [ token, userId, userName, remainingTime ];
                                this.signUser(_data);
                            }
                        }
                    }
                },
                signUser: function(data) {
                    var _this = this;
                    this.idToken = data[0], this.userId = data[1], this.userName = data[2], this.expiresIn = data[3], 
                    this.logOutTimer = setTimeout(function() {
                        _this.clearAuth();
                    }, 1e3 * this.expiresIn), this.isAdmin = data[4], this.auth = !0, this.showSignPanel = !1;
                },
                clearAuth: function() {
                    clearTimeout(this.logOutTimer), this.idToken = "", this.userId = "", this.userName = "", 
                    this.isAdmin = null, this.auth = !1, localStorage.removeItem("commentToken"), localStorage.removeItem("commentUserId"), 
                    localStorage.removeItem("commentExpirationDate"), localStorage.removeItem("commentUserName"), 
                    localStorage.removeItem("commentAdmin");
                },
                updateLimit: function() {
                    this.limit += parseInt(this.initialMessageLimit);
                },
                resize: function(event) {
                    "" == this.newComment ? (this.$refs.addComment.style.height = "auto", this.$refs.addComment.style.height = "32px") : (event.target.style.height = "auto", 
                    event.target.style.height = event.target.scrollHeight + "px");
                },
                addComment: function() {
                    var _this2 = this;
                    if (this.auth) if (0 != this.filterNewComment) {
                        this.requestLoading = !0;
                        var commentObj = {
                            name: this.filterUserName,
                            comment: this.filterNewComment,
                            user_id: this.userId,
                            timestamp: Date.now().toString(),
                            lineCount: this.filterNewCommentLineCount
                        };
                        __WEBPACK_IMPORTED_MODULE_2_axios___default.a.post(this.baseURL + "/commentsGrid/" + this.nodeName + "/comments.json?auth=" + this.idToken, commentObj).then(function(res) {
                            commentObj.id = res.data.name;
                            var repliedObj = {
                                user_id: _this2.userId
                            };
                            __WEBPACK_IMPORTED_MODULE_2_axios___default.a.put(_this2.baseURL + "/commentsGrid/" + _this2.nodeName + "/replys/" + commentObj.id + ".json?auth=" + _this2.idToken, repliedObj).then(function(res) {
                                commentObj.depth = "commentsGrid/" + _this2.nodeName + "/comments/" + commentObj.id, 
                                _this2.comments.splice(0, 0, commentObj), _this2.clearAlert(), _this2.newComment = "", 
                                _this2.resize();
                            }).catch(function(err) {
                                return _this2.setAlert("Unauthorized!\n", "fail");
                            });
                        }).catch(function(err) {
                            return _this2.setAlert("İnvalid comment!\n", "fail");
                        });
                    } else this.setAlert("You can't send empty comment!\n", "fail"); else this.showSignPanel = !0;
                },
                deleteFromParent: function(index) {
                    this.comments.splice(index, 1);
                },
                setAlert: function(message, style, type) {
                    var _this3 = this;
                    "append" == type ? this.alertMessage += message : this.alertMessage = message, this.alertClass = style, 
                    this.alert = !0, this.requestLoading = !1, setTimeout(function() {
                        _this3.clearAlert();
                    }, 5e3);
                },
                clearAlert: function() {
                    this.requestLoading = !1, this.alertMessage = "", this.alertClass = "", this.alert = !1;
                }
            },
            computed: {
                remainigLetter: function() {
                    return +this.maxCommentLength - this.newComment.length;
                },
                filterUserName: function() {
                    return this.userName.replace(/^ +/g, "").replace(/ +/g, " ").replace(/ +$/g, "");
                },
                filterNewComment: function() {
                    return this.newComment.replace(/^\n+/g, "").replace(/(\n{2,})+/g, "\n\n").replace(/\n+$/g, "").replace(/( {30,})+/g, " ").replace(/ +$/g, "");
                },
                filterNewCommentLineCount: function() {
                    return this.filterNewComment.split("\n").length;
                }
            },
            watch: {
                loading: function() {
                    var _this4 = this;
                    this.$nextTick(function() {
                        for (var a = void 0, b = void 0, c = void 0, d = 0, i = 0; i < 10; i++) a = Math.floor(25 * Math.random()) + 10, 
                        b = Math.floor(30 * Math.random()) + 5, c = Math.floor(30 * Math.random()) + 5, 
                        d = Math.floor(5 * Math.random()) + 0, _this4.$refs.svgAvatar.innerHTML += "<circle cx=" + (Math.floor(30 * Math.random()) + 5) + " cy=" + (Math.floor(30 * Math.random()) + 5) + " r='" + Math.round(15 * Math.random()) + "' fill='rgba(" + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.random() + ")'> <animate  attributeName=cx attributeType=XML dur=" + (Math.floor(4 * Math.random()) + 3) + "s values='" + a + " ; " + b + " ; " + a + " ; " + c + " ; " + a + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=cy attributeType=XML dur=" + (Math.floor(4 * Math.random()) + 3) + "s values='" + c + "; " + a + "; " + b + " ; " + a + " ; " + c + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=r values='" + d + " ; " + 15 * Math.random() + " ; " + 15 * Math.random() + " ; " + 15 * Math.random() + " ; " + d + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' dur='" + (Math.floor(4 * Math.random()) + 3) + "s' repeatCount=indefinite></animate></circle>";
                        "undefined" != _this4.$refs.wrapper && (_this4.wrapperSize = _this4.$refs.wrapper.offsetWidth);
                    });
                }
            },
            components: {
                appWrapper: __WEBPACK_IMPORTED_MODULE_0__Comment_vue__.a,
                signWrapper: __WEBPACK_IMPORTED_MODULE_1__Sign_vue__.a
            },
            created: function() {
                var _this5 = this;
                this.checkAutoLogin(), __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(this.baseURL + "/commentsGrid/" + this.nodeName + "/comments.json").then(function(res) {
                    var data = res.data;
                    for (var key in data) {
                        var comment = data[key];
                        comment.id = key, comment.depth = "commentsGrid/" + _this5.nodeName + "/comments/" + comment.id, 
                        _this5.comments.unshift(comment);
                    }
                    _this5.loading = !1;
                }).catch(function(err) {
                    return console.log(err);
                });
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__), __WEBPACK_IMPORTED_MODULE_1__Sign_vue__ = __webpack_require__(13);
        __webpack_exports__.a = {
            name: "app-wrapper",
            props: {
                baseURL: {
                    type: String,
                    required: !0
                },
                apiKey: {
                    type: String,
                    required: !0
                },
                nodeName: {
                    type: String,
                    required: !0
                },
                initialMessageLimit: {
                    type: String,
                    default: "10"
                },
                maxLineLimit: {
                    type: String,
                    default: "40"
                },
                maxShowingDepth: {
                    type: String,
                    default: "5"
                },
                maxCommentLength: {
                    type: String,
                    default: "1000"
                },
                maxUserNameLength: {
                    type: String,
                    default: "30"
                },
                name: String,
                comment: String,
                replies: {
                    type: Object,
                    default: function() {
                        return {};
                    }
                },
                auth: Boolean,
                id: String,
                timestamp: String,
                lineCount: Number,
                depth: String,
                depthLength: Number,
                idToken: String,
                userId: String,
                isAdmin: {
                    type: Boolean,
                    default: !1
                },
                userName: String,
                nodeUserId: String,
                commentBackgroundColor: {
                    teype: String,
                    default: "white"
                },
                commentTextColor: {
                    teype: String,
                    default: "#1d2129"
                },
                userNameColor: {
                    teype: String,
                    default: "rgb(6, 177, 183)"
                },
                show: {
                    type: Boolean,
                    default: !1
                },
                deleted: {
                    type: Boolean,
                    default: !1
                },
                wrapperSize: String
            },
            data: function() {
                return {
                    showSignPanel: !1,
                    showReplies: !1,
                    showProp: this.show,
                    showHideBar: !1,
                    deletedProp: this.deleted,
                    replied: !1,
                    beforeReply: !1,
                    beforeUpdate: !1,
                    beforeDelete: !1,
                    filteredComment: "",
                    updateHeight: 0,
                    svgAvatarCheck: !1,
                    date: "",
                    replyMessage: "",
                    updateMessage: "",
                    replys: [],
                    mods: [],
                    depthFromReplies: "",
                    styleShadow: {
                        boxShadow: "2px -2px rgba(" + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + ",0.6)"
                    },
                    limit: parseInt(this.initialMessageLimit),
                    alert: !1,
                    alertMessage: "",
                    alertClass: "",
                    hideMessage: !1,
                    outerWidth: 0,
                    requestLoading: !1,
                    requestDelete: !1,
                    timeOutHolder: null
                };
            },
            methods: {
                signUser: function(data) {
                    this.$emit("sign-user", data);
                },
                closeHideBar: function(bool) {
                    this.showHideBar = bool;
                },
                updateLimit: function() {
                    this.limit += parseInt(this.initialMessageLimit);
                },
                resize: function(event, from) {
                    event.target.style.height = "auto", event.target.style.height = event.target.scrollHeight + "px", 
                    from ? "" == this.updateMessage && 32 != this.$refs.addUpdate.style.height && (this.$refs.addUpdate.style.height = "32px") : "" == this.replyMessage && 32 != this.$refs.addReply.style.height && (this.$refs.addReply.style.height = "32px");
                },
                handleBeforeReply: function() {
                    var _this = this;
                    if (this.clearAlert(), this.beforeReply = !this.beforeReply, !this.svgAvatarCheck) {
                        for (var a = void 0, b = void 0, c = void 0, d = 0, i = 0; i < 10; i++) a = Math.floor(25 * Math.random()) + 10, 
                        b = Math.floor(30 * Math.random()) + 5, c = Math.floor(30 * Math.random()) + 5, 
                        d = Math.floor(5 * Math.random()) + 0, this.$refs.svgReplyAvatar.innerHTML += "<circle cx=" + (Math.floor(30 * Math.random()) + 5) + " cy=" + (Math.floor(30 * Math.random()) + 5) + " r='" + Math.round(15 * Math.random()) + "' fill='rgba(" + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.random() + ")'> <animate  attributeName=cx attributeType=XML dur=" + (Math.floor(4 * Math.random()) + 3) + "s values='" + a + " ; " + b + " ; " + a + " ; " + c + " ; " + a + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=cy attributeType=XML dur=" + (Math.floor(4 * Math.random()) + 3) + "s values='" + c + "; " + a + "; " + b + " ; " + a + " ; " + c + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=r values='" + d + " ; " + 15 * Math.random() + " ; " + 15 * Math.random() + " ; " + 15 * Math.random() + " ; " + d + "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' dur='" + (Math.floor(4 * Math.random()) + 3) + "s' repeatCount=indefinite></animate></circle>";
                        this.svgAvatarCheck = !0;
                    }
                    this.$nextTick(function() {
                        _this.$refs.addReply.focus();
                    });
                },
                reply: function() {
                    var _this2 = this;
                    if (this.auth) if (0 != this.filterNewComment.length) {
                        this.requestLoading = !0;
                        var replyObj = {
                            name: this.filterUserName,
                            comment: this.filterNewComment,
                            user_id: this.userId,
                            timestamp: Date.now().toString(),
                            lineCount: this.filterNewCommentLineCount
                        };
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(this.baseURL + "/commentsGrid/" + this.nodeName + "/replys/" + this.id + ".json?auth=" + this.idToken, replyObj).then(function(res) {
                            replyObj.id = res.data.name;
                            var mods = _this2.mods, key = _this2.nodeUserId, obj = {};
                            obj[key] = !0;
                            for (var i = 0, len = mods.length; i < len; i++) for (var _key in mods[i]) {
                                var key2 = _key;
                                obj[key2] = !0;
                            }
                            var repliedObj = {
                                replied: !1,
                                user_id: _this2.userId,
                                mods: obj
                            };
                            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(_this2.baseURL + "/commentsGrid/" + _this2.nodeName + "/replys/" + replyObj.id + ".json?auth=" + _this2.idToken, repliedObj).then(function(res) {
                                replyObj.depth = "commentsGrid/" + _this2.nodeName + "/replys/" + _this2.id + "/" + replyObj.id, 
                                _this2.replys.splice(0, 0, replyObj), _this2.replyMessage = "", _this2.$refs.addReply.style.height = "32px", 
                                _this2.beforeReply = !_this2.beforeReply, _this2.replied || (_this2.replied = !0, 
                                _this2.showReplies || (_this2.showReplies = !_this2.showReplies)), _this2.clearAlert();
                            }).catch(function(err) {
                                return _this2.setAlert("Unauthorized!\n", "fail");
                            });
                        }).catch(function(err) {
                            _this2.setAlert("İnvalid comment or comment deleted!\n", "fail"), setTimeout(function() {
                                _this2.$emit("delete-row");
                            }, 5e3);
                        });
                    } else this.setAlert("You can't send empty comment!\n", "fail"); else this.showSignPanel = !0;
                },
                handleBeforeUpdate: function() {
                    var _this3 = this;
                    this.beforeReply = !1, this.beforeUpdate = !0, this.updateMessage = this.filteredComment, 
                    this.$refs.addUpdate.style.height = this.updateHeight + "px", this.$nextTick(function() {
                        _this3.$refs.addUpdate.focus();
                    });
                },
                update: function() {
                    var _this4 = this;
                    if (this.auth) if (this.requestLoading = !0, this.isAdmin) if (0 != this.filterNewUpdate.length) {
                        var _replyObj = {
                            comment: this.filterNewUpdate,
                            lineCount: this.filterNewUpdateLineCount
                        };
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(this.baseURL + "/" + this.depth + ".json?auth=" + this.idToken, _replyObj).then(function(res) {
                            _this4.clearAlert(), _this4.filteredComment = _this4.filterNewUpdate, _this4.afterUpdate(), 
                            setTimeout(function() {
                                _this4.updateMessage = "";
                            }, 3), _this4.beforeUpdate = !1;
                        }).catch(function(err) {
                            _this4.setAlert("İnvalid comment or comment deleted!\n", "fail"), setTimeout(function() {
                                _this4.$emit("delete-row");
                            }, 5e3);
                        });
                    } else this.setAlert("You can't send empty comment!\n", "fail"); else if (0 != this.filterNewUpdate.length) {
                        var replyObj = {
                            name: this.filterUserName,
                            comment: this.filterNewUpdate,
                            user_id: this.userId,
                            lineCount: this.filterNewUpdateLineCount
                        };
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(this.baseURL + "/" + this.depth + ".json?auth=" + this.idToken, replyObj).then(function(res) {
                            _this4.clearAlert(), _this4.filteredComment = _this4.filterNewUpdate, _this4.afterUpdate(), 
                            setTimeout(function() {
                                _this4.updateMessage = "";
                            }, 3), _this4.beforeUpdate = !1;
                        }).catch(function(err) {
                            _this4.setAlert("İnvalid comment or comment deleted!\n", "fail"), setTimeout(function() {
                                _this4.$emit("delete-row");
                            }, 5e3);
                        });
                    } else this.setAlert("You can't send empty comment!\n", "fail"); else this.showSignPanel = !0;
                },
                showReply: function() {
                    this.replied = !1, this.showReplies = !this.showReplies, this.showProp = !this.showProp;
                },
                handleBeforeDelete: function() {
                    var _this5 = this;
                    clearTimeout(this.timeOutHolder), this.beforeDelete = !this.beforeDelete, this.timeOutHolder = setTimeout(function() {
                        _this5.beforeDelete = !1;
                    }, 5e3);
                },
                deleteComment: function() {
                    var _this6 = this;
                    this.requestDelete = !0, this.deletedProp = !0;
                    var splt = this.depth.split("/"), changeDept1 = splt[0] + "/" + splt[1] + "/" + splt[2] + "/" + splt[splt.length - 1];
                    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(this.baseURL + "/" + changeDept1 + ".json?auth=" + this.idToken).catch(function(err) {
                        return console.log(err);
                    });
                    var changedDepth2 = this.depth.replace("/comments/", "/replys/");
                    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.baseURL + "/" + changedDepth2 + ".json").then(function(res) {
                        var data = res.data;
                        for (var key in data) key.startsWith("-") && __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(_this6.baseURL + "/commentsGrid/" + _this6.nodeName + "/replys/" + key + ".json?auth=" + _this6.idToken).catch(function(err) {
                            return console.log(err);
                        });
                    }).catch(function(err) {
                        return console.log(err);
                    }), __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(this.baseURL + "/" + changedDepth2 + ".json?auth=" + this.idToken).then(function(res) {
                        _this6.replys = [], _this6.$emit("delete-row");
                    }).catch(function(err) {
                        return console.log(err);
                    });
                },
                deleteFromParent: function(index) {
                    this.replys.splice(index, 1);
                },
                setAlert: function(message, style, type) {
                    var _this7 = this;
                    "append" == type ? this.alertMessage += message : this.alertMessage = message, this.alertClass = style, 
                    this.alert = !0, this.requestLoading = !1, setTimeout(function() {
                        _this7.clearAlert();
                    }, 5e3);
                },
                clearAlert: function() {
                    this.requestLoading = !1, this.alertMessage = "", this.alertClass = "", this.alert = !1;
                },
                afterUpdate: function() {
                    if (this.filterNewUpdateLineCount > +this.maxLineLimit) {
                        this.filteredComment = "";
                        for (var splt = this.updateMessage.split("\n"), i = 0; i < splt.length; i++) i < +this.maxLineLimit ? this.filteredComment += splt[i] + "\n" : this.filteredComment += splt[i] + " ";
                    }
                }
            },
            computed: {
                viewWidth: function() {
                    return this.outerWidth;
                },
                remainigLetter: function() {
                    return +this.maxCommentLength - this.replyMessage.length;
                },
                remainigUpdateLetter: function() {
                    return +this.maxCommentLength - this.updateMessage.length;
                },
                getTimeDiff: function() {
                    var date1 = new Date(+this.timestamp), date2 = new Date(Date.now()), yearDiff = Math.abs(date2.getFullYear() - date1.getFullYear()), monthDiff = Math.abs(date2.getMonth() - date1.getMonth()), dayDiff = Math.abs(date2.getDate() - date1.getDate()), hourDiff = Math.abs(date2.getHours() - date1.getHours()), minuteDiff = Math.abs(date2.getMinutes() - date1.getMinutes());
                    return 0 != yearDiff && 1 == yearDiff ? "a year ago" : yearDiff > 1 ? yearDiff + " years ago" : 0 != monthDiff && 1 == monthDiff ? "a month ago" : monthDiff > 1 ? monthDiff + " months ago" : 0 != dayDiff && 1 == dayDiff ? "a day ago" : dayDiff > 1 ? dayDiff + " days ago" : 0 != hourDiff && 1 == hourDiff ? "a hour ago" : hourDiff > 1 ? hourDiff + " hours ago" : 0 != minuteDiff && 1 == minuteDiff ? "a minute ago" : minuteDiff > 1 ? minuteDiff + " minutes ago" : "seconds ago";
                },
                getTime: function() {
                    var date = new Date(+this.timestamp), options = {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric"
                    };
                    return new Intl.DateTimeFormat("en-Us", options).format(date);
                },
                filterUserName: function() {
                    return this.userName.replace(/^ +/g, "").replace(/ +/g, " ").replace(/ +$/g, "");
                },
                filterNewComment: function() {
                    return this.replyMessage.replace(/^ +/g, "").replace(/^\n+/g, "").replace(/(\n{2,})+/g, "\n\n").replace(/\n+$/g, "").replace(/( {30,})+/g, " ").replace(/ +$/g, "");
                },
                filterNewCommentLineCount: function() {
                    return this.filterNewComment.split("\n").length;
                },
                filterNewUpdate: function() {
                    return this.updateMessage.replace(/^ +/g, "").replace(/^\n+/g, "").replace(/(\n{2,})+/g, "\n\n").replace(/\n+$/g, "").replace(/( {30,})+/g, " ").replace(/ +$/g, "");
                },
                filterNewUpdateLineCount: function() {
                    return this.updateMessage.split("\n").length;
                }
            },
            watch: {
                show: function() {
                    var updateHeight = this.$refs.comment.clientHeight;
                    0 != updateHeight && (this.updateHeight = updateHeight + 14);
                },
                deleted: function() {
                    var _this8 = this;
                    this.deletedProp = !0;
                    var splt = this.depth.split("/"), changeDept1 = splt[0] + "/" + splt[1] + "/" + splt[2] + "/" + splt[splt.length - 1];
                    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.baseURL + "/" + changeDept1 + ".json").then(function(res) {
                        var data = res.data;
                        for (var key in data) key.startsWith("-") && __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(_this8.baseURL + "/commentsGrid/" + _this8.nodeName + "/replys/" + key + ".json?auth=" + _this8.idToken).then(function(res) {
                            _this8.$emit("delete-row"), _this8.replys = [];
                        }).catch(function(err) {
                            return console.log(err);
                        });
                    }).catch(function(err) {
                        return console.log(err);
                    });
                }
            },
            components: {
                signWrapper: __WEBPACK_IMPORTED_MODULE_1__Sign_vue__.a
            },
            created: function() {
                var _this9 = this;
                if (this.depthFromReplies = this.depth + "/" + this.id + "/reply", this.depthLength < +this.maxShowingDepth && (this.showReplies = !0), 
                __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.baseURL + "/commentsGrid/" + this.nodeName + "/replys/" + this.id + ".json").then(function(res) {
                    var data = res.data;
                    for (var key in data) if (key.startsWith("-")) {
                        var reply = data[key];
                        reply.id = key, reply.depth = "commentsGrid/" + _this9.nodeName + "/replys/" + _this9.id + "/" + reply.id, 
                        _this9.replys.unshift(reply);
                    } else if (key.startsWith("mods")) {
                        var mod = data[key];
                        _this9.mods.push(mod);
                    }
                }).catch(function(err) {
                    return console.log(err);
                }), this.lineCount > +this.maxLineLimit || this.lineCount != this.comment.split("\n").length) for (var splt = this.comment.split("\n"), i = 0; i < splt.length; i++) i < +this.maxLineLimit ? this.filteredComment += splt[i] + "\n" : this.filteredComment += splt[i] + " "; else this.filteredComment = this.comment;
            },
            mounted: function() {
                var _this10 = this;
                this.$nextTick(function() {
                    for (var i = 0; i < 10; i++) _this10.$refs.svgAvatar.innerHTML += "<circle cx=" + (Math.floor(30 * Math.random()) + 5) + " cy=" + (Math.floor(30 * Math.random()) + 5) + " r='" + Math.round(15 * Math.random()) + "' fill='rgba(" + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.round(244 * Math.random()) + "," + Math.random() + ")'> </circle>";
                    var updateHeight = _this10.$refs.comment.clientHeight;
                    0 != updateHeight && (_this10.updateHeight = updateHeight + 13);
                });
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(fn, thisArg) {
            return function() {
                for (var args = new Array(arguments.length), i = 0; i < args.length; i++) args[i] = arguments[i];
                return fn.apply(thisArg, args);
            };
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0), settle = __webpack_require__(28), buildURL = __webpack_require__(30), parseHeaders = __webpack_require__(31), isURLSameOrigin = __webpack_require__(32), createError = __webpack_require__(10), btoa = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || __webpack_require__(33);
        module.exports = function(config) {
            return new Promise(function(resolve, reject) {
                var requestData = config.data, requestHeaders = config.headers;
                utils.isFormData(requestData) && delete requestHeaders["Content-Type"];
                var request = new XMLHttpRequest(), loadEvent = "onreadystatechange", xDomain = !1;
                if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in request || isURLSameOrigin(config.url) || (request = new window.XDomainRequest(), 
                loadEvent = "onload", xDomain = !0, request.onprogress = function() {}, request.ontimeout = function() {}), 
                config.auth) {
                    var username = config.auth.username || "", password = config.auth.password || "";
                    requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
                }
                if (request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), !0), 
                request.timeout = config.timeout, request[loadEvent] = function() {
                    if (request && (4 === request.readyState || xDomain) && (0 !== request.status || request.responseURL && 0 === request.responseURL.indexOf("file:"))) {
                        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null, responseData = config.responseType && "text" !== config.responseType ? request.response : request.responseText, response = {
                            data: responseData,
                            status: 1223 === request.status ? 204 : request.status,
                            statusText: 1223 === request.status ? "No Content" : request.statusText,
                            headers: responseHeaders,
                            config: config,
                            request: request
                        };
                        settle(resolve, reject, response), request = null;
                    }
                }, request.onerror = function() {
                    reject(createError("Network Error", config, null, request)), request = null;
                }, request.ontimeout = function() {
                    reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", request)), 
                    request = null;
                }, utils.isStandardBrowserEnv()) {
                    var cookies = __webpack_require__(34), xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
                    xsrfValue && (requestHeaders[config.xsrfHeaderName] = xsrfValue);
                }
                if ("setRequestHeader" in request && utils.forEach(requestHeaders, function(val, key) {
                    void 0 === requestData && "content-type" === key.toLowerCase() ? delete requestHeaders[key] : request.setRequestHeader(key, val);
                }), config.withCredentials && (request.withCredentials = !0), config.responseType) try {
                    request.responseType = config.responseType;
                } catch (e) {
                    if ("json" !== config.responseType) throw e;
                }
                "function" == typeof config.onDownloadProgress && request.addEventListener("progress", config.onDownloadProgress), 
                "function" == typeof config.onUploadProgress && request.upload && request.upload.addEventListener("progress", config.onUploadProgress), 
                config.cancelToken && config.cancelToken.promise.then(function(cancel) {
                    request && (request.abort(), reject(cancel), request = null);
                }), void 0 === requestData && (requestData = null), request.send(requestData);
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var enhanceError = __webpack_require__(29);
        module.exports = function(message, config, code, request, response) {
            var error = new Error(message);
            return enhanceError(error, config, code, request, response);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(value) {
            return !(!value || !value.__CANCEL__);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function Cancel(message) {
            this.message = message;
        }
        Cancel.prototype.toString = function() {
            return "Cancel" + (this.message ? ": " + this.message : "");
        }, Cancel.prototype.__CANCEL__ = !0, module.exports = Cancel;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function injectStyle(ssrContext) {
            __webpack_require__(42);
        }
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sign_vue__ = __webpack_require__(14), __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e0b81ec6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Sign_vue__ = __webpack_require__(44), normalizeComponent = __webpack_require__(3), __vue_styles__ = injectStyle, Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sign_vue__.a, __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e0b81ec6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Sign_vue__.a, !1, __vue_styles__, "data-v-e0b81ec6", null);
        __webpack_exports__.a = Component.exports;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__), INSTANCE = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
            baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
        });
        __webpack_exports__.a = {
            name: "Sign",
            props: {
                baseURL: {
                    type: String,
                    required: !0
                },
                apiKey: {
                    type: String,
                    required: !0
                },
                maxUserNameLength: {
                    type: String,
                    default: "30"
                }
            },
            data: function() {
                return {
                    idTokenD: null,
                    userIdD: null,
                    expiresInD: null,
                    signInBox: !1,
                    signUpBox: !1,
                    userEmail: "",
                    userPassword: "",
                    newUserName: "",
                    newUserEmail: "",
                    newUserPassword: "",
                    newUserRePassword: "",
                    requestLoading: !1
                };
            },
            methods: {
                signUp: function(event) {
                    var _this = this;
                    event && event.preventDefault(), this.alertMessage = "", "pass" != this.checkNewUserName && (this.$refs.namePlaceholder.classList.remove("shake"), 
                    setTimeout(function() {
                        _this.$refs.namePlaceholder.className += " shake";
                    }, 1)), "pass" != this.checkNewUserEmail && (this.$refs.emailPlaceholder.classList.remove("shake"), 
                    setTimeout(function() {
                        _this.$refs.emailPlaceholder.className += " shake";
                    }, 1)), "pass" != this.checkNewUserPassword && (this.$refs.passPlaceholder.classList.remove("shake"), 
                    setTimeout(function() {
                        _this.$refs.passPlaceholder.className += " shake";
                    }, 1)), "pass" != this.checkNewUserRePassword && (this.$refs.rePassPlaceholder.classList.remove("shake"), 
                    setTimeout(function() {
                        _this.$refs.rePassPlaceholder.className += " shake";
                    })), this.checkAllPass && (this.alert = !1, this.requestLoading = !0, INSTANCE.post("/signupNewUser?key=" + this.apiKey, {
                        email: this.newUserEmail,
                        password: this.newUserPassword,
                        returnSecureToken: !0
                    }).then(function(res) {
                        _this.idTokenD = res.data.idToken, _this.userIdD = res.data.localId, _this.expiresInD = res.data.expiresIn, 
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(_this.baseURL + "/commentUsers/" + res.data.localId + ".json?auth=" + res.data.idToken, {
                            name: _this.filterNewUserName,
                            email: _this.newUserEmail,
                            user_id: _this.userIdD
                        }).then(function(res) {
                            var data = [ _this.idTokenD, _this.userIdD, _this.filterNewUserName, _this.expiresInD, null ];
                            _this.signUser(data), _this.setLocalStorageItems(_this.idTokenD, _this.userIdD, _this.expiresInD, _this.filterNewUserName), 
                            _this.clearAlert(), _this.clearSignPanel();
                        }).catch(function(err) {
                            _this.setAlert("Invalid Name or Email!\n", "fail");
                        });
                    }).catch(function(err) {
                        _this.setAlert("Email address has been taken or invalid Password or Email adress!\n", "fail");
                    }));
                },
                signIn: function(event) {
                    var _this2 = this;
                    event && event.preventDefault(), this.requestLoading = !0, INSTANCE.post("/verifyPassword?key=" + this.apiKey, {
                        email: this.userEmail,
                        password: this.userPassword,
                        returnSecureToken: !0
                    }).then(function(res) {
                        _this2.idTokenD = res.data.idToken, _this2.userIdD = res.data.localId, _this2.expiresInD = res.data.expiresIn, 
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(_this2.baseURL + "/commentUsers/" + res.data.localId + ".json?auth=" + res.data.idToken).then(function(res) {
                            var data = [ _this2.idTokenD, _this2.userIdD, res.data.name, _this2.expiresInD, res.data.admin ];
                            _this2.signUser(data), _this2.setLocalStorageItems(_this2.idTokenD, _this2.userIdD, _this2.expiresInD, res.data.name, res.data.admin), 
                            _this2.clearAlert(), _this2.clearSignPanel();
                        }).catch(function(err) {
                            return _this2.setAlert("Unauthorized!\n", "fail");
                        });
                    }).catch(function(err) {
                        return _this2.setAlert("Wrong password or email!\n", "fail");
                    });
                },
                signUser: function(data) {
                    this.$emit("sign-user", data);
                },
                setAlert: function(message, style, type) {
                    var _this3 = this;
                    "append" == type ? this.alertMessage += message : this.alertMessage = message, this.alertClass = style, 
                    this.alert = !0, this.requestLoading = !1, setTimeout(function() {
                        _this3.clearAlert();
                    }, 5e3);
                },
                clearAlert: function() {
                    this.requestLoading = !1, this.alertMessage = "", this.alertClass = "", this.alert = !1;
                },
                clearSignPanel: function() {
                    this.showSignPanel = !1, this.signInBox = !1, this.signUpBox = !1, this.userEmail = "", 
                    this.userPassword = "", this.newUserName = "", this.newUserEmail = "", this.newUserPassword = "", 
                    this.newUserRePassword = "";
                },
                clearSignBox: function(from) {
                    var _this4 = this;
                    "signIn" == from ? (this.signInBox = !1, this.signUpBox = !0, this.$nextTick(function() {
                        _this4.$refs.newUserName.focus();
                    })) : (this.signInBox = !0, this.signUpBox = !1, this.$nextTick(function() {
                        _this4.$refs.email.focus();
                    })), this.clearAlert();
                },
                setLocalStorageItems: function(token, userId, expDate, userName, admin) {
                    var now = new Date(), expirationDate = new Date(now.getTime() + 1e3 * expDate);
                    localStorage.setItem("commentToken", token), localStorage.setItem("commentUserId", userId), 
                    localStorage.setItem("commentExpirationDate", expirationDate), localStorage.setItem("commentUserName", userName), 
                    localStorage.setItem("commentAdmin", admin);
                }
            },
            computed: {
                filterNewUserName: function() {
                    return this.newUserName.replace(/^ +/g, "").replace(/ +/g, " ").replace(/ +$/g, "");
                },
                checkNewUserName: function() {
                    return this.newUserName.length > 0 ? this.newUserName.length <= 30 ? "pass" : "fail" : "default";
                },
                checkNewUserEmail: function() {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return this.newUserEmail.length > 0 ? re.test(this.newUserEmail) ? "pass" : "fail" : "default";
                },
                checkNewUserPassword: function() {
                    return this.newUserPassword.length > 0 ? this.newUserPassword.length >= 8 ? "pass" : "fail" : "default";
                },
                checkNewUserRePassword: function() {
                    return this.newUserRePassword.length > 0 ? this.newUserRePassword == this.newUserPassword ? "pass" : "fail" : "default";
                },
                checkFailedName: function() {
                    return "fail" == this.checkNewUserName ? "Invalid name length! (Max: " + this.maxUserNameLength + ")" : "Username";
                },
                checkFailedEmail: function() {
                    return "fail" == this.checkNewUserEmail ? "Invalid email address!" : "Email";
                },
                checkFailedPassword: function() {
                    return "fail" == this.checkNewUserPassword ? "Minnimum 8 character!" : "Password";
                },
                checkFailedRePassword: function() {
                    return "fail" == this.checkNewUserRePassword ? "Passwords doesn't match!" : "Confirm Password";
                },
                checkAllPass: function() {
                    return "pass" == this.checkNewUserName && "pass" == this.checkNewUserEmail && "pass" == this.checkNewUserPassword && "pass" == this.checkNewUserRePassword;
                }
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__Comments_vue__ = __webpack_require__(16);
        __webpack_exports__.default = {
            install: function(Vue) {
                Vue.component("CommentGrid", __WEBPACK_IMPORTED_MODULE_0__Comments_vue__.a);
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function injectStyle(ssrContext) {
            __webpack_require__(17);
        }
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Comments_vue__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e74abe9_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Comments_vue__ = __webpack_require__(46), normalizeComponent = __webpack_require__(3), __vue_styles__ = injectStyle, Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Comments_vue__.a, __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e74abe9_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Comments_vue__.a, !1, __vue_styles__, "data-v-5e74abe9", null);
        __webpack_exports__.a = Component.exports;
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(18);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("69984730", content, !0, {});
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(1)(!1), exports.push([ module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:400,700);", "" ]), 
        exports.push([ module.i, ".loader[data-v-5e74abe9]{display:grid;grid-template-columns:1fr;grid-auto-rows:minmax(150px,auto);padding:5px}#loader[data-v-5e74abe9]{justify-self:center;align-self:center}.comments[data-v-5e74abe9] .alert{grid-column:1/3;display:grid;grid-template-columns:1fr;grid-gap:5px;border-top-left-radius:40px;border-bottom-right-radius:40px;border-width:3px 0;border-style:solid;color:#fff;font-size:13px;padding-top:15px;padding-bottom:15px;padding-left:15px;white-space:pre-line;text-align:center}.comments[data-v-5e74abe9] .alert.alert{border-color:rgba(0,0,0,.12)!important}.comments[data-v-5e74abe9] .success{background-color:#4caf50!important}.comments[data-v-5e74abe9] .pass{border-color:#4caf50!important}.comments[data-v-5e74abe9] .info{background-color:#2196f3!important}.comments[data-v-5e74abe9] .default{border-color:#2196f3!important}.comments[data-v-5e74abe9] .alert.fail{background-color:#ff5252!important}.comments[data-v-5e74abe9] .fail{border-color:#ff5252!important}.comments[data-v-5e74abe9] ::-webkit-input-placeholder{color:#92b1b3!important;text-align:center}.comments[data-v-5e74abe9] ::-moz-placeholder{color:#92b1b3!important;text-align:center}.comments[data-v-5e74abe9] :-ms-input-placeholder{color:#92b1b3!important;text-align:center}.comments[data-v-5e74abe9] :-moz-placeholder{color:#92b1b3!important;text-align:center}.comments[data-v-5e74abe9]{font-family:Roboto,sans-serif;overflow:hidden;border-radius:4px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.comments[data-v-5e74abe9] .comments{overflow-x:auto}.comments>.innerWrapper[data-v-5e74abe9]{overflow-x:auto;padding:10px 2px}.comments[data-v-5e74abe9] .noCommentWrapper{display:grid;padding-top:15px}.comments[data-v-5e74abe9] .noCommentText{color:#2a5ebe;cursor:pointer;text-align:center;border:1px solid #2a5ebe;padding:8px 10px;font-weight:700;border-radius:18px;border-top-right-radius:0;border-bottom-left-radius:0;transition:all .1s linear;-moz-transition:linear .1s all;-webkit-transition:all .1s linear}.comments[data-v-5e74abe9] .noCommentText:hover{color:#fff;background-color:#2a5ebe}.comments[data-v-5e74abe9] .userName{grid-column:1/3;display:grid;grid-template-columns:1fr .001fr;font-size:14px;line-height:14px;margin-top:2px;font-weight:700;color:#06b1b7;word-break:break-word}.comments[data-v-5e74abe9] .userName>.logOut{grid-column:2;white-space:nowrap;color:#92b1b3;cursor:pointer;margin-right:10px;transition:color .1s linear;-moz-transition:color linear .1s;-webkit-transition:color .1s linear}.comments[data-v-5e74abe9] .userName>.logOut:hover{color:#06b1b7}.comments[data-v-5e74abe9] .dot{color:#c2c6cc;font-size:13px;white-space:nowrap}.comments[data-v-5e74abe9] .avatar{border-top-left-radius:22px;border-top-right-radius:22px}.comments[data-v-5e74abe9] .avatar>svg{border-radius:50%;height:44px;width:44px;transition:.3s;-moz-transition:.3s;-webkit-transition:.3s}.comments[data-v-5e74abe9] .addComment{display:grid;grid-template-columns:.001fr 1fr;grid-auto-rows:minmax(0,auto);grid-column-gap:10px;padding-top:2px}.comments[data-v-5e74abe9] .commentBox{display:grid;grid-template-columns:minmax(200px,auto) .2fr;grid-auto-rows:minmax(0,-webkit-max-content);grid-auto-rows:minmax(0,max-content);grid-auto-rows:minmax(0,-moz-max-content);grid-row-gap:10px;overflow:auto}.comments[data-v-5e74abe9] .commentBox>textarea{color:#2a2e2e;justify-self:stretch;padding:8px 22px 8px 10px;border-radius:18px;border:1px solid rgba(204,212,216,.8);overflow:hidden;resize:none}.comments[data-v-5e74abe9] .commentBox>button,.comments[data-v-5e74abe9] .commentBox>textarea{font-family:Roboto,sans-serif;box-sizing:border-box;height:32px;font-size:13px;line-height:16px;outline:none;transition:all .1s linear;-moz-transition:linear .1s all;-webkit-transition:all .1s linear}.comments[data-v-5e74abe9] .commentBox>button{background-color:#2a5ebe;align-self:end;color:#fff;max-height:32px;padding:8px 10px;font-weight:700;border-radius:18px;border:none;cursor:pointer;z-index:100}.comments[data-v-5e74abe9] .commentBox>button:hover{background-color:#254b91}.comments[data-v-5e74abe9] .remainingLetter{justify-self:end;align-self:start;box-sizing:border-box;height:32px;display:grid;border-top-left-radius:18px;padding-left:3px;padding-right:22px;margin-top:-42px;margin-right:-22px;z-index:99}.comments[data-v-5e74abe9] .remainingLetter>span{align-self:center;font-size:11px;line-height:11px;padding:3px;color:#eee}.comments[data-v-5e74abe9] .updateLimit{display:grid;grid-template-columns:1fr}.comments[data-v-5e74abe9] .limit{color:#06b1b7;font-weight:700;justify-self:center;font-size:14px;line-height:14px;box-sizing:border-box;border-radius:18px;padding:8px 10px;cursor:pointer;transition:all .1s linear;-moz-transition:linear .1s all;-webkit-transition:all .1s linear}.comments[data-v-5e74abe9] .limit:hover{color:#fff;background-color:#2196f3}.comments[data-v-5e74abe9] .fade-enter{opacity:0}.comments[data-v-5e74abe9] .fade-enter-active,.comments[data-v-5e74abe9] .fade-leave-active{transition:opacity .3s;-moz-transition:opacity .3s;-webkit-transition:opacity .3s}.comments[data-v-5e74abe9] .fade-leave-active{opacity:0}@media screen and (max-width:480px){.comments[data-v-5e74abe9] .avatar>svg{height:20px;width:20px}.comments[data-v-5e74abe9] .nameWrapper>.time{overflow:hidden;width:38px;text-overflow:ellipsis}}@media (hover:none){.comments[data-v-5e74abe9] ::-webkit-scrollbar{-webkit-appearance:none!important;width:5px!important;height:5px!important;background-color:rgba(204,212,216,.2)!important}.comments[data-v-5e74abe9] ::-webkit-scrollbar-thumb{background:rgba(204,212,216,.7)!important}.comments[data-v-5e74abe9] .commentBox{overflow:unset}}.comments[data-v-5e74abe9] .requestLoading{display:inline-block;border:4px solid transparent;border-left-color:#fff;border-radius:50%;width:10px;height:10px;animation:requestLoading-spin-data-v-5e74abe9 .5s linear infinite}@keyframes requestLoading-spin-data-v-5e74abe9{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", "" ]);
    }, function(module, exports) {
        module.exports = function(parentId, list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    id: parentId + ":" + i,
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function injectStyle(ssrContext) {
            __webpack_require__(21);
        }
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Comment_vue__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_097e07e6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Comment_vue__ = __webpack_require__(45), normalizeComponent = __webpack_require__(3), __vue_styles__ = injectStyle, Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Comment_vue__.a, __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_097e07e6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Comment_vue__.a, !1, __vue_styles__, "data-v-097e07e6", null);
        __webpack_exports__.a = Component.exports;
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(22);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("79cbfe92", content, !0, {});
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(1)(!1), exports.push([ module.i, ".comments[data-v-097e07e6]{font-family:Roboto,sans-serif;overflow:hidden;border-radius:4px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.comments[data-v-097e07e6] .wrapper{display:grid;grid-template-columns:.001fr 1fr;grid-auto-rows:minmax(0,auto);grid-column-gap:10px;padding-top:15px}.comments[data-v-097e07e6] .commentWrapper{display:grid;grid-auto-rows:minmax(0,auto);grid-auto-columns:minmax(-webkit-min-content,-webkit-max-content);grid-auto-columns:minmax(min-content,max-content);grid-auto-columns:minmax(-moz-min-content,-moz-max-content);grid-gap:10px}.comments[data-v-097e07e6] .hiddenMessage{color:#ffc107;word-break:break-word;font-size:13px}.comments[data-v-097e07e6] .nameWrapper{display:grid;grid-template-columns:repeat(4,.001fr);grid-auto-columns:minmax(0,auto);grid-column-gap:5px;line-height:13px;white-space:nowrap;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.comments[data-v-097e07e6] .nameWrapper>.name{color:#06b1b7;font-size:14px;line-height:14px;font-weight:700;white-space:nowrap}.comments[data-v-097e07e6] .nameWrapper>.time{cursor:help;font-size:13px;color:#92b1b3;white-space:nowrap;text-decoration:none}.comments[data-v-097e07e6] .nameWrapper>.expand{cursor:pointer;display:grid;width:22px;height:13px;border-radius:3px;color:#ccd4d8;box-shadow:inset 0 0 0 2px #ccd4d8;transition:color .1s linear;-moz-transition:color linear .1s;-webkit-transition:color .1s linear}.comments[data-v-097e07e6] .nameWrapper>.expand:hover{color:#2196f3}.comments[data-v-097e07e6] .nameWrapper>.expand>span{align-self:center;justify-self:center;font-size:20px}.comments[data-v-097e07e6] .comment{white-space:pre-wrap;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;background:#fff;color:#1d2129;font-size:13px;line-height:16px;font-kerning:normal;padding:8px 10px;border-radius:18px;border:1px solid rgba(204,212,216,.8);min-width:-webkit-min-content;min-width:min-content;min-width:-moz-min-content;max-width:-webkit-max-content;max-width:max-content;max-width:-moz-max-content}.comments[data-v-097e07e6] .reply{display:grid;grid-template-columns:repeat(7,.001fr);grid-auto-columns:minmax(0,auto);grid-auto-rows:minmax(0,auto);grid-column-gap:5px;font-size:13px;white-space:nowrap;color:#92b1b3;margin-top:-8px;margin-left:10px;transition:color .1s linear;-moz-transition:color linear .1s;-webkit-transition:color .1s linear;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.comments[data-v-097e07e6] .reply>div{cursor:pointer}.comments[data-v-097e07e6] .reply>div:hover{color:#2196f3}.comments[data-v-097e07e6] .reply>.delete{display:grid;box-sizing:border-box;height:-webkit-min-content;height:-moz-min-content;height:min-content}.comments[data-v-097e07e6] .reply>.delete:hover,.comments[data-v-097e07e6] .reply>.delete>.deleteText:hover{color:#ff5252}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(0,auto);grid-gap:3px;color:#ff5252;box-sizing:border-box;background-color:#fff;padding:3px 13px;border-radius:4px;height:-webkit-max-content;height:-moz-max-content;height:max-content;border-top-left-radius:18px;border-top-right-radius:18px;border:1px solid rgba(204,212,216,.8);margin-top:-60px;margin-left:-24px;z-index:999}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>label{grid-column:1/3;grid-row:2;font-weight:700;margin-left:-7px}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>button{grid-row:1;font-size:11px;font-family:Roboto,sans-serif;background-color:#2a5ebe;color:#fff;font-size:12px;line-height:15px;border-radius:18px;border:none;cursor:pointer;outline:none;transition:all .1s linear;-moz-transition:linear .1s all;-webkit-transition:all .1s linear}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>.yesPrompt{border:1px solid rgba(42,94,190,.9);background-color:rgba(42,94,190,.9);color:fff}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>.yesPrompt:hover{border:1px solid #ff5252;background-color:#ff5252;color:#fff}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>.noPrompt{border:1px solid rgba(42,94,190,.9);background-color:#fff;color:rgba(42,94,190,.9)}.comments[data-v-097e07e6] .reply>.delete>.deletePrompt>.noPrompt:hover{border:1px solid rgba(42,94,190,.9);background-color:rgba(42,94,190,.9);color:#fff}.comments[data-v-097e07e6] .popUp-enter-active{animation:pop-up-data-v-097e07e6 .2s ease-out forwards}.comments[data-v-097e07e6] .popUp-leave-active{animation:pop-out-data-v-097e07e6 .2s ease-out forwards}@keyframes pop-up-data-v-097e07e6{0%{margin-top:-45px;opacity:0}to{margin-top:-60px;opacity:1}}@keyframes pop-out-data-v-097e07e6{0%{margin-top:-60px;opacity:1}to{opacity:0;margin-top:-45px}}", "" ]);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function createInstance(defaultConfig) {
            var context = new Axios(defaultConfig), instance = bind(Axios.prototype.request, context);
            return utils.extend(instance, Axios.prototype, context), utils.extend(instance, context), 
            instance;
        }
        var utils = __webpack_require__(0), bind = __webpack_require__(8), Axios = __webpack_require__(25), defaults = __webpack_require__(5), axios = createInstance(defaults);
        axios.Axios = Axios, axios.create = function(instanceConfig) {
            return createInstance(utils.merge(defaults, instanceConfig));
        }, axios.Cancel = __webpack_require__(12), axios.CancelToken = __webpack_require__(40), 
        axios.isCancel = __webpack_require__(11), axios.all = function(promises) {
            return Promise.all(promises);
        }, axios.spread = __webpack_require__(41), module.exports = axios, module.exports.default = axios;
    }, function(module, exports) {
        function isBuffer(obj) {
            return !!obj.constructor && "function" == typeof obj.constructor.isBuffer && obj.constructor.isBuffer(obj);
        }
        function isSlowBuffer(obj) {
            return "function" == typeof obj.readFloatLE && "function" == typeof obj.slice && isBuffer(obj.slice(0, 0));
        }
        /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
        module.exports = function(obj) {
            return null != obj && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function Axios(instanceConfig) {
            this.defaults = instanceConfig, this.interceptors = {
                request: new InterceptorManager(),
                response: new InterceptorManager()
            };
        }
        var defaults = __webpack_require__(5), utils = __webpack_require__(0), InterceptorManager = __webpack_require__(35), dispatchRequest = __webpack_require__(36);
        Axios.prototype.request = function(config) {
            "string" == typeof config && (config = utils.merge({
                url: arguments[0]
            }, arguments[1])), config = utils.merge(defaults, {
                method: "get"
            }, this.defaults, config), config.method = config.method.toLowerCase();
            var chain = [ dispatchRequest, void 0 ], promise = Promise.resolve(config);
            for (this.interceptors.request.forEach(function(interceptor) {
                chain.unshift(interceptor.fulfilled, interceptor.rejected);
            }), this.interceptors.response.forEach(function(interceptor) {
                chain.push(interceptor.fulfilled, interceptor.rejected);
            }); chain.length; ) promise = promise.then(chain.shift(), chain.shift());
            return promise;
        }, utils.forEach([ "delete", "get", "head", "options" ], function(method) {
            Axios.prototype[method] = function(url, config) {
                return this.request(utils.merge(config || {}, {
                    method: method,
                    url: url
                }));
            };
        }), utils.forEach([ "post", "put", "patch" ], function(method) {
            Axios.prototype[method] = function(url, data, config) {
                return this.request(utils.merge(config || {}, {
                    method: method,
                    url: url,
                    data: data
                }));
            };
        }), module.exports = Axios;
    }, function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, 
        process.listeners = function(name) {
            return [];
        }, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0);
        module.exports = function(headers, normalizedName) {
            utils.forEach(headers, function(value, name) {
                name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase() && (headers[normalizedName] = value, 
                delete headers[name]);
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var createError = __webpack_require__(10);
        module.exports = function(resolve, reject, response) {
            var validateStatus = response.config.validateStatus;
            response.status && validateStatus && !validateStatus(response.status) ? reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response)) : resolve(response);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(error, config, code, request, response) {
            return error.config = config, code && (error.code = code), error.request = request, 
            error.response = response, error;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function encode(val) {
            return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        var utils = __webpack_require__(0);
        module.exports = function(url, params, paramsSerializer) {
            if (!params) return url;
            var serializedParams;
            if (paramsSerializer) serializedParams = paramsSerializer(params); else if (utils.isURLSearchParams(params)) serializedParams = params.toString(); else {
                var parts = [];
                utils.forEach(params, function(val, key) {
                    null !== val && void 0 !== val && (utils.isArray(val) ? key += "[]" : val = [ val ], 
                    utils.forEach(val, function(v) {
                        utils.isDate(v) ? v = v.toISOString() : utils.isObject(v) && (v = JSON.stringify(v)), 
                        parts.push(encode(key) + "=" + encode(v));
                    }));
                }), serializedParams = parts.join("&");
            }
            return serializedParams && (url += (-1 === url.indexOf("?") ? "?" : "&") + serializedParams), 
            url;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0), ignoreDuplicateOf = [ "age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent" ];
        module.exports = function(headers) {
            var key, val, i, parsed = {};
            return headers ? (utils.forEach(headers.split("\n"), function(line) {
                if (i = line.indexOf(":"), key = utils.trim(line.substr(0, i)).toLowerCase(), val = utils.trim(line.substr(i + 1)), 
                key) {
                    if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) return;
                    parsed[key] = "set-cookie" === key ? (parsed[key] ? parsed[key] : []).concat([ val ]) : parsed[key] ? parsed[key] + ", " + val : val;
                }
            }), parsed) : parsed;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0);
        module.exports = utils.isStandardBrowserEnv() ? function() {
            function resolveURL(url) {
                var href = url;
                return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), 
                urlParsingNode.setAttribute("href", href), {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
                    host: urlParsingNode.host,
                    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
                    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
                };
            }
            var originURL, msie = /(msie|trident)/i.test(navigator.userAgent), urlParsingNode = document.createElement("a");
            return originURL = resolveURL(window.location.href), function(requestURL) {
                var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
                return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
            };
        }() : function() {
            return function() {
                return !0;
            };
        }();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function E() {
            this.message = "String contains an invalid character";
        }
        function btoa(input) {
            for (var block, charCode, str = String(input), output = "", idx = 0, map = chars; str.charAt(0 | idx) || (map = "=", 
            idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
                if ((charCode = str.charCodeAt(idx += .75)) > 255) throw new E();
                block = block << 8 | charCode;
            }
            return output;
        }
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        E.prototype = new Error(), E.prototype.code = 5, E.prototype.name = "InvalidCharacterError", 
        module.exports = btoa;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0);
        module.exports = utils.isStandardBrowserEnv() ? function() {
            return {
                write: function(name, value, expires, path, domain, secure) {
                    var cookie = [];
                    cookie.push(name + "=" + encodeURIComponent(value)), utils.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString()), 
                    utils.isString(path) && cookie.push("path=" + path), utils.isString(domain) && cookie.push("domain=" + domain), 
                    !0 === secure && cookie.push("secure"), document.cookie = cookie.join("; ");
                },
                read: function(name) {
                    var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
                    return match ? decodeURIComponent(match[3]) : null;
                },
                remove: function(name) {
                    this.write(name, "", Date.now() - 864e5);
                }
            };
        }() : function() {
            return {
                write: function() {},
                read: function() {
                    return null;
                },
                remove: function() {}
            };
        }();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function InterceptorManager() {
            this.handlers = [];
        }
        var utils = __webpack_require__(0);
        InterceptorManager.prototype.use = function(fulfilled, rejected) {
            return this.handlers.push({
                fulfilled: fulfilled,
                rejected: rejected
            }), this.handlers.length - 1;
        }, InterceptorManager.prototype.eject = function(id) {
            this.handlers[id] && (this.handlers[id] = null);
        }, InterceptorManager.prototype.forEach = function(fn) {
            utils.forEach(this.handlers, function(h) {
                null !== h && fn(h);
            });
        }, module.exports = InterceptorManager;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function throwIfCancellationRequested(config) {
            config.cancelToken && config.cancelToken.throwIfRequested();
        }
        var utils = __webpack_require__(0), transformData = __webpack_require__(37), isCancel = __webpack_require__(11), defaults = __webpack_require__(5), isAbsoluteURL = __webpack_require__(38), combineURLs = __webpack_require__(39);
        module.exports = function(config) {
            return throwIfCancellationRequested(config), config.baseURL && !isAbsoluteURL(config.url) && (config.url = combineURLs(config.baseURL, config.url)), 
            config.headers = config.headers || {}, config.data = transformData(config.data, config.headers, config.transformRequest), 
            config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {}), 
            utils.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], function(method) {
                delete config.headers[method];
            }), (config.adapter || defaults.adapter)(config).then(function(response) {
                return throwIfCancellationRequested(config), response.data = transformData(response.data, response.headers, config.transformResponse), 
                response;
            }, function(reason) {
                return isCancel(reason) || (throwIfCancellationRequested(config), reason && reason.response && (reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse))), 
                Promise.reject(reason);
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__(0);
        module.exports = function(data, headers, fns) {
            return utils.forEach(fns, function(fn) {
                data = fn(data, headers);
            }), data;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(url) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(baseURL, relativeURL) {
            return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function CancelToken(executor) {
            if ("function" != typeof executor) throw new TypeError("executor must be a function.");
            var resolvePromise;
            this.promise = new Promise(function(resolve) {
                resolvePromise = resolve;
            });
            var token = this;
            executor(function(message) {
                token.reason || (token.reason = new Cancel(message), resolvePromise(token.reason));
            });
        }
        var Cancel = __webpack_require__(12);
        CancelToken.prototype.throwIfRequested = function() {
            if (this.reason) throw this.reason;
        }, CancelToken.source = function() {
            var cancel;
            return {
                token: new CancelToken(function(c) {
                    cancel = c;
                }),
                cancel: cancel
            };
        }, module.exports = CancelToken;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(callback) {
            return function(arr) {
                return callback.apply(null, arr);
            };
        };
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(43);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("fd42f554", content, !0, {});
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(1)(!1), exports.push([ module.i, '.signBox[data-v-e0b81ec6]{display:grid;grid-template-columns:1fr;grid-auto-rows:minmax(0,auto)}.firstSign[data-v-e0b81ec6]{display:grid;grid-template-columns:1fr .001fr 1fr;grid-auto-rows:minmax(0,auto);white-space:nowrap;grid-gap:5px}.firstSign>button[data-v-e0b81ec6],.signIn>button[data-v-e0b81ec6],.signUp>button[data-v-e0b81ec6]{width:100%;height:100%;font-family:Roboto,sans-serif;background-color:rgba(42,94,190,.9);color:#fff;box-sizing:border-box;padding:8px 10px;font-size:13px;line-height:16px;font-weight:700;border-radius:4px;border:none;cursor:pointer;outline:none;transition:all .1s linear;-moz-transition:linear .1s all;-webkit-transition:all .1s linear}.firstSign>.secondary[data-v-e0b81ec6],.signIn.secondary>button[data-v-e0b81ec6],.signUp.secondary>button[data-v-e0b81ec6]{border:2px solid rgba(42,94,190,.9);background-color:#fff;color:rgba(42,94,190,.9)}.firstSign>button[data-v-e0b81ec6]:hover,.signIn>button[data-v-e0b81ec6]:hover,.signUp>button[data-v-e0b81ec6]:hover{background-color:rgba(37,75,145,.9);color:#fff}.signBoxes>form[data-v-e0b81ec6]{display:grid;grid-template-columns:.001fr;grid-auto-columns:minmax(auto,-webkit-max-content);grid-auto-columns:minmax(auto,-moz-max-content);grid-auto-columns:minmax(auto,max-content);grid-auto-rows:minmax(0,auto);grid-gap:10px;grid-column-gap:5px;margin-bottom:10px;padding-top:10px}.inputBoxes[data-v-e0b81ec6]{grid-column:1;display:grid;grid-template-columns:.001fr;grid-auto-rows:minmax(0,auto)}.inputBoxes>input[data-v-e0b81ec6]{font-family:Roboto,sans-serif;box-sizing:border-box;background-color:#fff;border:none;border-bottom:2px solid #333;line-height:12px;outline:none;padding:10px 8px 2px;height:30px;text-overflow:ellipsis;margin-left:1px;margin-top:2px;border-top-left-radius:49px;border-top-right-radius:49px}.placeholder[data-v-e0b81ec6]{grid-column:1;align-self:center;justify-self:center;font-size:12px;margin-top:-21px;pointer-events:none;transition:all .2s ease;-moz-transition:.2s ease all;-webkit-transition:all .2s ease}.inputBoxes>input:focus~label[data-v-e0b81ec6]{margin-top:-60px}.inputBoxes>.upperHolder[data-v-e0b81ec6],.inputBoxes>input:focus~label[data-v-e0b81ec6]{color:#fff;box-sizing:border-box;font-size:12px;padding:2px 5px;border-radius:18px;background-color:#2a5ebe}.inputBoxes>.upperHolder[data-v-e0b81ec6]{margin-top:-60px!important}.inputBoxes>.placeholder.pass[data-v-e0b81ec6]{background-color:#4caf50!important}.inputBoxes>.placeholder.fail[data-v-e0b81ec6],.inputBoxes>.placeholder.pass[data-v-e0b81ec6]{margin-top:-60px!important;color:#fff;box-sizing:border-box;font-size:12px;padding:2px 5px;border-radius:18px}.inputBoxes>.placeholder.fail[data-v-e0b81ec6]{background-color:#ff5252!important}.bar[data-v-e0b81ec6]{position:relative}.bar[data-v-e0b81ec6]:after,.bar[data-v-e0b81ec6]:before{content:"";height:3px;width:0;bottom:0;position:absolute;background:#2a5ebe;transition:all .2s ease;-moz-transition:.2s ease all;-webkit-transition:all .2s ease}.bar[data-v-e0b81ec6]:before{left:50%}.bar[data-v-e0b81ec6]:after{right:50%}.inputBoxes>input:focus~.bar[data-v-e0b81ec6]:before,input:focus~.bar[data-v-e0b81ec6]:after{width:50%}.or[data-v-e0b81ec6]{grid-column:3;align-self:center;justify-self:center}.signIn[data-v-e0b81ec6]{grid-row:1/3}.signUp[data-v-e0b81ec6]{grid-row:1/5;align-self:stretch;justify-self:stretch}@media (hover:none){.signIn.secondary>button[data-v-e0b81ec6]:hover,.signUp.secondary>button[data-v-e0b81ec6]:hover{background-color:#fff;color:rgba(42,94,190,.9)}}input[data-v-e0b81ec6]:-webkit-autofill{animation-name:autofill-data-v-e0b81ec6;animation-fill-mode:both;-webkit-animation-name:autofill-data-v-e0b81ec6;-webkit-animation-fill-mode:both}@keyframes autofill-data-v-e0b81ec6{to{color:#1d2129;border-top-left-radius:49px;border-top-right-radius:49px;background-color:#fff}}@-webkit-keyframes autofill-data-v-e0b81ec6{to{color:#1d2129;border-top-left-radius:49px;border-top-right-radius:49px;background-color:#fff}}.shake[data-v-e0b81ec6]{animation-name:shakeKeyframe-data-v-e0b81ec6;animation-duration:.8s;animation-iteration-count:1}@keyframes shakeKeyframe-data-v-e0b81ec6{0%,to{transform:translateZ(0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}', "" ]);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function() {
            var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
            return _c("div", {
                staticClass: "signBox"
            }, [ _c("div", {
                staticClass: "firstSign"
            }, [ _vm.signUpBox || _vm.signInBox ? _vm._e() : _c("button", {
                on: {
                    click: function($event) {
                        _vm.clearSignBox("signUp");
                    }
                }
            }, [ _vm._v("Log IN") ]), _vm._v(" "), _vm.signUpBox || _vm.signInBox ? _vm._e() : _c("span", {
                staticClass: "dot",
                staticStyle: {
                    "align-self": "center"
                }
            }, [ _vm._v("•") ]), _vm._v(" "), _vm.signInBox || _vm.signUpBox ? _vm._e() : _c("button", {
                staticClass: "secondary",
                on: {
                    click: function($event) {
                        _vm.clearSignBox("signIn");
                    }
                }
            }, [ _vm._v("Sign UP") ]) ]), _vm._v(" "), _vm.signInBox ? _c("div", {
                staticClass: "signBoxes"
            }, [ _c("form", {
                attrs: {
                    method: "post"
                },
                on: {
                    submit: function($event) {
                        _vm.signIn($event);
                    }
                }
            }, [ _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userEmail,
                    expression: "userEmail"
                } ],
                ref: "email",
                staticClass: "default",
                attrs: {
                    type: "email",
                    name: "userEmail",
                    id: "userEmail",
                    spellcheck: "false",
                    required: ""
                },
                domProps: {
                    value: _vm.userEmail
                },
                on: {
                    input: function($event) {
                        $event.target.composing || (_vm.userEmail = $event.target.value);
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                staticClass: "placeholder",
                class: 0 != _vm.userEmail.length ? "upperHolder" : ""
            }, [ _vm._v("Email") ]) ]), _vm._v(" "), _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userPassword,
                    expression: "userPassword"
                } ],
                staticClass: "default",
                attrs: {
                    type: "password",
                    name: "userPassword",
                    id: "userPassword",
                    required: ""
                },
                domProps: {
                    value: _vm.userPassword
                },
                on: {
                    input: function($event) {
                        $event.target.composing || (_vm.userPassword = $event.target.value);
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                staticClass: "placeholder",
                class: 0 != _vm.userPassword.length ? "upperHolder" : ""
            }, [ _vm._v("Password") ]) ]), _vm._v(" "), _c("div", {
                staticClass: "signIn",
                staticStyle: {
                    "grid-column": "2"
                }
            }, [ _vm.requestLoading ? _c("button", {
                on: {
                    click: function($event) {
                        if ($event.preventDefault(), $event.target !== $event.currentTarget) return null;
                    }
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", [ _vm._v("Log IN") ]) ]), _vm._v(" "), _c("span", {
                staticClass: "dot or",
                staticStyle: {
                    "grid-row": "1/3"
                }
            }, [ _vm._v("•") ]), _vm._v(" "), _c("div", {
                staticClass: "signIn secondary",
                staticStyle: {
                    "grid-column": "4"
                }
            }, [ _c("button", {
                staticClass: "signIn",
                on: {
                    click: function($event) {
                        $event.preventDefault(), _vm.clearSignBox("signIn");
                    }
                }
            }, [ _vm._v("Sign UP") ]) ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "fade"
                }
            }, [ _vm.alert ? _c("div", {
                key: _vm.alertClass,
                staticClass: "alert",
                class: _vm.alertClass,
                staticStyle: {
                    "grid-column": "1/5"
                }
            }, [ _c("div", [ _vm._v(_vm._s(_vm.alertMessage)) ]) ]) : _vm._e() ]) ], 1) ]) : _vm._e(), _vm._v(" "), _vm.signUpBox ? _c("div", {
                staticClass: "signBoxes"
            }, [ _c("form", {
                attrs: {
                    method: "post"
                },
                on: {
                    submit: function($event) {
                        _vm.signUp($event);
                    }
                }
            }, [ _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.newUserName,
                    expression: "newUserName",
                    modifiers: {
                        lazy: !0
                    }
                } ],
                ref: "newUserName",
                class: _vm.checkNewUserName,
                attrs: {
                    type: "text",
                    name: "newUserName",
                    id: "newUserName",
                    required: "",
                    spellcheck: "false"
                },
                domProps: {
                    value: _vm.newUserName
                },
                on: {
                    change: function($event) {
                        _vm.newUserName = $event.target.value;
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                ref: "namePlaceholder",
                staticClass: "placeholder",
                class: _vm.checkNewUserName
            }, [ _vm._v(_vm._s(_vm.checkFailedName)) ]) ]), _vm._v(" "), _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.newUserEmail,
                    expression: "newUserEmail",
                    modifiers: {
                        lazy: !0
                    }
                } ],
                class: _vm.checkNewUserEmail,
                attrs: {
                    type: "email",
                    name: "newUserEmail",
                    id: "newUserEmail",
                    required: "",
                    spellcheck: "false"
                },
                domProps: {
                    value: _vm.newUserEmail
                },
                on: {
                    change: function($event) {
                        _vm.newUserEmail = $event.target.value;
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                ref: "emailPlaceholder",
                staticClass: "placeholder",
                class: _vm.checkNewUserEmail
            }, [ _vm._v(_vm._s(_vm.checkFailedEmail)) ]) ]), _vm._v(" "), _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.newUserPassword,
                    expression: "newUserPassword",
                    modifiers: {
                        lazy: !0
                    }
                } ],
                class: _vm.checkNewUserPassword,
                attrs: {
                    type: "password",
                    name: "newUserPassword",
                    id: "newUserPassword",
                    required: ""
                },
                domProps: {
                    value: _vm.newUserPassword
                },
                on: {
                    change: function($event) {
                        _vm.newUserPassword = $event.target.value;
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                ref: "passPlaceholder",
                staticClass: "placeholder",
                class: _vm.checkNewUserPassword
            }, [ _vm._v(_vm._s(_vm.checkFailedPassword)) ]) ]), _vm._v(" "), _c("div", {
                staticClass: "inputBoxes"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.newUserRePassword,
                    expression: "newUserRePassword",
                    modifiers: {
                        lazy: !0
                    }
                } ],
                class: _vm.checkNewUserRePassword,
                attrs: {
                    type: "password",
                    name: "newUserRePassword",
                    id: "newUserRePassword",
                    required: ""
                },
                domProps: {
                    value: _vm.newUserRePassword
                },
                on: {
                    change: function($event) {
                        _vm.newUserRePassword = $event.target.value;
                    }
                }
            }), _vm._v(" "), _c("span", {
                staticClass: "bar"
            }), _vm._v(" "), _c("label", {
                ref: "rePassPlaceholder",
                staticClass: "placeholder",
                class: _vm.checkNewUserRePassword
            }, [ _vm._v(_vm._s(_vm.checkFailedRePassword)) ]) ]), _vm._v(" "), _c("div", {
                staticClass: "signUp",
                staticStyle: {
                    "grid-column": "2"
                }
            }, [ _vm.requestLoading ? _c("button", {
                on: {
                    click: function($event) {
                        if ($event.preventDefault(), $event.target !== $event.currentTarget) return null;
                    }
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", [ _vm._v("Sign Up") ]) ]), _vm._v(" "), _c("span", {
                staticClass: "dot or",
                staticStyle: {
                    "grid-row": "1/5"
                }
            }, [ _vm._v("•") ]), _vm._v(" "), _c("div", {
                staticClass: "signUp secondary",
                staticStyle: {
                    "grid-column": "4"
                }
            }, [ _c("button", {
                on: {
                    click: function($event) {
                        $event.preventDefault(), _vm.clearSignBox("signUp");
                    }
                }
            }, [ _vm._v("Log IN") ]) ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "fade"
                }
            }, [ _vm.alert ? _c("div", {
                key: _vm.alertClass,
                staticClass: "alert",
                class: _vm.alertClass,
                staticStyle: {
                    "grid-column": "1/5"
                }
            }, [ _c("div", [ _vm._v(_vm._s(_vm.alertMessage)) ]) ]) : _vm._e() ]) ], 1) ]) : _vm._e() ]);
        }, staticRenderFns = [], esExports = {
            render: render,
            staticRenderFns: staticRenderFns
        };
        __webpack_exports__.a = esExports;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function() {
            var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
            return _c("div", {
                staticClass: "comments"
            }, [ _c("div", {
                staticClass: "wrapper",
                on: {
                    mouseenter: function($event) {
                        _vm.showHideBar = !0, _vm.$emit("close-hide-bar", !1);
                    },
                    mouseleave: function($event) {
                        _vm.showHideBar = !1, _vm.$emit("close-hide-bar", !0);
                    }
                }
            }, [ _c("div", {
                staticClass: "avatar",
                style: _vm.styleShadow
            }, [ _c("svg", {
                ref: "svgAvatar"
            }) ]), _vm._v(" "), _vm.hideMessage ? _c("div", {
                staticClass: "commentWrapper"
            }, [ _c("div", {
                staticClass: "nameWrapper"
            }, [ _c("div", {
                staticClass: "name",
                style: {
                    color: _vm.userNameColor
                }
            }, [ _vm._v(_vm._s(_vm.name)) ]), _vm._v(" "), _c("span", {
                staticClass: "dot"
            }, [ _vm._v("•") ]), _vm._v(" "), _c("a", {
                staticClass: "time",
                attrs: {
                    title: _vm.getTime
                }
            }, [ _vm._v(_vm._s(_vm.getTimeDiff)) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showHideBar || _vm.wrapperSize < 1024,
                    expression: "showHideBar || wrapperSize < 1024"
                } ],
                staticClass: "expand",
                on: {
                    click: function($event) {
                        _vm.hideMessage = !1;
                    }
                }
            }, [ _c("span", {
                attrs: {
                    title: "Show Comment"
                }
            }, [ _vm._v("+") ]) ]), _vm._v(" "), _c("span", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showHideBar && !_vm.wrapperSize < 1024,
                    expression: "!showHideBar && ! wrapperSize < 1024"
                } ],
                staticStyle: {
                    width: "22px"
                }
            }) ]), _vm._v(" "), _vm._m(0) ]) : _vm._e(), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.hideMessage,
                    expression: "!hideMessage"
                } ],
                staticClass: "commentWrapper"
            }, [ _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.beforeUpdate,
                    expression: "!beforeUpdate"
                } ],
                staticClass: "nameWrapper"
            }, [ _c("div", {
                staticClass: "name",
                style: {
                    color: _vm.userNameColor
                }
            }, [ _vm._v(_vm._s(_vm.name)) ]), _vm._v(" "), _c("span", {
                staticClass: "dot"
            }, [ _vm._v("•") ]), _vm._v(" "), _c("span", {
                staticClass: "time",
                attrs: {
                    title: _vm.getTime
                }
            }, [ _vm._v(_vm._s(_vm.getTimeDiff)) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showHideBar || _vm.wrapperSize < 1024,
                    expression: "showHideBar || wrapperSize < 1024"
                } ],
                staticClass: "expand",
                on: {
                    click: function($event) {
                        _vm.hideMessage = !0;
                    }
                }
            }, [ _c("span", {
                attrs: {
                    title: "Hide Comment"
                }
            }, [ _vm._v("−") ]) ]), _vm._v(" "), _c("span", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showHideBar && !_vm.wrapperSize < 1024,
                    expression: "!showHideBar && !wrapperSize < 1024"
                } ],
                staticStyle: {
                    width: "22px"
                }
            }) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.beforeUpdate,
                    expression: "!beforeUpdate"
                } ],
                ref: "comment",
                staticClass: "comment",
                style: {
                    background: _vm.commentBackgroundColor,
                    color: _vm.commentTextColor
                }
            }, [ _vm._v(_vm._s(_vm.filteredComment)) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.beforeUpdate,
                    expression: "beforeUpdate"
                } ],
                key: "commentBox",
                staticClass: "commentBox"
            }, [ _c("div", {
                staticClass: "userName",
                style: {
                    color: _vm.userNameColor
                }
            }, [ _vm._v(_vm._s(_vm.name)) ]), _vm._v(" "), _c("textarea", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.updateMessage,
                    expression: "updateMessage"
                } ],
                ref: "addUpdate",
                staticClass: "addComment",
                style: {
                    background: _vm.commentBackgroundColor,
                    color: _vm.commentTextColor,
                    height: _vm.updateHeight + "px"
                },
                attrs: {
                    name: "addUpdate",
                    placeholder: "Update message",
                    spellcheck: "false",
                    "aria-label": "Add Comment"
                },
                domProps: {
                    value: _vm.updateMessage
                },
                on: {
                    keyup: function($event) {
                        _vm.resize($event, !0);
                    },
                    input: function($event) {
                        $event.target.composing || (_vm.updateMessage = $event.target.value);
                    }
                }
            }), _vm._v(" "), _vm.requestLoading ? _c("button", {
                attrs: {
                    "aria-label": "Update"
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", {
                attrs: {
                    "aria-label": "Update"
                },
                on: {
                    click: _vm.update
                }
            }, [ _vm._v("Update") ]), _vm._v(" "), _c("div", {
                staticClass: "remainingLetter",
                style: {
                    background: _vm.remainigUpdateLetter < 0 ? "rgba(255, 82, 82,1)" : "rgba(42, 94, 190, 1)"
                }
            }, [ _c("span", [ _vm._v(_vm._s(_vm.remainigUpdateLetter)) ]) ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "fade"
                }
            }, [ _vm.alert ? _c("div", {
                key: _vm.alertClass,
                staticClass: "alert",
                class: _vm.alertClass,
                staticStyle: {
                    "align-self": "start",
                    "margin-top": "-5px",
                    "margin-bottom": "7px"
                }
            }, [ _c("div", [ _vm._v(_vm._s(_vm.alertMessage)) ]) ]) : _vm._e() ]) ], 1), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.beforeUpdate,
                    expression: "beforeUpdate"
                } ],
                staticClass: "reply"
            }, [ _c("div", {
                staticStyle: {
                    "margin-top": "-8px"
                },
                on: {
                    click: function($event) {
                        _vm.beforeUpdate = !1;
                    }
                }
            }, [ _vm._v("Newer mind") ]) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.beforeUpdate,
                    expression: "!beforeUpdate"
                } ],
                staticClass: "reply"
            }, [ _c("div", {
                on: {
                    click: function($event) {
                        _vm.handleBeforeReply();
                    }
                }
            }, [ _vm._v(_vm._s(_vm.beforeReply ? "Newer mind" : "Reply")) ]), _vm._v(" "), 0 != _vm.replys.length ? _c("span", {
                staticClass: "dot"
            }, [ _vm._v("•") ]) : _vm._e(), _vm._v(" "), 0 != _vm.replys.length ? _c("div", {
                on: {
                    click: _vm.showReply
                }
            }, [ _vm._v(_vm._s(_vm.showReplies ? "Hide replies" : "Show replies [" + _vm.replys.length + "]")) ]) : _vm._e(), _vm._v(" "), _vm.userId == _vm.nodeUserId || _vm.isAdmin ? _c("span", {
                staticClass: "dot"
            }, [ _vm._v("•") ]) : _vm._e(), _vm._v(" "), _vm.userId == _vm.nodeUserId || _vm.isAdmin ? _c("div", {
                on: {
                    click: function($event) {
                        _vm.handleBeforeUpdate();
                    }
                }
            }, [ _vm._v("Update") ]) : _vm._e(), _vm._v(" "), _vm.userId == _vm.nodeUserId || _vm.isAdmin ? _c("span", {
                staticClass: "dot"
            }, [ _vm._v("•") ]) : _vm._e(), _vm._v(" "), _vm.userId == _vm.nodeUserId || _vm.isAdmin ? _c("div", {
                staticClass: "delete"
            }, [ _c("div", {
                staticClass: "deleteText",
                on: {
                    click: function($event) {
                        _vm.handleBeforeDelete();
                    }
                }
            }, [ _vm._v("Delete") ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "popUp"
                }
            }, [ _vm.beforeDelete ? _c("div", {
                staticClass: "deletePrompt"
            }, [ _c("label", [ _vm._v("Are you sure?") ]), _vm._v(" "), _vm.requestDelete ? _c("button", {
                attrs: {
                    "aria-label": "Update"
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", {
                staticClass: "yesPrompt",
                attrs: {
                    "aria-label": "Yes"
                },
                on: {
                    click: function($event) {
                        _vm.deleteComment();
                    }
                }
            }, [ _vm._v("Yes") ]), _vm._v(" "), _vm.requestDelete ? _c("button", {
                staticClass: "noPrompt",
                attrs: {
                    "aria-label": "No"
                }
            }, [ _vm._v("No") ]) : _c("button", {
                staticClass: "noPrompt",
                attrs: {
                    "aria-label": "No"
                },
                on: {
                    click: function($event) {
                        _vm.beforeDelete = !1;
                    }
                }
            }, [ _vm._v("No") ]) ]) : _vm._e() ]) ], 1) : _vm._e() ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.beforeReply,
                    expression: "beforeReply"
                } ]
            }, [ _c("div", {
                key: "addComment",
                staticClass: "addComment"
            }, [ _c("div", {
                staticClass: "avatar",
                style: _vm.styleShadow
            }, [ _c("svg", {
                ref: "svgReplyAvatar"
            }) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showSignPanel && !_vm.auth || _vm.auth,
                    expression: "!showSignPanel && !auth || auth "
                } ],
                key: "commentBox",
                staticClass: "commentBox"
            }, [ _c("div", {
                staticClass: "userName",
                style: {
                    color: _vm.userNameColor
                }
            }, [ _vm._v(_vm._s(_vm.userName)) ]), _vm._v(" "), _c("textarea", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.replyMessage,
                    expression: "replyMessage"
                } ],
                ref: "addReply",
                staticClass: "addComment",
                style: {
                    background: _vm.commentBackgroundColor,
                    color: _vm.commentTextColor
                },
                attrs: {
                    name: "addReply",
                    placeholder: "Add new reply",
                    spellcheck: "false",
                    "aria-label": "Add Reply"
                },
                domProps: {
                    value: _vm.replyMessage
                },
                on: {
                    keyup: function($event) {
                        _vm.resize($event);
                    },
                    input: function($event) {
                        $event.target.composing || (_vm.replyMessage = $event.target.value);
                    }
                }
            }), _vm._v(" "), _vm.requestLoading ? _c("button", {
                attrs: {
                    "aria-label": "Reply"
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", {
                attrs: {
                    "aria-label": "Reply"
                },
                on: {
                    click: _vm.reply
                }
            }, [ _vm._v("Reply") ]), _vm._v(" "), _c("div", {
                staticClass: "remainingLetter",
                style: {
                    background: _vm.remainigLetter < 0 ? "rgba(255, 82, 82,1)" : "rgba(42, 94, 190, 1)"
                }
            }, [ _c("span", [ _vm._v(_vm._s(_vm.remainigLetter)) ]) ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "fade"
                }
            }, [ _vm.alert ? _c("div", {
                key: _vm.alertClass,
                staticClass: "alert",
                class: _vm.alertClass,
                staticStyle: {
                    "align-self": "start",
                    "margin-top": "-5px"
                }
            }, [ _c("div", [ _vm._v(_vm._s(_vm.alertMessage)) ]) ]) : _vm._e() ]) ], 1), _vm._v(" "), _vm.showSignPanel && !_vm.auth ? _c("sign-wrapper", {
                attrs: {
                    baseURL: _vm.baseURL,
                    apiKey: _vm.apiKey,
                    maxUserNameLength: _vm.maxUserNameLength
                },
                on: {
                    "sign-user": _vm.signUser
                }
            }) : _vm._e() ], 1) ]), _vm._v(" "), _c("transition-group", {
                attrs: {
                    appear: "",
                    name: "fade",
                    mode: "out-in"
                }
            }, _vm._l(_vm.replys, function(reply, index) {
                return index < _vm.limit ? _c("app-wrapper", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showReplies,
                        expression: "showReplies"
                    } ],
                    key: reply.id,
                    attrs: {
                        baseURL: _vm.baseURL,
                        apiKey: _vm.apiKey,
                        show: _vm.showProp,
                        deleted: _vm.deletedProp,
                        maxUserNameLength: _vm.maxUserNameLength,
                        maxCommentLength: _vm.maxCommentLength,
                        maxShowingDepth: _vm.maxShowingDepth,
                        maxLineLimit: _vm.maxLineLimit,
                        id: reply.id,
                        timestamp: reply.timestamp,
                        lineCount: reply.lineCount,
                        nodeUserId: reply.user_id,
                        nodeName: _vm.nodeName,
                        name: reply.name,
                        comment: reply.comment,
                        replies: reply.reply,
                        depth: reply.depth,
                        auth: _vm.auth,
                        userId: _vm.userId,
                        idToken: _vm.idToken,
                        isAdmin: _vm.isAdmin,
                        userName: _vm.userName,
                        commentBackgroundColor: _vm.commentBackgroundColor,
                        commentTextColor: _vm.commentTextColor,
                        userNameColor: _vm.userNameColor,
                        depthLength: _vm.depthLength + 1,
                        wrapperSize: _vm.wrapperSize
                    },
                    on: {
                        "delete-row": function($event) {
                            _vm.deleteFromParent(index);
                        },
                        "sign-user": _vm.signUser,
                        "close-hide-bar": _vm.closeHideBar
                    }
                }) : _vm._e();
            })), _vm._v(" "), _vm.limit < _vm.replys.length && _vm.showReplies ? _c("div", {
                staticClass: "updateLimit",
                on: {
                    click: _vm.updateLimit
                }
            }, [ _c("span", {
                staticClass: "limit"
            }, [ _vm._v("Show more reply") ]) ]) : _vm._e() ], 1) ]) ]);
        }, staticRenderFns = [ function() {
            var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
            return _c("div", {
                staticClass: "hiddenMessage"
            }, [ _c("i", [ _vm._v("[ Message is hidden. ]") ]) ]);
        } ], esExports = {
            render: render,
            staticRenderFns: staticRenderFns
        };
        __webpack_exports__.a = esExports;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function() {
            var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
            return _vm.loading ? _c("div", {
                staticClass: "loader"
            }, [ _c("svg", {
                attrs: {
                    width: "150",
                    height: "150",
                    id: "loader"
                }
            }, [ _c("circle", {
                attrs: {
                    fill: "red"
                }
            }, [ _c("animate", {
                attrs: {
                    attributeName: "cx",
                    values: "15;135;15",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "r",
                    values: "15;7.5;2;7.5;15",
                    keyTimes: "0;0.25;0.5;0.75;1",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "cy",
                    values: "135;15;135",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "6s",
                    repeatCount: "indefinite"
                }
            }) ]), _vm._v(" "), _c("circle", {
                attrs: {
                    fill: "green"
                }
            }, [ _c("animate", {
                attrs: {
                    attributeName: "cx",
                    values: "135;15;135",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "r",
                    values: "15;7.5;2;7.5;15",
                    keyTimes: "0;0.25;0.5;0.75;1",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "cy",
                    values: "15;135;15",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "6s",
                    repeatCount: "indefinite"
                }
            }) ]), _vm._v(" "), _c("circle", {
                attrs: {
                    fill: "blue"
                }
            }, [ _c("animate", {
                attrs: {
                    attributeName: "cx",
                    values: "15;135;15",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "r",
                    values: "15;7.5;2;7.5;15",
                    keyTimes: "0;0.25;0.5;0.75;1",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "cy",
                    values: "15;135;15",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "6s",
                    repeatCount: "indefinite"
                }
            }) ]), _vm._v(" "), _c("circle", {
                attrs: {
                    fill: "orange"
                }
            }, [ _c("animate", {
                attrs: {
                    attributeName: "cx",
                    values: "135;15;135",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "r",
                    values: "15;7.5;2;7.5;15",
                    keyTimes: "0;0.25;0.5;0.75;1",
                    dur: "3s",
                    repeatCount: "indefinite"
                }
            }), _vm._v(" "), _c("animate", {
                attrs: {
                    attributeName: "cy",
                    values: "135;15;135",
                    keyTimes: "0;0.5;1",
                    calcMode: "spline",
                    keySplines: "0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;",
                    dur: "6s",
                    repeatCount: "indefinite"
                }
            }) ]) ]) ]) : _c("div", {
                ref: "wrapper",
                staticClass: "comments",
                style: {
                    background: _vm.background
                }
            }, [ _c("div", {
                staticClass: "innerWrapper"
            }, [ _c("div", {
                key: "addComment",
                staticClass: "addComment"
            }, [ _c("div", {
                staticClass: "avatar",
                style: _vm.styleShadow
            }, [ _c("svg", {
                ref: "svgAvatar"
            }) ]), _vm._v(" "), _c("div", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showSignPanel && !_vm.auth || _vm.auth,
                    expression: "!showSignPanel && !auth || auth "
                } ],
                key: "commentBox",
                staticClass: "commentBox"
            }, [ _c("div", {
                staticClass: "userName",
                style: {
                    color: _vm.userNameColor
                }
            }, [ _vm._v("\n            " + _vm._s(_vm.userName) + "\n            "), _vm.auth ? _c("div", {
                staticClass: "logOut",
                on: {
                    click: function($event) {
                        _vm.clearAuth();
                    }
                }
            }, [ _vm._v("Log out") ]) : _vm._e() ]), _vm._v(" "), _c("textarea", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.newComment,
                    expression: "newComment"
                } ],
                ref: "addComment",
                staticClass: "addComment",
                style: {
                    background: _vm.commentBackgroundColor,
                    color: _vm.commentTextColor
                },
                attrs: {
                    name: "addComment",
                    placeholder: "Add new comment",
                    spellcheck: "false",
                    "aria-label": "Add comment"
                },
                domProps: {
                    value: _vm.newComment
                },
                on: {
                    keyup: _vm.resize,
                    input: function($event) {
                        $event.target.composing || (_vm.newComment = $event.target.value);
                    }
                }
            }), _vm._v(" "), _vm.requestLoading ? _c("button", {
                attrs: {
                    "aria-label": "Send"
                }
            }, [ _c("div", {
                staticClass: "requestLoading"
            }) ]) : _c("button", {
                attrs: {
                    "aria-label": "Send"
                },
                on: {
                    click: _vm.addComment
                }
            }, [ _vm._v("Send") ]), _vm._v(" "), _c("div", {
                staticClass: "remainingLetter",
                style: {
                    background: _vm.remainigLetter < 0 ? "rgba(255, 82, 82,1)" : "rgba(42, 94, 190, 1)"
                }
            }, [ _c("span", [ _vm._v(_vm._s(_vm.remainigLetter)) ]) ]), _vm._v(" "), _c("transition", {
                attrs: {
                    name: "fade"
                }
            }, [ _vm.alert ? _c("div", {
                key: _vm.alertClass,
                staticClass: "alert",
                class: _vm.alertClass,
                staticStyle: {
                    "align-self": "start",
                    "margin-top": "-5px"
                }
            }, [ _c("div", [ _vm._v(_vm._s(_vm.alertMessage)) ]) ]) : _vm._e() ]) ], 1), _vm._v(" "), _vm.showSignPanel && !_vm.auth ? _c("sign-wrapper", {
                attrs: {
                    baseURL: _vm.baseURL,
                    apiKey: _vm.apiKey,
                    maxUserNameLength: _vm.maxUserNameLength
                },
                on: {
                    "sign-user": _vm.signUser
                }
            }) : _vm._e() ], 1), _vm._v(" "), _c("transition-group", {
                attrs: {
                    appear: "",
                    name: "fade",
                    mode: "out-in",
                    tag: "div"
                }
            }, [ _vm._l(_vm.comments, function(item, index) {
                return index < _vm.limit ? _c("app-wrapper", {
                    key: item.id,
                    attrs: {
                        baseURL: _vm.baseURL,
                        apiKey: _vm.apiKey,
                        id: item.id,
                        timestamp: item.timestamp,
                        lineCount: item.lineCount,
                        maxUserNameLength: _vm.maxUserNameLength,
                        maxCommentLength: _vm.maxCommentLength,
                        maxShowingDepth: _vm.maxShowingDepth,
                        maxLineLimit: _vm.maxLineLimit,
                        nodeUserId: item.user_id,
                        nodeName: _vm.nodeName,
                        name: item.name,
                        comment: item.comment,
                        replies: item.reply,
                        depth: item.depth,
                        depthLength: 1,
                        initialMessageLimit: _vm.initialMessageLimit,
                        auth: _vm.auth,
                        userId: _vm.userId,
                        idToken: _vm.idToken,
                        isAdmin: _vm.isAdmin,
                        userName: _vm.userName,
                        commentBackgroundColor: _vm.commentBackgroundColor,
                        commentTextColor: _vm.commentTextColor,
                        userNameColor: _vm.userNameColor,
                        wrapperSize: _vm.wrapperSize.toString()
                    },
                    on: {
                        "delete-row": function($event) {
                            _vm.deleteFromParent(index);
                        },
                        "sign-user": _vm.signUser
                    }
                }) : _vm._e();
            }), _vm._v(" "), _vm.comments.length < 1 ? _c("div", {
                key: "noComment",
                staticClass: "noCommentWrapper",
                on: {
                    click: function($event) {
                        _vm.$refs.addComment.focus();
                    }
                }
            }, [ _c("span", {
                staticClass: "noCommentText"
            }, [ _vm._v("Be the first to comment.") ]) ]) : _vm._e() ], 2), _vm._v(" "), _vm.limit < _vm.comments.length ? _c("div", {
                staticClass: "updateLimit",
                on: {
                    click: _vm.updateLimit
                }
            }, [ _c("span", {
                staticClass: "limit"
            }, [ _vm._v("Show more comment") ]) ]) : _vm._e() ], 1) ]);
        }, staticRenderFns = [], esExports = {
            render: render,
            staticRenderFns: staticRenderFns
        };
        __webpack_exports__.a = esExports;
    } ]);
});