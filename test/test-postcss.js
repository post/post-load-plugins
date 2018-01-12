import path from 'path';
import {readFile, existsSync} from 'fs';
import postcss from 'postcss';
import execa from 'execa';
import tempfile from 'tempfile';
import test from 'ava';
import postLoadPlugins from 'src/index.js';

process.chdir(path.resolve(process.cwd() + '/test'));

const read = path => new Promise((resolve, reject) => {
	readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err);
		}
		return resolve(data);
	});
});

test('post-load-pliguns default config for postcss from package.json', async t => {
	t.is(
		'.test{display:-webkit-box;display:-ms-flexbox;display:flex;color:red}',
		(await postcss(postLoadPlugins()).process('.test { display: flex; color: #ff0000;} @charset "utf-8";', {map: false})).css
	);
});

/* eslint ava/no-skip-test: off */
test.skip('post-load-pliguns default config for postcss-cli from package.json', async t => {
	t.plan(2);
	const filename = tempfile('.css');
	await execa('postcss', ['-u', path.resolve('../lib/index.js'), '-o', filename, 'fixtures/input-for-cli.css', '--no-map']);
	const fix = await read('expected/output-for-cli.css');
	const exp = await read(filename);
	t.true(existsSync(filename));
	t.is(fix, exp);
});
