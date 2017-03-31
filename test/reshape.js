import path from 'path';
import reshape from 'reshape';
import test from 'ava';
import postLoadPlugins from '../src/index.js';

process.chdir(path.resolve(process.cwd() + '/test'));

test('reshape with post-load-pliguns should return equal html', async t => {
	const html = '<div class="test">test</div>';
	t.is(html, (await reshape({plugins: [postLoadPlugins()]}).process(html)).output());
});

test('reshape with post-load-pliguns with reshape-custom-elements plugin', async t => {
	const html = '<span class="test">test</span>';
	t.is(html, (await reshape({plugins: [postLoadPlugins()]}).process(html)).output());
});

test('reshape with post-load-pliguns should report not install pkg', async t => {
	const html = `<body><p>hi there</p><div class='wow'>this is minified</div></body>`;
	const fixtures = `<body>
  <p>hi there</p>
  <div class="wow">this is minified</div>
</body>
`;
	const ext = {
		reshape: {
			plugins: {
				beautify: {}
			}
		}
	};
	t.is(fixtures, (await reshape({plugins: [postLoadPlugins(ext)]}).process(html)).output());
});
