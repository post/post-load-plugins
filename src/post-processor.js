export default (...args) => {
	if (args.length === 0) {
		throw new TypeError('post-processor did not receive any arguments.');
	}

	let ctx = args.find(ctx => Reflect.has(ctx, 'processor')) || args.find(ctx => Reflect.has(ctx, 'name'));

	if (!ctx) {
		throw new TypeError('post-processor could not determine the process name.');
	}

	if (Reflect.has(ctx, 'name')) {
		ctx = {processor: ctx};
	}

	const { processor: { name, plugins } } = ctx;

	return {
		name: (name || 'postcss').toLowerCase(),
		plugins
	};
};
