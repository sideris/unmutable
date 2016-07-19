let deepFreeze = require('deep-freeze')

module.exports = function unmutable (o) {
	let mewO = {val: o};
	deepFreeze(o)

	mewO.pp = (val)     => mewO.val + val
	mewO.nn = (val)     => mewO.val - val
	mewO.str = (val)    => val
	mewO.mul = (val)    => mewO.val * val
	mewO.div = (val)    => mewO.val / val
	mewO.powa = (val)   => Math.pow(mewO.val, val)
	mewO.assign = (obj) => mewO = unmutable(obj)
	// TODO list operations

	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (o[prop] !== null) {
			mewO[prop] = unmutable(o[prop])
			mewO[prop].val = o[prop]
		}
	});
	Object.freeze(mewO)

	return mewO;
};