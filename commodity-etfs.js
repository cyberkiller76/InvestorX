(() => {
    "use strict";
    var t = {
        151: (t, e) => {
            function i(t, e) {
                if (void 0 === t) throw new Error("".concat(null != e ? e : "Value", " is undefined"));
                return t
            }
            function r(t, e) {
                if (null === t) throw new Error("".concat(null != e ? e : "Value", " is null"));
                return t
            }
            e.ensureNotNull = void 0, e.ensureNotNull = r
        }
    }, e = {};

    function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var n = e[r] = { exports: {} };
        return t[r](n, n.exports, i), n.exports
    }

    (() => {
        var t = i(151);
        const e = {
            "color-cold-gray-300": "#B2B5BE",
            "color-brand": "#2962FF",
            "color-brand-hover": "#1E53E5",
            "color-brand-active": "#1848CC"
        };
        const r = {
            "symbols": [
                ["AMEX:GLD|1D"],
                ["AMEX:SLV|1D"],
                ["AMEX:USO|1D"],
                ["AMEX:DBC|1D"],
                ["AMEX:GSG|1D"]
            ],
            "chartOnly": false,
            "width": "1200px",
            "height": "500px",
            "locale": "en",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": false,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "maLineColor": "#2962FF",
            "maLineWidth": 1,
            "maLength": 9,
            "headerFontSize": "medium",
            "lineWidth": 2,
            "lineType": 0,
            "dateRanges": [
                "1d|1",
                "1m|30",
                "3m|60",
                "12m|1D",
                "60m|1W",
                "all|1M"
            ]
        };

        var o, n;
        !function (t) {
            let e;
            !function (t) {
                t.SetSymbol = "set-symbol", t.SetInterval = "set-interval"
            }(e = t.Names || (t.Names = {}))
        }(o || (o = {})), function (t) {
            let e;
            !function (t) {
                t.SymbolClick = "tv-widget-symbol-click", t.WidgetLoad = "tv-widget-load", t.WidgetReady = "tv-widget-ready", t.ResizeIframe = "tv-widget-resize-iframe", t.NoData = "tv-widget-no-data"
            }(e = t.Names || (t.Names = {}))
        }(n || (n = {}));

        const s = "__FAIL__", a = "__NHTTP__", l = new RegExp("^http(s)?:(//)?");

        function c(t = location.href) {
            const e = function (t) {
                try {
                    const e = new URL(t);
                    return l.test(e.protocol) ? null : a
                } catch (t) {
                    return s
                }
            }(t);
            return e || t.replace(l, "")
        }

        const h = ["locale", "symbol", "market"], d = "https://www.tradingview-widget.com", g = "BATTLE";

        class u {
            constructor(t) {
                this._copyrightContainer = null;
                const e = t ?? this._getScriptInfo();
                e && this._replaceScript(e)
            }

            hasCopyright() {
                return !!this._copyrightContainer
            }

            get widgetId() {
                throw new Error("Method must be overridden")
            }

            widgetUtmName() {
                return this.widgetId
            }

            get defaultSettings() {
                return r
            }

            get propertiesToWorkWith() {
                return []
            }

            get useParamsForConnectSocket() {
                return !1
            }

            get useSnowplowPageView() {
                return !1
            }

            useQueryStringParameters(t) {
                return {}
            }

            filterRawSettings(t) {
                const e = {}, i = { ...t, ...this.useQueryStringParameters(t) }, r = Object.keys(i), o = new Set(this.propertiesToWorkWith);
                r.forEach((t => {
                    o.has(t) && (e[t] = i[t])
                }));
                return e
            }

            get shouldListenToIframeResize() {
                return !0
            }

            get propertiesToSkipInHash() {
                return ["customer", "locale"]
            }

            get propertiesToAddToGetParams() {
                return ["locale"]
            }

            _defaultWidth() {}

            _defaultHeight() {}

            _getScriptInfo() {
                const t = document.currentScript;
                if (!t || !t.src) return console.error("Could not self-replace the script, widget embedding has been aborted"), null;
                return {
                    scriptURL: function (t) {
                        const e = new URL(t, document.baseURI);
                        return { host: e.host, pathname: e.pathname, href: e.href, protocol: e.protocol }
                    }(t.src),
                    scriptElement: t,
                    id: t.id,
                    rawSettings: this._scriptContentToJSON(t),
                    overrideHost: t.getAttribute("override-host")
                }
            }

            _replaceScript(i) {
                const { scriptURL: r, scriptElement: o, rawSettings: s, id: a, overrideHost: l } = i,
                    c = l || function (t) {
                        if ("BATTLE" === g) {
                            if (window.WIDGET_HOST) return window.WIDGET_HOST;
                            if (t.host.match(/\.\wst\w*\.\wv$/i)) return `https://${t.host.replace(/\.(\w)v$/i, ((t, e) => `-widget.${e}v`))}`
                        }
                        return d
                    }(r),
                    h = o.parentNode;
                s && "timeline" === this.widgetUtmName() && (s.locale = "en");
                const u = o.nonce || o.getAttribute("nonce"),
                    m = function (t) {
                        if (null === t) return null;
                        const e = t.querySelector("#tradingview-copyright"),
                            i = t.querySelector("#tradingview-quotes"),
                            r = e || i;
                        return r && t.removeChild(r), r
                    }(h),
                    p = h.querySelector(".tradingview-widget-copyright");
                this._copyrightContainer = m || p;
                const f = h.classList.contains("tradingview-widget-container");
                this.iframeContainer = h && f ? h : document.createElement("div");
                s && (this.settings = this.filterRawSettings(s));
                s && this._validateSettings() || (console.error("Invalid settings provided, fall back to defaults"), this.settings = this.filterRawSettings(this.defaultSettings));
                const w = "32px", { width: y, height: b } = this.settings,
                    S = void 0 === b ? void 0 : `${b}${Number.isInteger(b) ? "px" : ""}`,
                    v = void 0 === y ? void 0 : `${y}${Number.isInteger(y) ? "px" : ""}`;
                void 0 !== v && (this.iframeContainer.style.width = v), void 0 !== S && (this.iframeContainer.style.height = S);
                const C = function () {
                    const t = document.createElement("style");
                    t.innerHTML = `
                    .tradingview-widget-copyright {
                        font-size: 13px !important;
                        line-height: 32px !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                        color: ${e["color-cold-gray-300"]} !important;
                    }

                    .tradingview-widget-copyright .blue-text {
                        color: ${e["color-brand"]} !important;
                    }

                    .tradingview-widget-copyright a {
                        text-decoration: none !important;
                        color: ${e["color-cold-gray-300"]} !important;
                    }

                    .tradingview-widget-copyright a:visited {
                        color: ${e["color-cold-gray-300"]} !important;
                    }

                    .tradingview-widget-copyright a:hover .blue-text {
                        color: ${e["color-brand-hover"]} !important;
                    }

                    .tradingview-widget-copyright a:active .blue-text {
                        color: ${e["color-brand-active"]} !important;
                    }

                    .tradingview-widget-copyright a:visited .blue-text {
                        color: ${e["color-brand"]} !important;
                    }
                    `;
                    return t
                }();
                u && C.setAttribute("nonce", u), this.iframeContainer.appendChild(C);
                const T = this.hasCopyright() ? `calc(100% - ${w})` : "100%",
                    _ = location.hostname,
                    k = p ? "widget_new" : "widget",
                    A = this.widgetUtmName();
                this.settings.utm_source = _, this.settings.utm_medium = k, this.settings.utm_campaign = A, this._updateCopyrightHrefParams(_, k, A);
                const L = this.settings.iframeTitle || `${this.widgetId.replace("-", " ")} TradingView widget`,
                    E = this.settings.iframeLang || "en";
                this.iframe = this._createIframe(T, c, a, L, E), this._addCSPErrorListener(c), u && this.iframe.setAttribute("nonce", u);
                const I = this.iframeContainer.querySelector(".tradingview-widget-container__widget");
                if (I ? ((0, t.ensureNotNull)(I.parentElement).replaceChild(this.iframe, I), o?.remove()) : f ? (this.iframeContainer.appendChild(this.iframe), o?.remove()) : (this.iframeContainer.appendChild(this.iframe), h.replaceChild(this.iframeContainer, (0, t.ensureNotNull)(o))), this.shouldListenToIframeResize && function (t, e, i) {
                    const r = e.contentWindow;
                    if (!r) return console.error("Cannot listen to the event from the provided iframe, contentWindow is not available"), () => {};
                    function o(e) {
                        e.source && e.source === r && e.data && e.data.name && e.data.name === t && i(e.data.data)
                    }
                    window.addEventListener("message", o, !1)
                }(n.Names.ResizeIframe, this.iframe, (t => {
                    t.width && (this.iframe.style.width = t.width + "px", this.iframeContainer.style.width = t.width + "px"), this.iframe.style.height = t.height + "px", this.iframeContainer.style.height = t.height + (this.hasCopyright() ? 32 : 0) + "px"
                })), m) {
                    const t = document.createElement("div");
                    t.style.height = w, t.style.lineHeight = w, void 0 !== v && (t.style.width = v), t.style.textAlign = "center", t.style.verticalAlign = "middle", t.innerHTML = m.innerHTML, this.iframeContainer.appendChild(t)
                }
            }

            _iframeSrcBase(t) {
                let e = `${t}/embed-widget/${this.widgetId}/`;
                return this.settings.customer && -1 !== this.propertiesToSkipInHash.indexOf("customer") && (e += `${this.settings.customer}/`), e
            }

            _validateSettings() {
                const t = (t, e) => {
                    if (void 0 === t) return e;
                    const i = String(t);
                    return /^\d+$/.test(i) ? parseInt(i) : /^(\d+%|auto)$/.test(i) ? i : null
                }, e = t(this.settings.width, this._defaultWidth()), i = t(this.settings.height, this._defaultHeight());
                return null !== e && null !== i && (this.settings.width = e, this.settings.height = i, !0)
            }

            _setSettingsQueryString(t) {
                const e = this.propertiesToAddToGetParams.filter((t => -1 !== h.indexOf(t))), i = function (t, e) {
                    const i = Object.create(Object.getPrototypeOf(t));
                    for (const r of e) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
                    return i
                }(this.settings, e);
                for (const [e, r] of Object.entries(i)) t.searchParams.append(e, r)
            }

            _setHashString(t, e) {
                const i = {};
                e && (i.frameElementId = e), Object.keys(this.settings).forEach((t => {
                    -1 === this.propertiesToSkipInHash.indexOf(t) && (i[t] = this.settings[t])
                })), (this.useParamsForConnectSocket || this.useSnowplowPageView) && (i["page-uri"] = c());
                Object.keys(i).length > 0 && (t.hash = encodeURIComponent(JSON.stringify(i)))
            }

            _scriptContentToJSON(t) {
                const e = t.innerHTML.trim();
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return console.error(`Widget settings parse error: ${t}`), null
                }
            }

            _createIframe(t, e, i, r, o) {
                const n = document.createElement("iframe");
                i && (n.id = i), this.settings.enableScrolling || n.setAttribute("scrolling", "no"), n.setAttribute("allowtransparency", "true"), n.setAttribute("frameborder", "0"), n.style.userSelect = "none", n.style.boxSizing = "border-box", n.style.display = "block", n.style.height = t, n.style.width = "100%";
                const s = new URL(this._iframeSrcBase(e));
                return this._setSettingsQueryString(s), this._setHashString(s, i), n.setAttribute("src", s.toString()), n.title = r, n.lang = o, n
            }

            _addCSPErrorListener(t) {
                document.addEventListener("securitypolicyviolation", (e => {
                    e.blockedURI.includes(t) && (this._tryFixCSPIssueWithFallback(t), console.warn("Please update your CSP rules to allow the tradingview-widget.com origin for frame-src."))
                }))
            }

            _tryFixCSPIssueWithFallback(t) {
                const e = this.iframe.getAttribute("src");
                if (e) {
                    const i = new URL(e.replace(t, "https://s.tradingview.com"));
                    this.iframe.setAttribute("src", i.href)
                }
            }

            _updateCopyrightHrefParams(t, e, i) {
                if (this._copyrightContainer) {
                    const r = this._copyrightContainer.querySelector("a");
                    if (r) {
                        const o = r.getAttribute("href");
                        if (o) try {
                            const n = new URL(o);
                            n.searchParams.set("utm_source", t), n.searchParams.set("utm_medium", e), n.searchParams.set("utm_campaign", i), r.setAttribute("href", n.toString())
                        } catch (t) {
                            console.log(`Cannot update link UTM params, href="${o}"`)
                        }
                    }
                }
            }
        }

        const m = ["symbols", "dateRanges", "locale", "chartOnly", "colorTheme", "isTransparent", "showVolume", "showMA", "hideDateRanges", "hideMarketStatus", "hideSymbolLogo", "scalePosition", "scaleMode", "fontFamily", "noTimeScale", "height", "width", "backgroundColor", "gridLineColor", "fontColor", "fontSize", "widgetFontColor", "chartType", "color", "colorGrowing", "colorFalling", "lineColor", "lineColorGrowing", "lineColorFalling", "topColor", "bottomColor", "upColor", "downColor", "borderUpColor", "borderDownColor", "wickUpColor", "wickDownColor", "volumeUpColor", "volumeDownColor", "lineType", "lineWidth", "valuesTracking", "changeMode", "dateFormat", "timeHoursFormat", "maLineColor", "maLineWidth", "maLength", "compareSymbol", "headerFontSize"];

        new class extends u {
            get widgetId() {
                return "symbol-overview"
            }

            get useParamsForConnectSocket() {
                return !0
            }

            get propertiesToWorkWith() {
                return [...m, "customer"]
            }

            _defaultWidth() {
                return 300
            }

            _defaultHeight() {
                return 400
            }
        }
    })()
})();