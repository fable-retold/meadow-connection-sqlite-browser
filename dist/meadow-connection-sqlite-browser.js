"use strict";

(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
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

      const libPackage = require('../package.json');
      class FableServiceProviderBase {
        /**
         * The constructor can be used in two ways:
         * 1) With a fable, options object and service hash (the options object and service hash are optional)a
         * 2) With an object or nothing as the first parameter, where it will be treated as the options object
         *
         * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
         * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
         * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
         */
        constructor(pFable, pOptions, pServiceHash) {
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
          if (typeof pFable === 'object' && pFable.isFable) {
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
            this.options = typeof pOptions === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = typeof pFable === 'object' && !pFable.isFable ? pFable : typeof pOptions === 'object' ? pOptions : {};
            this.UUID = `CORE-SVC-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`;
          }

          // It's expected that the deriving class will set this
          this.serviceType = `Unknown-${this.UUID}`;

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : `${this.UUID}`;
        }

        /**
         * @param {import('fable')} pFable
         */
        connectFable(pFable) {
          if (typeof pFable !== 'object' || !pFable.isFable) {
            let tmpErrorMessage = `Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [${typeof pFable}].}`;
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
        static isFableService = true;
      }
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
          if (!pParams || typeof pParams !== 'object') {
            return undefined;
          }
          let tmpKeys = Object.keys(pParams);
          if (tmpKeys.length === 0) {
            return undefined;
          }
          let tmpConverted = {};
          for (let i = 0; i < tmpKeys.length; i++) {
            let tmpKey = tmpKeys[i];
            let tmpValue = pParams[tmpKey];

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
          let tmpArr = [];
          for (let i = 0; i < pArgs.length; i++) {
            let tmpVal = pArgs[i];
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
          let tmpFirst = pArgs[0];

          // Named parameter object (not null, not array, plain object)
          if (tmpFirst !== null && typeof tmpFirst === 'object' && !Array.isArray(tmpFirst)) {
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
          let tmpColumns = pResults[0].columns;
          let tmpValues = pResults[0].values;
          let tmpRows = [];
          for (let i = 0; i < tmpValues.length; i++) {
            let tmpRow = {};
            for (let j = 0; j < tmpColumns.length; j++) {
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
          let tmpResult = pSqlJsDb.exec('SELECT last_insert_rowid() AS rowid');
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
          prepare: function (pSQL) {
            return {
              /**
               * Execute a non-SELECT statement (INSERT, UPDATE, DELETE).
               *
               * Accepts either a named parameter object or positional arguments.
               *
               * @param {object} [pParams] - Named parameters
               * @returns {{ lastInsertRowid: number, changes: number }}
               */
              run: function (pParams) {
                let tmpBindParams = resolveBindParams(arguments);
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
              all: function (pParams) {
                let tmpBindParams = resolveBindParams(arguments);
                let tmpResults;
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
              get: function (pParams) {
                let tmpBindParams = resolveBindParams(arguments);
                let tmpResults;
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
                let tmpColumns = tmpResults[0].columns;
                let tmpValues = tmpResults[0].values[0];
                let tmpRow = {};
                for (let j = 0; j < tmpColumns.length; j++) {
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
          exec: function (pSQL, pParams) {
            let tmpBindParams = convertParams(pParams);
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
      const libFableServiceProviderBase = require('fable-serviceproviderbase');
      const createBetterSqlite3Compat = require('./BetterSqlite3Compat.js');
      const libMeadowSchemaSQLite = require('./Meadow-Schema-SQLite.js');
      class MeadowConnectionSQLiteBrowser extends libFableServiceProviderBase {
        /**
         * @param {object} pFable - The Fable instance
         * @param {object} pManifest - Service options
         * @param {string} pServiceHash - Service hash
         */
        constructor(pFable, pManifest, pServiceHash) {
          super(pFable, pManifest, pServiceHash);
          this.serviceType = 'MeadowConnectionSQLite';

          /** @type {boolean} Whether the database is connected */
          this.connected = false;

          /**
           * The BetterSqlite3Compat wrapper — better-sqlite3 compatible API
           * around the sql.js database.
           * @type {object|false}
           */
          this._database = false;

          /**
           * The raw sql.js Database instance (for direct sql.js operations).
           * @type {object|null}
           */
          this._sqlJsDb = null;

          /**
           * The sql.js SQL constructor (from initSqlJs), retained for
           * creating additional databases if needed.
           * @type {object|null}
           */
          this._SQL = null;

          // Schema provider handles DDL operations (create, drop, index, etc.)
          this._SchemaProvider = new libMeadowSchemaSQLite(this.fable, this.options, `${this.Hash}-Schema`);
        }

        /** @returns {object} The schema provider instance */
        get schemaProvider() {
          return this._SchemaProvider;
        }

        /**
         * @param {string} pTableName - Table name
         * @returns {string} DROP TABLE IF EXISTS statement
         */
        generateDropTableStatement(pTableName) {
          return this._SchemaProvider.generateDropTableStatement(pTableName);
        }

        /**
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @returns {string} CREATE TABLE statement
         */
        generateCreateTableStatement(pMeadowTableSchema) {
          return this._SchemaProvider.generateCreateTableStatement(pMeadowTableSchema);
        }

        /**
         * Create all tables from a Meadow schema.
         * @param {object} pMeadowSchema - Schema with Tables array
         * @param {function} fCallback - Callback with (pError)
         */
        createTables(pMeadowSchema, fCallback) {
          return this._SchemaProvider.createTables(pMeadowSchema, fCallback);
        }

        /**
         * Create a single table from a Meadow table schema.
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @param {function} fCallback - Callback with (pError)
         */
        createTable(pMeadowTableSchema, fCallback) {
          return this._SchemaProvider.createTable(pMeadowTableSchema, fCallback);
        }

        /**
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @returns {Array} Array of index definition objects
         */
        getIndexDefinitionsFromSchema(pMeadowTableSchema) {
          return this._SchemaProvider.getIndexDefinitionsFromSchema(pMeadowTableSchema);
        }

        /**
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @returns {string} Complete SQL script for all indices
         */
        generateCreateIndexScript(pMeadowTableSchema) {
          return this._SchemaProvider.generateCreateIndexScript(pMeadowTableSchema);
        }

        /**
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @returns {Array} Array of { Name, Statement, CheckStatement } objects
         */
        generateCreateIndexStatements(pMeadowTableSchema) {
          return this._SchemaProvider.generateCreateIndexStatements(pMeadowTableSchema);
        }

        /**
         * Create a single index on the database.
         * @param {object} pIndexStatement - From generateCreateIndexStatements()
         * @param {function} fCallback - Callback with (pError)
         */
        createIndex(pIndexStatement, fCallback) {
          return this._SchemaProvider.createIndex(pIndexStatement, fCallback);
        }

        /**
         * Create all indices for a single table.
         * @param {object} pMeadowTableSchema - Meadow table schema
         * @param {function} fCallback - Callback with (pError)
         */
        createIndices(pMeadowTableSchema, fCallback) {
          return this._SchemaProvider.createIndices(pMeadowTableSchema, fCallback);
        }

        /**
         * Create all indices for all tables in a schema.
         * @param {object} pMeadowSchema - Schema with Tables array
         * @param {function} fCallback - Callback with (pError)
         */
        createAllIndices(pMeadowSchema, fCallback) {
          return this._SchemaProvider.createAllIndices(pMeadowSchema, fCallback);
        }

        // ========================================================================
        // Database Introspection delegation
        // ========================================================================

        /**
         * List all user tables in the database.
         * @param {function} fCallback - Callback with (pError, pTableNames)
         */
        listTables(fCallback) {
          return this._SchemaProvider.listTables(fCallback);
        }

        /**
         * Get column definitions for a table.
         * @param {string} pTableName - Table name
         * @param {function} fCallback - Callback with (pError, pColumns)
         */
        introspectTableColumns(pTableName, fCallback) {
          return this._SchemaProvider.introspectTableColumns(pTableName, fCallback);
        }

        /**
         * Get index definitions for a table.
         * @param {string} pTableName - Table name
         * @param {function} fCallback - Callback with (pError, pIndices)
         */
        introspectTableIndices(pTableName, fCallback) {
          return this._SchemaProvider.introspectTableIndices(pTableName, fCallback);
        }

        /**
         * Get foreign key relationships for a table.
         * @param {string} pTableName - Table name
         * @param {function} fCallback - Callback with (pError, pForeignKeys)
         */
        introspectTableForeignKeys(pTableName, fCallback) {
          return this._SchemaProvider.introspectTableForeignKeys(pTableName, fCallback);
        }

        /**
         * Generate a complete DDL-level schema for a table.
         * @param {string} pTableName - Table name
         * @param {function} fCallback - Callback with (pError, pTableSchema)
         */
        introspectTableSchema(pTableName, fCallback) {
          return this._SchemaProvider.introspectTableSchema(pTableName, fCallback);
        }

        /**
         * Generate DDL schemas for ALL tables in the database.
         * @param {function} fCallback - Callback with (pError, pSchema)
         */
        introspectDatabaseSchema(fCallback) {
          return this._SchemaProvider.introspectDatabaseSchema(fCallback);
        }

        /**
         * Generate a Meadow package JSON for a table.
         * @param {string} pTableName - Table name
         * @param {function} fCallback - Callback with (pError, pPackage)
         */
        generateMeadowPackageFromTable(pTableName, fCallback) {
          return this._SchemaProvider.generateMeadowPackageFromTable(pTableName, fCallback);
        }

        // ========================================================================
        // Connection
        // ========================================================================

        /**
         * Synchronous connect (calls connectAsync without callback).
         */
        connect() {
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
        connectAsync(fCallback) {
          let tmpCallback = fCallback;
          if (typeof tmpCallback !== 'function') {
            this.log.error('Meadow-Connection-SQLite-Browser connectAsync() called without a callback; this could lead to connection race conditions.');
            tmpCallback = () => {};
          }
          if (this.connected) {
            this.log.warn('Meadow-Connection-SQLite-Browser is already connected — skipping duplicate connect call.');
            return tmpCallback(null, this._database);
          }
          let tmpSelf = this;

          // Resolve the initSqlJs function — global (browser) or require (Node)
          let tmpInitSqlJs;
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
          let tmpInitOptions = {};
          if (this.options.locateFile) {
            tmpInitOptions.locateFile = this.options.locateFile;
          } else if (typeof window !== 'undefined') {
            // Browser: default to same directory as the page
            tmpInitOptions.locateFile = pFile => `./${pFile}`;
          }
          // Node.js without explicit locateFile: let sql.js find its own WASM

          tmpInitSqlJs(tmpInitOptions).then(pSQL => {
            tmpSelf._SQL = pSQL;
            tmpSelf._sqlJsDb = new pSQL.Database();
            tmpSelf._database = createBetterSqlite3Compat(tmpSelf._sqlJsDb);
            tmpSelf._SchemaProvider.setDatabase(tmpSelf._database);
            tmpSelf.connected = true;
            tmpSelf.log.info('Meadow-Connection-SQLite-Browser connected — in-memory SQLite database ready.');
            return tmpCallback(null, tmpSelf._database);
          }).catch(pError => {
            tmpSelf.log.error(`Meadow-Connection-SQLite-Browser connection error: ${pError}`, pError);
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
        get db() {
          return this._database;
        }

        /**
         * Get the raw sql.js Database instance.
         *
         * @returns {object|null} The raw sql.js Database, or null if not connected
         */
        get sqlJsDb() {
          return this._sqlJsDb;
        }

        /**
         * Get the sql.js SQL constructor (for creating additional databases).
         *
         * @returns {object|null} The sql.js module, or null if not connected
         */
        get SQLite() {
          return this._SQL;
        }

        /**
         * Get the prepared statement interface (API compatibility with server provider).
         *
         * @returns {object} The BetterSqlite3Compat wrapper
         * @throws {Error} If not connected
         */
        get preparedStatement() {
          if (this.connected && this._database) {
            return this._database;
          } else {
            throw new Error('The Meadow SQLite Browser provider is not connected; cannot create a prepared statement.');
          }
        }
      }

      // Explicitly set isFableService — class field inheritance can break in
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
      const libFableServiceProviderBase = require('fable-serviceproviderbase');
      class MeadowSchemaSQLite extends libFableServiceProviderBase {
        constructor(pFable, pOptions, pServiceHash) {
          super(pFable, pOptions, pServiceHash);
          this.serviceType = 'MeadowSchemaSQLite';

          // Reference to the database connection, set by the connection provider
          this._Database = false;
        }

        /**
         * Set the database reference for executing DDL statements.
         * @param {object} pDatabase - better-sqlite3 database instance
         * @returns {MeadowSchemaSQLite} this (for chaining)
         */
        setDatabase(pDatabase) {
          this._Database = pDatabase;
          return this;
        }
        generateDropTableStatement(pTableName) {
          return `DROP TABLE IF EXISTS ${pTableName};`;
        }
        generateCreateTableStatement(pMeadowTableSchema) {
          this.log.info(`--> Building the table create string for ${pMeadowTableSchema.TableName} ...`);
          let tmpPrimaryKey = false;
          let tmpCreateTableStatement = `--   [ ${pMeadowTableSchema.TableName} ]`;
          tmpCreateTableStatement += `\nCREATE TABLE IF NOT EXISTS ${pMeadowTableSchema.TableName}\n    (`;
          for (let j = 0; j < pMeadowTableSchema.Columns.length; j++) {
            let tmpColumn = pMeadowTableSchema.Columns[j];

            // If we aren't the first column, append a comma.
            if (j > 0) {
              tmpCreateTableStatement += `,`;
            }
            tmpCreateTableStatement += `\n`;
            switch (tmpColumn.DataType) {
              case 'ID':
                tmpCreateTableStatement += `        ${tmpColumn.Column} INTEGER PRIMARY KEY AUTOINCREMENT`;
                tmpPrimaryKey = tmpColumn.Column;
                break;
              case 'GUID':
                tmpCreateTableStatement += `        ${tmpColumn.Column} TEXT DEFAULT '00000000-0000-0000-0000-000000000000'`;
                break;
              case 'ForeignKey':
                tmpCreateTableStatement += `        ${tmpColumn.Column} INTEGER NOT NULL DEFAULT 0`;
                break;
              case 'Numeric':
                tmpCreateTableStatement += `        ${tmpColumn.Column} INTEGER NOT NULL DEFAULT 0`;
                break;
              case 'Decimal':
                tmpCreateTableStatement += `        ${tmpColumn.Column} REAL`;
                break;
              case 'String':
                tmpCreateTableStatement += `        ${tmpColumn.Column} TEXT NOT NULL DEFAULT ''`;
                break;
              case 'Text':
                tmpCreateTableStatement += `        ${tmpColumn.Column} TEXT`;
                break;
              case 'DateTime':
                tmpCreateTableStatement += `        ${tmpColumn.Column} TEXT`;
                break;
              case 'Boolean':
                tmpCreateTableStatement += `        ${tmpColumn.Column} INTEGER NOT NULL DEFAULT 0`;
                break;
              case 'JSON':
                tmpCreateTableStatement += `        ${tmpColumn.Column} TEXT`;
                break;
              case 'JSONProxy':
                tmpCreateTableStatement += `        ${tmpColumn.StorageColumn} TEXT`;
                break;
              default:
                break;
            }
          }
          tmpCreateTableStatement += `\n    );`;
          this.log.info(`Generated Create Table Statement: ${tmpCreateTableStatement}`);
          return tmpCreateTableStatement;
        }
        createTables(pMeadowSchema, fCallback) {
          this.fable.Utility.eachLimit(pMeadowSchema.Tables, 1, (pTable, fCreateComplete) => {
            return this.createTable(pTable, fCreateComplete);
          }, pCreateError => {
            if (pCreateError) {
              this.log.error(`Meadow-SQLite Error creating tables from Schema: ${pCreateError}`, pCreateError);
            }
            this.log.info('Done creating tables!');
            return fCallback(pCreateError);
          });
        }
        createTable(pMeadowTableSchema, fCallback) {
          let tmpCreateTableStatement = this.generateCreateTableStatement(pMeadowTableSchema);
          try {
            this._Database.exec(tmpCreateTableStatement);
            this.log.info(`Meadow-SQLite CREATE TABLE ${pMeadowTableSchema.TableName} Success`);
            return fCallback();
          } catch (pError) {
            this.log.error(`Meadow-SQLite CREATE TABLE ${pMeadowTableSchema.TableName} failed!`, pError);
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
        getIndexDefinitionsFromSchema(pMeadowTableSchema) {
          let tmpIndices = [];
          let tmpTableName = pMeadowTableSchema.TableName;

          // Auto-detect from column types
          for (let j = 0; j < pMeadowTableSchema.Columns.length; j++) {
            let tmpColumn = pMeadowTableSchema.Columns[j];
            switch (tmpColumn.DataType) {
              case 'GUID':
                tmpIndices.push({
                  Name: `AK_M_${tmpColumn.Column}`,
                  TableName: tmpTableName,
                  Columns: [tmpColumn.Column],
                  Unique: true,
                  Strategy: ''
                });
                break;
              case 'ForeignKey':
                tmpIndices.push({
                  Name: `IX_M_${tmpColumn.Column}`,
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
                  let tmpIsUnique = tmpColumn.Indexed === 'unique';
                  let tmpPrefix = tmpIsUnique ? 'AK_M_T' : 'IX_M_T';
                  let tmpAutoName = `${tmpPrefix}_${tmpTableName}_C_${tmpColumn.Column}`;
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
            for (let k = 0; k < pMeadowTableSchema.Indices.length; k++) {
              let tmpExplicitIndex = pMeadowTableSchema.Indices[k];
              tmpIndices.push({
                Name: tmpExplicitIndex.Name || `IX_${tmpTableName}_${k}`,
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
        _buildColumnList(pColumns) {
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
        generateCreateIndexScript(pMeadowTableSchema) {
          let tmpIndices = this.getIndexDefinitionsFromSchema(pMeadowTableSchema);
          let tmpTableName = pMeadowTableSchema.TableName;
          if (tmpIndices.length === 0) {
            return `-- No indices to create for ${tmpTableName}\n`;
          }
          let tmpScript = `-- Index Definitions for ${tmpTableName} -- Generated ${new Date().toJSON()}\n\n`;
          for (let i = 0; i < tmpIndices.length; i++) {
            let tmpIndex = tmpIndices[i];
            let tmpColumnList = this._buildColumnList(tmpIndex.Columns);
            let tmpCreateKeyword = tmpIndex.Unique ? 'CREATE UNIQUE INDEX' : 'CREATE INDEX';
            tmpScript += `-- Index: ${tmpIndex.Name}\n`;
            tmpScript += `${tmpCreateKeyword} IF NOT EXISTS ${tmpIndex.Name} ON ${tmpIndex.TableName}(${tmpColumnList});\n\n`;
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
        generateCreateIndexStatements(pMeadowTableSchema) {
          let tmpIndices = this.getIndexDefinitionsFromSchema(pMeadowTableSchema);
          let tmpStatements = [];
          for (let i = 0; i < tmpIndices.length; i++) {
            let tmpIndex = tmpIndices[i];
            let tmpColumnList = this._buildColumnList(tmpIndex.Columns);
            let tmpCreateKeyword = tmpIndex.Unique ? 'CREATE UNIQUE INDEX' : 'CREATE INDEX';
            tmpStatements.push({
              Name: tmpIndex.Name,
              Statement: `${tmpCreateKeyword} ${tmpIndex.Name} ON ${tmpIndex.TableName}(${tmpColumnList})`,
              CheckStatement: `SELECT COUNT(*) AS IndexExists FROM sqlite_master WHERE type = 'index' AND name = '${tmpIndex.Name}'`
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
        createIndex(pIndexStatement, fCallback) {
          if (!this._Database) {
            this.log.error(`Meadow-SQLite CREATE INDEX ${pIndexStatement.Name} failed: not connected.`);
            return fCallback(new Error('Not connected to SQLite'));
          }
          try {
            // Inject IF NOT EXISTS for idempotent execution
            let tmpStatement = pIndexStatement.Statement.replace('CREATE UNIQUE INDEX ', 'CREATE UNIQUE INDEX IF NOT EXISTS ').replace('CREATE INDEX ', 'CREATE INDEX IF NOT EXISTS ');
            this._Database.exec(tmpStatement);
            this.log.info(`Meadow-SQLite CREATE INDEX ${pIndexStatement.Name} executed successfully.`);
            return fCallback();
          } catch (pError) {
            this.log.error(`Meadow-SQLite CREATE INDEX ${pIndexStatement.Name} failed!`, pError);
            return fCallback(pError);
          }
        }

        /**
         * Programmatically create all indices for a single table.
         *
         * @param {object} pMeadowTableSchema - Meadow table schema object
         * @param {Function} fCallback - callback(pError)
         */
        createIndices(pMeadowTableSchema, fCallback) {
          let tmpStatements = this.generateCreateIndexStatements(pMeadowTableSchema);
          if (tmpStatements.length === 0) {
            this.log.info(`No indices to create for ${pMeadowTableSchema.TableName}.`);
            return fCallback();
          }
          this.fable.Utility.eachLimit(tmpStatements, 1, (pStatement, fCreateComplete) => {
            return this.createIndex(pStatement, fCreateComplete);
          }, pCreateError => {
            if (pCreateError) {
              this.log.error(`Meadow-SQLite Error creating indices for ${pMeadowTableSchema.TableName}: ${pCreateError}`, pCreateError);
            } else {
              this.log.info(`Done creating indices for ${pMeadowTableSchema.TableName}!`);
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
        createAllIndices(pMeadowSchema, fCallback) {
          this.fable.Utility.eachLimit(pMeadowSchema.Tables, 1, (pTable, fCreateComplete) => {
            return this.createIndices(pTable, fCreateComplete);
          }, pCreateError => {
            if (pCreateError) {
              this.log.error(`Meadow-SQLite Error creating indices from schema: ${pCreateError}`, pCreateError);
            }
            this.log.info('Done creating all indices!');
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
        listTables(fCallback) {
          if (!this._Database) {
            return fCallback(new Error('Not connected to SQLite'));
          }
          try {
            let tmpRows = this._Database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
            let tmpNames = tmpRows.map(pRow => {
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
        _mapSQLiteTypeToMeadow(pColumnInfo, pIsAutoIncrement, pForeignKeyColumns) {
          let tmpName = pColumnInfo.name;
          let tmpType = (pColumnInfo.type || '').toUpperCase().trim();

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
            let tmpMatch = tmpType.match(/\((\d+(?:,\d+)?)\)/);
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
            let tmpMatch = tmpType.match(/\((\d+)\)/);
            return {
              DataType: 'String',
              Size: tmpMatch ? tmpMatch[1] : ''
            };
          }
          if (tmpType === 'INTEGER' || tmpType === 'INT' || tmpType.indexOf('INT') >= 0) {
            // Could be Boolean or Numeric; check for boolean hints
            if (pColumnInfo.notnull === 1 && pColumnInfo.dflt_value === '0') {
              // Check for boolean naming patterns
              let tmpLowerName = tmpName.toLowerCase();
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
        introspectTableColumns(pTableName, fCallback) {
          if (!this._Database) {
            return fCallback(new Error('Not connected to SQLite'));
          }
          try {
            // Get column info
            let tmpColumns = this._Database.prepare(`PRAGMA table_info('${pTableName}')`).all();

            // Check if the table has AUTOINCREMENT by inspecting sqlite_master
            let tmpCreateSQL = this._Database.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(pTableName);
            let tmpHasAutoIncrement = tmpCreateSQL && tmpCreateSQL.sql && tmpCreateSQL.sql.toUpperCase().indexOf('AUTOINCREMENT') >= 0;

            // Get foreign keys to identify FK columns
            let tmpForeignKeys = this._Database.prepare(`PRAGMA foreign_key_list('${pTableName}')`).all();
            let tmpFKColumnSet = new Set(tmpForeignKeys.map(pFK => {
              return pFK.from;
            }));
            let tmpResult = [];
            for (let i = 0; i < tmpColumns.length; i++) {
              let tmpCol = tmpColumns[i];
              let tmpIsAutoIncrement = tmpHasAutoIncrement && tmpCol.pk === 1;
              let tmpTypeInfo = this._mapSQLiteTypeToMeadow(tmpCol, tmpIsAutoIncrement, tmpFKColumnSet);
              let tmpColumnDef = {
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
            this.log.error(`Meadow-SQLite introspectTableColumns for ${pTableName} failed!`, pError);
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
        introspectTableIndices(pTableName, fCallback) {
          if (!this._Database) {
            return fCallback(new Error('Not connected to SQLite'));
          }
          try {
            let tmpIndexList = this._Database.prepare(`PRAGMA index_list('${pTableName}')`).all();
            let tmpIndices = [];
            for (let i = 0; i < tmpIndexList.length; i++) {
              let tmpIdx = tmpIndexList[i];

              // Skip auto-generated indices (origin 'pk' for primary key)
              if (tmpIdx.origin === 'pk') {
                continue;
              }
              let tmpIndexInfo = this._Database.prepare(`PRAGMA index_info('${tmpIdx.name}')`).all();
              let tmpColumnNames = tmpIndexInfo.map(pInfo => {
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
            this.log.error(`Meadow-SQLite introspectTableIndices for ${pTableName} failed!`, pError);
            return fCallback(pError);
          }
        }

        /**
         * Get foreign key relationships for a single table.
         *
         * @param {string} pTableName - Name of the table
         * @param {Function} fCallback - callback(pError, pForeignKeys)
         */
        introspectTableForeignKeys(pTableName, fCallback) {
          if (!this._Database) {
            return fCallback(new Error('Not connected to SQLite'));
          }
          try {
            let tmpForeignKeys = this._Database.prepare(`PRAGMA foreign_key_list('${pTableName}')`).all();
            let tmpResult = [];
            for (let i = 0; i < tmpForeignKeys.length; i++) {
              let tmpFK = tmpForeignKeys[i];
              tmpResult.push({
                Column: tmpFK.from,
                ReferencedTable: tmpFK.table,
                ReferencedColumn: tmpFK.to
              });
            }
            return fCallback(null, tmpResult);
          } catch (pError) {
            this.log.error(`Meadow-SQLite introspectTableForeignKeys for ${pTableName} failed!`, pError);
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
        _classifyIndex(pIndex, pTableName) {
          // Multi-column indices always go in Indices[]
          if (pIndex.Columns.length !== 1) {
            return {
              type: 'explicit'
            };
          }
          let tmpColumn = pIndex.Columns[0];
          let tmpName = pIndex.Name;

          // Check for auto-detected GUID index: AK_M_{Column}
          if (tmpName === `AK_M_${tmpColumn}`) {
            return {
              type: 'guid-auto',
              column: tmpColumn
            };
          }

          // Check for auto-detected FK index: IX_M_{Column}
          if (tmpName === `IX_M_${tmpColumn}`) {
            return {
              type: 'fk-auto',
              column: tmpColumn
            };
          }

          // Check for auto-generated column-level index: IX_M_T_{Table}_C_{Column}
          let tmpRegularAutoName = `IX_M_T_${pTableName}_C_${tmpColumn}`;
          if (tmpName === tmpRegularAutoName && !pIndex.Unique) {
            return {
              type: 'column-auto',
              column: tmpColumn,
              indexed: true
            };
          }

          // Check for auto-generated unique column-level index: AK_M_T_{Table}_C_{Column}
          let tmpUniqueAutoName = `AK_M_T_${pTableName}_C_${tmpColumn}`;
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
        introspectTableSchema(pTableName, fCallback) {
          this.introspectTableColumns(pTableName, (pColumnError, pColumns) => {
            if (pColumnError) {
              return fCallback(pColumnError);
            }
            this.introspectTableIndices(pTableName, (pIndexError, pIndices) => {
              if (pIndexError) {
                return fCallback(pIndexError);
              }
              this.introspectTableForeignKeys(pTableName, (pFKError, pForeignKeys) => {
                if (pFKError) {
                  return fCallback(pFKError);
                }

                // Build a column lookup for folding index info
                let tmpColumnMap = {};
                for (let i = 0; i < pColumns.length; i++) {
                  tmpColumnMap[pColumns[i].Column] = pColumns[i];
                }
                let tmpExplicitIndices = [];

                // Classify and fold each index
                for (let i = 0; i < pIndices.length; i++) {
                  let tmpClassification = this._classifyIndex(pIndices[i], pTableName);
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
                        Name: pIndices[i].Name,
                        Columns: pIndices[i].Columns,
                        Unique: pIndices[i].Unique
                      });
                      break;
                  }
                }
                let tmpSchema = {
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
        introspectDatabaseSchema(fCallback) {
          this.listTables((pListError, pTableNames) => {
            if (pListError) {
              return fCallback(pListError);
            }
            let tmpTables = [];
            this.fable.Utility.eachLimit(pTableNames, 1, (pTableName, fNext) => {
              this.introspectTableSchema(pTableName, (pTableError, pTableSchema) => {
                if (pTableError) {
                  return fNext(pTableError);
                }
                tmpTables.push(pTableSchema);
                return fNext();
              });
            }, pError => {
              if (pError) {
                this.log.error(`Meadow-SQLite introspectDatabaseSchema failed: ${pError}`, pError);
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
        _mapDataTypeToMeadowType(pDataType, pColumnName) {
          // Magic column detection
          let tmpLowerName = pColumnName.toLowerCase();
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
            case 'JSON':
              return 'JSON';
            case 'JSONProxy':
              return 'JSONProxy';
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
        _getDefaultValue(pDataType) {
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
            case 'JSON':
              return {};
            case 'JSONProxy':
              return {};
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
        generateMeadowPackageFromTable(pTableName, fCallback) {
          this.introspectTableSchema(pTableName, (pError, pTableSchema) => {
            if (pError) {
              return fCallback(pError);
            }
            let tmpScope = pTableName;
            let tmpDefaultIdentifier = '';
            let tmpSchema = [];
            let tmpDefaultObject = {};
            for (let i = 0; i < pTableSchema.Columns.length; i++) {
              let tmpCol = pTableSchema.Columns[i];
              let tmpMeadowType = this._mapDataTypeToMeadowType(tmpCol.DataType, tmpCol.Column);
              if (tmpCol.DataType === 'ID') {
                tmpDefaultIdentifier = tmpCol.Column;
              }
              let tmpSchemaEntry = {
                Column: tmpCol.Column,
                Type: tmpMeadowType
              };
              if (tmpCol.Size) {
                tmpSchemaEntry.Size = tmpCol.Size;
              }
              tmpSchema.push(tmpSchemaEntry);
              tmpDefaultObject[tmpCol.Column] = this._getDefaultValue(tmpCol.DataType);
            }
            let tmpPackage = {
              Scope: tmpScope,
              DefaultIdentifier: tmpDefaultIdentifier,
              Schema: tmpSchema,
              DefaultObject: tmpDefaultObject
            };
            return fCallback(null, tmpPackage);
          });
        }
      }
      module.exports = MeadowSchemaSQLite;
    }, {
      "fable-serviceproviderbase": 3
    }]
  }, {}, [5])(5);
});
//# sourceMappingURL=meadow-connection-sqlite-browser.js.map
