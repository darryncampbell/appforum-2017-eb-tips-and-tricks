console.log('DOM Injection: Send Intents');
var actionParameter = "DISABLE_PLUGIN";
if (window.location.href.indexOf("scan.html") !== -1)
{
	//  On Scan.html page, Enable the scanner
	actionParameter = "ENABLE_PLUGIN"
}

//  EB Docs recommend waiting for dependencies to be ready for JS loaded from server
(function() {
	// Poll for EB to come into existence
	var checkReady = function(callback) {
		if (window.EB) {
			callback(EB);
		}
		else {
			window.setTimeout(function() { checkReady(callback); }, 100); //check here
		}
	};
	// Start polling...
	checkReady(function(EB) {
		EB.Intent.send(
			{
				'intentType':EB.Intent.BROADCAST,
				'action':'com.symbol.datawedge.api.ACTION_SCANNERINPUTPLUGIN',
				'data':{'com.symbol.datawedge.api.EXTRA_PARAMETER':actionParameter}
			});
	});
})();
