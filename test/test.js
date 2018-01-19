import path from 'path';
import test from 'ava';
import postLoadPlugins from '../src';

test('post-load-pliguns return function', t => {
	t.true(typeof postLoadPlugins() === 'function');
});
