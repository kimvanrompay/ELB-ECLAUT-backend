import esbuild from 'esbuild';
import {cpSync} from 'fs';
import {resolve} from 'path';

esbuild.buildSync({
	bundle: true,
	platform: 'node',
	target: 'node22',
	format: 'esm',
	treeShaking: true,
	logLevel: 'info',
	outdir: './build',
	legalComments: 'none',
	minify: true,
	minifyIdentifiers: true,
	minifySyntax: true,
	minifyWhitespace: true,
	external: [
		'sharp',
		'sqlite3',
		'pg-query-stream',
		'oracledb',
		'mysql2',
		'mysql',
		'tedious',
		'mssql',
		'better-sqlite3',
		'aws-sdk',
		'nock',
		'mock-aws-s3',
		'@mapbox/node-pre-gyp',
		'*.html',
	],
	entryPoints: ['./src/server.ts'],
	banner: {
		// see: https://github.com/evanw/esbuild/pull/2067
		js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
	},
});

const __dirname = import.meta.dirname;
cpSync(
	resolve(__dirname, '../../../libraries/services/src/email-service/templates'),
	resolve(__dirname, '../build', 'templates'),
	{recursive: true}
);
