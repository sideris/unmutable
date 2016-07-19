var expect = require('expect')
var um = require('./index')

function testNumbers() {
	let one = um(1);
	one.val++
	let two = one.p(1);
	expect(um(two).powa(2)).toEqual(4);
	expect(one.m(1)).toEqual(0)
	expect( one.ass({a:1}).ref() ).toEqual({a:1})
}

testNumbers()


