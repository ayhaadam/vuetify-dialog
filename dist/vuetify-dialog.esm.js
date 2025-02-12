import Vue from 'vue';
import { VDialog, VIcon, VBtn, VSpacer, VCardActions, VCard, VCardText, VToolbar, VToolbarTitle, VAlert, VSnackbar, VCardTitle, VTextField, VProgressLinear } from 'vuetify/lib';

var Recordable = {
  computed: {
    $parameters: function $parameters  () {
      return this.$attrs || this.$options.propsData || this.$props || {}
    },
    isNewRecord: function () {
      // console.log(this.$attrs, this.$props)
      // const data = this.$attrs || this.$options.propsData || this.$props
      return !this.$parameters || !this.$parameters[this.$options.primaryKey]
    }
  }
};

var Activable = {
  name: 'Activable',

  data: function data () {
    return {
      isActive: false
    }
  },

  watch: {
    isActive: function isActive (val) {
      if (this._dialogInstance) {
        if (this._dialogInstance.isActive !== undefined) {
          this._dialogInstance.isActive = val;
        }
      } else {
        if (this.$parent && this.$parent.isActive !== undefined) {
          this.$parent.isActive = val;
        }
      }
    }
  },

  methods: {
    close: function close () {
      this.isActive = false;
    }
  }
};

var Layoutable = {
  name: 'Layoutable',
  mixins: [Activable],
  inheritAttrs: false,

  props: {
    width: {
      type: [String, Number],
      default: function () { return 450; }
    },
    persistent: Boolean
  },

  data: function data () {
    return {
      loading: false
    }
  },

  computed: {
    isLayout: function isLayout () {
      return true
    },
    getWidth: function getWidth () {
      return typeof this.width === 'string' ? this.width : this.width + 'px'
    }
  },

  watch: {
    isActive: function isActive (val) {
      if (!val) {
        this._destroy();
      }
    }
  },

  mounted: function mounted () {
    this.isActive = true;
  },

  methods: {
    _destroy: function _destroy () {
      this.$destroy();
    },
    dismiss: function dismiss () {
      if (!this.persistent && !this.loading) {
        this.isActive = false;
      }
    },
    close: function close () {
      this.isActive = false;
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (typeof this.$el.remove === 'function') {
      this.$el.remove();
    } else if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

//
//
//
//
//
//

var script = {
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "dialog-layout" },
    [
      _c(
        "dialog-child",
        _vm._b({ ref: "dialog" }, "dialog-child", _vm.$options.propsData, false)
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

/*
 * vue-asyncable
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * Some functions was imported from nuxt.js/lib/app/utils.js
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var isFunction = function (fn) { return typeof fn === 'function'; };

var isNil = function (s) { return s === null || s === undefined; };

var isPromise = function (promise) {
  return promise && (promise instanceof Promise || typeof promise.then === 'function')
};

/*
 * vue-asyncable
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * Some functions was imported from nuxt.js/lib/app/utils.js
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

function promisify (fn, context) {
  var promise;
  if (isFunction(fn)) {
    promise = fn.call(this, context);
  } else {
    promise = fn;
  }

  if (!isPromise(promise)) {
    if (typeof promise === 'object') {
      return checkObjectForPromises.call(this, promise, context)
    } else {
      promise = Promise.resolve(promise);
    }
  }

  var self = this;
  return promise.then(function (data) {
    return checkObjectForPromises.call(self, data)
  })
}

function hasAsync (obj) {
  if (!obj || typeof obj !== 'object') {
    return false
  }
  for (var key in obj) {
    if (isPromise(obj[key]) || isFunction(obj[key])) { // } || isFunction(obj[key])) {
      return true
    }
  }
  return false
}

function checkObjectForPromises (obj, context) {
  var this$1 = this;
  if ( context === void 0 ) { context = {}; }

  var promises = [];
  var self = this;
  var data = {};
  if (typeof obj !== 'object') {
    return obj
  }
  var loop = function ( key ) {
    var something = obj[key];
    // data[key] = null
    if (isFunction(something)) {
      something = something.call(this$1, context);
    }
    if (isPromise(something)) {
      something = something.then(function (res) {
        if (isNil(res)) {
          return
        }
        if (key.startsWith('...')) {
          data = Object.assign({}, data, res);
        } else {
          data[key] = res;
        }
        return res
      });
      if (isFunction(context.asyncDataError)) {
        something = something.catch(function (error) {
          return context.asyncDataError.call(self, error, { key: key, obj: obj })
        });
      }
      promises.push(something);
    } else {
      if (context.deep && hasAsync(something)) {
        promises.push(checkObjectForPromises.call(self, something, context).then(function (res) {
          data[key] = res;
        }));
      } else {
        data[key] = something;
      }
    }
  };

  for (var key in obj) { loop( key ); }
  return Promise.all(promises).then(function () {
    return Promise.resolve(data)
  })
}

/*
 * vue-asyncable
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * Some functions was imported from nuxt.js/lib/app/utils.js
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

function applyComponentAsyncData (Component, asyncData) {
  var ComponentData = Component.options._originDataFn || Component.options.data || function () { return {} };
  Component.options._originDataFn = ComponentData;

  if (!asyncData) {
    Component.options.data = ComponentData;
  } else {
    Component.options.data = function () {
      var data = ComponentData.call(this);
      return Object.assign({}, data, asyncData)
    };

    if (Component._Ctor && Component._Ctor.options) {
      Component._Ctor.options.data = Component.options.data;
    }
  }
}

var hasAsyncPreload = function (options) {
  return Boolean(options.asyncData || options.fetch) // !options.__hasAsyncData && (
};

var ensureComponentAsyncData = function (Component, context) {
  var promises = [];

  if (Component.options.asyncData) {
    var promise = promisify(Component.options.asyncData, context);
    promise.then(function (asyncDataResult) {
      applyComponentAsyncData(Component, asyncDataResult);
      return asyncDataResult
    });
    promises.push(promise);
  }

  // Call fetch(context)
  if (Component.options.fetch) {
    promises.push(Component.options.fetch(context));
  }
  // Component.options.__hasAsyncData = true
  return Promise.all(promises)
};

/*
 * vuedl
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * Some functions was imported from nuxt.js/lib/app/utils.js
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

function destroyVueElement (vm) {
  if (vm && !vm._isDestroyed && (typeof vm.$destroy === 'function')) {
    vm.$destroy();
  }
}

function findContainer (container) {
  var found;
  if (typeof container === 'string') {
    found = document.querySelector(container);
  } else {
    found = container;
  }
  if (!found) {
    found = document.body;
  }
  return found
}

// todo
// export function middlewareSeries (promises, appContext) {
//   if (!promises.length || appContext._redirected || appContext._errored) {
//     return Promise.resolve()
//   }
//   return promisify(promises[0], appContext)
//     .then(() => {
//       return middlewareSeries(promises.slice(1), appContext)
//     })
// }

/*
 * vuedl
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var seed = 1;
var Dialog = function Dialog (component, ref) {
  if ( ref === void 0 ) ref = {};
  var layout = ref.layout;
  var container = ref.container;

  if (!component) {
    throw Error('Component was not set')
  }
  this._layout = layout || { component: __vue_component__, options: {} };
  this._component = component;
  this._vm = null;
  this._vmDialog = null;
  this._options = {};
  this.id = ++seed;
  this._resolvers = [];
  this.container = findContainer(container);
};

var prototypeAccessors = { showed: { configurable: true },element: { configurable: true },hasAsyncPreload: { configurable: true },vm: { configurable: true },vmd: { configurable: true } };

Dialog.prototype.show = async function show (params, options) {
    if ( params === void 0 ) params = {};
    if ( options === void 0 ) options = {};

  if (Vue.prototype.$isServer) {
    return
  }

  // create dialog
  var Component = this._component;
  if (typeof Component === 'object' && !Component.options) {
    Component = Vue.extend(Object.assign({}, this._component));
  }
  // add primary key mixin
  if (Component.options.primaryKey) {
    Component = Component.extend({ mixins: [Recordable] });
  }
  if (this.hasAsyncPreload) {
    await ensureComponentAsyncData(Component, Object.assign({}, this.context, {params: params}));
  }
  // create layout
  var LayoutCtor = Vue.extend({
    mixins: [Layoutable],
    components: {
      'dialog-child': Component
    }
  });
  LayoutCtor = LayoutCtor.extend(this._layout.component);

  Component.options.inheritAttrs = false;

  var propsData = Object.assign({}, this._layout.options, params, (options && options.propsData));
  var layout = new LayoutCtor(Object.assign({}, this.context,
    options,
    {propsData: propsData}));

  layout.$mount();
  var dialog = layout.$refs.dialog;
  // if (!dialog) {
  // throw Error('You heave to provide dialog-child component in layout: <dialog-child v-bind="$options.propsData" ref="dialog" />')
  // }

  layout.$on('hook:destroyed', this._onDestroyed.bind(this));
  layout.$on('submit', this.onReturn.bind(this));
  dialog && dialog.$on('submit', this.onReturn.bind(this));

  this._vm = layout;
  this._vm._dialogInstance = dialog;
  this._vmDialog = dialog;
  var container = params.container ? findContainer(params.container) : this.container;
  container.appendChild(layout.$el);
  return this
};

Dialog.prototype.wait = function wait () {
    var this$1 = this;

  return new Promise(function (resolve) {
    this$1._resolvers.push(resolve);
  })
};

Dialog.prototype._onDestroyed = function _onDestroyed () {
  this.remove();
};

Dialog.prototype.remove = function remove () {
  this.onDestroyed && this.onDestroyed(this);
  this._processResultPromises();
  destroyVueElement(this._vm);
  destroyVueElement(this._vmDialog);
  this._vm = null;
  this._vmDialog = null;
};

Dialog.prototype._processResultPromises = function _processResultPromises (result) {
  if (!this._resolvers.length) {
    return
  }
  this._resolvers.forEach(function (resolver) { return resolver(result); });
  this._resolvers = [];
};

Dialog.prototype.onReturn = function onReturn (result) {
  this._processResultPromises(result);
  this.close();
};

prototypeAccessors.showed.get = function () {
  return !!this._vm && !this._vm._isDestroyed
};

prototypeAccessors.element.get = function () {
  return this._vm && this._vm.$el
};

prototypeAccessors.hasAsyncPreload.get = function () {
  return this._component && hasAsyncPreload(this._component.options || this._component)
};

prototypeAccessors.vm.get = function () {
  return this._vm
};

prototypeAccessors.vmd.get = function () {
  return this._vmDialog
};

Dialog.prototype.close = function close () {
  this._vm && this._vm.close();
};

Object.defineProperties( Dialog.prototype, prototypeAccessors );

/*
 * vuedl
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var Overlay = function Overlay (component) {
  this._component = component;
  this._vm = null;
};

Overlay.prototype.show = function show () {
  if (!this._vm) {
    var Ctor = Vue.extend(this._component);
    this._vm = new Ctor();
    this._vm.$mount();
    document.body.appendChild(this._vm.$el);
  }
  this._vm.visible = true;
};

Overlay.prototype.hide = function hide () {
  this._vm.visible = false;
};

Overlay.prototype.destroy = function destroy () {
  if (this._vm) {
    this._vm.$el.parentNode.removeChild(this._vm.$el);
    this._vm.$destroy();
    this._vm = null;
  }
};

/*
 * vuedl
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var DialogManager = function DialogManager (ref) {
  if ( ref === void 0 ) ref = {};
  var context = ref.context;
  var container = ref.container;

  this._context = context || {};
  Dialog.prototype.context = context || {};
  this._components = {};
  this._layouts = {};
  this._overlays = {};
  this._container = container;
  this._emitter = new Vue({});
  this._instances = [];
};

var prototypeAccessors$1 = { context: { configurable: true } };

prototypeAccessors$1.context.get = function () {
  return this._context
};

DialogManager.prototype.layout = function layout (name, component, options) {
    if ( options === void 0 ) options = {};

  this._layouts[name] = { component: component, options: options };
};

DialogManager.prototype.getLayout = function getLayout (layout) {
  if (typeof layout === 'function') {
    var options = layout.call(this._context);
    layout = this._layouts[options.name || 'default'];
    return Object.assign({}, layout, {options: options})
  }

  if (typeof layout === 'object' && typeof layout.render === 'function') {
    return { component: layout }
  }

  if (Array.isArray(layout)) {
    var nameTmp = layout[0];
    var optionsTmp = layout[1] || {};
    var instance =
      (typeof nameTmp === 'object' && typeof nameTmp.render === 'function')
        ? { component: nameTmp }
        : this._layouts[nameTmp];
    return instance && {
      component: instance.component,
      options: Object.assign({}, instance.options, optionsTmp)
    }
  }
  return this._layouts[layout]
};

DialogManager.prototype.overlay = function overlay (name, component) {
  if (component === undefined) {
    if (this._overlays[name]) {
      return this._overlays[name]
    } else {
      throw new Error(("Overlay \"" + name + " not found\n          Please register it by calling dialog.overlay('" + name + "', component)"))
    }
  }
  this._overlays[name] = new Overlay(component);
};

DialogManager.prototype.getComponent = function getComponent (name) {
  if (!this._components[name]) {
    throw new Error(("Component \"" + name + "\" was not found.\n        Please register it by calling dialog.register('" + name + "', component)"))
  }
  return this._components[name]
};

DialogManager.prototype.component = function component (name, component$1, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

  if (component$1 === undefined) {
    return this._components[name]
  }
  this._components[name] = { component: component$1, options: options };
  Object.defineProperty(this, name, {
    get: function () { return this$1.createFunctionWrapper(name); },
    configurable: true
  });
};

DialogManager.prototype.getComponentProperty = function getComponentProperty (component, name) {
  return component.options ? component.options[name] : component[name]
};

DialogManager.prototype.create = function create (component) {
  if (!component) {
    throw new Error('Component is incorrect')
  }

  var layout = this.getLayout(this.getComponentProperty(component, 'layout') || 'default');
  var dlg = new Dialog(component, {
    layout: layout,
    context: this._context,
    container: this._container
  });
  this._emitter.$emit('created', { dialog: dlg });
  return dlg
};

DialogManager.prototype.show = async function show (component, params) {
    if ( params === void 0 ) params = {};

  var dlg = this.create(component);
  var overlayName = dlg.hasAsyncPreload ? (this.getComponentProperty(component, 'overlay') || 'default') : false;
  var overlay = overlayName && this._overlays[overlayName] && this.overlay(overlayName);

  overlay && overlay.show();
  try {
    await dlg.show(params);
    this._emitter.$emit('shown', { dialog: dlg });
    overlay && overlay.hide();
    dlg.onDestroyed = this.onDialogDestroyed.bind(this);
    return params.waitForResult ? dlg.wait() : dlg
  } catch (e) {
    this._emitter.$emit('error', { error: e, dialog: dlg });
    overlay && overlay.hide();
    throw e
  }
};

DialogManager.prototype.createFunctionWrapper = function createFunctionWrapper (name) {
    var this$1 = this;

  var cmp = this.getComponent(name);
  return function (options) {
    return this$1.show(cmp.component, Object.assign({}, cmp.options, options))
  }
};

DialogManager.prototype.showAndWait = async function showAndWait (component, props) {
  var dlg = await this.show(component, props);
  return dlg.wait()
};

DialogManager.prototype.on = function on (event, callback) {
  this._emitter.$on(event, callback);
};

DialogManager.prototype.off = function off (event, callback) {
  this._emitter.$off(event, callback);
};

DialogManager.prototype.once = function once (event, callback) {
  this._emitter.$once(event, callback);
};

DialogManager.prototype.onDialogDestroyed = function onDialogDestroyed (dialog) {
  this._emitter.$emit('destroyed', { dialog: dialog });
};

Object.defineProperties( DialogManager.prototype, prototypeAccessors$1 );

//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'VDialogOverlay',
  props: {
    zIndex: {
      type: Number,
      default: function () { return 1250; }
    },
    visible: {
      type: Boolean,
      default: function () { return false; }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "opacity" } }, [
    _vm.visible
      ? _c(
          "div",
          {
            staticClass: "dialog-overlay-loading",
            style: { zIndex: _vm.zIndex }
          },
          [_vm._v("\n    Loading…\n  ")]
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

/* @vue/component */
var Returnable = {
  name: 'Returnable',

  props: {
    returnValue: null
  },

  data: function data () {
    return {
      originalValue: this.returnValue,
      returnResovers: []
    }
  },

  methods: {
    return: function return$1 (value) {
      this.originalValue = value;
      this.$root.$emit('submit', this.originalValue);
      this.$emit('submit', this.originalValue);
    }
  }
};

var Actionable = {
  name: 'Actionable',

  mixins: [Returnable],

  data: function data () {
    return {
      loadingAction: null
    }
  },

  props: {
    actions: {
      type: [Array, Object, Function],
      default: function () { return []; }
    },
    handle: Function, // todo: remove this parameter in next version
    handler: Function,
    params: Object
  },

  computed: {
    actionlist: function actionlist () {
      var actions = [];
      var acts = typeof this.actions === 'function' ? this.actions(this) : (this.actions || []);
      for (var key in acts) { // eslint-disable-line
        var action = acts[key];
        if (['string', 'boolean'].includes(typeof action)) {
          action = { text: action };
        }
        if (!action.key) {
          action.key = isNaN(key) ? key : (action.text || key);
        }
        if (['true', 'false'].indexOf(action.key) >= 0) {
          action.key = JSON.parse(action.key);
        }
        if (!this.isActionVisible(action)) {
          continue
        }
        if (typeof action.icon === 'string') {
          action.icon = {
            text: action.icon
          };
        }
        actions.push(action);
      }
      return actions
    }
  },

  created: function created () {
    if (this.handle) {
      console.warn('DEPRECATED: "handle" prop will be deprecated, please use "handler" instead');
    }
  },

  methods: {
    trigger: function trigger (name) {
      var action = this.actionlist.find(function (action) { return action.key === name; });
      if (action && !this.isActionDisabled(action) && this.isActionVisible(action)) {
        this.onActionClick(action);
      }
    },
    setLoadingToInstance: function setLoadingToInstance (vm, value) {
      if (vm && vm.loading !== undefined) {
        vm.loading = value;
      }
    },
    setLoadingState: function setLoadingState (value) {
      this.$emit('loading', value);
      !value && (this.loadingAction = null);
      this.setLoadingToInstance(this.$root, value);
      this.setLoadingToInstance(this.$root._dialogInstance, value);
    },
    get: function get (param, def) {
      if (param === undefined) {
        return def
      }
      if (typeof param === 'function') {
        return param(this.params)
      }
      return param
    },
    isActionDisabled: function isActionDisabled (action) {
      return this.get(action.disabled, false)
    },
    isActionVisible: function isActionVisible (action) {
      return this.get(action.visible, true)
    },
    isActionInLoading: function isActionInLoading (action) {
      return this.loadingAction === action.key || this.get(action.loading)
    },
    onActionClick: async function onActionClick (action) {
      var closable = action.closable === undefined || action.closable === true;
      var handler = action.handle || action.handler || this.handle || this.handler;
      if (typeof handler === 'function') {
        this.loadingAction = action.key;
        this.setLoadingState(true);
        try {
          var ret = await handler(this.params, action);
          this.setLoadingState(false);
          if (ret !== false && closable) {
            this.return(ret || action.key);
          }
        } catch (e) {
          this.setLoadingState(false);
          console.error('error', e); // TODO
          throw e
        }
      } else {
        closable && this.return(action.key);
      }
    }
  }
};

var Confirmable = {
  name: 'Confirmable',

  props: {
    type: {
      type: String
    },
    text: {
      type: [String, Function],
      reqiured: true
    },
    title: {
      type: String
    },
    actions: {
      type: [Array, Object, Function]
    }
  }
};

var notifications = [];

var gap = 10;

var insertNotification = function (vm) {
  var position = vm.position;
  var verticalOffset = gap;
  notifications.filter(function (item) { return item.position === position; }).forEach(function (item) {
    verticalOffset += item.$el.offsetHeight + gap;
  });
  notifications.push(vm);
  vm.verticalOffset = verticalOffset;
};

var deleteNotification = function (vm) {
  var index = notifications.findIndex(function (instance) { return instance === vm; });
  if (index < 0) {
    return
  }
  notifications.splice(index, 1);
  var len = notifications.length;
  var position = vm.position;
  if (!len) { return }

  var verticalOffset = gap;
  notifications.filter(function (item) { return item.position === position; }).forEach(function (item) {
    item.verticalOffset = verticalOffset;
    verticalOffset += item.$el.offsetHeight + gap;
  });
};

var Notifiable = {
  props: {
    verticalOffset: Number,
    showClose: {
      type: Boolean,
      default: function () { return true; }
    },
    position: {
      type: String,
      default: function () { return 'top-right'; }
    },
    timeout: {
      type: [Number, Boolean],
      default: function () { return 4500; }
    },
    width: {
      type: Number,
      default: function () { return 330; }
    },
    zIndex: {
      type: Number,
      default: function () { return 2000; }
    }
  },
  data: function data () {
    return {
      activeTimeout: null
    }
  },
  computed: {
    horizontalClass: function horizontalClass () {
      return this.position.indexOf('right') > -1 ? 'right' : 'left'
    },
    verticalProperty: function verticalProperty () {
      return /^top-/.test(this.position) ? 'top' : 'bottom'
    },
    getStyle: function getStyle () {
      var obj;

      return ( obj = {}, obj[this.verticalProperty] = ((this.verticalOffset) + "px"), obj['max-width'] = ((this.width) + "px"), obj['z-index'] = this.zIndex, obj )
    }
  },
  methods: {
    _destroy: function _destroy () {
      this.$el.addEventListener('transitionend', this.onTransitionEnd);
    },
    onTransitionEnd: function onTransitionEnd () {
      this.$el.removeEventListener('transitionend', this.onTransitionEnd);
      this.$destroy();
    },
    clearTimer: function clearTimer () {
      clearTimeout(this.activeTimeout);
    },
    startTimer: function startTimer () {
      if (this.timeout > 0) {
        this.activeTimeout = setTimeout(this.close, this.timeout);
      }
    },
    keydown: function keydown (e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer(); // delete key
      } else if (e.keyCode === 27) { // esc key
        this.close();
      } else {
        this.startTimer(); // any key
      }
    },
    close: function close () {
      this.isActive = false;
    }
  },
  watch: {
    isActive: function isActive (val) {
      if (val) {
        insertNotification(this);
      } else {
        deleteNotification(this);
      }
    }
  },
  mounted: function mounted () {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keydown', this.keydown);
  }
};

// Import vue components

// install function executed by Vue.use()
function install (Vue, options) {
  if ( options === void 0 ) options = {};

  if (install.installed) { return }
  install.installed = true;
  var property = options.property || '$dialog';
  var manager = new DialogManager(options);

  manager.overlay('default', __vue_component__$1);
  if (!Vue.prototype[property]) {
    Object.defineProperty(Vue.prototype, property, {
      get: function get () {
        return manager
      },
      configurable: true
    });
  } else {
    console.warn(("Property " + property + " is already defined in Vue prototype"));
  }
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

//

var script$2 = {
  components: {
    VDialog: VDialog
  },
  props: {
    fullscreen: Boolean,
    scrollable: Boolean,
    hideOverlay: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    },
    showClose: {
      type: Boolean,
      default: function () { return true; }
    }
  },
  methods: {
    _destroy: function _destroy () {
      var this$1 = this;

      // Allow to draw transition, cause vuetify doesn't have onClose method
      setTimeout(function () {
        this$1.$destroy();
      }, 1000);
      // this.$refs.vdialog.$refs.dialog.addEventListener('transitionend', this.onTransitionEnd)
    }
    // onTransitionEnd (event) {
    //   if (['opacity', 'z-index'].indexOf(event.propertyName) >= 0) {
    //     this.$refs.vdialog.$refs.dialog.removeEventListener('transitionend', this.onTransitionEnd)
    //     this.$destroy()
    //   }
    // }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-dialog",
    {
      ref: "vdialog",
      attrs: {
        eager: "",
        "content-class": "vuedl-layout",
        fullscreen: _vm.fullscreen,
        "max-width": _vm.getWidth,
        persistent: _vm.persistent || _vm.loading,
        scrollable: _vm.scrollable,
        transition: _vm.transition,
        "hide-overlay": _vm.hideOverlay,
        "retain-focus": false
      },
      on: {
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          return _vm.dismiss($event)
        }
      },
      model: {
        value: _vm.isActive,
        callback: function($$v) {
          _vm.isActive = $$v;
        },
        expression: "isActive"
      }
    },
    [
      _c(
        "div",
        { staticClass: "v-dialog-wrapper" },
        [
          _vm.showClose && !_vm.persistent && !_vm.loading
            ? _c(
                "div",
                {
                  staticClass: "vuedl-layout__closeBtn",
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      return _vm.close($event)
                    }
                  }
                },
                [_vm._v("\n      ×\n    ")]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "dialog-child",
            _vm._b(
              { ref: "dialog" },
              "dialog-child",
              _vm.$options.propsData,
              false
            )
          )
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var Colorable = {
  props: {
    type: String,
    color: String
  },
  computed: {
    getColor: function getColor () {
      return this.color || this.type
    }
  }
};

var Iconable = {
  props: {
    icon: {
      type: [String, Boolean],
      default: undefined
    },
    type: String
  },
  computed: {
    getIcon: function getIcon () {
      if (this.icon === false) {
        return
      }
      return this.icon || (this.$vuetify && this.$vuetify.icons && this.$vuetify.icons.values[this.type]) || this.type
    }
  }
};

//

var script$3 = {
  components: {
    VIcon: VIcon,
    VBtn: VBtn
  },
  props: {
    attrs: Object,
    component: {
      type: [String, Object],
      default: 'v-btn'
    },
    text: [String, Function],
    disabled: Boolean,
    flat: Boolean,
    icon: Object,
    on: {
      type: Object,
      default: function () {}
    }
  },
  computed: {
    actionText: function actionText () {
      return typeof this.text === 'function' ? this.text() : this.text
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.component,
    _vm._g(
      _vm._b(
        {
          tag: "component",
          attrs: {
            text: _vm.flat,
            icon: !_vm.text && Boolean(_vm.icon),
            disabled: _vm.disabled,
            rounded: ""
          },
          on: {
            click: function($event) {
              return _vm.$emit("click", this)
            }
          }
        },
        "component",
        _vm.$attrs,
        false
      ),
      _vm.on
    ),
    [
      _vm.icon && !_vm.icon.right
        ? _c(
            "v-icon",
            _vm._b(
              { domProps: { textContent: _vm._s(_vm.icon.text) } },
              "v-icon",
              _vm.icon,
              false
            )
          )
        : _vm._e(),
      _vm._v("\n  " + _vm._s(_vm.actionText) + "\n  "),
      _vm.icon && _vm.icon.right
        ? _c(
            "v-icon",
            _vm._b(
              { domProps: { textContent: _vm._s(_vm.icon.text) } },
              "v-icon",
              _vm.icon,
              false
            )
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$4 = {
  components: {
    DialogAction: __vue_component__$3,
    VSpacer: VSpacer,
    VCardActions: VCardActions
  },
  mixins: [Actionable],
  props: {
    component: [String, Object],
    color: String,
    flat: Boolean,
    rounded: Boolean,
    outlined: Boolean,
    passive: Boolean,
    block: Boolean,
    large: Boolean,
    small: Boolean
  },
  computed: {
    nestedProps: function nestedProps () {
      return [
        'color',
        'flat',
        'rounded',
        'outlined',
        'icon',
        'block',
        'small',
        'large',
        'x-small',
        'x-large'
      ]
    }
  },
  methods: {
    getActionProps: function getActionProps (action) {
      var this$1 = this;

      var res = {
        component: action.component || this.component,
        text: action.text
      };
      this.nestedProps.forEach(function (key) {
        if (action[key] || this$1[key]) {
          res[key] = action[key] === undefined ? this$1[key] : action[key];
        }
      });
      return res
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.actionlist && Object.keys(_vm.actionlist).length
    ? _c(
        "v-card-actions",
        [
          !_vm.actions.spacer ? _c("v-spacer") : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.actionlist, function(action) {
            return [
              action.key === "spacer"
                ? _c("v-spacer", { key: action.key })
                : _c(
                    "DialogAction",
                    _vm._b(
                      {
                        key: action.key,
                        class: { loading: _vm.loadingAction === action.key },
                        attrs: {
                          "action-key": "" + action.key,
                          loading:
                            !_vm.passive && _vm.isActionInLoading(action),
                          disabled:
                            _vm.isActionDisabled(action) ||
                            (!_vm.passive && Boolean(_vm.loadingAction))
                        },
                        on: {
                          click: function($event) {
                            return _vm.onActionClick(action)
                          }
                        }
                      },
                      "DialogAction",
                      _vm.getActionProps(action),
                      false
                    )
                  )
            ]
          })
        ],
        2
      )
    : _vm._e()
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$5 = {
  components: {
    DialogActions: __vue_component__$4,
    VCard: VCard,
    VCardText: VCardText,
    VToolbar: VToolbar,
    VToolbarTitle: VToolbarTitle,
    VIcon: VIcon
  },
  layout: ['default', { width: 450 }],
  mixins: [Iconable, Confirmable, Colorable],
  props: {
    actionOptions: Object,
    text: {
      type: [String, Function],
      required: true,
      default: ''
    }
  },
  computed: {
    getText: function getText () {
      return typeof this.text === 'function' ? this.text() : this.text
    }
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { attrs: { tile: "", outlined: "", rounded: "xl" } },
    [
      _vm.title
        ? _c(
            "v-toolbar",
            {
              attrs: {
                dark: Boolean(_vm.getColor),
                color: "transparent",
                flat: ""
              }
            },
            [
              Boolean(_vm.getIcon)
                ? _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("\n      " + _vm._s(_vm.getIcon) + "\n    ")
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("v-toolbar-title", { staticClass: "font-weight-bold" }, [
                _vm._v("\n      " + _vm._s(_vm.title) + "\n    ")
              ])
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("v-card-text", {
        staticClass: "body-1 py-2",
        class: { "pt-4": !_vm.title },
        domProps: { innerHTML: _vm._s(_vm.text) }
      }),
      _vm._v(" "),
      _c(
        "DialogActions",
        _vm._b(
          { attrs: { actions: _vm.actions } },
          "DialogActions",
          _vm.actionOptions,
          false
        )
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//


var script$6 = {
  layout: 'snackbar',
  props: {
    text: String
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { domProps: { innerHTML: _vm._s(_vm.text) } })
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$7 = {
  components: {
    DialogActions: __vue_component__$4,
    VAlert: VAlert
  },
  mixins: [Iconable],
  layout: ['notification', { showClose: false }],
  props: {
    color: {
      type: String,
      default: 'info'
    },
    actions: {
      type: [Array, Object],
      default: function () { return ({}); }
    },
    text: {
      type: String,
      default: ''
    },
    outlined: Boolean,
    prominent: Boolean,
    dismissible: {
      type: Boolean,
      default: true
    },
    flat: Boolean,
    border: String,
    tile: Boolean,
    dense: Boolean
  }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-alert",
    {
      staticStyle: { margin: "0", "min-width": "300px" },
      attrs: {
        dismissible: _vm.dismissible,
        type: _vm.color,
        icon: _vm.getIcon,
        outlined: _vm.outlined,
        prominent: _vm.prominent,
        text: _vm.flat,
        border: _vm.border,
        tile: _vm.tile,
        dense: _vm.dense
      },
      on: {
        input: function($event) {
          return _vm.$emit("submit")
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "d-flex align-center" },
        [
          _c("div", {
            staticClass: "mr-2",
            domProps: { innerHTML: _vm._s(_vm.text) }
          }),
          _vm._v(" "),
          _c("DialogActions", { attrs: { actions: _vm.actions } })
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$8 = {
  components: {
    VSnackbar: VSnackbar,
    DialogActions: __vue_component__$4
  },
  mixins: [Colorable, Confirmable],
  props: {
    timeout: {
      type: Number,
      default: 5000
    },
    position: String,
    multiLine: Boolean,
    vertical: Boolean,
    elevation: [Number, String],
    flat: Boolean,
    centered: Boolean,
    rounded: [Boolean, String],
    outlined: Boolean,
    shaped: Boolean,
    dark: Boolean,
  },
  data: function data () {
    var position = this.position || this.$options.propsData.position || '';
    return {
      top: position.indexOf('top') !== -1,
      left: position.indexOf('left') !== -1,
      right: position.indexOf('right') !== -1,
      bottom: position.indexOf('bottom') !== -1
    }
  },
  methods: {
    _destroy: function _destroy () {
      var this$1 = this;

      setTimeout(function () {
        this$1.$destroy();
      }, 500);
    }
  }
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-snackbar",
    {
      staticClass: "application",
      attrs: {
        timeout: _vm.timeout,
        color: _vm.getColor,
        top: _vm.top,
        left: _vm.left,
        right: _vm.right,
        bottom: _vm.bottom,
        "multi-line": _vm.multiLine,
        vertical: _vm.vertical,
        elevation: _vm.elevation,
        text: _vm.flat,
        centered: _vm.centered,
        rounded: _vm.rounded,
        outlined: _vm.outlined,
        shaped: _vm.shaped,
        dark: _vm.dark
      },
      on: { click: _vm.dismiss },
      model: {
        value: _vm.isActive,
        callback: function($$v) {
          _vm.isActive = $$v;
        },
        expression: "isActive"
      }
    },
    [
      _c(
        "dialog-child",
        _vm._b({ ref: "dialog" }, "dialog-child", _vm.$options.propsData, false)
      ),
      _vm._v(" "),
      _c("DialogActions", {
        attrs: { slot: "action", actions: _vm.actions },
        slot: "action"
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$9 = {
  inheritAttrs: false,
  components: {
    DialogActions: __vue_component__$4,
    VCard: VCard,
    VCardTitle: VCardTitle,
    VCardText: VCardText
  },
  props: {
    title: String,
    flat: Boolean,
    innerScroll: Boolean,
    titleClass: [String, Object],
    actions: [Array, Object, Function],
    actionOptions: {
      type: Object,
      default: function () { return ({
        flat: true
      }); }
    },
    handle: Function, // todo: remove this parameter in next version
    handler: Function
  },
  created: function created () {
    if (this.handle) {
      console.warn('DEPRECATED: "handle" prop will be deprecated, please use "handler" instead');
    }
  },
  methods: {
    trigger: function trigger (name) {
      this.$refs.actions && this.$refs.actions.trigger(name);
    }
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { class: { "v-inner-scroll": _vm.innerScroll }, attrs: { flat: _vm.flat } },
    [
      _vm._t("title", [
        _vm.title
          ? _c("v-card-title", { class: _vm.titleClass }, [
              _vm._v("\n      " + _vm._s(_vm.title) + "\n    ")
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("v-card-text", [_vm._t("default")], 2),
      _vm._v(" "),
      _vm.actions
        ? _c(
            "DialogActions",
            _vm._b(
              {
                ref: "actions",
                attrs: {
                  actions: _vm.actions,
                  handler: _vm.handler || _vm.handle
                }
              },
              "DialogActions",
              _vm.actionOptions,
              false
            )
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("footer")
    ],
    2
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$a = {
  components: {
    DialogCard: __vue_component__$9,
    VTextField: VTextField
  },
  layout: 'default',
  mixins: [Confirmable],
  props: {
    value: String,
    rules: Array,
    textField: Object,
    titleClass: [String, Object],
    autofocus: {
      type: Boolean,
      default: true
    }
  },
  data: function data () {
    return {
      editedValue: this.value
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    if (this.autofocus) {
      setTimeout(function () {
        this$1.$refs.input.focus();
      }, 100);
    }
  },
  methods: {
    onEnter: function onEnter () {
      this.$refs.card.$refs.actions.trigger(true);
    },
    handlerClick: function handlerClick (res, action) {
      if (!action.key) {
        this.$emit('submit', action.key);
      }
      var valid = this.rules ? this.$refs.input.validate() : true;
      if (!valid) {
        this.$refs.input.focus();
        return false
      }
      this.$emit('submit', action.key ? this.editedValue : action.key);
    }
  }
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "DialogCard",
        {
          ref: "card",
          attrs: {
            title: _vm.title,
            actions: _vm.actions,
            handler: _vm.handlerClick,
            "title-class": _vm.titleClass
          }
        },
        [
          _c(
            "v-text-field",
            _vm._b(
              {
                ref: "input",
                attrs: { rules: _vm.rules, label: _vm.text },
                on: {
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    $event.stopPropagation();
                    return _vm.onEnter($event)
                  }
                },
                model: {
                  value: _vm.editedValue,
                  callback: function($$v) {
                    _vm.editedValue = $$v;
                  },
                  expression: "editedValue"
                }
              },
              "v-text-field",
              _vm.textField,
              false
            )
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$b = {
  layout: ['default', {
    hideOverlay: true,
    persistent: true,
    width: 300
  }],
  components: {
    VCard: VCard,
    VCardText: VCardText,
    VProgressLinear: VProgressLinear
  },
  props: {
    text: String,
    dark: {
      type: Boolean,
      default: true
    },
    color: String
  }
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { attrs: { color: _vm.color, dark: _vm.dark } },
    [
      _c(
        "v-card-text",
        [
          _vm._v("\n    " + _vm._s(_vm.text) + "\n    "),
          _c("v-progress-linear", {
            staticClass: "mb-0",
            attrs: { indeterminate: "", color: _vm.dark ? "white" : "primary" }
          })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$c = {
  mixins: [Notifiable],
  props: {
    width: {
      type: Number,
      default: function () { return 500; }
    }
  },
  computed: {
    getStyle: function getStyle () {
      var obj;

      return ( obj = {}, obj[this.verticalProperty] = ((this.verticalOffset) + "px"), obj['max-width'] = ((this.width) + "px"), obj['z-index'] = this.zIndex, obj )
    }
  }
};

/* script */
var __vue_script__$c = script$c;
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition",
    {
      attrs: { name: "vuedl-notification-fade" },
      on: { "after-leave": _vm.onTransitionEnd }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }
          ],
          class: ["vuedl-notification", _vm.horizontalClass],
          style: _vm.getStyle,
          attrs: { role: "alert" },
          on: { mouseenter: _vm.clearTimer, mouseleave: _vm.startTimer }
        },
        [
          _c(
            "dialog-child",
            _vm._b(
              { ref: "dialog" },
              "dialog-child",
              _vm.$options.propsData,
              false
            )
          ),
          _vm._v(" "),
          _vm.showClose
            ? _c("div", {
                staticClass: "vuedl-notification__closeBtn",
                domProps: { innerHTML: _vm._s("×") },
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.close($event)
                  }
                }
              })
            : _vm._e()
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  var __vue_inject_styles__$c = undefined;
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

function install$1 (Vue, options) {
  if ( options === void 0 ) options = {};

  if (install$1.installed) { return }
  install$1.installed = true;
  if (!options.container) {
    options.container = '[data-app=true]';
  }
  var property = options.property || '$dialog';
  var actionsFn = options.actions || (function () {
    return {
      false: 'Cancel',
      true: {
        text: 'OK',
        color: 'primary'
      }
    }
  });
  var actionOptions = options.actionOptions || {
    flat: true
  };

  Vue.use(plugin, options);
  var manager = Vue.prototype[property];
  manager.layout('default', __vue_component__$2);
  manager.layout('snackbar', __vue_component__$8);
  manager.layout('notification', __vue_component__$c);
  Vue.component('DialogActions', __vue_component__$4);
  Vue.component('DialogCard', __vue_component__$9);
  manager.component('confirm', __vue_component__$5, Object.assign({}, {waitForResult: true,
    actions: actionsFn,
    actionOptions: actionOptions},
    options.confirm));

  manager.component('warning', __vue_component__$5, Object.assign({}, {type: 'warning',
    waitForResult: true,
    actions: actionsFn,
    actionOptions: actionOptions},
    options.warning));

  manager.component('error', __vue_component__$5, Object.assign({}, {type: 'error',
    waitForResult: true,
    actions: ['Close'],
    actionOptions: actionOptions},
    options.error));

  manager.component('info', __vue_component__$5, Object.assign({}, {type: 'info',
    waitForResult: true,
    actions: ['Ok'],
    actionOptions: actionOptions},
    options.info));

  manager.component('toast', __vue_component__$6, Object.assign({}, {waitForResult: true,
    actionOptions: actionOptions},
    options.toast));

  manager.component('loading', __vue_component__$b, Object.assign({}, {waitForResult: false},
    options.loading));

  manager.withLoading = function (options, callback) {
    return manager.loading(options).then(function (dlg) {
      callback()
        .then(function (res) {
          dlg.close();
          return res
        })
        .catch(function (e) {
          dlg.close();
          throw e
        });
    })
  };

  manager.message = {
    info: function (message, options) { return manager.toast(Object.assign({}, {text: message, color: 'info'}, options)); },
    error: function (message, options) { return manager.toast(Object.assign({}, {text: message, color: 'error'}, options)); },
    success: function (message, options) { return manager.toast(Object.assign({}, {text: message, color: 'success'}, options)); },
    warning: function (message, options) { return manager.toast(Object.assign({}, {text: message, color: 'warning'}, options)); }
  };

  manager.component('notification', __vue_component__$7, Object.assign({}, {waitForResult: true},
    options.notification));

  manager.notify = {
    info: function (message, options) { return manager.notification(Object.assign({}, {text: message, color: 'info'}, options)); },
    error: function (message, options) { return manager.notification(Object.assign({}, {text: message, color: 'error'}, options)); },
    success: function (message, options) { return manager.notification(Object.assign({}, {text: message, color: 'success'}, options)); },
    warning: function (message, options) { return manager.notification(Object.assign({}, {text: message, color: 'warning'}, options)); }
  };

  manager.component('prompt', __vue_component__$a, Object.assign({}, {waitForResult: true,
    actions: actionsFn},
    options.prompt));
}

var Plugin = {
  install: install$1
};

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

export default Plugin;
