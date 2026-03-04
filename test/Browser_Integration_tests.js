/**
 * Headless browser integration tests for meadow-connection-sqlite-browser.
 *
 * Verifies the package works in a real browser environment:
 *  1) sql.js WASM loads and initializes correctly
 *  2) The BetterSqlite3Compat wrapper operates correctly in the browser
 *  3) The MeadowConnectionSQLiteBrowser class can be instantiated and connected
 *  4) CRUD operations work end-to-end through the compat layer
 *
 * Requires: npm run build (quackage) to have been run first so dist/ exists.
 *
 * @license MIT
 * @author Steven Velozo <steven@velozo.com>
 */

const Chai = require('chai');
const Expect = Chai.expect;

const libHTTP = require('http');
const libFS = require('fs');
const libPath = require('path');

const _PackageRoot = libPath.resolve(__dirname, '..');
const _DistDir = libPath.join(_PackageRoot, 'dist');
const _SqlJsDistDir = libPath.join(_PackageRoot, 'node_modules', 'sql.js', 'dist');

// Fable dist is loaded from CDN in the test HTML page — no local dist needed.
const _FABLE_CDN_URL = 'https://cdn.jsdelivr.net/npm/fable@3/dist/fable.min.js';

/**
 * Create a simple HTTP server that serves the static files needed
 * for the browser test page.
 *
 * @param {function} fCallback - Callback with (pError, pServer, pPort)
 */
function startTestServer(fCallback)
{
	let tmpMimeTypes =
	{
		'.html': 'text/html',
		'.js': 'application/javascript',
		'.wasm': 'application/wasm',
		'.map': 'application/json'
	};

	let tmpServer = libHTTP.createServer(
		(pRequest, pResponse) =>
		{
			let tmpUrl = pRequest.url;

			// Route: /  → test page (generated inline)
			if (tmpUrl === '/' || tmpUrl === '/index.html')
			{
				pResponse.writeHead(200, { 'Content-Type': 'text/html' });
				pResponse.end(generateTestHTML());
				return;
			}

			// Route: /sql-wasm.js, /sql-wasm.wasm → from sql.js dist
			if (tmpUrl === '/sql-wasm.js' || tmpUrl === '/sql-wasm.wasm')
			{
				let tmpFilePath = libPath.join(_SqlJsDistDir, tmpUrl.slice(1));
				serveFile(tmpFilePath, pResponse, tmpMimeTypes);
				return;
			}

			// Route: /meadow-connection-sqlite-browser.js → from dist/
			if (tmpUrl.startsWith('/meadow-connection-sqlite-browser'))
			{
				let tmpFilePath = libPath.join(_DistDir, tmpUrl.slice(1));
				serveFile(tmpFilePath, pResponse, tmpMimeTypes);
				return;
			}

			pResponse.writeHead(404);
			pResponse.end('Not Found');
		});

	// Listen on a random available port
	tmpServer.listen(0, '127.0.0.1',
		() =>
		{
			let tmpPort = tmpServer.address().port;
			return fCallback(null, tmpServer, tmpPort);
		});
}

/**
 * Serve a static file from the filesystem.
 *
 * @param {string} pFilePath - Absolute path to file
 * @param {object} pResponse - HTTP response object
 * @param {object} pMimeTypes - Extension → MIME type map
 */
function serveFile(pFilePath, pResponse, pMimeTypes)
{
	if (!libFS.existsSync(pFilePath))
	{
		pResponse.writeHead(404);
		pResponse.end('File not found: ' + pFilePath);
		return;
	}

	let tmpExt = libPath.extname(pFilePath);
	let tmpContentType = pMimeTypes[tmpExt] || 'application/octet-stream';

	let tmpContent = libFS.readFileSync(pFilePath);
	pResponse.writeHead(200, { 'Content-Type': tmpContentType });
	pResponse.end(tmpContent);
}

/**
 * Generate the test HTML page that runs in the browser.
 *
 * The page loads:
 *   1) sql-wasm.js (creates global initSqlJs)
 *   2) fable.min.js from CDN (creates global Fable — real Fable built with quackage)
 *   3) meadow-connection-sqlite-browser.js (creates global MeadowConnectionSqliteBrowser)
 *
 * Tests exercise the full Fable service registration → connectAsync → CRUD path
 * in a real browser environment.  Results are stored on window.__TEST_RESULTS__.
 *
 * @returns {string} HTML content
 */
function generateTestHTML()
{
	return `<!DOCTYPE html>
<html>
<head><title>Meadow-Connection-SQLite-Browser Tests</title></head>
<body>
<h1>Browser Integration Tests</h1>
<pre id="output">Running tests...</pre>

<!-- Load sql.js WASM loader (creates global initSqlJs) -->
<script src="/sql-wasm.js"></script>

<!-- Load fable from CDN (creates global Fable) -->
<script src="${_FABLE_CDN_URL}"></script>

<!-- Load the built bundle (creates global MeadowConnectionSqliteBrowser) -->
<script src="/meadow-connection-sqlite-browser.js"></script>

<script>
(async function runTests()
{
	var results = [];
	var output = document.getElementById('output');

	function addResult(pName, pPassed, pError)
	{
		results.push({ name: pName, passed: pPassed, error: pError || null });
		output.textContent += '\\n' + (pPassed ? 'PASS' : 'FAIL') + ': ' + pName;
		if (pError)
		{
			output.textContent += ' (' + pError + ')';
		}
	}

	try
	{
		// ---- Test 1: initSqlJs global is available ----
		addResult(
			'initSqlJs global available',
			typeof initSqlJs === 'function'
		);

		// ---- Test 2: Fable global is available ----
		addResult(
			'Fable global available',
			typeof Fable === 'function'
		);

		// ---- Test 3: MeadowConnectionSqliteBrowser global is available ----
		addResult(
			'MeadowConnectionSqliteBrowser global available',
			typeof MeadowConnectionSqliteBrowser === 'function'
		);

		// ---- Test 4: Initialize sql.js WASM directly ----
		var SQL = await initSqlJs({ locateFile: function(pFile) { return '/' + pFile; } });
		addResult(
			'sql.js WASM initialized',
			!!SQL && typeof SQL.Database === 'function'
		);

		// ---- Test 5: Raw sql.js CRUD ----
		var rawDb = new SQL.Database();
		rawDb.run('CREATE TABLE RawTest (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)');
		rawDb.run("INSERT INTO RawTest (name) VALUES ('hello')");
		rawDb.run("INSERT INTO RawTest (name) VALUES ('world')");
		var rawRows = rawDb.exec('SELECT * FROM RawTest ORDER BY id');
		addResult(
			'raw sql.js CRUD works',
			rawRows.length === 1
			&& rawRows[0].values.length === 2
			&& rawRows[0].values[0][1] === 'hello'
			&& rawRows[0].values[1][1] === 'world'
		);
		rawDb.close();

		// ---- Test 6: Create a real Fable instance ----
		var fable = new Fable({
			Product: 'BrowserSQLiteTest',
			ProductVersion: '1.0.0',
			LogStreams: [{ streamtype: 'console' }]
		});
		addResult(
			'Fable instance created',
			typeof fable === 'object'
			&& fable.isFable === true
		);

		// ---- Test 7: Register connection as Fable service type ----
		fable.serviceManager.addServiceType('MeadowSQLiteProvider', MeadowConnectionSqliteBrowser);
		var connection = fable.serviceManager.instantiateServiceProvider('MeadowSQLiteProvider');
		addResult(
			'service registered and instantiated',
			typeof connection === 'object'
			&& connection.connected === false
		);

		// ---- Test 8: fable.MeadowSQLiteProvider is set ----
		addResult(
			'fable.MeadowSQLiteProvider is set',
			typeof fable.MeadowSQLiteProvider === 'object'
			&& fable.MeadowSQLiteProvider === connection
		);

		// ---- Test 9: connectAsync creates in-memory database ----
		await new Promise(function(resolve, reject)
		{
			connection.connectAsync(function(pError, pDatabase)
			{
				if (pError)
				{
					addResult('connectAsync', false, pError.message || String(pError));
					return reject(pError);
				}
				addResult(
					'connectAsync creates database',
					connection.connected === true
					&& typeof connection.db === 'object'
					&& typeof connection.db.prepare === 'function'
					&& typeof connection.db.exec === 'function'
				);
				resolve();
			});
		});

		// ---- Test 10: BetterSqlite3Compat exec() ----
		connection.db.exec('CREATE TABLE CompatTest (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value REAL)');
		connection.db.exec("INSERT INTO CompatTest (name, value) VALUES ('alpha', 1.5)");
		var compatRows = connection.db.prepare('SELECT * FROM CompatTest').all();
		addResult(
			'compat exec() and prepare().all()',
			Array.isArray(compatRows)
			&& compatRows.length === 1
			&& compatRows[0].name === 'alpha'
			&& compatRows[0].value === 1.5
		);

		// ---- Test 11: BetterSqlite3Compat prepare().run() with named params ----
		var runResult = connection.db.prepare(
			'INSERT INTO CompatTest (name, value) VALUES (:name, :value)'
		).run({ name: 'beta', value: 2.5 });
		addResult(
			'compat prepare().run() with named params',
			typeof runResult === 'object'
			&& typeof runResult.lastInsertRowid !== 'undefined'
			&& runResult.changes === 1
		);

		// ---- Test 12: BetterSqlite3Compat prepare().get() ----
		var getResult = connection.db.prepare(
			'SELECT * FROM CompatTest WHERE name = :name'
		).get({ name: 'beta' });
		addResult(
			'compat prepare().get()',
			typeof getResult === 'object'
			&& getResult.name === 'beta'
			&& getResult.value === 2.5
		);

		// ---- Test 13: BetterSqlite3Compat prepare().get() returns undefined for no match ----
		var noResult = connection.db.prepare(
			'SELECT * FROM CompatTest WHERE name = ?'
		).get('nonexistent');
		addResult(
			'compat prepare().get() returns undefined for no match',
			typeof noResult === 'undefined'
		);

		// ---- Test 14: Boolean coercion ----
		connection.db.exec('CREATE TABLE BoolTest (id INTEGER PRIMARY KEY AUTOINCREMENT, active INTEGER)');
		connection.db.prepare('INSERT INTO BoolTest (active) VALUES (:active)').run({ active: true });
		connection.db.prepare('INSERT INTO BoolTest (active) VALUES (:active)').run({ active: false });
		var boolRows = connection.db.prepare('SELECT * FROM BoolTest ORDER BY id').all();
		addResult(
			'boolean coercion (true->1, false->0)',
			boolRows[0].active === 1 && boolRows[1].active === 0
		);

		// ---- Test 15: Schema provider — generate CREATE TABLE ----
		var schemaSQL = connection.generateCreateTableStatement({
			TableName: 'SchemaTest',
			Columns: [
				{ Column: 'IDSchemaTest', DataType: 'ID' },
				{ Column: 'GUIDSchemaTest', DataType: 'GUID' },
				{ Column: 'Name', DataType: 'String', Size: '128' },
				{ Column: 'Value', DataType: 'Decimal', Size: '10,2' },
				{ Column: 'Active', DataType: 'Boolean' }
			]
		});
		addResult(
			'schema provider generateCreateTableStatement',
			typeof schemaSQL === 'string'
			&& schemaSQL.indexOf('CREATE TABLE IF NOT EXISTS SchemaTest') >= 0
			&& schemaSQL.indexOf('IDSchemaTest INTEGER PRIMARY KEY AUTOINCREMENT') >= 0
		);

		// ---- Test 16: Schema provider — createTables + CRUD through compat layer ----
		connection.db.exec(schemaSQL);
		connection.db.prepare(
			'INSERT INTO SchemaTest (GUIDSchemaTest, Name, Value, Active) VALUES (:GUIDSchemaTest, :Name, :Value, :Active)'
		).run({ GUIDSchemaTest: 'aaaa-bbbb-cccc', Name: 'Widget', Value: 9.99, Active: true });
		var schemaRow = connection.db.prepare('SELECT * FROM SchemaTest WHERE Name = :Name').get({ Name: 'Widget' });
		addResult(
			'schema-created table supports CRUD',
			typeof schemaRow === 'object'
			&& schemaRow.Name === 'Widget'
			&& schemaRow.Value === 9.99
			&& schemaRow.Active === 1
		);

		// ---- Test 17: sqlJsDb getter returns raw sql.js database ----
		addResult(
			'sqlJsDb getter returns raw database',
			typeof connection.sqlJsDb === 'object'
			&& typeof connection.sqlJsDb.run === 'function'
		);

		// ---- Test 18: Duplicate connectAsync is a no-op ----
		await new Promise(function(resolve, reject)
		{
			connection.connectAsync(function(pError, pDatabase)
			{
				addResult(
					'duplicate connectAsync is a no-op',
					!pError && connection.connected === true
				);
				resolve();
			});
		});
	}
	catch (pError)
	{
		addResult('unexpected error', false, pError.message || String(pError));
	}

	// Store final results for puppeteer to read
	window.__TEST_RESULTS__ = results;
	window.__TESTS_COMPLETE__ = true;

	output.textContent += '\\n\\nDone: '
		+ results.filter(function(r) { return r.passed; }).length + '/'
		+ results.length + ' passed';
})();
</script>
</body>
</html>`;
}

suite
(
	'Browser-Integration',
	function()
	{
		// Browser tests need extra time for WASM loading + puppeteer startup
		this.timeout(60000);

		let _Server;
		let _Port;
		let _Browser;
		let _Puppeteer;

		suiteSetup
		(
			function(fDone)
			{
				// Verify dist/ exists
				if (!libFS.existsSync(libPath.join(_DistDir, 'meadow-connection-sqlite-browser.js')))
				{
					return fDone(new Error(
						'dist/meadow-connection-sqlite-browser.js not found. Run "npm run build" first.'
					));
				}

				// Verify sql.js dist exists
				if (!libFS.existsSync(libPath.join(_SqlJsDistDir, 'sql-wasm.js')))
				{
					return fDone(new Error(
						'sql.js dist files not found. Run "npm install" first.'
					));
				}

				// Start the test server
				startTestServer(
					function(pError, pServer, pPort)
					{
						if (pError)
						{
							return fDone(pError);
						}
						_Server = pServer;
						_Port = pPort;

						// Load puppeteer
						try
						{
							_Puppeteer = require('puppeteer');
						}
						catch (pRequireError)
						{
							_Server.close();
							return fDone(new Error(
								'puppeteer is not installed. Run "npm install" to install it as a devDependency.'
							));
						}

						return fDone();
					});
			}
		);

		suiteTeardown
		(
			function(fDone)
			{
				let tmpCleanupSteps = [];

				if (_Browser)
				{
					tmpCleanupSteps.push(_Browser.close().catch(() => {}));
				}

				Promise.all(tmpCleanupSteps).then(
					function()
					{
						if (_Server)
						{
							_Server.close(fDone);
						}
						else
						{
							fDone();
						}
					});
			}
		);

		test
		(
			'All browser tests pass in headless Chrome',
			function(fDone)
			{
				_Puppeteer.launch(
					{
						headless: true,
						args: ['--no-sandbox', '--disable-setuid-sandbox']
					})
					.then(
						function(pBrowser)
						{
							_Browser = pBrowser;
							return _Browser.newPage();
						})
					.then(
						function(pPage)
						{
							// Capture console output for debugging
							pPage.on('console',
								function(pMessage)
								{
									if (pMessage.type() === 'error')
									{
										console.log('  [browser error]', pMessage.text());
									}
								});

							pPage.on('pageerror',
								function(pError)
								{
									console.log('  [browser page error]', pError.message);
								});

							return pPage.goto(`http://127.0.0.1:${_Port}/`, { waitUntil: 'networkidle0', timeout: 30000 })
								.then(function() { return pPage; });
						})
					.then(
						function(pPage)
						{
							// Wait for tests to complete
							return pPage.waitForFunction(
								'window.__TESTS_COMPLETE__ === true',
								{ timeout: 30000 }
							).then(function() { return pPage; });
						})
					.then(
						function(pPage)
						{
							// Read results
							return pPage.evaluate(function()
							{
								return window.__TEST_RESULTS__;
							});
						})
					.then(
						function(pResults)
						{
							// Assert each test passed
							Expect(pResults).to.be.an('array');
							Expect(pResults.length).to.be.above(0);

							let tmpFailures = [];

							for (let i = 0; i < pResults.length; i++)
							{
								let tmpResult = pResults[i];
								if (!tmpResult.passed)
								{
									tmpFailures.push(
										tmpResult.name + (tmpResult.error ? ': ' + tmpResult.error : '')
									);
								}
							}

							if (tmpFailures.length > 0)
							{
								Expect.fail(
									'Browser tests failed:\n  - ' + tmpFailures.join('\n  - ')
								);
							}

							console.log(`    ${pResults.length} browser sub-tests passed`);
							fDone();
						})
					.catch(
						function(pError)
						{
							fDone(pError);
						});
			}
		);
	}
);
