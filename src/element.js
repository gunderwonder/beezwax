/**
 * class Beezwax.Selection
 **/
Beezwax.Selection = Class.create({
	// TODO: add support for IE and arbitrary elements
	
	/**
	 * new Beezwax.Selection
	 **/
	initialize : function(element) {
		this.element = element;
	},
	
	/**
	 * Beezwax.Selection#start() -> Number
	 **/
	start : function() {
		if (this.element.selectionStart)
			return this.element.selectionStart;
		else
			; // ...
	},
	
	/**
	 * Beezwax.Selection#end() -> Number
	 **/
	end : function() {
		if (this.element.selectionEnd)
			return this.element.selectionEnd;
		else
			; // ...
	},
	
	/**
	 * Beezwax.Selection#start() -> undefined
	 **/
	moveTo : function(start, end) {
		end = end || start;
		if (this.element.selectionStart) {
			this.element.selectionStart = start;
			this.element.selectionEnd = end;
		} else
			; // ...
	},
	
	_selection : function() {
		return Try.these(
			function () { return window.getSelection(); },
			function () { return document.selection.createRange(); }
		);
	}
})

Element.addMethods(['textarea', 'input'], { 
	/**
 	 * Element.selection(@element) -> Beexwax.Selecton
 	 **/
	selection : function(element) { 
		var selection = element.retrieve('__selection__', null) || new Beezwax.Selection(element);
		element.store('__selection__', selection);
		return selection;
	}
});