export default ctx => ({
	name: ctx.type === 'root' ? 'postcss' : 'posthtml'
});
