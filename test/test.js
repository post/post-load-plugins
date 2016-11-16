const readFile = require('fs').readFile;
const posthtml = require('posthtml');
const test = require('ava');
const plugin = require('../src/index.js');

const read = path => new Promise((resolve, reject) => {
	readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err);
		}
		return resolve(data);
	});
});

test('Plugin return array', t => {
	t.true(Array.isArray(plugin()));
});

test('Plugin reads custom json config from posthtml.json', async t => {
	t.is(
		(await read('expected/output-config-pkg.html')),
		(await posthtml(plugin('fixtures/posthtml.json')).process(await read('fixtures/input.html'))).html
	);
});

test('test witch posthtml-css-modules', async t => {
	t.is(
		(await read('expected/output-modules.html')),
		(await posthtml(plugin('fixtures/modules.json', {'posthtml-css-modules': 'dist/css-modules.json', 'posthtml-each': {}})).process(await read('fixtures/input-modules.html'))).html
	);
});

test('should throw not install plugin posthtml-css', async t => {
	t.is(
		(await read('expected/output-config-pkg.html')),
		(await posthtml(plugin('fixtures/posthtml.json', {css: {}, postcss: {}})).process(await read('fixtures/input.html'))).html
	);
});
