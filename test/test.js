import path from 'path';
import {readFile, existsSync} from 'fs';
import posthtml from 'posthtml';
import postcss from 'postcss';
import execa from 'execa';
import tempfile from 'tempfile';
import test from 'ava';
import postLoadPlugins from '../src/index.js';

process.chdir(path.resolve(process.cwd() + '/test'));

const read = path => new Promise((resolve, reject) => {
	readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err);
		}
		return resolve(data);
	});
});

test('post-load-pliguns return array', t => {
	t.true(typeof postLoadPlugins() === 'function');
});

test('post-load-pliguns default config for posthtml from package.json', async t => {
	t.is(
		(await read('expected/output-default-config-from-pkg.html')),
		(await posthtml(postLoadPlugins()).process(await read('fixtures/input.html'))).html
	);
});

test('post-load-pliguns default config for postcss from package.json', async t => {
	t.is(
		'.test{display:-ms-flexbox;display:flex;color:red}',
		(await postcss(postLoadPlugins()).process('.test { display: flex; color: #ff0000;} @charset "utf-8";')).css
	);
});

test('post-load-pliguns default config for postcss-cli from package.json', async t => {
	t.plan(2);
	const filename = tempfile('.css');
	await execa('postcss', ['-u', path.resolve('../lib/index.js'), '-o', filename, 'fixtures/input-for-cli.css']);
	const fix = await read('expected/output-for-cli.css');
	const exp = await read(filename);
	t.true(existsSync(filename));
	t.is(fix, exp);
});
