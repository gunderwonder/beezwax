module('Cookie', (function() {
	
	// http://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript/179514#179514
	function deleteAllCookies() {
    	var cookies = document.cookie.split(";");

    	for (var i = 0; i < cookies.length; i++) {
        	var cookie = cookies[i];
        	var eqPos = cookie.indexOf("=");
        	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    	}
	}

	return {
		setup : deleteAllCookies,
		teardown : deleteAllCookies
	}
	
})());

test('Basic requirements', function() {
	ok(Beezwax && Beezwax.Cookie, 'Beezwax.Cookie should be defined globally');
});

test('Setting and getting cookies', function() {
	(function(c) {
		var x = 1;
		same(c.set('k', x), x, 'Beezwax.Cookie.set(k, v) === x');
		equal(c.get('k'), x, 'Beezwax.Cookie.get(k) == x');
		same(c.get('k'), x, 'Beezwax.Cookie.get(k) === x');
		
		same(c.remove('k'), x, 'Beezwax.Cookie.remove(k) === x');
		same(c.get('k'), undefined, 'Getting a cookie after it has been removed should yield `undefined`');
		
		var y = { a : 1, b : 2 };
		same(c.set('k2', y), y, 'Beezwax.Cookie.set(k, y) === y where y is an object');
		equal(c.get('k2').toString(), y.toString(), '(string)Beezwax.Cookie.get(k) == (string)y where y is an object');
		same(c.get('k2'), y, 'Beezwax.Cookie.get(k) === y where y is an object');
		
		same(c.get('k3'), undefined, 'Getting an undefined cookie should yield `undefined`');
		same(c.get('k3', 1), 1, 'Getting an undefined cookie with a default value should yield the default value');
		
		
	})(Beezwax.Cookie);
});

test('Setting and getting cookies with expiry dates', function() {
	stop();
	(function(c) {
		c.set('k', 1, { expiry : 1 });
		same(c.get('k'), 1, 'Getting cookie before it expires should yield the cookie\'s value');
		stop();
		window.setTimeout(function() {
			same(c.get('k'), undefined, 'Getting cookie after it expires should yield `undefined`');
			start();
		}, 1500)
	}(Beezwax.Cookie))
});