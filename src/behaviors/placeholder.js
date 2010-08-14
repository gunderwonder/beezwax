/** section: beezwax behavior
 * class Beezwax.Behavior.PlaceholderInput < S2.UI.Behavior
 *  
 * A behavior which simulates support HTML5's `placeholder` attribute.
 **/
Beezwax.Behavior.PlaceholderInput = Class.create(S2.UI.Behavior, {
	initialize : function($super, element, options) {
		$super(element, options);
		
		/* don't apply behavior if the browser supports placeholder attribute
		 * or if placeholder is omitted
		 */ 
		this.text = this.placeholderText();
		if (!this.text || this._supportsPlaceholderText()) {
			this.destroy();
			return;
		}
		
		// clean up before window unloads/form submits
		this._remover = this._removePlaceholderText.bind(this);
		Event.on(window, 'unload', this._remover);
		if (element.form) element.form.on('submit', this._remover);
		
		// insert placeholder text on initialization
		this._addPlaceholderText();
	},
	
	// check for native support
	_supportsPlaceholderText : function() {
		return !!('placeholder' in document.createElement('input'));
	},
	
	_addPlaceholderText : function() {
		if (!this.element.getValue())
			this.element.addClassName(this.options.placeholderClass).setValue(this.text);
	},
	
	_removePlaceholderText : function() {
		if (this.element.hasClassName(this.options.placeholderClass))
			this.element.clear().removeClassName(this.options.placeholderClass); 
	},
	
	/**
	 * Beezwax.Behavior.PlaceholderInput#placeholderText
	 * override this method if alternate source for placeholder text is required
	 * (such as the title attribute or a `data-*` attribute) 
     **/
	placeholderText : function() {
		return this.element.readAttribute('placeholder');
	},
	
	onfocus : function() { this._removePlaceholderText(); },
	onblur : function() { this._addPlaceholderText(); },
	
	destroy : function($super) {
		$super();
		Event.stopObserving(window, this._remover);
	}
	
});

Object.extend(Beezwax.Behavior.PlaceholderInput, {
	DEFAULT_OPTIONS : {
		placeholderClass : 'ui-state-placeholder-input'
	},
	
	// selector to target input fields with placeholder text
	SELECTOR : 'input[type=text][placeholder], textarea[placeholder]'
});
