var expect = require('expect')
var um = require('./index')

function testNumberOps() {
	let one = um(1);
	one.val++
	let two = one.p(1);
	expect(um(two).powa(2)).toEqual(4);
	expect(one.m(1)).toEqual(0)
	// expect( one.set({a:1}).ref() ).toEqual({a:1})
	console.log('TEST:--- numbers passed')
}

function testArrayOps() {
	let testArray = [1, 2, 3, 4, 5]
	let umar = um(testArray)
	let v = umar.ref()
	expect(v).toEqual(testArray)
	expect( umar.push(6, 7) ).toEqual([...testArray, 6, 7])
	expect(umar.pop()).toEqual(testArray[testArray.length - 1])
	expect(umar.ref()).toEqual(v)
	var spliced = testArray.slice()
	spliced.splice(0, 3)
	expect(umar.spliced(0, 3)).toEqual(spliced)
	console.log('TEST:--- arrays passed')
}

function testObjectAssignment() {
	let obj = {a:1, b: {c:1}}
	let umObj = um(obj)
	let newObj = umObj.set('a', 4)
	expect(newObj.a, 4)
}

testNumberOps()
testArrayOps()
testObjectAsssignment()