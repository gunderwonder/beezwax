/**
 * Beezwax.symbol() => String
 *  gensym for JavaScript
 **/
Beezwax.symbol = (function() {
	var counter = 0;
	return function() { return '__gensym__' + ++counter };
})();

/**
 * $E(elementName[, attributes, contents]) -> Element
 * $E(elementName[, contents]) -> Element
 * - elementName (String):
 * - attributes (Object | Hash):
 * - contents (String | Element | Array):
 **/
function $E(elementName, attributes, contents) {	
	if (Object.isArray(attributes) || Object.isString(attributes) || Object.isElement(attributes)) {
		contents = attributes;
		attributes = {};
	}
	var element = new Element(elementName, attributes);
	if (Object.isArray(contents))
		contents.each(function(c) { element.insert(c); });
	else
		element.insert(contents);
	return element;
}