/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(V) {
    V.ui = V.ui || {};
    var e = V.ui.version = "1.12.1";
    (function() {
        var t, y = Math.max, x = Math.abs, r = /left|center|right/, i = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, f = /^\w+/, o = /%$/, a = V.fn.pos;
        function q(e, a, s) {
            return [ parseFloat(e[0]) * (o.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (o.test(e[1]) ? s / 100 : 1) ];
        }
        function C(e, a) {
            return parseInt(V.css(e, a), 10) || 0;
        }
        function s(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (V.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        V.pos = {
            scrollbarWidth: function() {
                if (t !== undefined) {
                    return t;
                }
                var e, a, s = V("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), r = s.children()[0];
                V("body").append(s);
                e = r.offsetWidth;
                s.css("overflow", "scroll");
                a = r.offsetWidth;
                if (e === a) {
                    a = s[0].clientWidth;
                }
                s.remove();
                return t = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), r = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, t = s === "scroll" || s === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: t ? V.pos.scrollbarWidth() : 0,
                    height: r ? V.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = V(e || window), s = V.isWindow(a[0]), r = !!a[0] && a[0].nodeType === 9, t = !s && !r;
                return {
                    element: a,
                    isWindow: s,
                    isDocument: r,
                    offset: t ? V(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        V.fn.pos = function(d) {
            if (!d || !d.of) {
                return a.apply(this, arguments);
            }
            d = V.extend({}, d);
            var m, n, T, p, u, e, b = V(d.of), g = V.pos.getWithinInfo(d.within), k = V.pos.getScrollInfo(g), w = (d.collision || "flip").split(" "), v = {};
            e = s(b);
            if (b[0].preventDefault) {
                d.at = "left top";
            }
            n = e.width;
            T = e.height;
            p = e.offset;
            u = V.extend({}, p);
            V.each([ "my", "at" ], function() {
                var e = (d[this] || "").split(" "), a, s;
                if (e.length === 1) {
                    e = r.test(e[0]) ? e.concat([ "center" ]) : i.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = r.test(e[0]) ? e[0] : "center";
                e[1] = i.test(e[1]) ? e[1] : "center";
                a = l.exec(e[0]);
                s = l.exec(e[1]);
                v[this] = [ a ? a[0] : 0, s ? s[0] : 0 ];
                d[this] = [ f.exec(e[0])[0], f.exec(e[1])[0] ];
            });
            if (w.length === 1) {
                w[1] = w[0];
            }
            if (d.at[0] === "right") {
                u.left += n;
            } else if (d.at[0] === "center") {
                u.left += n / 2;
            }
            if (d.at[1] === "bottom") {
                u.top += T;
            } else if (d.at[1] === "center") {
                u.top += T / 2;
            }
            m = q(v.at, n, T);
            u.left += m[0];
            u.top += m[1];
            return this.each(function() {
                var s, e, l = V(this), f = l.outerWidth(), o = l.outerHeight(), a = C(this, "marginLeft"), r = C(this, "marginTop"), t = f + a + C(this, "marginRight") + k.width, i = o + r + C(this, "marginBottom") + k.height, c = V.extend({}, u), h = q(v.my, l.outerWidth(), l.outerHeight());
                if (d.my[0] === "right") {
                    c.left -= f;
                } else if (d.my[0] === "center") {
                    c.left -= f / 2;
                }
                if (d.my[1] === "bottom") {
                    c.top -= o;
                } else if (d.my[1] === "center") {
                    c.top -= o / 2;
                }
                c.left += h[0];
                c.top += h[1];
                s = {
                    marginLeft: a,
                    marginTop: r
                };
                V.each([ "left", "top" ], function(e, a) {
                    if (V.ui.pos[w[e]]) {
                        V.ui.pos[w[e]][a](c, {
                            targetWidth: n,
                            targetHeight: T,
                            elemWidth: f,
                            elemHeight: o,
                            collisionPosition: s,
                            collisionWidth: t,
                            collisionHeight: i,
                            offset: [ m[0] + h[0], m[1] + h[1] ],
                            my: d.my,
                            at: d.at,
                            within: g,
                            elem: l
                        });
                    }
                });
                if (d.using) {
                    e = function(e) {
                        var a = p.left - c.left, s = a + n - f, r = p.top - c.top, t = r + T - o, i = {
                            target: {
                                element: b,
                                left: p.left,
                                top: p.top,
                                width: n,
                                height: T
                            },
                            element: {
                                element: l,
                                left: c.left,
                                top: c.top,
                                width: f,
                                height: o
                            },
                            horizontal: s < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: t < 0 ? "top" : r > 0 ? "bottom" : "middle"
                        };
                        if (n < f && x(a + s) < n) {
                            i.horizontal = "center";
                        }
                        if (T < o && x(r + t) < T) {
                            i.vertical = "middle";
                        }
                        if (y(x(a), x(s)) > y(x(r), x(t))) {
                            i.important = "horizontal";
                        } else {
                            i.important = "vertical";
                        }
                        d.using.call(this, e, i);
                    };
                }
                l.offset(V.extend(c, {
                    using: e
                }));
            });
        };
        V.ui.pos = {
            _trigger: function(e, a, s, r) {
                if (a.elem) {
                    a.elem.trigger({
                        type: s,
                        position: e,
                        positionData: a,
                        triggered: r
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var s = a.within, r = s.isWindow ? s.scrollLeft : s.offset.left, t = s.width, i = e.left - a.collisionPosition.marginLeft, l = r - i, f = i + a.collisionWidth - t - r, o;
                    if (a.collisionWidth > t) {
                        if (l > 0 && f <= 0) {
                            o = e.left + l + a.collisionWidth - t - r;
                            e.left += l - o;
                        } else if (f > 0 && l <= 0) {
                            e.left = r;
                        } else {
                            if (l > f) {
                                e.left = r + t - a.collisionWidth;
                            } else {
                                e.left = r;
                            }
                        }
                    } else if (l > 0) {
                        e.left += l;
                    } else if (f > 0) {
                        e.left -= f;
                    } else {
                        e.left = y(e.left - i, e.left);
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var s = a.within, r = s.isWindow ? s.scrollTop : s.offset.top, t = a.within.height, i = e.top - a.collisionPosition.marginTop, l = r - i, f = i + a.collisionHeight - t - r, o;
                    if (a.collisionHeight > t) {
                        if (l > 0 && f <= 0) {
                            o = e.top + l + a.collisionHeight - t - r;
                            e.top += l - o;
                        } else if (f > 0 && l <= 0) {
                            e.top = r;
                        } else {
                            if (l > f) {
                                e.top = r + t - a.collisionHeight;
                            } else {
                                e.top = r;
                            }
                        }
                    } else if (l > 0) {
                        e.top += l;
                    } else if (f > 0) {
                        e.top -= f;
                    } else {
                        e.top = y(e.top - i, e.top);
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var s = a.within, r = s.offset.left + s.scrollLeft, t = s.width, i = s.isWindow ? s.scrollLeft : s.offset.left, l = e.left - a.collisionPosition.marginLeft, f = l - i, o = l + a.collisionWidth - t - i, c = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, h = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, d = -2 * a.offset[0], m, n;
                    if (f < 0) {
                        m = e.left + c + h + d + a.collisionWidth - t - r;
                        if (m < 0 || m < x(f)) {
                            e.left += c + h + d;
                        }
                    } else if (o > 0) {
                        n = e.left - a.collisionPosition.marginLeft + c + h + d - i;
                        if (n > 0 || x(n) < o) {
                            e.left += c + h + d;
                        }
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var s = a.within, r = s.offset.top + s.scrollTop, t = s.height, i = s.isWindow ? s.scrollTop : s.offset.top, l = e.top - a.collisionPosition.marginTop, f = l - i, o = l + a.collisionHeight - t - i, c = a.my[1] === "top", h = c ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, d = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, m = -2 * a.offset[1], n, T;
                    if (f < 0) {
                        T = e.top + h + d + m + a.collisionHeight - t - r;
                        if (T < 0 || T < x(f)) {
                            e.top += h + d + m;
                        }
                    } else if (o > 0) {
                        n = e.top - a.collisionPosition.marginTop + h + d + m - i;
                        if (n > 0 || x(n) < o) {
                            e.top += h + d + m;
                        }
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    V.ui.pos.flip.left.apply(this, arguments);
                    V.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    V.ui.pos.flip.top.apply(this, arguments);
                    V.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, s, r, t, i = document.getElementsByTagName("body")[0], l = document.createElement("div");
            e = document.createElement(i ? "div" : "body");
            s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (i) {
                V.extend(s, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (t in s) {
                e.style[t] = s[t];
            }
            e.appendChild(l);
            a = i || document.documentElement;
            a.insertBefore(e, a.firstChild);
            l.style.cssText = "position: absolute; left: 10.7432222px;";
            r = V(l).offset().left;
            V.support.offsetFractions = r > 10 && r < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = V.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(o) {
    "use strict";
    var l = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return o(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return Array.isArray(e);
        },
        inArray: function(e, a) {
            return o.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var s = function(e, a) {
        this._id = s._idCounter++;
        this.element = o(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = o.extend({}, s.defaultOptions, this.element.data(), a);
        this.options.templates = o.extend({}, s.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = l.isElement(this.options.container) ? o(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = o("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    s._idCounter = 0;
    s.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    s.batch = function(e, a) {
        var s = Array.prototype.slice.call(arguments, 2);
        return o(e).each(function() {
            var e = o(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, s);
            }
        });
    };
    s.prototype = {
        constructor: s,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(o.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = o(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(o('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !l.isEmpty(this.options.templates.footer)) {
                var a = o(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(o(this.options.templates.search));
                }
                if (!l.isEmpty(this.options.templates.buttons)) {
                    a.append(o(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var s = this;
            this.iconpicker = o(this.options.templates.iconpicker);
            var e = function(e) {
                var a = o(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                s._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: s.iconpickerValue
                });
                if (s.options.mustAccept === false) {
                    s.update(a.data("iconpickerValue"));
                    s._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: s.iconpickerValue
                    });
                } else {
                    s.update(a.data("iconpickerValue"), true);
                }
                if (s.options.hideOnSelect && s.options.mustAccept === false) {
                    s.hide();
                }
            };
            var a = o(this.options.templates.iconpickerItem);
            var r = [];
            for (var t in this.options.icons) {
                if (typeof this.options.icons[t].title === "string") {
                    var i = a.clone();
                    i.find("i").addClass(this.options.fullClassFormatter(this.options.icons[t].title));
                    i.data("iconpickerValue", this.options.icons[t].title).on("click.iconpicker", e);
                    i.attr("title", "." + this.options.icons[t].title);
                    if (this.options.icons[t].searchTerms.length > 0) {
                        var l = "";
                        for (var f = 0; f < this.options.icons[t].searchTerms.length; f++) {
                            l = l + this.options.icons[t].searchTerms[f] + " ";
                        }
                        i.attr("data-search-terms", l);
                    }
                    r.push(i);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(r);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = o(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(o(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!l.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(o(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = o(window.document);
            var a = this;
            var s = ".iconpicker.inst" + this._id;
            o(window).on("resize.iconpicker" + s + " orientationchange.iconpicker" + s, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + s, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            o(window).off(".iconpicker.inst" + this._id);
            o(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var s = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(o.extend({}, s, e));
            }
            switch (e) {
              case "inline":
                {
                    s = false;
                }
                break;

              case "topLeftCorner":
                {
                    s.my = "right bottom";
                    s.at = "left top";
                }
                break;

              case "topLeft":
                {
                    s.my = "left bottom";
                    s.at = "left top";
                }
                break;

              case "top":
                {
                    s.my = "center bottom";
                    s.at = "center top";
                }
                break;

              case "topRight":
                {
                    s.my = "right bottom";
                    s.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    s.my = "left bottom";
                    s.at = "right top";
                }
                break;

              case "rightTop":
                {
                    s.my = "left bottom";
                    s.at = "right center";
                }
                break;

              case "right":
                {
                    s.my = "left center";
                    s.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    s.my = "left top";
                    s.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    s.my = "left top";
                    s.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    s.my = "right top";
                    s.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    s.my = "center top";
                    s.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    s.my = "left top";
                    s.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    s.my = "right top";
                    s.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    s.my = "right top";
                    s.at = "left center";
                }
                break;

              case "left":
                {
                    s.my = "right center";
                    s.at = "left center";
                }
                break;

              case "leftTop":
                {
                    s.my = "right bottom";
                    s.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (s !== false) {
                this.popover.pos(s).css("maxWidth", o(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!l.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = typeof e !== "undefined" ? e.trim() : e;
            var s = false;
            for (var r = 0; r < this.options.icons.length; r++) {
                if (this.options.icons[r].title === e) {
                    s = true;
                    break;
                }
            }
            if (s || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(t) {
            if (l.isEmpty(t)) {
                this.iconpicker.find(".iconpicker-item").show();
                return o(false);
            } else {
                var i = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = o(this);
                    var a = e.attr("title").toLowerCase();
                    var s = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + s;
                    var r = false;
                    try {
                        r = new RegExp("(^|\\W)" + t, "g");
                    } catch (e) {
                        r = false;
                    }
                    if (r !== false && a.match(r)) {
                        i.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return i;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            o.iconpicker.batch(o(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(o.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(o.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            o(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    o.iconpicker = s;
    o.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = o(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new s(this, typeof a === "object" ? a : {}));
            }
        });
    };
    s.defaultOptions = o.extend(s.defaultOptions, {
        icons: [ {
            title: "fa-solid fa-0",
            searchTerms: []
        }, {
            title: "fa-solid fa-1",
            searchTerms: []
        }, {
            title: "fa-solid fa-2",
            searchTerms: []
        }, {
            title: "fa-solid fa-3",
            searchTerms: []
        }, {
            title: "fa-solid fa-4",
            searchTerms: []
        }, {
            title: "fa-solid fa-5",
            searchTerms: []
        }, {
            title: "fa-solid fa-6",
            searchTerms: []
        }, {
            title: "fa-solid fa-7",
            searchTerms: []
        }, {
            title: "fa-solid fa-8",
            searchTerms: []
        }, {
            title: "fa-solid fa-9",
            searchTerms: []
        }, {
            title: "fa-brands fa-42-group",
            searchTerms: []
        }, {
            title: "fa-brands fa-500px",
            searchTerms: []
        }, {
            title: "fa-solid fa-a",
            searchTerms: []
        }, {
            title: "fa-brands fa-accessible-icon",
            searchTerms: []
        }, {
            title: "fa-brands fa-accusoft",
            searchTerms: []
        }, {
            title: "fa-solid fa-address-book",
            searchTerms: []
        }, {
            title: "fa-regular fa-address-book",
            searchTerms: []
        }, {
            title: "fa-solid fa-address-card",
            searchTerms: []
        }, {
            title: "fa-regular fa-address-card",
            searchTerms: []
        }, {
            title: "fa-brands fa-adn",
            searchTerms: []
        }, {
            title: "fa-brands fa-adversal",
            searchTerms: []
        }, {
            title: "fa-brands fa-affiliatetheme",
            searchTerms: []
        }, {
            title: "fa-brands fa-airbnb",
            searchTerms: []
        }, {
            title: "fa-brands fa-algolia",
            searchTerms: []
        }, {
            title: "fa-solid fa-align-center",
            searchTerms: []
        }, {
            title: "fa-solid fa-align-justify",
            searchTerms: []
        }, {
            title: "fa-solid fa-align-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-align-right",
            searchTerms: []
        }, {
            title: "fa-brands fa-alipay",
            searchTerms: []
        }, {
            title: "fa-brands fa-amazon",
            searchTerms: []
        }, {
            title: "fa-brands fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fa-brands fa-amilia",
            searchTerms: []
        }, {
            title: "fa-solid fa-anchor",
            searchTerms: []
        }, {
            title: "fa-solid fa-anchor-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-anchor-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-anchor-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-anchor-lock",
            searchTerms: []
        }, {
            title: "fa-brands fa-android",
            searchTerms: []
        }, {
            title: "fa-brands fa-angellist",
            searchTerms: []
        }, {
            title: "fa-solid fa-angle-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-angle-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-angle-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-angle-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-angles-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-angles-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-angles-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-angles-up",
            searchTerms: []
        }, {
            title: "fa-brands fa-angrycreative",
            searchTerms: []
        }, {
            title: "fa-brands fa-angular",
            searchTerms: []
        }, {
            title: "fa-solid fa-ankh",
            searchTerms: []
        }, {
            title: "fa-brands fa-app-store",
            searchTerms: []
        }, {
            title: "fa-brands fa-app-store-ios",
            searchTerms: []
        }, {
            title: "fa-brands fa-apper",
            searchTerms: []
        }, {
            title: "fa-brands fa-apple",
            searchTerms: []
        }, {
            title: "fa-brands fa-apple-pay",
            searchTerms: []
        }, {
            title: "fa-solid fa-apple-whole",
            searchTerms: []
        }, {
            title: "fa-solid fa-archway",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-1-9",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-9-1",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-a-z",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-short-wide",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-up-across-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-up-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-wide-short",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-down-z-a",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-left-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-pointer",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right-arrow-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right-from-bracket",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right-to-bracket",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-right-to-city",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-rotate-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-rotate-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-trend-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-trend-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-turn-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-turn-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-1-9",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-9-1",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-a-z",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-from-bracket",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-from-ground-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-from-water-pump",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-right-dots",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-right-from-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-short-wide",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-wide-short",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrow-up-z-a",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-down-to-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-down-to-people",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-left-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-left-right-to-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-rotate",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-spin",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-split-up-and-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-to-circle",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-to-dot",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-to-eye",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-turn-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-turn-to-dots",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-up-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-up-down-left-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-arrows-up-to-line",
            searchTerms: []
        }, {
            title: "fa-brands fa-artstation",
            searchTerms: []
        }, {
            title: "fa-solid fa-asterisk",
            searchTerms: []
        }, {
            title: "fa-brands fa-asymmetrik",
            searchTerms: []
        }, {
            title: "fa-solid fa-at",
            searchTerms: []
        }, {
            title: "fa-brands fa-atlassian",
            searchTerms: []
        }, {
            title: "fa-solid fa-atom",
            searchTerms: []
        }, {
            title: "fa-brands fa-audible",
            searchTerms: []
        }, {
            title: "fa-solid fa-audio-description",
            searchTerms: []
        }, {
            title: "fa-solid fa-austral-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-autoprefixer",
            searchTerms: []
        }, {
            title: "fa-brands fa-avianex",
            searchTerms: []
        }, {
            title: "fa-brands fa-aviato",
            searchTerms: []
        }, {
            title: "fa-solid fa-award",
            searchTerms: []
        }, {
            title: "fa-brands fa-aws",
            searchTerms: []
        }, {
            title: "fa-solid fa-b",
            searchTerms: []
        }, {
            title: "fa-solid fa-baby",
            searchTerms: []
        }, {
            title: "fa-solid fa-baby-carriage",
            searchTerms: []
        }, {
            title: "fa-solid fa-backward",
            searchTerms: []
        }, {
            title: "fa-solid fa-backward-fast",
            searchTerms: []
        }, {
            title: "fa-solid fa-backward-step",
            searchTerms: []
        }, {
            title: "fa-solid fa-bacon",
            searchTerms: []
        }, {
            title: "fa-solid fa-bacteria",
            searchTerms: []
        }, {
            title: "fa-solid fa-bacterium",
            searchTerms: []
        }, {
            title: "fa-solid fa-bag-shopping",
            searchTerms: []
        }, {
            title: "fa-solid fa-bahai",
            searchTerms: []
        }, {
            title: "fa-solid fa-baht-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-ban",
            searchTerms: []
        }, {
            title: "fa-solid fa-ban-smoking",
            searchTerms: []
        }, {
            title: "fa-solid fa-bandage",
            searchTerms: []
        }, {
            title: "fa-brands fa-bandcamp",
            searchTerms: []
        }, {
            title: "fa-solid fa-barcode",
            searchTerms: []
        }, {
            title: "fa-solid fa-bars",
            searchTerms: []
        }, {
            title: "fa-solid fa-bars-progress",
            searchTerms: []
        }, {
            title: "fa-solid fa-bars-staggered",
            searchTerms: []
        }, {
            title: "fa-solid fa-baseball",
            searchTerms: []
        }, {
            title: "fa-solid fa-baseball-bat-ball",
            searchTerms: []
        }, {
            title: "fa-solid fa-basket-shopping",
            searchTerms: []
        }, {
            title: "fa-solid fa-basketball",
            searchTerms: []
        }, {
            title: "fa-solid fa-bath",
            searchTerms: []
        }, {
            title: "fa-solid fa-battery-empty",
            searchTerms: []
        }, {
            title: "fa-solid fa-battery-full",
            searchTerms: []
        }, {
            title: "fa-solid fa-battery-half",
            searchTerms: []
        }, {
            title: "fa-solid fa-battery-quarter",
            searchTerms: []
        }, {
            title: "fa-solid fa-battery-three-quarters",
            searchTerms: []
        }, {
            title: "fa-brands fa-battle-net",
            searchTerms: []
        }, {
            title: "fa-solid fa-bed",
            searchTerms: []
        }, {
            title: "fa-solid fa-bed-pulse",
            searchTerms: []
        }, {
            title: "fa-solid fa-beer-mug-empty",
            searchTerms: []
        }, {
            title: "fa-brands fa-behance",
            searchTerms: []
        }, {
            title: "fa-solid fa-bell",
            searchTerms: []
        }, {
            title: "fa-regular fa-bell",
            searchTerms: []
        }, {
            title: "fa-solid fa-bell-concierge",
            searchTerms: []
        }, {
            title: "fa-solid fa-bell-slash",
            searchTerms: []
        }, {
            title: "fa-regular fa-bell-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-bezier-curve",
            searchTerms: []
        }, {
            title: "fa-solid fa-bicycle",
            searchTerms: []
        }, {
            title: "fa-brands fa-bilibili",
            searchTerms: []
        }, {
            title: "fa-brands fa-bimobject",
            searchTerms: []
        }, {
            title: "fa-solid fa-binoculars",
            searchTerms: []
        }, {
            title: "fa-solid fa-biohazard",
            searchTerms: []
        }, {
            title: "fa-brands fa-bitbucket",
            searchTerms: []
        }, {
            title: "fa-brands fa-bitcoin",
            searchTerms: []
        }, {
            title: "fa-solid fa-bitcoin-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-bity",
            searchTerms: []
        }, {
            title: "fa-brands fa-black-tie",
            searchTerms: []
        }, {
            title: "fa-brands fa-blackberry",
            searchTerms: []
        }, {
            title: "fa-solid fa-blender",
            searchTerms: []
        }, {
            title: "fa-solid fa-blender-phone",
            searchTerms: []
        }, {
            title: "fa-solid fa-blog",
            searchTerms: []
        }, {
            title: "fa-brands fa-blogger",
            searchTerms: []
        }, {
            title: "fa-brands fa-blogger-b",
            searchTerms: []
        }, {
            title: "fa-brands fa-bluetooth",
            searchTerms: []
        }, {
            title: "fa-brands fa-bluetooth-b",
            searchTerms: []
        }, {
            title: "fa-solid fa-bold",
            searchTerms: []
        }, {
            title: "fa-solid fa-bolt",
            searchTerms: []
        }, {
            title: "fa-solid fa-bolt-lightning",
            searchTerms: []
        }, {
            title: "fa-solid fa-bomb",
            searchTerms: []
        }, {
            title: "fa-solid fa-bone",
            searchTerms: []
        }, {
            title: "fa-solid fa-bong",
            searchTerms: []
        }, {
            title: "fa-solid fa-book",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-atlas",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-bible",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-bookmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-journal-whills",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-open-reader",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-quran",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-skull",
            searchTerms: []
        }, {
            title: "fa-solid fa-book-tanakh",
            searchTerms: []
        }, {
            title: "fa-solid fa-bookmark",
            searchTerms: []
        }, {
            title: "fa-regular fa-bookmark",
            searchTerms: []
        }, {
            title: "fa-brands fa-bootstrap",
            searchTerms: []
        }, {
            title: "fa-solid fa-border-all",
            searchTerms: []
        }, {
            title: "fa-solid fa-border-none",
            searchTerms: []
        }, {
            title: "fa-solid fa-border-top-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-bore-hole",
            searchTerms: []
        }, {
            title: "fa-brands fa-bots",
            searchTerms: []
        }, {
            title: "fa-solid fa-bottle-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-bottle-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-bowl-food",
            searchTerms: []
        }, {
            title: "fa-solid fa-bowl-rice",
            searchTerms: []
        }, {
            title: "fa-solid fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fa-solid fa-box",
            searchTerms: []
        }, {
            title: "fa-solid fa-box-archive",
            searchTerms: []
        }, {
            title: "fa-solid fa-box-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-box-tissue",
            searchTerms: []
        }, {
            title: "fa-solid fa-boxes-packing",
            searchTerms: []
        }, {
            title: "fa-solid fa-boxes-stacked",
            searchTerms: []
        }, {
            title: "fa-solid fa-braille",
            searchTerms: []
        }, {
            title: "fa-solid fa-brain",
            searchTerms: []
        }, {
            title: "fa-solid fa-brazilian-real-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-bread-slice",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-bridge-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-briefcase",
            searchTerms: []
        }, {
            title: "fa-solid fa-briefcase-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-broom",
            searchTerms: []
        }, {
            title: "fa-solid fa-broom-ball",
            searchTerms: []
        }, {
            title: "fa-solid fa-brush",
            searchTerms: []
        }, {
            title: "fa-brands fa-btc",
            searchTerms: []
        }, {
            title: "fa-solid fa-bucket",
            searchTerms: []
        }, {
            title: "fa-brands fa-buffer",
            searchTerms: []
        }, {
            title: "fa-solid fa-bug",
            searchTerms: []
        }, {
            title: "fa-solid fa-bug-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-bugs",
            searchTerms: []
        }, {
            title: "fa-solid fa-building",
            searchTerms: []
        }, {
            title: "fa-regular fa-building",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-columns",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-ngo",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-shield",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-un",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-building-wheat",
            searchTerms: []
        }, {
            title: "fa-solid fa-bullhorn",
            searchTerms: []
        }, {
            title: "fa-solid fa-bullseye",
            searchTerms: []
        }, {
            title: "fa-solid fa-burger",
            searchTerms: []
        }, {
            title: "fa-brands fa-buromobelexperte",
            searchTerms: []
        }, {
            title: "fa-solid fa-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-bus",
            searchTerms: []
        }, {
            title: "fa-solid fa-bus-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-business-time",
            searchTerms: []
        }, {
            title: "fa-brands fa-buy-n-large",
            searchTerms: []
        }, {
            title: "fa-brands fa-buysellads",
            searchTerms: []
        }, {
            title: "fa-solid fa-c",
            searchTerms: []
        }, {
            title: "fa-solid fa-cable-car",
            searchTerms: []
        }, {
            title: "fa-solid fa-cake-candles",
            searchTerms: []
        }, {
            title: "fa-solid fa-calculator",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-check",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-day",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-days",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar-days",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-minus",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-plus",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-week",
            searchTerms: []
        }, {
            title: "fa-solid fa-calendar-xmark",
            searchTerms: []
        }, {
            title: "fa-regular fa-calendar-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-camera",
            searchTerms: []
        }, {
            title: "fa-solid fa-camera-retro",
            searchTerms: []
        }, {
            title: "fa-solid fa-camera-rotate",
            searchTerms: []
        }, {
            title: "fa-solid fa-campground",
            searchTerms: []
        }, {
            title: "fa-brands fa-canadian-maple-leaf",
            searchTerms: []
        }, {
            title: "fa-solid fa-candy-cane",
            searchTerms: []
        }, {
            title: "fa-solid fa-cannabis",
            searchTerms: []
        }, {
            title: "fa-solid fa-capsules",
            searchTerms: []
        }, {
            title: "fa-solid fa-car",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-battery",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-on",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-rear",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-side",
            searchTerms: []
        }, {
            title: "fa-solid fa-car-tunnel",
            searchTerms: []
        }, {
            title: "fa-solid fa-caravan",
            searchTerms: []
        }, {
            title: "fa-solid fa-caret-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-caret-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-caret-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-caret-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-carrot",
            searchTerms: []
        }, {
            title: "fa-solid fa-cart-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-cart-flatbed",
            searchTerms: []
        }, {
            title: "fa-solid fa-cart-flatbed-suitcase",
            searchTerms: []
        }, {
            title: "fa-solid fa-cart-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-cart-shopping",
            searchTerms: []
        }, {
            title: "fa-solid fa-cash-register",
            searchTerms: []
        }, {
            title: "fa-solid fa-cat",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-amazon-pay",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-amex",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-apple-pay",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-diners-club",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-discover",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-jcb",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-mastercard",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-paypal",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-stripe",
            searchTerms: []
        }, {
            title: "fa-brands fa-cc-visa",
            searchTerms: []
        }, {
            title: "fa-solid fa-cedi-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-cent-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-centercode",
            searchTerms: []
        }, {
            title: "fa-brands fa-centos",
            searchTerms: []
        }, {
            title: "fa-solid fa-certificate",
            searchTerms: []
        }, {
            title: "fa-solid fa-chair",
            searchTerms: []
        }, {
            title: "fa-solid fa-chalkboard",
            searchTerms: []
        }, {
            title: "fa-solid fa-chalkboard-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-champagne-glasses",
            searchTerms: []
        }, {
            title: "fa-solid fa-charging-station",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-area",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-bar",
            searchTerms: []
        }, {
            title: "fa-regular fa-chart-bar",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-column",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-gantt",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-pie",
            searchTerms: []
        }, {
            title: "fa-solid fa-chart-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-check-double",
            searchTerms: []
        }, {
            title: "fa-solid fa-check-to-slot",
            searchTerms: []
        }, {
            title: "fa-solid fa-cheese",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-board",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-king",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-king",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-knight",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-knight",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-queen",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-queen",
            searchTerms: []
        }, {
            title: "fa-solid fa-chess-rook",
            searchTerms: []
        }, {
            title: "fa-regular fa-chess-rook",
            searchTerms: []
        }, {
            title: "fa-solid fa-chevron-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-chevron-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-chevron-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-chevron-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-child",
            searchTerms: []
        }, {
            title: "fa-solid fa-child-dress",
            searchTerms: []
        }, {
            title: "fa-solid fa-child-reaching",
            searchTerms: []
        }, {
            title: "fa-solid fa-child-rifle",
            searchTerms: []
        }, {
            title: "fa-solid fa-children",
            searchTerms: []
        }, {
            title: "fa-brands fa-chrome",
            searchTerms: []
        }, {
            title: "fa-brands fa-chromecast",
            searchTerms: []
        }, {
            title: "fa-solid fa-church",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-arrow-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-check",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-chevron-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-chevron-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-chevron-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-chevron-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-dollar-to-slot",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-dot",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-dot",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-down",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-h",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-half-stroke",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-info",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-left",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-nodes",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-notch",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-pause",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-pause",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-play",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-play",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-question",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-question",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-radiation",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-right",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-stop",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-stop",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-up",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-user",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-regular fa-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-city",
            searchTerms: []
        }, {
            title: "fa-solid fa-clapperboard",
            searchTerms: []
        }, {
            title: "fa-solid fa-clipboard",
            searchTerms: []
        }, {
            title: "fa-regular fa-clipboard",
            searchTerms: []
        }, {
            title: "fa-solid fa-clipboard-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-clipboard-list",
            searchTerms: []
        }, {
            title: "fa-solid fa-clipboard-question",
            searchTerms: []
        }, {
            title: "fa-solid fa-clipboard-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-clock",
            searchTerms: []
        }, {
            title: "fa-regular fa-clock",
            searchTerms: []
        }, {
            title: "fa-solid fa-clock-rotate-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-clone",
            searchTerms: []
        }, {
            title: "fa-regular fa-clone",
            searchTerms: []
        }, {
            title: "fa-solid fa-closed-captioning",
            searchTerms: []
        }, {
            title: "fa-regular fa-closed-captioning",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-bolt",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-meatball",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-moon",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-moon-rain",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-rain",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-showers-heavy",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-showers-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-sun",
            searchTerms: []
        }, {
            title: "fa-solid fa-cloud-sun-rain",
            searchTerms: []
        }, {
            title: "fa-brands fa-cloudflare",
            searchTerms: []
        }, {
            title: "fa-brands fa-cloudscale",
            searchTerms: []
        }, {
            title: "fa-brands fa-cloudsmith",
            searchTerms: []
        }, {
            title: "fa-brands fa-cloudversify",
            searchTerms: []
        }, {
            title: "fa-solid fa-clover",
            searchTerms: []
        }, {
            title: "fa-brands fa-cmplid",
            searchTerms: []
        }, {
            title: "fa-solid fa-code",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-branch",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-commit",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-compare",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-fork",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-merge",
            searchTerms: []
        }, {
            title: "fa-solid fa-code-pull-request",
            searchTerms: []
        }, {
            title: "fa-brands fa-codepen",
            searchTerms: []
        }, {
            title: "fa-brands fa-codiepie",
            searchTerms: []
        }, {
            title: "fa-solid fa-coins",
            searchTerms: []
        }, {
            title: "fa-solid fa-colon-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment",
            searchTerms: []
        }, {
            title: "fa-regular fa-comment",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment-dots",
            searchTerms: []
        }, {
            title: "fa-regular fa-comment-dots",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-comment-sms",
            searchTerms: []
        }, {
            title: "fa-solid fa-comments",
            searchTerms: []
        }, {
            title: "fa-regular fa-comments",
            searchTerms: []
        }, {
            title: "fa-solid fa-comments-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-compact-disc",
            searchTerms: []
        }, {
            title: "fa-solid fa-compass",
            searchTerms: []
        }, {
            title: "fa-regular fa-compass",
            searchTerms: []
        }, {
            title: "fa-solid fa-compass-drafting",
            searchTerms: []
        }, {
            title: "fa-solid fa-compress",
            searchTerms: []
        }, {
            title: "fa-solid fa-computer",
            searchTerms: []
        }, {
            title: "fa-solid fa-computer-mouse",
            searchTerms: []
        }, {
            title: "fa-brands fa-confluence",
            searchTerms: []
        }, {
            title: "fa-brands fa-connectdevelop",
            searchTerms: []
        }, {
            title: "fa-brands fa-contao",
            searchTerms: []
        }, {
            title: "fa-solid fa-cookie",
            searchTerms: []
        }, {
            title: "fa-solid fa-cookie-bite",
            searchTerms: []
        }, {
            title: "fa-solid fa-copy",
            searchTerms: []
        }, {
            title: "fa-regular fa-copy",
            searchTerms: []
        }, {
            title: "fa-solid fa-copyright",
            searchTerms: []
        }, {
            title: "fa-regular fa-copyright",
            searchTerms: []
        }, {
            title: "fa-brands fa-cotton-bureau",
            searchTerms: []
        }, {
            title: "fa-solid fa-couch",
            searchTerms: []
        }, {
            title: "fa-solid fa-cow",
            searchTerms: []
        }, {
            title: "fa-brands fa-cpanel",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-by",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-nc",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-nc-eu",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-nc-jp",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-nd",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-pd",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-pd-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-remix",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-sa",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-sampling",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-sampling-plus",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-share",
            searchTerms: []
        }, {
            title: "fa-brands fa-creative-commons-zero",
            searchTerms: []
        }, {
            title: "fa-solid fa-credit-card",
            searchTerms: []
        }, {
            title: "fa-regular fa-credit-card",
            searchTerms: []
        }, {
            title: "fa-brands fa-critical-role",
            searchTerms: []
        }, {
            title: "fa-solid fa-crop",
            searchTerms: []
        }, {
            title: "fa-solid fa-crop-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-cross",
            searchTerms: []
        }, {
            title: "fa-solid fa-crosshairs",
            searchTerms: []
        }, {
            title: "fa-solid fa-crow",
            searchTerms: []
        }, {
            title: "fa-solid fa-crown",
            searchTerms: []
        }, {
            title: "fa-solid fa-crutch",
            searchTerms: []
        }, {
            title: "fa-solid fa-cruzeiro-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-css3",
            searchTerms: []
        }, {
            title: "fa-brands fa-css3-alt",
            searchTerms: []
        }, {
            title: "fa-solid fa-cube",
            searchTerms: []
        }, {
            title: "fa-solid fa-cubes",
            searchTerms: []
        }, {
            title: "fa-solid fa-cubes-stacked",
            searchTerms: []
        }, {
            title: "fa-brands fa-cuttlefish",
            searchTerms: []
        }, {
            title: "fa-solid fa-d",
            searchTerms: []
        }, {
            title: "fa-brands fa-d-and-d",
            searchTerms: []
        }, {
            title: "fa-brands fa-d-and-d-beyond",
            searchTerms: []
        }, {
            title: "fa-brands fa-dailymotion",
            searchTerms: []
        }, {
            title: "fa-brands fa-dashcube",
            searchTerms: []
        }, {
            title: "fa-solid fa-database",
            searchTerms: []
        }, {
            title: "fa-brands fa-deezer",
            searchTerms: []
        }, {
            title: "fa-solid fa-delete-left",
            searchTerms: []
        }, {
            title: "fa-brands fa-delicious",
            searchTerms: []
        }, {
            title: "fa-solid fa-democrat",
            searchTerms: []
        }, {
            title: "fa-brands fa-deploydog",
            searchTerms: []
        }, {
            title: "fa-brands fa-deskpro",
            searchTerms: []
        }, {
            title: "fa-solid fa-desktop",
            searchTerms: []
        }, {
            title: "fa-brands fa-dev",
            searchTerms: []
        }, {
            title: "fa-brands fa-deviantart",
            searchTerms: []
        }, {
            title: "fa-solid fa-dharmachakra",
            searchTerms: []
        }, {
            title: "fa-brands fa-dhl",
            searchTerms: []
        }, {
            title: "fa-solid fa-diagram-next",
            searchTerms: []
        }, {
            title: "fa-solid fa-diagram-predecessor",
            searchTerms: []
        }, {
            title: "fa-solid fa-diagram-project",
            searchTerms: []
        }, {
            title: "fa-solid fa-diagram-successor",
            searchTerms: []
        }, {
            title: "fa-solid fa-diamond",
            searchTerms: []
        }, {
            title: "fa-solid fa-diamond-turn-right",
            searchTerms: []
        }, {
            title: "fa-brands fa-diaspora",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-d20",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-d6",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-five",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-four",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-one",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-six",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-three",
            searchTerms: []
        }, {
            title: "fa-solid fa-dice-two",
            searchTerms: []
        }, {
            title: "fa-brands fa-digg",
            searchTerms: []
        }, {
            title: "fa-brands fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fa-brands fa-discord",
            searchTerms: []
        }, {
            title: "fa-brands fa-discourse",
            searchTerms: []
        }, {
            title: "fa-solid fa-disease",
            searchTerms: []
        }, {
            title: "fa-solid fa-display",
            searchTerms: []
        }, {
            title: "fa-solid fa-divide",
            searchTerms: []
        }, {
            title: "fa-solid fa-dna",
            searchTerms: []
        }, {
            title: "fa-brands fa-dochub",
            searchTerms: []
        }, {
            title: "fa-brands fa-docker",
            searchTerms: []
        }, {
            title: "fa-solid fa-dog",
            searchTerms: []
        }, {
            title: "fa-solid fa-dollar-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-dolly",
            searchTerms: []
        }, {
            title: "fa-solid fa-dong-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-door-closed",
            searchTerms: []
        }, {
            title: "fa-solid fa-door-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-dove",
            searchTerms: []
        }, {
            title: "fa-solid fa-down-left-and-up-right-to-center",
            searchTerms: []
        }, {
            title: "fa-solid fa-down-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-download",
            searchTerms: []
        }, {
            title: "fa-brands fa-draft2digital",
            searchTerms: []
        }, {
            title: "fa-solid fa-dragon",
            searchTerms: []
        }, {
            title: "fa-solid fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fa-brands fa-dribbble",
            searchTerms: []
        }, {
            title: "fa-brands fa-dropbox",
            searchTerms: []
        }, {
            title: "fa-solid fa-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-droplet-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-drum",
            searchTerms: []
        }, {
            title: "fa-solid fa-drum-steelpan",
            searchTerms: []
        }, {
            title: "fa-solid fa-drumstick-bite",
            searchTerms: []
        }, {
            title: "fa-brands fa-drupal",
            searchTerms: []
        }, {
            title: "fa-solid fa-dumbbell",
            searchTerms: []
        }, {
            title: "fa-solid fa-dumpster",
            searchTerms: []
        }, {
            title: "fa-solid fa-dumpster-fire",
            searchTerms: []
        }, {
            title: "fa-solid fa-dungeon",
            searchTerms: []
        }, {
            title: "fa-brands fa-dyalog",
            searchTerms: []
        }, {
            title: "fa-solid fa-e",
            searchTerms: []
        }, {
            title: "fa-solid fa-ear-deaf",
            searchTerms: []
        }, {
            title: "fa-solid fa-ear-listen",
            searchTerms: []
        }, {
            title: "fa-brands fa-earlybirds",
            searchTerms: []
        }, {
            title: "fa-solid fa-earth-africa",
            searchTerms: []
        }, {
            title: "fa-solid fa-earth-americas",
            searchTerms: []
        }, {
            title: "fa-solid fa-earth-asia",
            searchTerms: []
        }, {
            title: "fa-solid fa-earth-europe",
            searchTerms: []
        }, {
            title: "fa-solid fa-earth-oceania",
            searchTerms: []
        }, {
            title: "fa-brands fa-ebay",
            searchTerms: []
        }, {
            title: "fa-brands fa-edge",
            searchTerms: []
        }, {
            title: "fa-brands fa-edge-legacy",
            searchTerms: []
        }, {
            title: "fa-solid fa-egg",
            searchTerms: []
        }, {
            title: "fa-solid fa-eject",
            searchTerms: []
        }, {
            title: "fa-brands fa-elementor",
            searchTerms: []
        }, {
            title: "fa-solid fa-elevator",
            searchTerms: []
        }, {
            title: "fa-solid fa-ellipsis",
            searchTerms: []
        }, {
            title: "fa-solid fa-ellipsis-vertical",
            searchTerms: []
        }, {
            title: "fa-brands fa-ello",
            searchTerms: []
        }, {
            title: "fa-brands fa-ember",
            searchTerms: []
        }, {
            title: "fa-brands fa-empire",
            searchTerms: []
        }, {
            title: "fa-solid fa-envelope",
            searchTerms: []
        }, {
            title: "fa-regular fa-envelope",
            searchTerms: []
        }, {
            title: "fa-solid fa-envelope-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-envelope-open",
            searchTerms: []
        }, {
            title: "fa-regular fa-envelope-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-envelope-open-text",
            searchTerms: []
        }, {
            title: "fa-solid fa-envelopes-bulk",
            searchTerms: []
        }, {
            title: "fa-brands fa-envira",
            searchTerms: []
        }, {
            title: "fa-solid fa-equals",
            searchTerms: []
        }, {
            title: "fa-solid fa-eraser",
            searchTerms: []
        }, {
            title: "fa-brands fa-erlang",
            searchTerms: []
        }, {
            title: "fa-brands fa-ethereum",
            searchTerms: []
        }, {
            title: "fa-solid fa-ethernet",
            searchTerms: []
        }, {
            title: "fa-brands fa-etsy",
            searchTerms: []
        }, {
            title: "fa-solid fa-euro-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-evernote",
            searchTerms: []
        }, {
            title: "fa-solid fa-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-expand",
            searchTerms: []
        }, {
            title: "fa-brands fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fa-solid fa-explosion",
            searchTerms: []
        }, {
            title: "fa-solid fa-eye",
            searchTerms: []
        }, {
            title: "fa-regular fa-eye",
            searchTerms: []
        }, {
            title: "fa-solid fa-eye-dropper",
            searchTerms: []
        }, {
            title: "fa-solid fa-eye-low-vision",
            searchTerms: []
        }, {
            title: "fa-solid fa-eye-slash",
            searchTerms: []
        }, {
            title: "fa-regular fa-eye-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-f",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-angry",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-angry",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-dizzy",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-dizzy",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-flushed",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-flushed",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-frown",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-frown",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-frown-open",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-frown-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grimace",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grimace",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-beam",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-beam",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-beam-sweat",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-beam-sweat",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-hearts",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-hearts",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-squint",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-squint",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-squint-tears",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-squint-tears",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-stars",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-stars",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-tears",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-tears",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-tongue",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-tongue",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-tongue-squint",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-tongue-squint",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-tongue-wink",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-tongue-wink",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-wide",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-wide",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-grin-wink",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-grin-wink",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-kiss",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-kiss",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-kiss-beam",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-kiss-beam",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-kiss-wink-heart",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-kiss-wink-heart",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-laugh",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-laugh",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-laugh-beam",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-laugh-beam",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-laugh-squint",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-laugh-squint",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-laugh-wink",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-laugh-wink",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-meh",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-meh",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-meh-blank",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-meh-blank",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-rolling-eyes",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-rolling-eyes",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-sad-cry",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-sad-cry",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-sad-tear",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-sad-tear",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-smile",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-smile",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-smile-beam",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-smile-beam",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-smile-wink",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-smile-wink",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-surprise",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-surprise",
            searchTerms: []
        }, {
            title: "fa-solid fa-face-tired",
            searchTerms: []
        }, {
            title: "fa-regular fa-face-tired",
            searchTerms: []
        }, {
            title: "fa-brands fa-facebook",
            searchTerms: []
        }, {
            title: "fa-brands fa-facebook-f",
            searchTerms: []
        }, {
            title: "fa-brands fa-facebook-messenger",
            searchTerms: []
        }, {
            title: "fa-solid fa-fan",
            searchTerms: []
        }, {
            title: "fa-brands fa-fantasy-flight-games",
            searchTerms: []
        }, {
            title: "fa-solid fa-faucet",
            searchTerms: []
        }, {
            title: "fa-solid fa-faucet-drip",
            searchTerms: []
        }, {
            title: "fa-solid fa-fax",
            searchTerms: []
        }, {
            title: "fa-solid fa-feather",
            searchTerms: []
        }, {
            title: "fa-solid fa-feather-pointed",
            searchTerms: []
        }, {
            title: "fa-brands fa-fedex",
            searchTerms: []
        }, {
            title: "fa-brands fa-fedora",
            searchTerms: []
        }, {
            title: "fa-solid fa-ferry",
            searchTerms: []
        }, {
            title: "fa-brands fa-figma",
            searchTerms: []
        }, {
            title: "fa-solid fa-file",
            searchTerms: []
        }, {
            title: "fa-regular fa-file",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-audio",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-audio",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-question",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-code",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-code",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-contract",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-csv",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-excel",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-excel",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-export",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-image",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-image",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-import",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-invoice",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-invoice-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-lines",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-lines",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-pdf",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-pdf",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-pen",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-prescription",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-shield",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-signature",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-video",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-video",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-waveform",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-word",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-word",
            searchTerms: []
        }, {
            title: "fa-solid fa-file-zipper",
            searchTerms: []
        }, {
            title: "fa-regular fa-file-zipper",
            searchTerms: []
        }, {
            title: "fa-solid fa-fill",
            searchTerms: []
        }, {
            title: "fa-solid fa-fill-drip",
            searchTerms: []
        }, {
            title: "fa-solid fa-film",
            searchTerms: []
        }, {
            title: "fa-solid fa-filter",
            searchTerms: []
        }, {
            title: "fa-solid fa-filter-circle-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-filter-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-fingerprint",
            searchTerms: []
        }, {
            title: "fa-solid fa-fire",
            searchTerms: []
        }, {
            title: "fa-solid fa-fire-burner",
            searchTerms: []
        }, {
            title: "fa-solid fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fa-solid fa-fire-flame-curved",
            searchTerms: []
        }, {
            title: "fa-solid fa-fire-flame-simple",
            searchTerms: []
        }, {
            title: "fa-brands fa-firefox",
            searchTerms: []
        }, {
            title: "fa-brands fa-firefox-browser",
            searchTerms: []
        }, {
            title: "fa-brands fa-first-order",
            searchTerms: []
        }, {
            title: "fa-brands fa-first-order-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-firstdraft",
            searchTerms: []
        }, {
            title: "fa-solid fa-fish",
            searchTerms: []
        }, {
            title: "fa-solid fa-fish-fins",
            searchTerms: []
        }, {
            title: "fa-solid fa-flag",
            searchTerms: []
        }, {
            title: "fa-regular fa-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-flag-checkered",
            searchTerms: []
        }, {
            title: "fa-solid fa-flag-usa",
            searchTerms: []
        }, {
            title: "fa-solid fa-flask",
            searchTerms: []
        }, {
            title: "fa-solid fa-flask-vial",
            searchTerms: []
        }, {
            title: "fa-brands fa-flickr",
            searchTerms: []
        }, {
            title: "fa-brands fa-flipboard",
            searchTerms: []
        }, {
            title: "fa-solid fa-floppy-disk",
            searchTerms: []
        }, {
            title: "fa-regular fa-floppy-disk",
            searchTerms: []
        }, {
            title: "fa-solid fa-florin-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-fly",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder",
            searchTerms: []
        }, {
            title: "fa-regular fa-folder",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder-closed",
            searchTerms: []
        }, {
            title: "fa-regular fa-folder-closed",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder-open",
            searchTerms: []
        }, {
            title: "fa-regular fa-folder-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-folder-tree",
            searchTerms: []
        }, {
            title: "fa-solid fa-font",
            searchTerms: []
        }, {
            title: "fa-solid fa-font-awesome",
            searchTerms: []
        }, {
            title: "fa-regular fa-font-awesome",
            searchTerms: []
        }, {
            title: "fa-brands fa-font-awesome",
            searchTerms: []
        }, {
            title: "fa-brands fa-fonticons",
            searchTerms: []
        }, {
            title: "fa-brands fa-fonticons-fi",
            searchTerms: []
        }, {
            title: "fa-solid fa-football",
            searchTerms: []
        }, {
            title: "fa-brands fa-fort-awesome",
            searchTerms: []
        }, {
            title: "fa-brands fa-fort-awesome-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-forumbee",
            searchTerms: []
        }, {
            title: "fa-solid fa-forward",
            searchTerms: []
        }, {
            title: "fa-solid fa-forward-fast",
            searchTerms: []
        }, {
            title: "fa-solid fa-forward-step",
            searchTerms: []
        }, {
            title: "fa-brands fa-foursquare",
            searchTerms: []
        }, {
            title: "fa-solid fa-franc-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-free-code-camp",
            searchTerms: []
        }, {
            title: "fa-brands fa-freebsd",
            searchTerms: []
        }, {
            title: "fa-solid fa-frog",
            searchTerms: []
        }, {
            title: "fa-brands fa-fulcrum",
            searchTerms: []
        }, {
            title: "fa-solid fa-futbol",
            searchTerms: []
        }, {
            title: "fa-regular fa-futbol",
            searchTerms: []
        }, {
            title: "fa-solid fa-g",
            searchTerms: []
        }, {
            title: "fa-brands fa-galactic-republic",
            searchTerms: []
        }, {
            title: "fa-brands fa-galactic-senate",
            searchTerms: []
        }, {
            title: "fa-solid fa-gamepad",
            searchTerms: []
        }, {
            title: "fa-solid fa-gas-pump",
            searchTerms: []
        }, {
            title: "fa-solid fa-gauge",
            searchTerms: []
        }, {
            title: "fa-solid fa-gauge-high",
            searchTerms: []
        }, {
            title: "fa-solid fa-gauge-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-gauge-simple-high",
            searchTerms: []
        }, {
            title: "fa-solid fa-gavel",
            searchTerms: []
        }, {
            title: "fa-solid fa-gear",
            searchTerms: []
        }, {
            title: "fa-solid fa-gears",
            searchTerms: []
        }, {
            title: "fa-solid fa-gem",
            searchTerms: []
        }, {
            title: "fa-regular fa-gem",
            searchTerms: []
        }, {
            title: "fa-solid fa-genderless",
            searchTerms: []
        }, {
            title: "fa-brands fa-get-pocket",
            searchTerms: []
        }, {
            title: "fa-brands fa-gg",
            searchTerms: []
        }, {
            title: "fa-brands fa-gg-circle",
            searchTerms: []
        }, {
            title: "fa-solid fa-ghost",
            searchTerms: []
        }, {
            title: "fa-solid fa-gift",
            searchTerms: []
        }, {
            title: "fa-solid fa-gifts",
            searchTerms: []
        }, {
            title: "fa-brands fa-git",
            searchTerms: []
        }, {
            title: "fa-brands fa-git-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-github",
            searchTerms: []
        }, {
            title: "fa-brands fa-github-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-gitkraken",
            searchTerms: []
        }, {
            title: "fa-brands fa-gitlab",
            searchTerms: []
        }, {
            title: "fa-brands fa-gitter",
            searchTerms: []
        }, {
            title: "fa-solid fa-glass-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-glass-water-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-glasses",
            searchTerms: []
        }, {
            title: "fa-brands fa-glide",
            searchTerms: []
        }, {
            title: "fa-brands fa-glide-g",
            searchTerms: []
        }, {
            title: "fa-solid fa-globe",
            searchTerms: []
        }, {
            title: "fa-brands fa-gofore",
            searchTerms: []
        }, {
            title: "fa-brands fa-golang",
            searchTerms: []
        }, {
            title: "fa-solid fa-golf-ball-tee",
            searchTerms: []
        }, {
            title: "fa-brands fa-goodreads",
            searchTerms: []
        }, {
            title: "fa-brands fa-goodreads-g",
            searchTerms: []
        }, {
            title: "fa-brands fa-google",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-drive",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-pay",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-play",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-plus",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-plus-g",
            searchTerms: []
        }, {
            title: "fa-brands fa-google-wallet",
            searchTerms: []
        }, {
            title: "fa-solid fa-gopuram",
            searchTerms: []
        }, {
            title: "fa-solid fa-graduation-cap",
            searchTerms: []
        }, {
            title: "fa-brands fa-gratipay",
            searchTerms: []
        }, {
            title: "fa-brands fa-grav",
            searchTerms: []
        }, {
            title: "fa-solid fa-greater-than",
            searchTerms: []
        }, {
            title: "fa-solid fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fa-solid fa-grip",
            searchTerms: []
        }, {
            title: "fa-solid fa-grip-lines",
            searchTerms: []
        }, {
            title: "fa-solid fa-grip-lines-vertical",
            searchTerms: []
        }, {
            title: "fa-solid fa-grip-vertical",
            searchTerms: []
        }, {
            title: "fa-brands fa-gripfire",
            searchTerms: []
        }, {
            title: "fa-solid fa-group-arrows-rotate",
            searchTerms: []
        }, {
            title: "fa-brands fa-grunt",
            searchTerms: []
        }, {
            title: "fa-solid fa-guarani-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-guilded",
            searchTerms: []
        }, {
            title: "fa-solid fa-guitar",
            searchTerms: []
        }, {
            title: "fa-brands fa-gulp",
            searchTerms: []
        }, {
            title: "fa-solid fa-gun",
            searchTerms: []
        }, {
            title: "fa-solid fa-h",
            searchTerms: []
        }, {
            title: "fa-brands fa-hacker-news",
            searchTerms: []
        }, {
            title: "fa-brands fa-hackerrank",
            searchTerms: []
        }, {
            title: "fa-solid fa-hammer",
            searchTerms: []
        }, {
            title: "fa-solid fa-hamsa",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-back-fist",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-back-fist",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-dots",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-fist",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding-hand",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-holding-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-middle-finger",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-peace",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-peace",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-point-down",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-point-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-point-left",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-point-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-point-right",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-point-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-point-up",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-point-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-pointer",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-pointer",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-sparkles",
            searchTerms: []
        }, {
            title: "fa-solid fa-hand-spock",
            searchTerms: []
        }, {
            title: "fa-regular fa-hand-spock",
            searchTerms: []
        }, {
            title: "fa-solid fa-handcuffs",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-asl-interpreting",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-bound",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-bubbles",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-clapping",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-holding",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-holding-child",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-holding-circle",
            searchTerms: []
        }, {
            title: "fa-solid fa-hands-praying",
            searchTerms: []
        }, {
            title: "fa-solid fa-handshake",
            searchTerms: []
        }, {
            title: "fa-regular fa-handshake",
            searchTerms: []
        }, {
            title: "fa-solid fa-handshake-angle",
            searchTerms: []
        }, {
            title: "fa-solid fa-handshake-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-handshake-simple-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-handshake-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-hanukiah",
            searchTerms: []
        }, {
            title: "fa-solid fa-hard-drive",
            searchTerms: []
        }, {
            title: "fa-regular fa-hard-drive",
            searchTerms: []
        }, {
            title: "fa-brands fa-hashnode",
            searchTerms: []
        }, {
            title: "fa-solid fa-hashtag",
            searchTerms: []
        }, {
            title: "fa-solid fa-hat-cowboy",
            searchTerms: []
        }, {
            title: "fa-solid fa-hat-cowboy-side",
            searchTerms: []
        }, {
            title: "fa-solid fa-hat-wizard",
            searchTerms: []
        }, {
            title: "fa-solid fa-head-side-cough",
            searchTerms: []
        }, {
            title: "fa-solid fa-head-side-cough-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-head-side-mask",
            searchTerms: []
        }, {
            title: "fa-solid fa-head-side-virus",
            searchTerms: []
        }, {
            title: "fa-solid fa-heading",
            searchTerms: []
        }, {
            title: "fa-solid fa-headphones",
            searchTerms: []
        }, {
            title: "fa-solid fa-headphones-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-headset",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart",
            searchTerms: []
        }, {
            title: "fa-regular fa-heart",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-bolt",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-crack",
            searchTerms: []
        }, {
            title: "fa-solid fa-heart-pulse",
            searchTerms: []
        }, {
            title: "fa-solid fa-helicopter",
            searchTerms: []
        }, {
            title: "fa-solid fa-helicopter-symbol",
            searchTerms: []
        }, {
            title: "fa-solid fa-helmet-safety",
            searchTerms: []
        }, {
            title: "fa-solid fa-helmet-un",
            searchTerms: []
        }, {
            title: "fa-solid fa-highlighter",
            searchTerms: []
        }, {
            title: "fa-solid fa-hill-avalanche",
            searchTerms: []
        }, {
            title: "fa-solid fa-hill-rockslide",
            searchTerms: []
        }, {
            title: "fa-solid fa-hippo",
            searchTerms: []
        }, {
            title: "fa-brands fa-hips",
            searchTerms: []
        }, {
            title: "fa-brands fa-hire-a-helper",
            searchTerms: []
        }, {
            title: "fa-brands fa-hive",
            searchTerms: []
        }, {
            title: "fa-solid fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fa-solid fa-holly-berry",
            searchTerms: []
        }, {
            title: "fa-brands fa-hooli",
            searchTerms: []
        }, {
            title: "fa-brands fa-hornbill",
            searchTerms: []
        }, {
            title: "fa-solid fa-horse",
            searchTerms: []
        }, {
            title: "fa-solid fa-horse-head",
            searchTerms: []
        }, {
            title: "fa-solid fa-hospital",
            searchTerms: []
        }, {
            title: "fa-regular fa-hospital",
            searchTerms: []
        }, {
            title: "fa-solid fa-hospital-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-hot-tub-person",
            searchTerms: []
        }, {
            title: "fa-solid fa-hotdog",
            searchTerms: []
        }, {
            title: "fa-solid fa-hotel",
            searchTerms: []
        }, {
            title: "fa-brands fa-hotjar",
            searchTerms: []
        }, {
            title: "fa-solid fa-hourglass",
            searchTerms: []
        }, {
            title: "fa-regular fa-hourglass",
            searchTerms: []
        }, {
            title: "fa-solid fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fa-solid fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fa-regular fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fa-solid fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fa-solid fa-house",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-chimney",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-chimney-crack",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-chimney-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-chimney-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-chimney-window",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-crack",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-fire",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-flood-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-flood-water-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-laptop",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-medical-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-medical-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-medical-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-medical-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-signal",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-tsunami",
            searchTerms: []
        }, {
            title: "fa-solid fa-house-user",
            searchTerms: []
        }, {
            title: "fa-brands fa-houzz",
            searchTerms: []
        }, {
            title: "fa-solid fa-hryvnia-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-html5",
            searchTerms: []
        }, {
            title: "fa-brands fa-hubspot",
            searchTerms: []
        }, {
            title: "fa-solid fa-hurricane",
            searchTerms: []
        }, {
            title: "fa-solid fa-i",
            searchTerms: []
        }, {
            title: "fa-solid fa-i-cursor",
            searchTerms: []
        }, {
            title: "fa-solid fa-ice-cream",
            searchTerms: []
        }, {
            title: "fa-solid fa-icicles",
            searchTerms: []
        }, {
            title: "fa-solid fa-icons",
            searchTerms: []
        }, {
            title: "fa-solid fa-id-badge",
            searchTerms: []
        }, {
            title: "fa-regular fa-id-badge",
            searchTerms: []
        }, {
            title: "fa-solid fa-id-card",
            searchTerms: []
        }, {
            title: "fa-regular fa-id-card",
            searchTerms: []
        }, {
            title: "fa-solid fa-id-card-clip",
            searchTerms: []
        }, {
            title: "fa-brands fa-ideal",
            searchTerms: []
        }, {
            title: "fa-solid fa-igloo",
            searchTerms: []
        }, {
            title: "fa-solid fa-image",
            searchTerms: []
        }, {
            title: "fa-regular fa-image",
            searchTerms: []
        }, {
            title: "fa-solid fa-image-portrait",
            searchTerms: []
        }, {
            title: "fa-solid fa-images",
            searchTerms: []
        }, {
            title: "fa-regular fa-images",
            searchTerms: []
        }, {
            title: "fa-brands fa-imdb",
            searchTerms: []
        }, {
            title: "fa-solid fa-inbox",
            searchTerms: []
        }, {
            title: "fa-solid fa-indent",
            searchTerms: []
        }, {
            title: "fa-solid fa-indian-rupee-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-industry",
            searchTerms: []
        }, {
            title: "fa-solid fa-infinity",
            searchTerms: []
        }, {
            title: "fa-solid fa-info",
            searchTerms: []
        }, {
            title: "fa-brands fa-instagram",
            searchTerms: []
        }, {
            title: "fa-brands fa-instalod",
            searchTerms: []
        }, {
            title: "fa-brands fa-intercom",
            searchTerms: []
        }, {
            title: "fa-brands fa-internet-explorer",
            searchTerms: []
        }, {
            title: "fa-brands fa-invision",
            searchTerms: []
        }, {
            title: "fa-brands fa-ioxhost",
            searchTerms: []
        }, {
            title: "fa-solid fa-italic",
            searchTerms: []
        }, {
            title: "fa-brands fa-itch-io",
            searchTerms: []
        }, {
            title: "fa-brands fa-itunes",
            searchTerms: []
        }, {
            title: "fa-brands fa-itunes-note",
            searchTerms: []
        }, {
            title: "fa-solid fa-j",
            searchTerms: []
        }, {
            title: "fa-solid fa-jar",
            searchTerms: []
        }, {
            title: "fa-solid fa-jar-wheat",
            searchTerms: []
        }, {
            title: "fa-brands fa-java",
            searchTerms: []
        }, {
            title: "fa-solid fa-jedi",
            searchTerms: []
        }, {
            title: "fa-brands fa-jedi-order",
            searchTerms: []
        }, {
            title: "fa-brands fa-jenkins",
            searchTerms: []
        }, {
            title: "fa-solid fa-jet-fighter",
            searchTerms: []
        }, {
            title: "fa-solid fa-jet-fighter-up",
            searchTerms: []
        }, {
            title: "fa-brands fa-jira",
            searchTerms: []
        }, {
            title: "fa-brands fa-joget",
            searchTerms: []
        }, {
            title: "fa-solid fa-joint",
            searchTerms: []
        }, {
            title: "fa-brands fa-joomla",
            searchTerms: []
        }, {
            title: "fa-brands fa-js",
            searchTerms: []
        }, {
            title: "fa-brands fa-jsfiddle",
            searchTerms: []
        }, {
            title: "fa-solid fa-jug-detergent",
            searchTerms: []
        }, {
            title: "fa-solid fa-k",
            searchTerms: []
        }, {
            title: "fa-solid fa-kaaba",
            searchTerms: []
        }, {
            title: "fa-brands fa-kaggle",
            searchTerms: []
        }, {
            title: "fa-solid fa-key",
            searchTerms: []
        }, {
            title: "fa-brands fa-keybase",
            searchTerms: []
        }, {
            title: "fa-solid fa-keyboard",
            searchTerms: []
        }, {
            title: "fa-regular fa-keyboard",
            searchTerms: []
        }, {
            title: "fa-brands fa-keycdn",
            searchTerms: []
        }, {
            title: "fa-solid fa-khanda",
            searchTerms: []
        }, {
            title: "fa-brands fa-kickstarter",
            searchTerms: []
        }, {
            title: "fa-brands fa-kickstarter-k",
            searchTerms: []
        }, {
            title: "fa-solid fa-kip-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-kit-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-kitchen-set",
            searchTerms: []
        }, {
            title: "fa-solid fa-kiwi-bird",
            searchTerms: []
        }, {
            title: "fa-brands fa-korvue",
            searchTerms: []
        }, {
            title: "fa-solid fa-l",
            searchTerms: []
        }, {
            title: "fa-solid fa-land-mine-on",
            searchTerms: []
        }, {
            title: "fa-solid fa-landmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-landmark-dome",
            searchTerms: []
        }, {
            title: "fa-solid fa-landmark-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-language",
            searchTerms: []
        }, {
            title: "fa-solid fa-laptop",
            searchTerms: []
        }, {
            title: "fa-solid fa-laptop-code",
            searchTerms: []
        }, {
            title: "fa-solid fa-laptop-file",
            searchTerms: []
        }, {
            title: "fa-solid fa-laptop-medical",
            searchTerms: []
        }, {
            title: "fa-brands fa-laravel",
            searchTerms: []
        }, {
            title: "fa-solid fa-lari-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-lastfm",
            searchTerms: []
        }, {
            title: "fa-solid fa-layer-group",
            searchTerms: []
        }, {
            title: "fa-solid fa-leaf",
            searchTerms: []
        }, {
            title: "fa-brands fa-leanpub",
            searchTerms: []
        }, {
            title: "fa-solid fa-left-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-left-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-lemon",
            searchTerms: []
        }, {
            title: "fa-regular fa-lemon",
            searchTerms: []
        }, {
            title: "fa-brands fa-less",
            searchTerms: []
        }, {
            title: "fa-solid fa-less-than",
            searchTerms: []
        }, {
            title: "fa-solid fa-less-than-equal",
            searchTerms: []
        }, {
            title: "fa-solid fa-life-ring",
            searchTerms: []
        }, {
            title: "fa-regular fa-life-ring",
            searchTerms: []
        }, {
            title: "fa-solid fa-lightbulb",
            searchTerms: []
        }, {
            title: "fa-regular fa-lightbulb",
            searchTerms: []
        }, {
            title: "fa-brands fa-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-lines-leaning",
            searchTerms: []
        }, {
            title: "fa-solid fa-link",
            searchTerms: []
        }, {
            title: "fa-solid fa-link-slash",
            searchTerms: []
        }, {
            title: "fa-brands fa-linkedin",
            searchTerms: []
        }, {
            title: "fa-brands fa-linkedin-in",
            searchTerms: []
        }, {
            title: "fa-brands fa-linode",
            searchTerms: []
        }, {
            title: "fa-brands fa-linux",
            searchTerms: []
        }, {
            title: "fa-solid fa-lira-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-list",
            searchTerms: []
        }, {
            title: "fa-solid fa-list-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-list-ol",
            searchTerms: []
        }, {
            title: "fa-solid fa-list-ul",
            searchTerms: []
        }, {
            title: "fa-solid fa-litecoin-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-location-arrow",
            searchTerms: []
        }, {
            title: "fa-solid fa-location-crosshairs",
            searchTerms: []
        }, {
            title: "fa-solid fa-location-dot",
            searchTerms: []
        }, {
            title: "fa-solid fa-location-pin",
            searchTerms: []
        }, {
            title: "fa-solid fa-location-pin-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-lock-open",
            searchTerms: []
        }, {
            title: "fa-solid fa-locust",
            searchTerms: []
        }, {
            title: "fa-solid fa-lungs",
            searchTerms: []
        }, {
            title: "fa-solid fa-lungs-virus",
            searchTerms: []
        }, {
            title: "fa-brands fa-lyft",
            searchTerms: []
        }, {
            title: "fa-solid fa-m",
            searchTerms: []
        }, {
            title: "fa-brands fa-magento",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnet",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-chart",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-location",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-magnifying-glass-plus",
            searchTerms: []
        }, {
            title: "fa-brands fa-mailchimp",
            searchTerms: []
        }, {
            title: "fa-solid fa-manat-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-mandalorian",
            searchTerms: []
        }, {
            title: "fa-solid fa-map",
            searchTerms: []
        }, {
            title: "fa-regular fa-map",
            searchTerms: []
        }, {
            title: "fa-solid fa-map-location",
            searchTerms: []
        }, {
            title: "fa-solid fa-map-location-dot",
            searchTerms: []
        }, {
            title: "fa-solid fa-map-pin",
            searchTerms: []
        }, {
            title: "fa-brands fa-markdown",
            searchTerms: []
        }, {
            title: "fa-solid fa-marker",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-and-venus",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-and-venus-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-double",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-stroke-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-mars-stroke-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-martini-glass",
            searchTerms: []
        }, {
            title: "fa-solid fa-martini-glass-citrus",
            searchTerms: []
        }, {
            title: "fa-solid fa-martini-glass-empty",
            searchTerms: []
        }, {
            title: "fa-solid fa-mask",
            searchTerms: []
        }, {
            title: "fa-solid fa-mask-face",
            searchTerms: []
        }, {
            title: "fa-solid fa-mask-ventilator",
            searchTerms: []
        }, {
            title: "fa-solid fa-masks-theater",
            searchTerms: []
        }, {
            title: "fa-brands fa-mastodon",
            searchTerms: []
        }, {
            title: "fa-solid fa-mattress-pillow",
            searchTerms: []
        }, {
            title: "fa-brands fa-maxcdn",
            searchTerms: []
        }, {
            title: "fa-solid fa-maximize",
            searchTerms: []
        }, {
            title: "fa-brands fa-mdb",
            searchTerms: []
        }, {
            title: "fa-solid fa-medal",
            searchTerms: []
        }, {
            title: "fa-brands fa-medapps",
            searchTerms: []
        }, {
            title: "fa-brands fa-medium",
            searchTerms: []
        }, {
            title: "fa-brands fa-medrt",
            searchTerms: []
        }, {
            title: "fa-brands fa-meetup",
            searchTerms: []
        }, {
            title: "fa-brands fa-megaport",
            searchTerms: []
        }, {
            title: "fa-solid fa-memory",
            searchTerms: []
        }, {
            title: "fa-brands fa-mendeley",
            searchTerms: []
        }, {
            title: "fa-solid fa-menorah",
            searchTerms: []
        }, {
            title: "fa-solid fa-mercury",
            searchTerms: []
        }, {
            title: "fa-solid fa-message",
            searchTerms: []
        }, {
            title: "fa-regular fa-message",
            searchTerms: []
        }, {
            title: "fa-brands fa-meta",
            searchTerms: []
        }, {
            title: "fa-solid fa-meteor",
            searchTerms: []
        }, {
            title: "fa-brands fa-microblog",
            searchTerms: []
        }, {
            title: "fa-solid fa-microchip",
            searchTerms: []
        }, {
            title: "fa-solid fa-microphone",
            searchTerms: []
        }, {
            title: "fa-solid fa-microphone-lines",
            searchTerms: []
        }, {
            title: "fa-solid fa-microphone-lines-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-microphone-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-microscope",
            searchTerms: []
        }, {
            title: "fa-brands fa-microsoft",
            searchTerms: []
        }, {
            title: "fa-solid fa-mill-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-minimize",
            searchTerms: []
        }, {
            title: "fa-solid fa-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-mitten",
            searchTerms: []
        }, {
            title: "fa-brands fa-mix",
            searchTerms: []
        }, {
            title: "fa-brands fa-mixcloud",
            searchTerms: []
        }, {
            title: "fa-brands fa-mixer",
            searchTerms: []
        }, {
            title: "fa-brands fa-mizuni",
            searchTerms: []
        }, {
            title: "fa-solid fa-mobile",
            searchTerms: []
        }, {
            title: "fa-solid fa-mobile-button",
            searchTerms: []
        }, {
            title: "fa-solid fa-mobile-retro",
            searchTerms: []
        }, {
            title: "fa-solid fa-mobile-screen",
            searchTerms: []
        }, {
            title: "fa-solid fa-mobile-screen-button",
            searchTerms: []
        }, {
            title: "fa-brands fa-modx",
            searchTerms: []
        }, {
            title: "fa-brands fa-monero",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-1",
            searchTerms: []
        }, {
            title: "fa-regular fa-money-bill-1",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-1-wave",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-transfer",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-trend-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bill-wheat",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-bills",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-money-check-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-monument",
            searchTerms: []
        }, {
            title: "fa-solid fa-moon",
            searchTerms: []
        }, {
            title: "fa-regular fa-moon",
            searchTerms: []
        }, {
            title: "fa-solid fa-mortar-pestle",
            searchTerms: []
        }, {
            title: "fa-solid fa-mosque",
            searchTerms: []
        }, {
            title: "fa-solid fa-mosquito",
            searchTerms: []
        }, {
            title: "fa-solid fa-mosquito-net",
            searchTerms: []
        }, {
            title: "fa-solid fa-motorcycle",
            searchTerms: []
        }, {
            title: "fa-solid fa-mound",
            searchTerms: []
        }, {
            title: "fa-solid fa-mountain",
            searchTerms: []
        }, {
            title: "fa-solid fa-mountain-city",
            searchTerms: []
        }, {
            title: "fa-solid fa-mountain-sun",
            searchTerms: []
        }, {
            title: "fa-solid fa-mug-hot",
            searchTerms: []
        }, {
            title: "fa-solid fa-mug-saucer",
            searchTerms: []
        }, {
            title: "fa-solid fa-music",
            searchTerms: []
        }, {
            title: "fa-solid fa-n",
            searchTerms: []
        }, {
            title: "fa-solid fa-naira-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-napster",
            searchTerms: []
        }, {
            title: "fa-brands fa-neos",
            searchTerms: []
        }, {
            title: "fa-solid fa-network-wired",
            searchTerms: []
        }, {
            title: "fa-solid fa-neuter",
            searchTerms: []
        }, {
            title: "fa-solid fa-newspaper",
            searchTerms: []
        }, {
            title: "fa-regular fa-newspaper",
            searchTerms: []
        }, {
            title: "fa-brands fa-nfc-directional",
            searchTerms: []
        }, {
            title: "fa-brands fa-nfc-symbol",
            searchTerms: []
        }, {
            title: "fa-brands fa-nimblr",
            searchTerms: []
        }, {
            title: "fa-brands fa-node",
            searchTerms: []
        }, {
            title: "fa-brands fa-node-js",
            searchTerms: []
        }, {
            title: "fa-solid fa-not-equal",
            searchTerms: []
        }, {
            title: "fa-solid fa-note-sticky",
            searchTerms: []
        }, {
            title: "fa-regular fa-note-sticky",
            searchTerms: []
        }, {
            title: "fa-solid fa-notes-medical",
            searchTerms: []
        }, {
            title: "fa-brands fa-npm",
            searchTerms: []
        }, {
            title: "fa-brands fa-ns8",
            searchTerms: []
        }, {
            title: "fa-brands fa-nutritionix",
            searchTerms: []
        }, {
            title: "fa-solid fa-o",
            searchTerms: []
        }, {
            title: "fa-solid fa-object-group",
            searchTerms: []
        }, {
            title: "fa-regular fa-object-group",
            searchTerms: []
        }, {
            title: "fa-solid fa-object-ungroup",
            searchTerms: []
        }, {
            title: "fa-regular fa-object-ungroup",
            searchTerms: []
        }, {
            title: "fa-brands fa-octopus-deploy",
            searchTerms: []
        }, {
            title: "fa-brands fa-odnoklassniki",
            searchTerms: []
        }, {
            title: "fa-solid fa-oil-can",
            searchTerms: []
        }, {
            title: "fa-solid fa-oil-well",
            searchTerms: []
        }, {
            title: "fa-brands fa-old-republic",
            searchTerms: []
        }, {
            title: "fa-solid fa-om",
            searchTerms: []
        }, {
            title: "fa-brands fa-opencart",
            searchTerms: []
        }, {
            title: "fa-brands fa-openid",
            searchTerms: []
        }, {
            title: "fa-brands fa-opera",
            searchTerms: []
        }, {
            title: "fa-brands fa-optin-monster",
            searchTerms: []
        }, {
            title: "fa-brands fa-orcid",
            searchTerms: []
        }, {
            title: "fa-brands fa-osi",
            searchTerms: []
        }, {
            title: "fa-solid fa-otter",
            searchTerms: []
        }, {
            title: "fa-solid fa-outdent",
            searchTerms: []
        }, {
            title: "fa-solid fa-p",
            searchTerms: []
        }, {
            title: "fa-brands fa-padlet",
            searchTerms: []
        }, {
            title: "fa-brands fa-page4",
            searchTerms: []
        }, {
            title: "fa-brands fa-pagelines",
            searchTerms: []
        }, {
            title: "fa-solid fa-pager",
            searchTerms: []
        }, {
            title: "fa-solid fa-paint-roller",
            searchTerms: []
        }, {
            title: "fa-solid fa-paintbrush",
            searchTerms: []
        }, {
            title: "fa-solid fa-palette",
            searchTerms: []
        }, {
            title: "fa-brands fa-palfed",
            searchTerms: []
        }, {
            title: "fa-solid fa-pallet",
            searchTerms: []
        }, {
            title: "fa-solid fa-panorama",
            searchTerms: []
        }, {
            title: "fa-solid fa-paper-plane",
            searchTerms: []
        }, {
            title: "fa-regular fa-paper-plane",
            searchTerms: []
        }, {
            title: "fa-solid fa-paperclip",
            searchTerms: []
        }, {
            title: "fa-solid fa-parachute-box",
            searchTerms: []
        }, {
            title: "fa-solid fa-paragraph",
            searchTerms: []
        }, {
            title: "fa-solid fa-passport",
            searchTerms: []
        }, {
            title: "fa-solid fa-paste",
            searchTerms: []
        }, {
            title: "fa-regular fa-paste",
            searchTerms: []
        }, {
            title: "fa-brands fa-patreon",
            searchTerms: []
        }, {
            title: "fa-solid fa-pause",
            searchTerms: []
        }, {
            title: "fa-solid fa-paw",
            searchTerms: []
        }, {
            title: "fa-brands fa-paypal",
            searchTerms: []
        }, {
            title: "fa-solid fa-peace",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen-clip",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen-fancy",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen-nib",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen-ruler",
            searchTerms: []
        }, {
            title: "fa-solid fa-pen-to-square",
            searchTerms: []
        }, {
            title: "fa-regular fa-pen-to-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-pencil",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-arrows",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-carry-box",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-group",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-pulling",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-robbery",
            searchTerms: []
        }, {
            title: "fa-solid fa-people-roof",
            searchTerms: []
        }, {
            title: "fa-solid fa-pepper-hot",
            searchTerms: []
        }, {
            title: "fa-brands fa-perbyte",
            searchTerms: []
        }, {
            title: "fa-solid fa-percent",
            searchTerms: []
        }, {
            title: "fa-brands fa-periscope",
            searchTerms: []
        }, {
            title: "fa-solid fa-person",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-arrow-down-to-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-arrow-up-from-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-biking",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-booth",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-breastfeeding",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-cane",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-chalkboard",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-question",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-digging",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-dots-from-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-dress",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-dress-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-drowning",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-falling",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-falling-burst",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-half-dress",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-harassing",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-hiking",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-military-pointing",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-military-rifle",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-military-to-person",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-praying",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-pregnant",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-rays",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-rifle",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-running",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-shelter",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-skating",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-skiing",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-skiing-nordic",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-snowboarding",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-swimming",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-through-window",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking-arrow-loop-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking-dashed-line-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking-luggage",
            searchTerms: []
        }, {
            title: "fa-solid fa-person-walking-with-cane",
            searchTerms: []
        }, {
            title: "fa-solid fa-peseta-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-peso-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-phabricator",
            searchTerms: []
        }, {
            title: "fa-brands fa-phoenix-framework",
            searchTerms: []
        }, {
            title: "fa-brands fa-phoenix-squadron",
            searchTerms: []
        }, {
            title: "fa-solid fa-phone",
            searchTerms: []
        }, {
            title: "fa-solid fa-phone-flip",
            searchTerms: []
        }, {
            title: "fa-solid fa-phone-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-phone-volume",
            searchTerms: []
        }, {
            title: "fa-solid fa-photo-film",
            searchTerms: []
        }, {
            title: "fa-brands fa-php",
            searchTerms: []
        }, {
            title: "fa-brands fa-pied-piper",
            searchTerms: []
        }, {
            title: "fa-brands fa-pied-piper-alt",
            searchTerms: []
        }, {
            title: "fa-brands fa-pied-piper-hat",
            searchTerms: []
        }, {
            title: "fa-brands fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fa-solid fa-piggy-bank",
            searchTerms: []
        }, {
            title: "fa-solid fa-pills",
            searchTerms: []
        }, {
            title: "fa-brands fa-pinterest",
            searchTerms: []
        }, {
            title: "fa-brands fa-pinterest-p",
            searchTerms: []
        }, {
            title: "fa-brands fa-pix",
            searchTerms: []
        }, {
            title: "fa-solid fa-pizza-slice",
            searchTerms: []
        }, {
            title: "fa-solid fa-place-of-worship",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-arrival",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-departure",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-plane-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-plant-wilt",
            searchTerms: []
        }, {
            title: "fa-solid fa-plate-wheat",
            searchTerms: []
        }, {
            title: "fa-solid fa-play",
            searchTerms: []
        }, {
            title: "fa-brands fa-playstation",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-bolt",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-plug-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-plus-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-podcast",
            searchTerms: []
        }, {
            title: "fa-solid fa-poo",
            searchTerms: []
        }, {
            title: "fa-solid fa-poo-storm",
            searchTerms: []
        }, {
            title: "fa-solid fa-poop",
            searchTerms: []
        }, {
            title: "fa-solid fa-power-off",
            searchTerms: []
        }, {
            title: "fa-solid fa-prescription",
            searchTerms: []
        }, {
            title: "fa-solid fa-prescription-bottle",
            searchTerms: []
        }, {
            title: "fa-solid fa-prescription-bottle-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-print",
            searchTerms: []
        }, {
            title: "fa-brands fa-product-hunt",
            searchTerms: []
        }, {
            title: "fa-solid fa-pump-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-pump-soap",
            searchTerms: []
        }, {
            title: "fa-brands fa-pushed",
            searchTerms: []
        }, {
            title: "fa-solid fa-puzzle-piece",
            searchTerms: []
        }, {
            title: "fa-brands fa-python",
            searchTerms: []
        }, {
            title: "fa-solid fa-q",
            searchTerms: []
        }, {
            title: "fa-brands fa-qq",
            searchTerms: []
        }, {
            title: "fa-solid fa-qrcode",
            searchTerms: []
        }, {
            title: "fa-solid fa-question",
            searchTerms: []
        }, {
            title: "fa-brands fa-quinscape",
            searchTerms: []
        }, {
            title: "fa-brands fa-quora",
            searchTerms: []
        }, {
            title: "fa-solid fa-quote-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-quote-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-r",
            searchTerms: []
        }, {
            title: "fa-brands fa-r-project",
            searchTerms: []
        }, {
            title: "fa-solid fa-radiation",
            searchTerms: []
        }, {
            title: "fa-solid fa-radio",
            searchTerms: []
        }, {
            title: "fa-solid fa-rainbow",
            searchTerms: []
        }, {
            title: "fa-solid fa-ranking-star",
            searchTerms: []
        }, {
            title: "fa-brands fa-raspberry-pi",
            searchTerms: []
        }, {
            title: "fa-brands fa-ravelry",
            searchTerms: []
        }, {
            title: "fa-brands fa-react",
            searchTerms: []
        }, {
            title: "fa-brands fa-reacteurope",
            searchTerms: []
        }, {
            title: "fa-brands fa-readme",
            searchTerms: []
        }, {
            title: "fa-brands fa-rebel",
            searchTerms: []
        }, {
            title: "fa-solid fa-receipt",
            searchTerms: []
        }, {
            title: "fa-solid fa-record-vinyl",
            searchTerms: []
        }, {
            title: "fa-solid fa-rectangle-ad",
            searchTerms: []
        }, {
            title: "fa-solid fa-rectangle-list",
            searchTerms: []
        }, {
            title: "fa-regular fa-rectangle-list",
            searchTerms: []
        }, {
            title: "fa-solid fa-rectangle-xmark",
            searchTerms: []
        }, {
            title: "fa-regular fa-rectangle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-recycle",
            searchTerms: []
        }, {
            title: "fa-brands fa-red-river",
            searchTerms: []
        }, {
            title: "fa-brands fa-reddit",
            searchTerms: []
        }, {
            title: "fa-brands fa-reddit-alien",
            searchTerms: []
        }, {
            title: "fa-brands fa-redhat",
            searchTerms: []
        }, {
            title: "fa-solid fa-registered",
            searchTerms: []
        }, {
            title: "fa-regular fa-registered",
            searchTerms: []
        }, {
            title: "fa-brands fa-renren",
            searchTerms: []
        }, {
            title: "fa-solid fa-repeat",
            searchTerms: []
        }, {
            title: "fa-solid fa-reply",
            searchTerms: []
        }, {
            title: "fa-solid fa-reply-all",
            searchTerms: []
        }, {
            title: "fa-brands fa-replyd",
            searchTerms: []
        }, {
            title: "fa-solid fa-republican",
            searchTerms: []
        }, {
            title: "fa-brands fa-researchgate",
            searchTerms: []
        }, {
            title: "fa-brands fa-resolving",
            searchTerms: []
        }, {
            title: "fa-solid fa-restroom",
            searchTerms: []
        }, {
            title: "fa-solid fa-retweet",
            searchTerms: []
        }, {
            title: "fa-brands fa-rev",
            searchTerms: []
        }, {
            title: "fa-solid fa-ribbon",
            searchTerms: []
        }, {
            title: "fa-solid fa-right-from-bracket",
            searchTerms: []
        }, {
            title: "fa-solid fa-right-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-right-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-right-to-bracket",
            searchTerms: []
        }, {
            title: "fa-solid fa-ring",
            searchTerms: []
        }, {
            title: "fa-solid fa-road",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-barrier",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-bridge",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-road-spikes",
            searchTerms: []
        }, {
            title: "fa-solid fa-robot",
            searchTerms: []
        }, {
            title: "fa-solid fa-rocket",
            searchTerms: []
        }, {
            title: "fa-brands fa-rocketchat",
            searchTerms: []
        }, {
            title: "fa-brands fa-rockrms",
            searchTerms: []
        }, {
            title: "fa-solid fa-rotate",
            searchTerms: []
        }, {
            title: "fa-solid fa-rotate-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-rotate-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-route",
            searchTerms: []
        }, {
            title: "fa-solid fa-rss",
            searchTerms: []
        }, {
            title: "fa-solid fa-ruble-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-rug",
            searchTerms: []
        }, {
            title: "fa-solid fa-ruler",
            searchTerms: []
        }, {
            title: "fa-solid fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fa-solid fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fa-solid fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "fa-solid fa-rupee-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-rupiah-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-rust",
            searchTerms: []
        }, {
            title: "fa-solid fa-s",
            searchTerms: []
        }, {
            title: "fa-solid fa-sack-dollar",
            searchTerms: []
        }, {
            title: "fa-solid fa-sack-xmark",
            searchTerms: []
        }, {
            title: "fa-brands fa-safari",
            searchTerms: []
        }, {
            title: "fa-solid fa-sailboat",
            searchTerms: []
        }, {
            title: "fa-brands fa-salesforce",
            searchTerms: []
        }, {
            title: "fa-brands fa-sass",
            searchTerms: []
        }, {
            title: "fa-solid fa-satellite",
            searchTerms: []
        }, {
            title: "fa-solid fa-satellite-dish",
            searchTerms: []
        }, {
            title: "fa-solid fa-scale-balanced",
            searchTerms: []
        }, {
            title: "fa-solid fa-scale-unbalanced",
            searchTerms: []
        }, {
            title: "fa-solid fa-scale-unbalanced-flip",
            searchTerms: []
        }, {
            title: "fa-brands fa-schlix",
            searchTerms: []
        }, {
            title: "fa-solid fa-school",
            searchTerms: []
        }, {
            title: "fa-solid fa-school-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-school-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-school-circle-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-school-flag",
            searchTerms: []
        }, {
            title: "fa-solid fa-school-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-scissors",
            searchTerms: []
        }, {
            title: "fa-brands fa-screenpal",
            searchTerms: []
        }, {
            title: "fa-solid fa-screwdriver",
            searchTerms: []
        }, {
            title: "fa-solid fa-screwdriver-wrench",
            searchTerms: []
        }, {
            title: "fa-brands fa-scribd",
            searchTerms: []
        }, {
            title: "fa-solid fa-scroll",
            searchTerms: []
        }, {
            title: "fa-solid fa-scroll-torah",
            searchTerms: []
        }, {
            title: "fa-solid fa-sd-card",
            searchTerms: []
        }, {
            title: "fa-brands fa-searchengin",
            searchTerms: []
        }, {
            title: "fa-solid fa-section",
            searchTerms: []
        }, {
            title: "fa-solid fa-seedling",
            searchTerms: []
        }, {
            title: "fa-brands fa-sellcast",
            searchTerms: []
        }, {
            title: "fa-brands fa-sellsy",
            searchTerms: []
        }, {
            title: "fa-solid fa-server",
            searchTerms: []
        }, {
            title: "fa-brands fa-servicestack",
            searchTerms: []
        }, {
            title: "fa-solid fa-shapes",
            searchTerms: []
        }, {
            title: "fa-solid fa-share",
            searchTerms: []
        }, {
            title: "fa-solid fa-share-from-square",
            searchTerms: []
        }, {
            title: "fa-regular fa-share-from-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-share-nodes",
            searchTerms: []
        }, {
            title: "fa-solid fa-sheet-plastic",
            searchTerms: []
        }, {
            title: "fa-solid fa-shekel-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield-cat",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield-dog",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield-halved",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield-heart",
            searchTerms: []
        }, {
            title: "fa-solid fa-shield-virus",
            searchTerms: []
        }, {
            title: "fa-solid fa-ship",
            searchTerms: []
        }, {
            title: "fa-solid fa-shirt",
            searchTerms: []
        }, {
            title: "fa-brands fa-shirtsinbulk",
            searchTerms: []
        }, {
            title: "fa-solid fa-shoe-prints",
            searchTerms: []
        }, {
            title: "fa-solid fa-shop",
            searchTerms: []
        }, {
            title: "fa-solid fa-shop-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-shop-slash",
            searchTerms: []
        }, {
            title: "fa-brands fa-shopify",
            searchTerms: []
        }, {
            title: "fa-brands fa-shopware",
            searchTerms: []
        }, {
            title: "fa-solid fa-shower",
            searchTerms: []
        }, {
            title: "fa-solid fa-shrimp",
            searchTerms: []
        }, {
            title: "fa-solid fa-shuffle",
            searchTerms: []
        }, {
            title: "fa-solid fa-shuttle-space",
            searchTerms: []
        }, {
            title: "fa-solid fa-sign-hanging",
            searchTerms: []
        }, {
            title: "fa-solid fa-signal",
            searchTerms: []
        }, {
            title: "fa-solid fa-signature",
            searchTerms: []
        }, {
            title: "fa-solid fa-signs-post",
            searchTerms: []
        }, {
            title: "fa-solid fa-sim-card",
            searchTerms: []
        }, {
            title: "fa-brands fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fa-solid fa-sink",
            searchTerms: []
        }, {
            title: "fa-brands fa-sistrix",
            searchTerms: []
        }, {
            title: "fa-solid fa-sitemap",
            searchTerms: []
        }, {
            title: "fa-brands fa-sith",
            searchTerms: []
        }, {
            title: "fa-brands fa-sitrox",
            searchTerms: []
        }, {
            title: "fa-brands fa-sketch",
            searchTerms: []
        }, {
            title: "fa-solid fa-skull",
            searchTerms: []
        }, {
            title: "fa-solid fa-skull-crossbones",
            searchTerms: []
        }, {
            title: "fa-brands fa-skyatlas",
            searchTerms: []
        }, {
            title: "fa-brands fa-skype",
            searchTerms: []
        }, {
            title: "fa-brands fa-slack",
            searchTerms: []
        }, {
            title: "fa-solid fa-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-sleigh",
            searchTerms: []
        }, {
            title: "fa-solid fa-sliders",
            searchTerms: []
        }, {
            title: "fa-brands fa-slideshare",
            searchTerms: []
        }, {
            title: "fa-solid fa-smog",
            searchTerms: []
        }, {
            title: "fa-solid fa-smoking",
            searchTerms: []
        }, {
            title: "fa-brands fa-snapchat",
            searchTerms: []
        }, {
            title: "fa-solid fa-snowflake",
            searchTerms: []
        }, {
            title: "fa-regular fa-snowflake",
            searchTerms: []
        }, {
            title: "fa-solid fa-snowman",
            searchTerms: []
        }, {
            title: "fa-solid fa-snowplow",
            searchTerms: []
        }, {
            title: "fa-solid fa-soap",
            searchTerms: []
        }, {
            title: "fa-solid fa-socks",
            searchTerms: []
        }, {
            title: "fa-solid fa-solar-panel",
            searchTerms: []
        }, {
            title: "fa-solid fa-sort",
            searchTerms: []
        }, {
            title: "fa-solid fa-sort-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-sort-up",
            searchTerms: []
        }, {
            title: "fa-brands fa-soundcloud",
            searchTerms: []
        }, {
            title: "fa-brands fa-sourcetree",
            searchTerms: []
        }, {
            title: "fa-solid fa-spa",
            searchTerms: []
        }, {
            title: "fa-brands fa-space-awesome",
            searchTerms: []
        }, {
            title: "fa-solid fa-spaghetti-monster-flying",
            searchTerms: []
        }, {
            title: "fa-brands fa-speakap",
            searchTerms: []
        }, {
            title: "fa-brands fa-speaker-deck",
            searchTerms: []
        }, {
            title: "fa-solid fa-spell-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-spider",
            searchTerms: []
        }, {
            title: "fa-solid fa-spinner",
            searchTerms: []
        }, {
            title: "fa-solid fa-splotch",
            searchTerms: []
        }, {
            title: "fa-solid fa-spoon",
            searchTerms: []
        }, {
            title: "fa-brands fa-spotify",
            searchTerms: []
        }, {
            title: "fa-solid fa-spray-can",
            searchTerms: []
        }, {
            title: "fa-solid fa-spray-can-sparkles",
            searchTerms: []
        }, {
            title: "fa-solid fa-square",
            searchTerms: []
        }, {
            title: "fa-regular fa-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-arrow-up-right",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-behance",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-caret-down",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-caret-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-caret-left",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-caret-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-caret-right",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-caret-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-caret-up",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-caret-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-check",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-check",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-dribbble",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-envelope",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-facebook",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-font-awesome",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-font-awesome-stroke",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-full",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-full",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-git",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-github",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-gitlab",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-google-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-h",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-hacker-news",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-instagram",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-js",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-lastfm",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-minus",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-nfi",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-odnoklassniki",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-parking",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-pen",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-person-confined",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-phone",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-phone-flip",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-pied-piper",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-pinterest",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-plus",
            searchTerms: []
        }, {
            title: "fa-regular fa-square-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-poll-horizontal",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-poll-vertical",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-reddit",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-root-variable",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-rss",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-share-nodes",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-snapchat",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-steam",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-tumblr",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-twitter",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-up-right",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-viadeo",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-vimeo",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-virus",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-whatsapp",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-xing",
            searchTerms: []
        }, {
            title: "fa-solid fa-square-xmark",
            searchTerms: []
        }, {
            title: "fa-brands fa-square-youtube",
            searchTerms: []
        }, {
            title: "fa-brands fa-squarespace",
            searchTerms: []
        }, {
            title: "fa-brands fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fa-brands fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fa-brands fa-stackpath",
            searchTerms: []
        }, {
            title: "fa-solid fa-staff-snake",
            searchTerms: []
        }, {
            title: "fa-solid fa-stairs",
            searchTerms: []
        }, {
            title: "fa-solid fa-stamp",
            searchTerms: []
        }, {
            title: "fa-solid fa-stapler",
            searchTerms: []
        }, {
            title: "fa-solid fa-star",
            searchTerms: []
        }, {
            title: "fa-regular fa-star",
            searchTerms: []
        }, {
            title: "fa-solid fa-star-and-crescent",
            searchTerms: []
        }, {
            title: "fa-solid fa-star-half",
            searchTerms: []
        }, {
            title: "fa-regular fa-star-half",
            searchTerms: []
        }, {
            title: "fa-solid fa-star-half-stroke",
            searchTerms: []
        }, {
            title: "fa-regular fa-star-half-stroke",
            searchTerms: []
        }, {
            title: "fa-solid fa-star-of-david",
            searchTerms: []
        }, {
            title: "fa-solid fa-star-of-life",
            searchTerms: []
        }, {
            title: "fa-brands fa-staylinked",
            searchTerms: []
        }, {
            title: "fa-brands fa-steam",
            searchTerms: []
        }, {
            title: "fa-brands fa-steam-symbol",
            searchTerms: []
        }, {
            title: "fa-solid fa-sterling-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-stethoscope",
            searchTerms: []
        }, {
            title: "fa-brands fa-sticker-mule",
            searchTerms: []
        }, {
            title: "fa-solid fa-stop",
            searchTerms: []
        }, {
            title: "fa-solid fa-stopwatch",
            searchTerms: []
        }, {
            title: "fa-solid fa-stopwatch-20",
            searchTerms: []
        }, {
            title: "fa-solid fa-store",
            searchTerms: []
        }, {
            title: "fa-solid fa-store-slash",
            searchTerms: []
        }, {
            title: "fa-brands fa-strava",
            searchTerms: []
        }, {
            title: "fa-solid fa-street-view",
            searchTerms: []
        }, {
            title: "fa-solid fa-strikethrough",
            searchTerms: []
        }, {
            title: "fa-brands fa-stripe",
            searchTerms: []
        }, {
            title: "fa-brands fa-stripe-s",
            searchTerms: []
        }, {
            title: "fa-solid fa-stroopwafel",
            searchTerms: []
        }, {
            title: "fa-brands fa-studiovinari",
            searchTerms: []
        }, {
            title: "fa-brands fa-stumbleupon",
            searchTerms: []
        }, {
            title: "fa-brands fa-stumbleupon-circle",
            searchTerms: []
        }, {
            title: "fa-solid fa-subscript",
            searchTerms: []
        }, {
            title: "fa-solid fa-suitcase",
            searchTerms: []
        }, {
            title: "fa-solid fa-suitcase-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fa-solid fa-sun",
            searchTerms: []
        }, {
            title: "fa-regular fa-sun",
            searchTerms: []
        }, {
            title: "fa-solid fa-sun-plant-wilt",
            searchTerms: []
        }, {
            title: "fa-brands fa-superpowers",
            searchTerms: []
        }, {
            title: "fa-solid fa-superscript",
            searchTerms: []
        }, {
            title: "fa-brands fa-supple",
            searchTerms: []
        }, {
            title: "fa-brands fa-suse",
            searchTerms: []
        }, {
            title: "fa-solid fa-swatchbook",
            searchTerms: []
        }, {
            title: "fa-brands fa-swift",
            searchTerms: []
        }, {
            title: "fa-brands fa-symfony",
            searchTerms: []
        }, {
            title: "fa-solid fa-synagogue",
            searchTerms: []
        }, {
            title: "fa-solid fa-syringe",
            searchTerms: []
        }, {
            title: "fa-solid fa-t",
            searchTerms: []
        }, {
            title: "fa-solid fa-table",
            searchTerms: []
        }, {
            title: "fa-solid fa-table-cells",
            searchTerms: []
        }, {
            title: "fa-solid fa-table-cells-large",
            searchTerms: []
        }, {
            title: "fa-solid fa-table-columns",
            searchTerms: []
        }, {
            title: "fa-solid fa-table-list",
            searchTerms: []
        }, {
            title: "fa-solid fa-table-tennis-paddle-ball",
            searchTerms: []
        }, {
            title: "fa-solid fa-tablet",
            searchTerms: []
        }, {
            title: "fa-solid fa-tablet-button",
            searchTerms: []
        }, {
            title: "fa-solid fa-tablet-screen-button",
            searchTerms: []
        }, {
            title: "fa-solid fa-tablets",
            searchTerms: []
        }, {
            title: "fa-solid fa-tachograph-digital",
            searchTerms: []
        }, {
            title: "fa-solid fa-tag",
            searchTerms: []
        }, {
            title: "fa-solid fa-tags",
            searchTerms: []
        }, {
            title: "fa-solid fa-tape",
            searchTerms: []
        }, {
            title: "fa-solid fa-tarp",
            searchTerms: []
        }, {
            title: "fa-solid fa-tarp-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-taxi",
            searchTerms: []
        }, {
            title: "fa-brands fa-teamspeak",
            searchTerms: []
        }, {
            title: "fa-solid fa-teeth",
            searchTerms: []
        }, {
            title: "fa-solid fa-teeth-open",
            searchTerms: []
        }, {
            title: "fa-brands fa-telegram",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-arrow-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-empty",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-full",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-half",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-high",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-low",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-quarter",
            searchTerms: []
        }, {
            title: "fa-solid fa-temperature-three-quarters",
            searchTerms: []
        }, {
            title: "fa-brands fa-tencent-weibo",
            searchTerms: []
        }, {
            title: "fa-solid fa-tenge-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-tent",
            searchTerms: []
        }, {
            title: "fa-solid fa-tent-arrow-down-to-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-tent-arrow-left-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-tent-arrow-turn-left",
            searchTerms: []
        }, {
            title: "fa-solid fa-tent-arrows-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-tents",
            searchTerms: []
        }, {
            title: "fa-solid fa-terminal",
            searchTerms: []
        }, {
            title: "fa-solid fa-text-height",
            searchTerms: []
        }, {
            title: "fa-solid fa-text-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-text-width",
            searchTerms: []
        }, {
            title: "fa-brands fa-the-red-yeti",
            searchTerms: []
        }, {
            title: "fa-brands fa-themeco",
            searchTerms: []
        }, {
            title: "fa-brands fa-themeisle",
            searchTerms: []
        }, {
            title: "fa-solid fa-thermometer",
            searchTerms: []
        }, {
            title: "fa-brands fa-think-peaks",
            searchTerms: []
        }, {
            title: "fa-solid fa-thumbs-down",
            searchTerms: []
        }, {
            title: "fa-regular fa-thumbs-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-thumbs-up",
            searchTerms: []
        }, {
            title: "fa-regular fa-thumbs-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-thumbtack",
            searchTerms: []
        }, {
            title: "fa-solid fa-ticket",
            searchTerms: []
        }, {
            title: "fa-solid fa-ticket-simple",
            searchTerms: []
        }, {
            title: "fa-brands fa-tiktok",
            searchTerms: []
        }, {
            title: "fa-solid fa-timeline",
            searchTerms: []
        }, {
            title: "fa-solid fa-toggle-off",
            searchTerms: []
        }, {
            title: "fa-solid fa-toggle-on",
            searchTerms: []
        }, {
            title: "fa-solid fa-toilet",
            searchTerms: []
        }, {
            title: "fa-solid fa-toilet-paper",
            searchTerms: []
        }, {
            title: "fa-solid fa-toilet-paper-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-toilet-portable",
            searchTerms: []
        }, {
            title: "fa-solid fa-toilets-portable",
            searchTerms: []
        }, {
            title: "fa-solid fa-toolbox",
            searchTerms: []
        }, {
            title: "fa-solid fa-tooth",
            searchTerms: []
        }, {
            title: "fa-solid fa-torii-gate",
            searchTerms: []
        }, {
            title: "fa-solid fa-tornado",
            searchTerms: []
        }, {
            title: "fa-solid fa-tower-broadcast",
            searchTerms: []
        }, {
            title: "fa-solid fa-tower-cell",
            searchTerms: []
        }, {
            title: "fa-solid fa-tower-observation",
            searchTerms: []
        }, {
            title: "fa-solid fa-tractor",
            searchTerms: []
        }, {
            title: "fa-brands fa-trade-federation",
            searchTerms: []
        }, {
            title: "fa-solid fa-trademark",
            searchTerms: []
        }, {
            title: "fa-solid fa-traffic-light",
            searchTerms: []
        }, {
            title: "fa-solid fa-trailer",
            searchTerms: []
        }, {
            title: "fa-solid fa-train",
            searchTerms: []
        }, {
            title: "fa-solid fa-train-subway",
            searchTerms: []
        }, {
            title: "fa-solid fa-train-tram",
            searchTerms: []
        }, {
            title: "fa-solid fa-transgender",
            searchTerms: []
        }, {
            title: "fa-solid fa-trash",
            searchTerms: []
        }, {
            title: "fa-solid fa-trash-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-trash-can",
            searchTerms: []
        }, {
            title: "fa-regular fa-trash-can",
            searchTerms: []
        }, {
            title: "fa-solid fa-trash-can-arrow-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-tree",
            searchTerms: []
        }, {
            title: "fa-solid fa-tree-city",
            searchTerms: []
        }, {
            title: "fa-brands fa-trello",
            searchTerms: []
        }, {
            title: "fa-solid fa-triangle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-trophy",
            searchTerms: []
        }, {
            title: "fa-solid fa-trowel",
            searchTerms: []
        }, {
            title: "fa-solid fa-trowel-bricks",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-arrow-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-droplet",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-fast",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-field",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-field-un",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-front",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-medical",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-monster",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-moving",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-pickup",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-plane",
            searchTerms: []
        }, {
            title: "fa-solid fa-truck-ramp-box",
            searchTerms: []
        }, {
            title: "fa-solid fa-tty",
            searchTerms: []
        }, {
            title: "fa-brands fa-tumblr",
            searchTerms: []
        }, {
            title: "fa-solid fa-turkish-lira-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-turn-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-turn-up",
            searchTerms: []
        }, {
            title: "fa-solid fa-tv",
            searchTerms: []
        }, {
            title: "fa-brands fa-twitch",
            searchTerms: []
        }, {
            title: "fa-brands fa-twitter",
            searchTerms: []
        }, {
            title: "fa-brands fa-typo3",
            searchTerms: []
        }, {
            title: "fa-solid fa-u",
            searchTerms: []
        }, {
            title: "fa-brands fa-uber",
            searchTerms: []
        }, {
            title: "fa-brands fa-ubuntu",
            searchTerms: []
        }, {
            title: "fa-brands fa-uikit",
            searchTerms: []
        }, {
            title: "fa-brands fa-umbraco",
            searchTerms: []
        }, {
            title: "fa-solid fa-umbrella",
            searchTerms: []
        }, {
            title: "fa-solid fa-umbrella-beach",
            searchTerms: []
        }, {
            title: "fa-brands fa-uncharted",
            searchTerms: []
        }, {
            title: "fa-solid fa-underline",
            searchTerms: []
        }, {
            title: "fa-brands fa-uniregistry",
            searchTerms: []
        }, {
            title: "fa-brands fa-unity",
            searchTerms: []
        }, {
            title: "fa-solid fa-universal-access",
            searchTerms: []
        }, {
            title: "fa-solid fa-unlock",
            searchTerms: []
        }, {
            title: "fa-solid fa-unlock-keyhole",
            searchTerms: []
        }, {
            title: "fa-brands fa-unsplash",
            searchTerms: []
        }, {
            title: "fa-brands fa-untappd",
            searchTerms: []
        }, {
            title: "fa-solid fa-up-down",
            searchTerms: []
        }, {
            title: "fa-solid fa-up-down-left-right",
            searchTerms: []
        }, {
            title: "fa-solid fa-up-long",
            searchTerms: []
        }, {
            title: "fa-solid fa-up-right-and-down-left-from-center",
            searchTerms: []
        }, {
            title: "fa-solid fa-up-right-from-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-upload",
            searchTerms: []
        }, {
            title: "fa-brands fa-ups",
            searchTerms: []
        }, {
            title: "fa-brands fa-usb",
            searchTerms: []
        }, {
            title: "fa-solid fa-user",
            searchTerms: []
        }, {
            title: "fa-regular fa-user",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-astronaut",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-clock",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-doctor",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-gear",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-graduate",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-group",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-injured",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-large",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-large-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-lock",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-minus",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-ninja",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-nurse",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-pen",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-plus",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-secret",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-shield",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-tag",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-tie",
            searchTerms: []
        }, {
            title: "fa-solid fa-user-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-users",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-between-lines",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-gear",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-line",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-rays",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-rectangle",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-users-viewfinder",
            searchTerms: []
        }, {
            title: "fa-brands fa-usps",
            searchTerms: []
        }, {
            title: "fa-brands fa-ussunnah",
            searchTerms: []
        }, {
            title: "fa-solid fa-utensils",
            searchTerms: []
        }, {
            title: "fa-solid fa-v",
            searchTerms: []
        }, {
            title: "fa-brands fa-vaadin",
            searchTerms: []
        }, {
            title: "fa-solid fa-van-shuttle",
            searchTerms: []
        }, {
            title: "fa-solid fa-vault",
            searchTerms: []
        }, {
            title: "fa-solid fa-vector-square",
            searchTerms: []
        }, {
            title: "fa-solid fa-venus",
            searchTerms: []
        }, {
            title: "fa-solid fa-venus-double",
            searchTerms: []
        }, {
            title: "fa-solid fa-venus-mars",
            searchTerms: []
        }, {
            title: "fa-solid fa-vest",
            searchTerms: []
        }, {
            title: "fa-solid fa-vest-patches",
            searchTerms: []
        }, {
            title: "fa-brands fa-viacoin",
            searchTerms: []
        }, {
            title: "fa-brands fa-viadeo",
            searchTerms: []
        }, {
            title: "fa-solid fa-vial",
            searchTerms: []
        }, {
            title: "fa-solid fa-vial-circle-check",
            searchTerms: []
        }, {
            title: "fa-solid fa-vial-virus",
            searchTerms: []
        }, {
            title: "fa-solid fa-vials",
            searchTerms: []
        }, {
            title: "fa-brands fa-viber",
            searchTerms: []
        }, {
            title: "fa-solid fa-video",
            searchTerms: []
        }, {
            title: "fa-solid fa-video-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-vihara",
            searchTerms: []
        }, {
            title: "fa-brands fa-vimeo",
            searchTerms: []
        }, {
            title: "fa-brands fa-vimeo-v",
            searchTerms: []
        }, {
            title: "fa-brands fa-vine",
            searchTerms: []
        }, {
            title: "fa-solid fa-virus",
            searchTerms: []
        }, {
            title: "fa-solid fa-virus-covid",
            searchTerms: []
        }, {
            title: "fa-solid fa-virus-covid-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-virus-slash",
            searchTerms: []
        }, {
            title: "fa-solid fa-viruses",
            searchTerms: []
        }, {
            title: "fa-brands fa-vk",
            searchTerms: []
        }, {
            title: "fa-brands fa-vnv",
            searchTerms: []
        }, {
            title: "fa-solid fa-voicemail",
            searchTerms: []
        }, {
            title: "fa-solid fa-volcano",
            searchTerms: []
        }, {
            title: "fa-solid fa-volleyball",
            searchTerms: []
        }, {
            title: "fa-solid fa-volume-high",
            searchTerms: []
        }, {
            title: "fa-solid fa-volume-low",
            searchTerms: []
        }, {
            title: "fa-solid fa-volume-off",
            searchTerms: []
        }, {
            title: "fa-solid fa-volume-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-vr-cardboard",
            searchTerms: []
        }, {
            title: "fa-brands fa-vuejs",
            searchTerms: []
        }, {
            title: "fa-solid fa-w",
            searchTerms: []
        }, {
            title: "fa-solid fa-walkie-talkie",
            searchTerms: []
        }, {
            title: "fa-solid fa-wallet",
            searchTerms: []
        }, {
            title: "fa-solid fa-wand-magic",
            searchTerms: []
        }, {
            title: "fa-solid fa-wand-magic-sparkles",
            searchTerms: []
        }, {
            title: "fa-solid fa-wand-sparkles",
            searchTerms: []
        }, {
            title: "fa-solid fa-warehouse",
            searchTerms: []
        }, {
            title: "fa-brands fa-watchman-monitoring",
            searchTerms: []
        }, {
            title: "fa-solid fa-water",
            searchTerms: []
        }, {
            title: "fa-solid fa-water-ladder",
            searchTerms: []
        }, {
            title: "fa-solid fa-wave-square",
            searchTerms: []
        }, {
            title: "fa-brands fa-waze",
            searchTerms: []
        }, {
            title: "fa-brands fa-weebly",
            searchTerms: []
        }, {
            title: "fa-brands fa-weibo",
            searchTerms: []
        }, {
            title: "fa-solid fa-weight-hanging",
            searchTerms: []
        }, {
            title: "fa-solid fa-weight-scale",
            searchTerms: []
        }, {
            title: "fa-brands fa-weixin",
            searchTerms: []
        }, {
            title: "fa-brands fa-whatsapp",
            searchTerms: []
        }, {
            title: "fa-solid fa-wheat-awn",
            searchTerms: []
        }, {
            title: "fa-solid fa-wheat-awn-circle-exclamation",
            searchTerms: []
        }, {
            title: "fa-solid fa-wheelchair",
            searchTerms: []
        }, {
            title: "fa-solid fa-wheelchair-move",
            searchTerms: []
        }, {
            title: "fa-solid fa-whiskey-glass",
            searchTerms: []
        }, {
            title: "fa-brands fa-whmcs",
            searchTerms: []
        }, {
            title: "fa-solid fa-wifi",
            searchTerms: []
        }, {
            title: "fa-brands fa-wikipedia-w",
            searchTerms: []
        }, {
            title: "fa-solid fa-wind",
            searchTerms: []
        }, {
            title: "fa-solid fa-window-maximize",
            searchTerms: []
        }, {
            title: "fa-regular fa-window-maximize",
            searchTerms: []
        }, {
            title: "fa-solid fa-window-minimize",
            searchTerms: []
        }, {
            title: "fa-regular fa-window-minimize",
            searchTerms: []
        }, {
            title: "fa-solid fa-window-restore",
            searchTerms: []
        }, {
            title: "fa-regular fa-window-restore",
            searchTerms: []
        }, {
            title: "fa-brands fa-windows",
            searchTerms: []
        }, {
            title: "fa-solid fa-wine-bottle",
            searchTerms: []
        }, {
            title: "fa-solid fa-wine-glass",
            searchTerms: []
        }, {
            title: "fa-solid fa-wine-glass-empty",
            searchTerms: []
        }, {
            title: "fa-brands fa-wirsindhandwerk",
            searchTerms: []
        }, {
            title: "fa-brands fa-wix",
            searchTerms: []
        }, {
            title: "fa-brands fa-wizards-of-the-coast",
            searchTerms: []
        }, {
            title: "fa-brands fa-wodu",
            searchTerms: []
        }, {
            title: "fa-brands fa-wolf-pack-battalion",
            searchTerms: []
        }, {
            title: "fa-solid fa-won-sign",
            searchTerms: []
        }, {
            title: "fa-brands fa-wordpress",
            searchTerms: []
        }, {
            title: "fa-brands fa-wordpress-simple",
            searchTerms: []
        }, {
            title: "fa-solid fa-worm",
            searchTerms: []
        }, {
            title: "fa-brands fa-wpbeginner",
            searchTerms: []
        }, {
            title: "fa-brands fa-wpexplorer",
            searchTerms: []
        }, {
            title: "fa-brands fa-wpforms",
            searchTerms: []
        }, {
            title: "fa-brands fa-wpressr",
            searchTerms: []
        }, {
            title: "fa-solid fa-wrench",
            searchTerms: []
        }, {
            title: "fa-solid fa-x",
            searchTerms: []
        }, {
            title: "fa-solid fa-x-ray",
            searchTerms: []
        }, {
            title: "fa-brands fa-xbox",
            searchTerms: []
        }, {
            title: "fa-brands fa-xing",
            searchTerms: []
        }, {
            title: "fa-solid fa-xmark",
            searchTerms: []
        }, {
            title: "fa-solid fa-xmarks-lines",
            searchTerms: []
        }, {
            title: "fa-solid fa-y",
            searchTerms: []
        }, {
            title: "fa-brands fa-y-combinator",
            searchTerms: []
        }, {
            title: "fa-brands fa-yahoo",
            searchTerms: []
        }, {
            title: "fa-brands fa-yammer",
            searchTerms: []
        }, {
            title: "fa-brands fa-yandex",
            searchTerms: []
        }, {
            title: "fa-brands fa-yandex-international",
            searchTerms: []
        }, {
            title: "fa-brands fa-yarn",
            searchTerms: []
        }, {
            title: "fa-brands fa-yelp",
            searchTerms: []
        }, {
            title: "fa-solid fa-yen-sign",
            searchTerms: []
        }, {
            title: "fa-solid fa-yin-yang",
            searchTerms: []
        }, {
            title: "fa-brands fa-yoast",
            searchTerms: []
        }, {
            title: "fa-brands fa-youtube",
            searchTerms: []
        }, {
            title: "fa-solid fa-z",
            searchTerms: []
        }, {
            title: "fa-brands fa-zhihu",
            searchTerms: []
        } ]
    });
});