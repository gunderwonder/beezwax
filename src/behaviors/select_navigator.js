Beezwax.Behavior.SelectNavigator = Class.create(S2.UI.Behavior, {	
	onchange : function() {
		window.location.href = this.element.getValue();
	}
})
