module.exports = function unmutable (o) {
	let mew = {val: o}
	Object.freeze(o)

	mew.p = (val)		=> mew.val + val
	mew.m = (val)		=> mew.val - val
	mew.str = (val)		=> val
	mew.mul = (val)		=> mew.val * val
	mew.div = (val)		=> mew.val / val
	mew.powa = (val)	=> Math.pow(mew.val, val)
	mew.set = (obj)		=> mew = unmutable(obj)
	mew.ref = ()		=> mew.val
	mew.spliced = (ind = 0, nelems = 0, ...elems) =>[
														...mew.val.slice(0, ind),
														...elems,
														...mew.val.slice(ind + nelems, mew.val.length)
													]
	mew.push = (...elems) => [...mew.val, ...elems]
	mew.pop = () => mew.val[mew.val.length - 1]


	// TODO methods only for each type?
	/* TODO fix set. Need to return a new object with only the affected property changed
	 	Maybe wrap the functionality to a function to be returned and have something like
	 	 let a = mut(obj)
	 	 a.set(prop, value) // returns a new object with the value as set
	 */
	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (o[prop] !== null) {
			mew[prop] = unmutable(o[prop])
			mew[prop].val = o[prop]
		}
	});
	Object.freeze(mew)

	return mew
}