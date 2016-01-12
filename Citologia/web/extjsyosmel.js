Ext.util.DelayedTask = function (fn, scope, args, cancelOnDelay) {
    var me = this,
            delay,
            call = function () {
                clearInterval(me.id);
                me.id = null;
                fn.apply(scope, args || []);
                Ext.EventManager.idleEvent.fire();
            };
    cancelOnDelay = typeof cancelOnDelay === 'boolean' ? cancelOnDelay : true;
    me.id = null;
    me.delay = function (newDelay, newFn, newScope, newArgs) {
        if (cancelOnDelay) {
            me.cancel();
        }
        if (typeof newDelay === 'number') {
            delay = newDelay;
        }
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        if (!me.id) {
            me.id = setInterval(call, delay);
        }
    };
    me.cancel = function () {
        if (me.id) {
            clearInterval(me.id);
            me.id = null;
        }
    };
};
Ext.define('Ext.util.Event', function () {
    var arraySlice = Array.prototype.slice,
            arrayInsert = Ext.Array.insert,
            toArray = Ext.Array.toArray,
            DelayedTask = Ext.util.DelayedTask;

    return {
        requires: 'Ext.util.DelayedTask',
        isEvent: true,
        suspended: 0,
        noOptions: {},
        constructor: function (observable, name) {
            this.name = name;
            this.observable = observable;
            this.listeners = [];
        },
        addListener: function (fn, scope, options) {
            var me = this,
                    listeners, listener, priority, isNegativePriority, highestNegativePriorityIndex,
                    hasNegativePriorityIndex, length, index, i, listenerPriority;

            scope = scope || me.observable;
            if (!fn) {
                Ext.Error.raise({
                    sourceClass: Ext.getClassName(this.observable),
                    sourceMethod: "addListener",
                    msg: "The specified callback function is undefined"
                });
            }
            if (!me.isListening(fn, scope)) {
                listener = me.createListener(fn, scope, options);
                if (me.firing) {
                    me.listeners = me.listeners.slice(0);
                }
                listeners = me.listeners;
                index = length = listeners.length;
                priority = options && options.priority;
                highestNegativePriorityIndex = me._highestNegativePriorityIndex;
                hasNegativePriorityIndex = (highestNegativePriorityIndex !== undefined);
                if (priority) {
                    isNegativePriority = (priority < 0);
                    if (!isNegativePriority || hasNegativePriorityIndex) {
                        for (i = (isNegativePriority ? highestNegativePriorityIndex : 0); i < length; i++) {
                            listenerPriority = listeners[i].o ? listeners[i].o.priority || 0 : 0;
                            if (listenerPriority < priority) {
                                index = i;
                                break;
                            }
                        }
                    } else {
                        me._highestNegativePriorityIndex = index;
                    }
                } else if (hasNegativePriorityIndex) {
                    index = highestNegativePriorityIndex;
                }

                if (!isNegativePriority && index <= highestNegativePriorityIndex) {
                    me._highestNegativePriorityIndex++;
                }
                if (index === length) {
                    me.listeners[length] = listener;
                } else {
                    arrayInsert(me.listeners, index, [listener]);
                }
            }
        },
        createListener: function (fn, scope, o) {
            scope = scope || this.observable;

            var me = this,
                    listener = {
                        fn: fn,
                        scope: scope,
                        ev: me
                    },
            handler = fn;
            if (o) {
                listener.o = o;
                if (o.single) {
                    handler = me.createSingle(handler, listener, o, scope);
                }
                if (o.target) {
                    handler = me.createTargeted(handler, listener, o, scope);
                }
                if (o.delay) {
                    handler = me.createDelayed(handler, listener, o, scope);
                }
                if (o.buffer) {
                    handler = me.createBuffered(handler, listener, o, scope);
                }
            }

            listener.fireFn = handler;
            return listener;
        },
        findListener: function (fn, scope) {
            var listeners = this.listeners,
                    i = listeners.length,
                    listener,
                    s;

            while (i--) {
                listener = listeners[i];
                if (listener) {
                    s = listener.scope;
                    if (listener.fn === fn && (s === (scope || this.observable))) {
                        return i;
                    }
                }
            }

            return -1;
        },
        isListening: function (fn, scope) {
            return this.findListener(fn, scope) !== -1;
        },
        removeListener: function (fn, scope) {
            var me = this,
                    index,
                    listener,
                    highestNegativePriorityIndex,
                    k;
            index = me.findListener(fn, scope);
            if (index !== -1) {
                listener = me.listeners[index];
                highestNegativePriorityIndex = me._highestNegativePriorityIndex;

                if (me.firing) {
                    me.listeners = me.listeners.slice(0);
                }
                if (listener.task) {
                    listener.task.cancel();
                    delete listener.task;
                }
                k = listener.tasks && listener.tasks.length;
                if (k) {
                    while (k--) {
                        listener.tasks[k].cancel();
                    }
                    delete listener.tasks;
                }
                me.listeners.splice(index, 1);
                if (highestNegativePriorityIndex) {
                    if (index < highestNegativePriorityIndex) {
                        me._highestNegativePriorityIndex--;
                    } else if (index === highestNegativePriorityIndex && index === me.listeners.length) {
                        delete me._highestNegativePriorityIndex;
                    }
                }
                return true;
            }

            return false;
        },
        clearListeners: function () {
            var listeners = this.listeners,
                    i = listeners.length;

            while (i--) {
                this.removeListener(listeners[i].fn, listeners[i].scope);
            }
        },
        suspend: function () {
            ++this.suspended;
        },
        resume: function () {
            if (this.suspended) {
                --this.suspended;
            }
        },
        isSuspended: function () {
            return this.suspended > 0;
        },
        fire: function () {
            var me = this,
                    listeners = me.listeners,
                    count = listeners.length,
                    i,
                    args,
                    listener,
                    len;

            if (!me.suspended && count > 0) {
                me.firing = true;
                args = arguments.length ? arraySlice.call(arguments, 0) : [];
                len = args.length;
                for (i = 0; i < count; i++) {
                    listener = listeners[i];
                    if (listener.o) {
                        args[len] = listener.o;
                    }
                    if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                        return (me.firing = false);
                    }
                }
            }
            me.firing = false;
            return true;
        },
        createTargeted: function (handler, listener, o, scope) {
            return function () {
                if (o.target === arguments[0]) {
                    handler.apply(scope, arguments);
                }
            };
        },
        createBuffered: function (handler, listener, o, scope) {
            listener.task = new DelayedTask();
            return function () {
                listener.task.delay(o.buffer, handler, scope, toArray(arguments));
            };
        },
        createDelayed: function (handler, listener, o, scope) {
            return function () {
                var task = new DelayedTask();
                if (!listener.tasks) {
                    listener.tasks = [];
                }
                listener.tasks.push(task);
                task.delay(o.delay || 10, handler, scope, toArray(arguments));
            };
        },
        createSingle: function (handler, listener, o, scope) {
            return function () {
                var event = listener.ev;
                if (event.removeListener(listener.fn, scope) && event.observable) {
                    event.observable.hasListeners[event.name]--;
                }
                return handler.apply(scope, arguments);
            };
        }
    };
});
Ext.EventManager = new function () {
    var EventManager = this,
            doc = document,
            win = window,
            supports = Ext.supports,
            escapeRx = /\\/g,
            prefix = Ext.baseCSSPrefix,
            supportsAddEventListener = !Ext.isIE9 && 'addEventListener' in doc,
            readyEvent,
            initExtCss = function () {
                var bd = doc.body || doc.getElementsByTagName('body')[0],
                        cls = [],
                        htmlCls = [],
                        supportsLG = supports.CSS3LinearGradient,
                        supportsBR = supports.CSS3BorderRadius,
                        html;
                if (!Ext.scopeCss) {
                    cls.push(prefix + 'body');
                }

                if (!bd) {
                    return false;
                }

                html = bd.parentNode;

                function add(c) {
                    cls.push(prefix + c);
                }
                if (Ext.isIE && Ext.isIE9m) {
                    add('ie');
                    if (Ext.isIE6) {
                        add('ie6');
                    } else {
                        add('ie7p');

                        if (Ext.isIE7) {
                            add('ie7');
                        } else {
                            add('ie8p');

                            if (Ext.isIE8) {
                                add('ie8');
                            } else {
                                add('ie9p');

                                if (Ext.isIE9) {
                                    add('ie9');
                                }
                            }
                        }
                    }

                    if (Ext.isIE7m) {
                        add('ie7m');
                    }
                    if (Ext.isIE8m) {
                        add('ie8m');
                    }
                    if (Ext.isIE9m) {
                        add('ie9m');
                    }
                    if (Ext.isIE7 || Ext.isIE8) {
                        add('ie78');
                    }
                }

                if (Ext.isIE10) {
                    add('ie10');
                }

                if (Ext.isGecko) {
                    add('gecko');
                    if (Ext.isGecko3) {
                        add('gecko3');
                    }
                    if (Ext.isGecko4) {
                        add('gecko4');
                    }
                    if (Ext.isGecko5) {
                        add('gecko5');
                    }
                }
                if (Ext.isOpera) {
                    add('opera');
                }
                if (Ext.isWebKit) {
                    add('webkit');
                }
                if (Ext.isSafari) {
                    add('safari');
                    if (Ext.isSafari2) {
                        add('safari2');
                    }
                    if (Ext.isSafari3) {
                        add('safari3');
                    }
                    if (Ext.isSafari4) {
                        add('safari4');
                    }
                    if (Ext.isSafari5) {
                        add('safari5');
                    }
                    if (Ext.isSafari5_0) {
                        add('safari5_0');
                    }
                }
                if (Ext.isChrome) {
                    add('chrome');
                }
                if (Ext.isMac) {
                    add('mac');
                }
                if (Ext.isLinux) {
                    add('linux');
                }
                if (!supportsBR) {
                    add('nbr');
                }
                if (!supportsLG) {
                    add('nlg');
                }
                if (html) {
                    if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                        Ext.isBorderBox = false;
                    }
                    else {
                        Ext.isBorderBox = true;
                    }

                    if (!Ext.isBorderBox) {
                        htmlCls.push(prefix + 'content-box');
                    }
                    if (Ext.isStrict) {
                        htmlCls.push(prefix + 'strict');
                    } else {
                        htmlCls.push(prefix + 'quirks');
                    }
                    Ext.fly(html, '_internal').addCls(htmlCls);
                }

                Ext.fly(bd, '_internal').addCls(cls);
                return true;
            };

    Ext.apply(EventManager, {
        hasBoundOnReady: false,
        hasFiredReady: false,
        deferReadyEvent: 1,
        onReadyChain: [],
        readyEvent:
                (function () {
                    readyEvent = new Ext.util.Event();
                    readyEvent.fire = function () {
                        Ext._beforeReadyTime = Ext._beforeReadyTime || new Date().getTime();
                        readyEvent.self.prototype.fire.apply(readyEvent, arguments);
                        Ext._afterReadytime = new Date().getTime();
                    };
                    return readyEvent;
                }()),
        idleEvent: new Ext.util.Event(),
        isReadyPaused: function () {
            return (/[?&]ext-pauseReadyFire\b/i.test(location.search) && !Ext._continueFireReady);
        },
        bindReadyEvent: function () {
            if (EventManager.hasBoundOnReady) {
                return;
            }
            if (doc.readyState === 'complete') {
                EventManager.onReadyEvent({
                    type: doc.readyState || 'body'
                });
            } else {
                doc.addEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.addEventListener('load', EventManager.onReadyEvent, false);
                EventManager.hasBoundOnReady = true;
            }
        },
        onReadyEvent: function (e) {
            if (e && e.type) {
                EventManager.onReadyChain.push(e.type);
            }

            if (EventManager.hasBoundOnReady) {
                doc.removeEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.removeEventListener('load', EventManager.onReadyEvent, false);
            }

            if (!Ext.isReady) {
                EventManager.fireDocReady();
            }
        },
        fireDocReady: function () {
            if (!Ext.isReady) {
                Ext._readyTime = new Date().getTime();
                Ext.isReady = true;

                supports.init();
                EventManager.onWindowUnload();
                readyEvent.onReadyChain = EventManager.onReadyChain;

                if (Ext.isNumber(EventManager.deferReadyEvent)) {
                    Ext.Function.defer(EventManager.fireReadyEvent, EventManager.deferReadyEvent);
                    EventManager.hasDocReadyTimer = true;
                } else {
                    EventManager.fireReadyEvent();
                }
            }
        },
        fireReadyEvent: function () {
            EventManager.hasDocReadyTimer = false;
            EventManager.isFiring = true;
            while (readyEvent.listeners.length && !EventManager.isReadyPaused()) {
                readyEvent.fire();
            }
            EventManager.isFiring = false;
            EventManager.hasFiredReady = true;
            EventManager.idleEvent.fire();
        },
        onDocumentReady: function (fn, scope, options) {
            options = options || {};
            options.single = true;
            readyEvent.addListener(fn, scope, options);
            if (!(EventManager.isFiring || EventManager.hasDocReadyTimer)) {
                if (Ext.isReady) {
                    EventManager.fireReadyEvent();
                } else {
                    EventManager.bindReadyEvent();
                }
            }
        },
        stoppedMouseDownEvent: new Ext.util.Event(),
        propRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/,
        getId: function (element) {
            var id;

            element = Ext.getDom(element);

            if (element === doc) {
                id = Ext.documentId;

            } else if (element === win) {
                id = Ext.windowId;
            }
            else {
                id = Ext.id(element);
            }

            if (!Ext.cache[id]) {
                Ext.addCacheEntry(id, null, element);
            }

            return id;
        },
        prepareListenerConfig: function (element, config, isRemove) {
            var propRe = EventManager.propRe,
                    key, value, args;
            for (key in config) {
                if (config.hasOwnProperty(key)) {
                    if (!propRe.test(key)) {
                        value = config[key];
                        if (typeof value === 'function') {
                            args = [element, key, value, config.scope, config];
                        } else {
                            args = [element, key, value.fn, value.scope, value];
                        }

                        if (isRemove) {
                            EventManager.removeListener.apply(EventManager, args);
                        } else {
                            EventManager.addListener.apply(EventManager, args);
                        }
                    }
                }
            }
        },
        mouseEnterLeaveRe: /mouseenter|mouseleave/,
        normalizeEvent: function (eventName, fn) {
            if (EventManager.mouseEnterLeaveRe.test(eventName) && !supports.MouseEnterLeave) {
                if (fn) {
                    fn = Ext.Function.createInterceptor(fn, EventManager.contains);
                }
                eventName = eventName === 'mouseenter' ? 'mouseover' : 'mouseout';
            } else if (eventName === 'mousewheel' && !supports.MouseWheel && !Ext.isOpera) {
                eventName = 'DOMMouseScroll';
            }
            return {
                eventName: eventName,
                fn: fn
            };
        },
        contains: function (event) {
            event = event.browserEvent || event;
            var parent = event.currentTarget,
                    child = EventManager.getRelatedTarget(event);

            if (parent && parent.firstChild) {
                while (child) {
                    if (child === parent) {
                        return false;
                    }
                    child = child.parentNode;
                    if (child && (child.nodeType !== 1)) {
                        child = null;
                    }
                }
            }
            return true;
        },
        addListener: function (element, eventName, fn, scope, options) {
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName);
                return;
            }

            var dom = element.dom || Ext.getDom(element),
                    hasAddEventListener, bind, wrap, cache, id, cacheItem, capture;
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }
            if (!fn) {
                Ext.Error.raise({
                    sourceClass: 'Ext.EventManager',
                    sourceMethod: 'addListener',
                    targetElement: element,
                    eventName: eventName,
                    msg: 'Error adding "' + eventName + '\" listener. The handler function is undefined.'
                });
            }
            options = options || {};
            bind = EventManager.normalizeEvent(eventName, fn);
            wrap = EventManager.createListenerWrap(dom, eventName, bind.fn, scope, options);
            cache = EventManager.getEventListenerCache(element.dom ? element : dom, eventName);
            eventName = bind.eventName;
            hasAddEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.attachEvent);
            if (!hasAddEventListener) {
                id = EventManager.normalizeId(dom);
                if (id) {
                    cacheItem = Ext.cache[id][eventName];
                    if (cacheItem && cacheItem.firing) {
                        cache = EventManager.cloneEventListenerCache(dom, eventName);
                    }
                }
            }

            capture = !!options.capture;
            cache.push({
                fn: fn,
                wrap: wrap,
                scope: scope,
                capture: capture
            });

            if (!hasAddEventListener) {
                if (cache.length === 1) {
                    id = EventManager.normalizeId(dom, true);
                    fn = Ext.Function.bind(EventManager.handleSingleEvent, EventManager, [id, eventName], true);
                    Ext.cache[id][eventName] = {
                        firing: false,
                        fn: fn
                    };
                    dom.attachEvent('on' + eventName, fn);
                }
            } else {
                dom.addEventListener(eventName, wrap, capture);
            }

            if (dom === doc && eventName === 'mousedown') {
                EventManager.stoppedMouseDownEvent.addListener(wrap);
            }
        },
        normalizeId: function (dom, force) {
            var id;
            if (dom === doc) {
                id = Ext.documentId;
            } else if (dom === win) {
                id = Ext.windowId;
            } else {
                id = dom.id;
            }
            if (!id && force) {
                id = EventManager.getId(dom);
            }
            return id;
        },
        handleSingleEvent: function (e, id, eventName) {
            var listenerCache = EventManager.getEventListenerCache(id, eventName),
                    attachItem = Ext.cache[id][eventName],
                    len, i;
            if (attachItem.firing) {
                return;
            }

            attachItem.firing = true;
            for (i = 0, len = listenerCache.length; i < len; ++i) {
                listenerCache[i].wrap(e);
            }
            attachItem.firing = false;

        },
        removeListener: function (element, eventName, fn, scope) {
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName, true);
                return;
            }

            var dom = Ext.getDom(element),
                    id, el = element.dom ? element : Ext.get(dom),
                    cache = EventManager.getEventListenerCache(el, eventName),
                    bindName = EventManager.normalizeEvent(eventName).eventName,
                    i = cache.length, j, cacheItem, hasRemoveEventListener,
                    listener, wrap;

            if (!dom) {
                return;
            }
            hasRemoveEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.detachEvent);
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }
            while (i--) {
                listener = cache[i];

                if (listener && (!fn || listener.fn === fn) && (!scope || listener.scope === scope)) {
                    wrap = listener.wrap;

                    if (wrap.task) {
                        clearTimeout(wrap.task);
                        delete wrap.task;
                    }

                    j = wrap.tasks && wrap.tasks.length;
                    if (j) {
                        while (j--) {
                            clearTimeout(wrap.tasks[j]);
                        }
                        delete wrap.tasks;
                    }

                    if (!hasRemoveEventListener) {
                        id = EventManager.normalizeId(dom, true);
                        cacheItem = Ext.cache[id][bindName];
                        if (cacheItem && cacheItem.firing) {
                            cache = EventManager.cloneEventListenerCache(dom, bindName);
                        }

                        if (cache.length === 1) {
                            fn = cacheItem.fn;
                            delete Ext.cache[id][bindName];
                            dom.detachEvent('on' + bindName, fn);
                        }
                    } else {
                        dom.removeEventListener(bindName, wrap, listener.capture);
                    }

                    if (wrap && dom === doc && eventName === 'mousedown') {
                        EventManager.stoppedMouseDownEvent.removeListener(wrap);
                    }

                    // remove listener from cache
                    Ext.Array.erase(cache, i, 1);
                }
            }
        },
        removeAll: function (element) {
            var id = (typeof element === 'string') ? element : element.id,
                    cache, events, eventName;

            if (id && (cache = Ext.cache[id])) {
                events = cache.events;
                for (eventName in events) {
                    if (events.hasOwnProperty(eventName)) {
                        EventManager.removeListener(element, eventName);
                    }
                }
                cache.events = {};
            }
        },
        purgeElement: function (element, eventName) {
            var dom = Ext.getDom(element),
                    i = 0, len, childNodes;

            if (eventName) {
                EventManager.removeListener(element, eventName);
            } else {
                EventManager.removeAll(element);
            }

            if (dom && dom.childNodes) {
                childNodes = dom.childNodes;
                for (len = childNodes.length; i < len; i++) {
                    EventManager.purgeElement(childNodes[i], eventName);
                }
            }
        },
        createListenerWrap: function (dom, ename, fn, scope, options) {
            options = options || {};

            var gen, wrap = function (e, args) {
                var f;
                if (!gen) {
                    f = ['if(!' + Ext.name + ') {return;}'];

                    if (options.buffer || options.delay || options.freezeEvent) {
                        if (options.freezeEvent) {
                            f.push('e = X.EventObject.setEvent(e);');
                        }
                        f.push('e = new X.EventObjectImpl(e, ' + (options.freezeEvent ? 'true' : 'false') + ');');
                    } else {
                        f.push('e = X.EventObject.setEvent(e);');
                    }

                    if (options.delegate) {
                        f.push('var result, t = e.getTarget("' + (options.delegate + '').replace(escapeRx, '\\\\') + '", this);');
                        f.push('if(!t) {return;}');
                    } else {
                        f.push('var t = e.target, result;');
                    }

                    if (options.target) {
                        f.push('if(e.target !== options.target) {return;}');
                    }

                    if (options.stopEvent) {
                        f.push('e.stopEvent();');
                    } else {
                        if (options.preventDefault) {
                            f.push('e.preventDefault();');
                        }
                        if (options.stopPropagation) {
                            f.push('e.stopPropagation();');
                        }
                    }

                    if (options.normalized === false) {
                        f.push('e = e.browserEvent;');
                    }

                    if (options.buffer) {
                        f.push('(wrap.task && clearTimeout(wrap.task));');
                        f.push('wrap.task = setTimeout(function() {');
                    }

                    if (options.delay) {
                        f.push('wrap.tasks = wrap.tasks || [];');
                        f.push('wrap.tasks.push(setTimeout(function() {');
                    }

                    f.push('result = fn.call(scope || dom, e, t, options);');

                    if (options.single) {
                        f.push('evtMgr.removeListener(dom, ename, fn, scope);');
                    }
                    if (ename !== 'mousemove' && ename !== 'unload') {
                        f.push('if (evtMgr.idleEvent.listeners.length) {');
                        f.push('evtMgr.idleEvent.fire();');
                        f.push('}');
                    }
                    if (options.delay) {
                        f.push('}, ' + options.delay + '));');
                    }
                    if (options.buffer) {
                        f.push('}, ' + options.buffer + ');');
                    }
                    f.push('return result;');
                    gen = Ext.cacheableFunctionFactory('e', 'options', 'fn', 'scope', 'ename', 'dom', 'wrap', 'args', 'X', 'evtMgr', f.join('\n'));
                }

                return gen.call(dom, e, options, fn, scope, ename, dom, wrap, args, Ext, EventManager);
            };
            return wrap;
        },
        getEventCache: function (element) {
            var elementCache, eventCache, id;

            if (!element) {
                return [];
            }

            if (element.$cache) {
                elementCache = element.$cache;
            } else {
                if (typeof element === 'string') {
                    id = element;
                } else {
                    id = EventManager.getId(element);
                }
                elementCache = Ext.cache[id];
            }
            eventCache = elementCache.events || (elementCache.events = {});
            return eventCache;
        },
        getEventListenerCache: function (element, eventName) {
            var eventCache = EventManager.getEventCache(element);
            return eventCache[eventName] || (eventCache[eventName] = []);
        },
        cloneEventListenerCache: function (element, eventName) {
            var eventCache = EventManager.getEventCache(element),
                    out;

            if (eventCache[eventName]) {
                out = eventCache[eventName].slice(0);
            } else {
                out = [];
            }
            eventCache[eventName] = out;
            return out;
        },
        mouseLeaveRe: /(mouseout|mouseleave)/,
        mouseEnterRe: /(mouseover|mouseenter)/,
        stopEvent: function (event) {
            EventManager.stopPropagation(event);
            EventManager.preventDefault(event);
        },
        stopPropagation: function (event) {
            event = event.browserEvent || event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        preventDefault: function (event) {
            event = event.browserEvent || event;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
                try {
                    if (event.ctrlKey || event.keyCode > 111 && event.keyCode < 124) {
                        event.keyCode = -1;
                    }
                } catch (e) {
                }
            }
        },
        getRelatedTarget: function (event) {
            event = event.browserEvent || event;
            var target = event.relatedTarget;
            if (!target) {
                if (EventManager.mouseLeaveRe.test(event.type)) {
                    target = event.toElement;
                } else if (EventManager.mouseEnterRe.test(event.type)) {
                    target = event.fromElement;
                }
            }
            return EventManager.resolveTextNode(target);
        },
        getPageX: function (event) {
            return EventManager.getPageXY(event)[0];
        },
        getPageY: function (event) {
            return EventManager.getPageXY(event)[1];
        },
        getPageXY: function (event) {
            event = event.browserEvent || event;
            var x = event.pageX,
                    y = event.pageY,
                    docEl = doc.documentElement,
                    body = doc.body;
            if (!x && x !== 0) {
                x = event.clientX + (docEl && docEl.scrollLeft || body && body.scrollLeft || 0) - (docEl && docEl.clientLeft || body && body.clientLeft || 0);
                y = event.clientY + (docEl && docEl.scrollTop || body && body.scrollTop || 0) - (docEl && docEl.clientTop || body && body.clientTop || 0);
            }
            return [x, y];
        },
        getTarget: function (event) {
            event = event.browserEvent || event;
            return EventManager.resolveTextNode(event.target || event.srcElement);
        },
        resolveTextNode: Ext.isGecko ?
                function (node) {
                    if (node) {
                        var s = HTMLElement.prototype.toString.call(node);
                        if (s !== '[xpconnect wrapped native prototype]' && s !== '[object XULElement]') {
                            return node.nodeType === 3 ? node.parentNode : node;
                        }
                    }
                }
        :
                function (node) {
                    return node && node.nodeType === 3 ? node.parentNode : node;
                },
        curWidth: 0,
        curHeight: 0,
        onWindowResize: function (fn, scope, options) {
            var resize = EventManager.resizeEvent;

            if (!resize) {
                EventManager.resizeEvent = resize = new Ext.util.Event();
                EventManager.on(win, 'resize', EventManager.fireResize, null, {buffer: 100});
            }
            resize.addListener(fn, scope, options);
        },
        fireResize: function () {
            var w = Ext.Element.getViewWidth(),
                    h = Ext.Element.getViewHeight();
            if (EventManager.curHeight !== h || EventManager.curWidth !== w) {
                EventManager.curHeight = h;
                EventManager.curWidth = w;
                EventManager.resizeEvent.fire(w, h);
            }
        },
        removeResizeListener: function (fn, scope) {
            var resize = EventManager.resizeEvent;
            if (resize) {
                resize.removeListener(fn, scope);
            }
        },
        onWindowUnload: function (fn, scope, options) {
            var unload = EventManager.unloadEvent;

            if (!unload) {
                EventManager.unloadEvent = unload = new Ext.util.Event();
                EventManager.addListener(win, 'unload', EventManager.fireUnload);
            }
            if (fn) {
                unload.addListener(fn, scope, options);
            }
        },
        fireUnload: function () {
            try {
                doc = win = undefined;
                var gridviews, i, ln,
                        el, cache;
                EventManager.unloadEvent.fire();
                if (Ext.isGecko3) {
                    gridviews = Ext.ComponentQuery.query('gridview');
                    i = 0;
                    ln = gridviews.length;
                    for (; i < ln; i++) {
                        gridviews[i].scrollToTop();
                    }
                }
                cache = Ext.cache;
                for (el in cache) {
                    if (cache.hasOwnProperty(el)) {
                        EventManager.removeAll(el);
                    }
                }
            } catch (e) {
            }
        },
        removeUnloadListener: function (fn, scope) {
            var unload = EventManager.unloadEvent;
            if (unload) {
                unload.removeListener(fn, scope);
            }
        },
        useKeyDown: Ext.isWebKit ?
                parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 :
                !((Ext.isGecko && !Ext.isWindows) || (Ext.isOpera && Ext.operaVersion < 12)),
        getKeyEvent: function () {
            return EventManager.useKeyDown ? 'keydown' : 'keypress';
        }
    });
    if (!supportsAddEventListener && document.attachEvent) {
        Ext.apply(EventManager, {
            pollScroll: function () {
                var scrollable = true;

                try {
                    document.documentElement.doScroll('left');
                } catch (e) {
                    scrollable = false;
                }
                if (scrollable && document.body) {
                    EventManager.onReadyEvent({
                        type: 'doScroll'
                    });
                } else {
                    EventManager.scrollTimeout = setTimeout(EventManager.pollScroll, 20);
                }
                return scrollable;
            },
            scrollTimeout: null,
            readyStatesRe: /complete/i,
            checkReadyState: function () {
                var state = document.readyState;

                if (EventManager.readyStatesRe.test(state)) {
                    EventManager.onReadyEvent({
                        type: state
                    });
                }
            },
            bindReadyEvent: function () {
                var topContext = true;

                if (EventManager.hasBoundOnReady) {
                    return;
                }
                try {
                    topContext = window.frameElement === undefined;
                } catch (e) {
                    topContext = false;
                }

                if (!topContext || !doc.documentElement.doScroll) {
                    EventManager.pollScroll = Ext.emptyFn;
                }
                if (EventManager.pollScroll() === true) {
                    return;
                }
                if (doc.readyState === 'complete') {
                    EventManager.onReadyEvent({type: 'already ' + (doc.readyState || 'body')});
                } else {
                    doc.attachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.attachEvent('onload', EventManager.onReadyEvent);
                    EventManager.hasBoundOnReady = true;
                }
            },
            onReadyEvent: function (e) {
                if (e && e.type) {
                    EventManager.onReadyChain.push(e.type);
                }
                if (EventManager.hasBoundOnReady) {
                    document.detachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.detachEvent('onload', EventManager.onReadyEvent);
                }
                if (Ext.isNumber(EventManager.scrollTimeout)) {
                    clearTimeout(EventManager.scrollTimeout);
                    delete EventManager.scrollTimeout;
                }
                if (!Ext.isReady) {
                    EventManager.fireDocReady();
                }
            },
            onReadyChain: []
        });
    }
    Ext.onReady = function (fn, scope, options) {
        Ext.Loader.onReady(fn, scope, true, options);
    };
    Ext.onDocumentReady = EventManager.onDocumentReady;
    EventManager.on = EventManager.addListener;
    EventManager.un = EventManager.removeListener;
    Ext.onReady(initExtCss);
};

Ext.define('Ext.util.Observable', function (Observable) {
    var emptyFn = Ext.emptyFn,
            emptyArray = [],
            arrayProto = Array.prototype,
            arraySlice = arrayProto.slice,
            ExtEvent = Ext.util.Event,
            ListenerRemover = function (observable) {
                if (observable instanceof ListenerRemover) {
                    return observable;
                }
                this.observable = observable;
                if (arguments[1].isObservable) {
                    this.managedListeners = true;
                }
                this.args = arraySlice.call(arguments, 1);
            };

    ListenerRemover.prototype.destroy = function () {
        this.observable[this.managedListeners ? 'mun' : 'un'].apply(this.observable, this.args);
    };

    return {
        requires: ['Ext.util.Event', 'Ext.EventManager'],
        statics: {
            releaseCapture: function (o) {
                o.fireEventArgs = this.prototype.fireEventArgs;
            },
            capture: function (o, fn, scope) {
                var newFn = function (eventName, args) {
                    return fn.apply(scope, [eventName].concat(args));
                }
                this.captureArgs(o, newFn, scope);
            },
            captureArgs: function (o, fn, scope) {
                o.fireEventArgs = Ext.Function.createInterceptor(o.fireEventArgs, fn, scope);
            },
            observe: function (cls, listeners) {
                if (cls) {
                    if (!cls.isObservable) {
                        Ext.applyIf(cls, new this());
                        this.captureArgs(cls.prototype, cls.fireEventArgs, cls);
                    }
                    if (Ext.isObject(listeners)) {
                        cls.on(listeners);
                    }
                }
                return cls;
            },
            prepareClass: function (T, mixin) {
                if (!T.HasListeners) {
                    var HasListeners = function () {
                    },
                            SuperHL = T.superclass.HasListeners || (mixin && mixin.HasListeners) ||
                            Observable.HasListeners;
                    T.prototype.HasListeners = T.HasListeners = HasListeners;
                    HasListeners.prototype = T.hasListeners = new SuperHL();
                }
            }
        },
        isObservable: true,
        eventsSuspended: 0,
        constructor: function (config) {
            var me = this;
            Ext.apply(me, config);
            if (!me.hasListeners) {
                me.hasListeners = new me.HasListeners();
            }
            me.events = me.events || {};
            if (me.listeners) {
                me.on(me.listeners);
                me.listeners = null;
            }

            if (me.bubbleEvents) {
                me.enableBubble(me.bubbleEvents);
            }
        },
        onClassExtended: function (T) {
            if (!T.HasListeners) {
                Observable.prepareClass(T);
            }
        },
        eventOptionsRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|freezeEvent|priority)$/,
        addManagedListener: function (item, ename, fn, scope, options, /* private */ noDestroy) {
            var me = this,
                    managedListeners = me.managedListeners = me.managedListeners || [],
                    config, passedOptions;

            if (typeof ename !== 'string') {
                passedOptions = arguments.length > 4 ? options : ename;

                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.addManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope, config.fn ? config : passedOptions, true);
                        }
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, item, options);
                }
            }
            else {
                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }

                if (fn !== emptyFn) {
                    managedListeners.push({
                        item: item,
                        ename: ename,
                        fn: fn,
                        scope: scope,
                        options: options
                    });
                    item.on(ename, fn, scope, options);
                    if (!noDestroy && options && options.destroyable) {
                        return new ListenerRemover(me, item, ename, fn, scope);
                    }
                }
            }
        },
        removeManagedListener: function (item, ename, fn, scope) {
            var me = this,
                    options,
                    config,
                    managedListeners,
                    length,
                    i;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope);
                        }
                    }
                }
            } else {
                managedListeners = me.managedListeners ? me.managedListeners.slice() : [];

                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }

                for (i = 0, length = managedListeners.length; i < length; i++) {
                    me.removeManagedListenerItem(false, managedListeners[i], item, ename, fn, scope);
                }
            }
        },
        fireEvent: function (eventName) {
            return this.fireEventArgs(eventName, arraySlice.call(arguments, 1));
        },
        fireEventArgs: function (eventName, args) {
            eventName = eventName.toLowerCase();
            var me = this,
                    events = me.events,
                    event = events && events[eventName],
                    ret = true;
            if (event && me.hasListeners[eventName]) {
                ret = me.continueFireEvent(eventName, args || emptyArray, event.bubble);
            }
            return ret;
        },
        continueFireEvent: function (eventName, args, bubbles) {
            var target = this,
                    queue, event,
                    ret = true;

            do {
                if (target.eventsSuspended) {
                    if ((queue = target.eventQueue)) {
                        queue.push([eventName, args, bubbles]);
                    }
                    return ret;
                } else {
                    event = target.events[eventName];
                    if (event && event !== true) {
                        if ((ret = event.fire.apply(event, args)) === false) {
                            break;
                        }
                    }
                }
            } while (bubbles && (target = target.getBubbleParent()));
            return ret;
        },
        getBubbleParent: function () {
            var me = this, parent = me.getBubbleTarget && me.getBubbleTarget();
            if (parent && parent.isObservable) {
                return parent;
            }
            return null;
        },
        addListener: function (ename, fn, scope, options) {
            var me = this,
                    config, event,
                    prevListenerCount = 0;
            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.addListener(ename, config.fn || config, config.scope || options.scope, config.fn ? config : options);
                        }
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, options);
                }
            }
            else {
                ename = ename.toLowerCase();
                event = me.events[ename];
                if (event && event.isEvent) {
                    prevListenerCount = event.listeners.length;
                } else {
                    me.events[ename] = event = new ExtEvent(me, ename);
                }
                if (!fn) {
                    Ext.Error.raise('No function passed for event ' + me.$className + '.' + ename);
                }
                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }

                if (fn !== emptyFn) {
                    event.addListener(fn, scope, options);
                    if (event.listeners.length !== prevListenerCount) {
                        me.hasListeners._incr_(ename);
                    }
                    if (options && options.destroyable) {
                        return new ListenerRemover(me, ename, fn, scope, options);
                    }
                }
            }
        },
        removeListener: function (ename, fn, scope) {
            var me = this,
                    config,
                    event,
                    options;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeListener(ename, config.fn || config, config.scope || options.scope);
                        }
                    }
                }
            } else {
                ename = ename.toLowerCase();
                event = me.events[ename];
                if (event && event.isEvent) {
                    if (typeof fn === 'string') {
                        scope = scope || me;
                        fn = Ext.resolveMethod(fn, scope);
                    }

                    if (event.removeListener(fn, scope)) {
                        me.hasListeners._decr_(ename);
                    }
                }
            }
        },
        clearListeners: function () {
            var events = this.events,
                    hasListeners = this.hasListeners,
                    event,
                    key;

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    event = events[key];
                    if (event.isEvent) {
                        delete hasListeners[key];
                        event.clearListeners();
                    }
                }
            }

            this.clearManagedListeners();
        },
        purgeListeners: function () {
            if (Ext.global.console) {
                Ext.global.console.warn('Observable: purgeListeners has been deprecated. Please use clearListeners.');
            }
            return this.clearListeners.apply(this, arguments);
        },
        clearManagedListeners: function () {
            var managedListeners = this.managedListeners || [],
                    i = 0,
                    len = managedListeners.length;

            for (; i < len; i++) {
                this.removeManagedListenerItem(true, managedListeners[i]);
            }

            this.managedListeners = [];
        },
        removeManagedListenerItem: function (isClear, managedListener, item, ename, fn, scope) {
            if (isClear || (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope))) {
                managedListener.item.un(managedListener.ename, managedListener.fn, managedListener.scope);
                if (!isClear) {
                    Ext.Array.remove(this.managedListeners, managedListener);
                }
            }
        },
        purgeManagedListeners: function () {
            if (Ext.global.console) {
                Ext.global.console.warn('Observable: purgeManagedListeners has been deprecated. Please use clearManagedListeners.');
            }
            return this.clearManagedListeners.apply(this, arguments);
        },
        addEvents: function (o) {
            var me = this,
                    events = me.events || (me.events = {}),
                    arg, args, i;

            if (typeof o === 'string') {
                for (args = arguments, i = args.length; i--; ) {
                    arg = args[i];
                    if (!events[arg]) {
                        events[arg] = true;
                    }
                }
            } else {
                Ext.applyIf(me.events, o);
            }
        },
        hasListener: function (ename) {
            return !!this.hasListeners[ename.toLowerCase()];
        },
        isSuspended: function (event) {
            var suspended = this.eventsSuspended > 0;
            if (!suspended && event) {
                event = this.events[event];
                if (event && event.isEvent) {
                    return event.isSuspended();
                }
            }
            return suspended;
        },
        suspendEvents: function (queueSuspended) {
            this.eventsSuspended += 1;
            if (queueSuspended && !this.eventQueue) {
                this.eventQueue = [];
            }
        },
        suspendEvent: function (eventName) {
            var len = arguments.length,
                    events = this.events,
                    i, event, ename;

            for (i = 0; i < len; i++) {
                ename = arguments[i];
                event = events[ename];
                if (!event || typeof event === 'boolean') {
                    events[ename] = event = new ExtEvent(this, ename);
                }
                event.suspend();
            }
        },
        resumeEvent: function () {
            var len = arguments.length,
                    i, event;

            for (i = 0; i < len; i++) {
                event = this.events[arguments[i]];
                if (event && event.resume) {
                    event.resume();
                }
            }
        },
        resumeEvents: function () {
            var me = this,
                    queued = me.eventQueue,
                    qLen, q;

            if (me.eventsSuspended && !--me.eventsSuspended) {
                delete me.eventQueue;

                if (queued) {
                    qLen = queued.length;
                    for (q = 0; q < qLen; q++) {
                        me.continueFireEvent.apply(me, queued[q]);
                    }
                }
            }
        },
        relayEvents: function (origin, events, prefix) {
            var me = this,
                    len = events.length,
                    i = 0,
                    oldName,
                    relayers = {};
            for (; i < len; i++) {
                oldName = events[i];
                relayers[oldName] = me.createRelayer(prefix ? prefix + oldName : oldName);
            }
            me.mon(origin, relayers, null, null, undefined);
            return new ListenerRemover(me, origin, relayers);
        },
        createRelayer: function (newName, beginEnd) {
            var me = this;
            return function () {
                return me.fireEventArgs.call(me, newName, beginEnd ? arraySlice.apply(arguments, beginEnd) : arguments);
            };
        },
        enableBubble: function (eventNames) {
            if (eventNames) {
                var me = this,
                        names = (typeof eventNames === 'string') ? arguments : eventNames,
                        length = names.length,
                        events = me.events,
                        ename, event, i;

                for (i = 0; i < length; ++i) {
                    ename = names[i].toLowerCase();
                    event = events[ename];

                    if (!event || typeof event === 'boolean') {
                        events[ename] = event = new ExtEvent(me, ename);
                    }
                    me.hasListeners._incr_(ename);
                    event.bubble = true;
                }
            }
        }
    };
}, function () {
    var Observable = this,
            proto = Observable.prototype,
            HasListeners = function () {
            },
            prepareMixin = function (T) {
                if (!T.HasListeners) {
                    var proto = T.prototype;
                    Observable.prepareClass(T, this);
                    T.onExtended(function (U) {
                        Ext.classSystemMonitor && Ext.classSystemMonitor('extend mixin', arguments);
                        Observable.prepareClass(U);
                    });
                    if (proto.onClassMixedIn) {
                        Ext.override(T, {
                            onClassMixedIn: function (U) {
                                prepareMixin.call(this, U);
                                this.callParent(arguments);
                            }
                        });
                    } else {
                        proto.onClassMixedIn = function (U) {
                            prepareMixin.call(this, U);
                        };
                    }
                }
            },
            globalEvents;

    HasListeners.prototype = {
        _decr_: function (ev) {
            if (!--this[ev]) {
                delete this[ev];
            }
        },
        _incr_: function (ev) {
            if (this.hasOwnProperty(ev)) {
                ++this[ev];
            } else {
                this[ev] = 1;
            }
        }
    };
    proto.HasListeners = Observable.HasListeners = HasListeners;
    Observable.createAlias({
        on: 'addListener',
        un: 'removeListener',
        mon: 'addManagedListener',
        mun: 'removeManagedListener'
    });
    Observable.observeClass = Observable.observe;
    Ext.globalEvents = globalEvents = new Observable({
        events: {
            idle: Ext.EventManager.idleEvent,
            ready: Ext.EventManager.readyEvent
        }
    });
    Ext.on = function () {
        return globalEvents.addListener.apply(globalEvents, arguments);
    };
    Ext.un = function () {
        return globalEvents.removeListener.apply(globalEvents, arguments);
    };
    function getMethodEvent(method) {
        var e = (this.methodEvents = this.methodEvents || {})[method],
                returnValue,
                v,
                cancel,
                obj = this,
                makeCall;

        if (!e) {
            this.methodEvents[method] = e = {};
            e.originalFn = this[method];
            e.methodName = method;
            e.before = [];
            e.after = [];

            makeCall = function (fn, scope, args) {
                if ((v = fn.apply(scope || obj, args)) !== undefined) {
                    if (typeof v === 'object') {
                        if (v.returnValue !== undefined) {
                            returnValue = v.returnValue;
                        } else {
                            returnValue = v;
                        }
                        cancel = !!v.cancel;
                    }
                    else
                    if (v === false) {
                        cancel = true;
                    }
                    else {
                        returnValue = v;
                    }
                }
            };

            this[method] = function () {
                var args = Array.prototype.slice.call(arguments, 0),
                        b, i, len;
                returnValue = v = undefined;
                cancel = false;

                for (i = 0, len = e.before.length; i < len; i++) {
                    b = e.before[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }

                if ((v = e.originalFn.apply(obj, args)) !== undefined) {
                    returnValue = v;
                }

                for (i = 0, len = e.after.length; i < len; i++) {
                    b = e.after[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }
                return returnValue;
            };
        }
        return e;
    }

    Ext.apply(proto, {
        onClassMixedIn: prepareMixin,
        beforeMethod: function (method, fn, scope) {
            getMethodEvent.call(this, method).before.push({
                fn: fn,
                scope: scope
            });
        },
        afterMethod: function (method, fn, scope) {
            getMethodEvent.call(this, method).after.push({
                fn: fn,
                scope: scope
            });
        },
        removeMethodListener: function (method, fn, scope) {
            var e = this.getMethodEvent(method),
                    i, len;
            for (i = 0, len = e.before.length; i < len; i++) {
                if (e.before[i].fn === fn && e.before[i].scope === scope) {
                    Ext.Array.erase(e.before, i, 1);
                    return;
                }
            }
            for (i = 0, len = e.after.length; i < len; i++) {
                if (e.after[i].fn === fn && e.after[i].scope === scope) {
                    Ext.Array.erase(e.after, i, 1);
                    return;
                }
            }
        },
        toggleEventLogging: function (toggle) {
            Ext.util.Observable[toggle ? 'capture' : 'releaseCapture'](this, function (en) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.log(en, arguments);
                }
            });
        }
    });
});
Ext.define('Ext.util.HashMap', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    generation: 0,
    constructor: function (config) {
        config = config || {};

        var me = this,
                keyFn = config.keyFn;

        me.initialConfig = config;
        me.addEvents(
                'add',
                'clear',
                'remove',
                'replace'
                );

        me.mixins.observable.constructor.call(me, config);
        me.clear(true);

        if (keyFn) {
            me.getKey = keyFn;
        }
    },
    getCount: function () {
        return this.length;
    },
    getData: function (key, value) {
        if (value === undefined) {
            value = key;
            key = this.getKey(value);
        }

        return [key, value];
    },
    getKey: function (o) {
        return o.id;
    },
    add: function (key, value) {
        var me = this;
        if (arguments.length === 1) {
            value = key;
            key = me.getKey(value);
        }
        if (me.containsKey(key)) {
            return me.replace(key, value);
        }

        me.map[key] = value;
        ++me.length;
        me.generation++;
        if (me.hasListeners.add) {
            me.fireEvent('add', me, key, value);
        }
        return value;
    },
    replace: function (key, value) {
        var me = this,
                map = me.map,
                old;
        if (arguments.length === 1) {
            value = key;
            key = me.getKey(value);
        }
        if (!me.containsKey(key)) {
            me.add(key, value);
        }
        old = map[key];
        map[key] = value;
        me.generation++;
        if (me.hasListeners.replace) {
            me.fireEvent('replace', me, key, value, old);
        }
        return value;
    },
    remove: function (o) {
        var key = this.findKey(o);
        if (key !== undefined) {
            return this.removeAtKey(key);
        }
        return false;
    },
    removeAtKey: function (key) {
        var me = this,
                value;

        if (me.containsKey(key)) {
            value = me.map[key];
            delete me.map[key];
            --me.length;
            me.generation++;
            if (me.hasListeners.remove) {
                me.fireEvent('remove', me, key, value);
            }
            return true;
        }
        return false;
    },
    get: function (key) {
        var map = this.map;
        return map.hasOwnProperty(key) ? map[key] : undefined;
    },
    clear: function (initial) {
        var me = this;
        if (initial || me.generation) {
            me.map = {};
            me.length = 0;
            me.generation = initial ? 0 : me.generation + 1;
        }
        if (initial !== true && me.hasListeners.clear) {
            me.fireEvent('clear', me);
        }
        return me;
    },
    containsKey: function (key) {
        var map = this.map;
        return map.hasOwnProperty(key) && map[key] !== undefined;
    },
    contains: function (value) {
        return this.containsKey(this.findKey(value));
    },
    getKeys: function () {
        return this.getArray(true);
    },
    getValues: function () {
        return this.getArray(false);
    },
    getArray: function (isKey) {
        var arr = [],
                key,
                map = this.map;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                arr.push(isKey ? key : map[key]);
            }
        }
        return arr;
    },
    each: function (fn, scope) {
        var items = Ext.apply({}, this.map),
                key,
                length = this.length;

        scope = scope || this;
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                if (fn.call(scope, key, items[key], length) === false) {
                    break;
                }
            }
        }
        return this;
    },
    clone: function () {
        var hash = new this.self(this.initialConfig),
                map = this.map,
                key;

        hash.suspendEvents();
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                hash.add(key, map[key]);
            }
        }
        hash.resumeEvents();
        return hash;
    },
    findKey: function (value) {
        var key,
                map = this.map;

        for (key in map) {
            if (map.hasOwnProperty(key) && map[key] === value) {
                return key;
            }
        }
        return undefined;
    }
});
Ext.define('Ext.AbstractManager', {
    requires: ['Ext.util.HashMap'],
    typeName: 'type',
    constructor: function (config) {
        Ext.apply(this, config || {});
        this.all = new Ext.util.HashMap();
        this.types = {};
    },
    get: function (id) {
        return this.all.get(id);
    },
    register: function (item) {
        var all = this.all,
                key = all.getKey(item);
        if (all.containsKey(key)) {
            Ext.Error.raise('Registering duplicate id "' + key + '" with this manager');
        }
        this.all.add(item);
    },
    unregister: function (item) {
        var all = this.all;
        all.removeAtKey(all.getKey(item));
    },
    registerType: function (type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
    },
    isRegistered: function (type) {
        return this.types[type] !== undefined;
    },
    create: function (config, defaultType) {
        var type = config[this.typeName] || config.type || defaultType,
                Constructor = this.types[type];
        if (Constructor === undefined) {
            Ext.Error.raise("The '" + type + "' type has not been registered with this manager");
        }
        return new Constructor(config);
    },
    onAvailable: function (id, fn, scope) {
        var all = this.all,
                item,
                callback;

        if (all.containsKey(id)) {
            item = all.get(id);
            fn.call(scope || item, item);
        } else {
            callback = function (map, key, item) {
                if (key === id) {
                    fn.call(scope || item, item);
                    all.un('add', callback);
                }
            };
            all.on('add', callback);
        }
    },
    each: function (fn, scope) {
        this.all.each(fn, scope || this);
    },
    getCount: function () {
        return this.all.getCount();
    }
});
Ext.define('Ext.data.association.Association', {
    alternateClassName: 'Ext.data.Association',
    primaryKey: 'id',
    associationKeyFunction: null,
    defaultReaderType: 'json',
    isAssociation: true,
    initialConfig: null,
    statics: {
        AUTO_ID: 1000,
        create: function (association) {
            if (Ext.isString(association)) {
                association = {
                    type: association
                };
            }
            switch (association.type) {
                case 'belongsTo':
                    return new Ext.data.association.BelongsTo(association);
                case 'hasMany':
                    return new Ext.data.association.HasMany(association);
                case 'hasOne':
                    return new Ext.data.association.HasOne(association);
                default:
                    Ext.Error.raise('Unknown Association type: "' + association.type + '"');
            }
            return association;
        }
    },
    constructor: function (config) {
        Ext.apply(this, config);

        var me = this,
                types = Ext.ModelManager.types,
                ownerName = config.ownerModel,
                associatedName = config.associatedModel,
                ownerModel = types[ownerName],
                associatedModel = types[associatedName],
                associationKey = config.associationKey,
                keyReIdx;
        if (associationKey) {
            keyReIdx = String(associationKey).search(/[\[\.]/);
            if (keyReIdx >= 0) {
                me.associationKeyFunction = Ext.functionFactory('obj', 'return obj' + (keyReIdx > 0 ? '.' : '') + associationKey);
            }
        }

        me.initialConfig = config;
        if (ownerModel === undefined) {
            Ext.Error.raise("The configured ownerModel was not valid (you tried " + ownerName + ")");
        }
        if (associatedModel === undefined) {
            Ext.Error.raise("The configured associatedModel was not valid (you tried " + associatedName + ")");
        }
        me.ownerModel = ownerModel;
        me.associatedModel = associatedModel;
        Ext.applyIf(me, {
            ownerName: ownerName,
            associatedName: associatedName
        });

        me.associationId = 'association' + (++me.statics().AUTO_ID);
    },
    getReader: function () {
        var me = this,
                reader = me.reader,
                model = me.associatedModel;

        if (reader) {
            if (Ext.isString(reader)) {
                reader = {
                    type: reader
                };
            }
            if (reader.isReader) {
                reader.setModel(model);
            } else {
                Ext.applyIf(reader, {
                    model: model,
                    type: me.defaultReaderType
                });
            }
            me.reader = Ext.createByAlias('reader.' + reader.type, reader);
        }
        return me.reader || null;
    }
});
Ext.define('Ext.data.IdGenerator', {
    isGenerator: true,
    constructor: function (config) {
        var me = this;
        Ext.apply(me, config);

        if (me.id) {
            Ext.data.IdGenerator.all[me.id] = me;
        }
    },
    getRecId: function (rec) {
        return rec.modelName + '-' + rec.internalId;
    },
    statics: {
        all: {},
        get: function (config) {
            var generator,
                    id,
                    type;
            if (typeof config === 'string') {
                id = type = config;
                config = null;
            } else if (config.isGenerator) {
                return config;
            } else {
                id = config.id || config.type;
                type = config.type;
            }
            generator = this.all[id];
            if (!generator) {
                generator = Ext.create('idgen.' + type, config);
            }
            return generator;
        }
    }
});
Ext.define('Ext.data.SortTypes', {
    singleton: true,
    none: Ext.identityFn,
    stripTagsRE: /<\/?[^>]+>/gi,
    asText: function (s) {
        return String(s).replace(this.stripTagsRE, "");
    },
    asUCText: function (s) {
        return String(s).toUpperCase().replace(this.stripTagsRE, "");
    },
    asUCString: function (s) {
        return String(s).toUpperCase();
    },
    asDate: function (s) {
        if (!s) {
            return 0;
        }
        if (Ext.isDate(s)) {
            return s.getTime();
        }
        return Date.parse(String(s));
    },
    asFloat: function (s) {
        var val = parseFloat(String(s).replace(/,/g, ""));
        return isNaN(val) ? 0 : val;
    },
    asInt: function (s) {
        var val = parseInt(String(s).replace(/,/g, ""), 10);
        return isNaN(val) ? 0 : val;
    }
});
Ext.define('Ext.data.Types', {
    singleton: true,
    requires: ['Ext.data.SortTypes']
}, function (Types) {
    var SortTypes = Ext.data.SortTypes;

    Ext.apply(Types, {
        stripRe: /[\$,%]/g,
        AUTO: {
            sortType: SortTypes.none,
            type: 'auto'
        },
        STRING: {
            convert: function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType: SortTypes.asUCString,
            type: 'string'
        },
        INT: {
            convert: function (v) {
                if (typeof v === 'number') {
                    return parseInt(v);
                }
                return v !== undefined && v !== null && v !== '' ?
                        parseInt(String(v).replace(Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: SortTypes.none,
            type: 'int'
        },
        FLOAT: {
            convert: function (v) {
                if (typeof v === 'number') {
                    return v;
                }
                return v !== undefined && v !== null && v !== '' ?
                        parseFloat(String(v).replace(Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: SortTypes.none,
            type: 'float'
        },
        BOOL: {
            convert: function (v) {
                if (typeof v === 'boolean') {
                    return v;
                }
                if (this.useNull && (v === undefined || v === null || v === '')) {
                    return null;
                }
                return v === 'true' || v === 1;
            },
            sortType: SortTypes.none,
            type: 'bool'
        },
        DATE: {
            convert: function (v) {
                var df = this.dateReadFormat || this.dateFormat,
                        parsed;
                if (!v) {
                    return null;
                }
                if (v instanceof Date) {
                    return v;
                }
                if (df) {
                    return Ext.Date.parse(v, df);
                }
                parsed = Date.parse(v);
                return parsed ? new Date(parsed) : null;
            },
            sortType: SortTypes.asDate,
            type: 'date'
        }
    });
    Types.BOOLEAN = Types.BOOL;
    Types.INTEGER = Types.INT;
    Types.NUMBER = Types.FLOAT;
});
Ext.define('Ext.data.Field', {
    requires: ['Ext.data.Types', 'Ext.data.SortTypes'],
    alias: 'data.field',
    isField: true,
    constructor: function (config) {
        var me = this,
                types = Ext.data.Types,
                st;

        if (Ext.isString(config)) {
            config = {name: config};
        }
        Ext.apply(me, config);

        st = me.sortType;

        if (me.type) {
            if (Ext.isString(me.type)) {
                me.type = types[me.type.toUpperCase()] || types.AUTO;
            }
        } else {
            me.type = types.AUTO;
        }
        if (Ext.isString(st)) {
            me.sortType = Ext.data.SortTypes[st];
        } else if (Ext.isEmpty(st)) {
            me.sortType = me.type.sortType;
        }
        if (!config.hasOwnProperty('convert')) {
            me.convert = me.type.convert;
        } else if (!me.convert && me.type.convert && !config.hasOwnProperty('defaultValue')) {
            me.defaultValue = me.type.convert(me.defaultValue);
        }

        if (config.convert) {
            me.hasCustomConvert = true;
        }
    },
    dateFormat: null,
    dateReadFormat: null,
    dateWriteFormat: null,
    useNull: false,
    defaultValue: "",
    mapping: null,
    sortType: null,
    sortDir: "ASC",
    allowBlank: true,
    persist: true
});
Ext.define('Ext.data.Errors', {
    extend: 'Ext.util.MixedCollection',
    isValid: function () {
        return this.length === 0;
    },
    getByField: function (fieldName) {
        var errors = [],
                error, i;
        for (i = 0; i < this.length; i++) {
            error = this.items[i];
            if (error.field === fieldName) {
                errors.push(error);
            }
        }
        return errors;
    }
});
Ext.define('Ext.util.Filter', {
    id: null,
    anyMatch: false,
    exactMatch: false,
    caseSensitive: false,
    disabled: false,
    operator: null,
    statics: {
        createFilterFn: function (filters) {
            return filters && filters.length ? function (candidate) {
                var isMatch = true,
                        length = filters.length,
                        i, filter;

                for (i = 0; isMatch && i < length; i++) {
                    filter = filters[i];
                    if (!filter.disabled) {
                        isMatch = isMatch && filter.filterFn.call(filter.scope || filter, candidate);
                    }
                }
                return isMatch;
            } : function () {
                return true;
            };
        }
    },
    operatorFns: {
        "<": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) < this.value;
        },
        "<=": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) <= this.value;
        },
        "=": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) === this.value;
        },
        ">=": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) >= this.value;
        },
        ">": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) > this.value;
        },
        "!=": function (candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) !== this.value;
        }
    },
    constructor: function (config) {
        var me = this;
        me.initialConfig = config;
        Ext.apply(me, config);
        me.filter = me.filter || me.filterFn;
        if (me.filter === undefined) {
            me.setValue(config.value);
        }
    },
    setValue: function (value) {
        var me = this;
        me.value = value;
        if (me.property === undefined || me.value === undefined) {
        } else {
            me.filter = me.createFilterFn();
        }

        me.filterFn = me.filter;
    },
    setFilterFn: function (filterFn) {
        this.filterFn = this.filter = filterFn;
    },
    createFilterFn: function () {
        var me = this,
                matcher = me.createValueMatcher(),
                property = me.property;

        if (me.operator) {
            return me.operatorFns[me.operator];
        } else {
            return function (item) {
                var value = me.getRoot(item)[property];
                return matcher === null ? value === null : matcher.test(value);
            };
        }
    },
    getRoot: function (item) {
        var root = this.root;
        return root === undefined ? item : item[root];
    },
    createValueMatcher: function () {
        var me = this,
                value = me.value,
                anyMatch = me.anyMatch,
                exactMatch = me.exactMatch,
                caseSensitive = me.caseSensitive,
                escapeRe = Ext.String.escapeRegex;

        if (value === null) {
            return value;
        }

        if (!value.exec) {
            value = String(value);

            if (anyMatch === true) {
                value = escapeRe(value);
            } else {
                value = '^' + escapeRe(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
        }

        return value;
    },
    serialize: function () {
        var me = this,
                result = Ext.apply({}, me.initialConfig);

        result.value = me.value;
        return result;
    }
}, function () {
    this.prototype.operatorFns['=='] = this.prototype.operatorFns['='];
});

Ext.define('Ext.data.Operation', {
    synchronous: true,
    action: undefined,
    filters: undefined,
    sorters: undefined,
    groupers: undefined,
    start: undefined,
    limit: undefined,
    batch: undefined,
    callback: undefined,
    scope: undefined,
    started: false,
    running: false,
    complete: false,
    success: undefined,
    exception: false,
    error: undefined,
    actionCommitRecordsRe: /^(?:create|update)$/i,
    actionSkipSyncRe: /^destroy$/i,
    constructor: function (config) {
        Ext.apply(this, config || {});
    },
    commitRecords: function (serverRecords) {
        var me = this,
                commitRecords = me.actionCommitRecordsRe.test(me.action),
                mc, index, clientRecords, serverRec, clientRec, i, len,
                modifiedFields, recordModifiedFields;

        if (!me.actionSkipSyncRe.test(me.action)) {
            clientRecords = me.records;

            if (clientRecords && clientRecords.length) {
                if (commitRecords) {
                    recordModifiedFields = [];
                }
                if (clientRecords.length > 1) {
                    if (me.action === 'update' || clientRecords[0].clientIdProperty) {
                        mc = new Ext.util.MixedCollection();
                        mc.addAll(serverRecords);

                        for (index = clientRecords.length; index--; ) {
                            clientRec = clientRecords[index];
                            serverRec = mc.findBy(me.matchClientRec, clientRec);
                            modifiedFields = clientRec.copyFrom(serverRec);
                            if (commitRecords) {
                                recordModifiedFields.push(modifiedFields);
                            }
                        }
                    } else {
                        for (i = 0, len = clientRecords.length; i < len; ++i) {
                            clientRec = clientRecords[i];
                            serverRec = serverRecords[i];
                            if (clientRec && serverRec) {
                                modifiedFields = me.updateRecord(clientRec, serverRec);
                                if (commitRecords) {
                                    recordModifiedFields.push(modifiedFields);
                                }
                            }
                        }
                    }
                } else {
                    modifiedFields = me.updateRecord(clientRecords[0], serverRecords[0]);
                    if (commitRecords) {
                        recordModifiedFields[0] = modifiedFields;
                    }
                }

                if (commitRecords) {
                    for (index = clientRecords.length; index--; ) {
                        clientRecords[index].commit(false, recordModifiedFields[index]);
                    }
                }
            }
        }
    },
    updateRecord: function (clientRec, serverRec) {
        if (serverRec && (clientRec.phantom || clientRec.getId() === serverRec.getId())) {
            return clientRec.copyFrom(serverRec);
        }
        return [];
    },
    matchClientRec: function (record) {
        var clientRec = this,
                clientRecordId = clientRec.getId();

        if (clientRecordId && record.getId() === clientRecordId) {
            return true;
        }
        return record.internalId === clientRec.internalId;
    },
    setStarted: function () {
        this.started = true;
        this.running = true;
    },
    setCompleted: function () {
        this.complete = true;
        this.running = false;
    },
    setSuccessful: function () {
        this.success = true;
    },
    setException: function (error) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = error;
    },
    hasException: function () {
        return this.exception === true;
    },
    getError: function () {
        return this.error;
    },
    getRecords: function () {
        var resultSet = this.getResultSet();
        return this.records || (resultSet ? resultSet.records : null);
    },
    getResultSet: function () {
        return this.resultSet;
    },
    isStarted: function () {
        return this.started === true;
    },
    isRunning: function () {
        return this.running === true;
    },
    isComplete: function () {
        return this.complete === true;
    },
    wasSuccessful: function () {
        return this.isComplete() && this.success === true;
    },
    setBatch: function (batch) {
        this.batch = batch;
    },
    allowWrite: function () {
        return this.action !== 'read';
    }
});
Ext.define('Ext.data.validations', {
    singleton: true,
    presenceMessage: 'must be present',
    lengthMessage: 'is the wrong length',
    formatMessage: 'is the wrong format',
    inclusionMessage: 'is not included in the list of acceptable values',
    exclusionMessage: 'is not an acceptable value',
    emailMessage: 'is not a valid email address',
    emailRe: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    presence: function (config, value) {
        if (arguments.length === 1) {
            value = config;
        }

        return !!value || value === 0 || value === false;
    },
    length: function (config, value) {
        if (value === undefined || value === null) {
            return false;
        }

        var length = value.length,
                min = config.min,
                max = config.max;

        if ((min && length < min) || (max && length > max)) {
            return false;
        } else {
            return true;
        }
    },
    email: function (config, email) {
        return Ext.data.validations.emailRe.test(email);
    },
    format: function (config, value) {
        return !!(config.matcher && config.matcher.test(value));
    },
    inclusion: function (config, value) {
        return config.list && Ext.Array.indexOf(config.list, value) !== -1;
    },
    exclusion: function (config, value) {
        return config.list && Ext.Array.indexOf(config.list, value) === -1;
    }
});
Ext.define('Ext.util.AbstractMixedCollection', {
    requires: ['Ext.util.Filter'],
    mixins: {
        observable: 'Ext.util.Observable'
    },
    isMixedCollection: true,
    generation: 0,
    indexGeneration: 0,
    constructor: function (allowFunctions, keyFn) {
        var me = this;
        if (arguments.length === 1 && Ext.isObject(allowFunctions)) {
            me.initialConfig = allowFunctions;
            Ext.apply(me, allowFunctions);
        }
        else {
            me.allowFunctions = allowFunctions === true;
            if (keyFn) {
                me.getKey = keyFn;
            }
            me.initialConfig = {
                allowFunctions: me.allowFunctions,
                getKey: me.getKey
            };
        }

        me.items = [];
        me.map = {};
        me.keys = [];
        me.indexMap = {};
        me.length = 0;
        me.mixins.observable.constructor.call(me);
    },
    allowFunctions: false,
    add: function (key, obj) {
        var len = this.length,
                out;

        if (arguments.length === 1) {
            out = this.insert(len, key);
        } else {
            out = this.insert(len, key, obj);
        }
        return out;
    },
    getKey: function (o) {
        return o.id;
    },
    replace: function (key, o) {
        var me = this,
                old,
                index;

        if (arguments.length === 1) {
            o = arguments[0];
            key = me.getKey(o);
        }
        old = me.map[key];
        if (typeof key === 'undefined' || key === null || typeof old === 'undefined') {
            return me.add(key, o);
        }
        me.generation++;
        index = me.indexOfKey(key);
        me.items[index] = o;
        me.map[key] = o;
        if (me.hasListeners.replace) {
            me.fireEvent('replace', key, old, o);
        }
        return o;
    },
    updateKey: function (oldKey, newKey) {
        var me = this,
                map = me.map,
                index = me.indexOfKey(oldKey),
                indexMap = me.indexMap,
                item;

        if (index > -1) {
            item = map[oldKey];
            delete map[oldKey];
            delete indexMap[oldKey];
            map[newKey] = item;
            indexMap[newKey] = index;
            me.keys[index] = newKey;
            me.indexGeneration = ++me.generation;
        }
    },
    addAll: function (objs) {
        var me = this,
                key;

        if (arguments.length > 1 || Ext.isArray(objs)) {
            me.insert(me.length, arguments.length > 1 ? arguments : objs);
        } else {
            for (key in objs) {
                if (objs.hasOwnProperty(key)) {
                    if (me.allowFunctions || typeof objs[key] !== 'function') {
                        me.add(key, objs[key]);
                    }
                }
            }
        }
    },
    each: function (fn, scope) {
        var items = Ext.Array.push([], this.items),
                i = 0,
                len = items.length,
                item;

        for (; i < len; i++) {
            item = items[i];
            if (fn.call(scope || item, item, i, len) === false) {
                break;
            }
        }
    },
    eachKey: function (fn, scope) {
        var keys = this.keys,
                items = this.items,
                i = 0,
                len = keys.length;

        for (; i < len; i++) {
            fn.call(scope || window, keys[i], items[i], i, len);
        }
    },
    findBy: function (fn, scope) {
        var keys = this.keys,
                items = this.items,
                i = 0,
                len = items.length;

        for (; i < len; i++) {
            if (fn.call(scope || window, items[i], keys[i])) {
                return items[i];
            }
        }
        return null;
    },
    find: function () {
        if (Ext.isDefined(Ext.global.console)) {
            Ext.global.console.warn('Ext.util.MixedCollection: find has been deprecated. Use findBy instead.');
        }
        return this.findBy.apply(this, arguments);
    },
    insert: function (index, key, obj) {
        var out;
        if (Ext.isIterable(key)) {
            out = this.doInsert(index, key, obj);
        } else {
            if (arguments.length > 2) {
                out = this.doInsert(index, [key], [obj]);
            } else {
                out = this.doInsert(index, [key]);
            }
            out = out[0];
        }
        return out;
    },
    doInsert: function (index, keys, objects) {
        var me = this,
                itemKey,
                removeIndex,
                i, len = keys.length,
                deDupedLen = len,
                fireAdd = me.hasListeners.add,
                syncIndices,
                newKeys = {},
                passedDuplicates,
                oldKeys, oldObjects;

        if (objects !== null) {
            me.useLinearSearch = true;
        }
        else {
            objects = keys;
            keys = new Array(len);
            for (i = 0; i < len; i++) {
                keys[i] = this.getKey(objects[i]);
            }
        }
        me.suspendEvents();
        for (i = 0; i < len; i++) {
            itemKey = keys[i];
            removeIndex = me.indexOfKey(itemKey);
            if (removeIndex !== -1) {
                if (removeIndex < index) {
                    index--;
                }
                me.removeAt(removeIndex);
            }

            if (itemKey !== null) {
                if (newKeys[itemKey] !== null) {
                    passedDuplicates = true;
                    deDupedLen--;
                }
                newKeys[itemKey] = i;
            }
        }
        me.resumeEvents();
        if (passedDuplicates) {
            oldKeys = keys;
            oldObjects = objects;
            keys = new Array(deDupedLen);
            objects = new Array(deDupedLen);
            i = 0;
            for (itemKey in newKeys) {
                keys[i] = oldKeys[newKeys[itemKey]];
                objects[i] = oldObjects[newKeys[itemKey]];
                i++;
            }
            len = deDupedLen;
        }
        syncIndices = index === me.length && me.indexGeneration === me.generation;
        Ext.Array.insert(me.items, index, objects);
        Ext.Array.insert(me.keys, index, keys);
        me.length += len;
        me.generation++;
        if (syncIndices) {
            me.indexGeneration = me.generation;
        }
        for (i = 0; i < len; i++, index++) {
            itemKey = keys[i];
            if (itemKey !== null) {
                me.map[itemKey] = objects[i];
                if (syncIndices) {
                    me.indexMap[itemKey] = index;
                }
            }
            if (fireAdd) {
                me.fireEvent('add', index, objects[i], itemKey);
            }
        }
        return objects;
    },
    remove: function (o) {
        var me = this,
                removeKey,
                index;
        if (!me.useLinearSearch && (removeKey = me.getKey(o))) {
            index = me.indexOfKey(removeKey);
        }
        else {
            index = Ext.Array.indexOf(me.items, o);
        }

        return (index === -1) ? false : me.removeAt(index);
    },
    removeAll: function (items) {
        var me = this,
                i;

        if (items || me.hasListeners.remove) {
            if (items) {
                for (i = items.length - 1; i >= 0; --i) {
                    me.remove(items[i]);
                }
            } else {
                while (me.length) {
                    me.removeAt(0);
                }
            }
        } else {
            me.length = me.items.length = me.keys.length = 0;
            me.map = {};
            me.indexMap = {};
            me.generation++;
            me.indexGeneration = me.generation;
        }
    },
    removeAt: function (index) {
        var me = this,
                o,
                key;

        if (index < me.length && index >= 0) {
            me.length--;
            o = me.items[index];
            Ext.Array.erase(me.items, index, 1);
            key = me.keys[index];
            if (typeof key !== 'undefined') {
                delete me.map[key];
            }
            Ext.Array.erase(me.keys, index, 1);
            if (me.hasListeners.remove) {
                me.fireEvent('remove', o, key);
            }
            me.generation++;
            return o;
        }
        return false;
    },
    removeRange: function (index, removeCount) {
        var me = this,
                o,
                key,
                i,
                limit,
                syncIndices,
                trimming;

        if (index < me.length && index >= 0) {
            if (!removeCount) {
                removeCount = 1;
            }
            limit = Math.min(index + removeCount, me.length);
            removeCount = limit - index;
            trimming = limit === me.length;
            syncIndices = trimming && me.indexGeneration === me.generation;
            for (i = index; i < limit; i++) {
                key = me.keys[i];
                if (key !== null) {
                    delete me.map[key];
                    if (syncIndices) {
                        delete me.indexMap[key];
                    }
                }
            }
            o = me.items[i - 1];

            me.length -= removeCount;
            me.generation++;
            if (syncIndices) {
                me.indexGeneration = me.generation;
            }
            if (trimming) {
                me.items.length = me.keys.length = me.length;
            } else {
                me.items.splice(index, removeCount);
                me.keys.splice(index, removeCount);
            }
            return o;
        }
        return false;
    },
    removeAtKey: function (key) {
        var me = this,
                keys = me.keys,
                i;
        if (key === null) {
            for (i = keys.length - 1; i >= 0; i--) {
                if (keys[i] === null) {
                    me.removeAt(i);
                }
            }
        }
        else {
            return me.removeAt(me.indexOfKey(key));
        }
    },
    getCount: function () {
        return this.length;
    },
    indexOf: function (o) {
        var me = this,
                key;

        if (o !== null) {
            if (!me.useLinearSearch && (key = me.getKey(o))) {
                return this.indexOfKey(key);
            }
            return Ext.Array.indexOf(me.items, o);
        }
        return -1;
    },
    indexOfKey: function (key) {
        if (!this.map.hasOwnProperty(key)) {
            return -1;
        }
        if (this.indexGeneration !== this.generation) {
            this.rebuildIndexMap();
        }
        return this.indexMap[key];
    },
    rebuildIndexMap: function () {
        var me = this,
                indexMap = me.indexMap = {},
                keys = me.keys,
                len = keys.length,
                i;

        for (i = 0; i < len; i++) {
            indexMap[keys[i]] = i;
        }
        me.indexGeneration = me.generation;
    },
    get: function (key) {
        var me = this,
                mk = me.map[key],
                item = mk !== undefined ? mk : (typeof key === 'number') ? me.items[key] : undefined;
        return typeof item !== 'function' || me.allowFunctions ? item : null; 
    },
    getAt: function (index) {
        return this.items[index];
    },
    getByKey: function (key) {
        return this.map[key];
    },
    contains: function (o) {
        var me = this,
                key;

        if (o !== null) {
            if (!me.useLinearSearch && (key = me.getKey(o))) {
                return this.map[key] !== null;
            }
            return Ext.Array.indexOf(this.items, o) !== -1;
        }

        return false;
    },
    containsKey: function (key) {
        return this.map.hasOwnProperty(key);
    },
    clear: function () {
        var me = this;
        if (me.generation) {
            me.length = 0;
            me.items = [];
            me.keys = [];
            me.map = {};
            me.indexMap = {};
            me.generation++;
            me.indexGeneration = me.generation;
        }
        if (me.hasListeners.clear) {
            me.fireEvent('clear');
        }
    },
    first: function () {
        return this.items[0];
    },
    last: function () {
        return this.items[this.length - 1];
    },
    sum: function (property, root, start, end) {
        var values = this.extractValues(property, root),
                length = values.length,
                sum = 0,
                i;

        start = start || 0;
        end = (end || end === 0) ? end : length - 1;

        for (i = start; i <= end; i++) {
            sum += values[i];
        }
        return sum;
    },
    collect: function (property, root, allowNull) {
        var values = this.extractValues(property, root),
                length = values.length,
                hits = {},
                unique = [],
                value, strValue, i;

        for (i = 0; i < length; i++) {
            value = values[i];
            strValue = String(value);

            if ((allowNull || !Ext.isEmpty(value)) && !hits[strValue]) {
                hits[strValue] = true;
                unique.push(value);
            }
        }

        return unique;
    },
    extractValues: function (property, root) {
        var values = this.items;

        if (root) {
            values = Ext.Array.pluck(values, root);
        }

        return Ext.Array.pluck(values, property);
    },
    hasRange: function (start, end) {
        return (end < this.length);
    },
    getRange: function (start, end) {
        var me = this,
                items = me.items,
                range = [],
                len = items.length,
                tmp, reverse;

        if (len < 1) {
            return range;
        }

        if (start > end) {
            reverse = true;
            tmp = start;
            start = end;
            end = tmp;
        }

        if (start < 0) {
            start = 0;
        }
        if (end === null || end >= len) {
            end = len - 1;
        }
        range = items.slice(start, end + 1);
        if (reverse && range.length) {
            range.reverse();
        }
        return range;
    },
    filter: function (property, value, anyMatch, caseSensitive) {
        var filters = [];
        if (Ext.isString(property)) {
            filters.push(new Ext.util.Filter({
                property: property,
                value: value,
                anyMatch: anyMatch,
                caseSensitive: caseSensitive
            }));
        } else if (Ext.isArray(property) || property instanceof Ext.util.Filter) {
            filters = filters.concat(property);
        }
        return this.filterBy(Ext.util.Filter.createFilterFn(filters));
    },
    filterBy: function (fn, scope) {
        var me = this,
                newMC = new me.self(me.initialConfig),
                keys = me.keys,
                items = me.items,
                length = items.length,
                i;

        newMC.getKey = me.getKey;

        for (i = 0; i < length; i++) {
            if (fn.call(scope || me, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }
        newMC.useLinearSearch = me.useLinearSearch;
        return newMC;
    },
    findIndex: function (property, value, start, anyMatch, caseSensitive) {
        if (Ext.isEmpty(value, false)) {
            return -1;
        }
        value = this.createValueMatcher(value, anyMatch, caseSensitive);
        return this.findIndexBy(function (o) {
            return o && value.test(o[property]);
        }, null, start);
    },
    findIndexBy: function (fn, scope, start) {
        var me = this,
                keys = me.keys,
                items = me.items,
                i = start || 0,
                len = items.length;

        for (; i < len; i++) {
            if (fn.call(scope || me, items[i], keys[i])) {
                return i;
            }
        }
        return -1;
    },
    createValueMatcher: function (value, anyMatch, caseSensitive, exactMatch) {
        if (!value.exec) {
            var er = Ext.String.escapeRegex;
            value = String(value);

            if (anyMatch === true) {
                value = er(value);
            } else {
                value = '^' + er(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
        }
        return value;
    },
    clone: function () {
        var me = this,
                copy = new me.self(me.initialConfig);
        copy.add(me.keys, me.items);
        copy.useLinearSearch = me.useLinearSearch;
        return copy;
    }
});


