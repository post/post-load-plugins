import path from 'path';
import test from 'ava';
import processor from '../src/post-processor';

test('post processor should return function', t => {
	t.true(typeof processor === 'function');
});

test('post processor without arguments should return Error', t => {
	const error = t.throws(() => {
		processor();
	}, TypeError);

	t.is(error.message, 'post-processor did not receive any arguments.');
});

test('post processor without processor should return Error', t => {
	const tree = [];

	const error = t.throws(() => {
		processor(tree);
	}, TypeError);

	t.is(error.message, 'post-processor could not determine the process name.');
});

test('post processor should return posthtml', t => {
	const tree = [];
	const res = () => {};
	tree.processor = {name: 'posthtml', plugins: []};

	t.deepEqual(processor(tree, res), {name: 'posthtml', plugins: []})
});

test('post processor should return postcss', t => {
	const tree = [];
	const res = {
		processor: {
			plugins: []
		}
	};

	t.deepEqual(processor(tree, res), {name: 'postcss', plugins: []})
});

test('post processor should return reshape', t => {
	const tree = [];
	const res = {
		processor: {
			name: 'reshape'
		},
		plugins: []
	};

	t.deepEqual(processor(tree, res), {name: 'reshape', plugins: undefined})
});

// test('post processor call without arguments should return empty object', t => {
// 	t.deepEqual(processor(), {});
// });
