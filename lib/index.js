(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-redux"), require("reselect"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react-redux", "reselect", "react"], factory);
	else if(typeof exports === 'object')
		exports["redux-datagrid"] = factory(require("react-redux"), require("reselect"), require("react"));
	else
		root["redux-datagrid"] = factory(root["react-redux"], root["reselect"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reduxDatagrid = exports.reducer = undefined;

	var _reducer2 = __webpack_require__(1);

	var _reducer3 = _interopRequireDefault(_reducer2);

	var _connect = __webpack_require__(2);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.reducer = _reducer3.default;
	exports.reduxDatagrid = _connect2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {};

	var initGridState = function initGridState() {
	  return {
	    searchText: '',
	    sortBy: '',
	    groupBy: ''
	  };
	};

	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  if (!/redux-datagrid\//.test(action.type)) {
	    return state;
	  }

	  var name = action.payload.name;

	  if (action.type === 'redux-datagrid/INIT') {
	    return _extends({}, state, _defineProperty({}, name, initGridState()));
	  }

	  if (!state[name]) {
	    throw new Error('Action "' + action.type + '" called with uninitialized grid "' + name + '"');
	  }

	  switch (action.type) {
	    case 'redux-datagrid/CHANGE_SEARCH_TEXT':
	      return _extends({}, state, _defineProperty({}, name, _extends({}, state[name], {
	        searchText: action.payload.text
	      })));

	    case 'redux-datagrid/CHANGE_SORT_BY':
	      return _extends({}, state, _defineProperty({}, name, _extends({}, state[name], {
	        sortBy: action.payload.value
	      })));

	    case 'redux-datagrid/CHANGE_GROUP_BY':
	      return _extends({}, state, _defineProperty({}, name, _extends({}, state[name], {
	        groupBy: action.payload.value
	      })));

	    default:
	      return state;
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactRedux = __webpack_require__(3);

	var _selectors = __webpack_require__(4);

	var _datagridWrapper = __webpack_require__(6);

	var _datagridWrapper2 = _interopRequireDefault(_datagridWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createConnectedGrid = function createConnectedGrid(_ref, Component) {
	  var name = _ref.name;
	  var columns = _ref.columns;

	  var _createSelectors = (0, _selectors.createSelectors)();

	  var filteredDataSelector = _createSelectors.filteredDataSelector;
	  var groupedDataSelector = _createSelectors.groupedDataSelector;
	  var columnsSelector = _createSelectors.columnsSelector;
	  var sortBySelector = _createSelectors.sortBySelector;
	  var groupBySelector = _createSelectors.groupBySelector;


	  return (0, _reactRedux.connect)(function (state, props) {
	    var gridState = state.datagrid[name];

	    if (!gridState) {
	      return {};
	    }

	    var selectorData = {
	      state: gridState,
	      props: props,
	      options: { name: name, columns: columns }
	    };

	    return {
	      filteredData: filteredDataSelector(selectorData),
	      groupedData: groupedDataSelector(selectorData),
	      columns: columnsSelector(selectorData),
	      sortBy: sortBySelector(selectorData),
	      groupBy: groupBySelector(selectorData),
	      fullData: props.data,
	      name: name,
	      searchText: gridState.searchText,
	      Component: Component
	    };
	  }, {
	    handleSearchTextChange: function handleSearchTextChange(e) {
	      return {
	        type: 'redux-datagrid/CHANGE_SEARCH_TEXT',
	        payload: { name: name, text: e.target.value }
	      };
	    },
	    handleGroupByChange: function handleGroupByChange(e) {
	      return {
	        type: 'redux-datagrid/CHANGE_GROUP_BY',
	        payload: { name: name, value: e.target.value }
	      };
	    },
	    handleSortByChange: function handleSortByChange(e) {
	      return {
	        type: 'redux-datagrid/CHANGE_SORT_BY',
	        payload: { name: name, value: e.target.value }
	      };
	    },
	    initDatagrid: function initDatagrid() {
	      return {
	        type: 'redux-datagrid/INIT',
	        payload: { name: name }
	      };
	    }
	  })(_datagridWrapper2.default);
	};

	var reduxDatagrid = function reduxDatagrid(options) {
	  return function (GridComponent) {
	    return createConnectedGrid(options, GridComponent);
	  };
	};

	exports.default = reduxDatagrid;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createSelectors = createSelectors;

	var _reselect = __webpack_require__(5);

	var columnDefaults = {
	  cellDataGetter: function cellDataGetter(row, dataKey) {
	    return row[dataKey];
	  }
	};

	var searchIndex = function searchIndex(columns) {
	  return function (object) {
	    return columns.reduce(function (words, col) {
	      var s = col.cellDataGetter(object, col.dataKey);
	      if (!s) {
	        return words;
	      }

	      return words + ' ' + s.toString().trim().toLowerCase();
	    }, '');
	  };
	};

	function findColumn(dataKey, columns) {
	  if (!dataKey) {
	    return null;
	  }

	  var n = columns.length;

	  for (var i = 0; i < n; i++) {
	    if (columns[i].dataKey === dataKey) {
	      return columns[i];
	    }
	  }

	  return null;
	}

	var createDefaultPropSelector = function createDefaultPropSelector(stateKey, propKey, defaultValue) {
	  return function (_ref) {
	    var state = _ref.state;
	    var props = _ref.props;

	    if (state[stateKey]) {
	      return state[stateKey];
	    }

	    if (props[propKey]) {
	      return props[propKey];
	    }

	    return defaultValue;
	  };
	};

	var columnsInputSelector = function columnsInputSelector(_ref2) {
	  var props = _ref2.props;
	  var options = _ref2.options;

	  if (props.columns) {
	    return props.columns;
	  }

	  if (options.columns) {
	    return options.columns;
	  }

	  throw new Error('Redux Datagrid must be passed "columns" either\n   as props or in createConnectedGrid()');
	};

	function createSelectors() {
	  var columnsSelector = (0, _reselect.createSelector)(columnsInputSelector, function (columnDefs) {
	    return columnDefs.map(function (col) {
	      if (typeof col === 'string') {
	        return _extends({}, columnDefaults, {
	          dataKey: col
	        });
	      }

	      if (!col || !col.dataKey || typeof col.dataKey !== 'string') {
	        throw new Error('Columns defs must either be a string or an object with\n                        a dataKey string');
	      }

	      return _extends({}, columnDefaults, col);
	    });
	  });

	  var searchTextSelector = function searchTextSelector(_ref3) {
	    var state = _ref3.state;
	    return state.searchText;
	  };
	  var searchTermSelector = (0, _reselect.createSelector)(searchTextSelector, function (text) {
	    return text.trim().toLowerCase();
	  });
	  var dataSelector = function dataSelector(_ref4) {
	    var props = _ref4.props;
	    return props.data;
	  };

	  var sortBySelector = createDefaultPropSelector('sortBy', 'defaultSortBy', '');

	  var sortByColumnSelector = (0, _reselect.createSelector)(sortBySelector, columnsSelector, findColumn);

	  var groupBySelector = createDefaultPropSelector('groupBy', 'defaultGroupBy', '');

	  var groupByColumnSelector = (0, _reselect.createSelector)(groupBySelector, columnsSelector, findColumn);

	  var sortedDataSelector = (0, _reselect.createSelector)(sortByColumnSelector, dataSelector, function (sortByColumn, data) {
	    if (sortByColumn === null) {
	      return data;
	    }

	    return data.slice().sort(function (a, b) {
	      var aa = sortByColumn.cellDataGetter(a, sortByColumn.dataKey);
	      var bb = sortByColumn.cellDataGetter(b, sortByColumn.dataKey);

	      if (aa === bb) {
	        return 0;
	      }

	      return aa > bb ? 1 : -1;
	    });
	  });

	  var dataWordIndexSelector = (0, _reselect.createSelector)(sortedDataSelector, columnsSelector, function (data, columns) {
	    var index = searchIndex(columns);
	    return data.reduce(function (acc, object) {
	      acc.push(index(object));
	      return acc;
	    }, []);
	  });

	  var filteredDataSelector = (0, _reselect.createSelector)(sortedDataSelector, dataWordIndexSelector, searchTermSelector, function (data, dataWords, searchText) {
	    if (!searchText) {
	      return data;
	    }

	    return data.filter(function (row, i) {
	      return dataWords[i].search(searchText) >= 0;
	    });
	  });

	  var groupedDataSelector = (0, _reselect.createSelector)(groupByColumnSelector, filteredDataSelector, function (groupByColumn, data) {
	    if (groupByColumn === null) {
	      return null;
	    }

	    return data.reduce(function (groups, object) {
	      var key = groupByColumn.cellDataGetter(object, groupByColumn.dataKey);
	      if (!groups[key]) {
	        groups[key] = [object];
	      } else {
	        groups[key].push(object);
	      }

	      return groups;
	    }, {});
	  });

	  return {
	    columnsSelector: columnsSelector,
	    filteredDataSelector: filteredDataSelector,
	    groupedDataSelector: groupedDataSelector,
	    sortBySelector: sortBySelector,
	    groupBySelector: groupBySelector
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var string = _React$PropTypes.string;
	var any = _React$PropTypes.any;
	var array = _React$PropTypes.array;
	var object = _React$PropTypes.object;

	var DatagridWrapper = function (_React$Component) {
	  _inherits(DatagridWrapper, _React$Component);

	  function DatagridWrapper() {
	    _classCallCheck(this, DatagridWrapper);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DatagridWrapper).apply(this, arguments));
	  }

	  _createClass(DatagridWrapper, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (!this.props.Component) {
	        this.props.initDatagrid();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var Component = _props.Component;
	      var initDatagrid = _props.initDatagrid;
	      var // eslint-disable-line no-unused-vars
	      columns = _props.columns;
	      var name = _props.name;
	      var searchText = _props.searchText;
	      var sortBy = _props.sortBy;
	      var groupBy = _props.groupBy;
	      var handleSearchTextChange = _props.handleSearchTextChange;
	      var handleGroupByChange = _props.handleGroupByChange;
	      var handleSortByChange = _props.handleSortByChange;
	      var filteredData = _props.filteredData;
	      var fullData = _props.fullData;
	      var groupedData = _props.groupedData;

	      var otherProps = _objectWithoutProperties(_props, ['Component', 'initDatagrid', 'columns', 'name', 'searchText', 'sortBy', 'groupBy', 'handleSearchTextChange', 'handleGroupByChange', 'handleSortByChange', 'filteredData', 'fullData', 'groupedData']);

	      if (!Component) {
	        return null;
	      }

	      var datagridProps = {
	        name: name,
	        columns: columns,
	        data: fullData,
	        filtered: filteredData,
	        grouped: groupedData,
	        controls: {
	          search: {
	            value: searchText,
	            onChange: handleSearchTextChange
	          },
	          sortBy: {
	            value: sortBy,
	            onChange: handleSortByChange
	          },
	          groupBy: {
	            value: groupBy,
	            onChange: handleGroupByChange
	          }
	        }
	      };

	      return _react2.default.createElement(Component, _extends({ datagrid: datagridProps }, otherProps));
	    }
	  }]);

	  return DatagridWrapper;
	}(_react2.default.Component);

	DatagridWrapper.propTypes = {
	  Component: func,
	  initDatagrid: func,
	  columns: array,
	  name: string,
	  searchText: string,
	  sortBy: string,
	  groupBy: string,
	  handleSearchTextChange: func,
	  handleGroupByChange: func,
	  handleSortByChange: func,
	  filteredData: any, // should be array or array like (i.e. Immutable.List)
	  fullData: any, // ditto
	  groupedData: object
	};
	exports.default = DatagridWrapper;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;