/**
 * Beezwax.HTML
 * HTML string convenience functions
 **/
Beezwax.HTML = (function() {
	
	var LINK_PATTERN = /(https?:\/\/[^\<\>\s]+)/;
	
	/**
	 * Beezwax.HTML.escapeQuotes(string) 
	 * - string (String): string to escape
	 **/
	function escapeQuotes(string) {
		return string.escapeHTML().gsub(/"|\'/, function(m) {
			return m[0] == '"' ? '&quot;' : '&#039;';
		}) 
	};

	/**
	 * Beezwax.HTML.flattenAttributes(attributes) 
	 * - attributes (Object | Hash): map of HTML attributes
	 **/
	function flattenAttributes(attributes) {
		return $H(attributes).collect(function(attribute) {
			var value = Object.isArray(attribute.value) ? attribute.value.join(' ') : attribute.value;
			return attribute.key + '="' + escapeQuotes(value) + '"';
		}).join(' ');
	};
	
	/**
	 * Beezwax.HTML.linkify(string[, attributes, shorten])
	 * - text (String): text to linkify
	 * - attributes (Object | Hash): map of element attributes to include in anchors
	 * - shorten (Number): maxiumum link text length
	 **/
	function linkify(text, attributes, shorten) {
		return text.gsub(LINK_PATTERN, function(m) {
			var url = m[1], shortened = url.gsub(/^(https?:\/\/)/, '');
			if (shorten && url.length > shorten) shortened = shortened.substring(0, shorten) + '…';
			attributes = flattenAttributes(Object.extend(attributes || {}, { href : url }));
			return '<a ' + attributes + '>' + shortened + '</a>';
		});
	}
	
	return { 
		escapeQuotes : escapeQuotes, 
		flattenAttributes : flattenAttributes, 
		linkify : linkify
	};
})();

/**
 * RegExp#reverse([args...]) -> String
 * Reverse a regular expression against a list of arguments. E.g.:
 * 		/(\d+)(\w+)/.reverse(1, 'foo') -> '1foo'
 **/
RegExp.prototype.reverse = function() {
	var REGEX_SUBPATTERN_RE = /\((.*?)\)/g,
		parameters = $A(arguments),
		pattern = this.toString().gsub(/(^\/|\/$)/, ''),
		matches = pattern.match(REGEX_SUBPATTERN_RE);
		
	if (matches && matches.length > parameters.length)
		throw 'Insufficient number of arguments to resolve /' + pattern + '/';
	
	var resolved = pattern, subpattern;
	if (matches)
		matches.zip(parameters, function(pair) {
			subpattern = pair[0], replacement = pair[1];
			
			// validate result
			if (!replacement.toString().match(new RegExp(subpattern))) 
				throw "Subpattern '" + subpattern + "' doesn't match '" + replacement + "'";
				
			// resolve the replacement
			resolved = resolved.replace(subpattern, replacement);
		})
	
	// remove special regex operators
	return resolved.gsub(/[\^\$\?]/, '');
}