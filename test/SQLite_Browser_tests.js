/**
 * @license     MIT
 * @author      Steven Velozo <steven@velozo.com>
 */

const Chai = require('chai');
const Expect = Chai.expect;

const libFable = require('fable');
const libMeadowConnectionSQLiteBrowser = require('../source/Meadow-Connection-SQLite-Browser.js');

const _FableConfig =
{
	'Product': 'MeadowSQLiteBrowserTest',
	'ProductVersion': '1.0.0',

	'UUID':
	{
		'DataCenter': 0,
		'Worker': 0
	},
	'LogStreams':
	[
		{
			'streamtype': 'console'
		}
	]
};

// A sample Stricture-compiled Meadow table schema
const _BookTableSchema =
{
	TableName: 'Book',
	Domain: 'Default',
	Columns:
	[
		{ Column: 'IDBook', DataType: 'ID' },
		{ Column: 'GUIDBook', DataType: 'GUID' },
		{ Column: 'Title', DataType: 'String', Size: '256' },
		{ Column: 'Description', DataType: 'Text' },
		{ Column: 'Price', DataType: 'Decimal', Size: '10,2' },
		{ Column: 'PageCount', DataType: 'Numeric' },
		{ Column: 'PublishDate', DataType: 'DateTime' },
		{ Column: 'InPrint', DataType: 'Boolean' },
		{ Column: 'IDAuthor', DataType: 'ForeignKey' }
	],
	Description: 'A table of books'
};

const _AuthorTableSchema =
{
	TableName: 'Author',
	Domain: 'Default',
	Columns:
	[
		{ Column: 'IDAuthor', DataType: 'ID' },
		{ Column: 'GUIDAuthor', DataType: 'GUID' },
		{ Column: 'Name', DataType: 'String', Size: '128' },
		{ Column: 'Bio', DataType: 'Text' }
	],
	Description: 'A table of authors'
};

suite
(
	'Meadow-Connection-SQLite-Browser',
	() =>
	{
		let _Fable;
		let _SQLiteConnection;

		suiteSetup(() =>
		{
			_Fable = new libFable(_FableConfig);
		});

		suite
		(
			'Connection',
			() =>
			{
				test
				(
					'Should instantiate via fable service provider',
					(fComplete) =>
					{
						_Fable.serviceManager.addServiceType('MeadowSQLiteProvider', libMeadowConnectionSQLiteBrowser);
						_SQLiteConnection = _Fable.serviceManager.instantiateServiceProvider('MeadowSQLiteProvider');
						Expect(_SQLiteConnection).to.be.an('object');
						Expect(_SQLiteConnection.connected).to.equal(false);
						return fComplete();
					}
				);

				test
				(
					'Should connect and create in-memory database',
					(fComplete) =>
					{
						_SQLiteConnection.connectAsync(
							(pError, pDatabase) =>
							{
								Expect(pError).to.be.null;
								Expect(_SQLiteConnection.connected).to.equal(true);
								Expect(_SQLiteConnection.db).to.be.an('object');
								Expect(_SQLiteConnection.db).to.have.property('prepare');
								Expect(_SQLiteConnection.db).to.have.property('exec');
								Expect(_SQLiteConnection.sqlJsDb).to.be.an('object');
								return fComplete();
							});
					}
				);

				test
				(
					'Should skip duplicate connect call',
					(fComplete) =>
					{
						_SQLiteConnection.connectAsync(
							(pError, pDatabase) =>
							{
								Expect(pError).to.be.null;
								Expect(_SQLiteConnection.connected).to.equal(true);
								return fComplete();
							});
					}
				);

				test
				(
					'Should be registered as fable.MeadowSQLiteProvider',
					(fComplete) =>
					{
						Expect(_Fable.MeadowSQLiteProvider).to.be.an('object');
						Expect(_Fable.MeadowSQLiteProvider.connected).to.equal(true);
						Expect(_Fable.MeadowSQLiteProvider.db).to.be.an('object');
						return fComplete();
					}
				);
			}
		);

		suite
		(
			'BetterSqlite3Compat',
			() =>
			{
				test
				(
					'Should exec() raw SQL',
					(fComplete) =>
					{
						_SQLiteConnection.db.exec('CREATE TABLE IF NOT EXISTS TestExec (id INTEGER PRIMARY KEY, name TEXT)');
						_SQLiteConnection.db.exec("INSERT INTO TestExec (name) VALUES ('hello')");
						let tmpRows = _SQLiteConnection.db.prepare('SELECT * FROM TestExec').all();
						Expect(tmpRows).to.be.an('array').with.length(1);
						Expect(tmpRows[0].name).to.equal('hello');
						_SQLiteConnection.db.exec('DROP TABLE TestExec');
						return fComplete();
					}
				);

				test
				(
					'Should prepare().run() with named params and return lastInsertRowid',
					(fComplete) =>
					{
						_SQLiteConnection.db.exec('CREATE TABLE IF NOT EXISTS TestRun (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
						let tmpResult = _SQLiteConnection.db.prepare('INSERT INTO TestRun (name) VALUES (:name)').run({ name: 'Alice' });
						Expect(tmpResult).to.have.property('lastInsertRowid');
						Expect(tmpResult).to.have.property('changes');
						Expect(tmpResult.lastInsertRowid).to.be.at.least(1);
						Expect(tmpResult.changes).to.equal(1);
						_SQLiteConnection.db.exec('DROP TABLE TestRun');
						return fComplete();
					}
				);

				test
				(
					'Should prepare().all() return array of row objects',
					(fComplete) =>
					{
						_SQLiteConnection.db.exec('CREATE TABLE IF NOT EXISTS TestAll (id INTEGER PRIMARY KEY AUTOINCREMENT, val TEXT)');
						_SQLiteConnection.db.prepare('INSERT INTO TestAll (val) VALUES (:val)').run({ val: 'one' });
						_SQLiteConnection.db.prepare('INSERT INTO TestAll (val) VALUES (:val)').run({ val: 'two' });
						_SQLiteConnection.db.prepare('INSERT INTO TestAll (val) VALUES (:val)').run({ val: 'three' });

						let tmpRows = _SQLiteConnection.db.prepare('SELECT * FROM TestAll ORDER BY id').all();
						Expect(tmpRows).to.be.an('array').with.length(3);
						Expect(tmpRows[0].val).to.equal('one');
						Expect(tmpRows[1].val).to.equal('two');
						Expect(tmpRows[2].val).to.equal('three');
						_SQLiteConnection.db.exec('DROP TABLE TestAll');
						return fComplete();
					}
				);

				test
				(
					'Should prepare().get() return single row or undefined',
					(fComplete) =>
					{
						_SQLiteConnection.db.exec('CREATE TABLE IF NOT EXISTS TestGet (id INTEGER PRIMARY KEY, name TEXT)');
						_SQLiteConnection.db.exec("INSERT INTO TestGet (id, name) VALUES (1, 'first')");
						_SQLiteConnection.db.exec("INSERT INTO TestGet (id, name) VALUES (2, 'second')");

						// Positional parameter
						let tmpRow = _SQLiteConnection.db.prepare('SELECT * FROM TestGet WHERE id = ?').get(1);
						Expect(tmpRow).to.be.an('object');
						Expect(tmpRow.name).to.equal('first');

						// Named parameter
						let tmpRow2 = _SQLiteConnection.db.prepare('SELECT * FROM TestGet WHERE id = :id').get({ id: 2 });
						Expect(tmpRow2).to.be.an('object');
						Expect(tmpRow2.name).to.equal('second');

						// No match → undefined
						let tmpRow3 = _SQLiteConnection.db.prepare('SELECT * FROM TestGet WHERE id = ?').get(999);
						Expect(tmpRow3).to.be.undefined;

						_SQLiteConnection.db.exec('DROP TABLE TestGet');
						return fComplete();
					}
				);

				test
				(
					'Should coerce booleans to integers',
					(fComplete) =>
					{
						_SQLiteConnection.db.exec('CREATE TABLE IF NOT EXISTS TestBool (id INTEGER PRIMARY KEY AUTOINCREMENT, active INTEGER)');
						_SQLiteConnection.db.prepare('INSERT INTO TestBool (active) VALUES (:active)').run({ active: true });
						_SQLiteConnection.db.prepare('INSERT INTO TestBool (active) VALUES (:active)').run({ active: false });

						let tmpRows = _SQLiteConnection.db.prepare('SELECT * FROM TestBool ORDER BY id').all();
						Expect(tmpRows[0].active).to.equal(1);
						Expect(tmpRows[1].active).to.equal(0);
						_SQLiteConnection.db.exec('DROP TABLE TestBool');
						return fComplete();
					}
				);
			}
		);

		suite
		(
			'Schema Provider',
			() =>
			{
				test
				(
					'Should generate a CREATE TABLE statement',
					(fComplete) =>
					{
						let tmpStatement = _SQLiteConnection.generateCreateTableStatement(_BookTableSchema);
						Expect(tmpStatement).to.be.a('string');
						Expect(tmpStatement).to.contain('CREATE TABLE IF NOT EXISTS Book');
						Expect(tmpStatement).to.contain('IDBook INTEGER PRIMARY KEY AUTOINCREMENT');
						Expect(tmpStatement).to.contain('Title TEXT NOT NULL');
						Expect(tmpStatement).to.contain('Price REAL');
						Expect(tmpStatement).to.contain('InPrint INTEGER NOT NULL DEFAULT 0');
						return fComplete();
					}
				);

				test
				(
					'Should generate a DROP TABLE statement',
					(fComplete) =>
					{
						let tmpStatement = _SQLiteConnection.generateDropTableStatement('Book');
						Expect(tmpStatement).to.equal('DROP TABLE IF EXISTS Book;');
						return fComplete();
					}
				);

				test
				(
					'Should create tables from schema',
					(fComplete) =>
					{
						_SQLiteConnection.createTables(
							{
								Tables: [_BookTableSchema, _AuthorTableSchema]
							},
							(pError) =>
							{
								Expect(pError).to.not.be.ok;
								return fComplete();
							});
					}
				);

				test
				(
					'Should list created tables',
					(fComplete) =>
					{
						_SQLiteConnection.listTables(
							(pError, pTables) =>
							{
								Expect(pError).to.be.null;
								Expect(pTables).to.be.an('array');
								Expect(pTables).to.include('Book');
								Expect(pTables).to.include('Author');
								return fComplete();
							});
					}
				);

				test
				(
					'Should introspect table columns',
					(fComplete) =>
					{
						_SQLiteConnection.introspectTableColumns('Book',
							(pError, pColumns) =>
							{
								Expect(pError).to.be.null;
								Expect(pColumns).to.be.an('array');
								// Find the IDBook column
								let tmpIDCol = pColumns.find((pCol) => pCol.Column === 'IDBook');
								Expect(tmpIDCol).to.be.an('object');
								Expect(tmpIDCol.DataType).to.equal('ID');
								return fComplete();
							});
					}
				);

				test
				(
					'Should generate index definitions',
					(fComplete) =>
					{
						let tmpIndices = _SQLiteConnection.getIndexDefinitionsFromSchema(_BookTableSchema);
						Expect(tmpIndices).to.be.an('array');
						// Should have GUID and ForeignKey indices at minimum
						let tmpGUIDIndex = tmpIndices.find((pIdx) => pIdx.Name === 'AK_M_GUIDBook');
						Expect(tmpGUIDIndex).to.be.an('object');
						Expect(tmpGUIDIndex.Unique).to.equal(true);
						let tmpFKIndex = tmpIndices.find((pIdx) => pIdx.Name === 'IX_M_IDAuthor');
						Expect(tmpFKIndex).to.be.an('object');
						return fComplete();
					}
				);

				test
				(
					'Should create indices on a table',
					(fComplete) =>
					{
						_SQLiteConnection.createIndices(_BookTableSchema,
							(pError) =>
							{
								Expect(pError).to.not.be.ok;
								return fComplete();
							});
					}
				);

				test
				(
					'Should introspect table indices',
					(fComplete) =>
					{
						_SQLiteConnection.introspectTableIndices('Book',
							(pError, pIndices) =>
							{
								Expect(pError).to.be.null;
								Expect(pIndices).to.be.an('array');
								Expect(pIndices.length).to.be.at.least(1);
								return fComplete();
							});
					}
				);

				test
				(
					'Should generate a Meadow package from an introspected table',
					(fComplete) =>
					{
						_SQLiteConnection.generateMeadowPackageFromTable('Book',
							(pError, pPackage) =>
							{
								Expect(pError).to.be.null;
								Expect(pPackage).to.be.an('object');
								Expect(pPackage.Scope).to.equal('Book');
								Expect(pPackage.DefaultIdentifier).to.equal('IDBook');
								Expect(pPackage.Schema).to.be.an('array');
								Expect(pPackage.DefaultObject).to.be.an('object');
								return fComplete();
							});
					}
				);
			}
		);

		suite
		(
			'CRUD via Compat Layer',
			() =>
			{
				test
				(
					'Should INSERT, SELECT, UPDATE, DELETE through the compat layer',
					(fComplete) =>
					{
						let tmpDb = _SQLiteConnection.db;

						// INSERT
						let tmpInsertResult = tmpDb.prepare(
							'INSERT INTO Author (GUIDAuthor, Name, Bio) VALUES (:GUIDAuthor, :Name, :Bio)'
						).run({
							GUIDAuthor: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
							Name: 'Jane Austen',
							Bio: 'English novelist'
						});
						Expect(tmpInsertResult.lastInsertRowid).to.be.at.least(1);
						Expect(tmpInsertResult.changes).to.equal(1);
						let tmpAuthorId = tmpInsertResult.lastInsertRowid;

						// SELECT all
						let tmpAuthors = tmpDb.prepare('SELECT * FROM Author WHERE IDAuthor = :IDAuthor').all({ IDAuthor: tmpAuthorId });
						Expect(tmpAuthors).to.be.an('array').with.length(1);
						Expect(tmpAuthors[0].Name).to.equal('Jane Austen');

						// SELECT get
						let tmpAuthor = tmpDb.prepare('SELECT * FROM Author WHERE IDAuthor = ?').get(tmpAuthorId);
						Expect(tmpAuthor).to.be.an('object');
						Expect(tmpAuthor.Name).to.equal('Jane Austen');

						// UPDATE
						let tmpUpdateResult = tmpDb.prepare(
							'UPDATE Author SET Bio = :Bio WHERE IDAuthor = :IDAuthor'
						).run({
							Bio: 'English novelist known for her wit',
							IDAuthor: tmpAuthorId
						});
						Expect(tmpUpdateResult.changes).to.equal(1);

						// Verify update
						let tmpUpdated = tmpDb.prepare('SELECT Bio FROM Author WHERE IDAuthor = ?').get(tmpAuthorId);
						Expect(tmpUpdated.Bio).to.equal('English novelist known for her wit');

						// DELETE
						let tmpDeleteResult = tmpDb.prepare('DELETE FROM Author WHERE IDAuthor = :IDAuthor').run({ IDAuthor: tmpAuthorId });
						Expect(tmpDeleteResult.changes).to.equal(1);

						// Verify delete
						let tmpDeleted = tmpDb.prepare('SELECT * FROM Author WHERE IDAuthor = ?').get(tmpAuthorId);
						Expect(tmpDeleted).to.be.undefined;

						return fComplete();
					}
				);
			}
		);
	}
);
