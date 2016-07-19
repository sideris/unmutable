let deepFreeze = require('deep-freeze')

module.exports = function unmutable (o) {
	let mew = {val: o};
	deepFreeze(o)

	mew.p = (val)		=> mew.val + val
	mew.m = (val)		=> mew.val - val
	mew.str = (val)		=> val
	mew.mul = (val)		=> mew.val * val
	mew.div = (val)		=> mew.val / val
	mew.powa = (val)	=> Math.pow(mew.val, val)
	mew.ass = (obj)		=> mew = unmutable(obj)
	mew.ref = ()		=> mew.val
	// TODO list operations

	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (o[prop] !== null) {
			mew[prop] = unmutable(o[prop])
			mew[prop].val = o[prop]
		}
	});
	Object.freeze(mew)

	return mew;
}