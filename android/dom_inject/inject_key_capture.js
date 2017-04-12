//  EB Docs recommend waiting for dependencies to be ready for JS loaded from server

(function() {
    // Poll for EB to come into existence
    var checkReady = function(callback) {
        if (window.EB) {
            callback(EB);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };
    // Start polling...
    checkReady(function(EB) {
        //  Remap the volume key to 'S' (TC51)
        console.log('DOM Injection: Key Remapping');
        EB.KeyCapture.remapKey('0x19', '0x53');
    });
})();

