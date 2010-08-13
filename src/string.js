/**
 * Beezwax.HTML
 * HTML string convenience functions
 **/
Beezwax.HTML = {
	
	LINK_PATTERN : /(https?:\/\/[^\<\>\s]+)/,
	
	/**
	 * Beezwax.HTML.escapeQuotes(string) 
	 * - string (String): string to escape
	 **/
	escapeQuotes : function(string) {
		return string.escapeHTML().gsub(/"|\'/, function(m) {
			return m[0] == '"' ? '&quot;' : '&#039;';
		}) 
	},

	/**
	 * Beezwax.HTML.flattenAttributes(attributes) 
	 * - attributes (Object | Hash): map of HTML attributes
	 **/
	flattenAttributes : function(attributes) {
		return $H(attributes).collect(function(attribute) {
			var value = Object.isArray(attribute.value) ? attribute.value.join(' ') : attribute.value;
			return attribute.key + '="' + Beezwax.HTML.escapeQuotes(value) + '"';
		}).join(' ');
	},
	
	/**
	 * Beezwax.HTML.linkify(string[, attributes, shorten])
	 * - text (String): text to linkify
	 * - attributes (Object | Hash): map of element attributes to include in anchors
	 * - shorten (Number): maxiumum link text length
	 **/
	linkify : function(text, attributes, shorten) {
		return text.gsub(Beezwax.HTML.LINK_PATTERN, function(m) {
			var url = m[1], shortened = url;
			if (shorten && url.length > 30) shortened = url.substring(0, shorten) + '…';
			attributes = Beezwax.HTML.flattenAttributes(
				Object.extend(attributes || {}, { href : url })
			);
			return '<a ' + attributes + '>' + shortened + '</a>';
		});
	}
	
}