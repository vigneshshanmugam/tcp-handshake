// (function(d){
	var d = document;
	var desAddr, protocol;

	var getValue = function(_for, _in) {
	    var r;
	    for (var p in _in) {
	    	if(_in.hasOwnProperty(p)){
		        if ( p === _for ) {
		            return _in[p];
		        }
		        if ( typeof _in[p] === 'object' ) {
		            if ( (r = getValue(_for, _in[p])) !== null ) {
		                return r;
		            }
		        }
		    }
	    }
	    return null;
	};

	var getRequiredData = function(packet){
		desAddr  = getValue('daddr', packet.link.ip);
		protocol = getValue('protocol', packet.link.ip);
	};

	var updateFields = function(packet){
		var addEle = d.querySelectorAll('.left-cont .addr')[0];
		var protoEle = d.querySelectorAll('.left-cont .protocol')[0];
		getRequiredData(packet);
		addEle.innerHTML = desAddr;
		protoEle.value = protocol;		
	}

// })(document);