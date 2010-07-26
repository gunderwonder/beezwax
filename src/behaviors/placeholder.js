Beezwax.Behavior.PlaceholderInput = Class.create(S2.UI.Behavior, {
	initialize : function($super, element, options) {
		$super(element, options);
		this.window = window;
		
		/* don't apply behavior if the browser supports placeholder attribute
		 * or if placeholder is omitted
		 */ 
		if (this.supportsPlaceholderText()) return;
		this.text = this.placeholderText();
		if (!this.text) return;
		
		// clean up 
		this._remover = this.removePlaceholderText.bind(this);
		Event.on(window, 'unload', this._remover);
		this.addPlaceholderText();
	},
	
	supportsPlaceholderText : function() {
		return !!('placeholder' in document.createElement('input'));
	},
	
	/**
	 * Beezwax.Behavior.PlaceholderInput#placeholderText
	 * override this method if alternate source for placeholder text is required
	 *  (such as the title attribute or a data-* attribute) 
     **/
	placeholderText : function() {
		return this.element.readAttribute('placeholder');
	},
	
	addPlaceholderText : function() {
		if (!this.element.getValue())
			this.element.addClassName(this.options.placeholderClass).setValue(this.text);
	},
	
	removePlaceholderText : function() {
		if (this.element.hasClassName(this.options.placeholderClass))
			this.element.clear().removeClassName(this.options.placeholderClass); 
	},
	
	onFocus : function() { this.removePlaceholderText(); },
	onBlur : function() { this.addPlaceholderText(); },
	
	destroy : function($super) {
		$super();
		Event.stopObserving(window, this._remover);
	}
	
});

Object.extend(Beezwax.Behavior.PlaceholderInput, {
	DEFAULT_OPTIONS : {
		placeholderClass : 'ui-state-placeholder-input',
		window : window
	},
	
	SELECTOR : 'input[type=text][placeholder], textarea[placeholder]'
});
