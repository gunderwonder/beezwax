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