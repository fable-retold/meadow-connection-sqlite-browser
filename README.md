# Meadow Connection SQLite Browser

> **[&#9654; Read the Meadow-Connection-Sqlite-Browser Documentation](https://stevenvelozo.github.io/meadow-connection-sqlite-browser/)** &mdash; interactive docs with the full API reference.

A browser-compatible SQLite connection provider for the Meadow ORM. Drop-in replacement for [meadow-connection-sqlite](https://github.com/stevenvelozo/meadow-connection-sqlite) that uses [sql.js](https://github.com/sql-js/sql.js) (SQLite compiled to WASM) instead of better-sqlite3 (native Node.js addon).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why

The standard `meadow-connection-sqlite` package uses `better-sqlite3`, a native C++ addon that cannot run in a web browser. This package swaps in `sql.js` (SQLite compiled to WebAssembly) and wraps it with a better-sqlite3 compatible API, so the rest of the Meadow stack works without changes.

## Features

- **Browser + Node.js** -- Works in both environments. In the browser, sql.js is loaded via `<script>` tag. In Node.js, it falls back to `require('sql.js')`.
- **Same API Surface** -- Provides `.db`, `.connected`, `.connectAsync()`, `.preparedStatement`, and the full schema provider (`createTables`, `createIndices`, introspection, etc.)
- **better-sqlite3 Compat Layer** -- Wraps sql.js with `.prepare().run()`, `.prepare().all()`, `.prepare().get()`, and `.exec()` so Meadow-Provider-SQLite works transparently
- **In-Memory Only** -- Creates an in-memory SQLite database (no filesystem required)
- **Fable Service** -- Registers as `MeadowConnectionSQLite` service type, compatible with `dal.setProvider('SQLite')`

## Installation

```bash
npm install meadow-connection-sqlite-browser
```

## Browser Setup

The consuming web application must load sql.js itself. This package does **not** bundle sql.js -- it expects the WASM loader to be available at runtime.

### 1. Copy the sql.js files to your static assets

The two files you need are in `node_modules/sql.js/dist/`:

- `sql-wasm.js` -- The JavaScript loader
- `sql-wasm.wasm` -- The SQLite WASM binary

Copy both to the directory your HTML is served from (e.g. `dist/`).

### 2. Load sql-wasm.js via a script tag

```html
<script src="./sql-wasm.js"></script>
<script src="./your-app-bundle.js"></script>
```

This creates the global `initSqlJs` function that `meadow-connection-sqlite-browser` uses to initialize the WASM-based SQLite engine.

### 3. Exclude sql.js from your browserify bundle

The `browser` field in this package's `package.json` already tells browserify to exclude sql.js from the bundle. If you are using a custom build script, add:

```javascript
bundler.ignore('sql.js');
```

If you are using quackage, the `browser` field is respected automatically.

## Quick Start

### Fable Service Registration

```javascript
const libFable = require('fable');
const libMeadowConnectionSQLiteBrowser = require('meadow-connection-sqlite-browser');

let fable = new libFable({ Product: 'MyApp', ProductVersion: '1.0.0' });

// Register and instantiate the service
fable.serviceManager.addServiceType('MeadowSQLiteProvider', libMeadowConnectionSQLiteBrowser);
let connection = fable.serviceManager.instantiateServiceProvider('MeadowSQLiteProvider');

connection.connectAsync((pError, pDatabase) =>
{
	if (pError)
	{
		console.error('Connection failed:', pError);
		return;
	}

	// fable.MeadowSQLiteProvider is now set automatically
	// dal.setProvider('SQLite') works transparently

	// Use the better-sqlite3 compatible wrapper directly
	connection.db.exec('CREATE TABLE Test (id INTEGER PRIMARY KEY, name TEXT)');
	connection.db.prepare('INSERT INTO Test (name) VALUES (:name)').run({ name: 'hello' });
	let rows = connection.db.prepare('SELECT * FROM Test').all();
});
```

### With Meadow

```javascript
const libMeadow = require('meadow');

// After connectAsync succeeds:
let meadow = libMeadow.new(fable);
let dal = meadow.loadFromPackageObject(mySchemaPackage);
dal.setProvider('SQLite');
dal.setIDUser(1);

// Meadow CRUD operations now go through the in-memory SQLite database
```

## API

### `connectAsync(fCallback)`

Initialize sql.js and create an in-memory SQLite database.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | `Function` | Callback receiving `(error, database)` |

In the browser, uses the global `initSqlJs` function (from the `<script>` tag). In Node.js, falls back to `require('sql.js')`.

### `connect()`

Synchronous convenience wrapper (calls `connectAsync` without a callback, logs a warning).

### `db` (getter)

Returns the BetterSqlite3Compat wrapper -- a better-sqlite3 compatible API around the sql.js database. Supports:

- `.exec(sql)` -- Execute raw SQL
- `.prepare(sql).run(params)` -- Execute with named params, returns `{ lastInsertRowid, changes }`
- `.prepare(sql).all(params)` -- Query, returns array of row objects
- `.prepare(sql).get(params)` -- Query, returns first row or `undefined`

### `sqlJsDb` (getter)

Returns the raw sql.js `Database` instance for direct sql.js operations.

### `SQLite` (getter)

Returns the sql.js `SQL` constructor (for creating additional databases).

### `connected` (property)

Boolean indicating whether the database is connected.

### Schema Provider

All schema operations are delegated to the built-in Meadow-Schema-SQLite provider:

- `generateCreateTableStatement(pMeadowTableSchema)` -- Generate `CREATE TABLE` SQL
- `generateDropTableStatement(pTableName)` -- Generate `DROP TABLE IF EXISTS` SQL
- `createTable(pMeadowTableSchema, fCallback)` -- Execute a `CREATE TABLE`
- `createTables(pMeadowSchema, fCallback)` -- Create all tables from `{ Tables: [...] }`
- `createIndices(pMeadowTableSchema, fCallback)` -- Create all indices for a table
- `createAllIndices(pMeadowSchema, fCallback)` -- Create all indices for all tables
- `listTables(fCallback)` -- List all user tables
- `introspectTableColumns(pTableName, fCallback)` -- Get column definitions
- `introspectTableIndices(pTableName, fCallback)` -- Get index definitions
- `introspectDatabaseSchema(fCallback)` -- Full DDL schema for all tables
- `generateMeadowPackageFromTable(pTableName, fCallback)` -- Generate a Meadow package JSON

## Column Type Mapping

| Meadow Type | SQLite Column |
|-------------|---------------|
| `ID` | `INTEGER PRIMARY KEY AUTOINCREMENT` |
| `GUID` | `TEXT DEFAULT '0000...'` |
| `ForeignKey` | `INTEGER NOT NULL DEFAULT 0` |
| `Numeric` | `INTEGER NOT NULL DEFAULT 0` |
| `Decimal` | `REAL` |
| `String` | `TEXT NOT NULL DEFAULT ''` |
| `Text` | `TEXT` |
| `DateTime` | `TEXT` |
| `Boolean` | `INTEGER NOT NULL DEFAULT 0` |

## Node.js Usage

Works identically in Node.js -- `sql.js` is loaded via `require('sql.js')` as a fallback when the global `initSqlJs` is not available. No `<script>` tag or WASM file setup needed; sql.js resolves its own WASM binary automatically.

```bash
npm test
```

## Part of the Retold Framework

- [meadow](https://github.com/stevenvelozo/meadow) -- ORM and data access framework
- [meadow-connection-sqlite](https://github.com/stevenvelozo/meadow-connection-sqlite) -- Node.js SQLite provider (better-sqlite3)
- [foxhound](https://github.com/stevenvelozo/foxhound) -- Query DSL used by Meadow
- [meadow-endpoints](https://github.com/stevenvelozo/meadow-endpoints) -- RESTful endpoint generation
- [fable](https://github.com/stevenvelozo/fable) -- Application services framework

## License

MIT
