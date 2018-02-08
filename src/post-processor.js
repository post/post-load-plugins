const detect = args => {
	const {processor: {name, plugins}} = args.find(ctx => Reflect.has(ctx, 'processor') && Reflect.has(ctx.processor, 'name'));

	return {
		name: (name || 'postcss').toLowerCase(),
		plugins
	}
};

export default (...ctx) => detect(ctx);
