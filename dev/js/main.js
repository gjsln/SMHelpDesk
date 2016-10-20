var jQ = jQuery.noConflict();

var SMApp = SMApp || {};

(function(SMApp){
	jQ(document).ready(function() {
		jQ("#accordionMenu h3").click(function(){
		//slide up all the link lists
			jQ("#accordionMenu ul ul").slideUp();
			//slide down the link list below the h3 clicked - only if its closed
			if(!jQ(this).next().is(":visible"))
			{
				jQ(this).next().slideDown();
			}
		});
	});
})(SMApp);