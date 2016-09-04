'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _mobx = require('mobx');

var _inferno = require('inferno');

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoDom = require('inferno-dom');

var _infernoDom2 = _interopRequireDefault(_infernoDom);

var _infernoComponent = require('inferno-component');

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _mobxInferno = require('mobx-inferno');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var root = document.createElement('div');
document.body.appendChild(root);

/**
 *
 *  MarkdownView Component
 *  @observer
 *
 */

var MarkdownView = (0, _mobxInferno.observer)(_class = function (_Component) {
  _inherits(MarkdownView, _Component);

  function MarkdownView() {
    _classCallCheck(this, MarkdownView);

    return _possibleConstructorReturn(this, (MarkdownView.__proto__ || Object.getPrototypeOf(MarkdownView)).apply(this, arguments));
  }

  _createClass(MarkdownView, [{
    key: 'render',
    value: function render() {
      return {/* < ... /> */};
    }
  }]);

  return MarkdownView;
}(_infernoComponent2.default)) || _class;

/**
 *
 *  Document mobX Store
 *  @observable, @computed, @action
 *
 */

var Document = (_class2 = function () {
  function Document() {
    _classCallCheck(this, Document);

    _initDefineProp(this, 'title', _descriptor, this);

    _initDefineProp(this, 'content', _descriptor2, this);

    _initDefineProp(this, 'update', _descriptor3, this);

    this.renderer = new _marked.Renderer();
  }

  _createClass(Document, [{
    key: 'markedContent',
    value: function markedContent() {
      return (0, _marked2.default)(this.content, { renderer: this.renderer });
    }
  }]);

  return Document;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'content', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'markedContent', [_mobx.computed], Object.getOwnPropertyDescriptor(_class2.prototype, 'markedContent'), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'update', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    return function (data) {
      // ...
    };
  }
})), _class2);

/**
 *
 *  InfernoDOM Root Renderer
 *
 */

var bp0 = _inferno2.default.createBlueprint({
  tag: 'h1',
  children: {
    arg: 0
  }
});

_infernoDom2.default.render(bp0('Hello, my name is Steve.'), root);

/*

Block level renderer methods
code(code, string language)
blockquote(string quote)
html(string html)
heading(string text, number level)
hr()
list(string body, boolean ordered)
listitem(string text)
paragraph(string text)
table(string header, string body)
tablerow(string content)
tablecell(string content, object flags)

*/

mdRenderer.code = function (code, language) {
  //
};
mdRenderer.blockquote = function (quote) {
  //
};
mdRenderer.html = function (html) {
  //
};
mdRenderer.heading = function (text, level) {
  //
};
mdRenderer.hr = function () {
  //
};
mdRenderer.list = function (body, ordered) {
  //
};
mdRenderer.listitem = function (text) {
  //
};
mdRenderer.paragraph = function (text) {
  //
};
mdRenderer.table = function (header, body) {
  //
};
mdRenderer.tablerow = function (content) {
  //
};
mdRenderer.tablecell = function (content, flags) {}
//


/*

Inline level renderer methods
strong(string text)
em(string text)
codespan(string code)
br()
del(string text)
link(string href, string title, string text)
image(string href, string title, string text)

*/
;