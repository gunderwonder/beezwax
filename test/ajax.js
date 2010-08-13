module('Ajax');

test('Beexwax.load()', function() {
	stop();
	
	Beezwax.load('support/script.js', function() {
		same(A, 1, 'Load a script and test variable definition');
		start();
	})
});

test('Beezwax.JSONP()', function() {
	stop();
	Beezwax.JSONP('http://twitter.com/status/user_timeline/twitter.json?count=1', function(data) {
		ok(Object.isArray(data), 'JSON data should contain an array of tweets');
		ok(data.length == 1, 'Data should contain an array of 1 tweet.');
		start();
	})
})