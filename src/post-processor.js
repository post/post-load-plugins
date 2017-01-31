import 'babel-polyfill';

export default ctx => ({
	name: Reflect.has(ctx, 'processor') && Reflect.has(ctx.processor, 'name') ? ctx.processor.name : 'postcss'
});
