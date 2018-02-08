export default (...args) => {
	if (args.length === 0) {
		throw new TypeError('post-processor did not receive any arguments.');
	}

	const ctx = args.find(ctx => Reflect.has(ctx, 'processor'));

	if (!ctx) {
		throw new TypeError('post-processor could not determine the process name.');
	}

	const { processor: { name, plugins } } = ctx;

	return {
		name: (name || 'postcss').toLowerCase(),
		plugins
	};
};
