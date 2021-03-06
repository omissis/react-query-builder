"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react"));

var Immutable = _interopRequire(require("immutable"));

var Item = _interopRequire(require("../components/Item"));

var TreeStore = _interopRequire(require("../stores/Tree"));

var Builder = (function (_React$Component) {
  function Builder(props) {
    _classCallCheck(this, Builder);

    _get(Object.getPrototypeOf(Builder.prototype), "constructor", this).call(this, props);

    this.state = {
      tree: TreeStore.getTree()
    };
  }

  _inherits(Builder, _React$Component);

  _createClass(Builder, {
    componentDidMount: {
      value: function componentDidMount() {
        TreeStore.addChangeListener(this.handleChange.bind(this));
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        TreeStore.removeChangeListener(this.handleChange.bind(this));
      }
    },
    handleChange: {
      value: function handleChange() {
        this.setState({
          tree: TreeStore.getTree()
        });
      }
    },
    render: {
      value: function render() {
        if (!this.state.tree) {
          return null;
        }

        var props = {
          id: this.state.tree.get("id"),
          children: this.state.tree.get("children"),
          ancestors: new Immutable.List(),
          type: this.state.tree.get("type"),
          properties: this.state.tree.get("properties"),
          config: this.props.config
        };

        return React.createElement(
          "div",
          { className: "query-builder" },
          React.createElement(Item, _extends({ key: props.id }, props))
        );
      }
    }
  });

  return Builder;
})(React.Component);

Builder.propTypes = {
  config: React.PropTypes.object.isRequired
};

module.exports = Builder;