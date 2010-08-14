module('String');

with(Beezwax.HTML) {

test('Beezwax.HTML.escapeQuotes()', function() {
	equal(escapeQuotes('"string", \'string\''), "&quot;string&quot;, &#039;string&#039;", 'Escape quotes properly.');
})

test('Beezwax.HTML.flattenAttributes()', function() {
	equal(flattenAttributes({ 
			href : 'http://www.google.com',
			rel : 'nofollow'
		}), 
		'href="http://www.google.com" rel="nofollow"', 
		'Flatten plain HTML attributes'
	);
	
	equal(flattenAttributes({ 
			action : 'http://www.google.com/" onclick="evil();"',
		}), 
		'action="http://www.google.com/&quot; onclick=&quot;evil();&quot;"', 
		'Flatten HTML attributes, escaping quotes'
	);
	
	equal(flattenAttributes({ 
			'class' : ['foo', 'bar', 'baz'],
		}), 
		'class="foo bar baz"', 
		'Flatten HTML attributes with array values to space delimited strings'
	);
})

test('Beezwax.HTML.linkify()', function() {
	equal(
		linkify('This is a text with a link http://www.google.com to Google'),
		'This is a text with a link <a href="http://www.google.com">www.google.com</a> to Google',
		'Linkify text'
	);
	
	equal(
		linkify('This is a text with a link https://www.google.com to Google'),
		'This is a text with a link <a href="https://www.google.com">www.google.com</a> to Google',
		'Linkify text with `https` protocol'
	);
	
	equal(
		linkify('This is a text with a link http://www.google.com to Google', {}, 6),
		'This is a text with a link <a href="http://www.google.com">www.go…</a> to Google',
		'Linkify text and shorten anchor string to five characters'
	);
	
	equal(
		linkify('This is a text with a link http://www.google.com to Google', { rel : 'nofollow' }, 6),
		'This is a text with a link <a rel="nofollow" href="http://www.google.com">www.go…</a> to Google',
		'Linkify text with additional achor attributes'
	);
})

test('RegExp.reverse()', function() {
	same(/(\d+)/.reverse(1), '1');
	same(/(\d+), (\w+)/.reverse(1, 'foobar'), '1, foobar');
	(function() {
		try {
			/(\d+), (\w+)/.reverse(1);
		} catch (e) {
			ok(true, 'Insufficient arguments')
			console.log(e);
			return;
		}
		ok(false, 'Insufficient arguments');
	})();
	
	(function() {
		try {
			/(\d+), (\d+)/.reverse(1, 'a'); // wrong character class for `a`
		} catch (e) {
			ok(true, 'Invalid arguments');
			return;
		}
		ok(false, 'Invalid arguments');
	})();
	
	
})

}