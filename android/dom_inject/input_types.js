
if (window.location.href.indexOf("scan.html") !== -1)
{
	console.log('DOM Injection: Input Types');
	//  The part ID will be a scanned text field
	var partNumberNode = document.getElementById('txt_part');
	partNumberNode.type = 'text';
	partNumberNode.setAttribute("z_method", "scan");
	
	//  The asset number will be a scanned numeric field
	var assetNumberNode = document.getElementById('txt_asset');
	assetNumberNode.type = 'number';
	assetNumberNode.setAttribute("z_method", "scan");
	
	//  The quantity will be a numeric field but not scanned
	var qtyNumberNode = document.getElementById('txt_qty');
	qtyNumberNode.type = 'number';
	
	z_tackle();
		
}

function z_tackle() {
	z_takle_internal(document.body, 0x7FFF0000);
}

function z_takle_internal(element, id) {
    if(null == element)
        return -1;

    if('input' == element.nodeName.toLowerCase()) {
        //console.log("element.nodeName: " + element.nodeName + ", element.type: " + element.getAttribute("type") + ", id: " + id.toString(16));

		var numericId = id;
        id++;

        element.addEventListener("focus", function(){
			var method = element.getAttribute("z_method");
			if(null == method)
				method = "";
			
			var name = element.getAttribute("id");
			if(null == name)
				name = numericId;

			var type = element.getAttribute("type");
			if(null == type)
				type = "text";
			
			if("button" == type.toLowerCase())
				return;

			var uri = "zebra://input?id=" + numericId
				 + "&name=" + name
				 + "&type=" + type
				 + "&method=" + method;

			try {
				if(typeof EB != "undefined") {
					EB.Sip.show();
					EB.System.openUrl(uri);
				} else {
					javascript:document.location = uri;
				}
			} catch (err) {
				console.log("error: " + err.message);
			}
		});
    }

    if(0 == element.childElementCount)
        return id;

    for (var i = 0; i < element.childElementCount; i++) {
        //console.log(element.nodeName + "[" + i + "]: " + element.children[i].nodeName);
        var rc = z_takle_internal(element.children[i], id);
        if(rc > 0)
            id = rc;
    }

    return id;
};

