test('Basic requirements', function() {
	ok(document.head && document.head.nodeName && document.head.nodeName == 'HEAD', 
		'document.head should be defined');
	equal(Function.EMPTY(), undefined, 'Function.EMPTY() == undefined');
	equal(Function.IDENTITY(1), 1, 'Function.EMPTY(x) == x');
	$w('log debug info warn error assert dir dirxml trace' +
		' group groupEnd time timeEnd profile profileEnd count').each(function(f) {
		ok(typeof console[f] == 'function');
	})
})