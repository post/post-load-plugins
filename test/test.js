import path from 'path';
import {readFile} from 'fs';
import posthtml from 'posthtml';
import postcss from 'postcss';
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
	t.true(Array.isArray(postLoadPlugins()));
});

/* test('post-load-pliguns return default config', async t => {
	t.is(
		[],
		await postLoadPlugins()
	);
}); */

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

/* test('Plugin reads custom json config from posthtml.json', async t => {
	t.is(
		(await read('expected/output-config-pkg.html')),
		(await posthtml(postLoadPlugins('fixtures/posthtml.json')).process(await read('fixtures/input.html'))).html
	);
});

test('should throw not install plugin posthtml-css', async t => {
	t.is(
		(await read('expected/output-config-pkg.html')),
		(await posthtml(postLoadPlugins('fixtures/posthtml.json', {css: {}, postcss: {}})).process(await read('fixtures/input.html'))).html
	);
}); */

/* test('test witch posthtml-css-modules', async t => {
	t.is(
		(await read('expected/output-modules.html')),
		(await posthtml(postLoadPlugins('fixtures/modules.json', {'posthtml-css-modules': 'dist/css-modules.json', 'posthtml-each': {}})).process(await read('fixtures/input-modules.html'))).html
	);
});

*/
