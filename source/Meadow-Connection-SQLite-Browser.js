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

class MeadowConnectionSQLiteBrowser extends libFableServiceProviderBase
{
	/**
	 * @param {object} pFable - The Fable instance
	 * @param {object} pManifest - Service options
	 * @param {string} pServiceHash - Service hash
	 */
	constructor(pFable, pManifest, pServiceHash)
	{
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
	get schemaProvider()
	{
		return this._SchemaProvider;
	}

	/**
	 * @param {string} pTableName - Table name
	 * @returns {string} DROP TABLE IF EXISTS statement
	 */
	generateDropTableStatement(pTableName)
	{
		return this._SchemaProvider.generateDropTableStatement(pTableName);
	}

	/**
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @returns {string} CREATE TABLE statement
	 */
	generateCreateTableStatement(pMeadowTableSchema)
	{
		return this._SchemaProvider.generateCreateTableStatement(pMeadowTableSchema);
	}

	/**
	 * Create all tables from a Meadow schema.
	 * @param {object} pMeadowSchema - Schema with Tables array
	 * @param {function} fCallback - Callback with (pError)
	 */
	createTables(pMeadowSchema, fCallback)
	{
		return this._SchemaProvider.createTables(pMeadowSchema, fCallback);
	}

	/**
	 * Create a single table from a Meadow table schema.
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @param {function} fCallback - Callback with (pError)
	 */
	createTable(pMeadowTableSchema, fCallback)
	{
		return this._SchemaProvider.createTable(pMeadowTableSchema, fCallback);
	}

	/**
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @returns {Array} Array of index definition objects
	 */
	getIndexDefinitionsFromSchema(pMeadowTableSchema)
	{
		return this._SchemaProvider.getIndexDefinitionsFromSchema(pMeadowTableSchema);
	}

	/**
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @returns {string} Complete SQL script for all indices
	 */
	generateCreateIndexScript(pMeadowTableSchema)
	{
		return this._SchemaProvider.generateCreateIndexScript(pMeadowTableSchema);
	}

	/**
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @returns {Array} Array of { Name, Statement, CheckStatement } objects
	 */
	generateCreateIndexStatements(pMeadowTableSchema)
	{
		return this._SchemaProvider.generateCreateIndexStatements(pMeadowTableSchema);
	}

	/**
	 * Create a single index on the database.
	 * @param {object} pIndexStatement - From generateCreateIndexStatements()
	 * @param {function} fCallback - Callback with (pError)
	 */
	createIndex(pIndexStatement, fCallback)
	{
		return this._SchemaProvider.createIndex(pIndexStatement, fCallback);
	}

	/**
	 * Create all indices for a single table.
	 * @param {object} pMeadowTableSchema - Meadow table schema
	 * @param {function} fCallback - Callback with (pError)
	 */
	createIndices(pMeadowTableSchema, fCallback)
	{
		return this._SchemaProvider.createIndices(pMeadowTableSchema, fCallback);
	}

	/**
	 * Create all indices for all tables in a schema.
	 * @param {object} pMeadowSchema - Schema with Tables array
	 * @param {function} fCallback - Callback with (pError)
	 */
	createAllIndices(pMeadowSchema, fCallback)
	{
		return this._SchemaProvider.createAllIndices(pMeadowSchema, fCallback);
	}

	// ========================================================================
	// Database Introspection delegation
	// ========================================================================

	/**
	 * List all user tables in the database.
	 * @param {function} fCallback - Callback with (pError, pTableNames)
	 */
	listTables(fCallback)
	{
		return this._SchemaProvider.listTables(fCallback);
	}

	/**
	 * Get column definitions for a table.
	 * @param {string} pTableName - Table name
	 * @param {function} fCallback - Callback with (pError, pColumns)
	 */
	introspectTableColumns(pTableName, fCallback)
	{
		return this._SchemaProvider.introspectTableColumns(pTableName, fCallback);
	}

	/**
	 * Get index definitions for a table.
	 * @param {string} pTableName - Table name
	 * @param {function} fCallback - Callback with (pError, pIndices)
	 */
	introspectTableIndices(pTableName, fCallback)
	{
		return this._SchemaProvider.introspectTableIndices(pTableName, fCallback);
	}

	/**
	 * Get foreign key relationships for a table.
	 * @param {string} pTableName - Table name
	 * @param {function} fCallback - Callback with (pError, pForeignKeys)
	 */
	introspectTableForeignKeys(pTableName, fCallback)
	{
		return this._SchemaProvider.introspectTableForeignKeys(pTableName, fCallback);
	}

	/**
	 * Generate a complete DDL-level schema for a table.
	 * @param {string} pTableName - Table name
	 * @param {function} fCallback - Callback with (pError, pTableSchema)
	 */
	introspectTableSchema(pTableName, fCallback)
	{
		return this._SchemaProvider.introspectTableSchema(pTableName, fCallback);
	}

	/**
	 * Generate DDL schemas for ALL tables in the database.
	 * @param {function} fCallback - Callback with (pError, pSchema)
	 */
	introspectDatabaseSchema(fCallback)
	{
		return this._SchemaProvider.introspectDatabaseSchema(fCallback);
	}

	/**
	 * Generate a Meadow package JSON for a table.
	 * @param {string} pTableName - Table name
	 * @param {function} fCallback - Callback with (pError, pPackage)
	 */
	generateMeadowPackageFromTable(pTableName, fCallback)
	{
		return this._SchemaProvider.generateMeadowPackageFromTable(pTableName, fCallback);
	}

	// ========================================================================
	// Connection
	// ========================================================================

	/**
	 * Synchronous connect (calls connectAsync without callback).
	 */
	connect()
	{
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
	connectAsync(fCallback)
	{
		let tmpCallback = fCallback;
		if (typeof tmpCallback !== 'function')
		{
			this.log.error('Meadow-Connection-SQLite-Browser connectAsync() called without a callback; this could lead to connection race conditions.');
			tmpCallback = () => {};
		}

		if (this.connected)
		{
			this.log.warn('Meadow-Connection-SQLite-Browser is already connected — skipping duplicate connect call.');
			return tmpCallback(null, this._database);
		}

		let tmpSelf = this;

		// Resolve the initSqlJs function — global (browser) or require (Node)
		let tmpInitSqlJs;
		if (typeof initSqlJs === 'function')
		{
			// Browser: loaded via <script src="sql-wasm.js">
			tmpInitSqlJs = initSqlJs;
		}
		else
		{
			// Node.js: require sql.js directly
			try
			{
				tmpInitSqlJs = require('sql.js');
			}
			catch (pRequireError)
			{
				return tmpCallback(new Error(
					'Meadow-Connection-SQLite-Browser: sql.js is not available. ' +
					'In the browser, load sql-wasm.js via a <script> tag. ' +
					'In Node.js, install sql.js: npm install sql.js'
				));
			}
		}

		// Locate the WASM binary.
		// In the browser: served from the same directory as the page.
		// In Node.js: sql.js resolves it automatically (no locateFile needed).
		let tmpInitOptions = {};
		if (this.options.locateFile)
		{
			tmpInitOptions.locateFile = this.options.locateFile;
		}
		else if (typeof window !== 'undefined')
		{
			// Browser: default to same directory as the page
			tmpInitOptions.locateFile = (pFile) => `./${pFile}`;
		}
		// Node.js without explicit locateFile: let sql.js find its own WASM

		tmpInitSqlJs(tmpInitOptions)
			.then((pSQL) =>
			{
				tmpSelf._SQL = pSQL;
				tmpSelf._sqlJsDb = new pSQL.Database();
				tmpSelf._database = createBetterSqlite3Compat(tmpSelf._sqlJsDb);

				tmpSelf._SchemaProvider.setDatabase(tmpSelf._database);

				tmpSelf.connected = true;
				tmpSelf.log.info('Meadow-Connection-SQLite-Browser connected — in-memory SQLite database ready.');

				return tmpCallback(null, tmpSelf._database);
			})
			.catch((pError) =>
			{
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
	get db()
	{
		return this._database;
	}

	/**
	 * Get the raw sql.js Database instance.
	 *
	 * @returns {object|null} The raw sql.js Database, or null if not connected
	 */
	get sqlJsDb()
	{
		return this._sqlJsDb;
	}

	/**
	 * Get the sql.js SQL constructor (for creating additional databases).
	 *
	 * @returns {object|null} The sql.js module, or null if not connected
	 */
	get SQLite()
	{
		return this._SQL;
	}

	/**
	 * Get the prepared statement interface (API compatibility with server provider).
	 *
	 * @returns {object} The BetterSqlite3Compat wrapper
	 * @throws {Error} If not connected
	 */
	get preparedStatement()
	{
		if (this.connected && this._database)
		{
			return this._database;
		}
		else
		{
			throw new Error('The Meadow SQLite Browser provider is not connected; cannot create a prepared statement.');
		}
	}
}

// Explicitly set isFableService — class field inheritance can break in
// some browserify bundles when the parent module is a different copy.
MeadowConnectionSQLiteBrowser.isFableService = true;

module.exports = MeadowConnectionSQLiteBrowser;
