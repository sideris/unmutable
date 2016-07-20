module.exports = function unmutable (o) {
	let mew = {val: o}
	Object.freeze(o)

	mew.p = (val)		=> mew.val + val
	mew.m = (val)		=> mew.val - val
	mew.str = (val)		=> val
	mew.mul = (val)		=> mew.val * val
	mew.div = (val)		=> mew.val / val
	mew.powa = (val)	=> Math.pow(mew.val, val)
	mew.ass = (obj)		=> mew = unmutable(obj)
	mew.ref = ()		=> mew.val
	mew.spliced = (ind = 0, nelems = 0, ...elems) =>[
														...mew.val.slice(0, ind),
														...elems,
														...mew.val.slice(ind + nelems, mew.val.length)
													]
	mew.push = (...elems) => [...mew.val, ...elems]
	mew.pop = () => mew.val[mew.val.length - 1]


	// TODO list operations
	// TODO methods only for each type?

	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (o[prop] !== null) {
			mew[prop] = unmutable(o[prop])
			mew[prop].val = o[prop]
		}
	});
	Object.freeze(mew)

	return mew
}