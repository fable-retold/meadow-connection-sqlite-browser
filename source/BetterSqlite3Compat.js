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
function createBetterSqlite3Compat(pSqlJsDb)
{
	/**
	 * Convert a FoxHound named-parameter object to sql.js format.
	 *
	 * better-sqlite3 expects params as { Name_w0: 'value' } matching `:Name_w0` in SQL.
	 * sql.js expects params as { ':Name_w0': 'value' } — keys MUST include the colon.
	 *
	 * @param {object} pParams - The FoxHound parameters object
	 * @returns {object|undefined} sql.js compatible parameter object
	 */
	function convertParams(pParams)
	{
		if (!pParams || typeof pParams !== 'object')
		{
			return undefined;
		}

		let tmpKeys = Object.keys(pParams);
		if (tmpKeys.length === 0)
		{
			return undefined;
		}

		let tmpConverted = {};
		for (let i = 0; i < tmpKeys.length; i++)
		{
			let tmpKey = tmpKeys[i];
			let tmpValue = pParams[tmpKey];

			// Coerce booleans to integers (SQLite doesn't have a boolean type)
			if (typeof tmpValue === 'boolean')
			{
				tmpValue = tmpValue ? 1 : 0;
			}
			// Coerce undefined to null
			else if (typeof tmpValue === 'undefined')
			{
				tmpValue = null;
			}
			// Coerce objects and arrays to JSON strings
			// (SQLite has no native object type; JSON/JSONProxy
			// columns are stored as TEXT)
			else if (typeof tmpValue === 'object' && tmpValue !== null)
			{
				tmpValue = JSON.stringify(tmpValue);
			}

			// Add the colon prefix for sql.js named parameters
			// (skip if the key already starts with ':')
			if (tmpKey.charAt(0) === ':')
			{
				tmpConverted[tmpKey] = tmpValue;
			}
			else
			{
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
	function positionalParams(pArgs)
	{
		if (pArgs.length === 0)
		{
			return undefined;
		}
		let tmpArr = [];
		for (let i = 0; i < pArgs.length; i++)
		{
			let tmpVal = pArgs[i];
			if (typeof tmpVal === 'boolean')
			{
				tmpVal = tmpVal ? 1 : 0;
			}
			else if (typeof tmpVal === 'undefined')
			{
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
	function resolveBindParams(pArgs)
	{
		if (pArgs.length === 0)
		{
			return undefined;
		}

		let tmpFirst = pArgs[0];

		// Named parameter object (not null, not array, plain object)
		if (tmpFirst !== null && typeof tmpFirst === 'object' && !Array.isArray(tmpFirst))
		{
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
	function resultsToRows(pResults)
	{
		if (!pResults || pResults.length === 0)
		{
			return [];
		}

		let tmpColumns = pResults[0].columns;
		let tmpValues = pResults[0].values;
		let tmpRows = [];

		for (let i = 0; i < tmpValues.length; i++)
		{
			let tmpRow = {};
			for (let j = 0; j < tmpColumns.length; j++)
			{
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
	function getLastInsertRowid()
	{
		let tmpResult = pSqlJsDb.exec('SELECT last_insert_rowid() AS rowid');
		if (tmpResult.length > 0 && tmpResult[0].values.length > 0)
		{
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
		prepare: function(pSQL)
		{
			return {
				/**
				 * Execute a non-SELECT statement (INSERT, UPDATE, DELETE).
				 *
				 * Accepts either a named parameter object or positional arguments.
				 *
				 * @param {object} [pParams] - Named parameters
				 * @returns {{ lastInsertRowid: number, changes: number }}
				 */
				run: function(pParams)
				{
					let tmpBindParams = resolveBindParams(arguments);

					try
					{
						pSqlJsDb.run(pSQL, tmpBindParams);
					}
					catch (pError)
					{
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
				all: function(pParams)
				{
					let tmpBindParams = resolveBindParams(arguments);
					let tmpResults;

					try
					{
						tmpResults = pSqlJsDb.exec(pSQL, tmpBindParams);
					}
					catch (pError)
					{
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
				get: function(pParams)
				{
					let tmpBindParams = resolveBindParams(arguments);
					let tmpResults;

					try
					{
						tmpResults = pSqlJsDb.exec(pSQL, tmpBindParams);
					}
					catch (pError)
					{
						console.error('[BetterSqlite3Compat] get() error:', pError.message, '\nSQL:', pSQL, '\nParams:', tmpBindParams);
						throw pError;
					}

					if (!tmpResults || tmpResults.length === 0 || tmpResults[0].values.length === 0)
					{
						return undefined;
					}

					// Return first row as object
					let tmpColumns = tmpResults[0].columns;
					let tmpValues = tmpResults[0].values[0];
					let tmpRow = {};
					for (let j = 0; j < tmpColumns.length; j++)
					{
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
		exec: function(pSQL, pParams)
		{
			let tmpBindParams = convertParams(pParams);
			pSqlJsDb.run(pSQL, tmpBindParams);
		}
	};
}

module.exports = createBetterSqlite3Compat;
