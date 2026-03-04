"use strict";

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.MeadowConnectionSqliteBrowser = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {}, {}],
    2: [function (require, module, exports) {
      module.exports = {
        "name": "fable-serviceproviderbase",
        "version": "3.0.19",
        "description": "Simple base classes for fable services.",
        "main": "source/Fable-ServiceProviderBase.js",
        "scripts": {
          "start": "node source/Fable-ServiceProviderBase.js",
          "test": "npx quack test",
          "tests": "npx quack test -g",
          "coverage": "npx quack coverage",
          "build": "npx quack build",
          "types": "tsc -p ./tsconfig.build.json",
          "check": "tsc -p . --noEmit"
        },
        "types": "types/source/Fable-ServiceProviderBase.d.ts",
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase.git"
        },
        "keywords": ["entity", "behavior"],
        "author": "Steven Velozo <steven@velozo.com> (http://velozo.com/)",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase/issues"
        },
        "homepage": "https://github.com/stevenvelozo/fable-serviceproviderbase",
        "devDependencies": {
          "@types/mocha": "^10.0.10",
          "fable": "^3.1.62",
          "quackage": "^1.0.58",
          "typescript": "^5.9.3"
        }
      };
    }, {}],
    3: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      var libPackage = require('../package.json');
      var FableServiceProviderBase = /*#__PURE__*/function () {
        /**
         * The constructor can be used in two ways:
         * 1) With a fable, options object and service hash (the options object and service hash are optional)a
         * 2) With an object or nothing as the first parameter, where it will be treated as the options object
         *
         * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
         * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
         * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
         */
        function FableServiceProviderBase(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, FableServiceProviderBase);
          /** @type {import('fable')} */
          this.fable;
          /** @type {string} */
          this.UUID;
          /** @type {Record<string, any>} */
          this.options;
          /** @type {Record<string, any>} */
          this.services;
          /** @type {Record<string, any>} */
          this.servicesMap;

          // Check if a fable was passed in; connect it if so
          if (_typeof(pFable) === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // Initialize the services map if it wasn't passed in
          /** @type {Record<string, any>} */
          this._PackageFableServiceProvider = libPackage;

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = _typeof(pOptions) === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = _typeof(pFable) === 'object' && !pFable.isFable ? pFable : _typeof(pOptions) === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }

        /**
         * @param {import('fable')} pFable
         */
        return _createClass(FableServiceProviderBase, [{
          key: "connectFable",
          value: function connectFable(pFable) {
            if (_typeof(pFable) !== 'object' || !pFable.isFable) {
              var tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(_typeof(pFable), "].}");
              console.log(tmpErrorMessage);
              return new Error(tmpErrorMessage);
            }
            if (!this.fable) {
              this.fable = pFable;
            }
            if (!this.log) {
              this.log = this.fable.Logging;
            }
            if (!this.services) {
              this.services = this.fable.services;
            }
            if (!this.servicesMap) {
              this.servicesMap = this.fable.servicesMap;
            }
            return true;
          }
        }]);
      }();
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {
      "../package.json": 2
    }],
    4: [function (require, module, exports) {
      /**
       * BetterSqlite3Compat - Wraps a sql.js Database instance with an API
       * compatible with the subset of better-sqlite3 that the Meadow SQLite
       * provider and Meadow-Schema-SQLite use.
       *
       * better-sqlite3 API used by Meadow:
       *   db.prepare(sql).run(params)   → { lastInsertRowid, changes }
       *   db.prepare(sql).all(params)   → [ { col: val, ... }, ... ]
       *   db.prepare(sql).get(params)   → { col: val, ... } | undefined
       *   db.exec(sql)                  → void
       *
       * sql.js provides a different API:
       *   db.run(sql, params)           → void
       *   db.exec(sql, params)          → [ { columns, values } ]
       *   db.prepare(sql)               → Statement with step()/getAsObject()
       *   db.getRowsModified()          → number
       *
       * This wrapper bridges the two so the existing Meadow SQLite provider
       * and schema provider work unmodified in the browser.
       *
       * @license MIT
       */

      /**
       * Create a better-sqlite3 compatible wrapper around a sql.js Database.
       *
       * @param {object} pSqlJsDb - A sql.js Database instance
       * @returns {object} An object with .prepare(sql) and .exec(sql) compatible with Meadow
       */
      function createBetterSqlite3Compat(pSqlJsDb) {
        /**
         * Convert a FoxHound named-parameter object to sql.js format.
         *
         * better-sqlite3 expects params as { Name_w0: 'value' } matching `:Name_w0` in SQL.
         * sql.js expects params as { ':Name_w0': 'value' } — keys MUST include the colon.
         *
         * @param {object} pParams - The FoxHound parameters object
         * @returns {object|undefined} sql.js compatible parameter object
         */
        function convertParams(pParams) {
          if (!pParams || _typeof(pParams) !== 'object') {
            return undefined;
          }
          var tmpKeys = Object.keys(pParams);
          if (tmpKeys.length === 0) {
            return undefined;
          }
          var tmpConverted = {};
          for (var i = 0; i < tmpKeys.length; i++) {
            var tmpKey = tmpKeys[i];
            var tmpValue = pParams[tmpKey];

            // Coerce booleans to integers (SQLite doesn't have a boolean type)
            if (typeof tmpValue === 'boolean') {
              tmpValue = tmpValue ? 1 : 0;
            }
            // Coerce undefined to null
            else if (typeof tmpValue === 'undefined') {
              tmpValue = null;
            }

            // Add the colon prefix for sql.js named parameters
            // (skip if the key already starts with ':')
            if (tmpKey.charAt(0) === ':') {
              tmpConverted[tmpKey] = tmpValue;
            } else {
              tmpConverted[':' + tmpKey] = tmpValue;
            }
          }
          return tmpConverted;
        }

        /**
         * Convert positional arguments to an array for sql.js.
         *
         * better-sqlite3's .get() and .all() accept positional params as
         * individual arguments: stmt.get('val1', 'val2').
         * sql.js expects positional params as an array: ['val1', 'val2'].
         *
         * @param {Arguments} pArgs - The arguments object from the calling function
         * @returns {Array|undefined} Array of positional values, or undefined if none
         */
        function positionalParams(pArgs) {
          if (pArgs.length === 0) {
            return undefined;
          }
          var tmpArr = [];
          for (var i = 0; i < pArgs.length; i++) {
            var tmpVal = pArgs[i];
            if (typeof tmpVal === 'boolean') {
              tmpVal = tmpVal ? 1 : 0;
            } else if (typeof tmpVal === 'undefined') {
              tmpVal = null;
            }
            tmpArr.push(tmpVal);
          }
          return tmpArr;
        }

        /**
         * Determine the appropriate bind parameters for sql.js.
         *
         * If the first argument is a plain object (named params), convert with
         * colon-prefixed keys. Otherwise, treat all arguments as positional params.
         *
         * @param {Arguments} pArgs - The arguments object from the calling function
         * @returns {object|Array|undefined} sql.js compatible parameter binding
         */
        function resolveBindParams(pArgs) {
          if (pArgs.length === 0) {
            return undefined;
          }
          var tmpFirst = pArgs[0];

          // Named parameter object (not null, not array, plain object)
          if (tmpFirst !== null && _typeof(tmpFirst) === 'object' && !Array.isArray(tmpFirst)) {
            return convertParams(tmpFirst);
          }

          // Positional parameters
          return positionalParams(pArgs);
        }

        /**
         * Convert sql.js result format to an array of row objects.
         *
         * sql.js exec() returns: [ { columns: ['col1','col2'], values: [[v1,v2], ...] } ]
         * This converts to: [ { col1: v1, col2: v2 }, ... ]
         *
         * @param {Array} pResults - sql.js exec() result
         * @returns {Array<object>} Array of row objects
         */
        function resultsToRows(pResults) {
          if (!pResults || pResults.length === 0) {
            return [];
          }
          var tmpColumns = pResults[0].columns;
          var tmpValues = pResults[0].values;
          var tmpRows = [];
          for (var i = 0; i < tmpValues.length; i++) {
            var tmpRow = {};
            for (var j = 0; j < tmpColumns.length; j++) {
              tmpRow[tmpColumns[j]] = tmpValues[i][j];
            }
            tmpRows.push(tmpRow);
          }
          return tmpRows;
        }

        /**
         * Get the last insert rowid from sql.js.
         *
         * @returns {number} The rowid of the last inserted row
         */
        function getLastInsertRowid() {
          var tmpResult = pSqlJsDb.exec('SELECT last_insert_rowid() AS rowid');
          if (tmpResult.length > 0 && tmpResult[0].values.length > 0) {
            return tmpResult[0].values[0][0];
          }
          return 0;
        }
        return {
          /**
           * Prepare a SQL statement, returning an object with .run(), .all(), and .get().
           *
           * @param {string} pSQL - The SQL statement
           * @returns {object} A statement-like object with run(), all(), and get()
           */
          prepare: function prepare(pSQL) {
            return {
              /**
               * Execute a non-SELECT statement (INSERT, UPDATE, DELETE).
               *
               * Accepts either a named parameter object or positional arguments.
               *
               * @param {object} [pParams] - Named parameters
               * @returns {{ lastInsertRowid: number, changes: number }}
               */
              run: function run(pParams) {
                var tmpBindParams = resolveBindParams(arguments);
                try {
                  pSqlJsDb.run(pSQL, tmpBindParams);
                } catch (pError) {
                  console.error('[BetterSqlite3Compat] run() error:', pError.message, '\nSQL:', pSQL, '\nParams:', tmpBindParams);
                  throw pError;
                }
                return {
                  lastInsertRowid: getLastInsertRowid(),
                  changes: pSqlJsDb.getRowsModified()
                };
              },
              /**
               * Execute a SELECT statement and return all rows as objects.
               *
               * Accepts either a named parameter object or positional arguments.
               *
               * @param {object} [pParams] - Named parameters
               * @returns {Array<object>} Array of row objects
               */
              all: function all(pParams) {
                var tmpBindParams = resolveBindParams(arguments);
                var tmpResults;
                try {
                  tmpResults = pSqlJsDb.exec(pSQL, tmpBindParams);
                } catch (pError) {
                  console.error('[BetterSqlite3Compat] all() error:', pError.message, '\nSQL:', pSQL, '\nParams:', tmpBindParams);
                  throw pError;
                }
                return resultsToRows(tmpResults);
              },
              /**
               * Execute a SELECT statement and return the first row as an object,
               * or undefined if no rows match.
               *
               * Accepts either a named parameter object or positional arguments.
               *
               * @param {object|*} [pParams] - Named parameters or positional values
               * @returns {object|undefined} First row object, or undefined
               */
              get: function get(pParams) {
                var tmpBindParams = resolveBindParams(arguments);
                var tmpResults;
                try {
                  tmpResults = pSqlJsDb.exec(pSQL, tmpBindParams);
                } catch (pError) {
                  console.error('[BetterSqlite3Compat] get() error:', pError.message, '\nSQL:', pSQL, '\nParams:', tmpBindParams);
                  throw pError;
                }
                if (!tmpResults || tmpResults.length === 0 || tmpResults[0].values.length === 0) {
                  return undefined;
                }

                // Return first row as object
                var tmpColumns = tmpResults[0].columns;
                var tmpValues = tmpResults[0].values[0];
                var tmpRow = {};
                for (var j = 0; j < tmpColumns.length; j++) {
                  tmpRow[tmpColumns[j]] = tmpValues[j];
                }
                return tmpRow;
              }
            };
          },
          /**
           * Execute a raw SQL statement directly (used for CREATE TABLE, etc.).
           *
           * @param {string} pSQL - The SQL statement
           * @param {object} [pParams] - Optional named parameters
           */
          exec: function exec(pSQL, pParams) {
            var tmpBindParams = convertParams(pParams);
            pSqlJsDb.run(pSQL, tmpBindParams);
          }
        };
      }
      module.exports = createBetterSqlite3Compat;
    }, {}],
    5: [function (require, module, exports) {
      /**
       * Meadow SQLite Connection Provider for the Browser
       *
       * Drop-in replacement for meadow-connection-sqlite that uses sql.js (WASM)
       * instead of better-sqlite3 (native Node.js addon).
       *
       * Provides the same API surface:
       *   - connectAsync(fCallback) → creates in-memory SQLite database
       *   - .db → better-sqlite3 compatible wrapper (BetterSqlite3Compat)
       *   - .connected → boolean
       *   - Schema provider (createTables, createIndices, introspection, etc.)
       *
       * The Meadow SQLite provider (Meadow-Provider-SQLite.js) reads
       * fable.MeadowSQLiteProvider.db — this class auto-registers as that
       * service type, so dal.setProvider('SQLite') works transparently.
       *
       * Usage (browser):
       *   1. Load sql-wasm.js via <script> tag (provides global initSqlJs)
       *   2. Copy sql-wasm.wasm to the same directory
       *   3. Register this service with fable:
       *        fable.instantiateServiceProviderFromPrototype(
       *            'MeadowSQLiteProvider',
       *            require('meadow-connection-sqlite-browser'),
       *            {}
       *        );
       *   4. Call connectAsync(callback)
       *   5. dal.setProvider('SQLite') now works
       *
       * Usage (Node.js / tests):
       *   Works identically — sql.js is loaded via require('sql.js') as fallback
       *   when the global initSqlJs is not available.
       *
       * @author Steven Velozo <steven@velozo.com>
       * @license MIT
       */
      var libFableServiceProviderBase = require('fable-serviceproviderbase');
      var createBetterSqlite3Compat = require('./BetterSqlite3Compat.js');
      var libMeadowSchemaSQLite = require('./Meadow-Schema-SQLite.js');
      var MeadowConnectionSQLiteBrowser = /*#__PURE__*/function (_libFableServiceProvi) {
        /**
         * @param {object} pFable - The Fable instance
         * @param {object} pManifest - Service options
         * @param {string} pServiceHash - Service hash
         */
        function MeadowConnectionSQLiteBrowser(pFable, pManifest, pServiceHash) {
          var _this;
          _classCallCheck(this, MeadowConnectionSQLiteBrowser);
          _this = _callSuper(this, MeadowConnectionSQLiteBrowser, [pFable, pManifest, pServiceHash]);
          _this.serviceType = 'MeadowConnectionSQLite';

          /** @type {boolean} Whether the database is connected */
          _this.connected = false;

          /**
           * The BetterSqlite3Compat wrapper — better-sqlite3 compatible API
           * around the sql.js database.
           * @type {object|false}
           */
          _this._database = false;

          /**
           * The raw sql.js Database instance (for direct sql.js operations).
           * @type {object|null}
           */
          _this._sqlJsDb = null;

          /**
           * The sql.js SQL constructor (from initSqlJs), retained for
           * creating additional databases if needed.
           * @type {object|null}
           */
          _this._SQL = null;

          // Schema provider handles DDL operations (create, drop, index, etc.)
          _this._SchemaProvider = new libMeadowSchemaSQLite(_this.fable, _this.options, "".concat(_this.Hash, "-Schema"));
          return _this;
        }

        /** @returns {object} The schema provider instance */
        _inherits(MeadowConnectionSQLiteBrowser, _libFableServiceProvi);
        return _createClass(MeadowConnectionSQLiteBrowser, [{
          key: "schemaProvider",
          get: function get() {
            return this._SchemaProvider;
          }

          /**
           * @param {string} pTableName - Table name
           * @returns {string} DROP TABLE IF EXISTS statement
           */
        }, {
          key: "generateDropTableStatement",
          value: function generateDropTableStatement(pTableName) {
            return this._SchemaProvider.generateDropTableStatement(pTableName);
          }

          /**
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @returns {string} CREATE TABLE statement
           */
        }, {
          key: "generateCreateTableStatement",
          value: function generateCreateTableStatement(pMeadowTableSchema) {
            return this._SchemaProvider.generateCreateTableStatement(pMeadowTableSchema);
          }

          /**
           * Create all tables from a Meadow schema.
           * @param {object} pMeadowSchema - Schema with Tables array
           * @param {function} fCallback - Callback with (pError)
           */
        }, {
          key: "createTables",
          value: function createTables(pMeadowSchema, fCallback) {
            return this._SchemaProvider.createTables(pMeadowSchema, fCallback);
          }

          /**
           * Create a single table from a Meadow table schema.
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @param {function} fCallback - Callback with (pError)
           */
        }, {
          key: "createTable",
          value: function createTable(pMeadowTableSchema, fCallback) {
            return this._SchemaProvider.createTable(pMeadowTableSchema, fCallback);
          }

          /**
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @returns {Array} Array of index definition objects
           */
        }, {
          key: "getIndexDefinitionsFromSchema",
          value: function getIndexDefinitionsFromSchema(pMeadowTableSchema) {
            return this._SchemaProvider.getIndexDefinitionsFromSchema(pMeadowTableSchema);
          }

          /**
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @returns {string} Complete SQL script for all indices
           */
        }, {
          key: "generateCreateIndexScript",
          value: function generateCreateIndexScript(pMeadowTableSchema) {
            return this._SchemaProvider.generateCreateIndexScript(pMeadowTableSchema);
          }

          /**
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @returns {Array} Array of { Name, Statement, CheckStatement } objects
           */
        }, {
          key: "generateCreateIndexStatements",
          value: function generateCreateIndexStatements(pMeadowTableSchema) {
            return this._SchemaProvider.generateCreateIndexStatements(pMeadowTableSchema);
          }

          /**
           * Create a single index on the database.
           * @param {object} pIndexStatement - From generateCreateIndexStatements()
           * @param {function} fCallback - Callback with (pError)
           */
        }, {
          key: "createIndex",
          value: function createIndex(pIndexStatement, fCallback) {
            return this._SchemaProvider.createIndex(pIndexStatement, fCallback);
          }

          /**
           * Create all indices for a single table.
           * @param {object} pMeadowTableSchema - Meadow table schema
           * @param {function} fCallback - Callback with (pError)
           */
        }, {
          key: "createIndices",
          value: function createIndices(pMeadowTableSchema, fCallback) {
            return this._SchemaProvider.createIndices(pMeadowTableSchema, fCallback);
          }

          /**
           * Create all indices for all tables in a schema.
           * @param {object} pMeadowSchema - Schema with Tables array
           * @param {function} fCallback - Callback with (pError)
           */
        }, {
          key: "createAllIndices",
          value: function createAllIndices(pMeadowSchema, fCallback) {
            return this._SchemaProvider.createAllIndices(pMeadowSchema, fCallback);
          }

          // ========================================================================
          // Database Introspection delegation
          // ========================================================================

          /**
           * List all user tables in the database.
           * @param {function} fCallback - Callback with (pError, pTableNames)
           */
        }, {
          key: "listTables",
          value: function listTables(fCallback) {
            return this._SchemaProvider.listTables(fCallback);
          }

          /**
           * Get column definitions for a table.
           * @param {string} pTableName - Table name
           * @param {function} fCallback - Callback with (pError, pColumns)
           */
        }, {
          key: "introspectTableColumns",
          value: function introspectTableColumns(pTableName, fCallback) {
            return this._SchemaProvider.introspectTableColumns(pTableName, fCallback);
          }

          /**
           * Get index definitions for a table.
           * @param {string} pTableName - Table name
           * @param {function} fCallback - Callback with (pError, pIndices)
           */
        }, {
          key: "introspectTableIndices",
          value: function introspectTableIndices(pTableName, fCallback) {
            return this._SchemaProvider.introspectTableIndices(pTableName, fCallback);
          }

          /**
           * Get foreign key relationships for a table.
           * @param {string} pTableName - Table name
           * @param {function} fCallback - Callback with (pError, pForeignKeys)
           */
        }, {
          key: "introspectTableForeignKeys",
          value: function introspectTableForeignKeys(pTableName, fCallback) {
            return this._SchemaProvider.introspectTableForeignKeys(pTableName, fCallback);
          }

          /**
           * Generate a complete DDL-level schema for a table.
           * @param {string} pTableName - Table name
           * @param {function} fCallback - Callback with (pError, pTableSchema)
           */
        }, {
          key: "introspectTableSchema",
          value: function introspectTableSchema(pTableName, fCallback) {
            return this._SchemaProvider.introspectTableSchema(pTableName, fCallback);
          }

          /**
           * Generate DDL schemas for ALL tables in the database.
           * @param {function} fCallback - Callback with (pError, pSchema)
           */
        }, {
          key: "introspectDatabaseSchema",
          value: function introspectDatabaseSchema(fCallback) {
            return this._SchemaProvider.introspectDatabaseSchema(fCallback);
          }

          /**
           * Generate a Meadow package JSON for a table.
           * @param {string} pTableName - Table name
           * @param {function} fCallback - Callback with (pError, pPackage)
           */
        }, {
          key: "generateMeadowPackageFromTable",
          value: function generateMeadowPackageFromTable(pTableName, fCallback) {
            return this._SchemaProvider.generateMeadowPackageFromTable(pTableName, fCallback);
          }

          // ========================================================================
          // Connection
          // ========================================================================

          /**
           * Synchronous connect (calls connectAsync without callback).
           */
        }, {
          key: "connect",
          value: function connect() {
            this.connectAsync();
          }

          /**
           * Initialize sql.js and create an in-memory SQLite database.
           *
           * In the browser, expects the global `initSqlJs` function to be available
           * (loaded via <script src="sql-wasm.js">). In Node.js, falls back to
           * require('sql.js').
           *
           * @param {function} [fCallback] - Callback with (pError, pDatabase)
           */
        }, {
          key: "connectAsync",
          value: function connectAsync(fCallback) {
            var tmpCallback = fCallback;
            if (typeof tmpCallback !== 'function') {
              this.log.error('Meadow-Connection-SQLite-Browser connectAsync() called without a callback; this could lead to connection race conditions.');
              tmpCallback = function tmpCallback() {};
            }
            if (this.connected) {
              this.log.warn('Meadow-Connection-SQLite-Browser is already connected — skipping duplicate connect call.');
              return tmpCallback(null, this._database);
            }
            var tmpSelf = this;

            // Resolve the initSqlJs function — global (browser) or require (Node)
            var tmpInitSqlJs;
            if (typeof initSqlJs === 'function') {
              // Browser: loaded via <script src="sql-wasm.js">
              tmpInitSqlJs = initSqlJs;
            } else {
              // Node.js: require sql.js directly
              try {
                tmpInitSqlJs = require('sql.js');
              } catch (pRequireError) {
                return tmpCallback(new Error('Meadow-Connection-SQLite-Browser: sql.js is not available. ' + 'In the browser, load sql-wasm.js via a <script> tag. ' + 'In Node.js, install sql.js: npm install sql.js'));
              }
            }

            // Locate the WASM binary.
            // In the browser: served from the same directory as the page.
            // In Node.js: sql.js resolves it automatically (no locateFile needed).
            var tmpInitOptions = {};
            if (this.options.locateFile) {
              tmpInitOptions.locateFile = this.options.locateFile;
            } else if (typeof window !== 'undefined') {
              // Browser: default to same directory as the page
              tmpInitOptions.locateFile = function (pFile) {
                return "./".concat(pFile);
              };
            }
            // Node.js without explicit locateFile: let sql.js find its own WASM

            tmpInitSqlJs(tmpInitOptions).then(function (pSQL) {
              tmpSelf._SQL = pSQL;
              tmpSelf._sqlJsDb = new pSQL.Database();
              tmpSelf._database = createBetterSqlite3Compat(tmpSelf._sqlJsDb);
              tmpSelf._SchemaProvider.setDatabase(tmpSelf._database);
              tmpSelf.connected = true;
              tmpSelf.log.info('Meadow-Connection-SQLite-Browser connected — in-memory SQLite database ready.');
              return tmpCallback(null, tmpSelf._database);
            })["catch"](function (pError) {
              tmpSelf.log.error("Meadow-Connection-SQLite-Browser connection error: ".concat(pError), pError);
              return tmpCallback(pError);
            });
          }

          /**
           * Get the better-sqlite3 compatible database wrapper.
           *
           * This is what Meadow-Provider-SQLite reads via
           * fable.MeadowSQLiteProvider.db
           *
           * @returns {object|false} The BetterSqlite3Compat wrapper, or false if not connected
           */
        }, {
          key: "db",
          get: function get() {
            return this._database;
          }

          /**
           * Get the raw sql.js Database instance.
           *
           * @returns {object|null} The raw sql.js Database, or null if not connected
           */
        }, {
          key: "sqlJsDb",
          get: function get() {
            return this._sqlJsDb;
          }

          /**
           * Get the sql.js SQL constructor (for creating additional databases).
           *
           * @returns {object|null} The sql.js module, or null if not connected
           */
        }, {
          key: "SQLite",
          get: function get() {
            return this._SQL;
          }

          /**
           * Get the prepared statement interface (API compatibility with server provider).
           *
           * @returns {object} The BetterSqlite3Compat wrapper
           * @throws {Error} If not connected
           */
        }, {
          key: "preparedStatement",
          get: function get() {
            if (this.connected && this._database) {
              return this._database;
            } else {
              throw new Error('The Meadow SQLite Browser provider is not connected; cannot create a prepared statement.');
            }
          }
        }]);
      }(libFableServiceProviderBase); // Explicitly set isFableService — class field inheritance can break in
      // some browserify bundles when the parent module is a different copy.
      MeadowConnectionSQLiteBrowser.isFableService = true;
      module.exports = MeadowConnectionSQLiteBrowser;
    }, {
      "./BetterSqlite3Compat.js": 4,
      "./Meadow-Schema-SQLite.js": 6,
      "fable-serviceproviderbase": 3,
      "sql.js": 1
    }],
    6: [function (require, module, exports) {
      /**
      * Meadow SQLite Schema Provider
      *
      * Handles table creation, dropping, and DDL generation for SQLite.
      * Separated from the connection provider to allow independent extension
      * for indexing, foreign keys, and other schema operations.
      *
      * @author Steven Velozo <steven@velozo.com>
      */
      var libFableServiceProviderBase = require('fable-serviceproviderbase');
      var MeadowSchemaSQLite = /*#__PURE__*/function (_libFableServiceProvi2) {
        function MeadowSchemaSQLite(pFable, pOptions, pServiceHash) {
          var _this2;
          _classCallCheck(this, MeadowSchemaSQLite);
          _this2 = _callSuper(this, MeadowSchemaSQLite, [pFable, pOptions, pServiceHash]);
          _this2.serviceType = 'MeadowSchemaSQLite';

          // Reference to the database connection, set by the connection provider
          _this2._Database = false;
          return _this2;
        }

        /**
         * Set the database reference for executing DDL statements.
         * @param {object} pDatabase - better-sqlite3 database instance
         * @returns {MeadowSchemaSQLite} this (for chaining)
         */
        _inherits(MeadowSchemaSQLite, _libFableServiceProvi2);
        return _createClass(MeadowSchemaSQLite, [{
          key: "setDatabase",
          value: function setDatabase(pDatabase) {
            this._Database = pDatabase;
            return this;
          }
        }, {
          key: "generateDropTableStatement",
          value: function generateDropTableStatement(pTableName) {
            return "DROP TABLE IF EXISTS ".concat(pTableName, ";");
          }
        }, {
          key: "generateCreateTableStatement",
          value: function generateCreateTableStatement(pMeadowTableSchema) {
            this.log.info("--> Building the table create string for ".concat(pMeadowTableSchema.TableName, " ..."));
            var tmpPrimaryKey = false;
            var tmpCreateTableStatement = "--   [ ".concat(pMeadowTableSchema.TableName, " ]");
            tmpCreateTableStatement += "\nCREATE TABLE IF NOT EXISTS ".concat(pMeadowTableSchema.TableName, "\n    (");
            for (var j = 0; j < pMeadowTableSchema.Columns.length; j++) {
              var tmpColumn = pMeadowTableSchema.Columns[j];

              // If we aren't the first column, append a comma.
              if (j > 0) {
                tmpCreateTableStatement += ",";
              }
              tmpCreateTableStatement += "\n";
              switch (tmpColumn.DataType) {
                case 'ID':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " INTEGER PRIMARY KEY AUTOINCREMENT");
                  tmpPrimaryKey = tmpColumn.Column;
                  break;
                case 'GUID':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " TEXT DEFAULT '00000000-0000-0000-0000-000000000000'");
                  break;
                case 'ForeignKey':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " INTEGER NOT NULL DEFAULT 0");
                  break;
                case 'Numeric':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " INTEGER NOT NULL DEFAULT 0");
                  break;
                case 'Decimal':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " REAL");
                  break;
                case 'String':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " TEXT NOT NULL DEFAULT ''");
                  break;
                case 'Text':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " TEXT");
                  break;
                case 'DateTime':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " TEXT");
                  break;
                case 'Boolean':
                  tmpCreateTableStatement += "        ".concat(tmpColumn.Column, " INTEGER NOT NULL DEFAULT 0");
                  break;
                default:
                  break;
              }
            }
            tmpCreateTableStatement += "\n    );";
            this.log.info("Generated Create Table Statement: ".concat(tmpCreateTableStatement));
            return tmpCreateTableStatement;
          }
        }, {
          key: "createTables",
          value: function createTables(pMeadowSchema, fCallback) {
            var _this3 = this;
            this.fable.Utility.eachLimit(pMeadowSchema.Tables, 1, function (pTable, fCreateComplete) {
              return _this3.createTable(pTable, fCreateComplete);
            }, function (pCreateError) {
              if (pCreateError) {
                _this3.log.error("Meadow-SQLite Error creating tables from Schema: ".concat(pCreateError), pCreateError);
              }
              _this3.log.info('Done creating tables!');
              return fCallback(pCreateError);
            });
          }
        }, {
          key: "createTable",
          value: function createTable(pMeadowTableSchema, fCallback) {
            var tmpCreateTableStatement = this.generateCreateTableStatement(pMeadowTableSchema);
            try {
              this._Database.exec(tmpCreateTableStatement);
              this.log.info("Meadow-SQLite CREATE TABLE ".concat(pMeadowTableSchema.TableName, " Success"));
              return fCallback();
            } catch (pError) {
              this.log.error("Meadow-SQLite CREATE TABLE ".concat(pMeadowTableSchema.TableName, " failed!"), pError);
              return fCallback(pError);
            }
          }

          // ========================================================================
          // Index Generation
          // ========================================================================

          /**
           * Derive index definitions from a Meadow table schema.
           *
           * Automatically generates indices for:
           *   - GUID columns      -> unique index  AK_M_{Column}
           *   - ForeignKey columns -> regular index IX_M_{Column}
           *
           * Column-level Indexed property:
           *   - Indexed: true     -> regular index IX_M_T_{Table}_C_{Column}
           *   - Indexed: 'unique' -> unique index  AK_M_T_{Table}_C_{Column}
           *   - IndexName overrides the auto-generated name (for round-trip fidelity)
           *
           * Also includes any explicit entries from pMeadowTableSchema.Indices[]
           * (for multi-column composite indices).
           *
           * Each index definition is:
           *   { Name, TableName, Columns[], Unique, Strategy }
           *
           * @param {object} pMeadowTableSchema - Meadow table schema object
           * @returns {Array} Array of index definition objects
           */
        }, {
          key: "getIndexDefinitionsFromSchema",
          value: function getIndexDefinitionsFromSchema(pMeadowTableSchema) {
            var tmpIndices = [];
            var tmpTableName = pMeadowTableSchema.TableName;

            // Auto-detect from column types
            for (var j = 0; j < pMeadowTableSchema.Columns.length; j++) {
              var tmpColumn = pMeadowTableSchema.Columns[j];
              switch (tmpColumn.DataType) {
                case 'GUID':
                  tmpIndices.push({
                    Name: "AK_M_".concat(tmpColumn.Column),
                    TableName: tmpTableName,
                    Columns: [tmpColumn.Column],
                    Unique: true,
                    Strategy: ''
                  });
                  break;
                case 'ForeignKey':
                  tmpIndices.push({
                    Name: "IX_M_".concat(tmpColumn.Column),
                    TableName: tmpTableName,
                    Columns: [tmpColumn.Column],
                    Unique: false,
                    Strategy: ''
                  });
                  break;
                default:
                  // Column-level Indexed property: generates a single-column index
                  // with a consistent naming convention.
                  //   Indexed: true     -> IX_M_T_{Table}_C_{Column}  (regular)
                  //   Indexed: 'unique' -> AK_M_T_{Table}_C_{Column}  (unique)
                  // Optional IndexName property overrides the auto-generated name.
                  if (tmpColumn.Indexed) {
                    var tmpIsUnique = tmpColumn.Indexed === 'unique';
                    var tmpPrefix = tmpIsUnique ? 'AK_M_T' : 'IX_M_T';
                    var tmpAutoName = "".concat(tmpPrefix, "_").concat(tmpTableName, "_C_").concat(tmpColumn.Column);
                    tmpIndices.push({
                      Name: tmpColumn.IndexName || tmpAutoName,
                      TableName: tmpTableName,
                      Columns: [tmpColumn.Column],
                      Unique: tmpIsUnique,
                      Strategy: ''
                    });
                  }
                  break;
              }
            }

            // Include any explicitly defined indices on the schema
            if (Array.isArray(pMeadowTableSchema.Indices)) {
              for (var k = 0; k < pMeadowTableSchema.Indices.length; k++) {
                var tmpExplicitIndex = pMeadowTableSchema.Indices[k];
                tmpIndices.push({
                  Name: tmpExplicitIndex.Name || "IX_".concat(tmpTableName, "_").concat(k),
                  TableName: tmpTableName,
                  Columns: Array.isArray(tmpExplicitIndex.Columns) ? tmpExplicitIndex.Columns : [tmpExplicitIndex.Columns],
                  Unique: tmpExplicitIndex.Unique || false,
                  Strategy: tmpExplicitIndex.Strategy || ''
                });
              }
            }
            return tmpIndices;
          }

          /**
           * Build the column list for an index, comma-separated.
           * @param {Array} pColumns - Array of column name strings
           * @returns {string}
           */
        }, {
          key: "_buildColumnList",
          value: function _buildColumnList(pColumns) {
            return pColumns.join(', ');
          }

          /**
           * Generate a full idempotent SQL script for creating all indices on a table.
           *
           * SQLite supports CREATE INDEX IF NOT EXISTS natively, so the
           * idempotent script is straightforward.
           *
           * @param {object} pMeadowTableSchema - Meadow table schema object
           * @returns {string} Complete SQL script
           */
        }, {
          key: "generateCreateIndexScript",
          value: function generateCreateIndexScript(pMeadowTableSchema) {
            var tmpIndices = this.getIndexDefinitionsFromSchema(pMeadowTableSchema);
            var tmpTableName = pMeadowTableSchema.TableName;
            if (tmpIndices.length === 0) {
              return "-- No indices to create for ".concat(tmpTableName, "\n");
            }
            var tmpScript = "-- Index Definitions for ".concat(tmpTableName, " -- Generated ").concat(new Date().toJSON(), "\n\n");
            for (var i = 0; i < tmpIndices.length; i++) {
              var tmpIndex = tmpIndices[i];
              var tmpColumnList = this._buildColumnList(tmpIndex.Columns);
              var tmpCreateKeyword = tmpIndex.Unique ? 'CREATE UNIQUE INDEX' : 'CREATE INDEX';
              tmpScript += "-- Index: ".concat(tmpIndex.Name, "\n");
              tmpScript += "".concat(tmpCreateKeyword, " IF NOT EXISTS ").concat(tmpIndex.Name, " ON ").concat(tmpIndex.TableName, "(").concat(tmpColumnList, ");\n\n");
            }
            return tmpScript;
          }

          /**
           * Generate an array of individual CREATE INDEX SQL statements for a table.
           *
           * Each entry is an object with:
           *   { Name, Statement, CheckStatement }
           *
           * - Statement: the raw CREATE [UNIQUE] INDEX ... SQL
           * - CheckStatement: a SELECT against sqlite_master that returns the count
           *   of matching indices (0 = does not exist)
           *
           * @param {object} pMeadowTableSchema - Meadow table schema object
           * @returns {Array} Array of { Name, Statement, CheckStatement } objects
           */
        }, {
          key: "generateCreateIndexStatements",
          value: function generateCreateIndexStatements(pMeadowTableSchema) {
            var tmpIndices = this.getIndexDefinitionsFromSchema(pMeadowTableSchema);
            var tmpStatements = [];
            for (var i = 0; i < tmpIndices.length; i++) {
              var tmpIndex = tmpIndices[i];
              var tmpColumnList = this._buildColumnList(tmpIndex.Columns);
              var tmpCreateKeyword = tmpIndex.Unique ? 'CREATE UNIQUE INDEX' : 'CREATE INDEX';
              tmpStatements.push({
                Name: tmpIndex.Name,
                Statement: "".concat(tmpCreateKeyword, " ").concat(tmpIndex.Name, " ON ").concat(tmpIndex.TableName, "(").concat(tmpColumnList, ")"),
                CheckStatement: "SELECT COUNT(*) AS IndexExists FROM sqlite_master WHERE type = 'index' AND name = '".concat(tmpIndex.Name, "'")
              });
            }
            return tmpStatements;
          }

          /**
           * Programmatically create a single index on the database.
           *
           * Uses CREATE INDEX IF NOT EXISTS for idempotent execution.
           * SQLite is synchronous via better-sqlite3.
           *
           * @param {object} pIndexStatement - Object from generateCreateIndexStatements()
           * @param {Function} fCallback - callback(pError)
           */
        }, {
          key: "createIndex",
          value: function createIndex(pIndexStatement, fCallback) {
            if (!this._Database) {
              this.log.error("Meadow-SQLite CREATE INDEX ".concat(pIndexStatement.Name, " failed: not connected."));
              return fCallback(new Error('Not connected to SQLite'));
            }
            try {
              // Inject IF NOT EXISTS for idempotent execution
              var tmpStatement = pIndexStatement.Statement.replace('CREATE UNIQUE INDEX ', 'CREATE UNIQUE INDEX IF NOT EXISTS ').replace('CREATE INDEX ', 'CREATE INDEX IF NOT EXISTS ');
              this._Database.exec(tmpStatement);
              this.log.info("Meadow-SQLite CREATE INDEX ".concat(pIndexStatement.Name, " executed successfully."));
              return fCallback();
            } catch (pError) {
              this.log.error("Meadow-SQLite CREATE INDEX ".concat(pIndexStatement.Name, " failed!"), pError);
              return fCallback(pError);
            }
          }

          /**
           * Programmatically create all indices for a single table.
           *
           * @param {object} pMeadowTableSchema - Meadow table schema object
           * @param {Function} fCallback - callback(pError)
           */
        }, {
          key: "createIndices",
          value: function createIndices(pMeadowTableSchema, fCallback) {
            var _this4 = this;
            var tmpStatements = this.generateCreateIndexStatements(pMeadowTableSchema);
            if (tmpStatements.length === 0) {
              this.log.info("No indices to create for ".concat(pMeadowTableSchema.TableName, "."));
              return fCallback();
            }
            this.fable.Utility.eachLimit(tmpStatements, 1, function (pStatement, fCreateComplete) {
              return _this4.createIndex(pStatement, fCreateComplete);
            }, function (pCreateError) {
              if (pCreateError) {
                _this4.log.error("Meadow-SQLite Error creating indices for ".concat(pMeadowTableSchema.TableName, ": ").concat(pCreateError), pCreateError);
              } else {
                _this4.log.info("Done creating indices for ".concat(pMeadowTableSchema.TableName, "!"));
              }
              return fCallback(pCreateError);
            });
          }

          /**
           * Programmatically create all indices for all tables in a schema.
           *
           * @param {object} pMeadowSchema - Meadow schema object with Tables array
           * @param {Function} fCallback - callback(pError)
           */
        }, {
          key: "createAllIndices",
          value: function createAllIndices(pMeadowSchema, fCallback) {
            var _this5 = this;
            this.fable.Utility.eachLimit(pMeadowSchema.Tables, 1, function (pTable, fCreateComplete) {
              return _this5.createIndices(pTable, fCreateComplete);
            }, function (pCreateError) {
              if (pCreateError) {
                _this5.log.error("Meadow-SQLite Error creating indices from schema: ".concat(pCreateError), pCreateError);
              }
              _this5.log.info('Done creating all indices!');
              return fCallback(pCreateError);
            });
          }
          // ========================================================================
          // Database Introspection
          // ========================================================================

          /**
           * List all user tables in the connected SQLite database.
           *
           * @param {Function} fCallback - callback(pError, pTableNames)
           */
        }, {
          key: "listTables",
          value: function listTables(fCallback) {
            if (!this._Database) {
              return fCallback(new Error('Not connected to SQLite'));
            }
            try {
              var tmpRows = this._Database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
              var tmpNames = tmpRows.map(function (pRow) {
                return pRow.name;
              });
              return fCallback(null, tmpNames);
            } catch (pError) {
              this.log.error('Meadow-SQLite listTables failed!', pError);
              return fCallback(pError);
            }
          }

          /**
           * Map a SQLite native type string to a Meadow DataType.
           *
           * Uses conservative heuristics:
           *   1. Primary key with AUTOINCREMENT → ID
           *   2. Column name contains "GUID" and type is TEXT → GUID
           *   3. Foreign key constraint exists → ForeignKey
           *   4. Native type mapping for straightforward cases
           *
           * @param {object} pColumnInfo - PRAGMA table_info row
           * @param {string} pColumnInfo.name - Column name
           * @param {string} pColumnInfo.type - Native SQLite type (e.g. 'TEXT', 'INTEGER')
           * @param {number} pColumnInfo.pk - 1 if primary key, 0 otherwise
           * @param {boolean} pIsAutoIncrement - Whether this column has AUTOINCREMENT
           * @param {Set} pForeignKeyColumns - Set of column names that have FK constraints
           * @returns {object} { DataType, Size }
           */
        }, {
          key: "_mapSQLiteTypeToMeadow",
          value: function _mapSQLiteTypeToMeadow(pColumnInfo, pIsAutoIncrement, pForeignKeyColumns) {
            var tmpName = pColumnInfo.name;
            var tmpType = (pColumnInfo.type || '').toUpperCase().trim();

            // Priority 1: Primary key with auto-increment → ID
            if (pColumnInfo.pk === 1 && pIsAutoIncrement) {
              return {
                DataType: 'ID',
                Size: ''
              };
            }

            // Priority 2: Column name contains "GUID" and type is TEXT-like → GUID
            if (tmpName.toUpperCase().indexOf('GUID') >= 0 && (tmpType === 'TEXT' || tmpType === '' || tmpType.indexOf('VARCHAR') >= 0 || tmpType.indexOf('CHAR') >= 0)) {
              return {
                DataType: 'GUID',
                Size: ''
              };
            }

            // Priority 3: Has FK constraint → ForeignKey
            if (pForeignKeyColumns && pForeignKeyColumns.has(tmpName)) {
              return {
                DataType: 'ForeignKey',
                Size: ''
              };
            }

            // Priority 4: Native type mapping
            if (tmpType === 'REAL' || tmpType.indexOf('DOUBLE') >= 0 || tmpType.indexOf('FLOAT') >= 0) {
              return {
                DataType: 'Decimal',
                Size: ''
              };
            }
            if (tmpType.indexOf('DECIMAL') >= 0 || tmpType.indexOf('NUMERIC') >= 0) {
              // Extract precision from DECIMAL(p,s)
              var tmpMatch = tmpType.match(/\((\d+(?:,\d+)?)\)/);
              return {
                DataType: 'Decimal',
                Size: tmpMatch ? tmpMatch[1] : ''
              };
            }
            if (tmpType === 'TEXT') {
              // Distinguish between String and Text: if notnull with default '' → String, else Text
              if (pColumnInfo.notnull === 1 && pColumnInfo.dflt_value === "''") {
                return {
                  DataType: 'String',
                  Size: ''
                };
              }
              return {
                DataType: 'Text',
                Size: ''
              };
            }
            if (tmpType.indexOf('VARCHAR') >= 0 || tmpType.indexOf('CHAR') >= 0) {
              var _tmpMatch = tmpType.match(/\((\d+)\)/);
              return {
                DataType: 'String',
                Size: _tmpMatch ? _tmpMatch[1] : ''
              };
            }
            if (tmpType === 'INTEGER' || tmpType === 'INT' || tmpType.indexOf('INT') >= 0) {
              // Could be Boolean or Numeric; check for boolean hints
              if (pColumnInfo.notnull === 1 && pColumnInfo.dflt_value === '0') {
                // Check for boolean naming patterns
                var tmpLowerName = tmpName.toLowerCase();
                if (tmpLowerName.indexOf('is') === 0 || tmpLowerName.indexOf('has') === 0 || tmpLowerName.indexOf('in') === 0 || tmpLowerName === 'deleted' || tmpLowerName === 'active' || tmpLowerName === 'enabled') {
                  return {
                    DataType: 'Boolean',
                    Size: ''
                  };
                }
              }
              return {
                DataType: 'Numeric',
                Size: ''
              };
            }

            // Default fallback
            return {
              DataType: 'Text',
              Size: ''
            };
          }

          /**
           * Get column definitions for a single table.
           *
           * Returns DDL-level column objects with DataType inferred from native types.
           *
           * @param {string} pTableName - Name of the table
           * @param {Function} fCallback - callback(pError, pColumns)
           */
        }, {
          key: "introspectTableColumns",
          value: function introspectTableColumns(pTableName, fCallback) {
            if (!this._Database) {
              return fCallback(new Error('Not connected to SQLite'));
            }
            try {
              // Get column info
              var tmpColumns = this._Database.prepare("PRAGMA table_info('".concat(pTableName, "')")).all();

              // Check if the table has AUTOINCREMENT by inspecting sqlite_master
              var tmpCreateSQL = this._Database.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(pTableName);
              var tmpHasAutoIncrement = tmpCreateSQL && tmpCreateSQL.sql && tmpCreateSQL.sql.toUpperCase().indexOf('AUTOINCREMENT') >= 0;

              // Get foreign keys to identify FK columns
              var tmpForeignKeys = this._Database.prepare("PRAGMA foreign_key_list('".concat(pTableName, "')")).all();
              var tmpFKColumnSet = new Set(tmpForeignKeys.map(function (pFK) {
                return pFK.from;
              }));
              var tmpResult = [];
              for (var i = 0; i < tmpColumns.length; i++) {
                var tmpCol = tmpColumns[i];
                var tmpIsAutoIncrement = tmpHasAutoIncrement && tmpCol.pk === 1;
                var tmpTypeInfo = this._mapSQLiteTypeToMeadow(tmpCol, tmpIsAutoIncrement, tmpFKColumnSet);
                var tmpColumnDef = {
                  Column: tmpCol.name,
                  DataType: tmpTypeInfo.DataType
                };
                if (tmpTypeInfo.Size) {
                  tmpColumnDef.Size = tmpTypeInfo.Size;
                }
                tmpResult.push(tmpColumnDef);
              }
              return fCallback(null, tmpResult);
            } catch (pError) {
              this.log.error("Meadow-SQLite introspectTableColumns for ".concat(pTableName, " failed!"), pError);
              return fCallback(pError);
            }
          }

          /**
           * Get raw index definitions for a single table from the database.
           *
           * Returns each index as: { Name, Columns[], Unique }
           *
           * @param {string} pTableName - Name of the table
           * @param {Function} fCallback - callback(pError, pIndices)
           */
        }, {
          key: "introspectTableIndices",
          value: function introspectTableIndices(pTableName, fCallback) {
            if (!this._Database) {
              return fCallback(new Error('Not connected to SQLite'));
            }
            try {
              var tmpIndexList = this._Database.prepare("PRAGMA index_list('".concat(pTableName, "')")).all();
              var tmpIndices = [];
              for (var i = 0; i < tmpIndexList.length; i++) {
                var tmpIdx = tmpIndexList[i];

                // Skip auto-generated indices (origin 'pk' for primary key)
                if (tmpIdx.origin === 'pk') {
                  continue;
                }
                var tmpIndexInfo = this._Database.prepare("PRAGMA index_info('".concat(tmpIdx.name, "')")).all();
                var tmpColumnNames = tmpIndexInfo.map(function (pInfo) {
                  return pInfo.name;
                });
                tmpIndices.push({
                  Name: tmpIdx.name,
                  Columns: tmpColumnNames,
                  Unique: tmpIdx.unique === 1
                });
              }
              return fCallback(null, tmpIndices);
            } catch (pError) {
              this.log.error("Meadow-SQLite introspectTableIndices for ".concat(pTableName, " failed!"), pError);
              return fCallback(pError);
            }
          }

          /**
           * Get foreign key relationships for a single table.
           *
           * @param {string} pTableName - Name of the table
           * @param {Function} fCallback - callback(pError, pForeignKeys)
           */
        }, {
          key: "introspectTableForeignKeys",
          value: function introspectTableForeignKeys(pTableName, fCallback) {
            if (!this._Database) {
              return fCallback(new Error('Not connected to SQLite'));
            }
            try {
              var tmpForeignKeys = this._Database.prepare("PRAGMA foreign_key_list('".concat(pTableName, "')")).all();
              var tmpResult = [];
              for (var i = 0; i < tmpForeignKeys.length; i++) {
                var tmpFK = tmpForeignKeys[i];
                tmpResult.push({
                  Column: tmpFK.from,
                  ReferencedTable: tmpFK.table,
                  ReferencedColumn: tmpFK.to
                });
              }
              return fCallback(null, tmpResult);
            } catch (pError) {
              this.log.error("Meadow-SQLite introspectTableForeignKeys for ".concat(pTableName, " failed!"), pError);
              return fCallback(pError);
            }
          }

          /**
           * Classify an index for round-trip fidelity.
           *
           * Determines how a database index should be represented in the Meadow
           * schema: as a column-level Indexed property (with or without IndexName),
           * as a GUID/FK auto-index (skip), or as an explicit Indices[] entry.
           *
           * @param {object} pIndex - { Name, Columns[], Unique }
           * @param {string} pTableName - Table name for pattern matching
           * @returns {object} { type, column, indexed, indexName }
           *   type: 'column-auto' | 'column-named' | 'guid-auto' | 'fk-auto' | 'explicit'
           */
        }, {
          key: "_classifyIndex",
          value: function _classifyIndex(pIndex, pTableName) {
            // Multi-column indices always go in Indices[]
            if (pIndex.Columns.length !== 1) {
              return {
                type: 'explicit'
              };
            }
            var tmpColumn = pIndex.Columns[0];
            var tmpName = pIndex.Name;

            // Check for auto-detected GUID index: AK_M_{Column}
            if (tmpName === "AK_M_".concat(tmpColumn)) {
              return {
                type: 'guid-auto',
                column: tmpColumn
              };
            }

            // Check for auto-detected FK index: IX_M_{Column}
            if (tmpName === "IX_M_".concat(tmpColumn)) {
              return {
                type: 'fk-auto',
                column: tmpColumn
              };
            }

            // Check for auto-generated column-level index: IX_M_T_{Table}_C_{Column}
            var tmpRegularAutoName = "IX_M_T_".concat(pTableName, "_C_").concat(tmpColumn);
            if (tmpName === tmpRegularAutoName && !pIndex.Unique) {
              return {
                type: 'column-auto',
                column: tmpColumn,
                indexed: true
              };
            }

            // Check for auto-generated unique column-level index: AK_M_T_{Table}_C_{Column}
            var tmpUniqueAutoName = "AK_M_T_".concat(pTableName, "_C_").concat(tmpColumn);
            if (tmpName === tmpUniqueAutoName && pIndex.Unique) {
              return {
                type: 'column-auto',
                column: tmpColumn,
                indexed: 'unique'
              };
            }

            // Any other single-column index → column-level with IndexName
            return {
              type: 'column-named',
              column: tmpColumn,
              indexed: pIndex.Unique ? 'unique' : true,
              indexName: tmpName
            };
          }

          /**
           * Generate a complete DDL-level schema for a single table.
           *
           * Combines introspected columns + indices + foreign keys.
           * Single-column indices are folded into column Indexed/IndexName properties.
           * Multi-column indices go in the Indices[] array.
           *
           * @param {string} pTableName - Name of the table
           * @param {Function} fCallback - callback(pError, pTableSchema)
           */
        }, {
          key: "introspectTableSchema",
          value: function introspectTableSchema(pTableName, fCallback) {
            var _this6 = this;
            this.introspectTableColumns(pTableName, function (pColumnError, pColumns) {
              if (pColumnError) {
                return fCallback(pColumnError);
              }
              _this6.introspectTableIndices(pTableName, function (pIndexError, pIndices) {
                if (pIndexError) {
                  return fCallback(pIndexError);
                }
                _this6.introspectTableForeignKeys(pTableName, function (pFKError, pForeignKeys) {
                  if (pFKError) {
                    return fCallback(pFKError);
                  }

                  // Build a column lookup for folding index info
                  var tmpColumnMap = {};
                  for (var i = 0; i < pColumns.length; i++) {
                    tmpColumnMap[pColumns[i].Column] = pColumns[i];
                  }
                  var tmpExplicitIndices = [];

                  // Classify and fold each index
                  for (var _i = 0; _i < pIndices.length; _i++) {
                    var tmpClassification = _this6._classifyIndex(pIndices[_i], pTableName);
                    switch (tmpClassification.type) {
                      case 'column-auto':
                        if (tmpColumnMap[tmpClassification.column]) {
                          tmpColumnMap[tmpClassification.column].Indexed = tmpClassification.indexed;
                        }
                        break;
                      case 'column-named':
                        if (tmpColumnMap[tmpClassification.column]) {
                          tmpColumnMap[tmpClassification.column].Indexed = tmpClassification.indexed;
                          tmpColumnMap[tmpClassification.column].IndexName = tmpClassification.indexName;
                        }
                        break;
                      case 'guid-auto':
                        // If the column wasn't detected as GUID,
                        // upgrade it based on AK_M_{Column} naming evidence.
                        if (tmpColumnMap[tmpClassification.column] && tmpColumnMap[tmpClassification.column].DataType !== 'GUID') {
                          tmpColumnMap[tmpClassification.column].DataType = 'GUID';
                        }
                        break;
                      case 'fk-auto':
                        // If the column wasn't detected as ForeignKey
                        // (e.g. no REFERENCES clause in SQLite), upgrade it
                        // based on IX_M_{Column} naming pattern evidence.
                        if (tmpColumnMap[tmpClassification.column] && tmpColumnMap[tmpClassification.column].DataType !== 'ForeignKey') {
                          tmpColumnMap[tmpClassification.column].DataType = 'ForeignKey';
                        }
                        // Skip — handled by DataType
                        break;
                      case 'explicit':
                        tmpExplicitIndices.push({
                          Name: pIndices[_i].Name,
                          Columns: pIndices[_i].Columns,
                          Unique: pIndices[_i].Unique
                        });
                        break;
                    }
                  }
                  var tmpSchema = {
                    TableName: pTableName,
                    Columns: pColumns
                  };
                  if (tmpExplicitIndices.length > 0) {
                    tmpSchema.Indices = tmpExplicitIndices;
                  }
                  if (pForeignKeys.length > 0) {
                    tmpSchema.ForeignKeys = pForeignKeys;
                  }
                  return fCallback(null, tmpSchema);
                });
              });
            });
          }

          /**
           * Generate DDL schemas for ALL tables in the database.
           *
           * @param {Function} fCallback - callback(pError, pSchema)
           */
        }, {
          key: "introspectDatabaseSchema",
          value: function introspectDatabaseSchema(fCallback) {
            var _this7 = this;
            this.listTables(function (pListError, pTableNames) {
              if (pListError) {
                return fCallback(pListError);
              }
              var tmpTables = [];
              _this7.fable.Utility.eachLimit(pTableNames, 1, function (pTableName, fNext) {
                _this7.introspectTableSchema(pTableName, function (pTableError, pTableSchema) {
                  if (pTableError) {
                    return fNext(pTableError);
                  }
                  tmpTables.push(pTableSchema);
                  return fNext();
                });
              }, function (pError) {
                if (pError) {
                  _this7.log.error("Meadow-SQLite introspectDatabaseSchema failed: ".concat(pError), pError);
                  return fCallback(pError);
                }
                return fCallback(null, {
                  Tables: tmpTables
                });
              });
            });
          }

          /**
           * Map a Meadow DataType to a Meadow Package JSON Type.
           *
           * @param {string} pDataType - Meadow DDL-level DataType
           * @param {string} pColumnName - Column name (for magic column detection)
           * @returns {string} Meadow Package Type
           */
        }, {
          key: "_mapDataTypeToMeadowType",
          value: function _mapDataTypeToMeadowType(pDataType, pColumnName) {
            // Magic column detection
            var tmpLowerName = pColumnName.toLowerCase();
            switch (tmpLowerName) {
              case 'createdate':
                return 'CreateDate';
              case 'creatingiduser':
                return 'CreateIDUser';
              case 'updatedate':
                return 'UpdateDate';
              case 'updatingiduser':
                return 'UpdateIDUser';
              case 'deletedate':
                return 'DeleteDate';
              case 'deletingiduser':
                return 'DeleteIDUser';
              case 'deleted':
                return 'Deleted';
            }
            switch (pDataType) {
              case 'ID':
                return 'AutoIdentity';
              case 'GUID':
                return 'AutoGUID';
              case 'ForeignKey':
                return 'Numeric';
              case 'Numeric':
                return 'Numeric';
              case 'Decimal':
                return 'Numeric';
              case 'String':
                return 'String';
              case 'Text':
                return 'String';
              case 'DateTime':
                return 'DateTime';
              case 'Boolean':
                return 'Boolean';
              default:
                return 'String';
            }
          }

          /**
           * Get a sensible default value for a Meadow DataType.
           *
           * @param {string} pDataType - Meadow DDL-level DataType
           * @returns {*} Default value
           */
        }, {
          key: "_getDefaultValue",
          value: function _getDefaultValue(pDataType) {
            switch (pDataType) {
              case 'ID':
                return 0;
              case 'GUID':
                return '';
              case 'ForeignKey':
                return 0;
              case 'Numeric':
                return 0;
              case 'Decimal':
                return 0.0;
              case 'String':
                return '';
              case 'Text':
                return '';
              case 'DateTime':
                return '';
              case 'Boolean':
                return false;
              default:
                return '';
            }
          }

          /**
           * Generate a Meadow package JSON for a single table.
           *
           * Produces the format consumed by Meadow core and FoxHound:
           *   { Scope, DefaultIdentifier, Schema[], DefaultObject, JsonSchema }
           *
           * @param {string} pTableName - Name of the table
           * @param {Function} fCallback - callback(pError, pPackage)
           */
        }, {
          key: "generateMeadowPackageFromTable",
          value: function generateMeadowPackageFromTable(pTableName, fCallback) {
            var _this8 = this;
            this.introspectTableSchema(pTableName, function (pError, pTableSchema) {
              if (pError) {
                return fCallback(pError);
              }
              var tmpScope = pTableName;
              var tmpDefaultIdentifier = '';
              var tmpSchema = [];
              var tmpDefaultObject = {};
              for (var i = 0; i < pTableSchema.Columns.length; i++) {
                var tmpCol = pTableSchema.Columns[i];
                var tmpMeadowType = _this8._mapDataTypeToMeadowType(tmpCol.DataType, tmpCol.Column);
                if (tmpCol.DataType === 'ID') {
                  tmpDefaultIdentifier = tmpCol.Column;
                }
                var tmpSchemaEntry = {
                  Column: tmpCol.Column,
                  Type: tmpMeadowType
                };
                if (tmpCol.Size) {
                  tmpSchemaEntry.Size = tmpCol.Size;
                }
                tmpSchema.push(tmpSchemaEntry);
                tmpDefaultObject[tmpCol.Column] = _this8._getDefaultValue(tmpCol.DataType);
              }
              var tmpPackage = {
                Scope: tmpScope,
                DefaultIdentifier: tmpDefaultIdentifier,
                Schema: tmpSchema,
                DefaultObject: tmpDefaultObject
              };
              return fCallback(null, tmpPackage);
            });
          }
        }]);
      }(libFableServiceProviderBase);
      module.exports = MeadowSchemaSQLite;
    }, {
      "fable-serviceproviderbase": 3
    }]
  }, {}, [5])(5);
});
//# sourceMappingURL=meadow-connection-sqlite-browser.compatible.js.map
