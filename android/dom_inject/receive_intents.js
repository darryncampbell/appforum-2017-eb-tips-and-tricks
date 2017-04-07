if (window.location.href.indexOf("scan.html") !== -1)
{
	//  On Scan.html page
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
          startListening(); //use api here
        });
    })();
}

function startListening()
{
	console.log('DOM Injection: Receive Intents');
	EB.Intent.startListening(
		function(intent)
		{
            console.log(JSON.stringify(intent));
			barcodeJson = intent.data;
            source = barcodeJson['com.symbol.datawedge.source'];
            if (source == 'simulscan')
            {
                //  Handle SimulScan Data
                decodedRegions = barcodeJson['com.symbol.datawedge.simulscan_region_data'];
                barcode1 = decodedRegions[0];
                barcode1Data = barcode1['com.symbol.datawedge.simulscan_region_string_data'];
                barcode2 = decodedRegions[1];
                barcode2Data = barcode2['com.symbol.datawedge.simulscan_region_string_data'];
                receivedBarcode("" + barcode1Data);
                receivedBarcode("" + barcode2Data);
            }
            else
            {
                //  It is just a regular barcode scan
    			receivedBarcode(barcodeJson['com.symbol.datawedge.data_string']);
            }
		});
}

function receivedBarcode(text)
{
    if (text.indexOf("978") ===0)
        document.getElementById('txt_asset').value = text;
    else
        document.getElementById('txt_part').value = text;

	if (document.getElementById('txt_asset').value != "" &&
		document.getElementById('txt_part').value != "")
		{
			//  Give focus to the quantity field
			document.getElementById('txt_qty').focus();
		}
}
