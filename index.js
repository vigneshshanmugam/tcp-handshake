// (function(d){
	var d = document;
	var desAddr, protocol;
	var clientCont = d.querySelectorAll('.left-cont .result')[0];
	var serverCont = d.querySelectorAll('.right-cont .result')[0];

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

	var updateFields = function(packet, side){
		var addEle = d.createElement('p');
		var protoEle = d.createElement('p');
		getRequiredData(packet);
		if(side === 'client'){
			addEle.innerHTML = desAddr;
			protoEle.innerHTML = protocol;
			clientCont.appendChild(addEle);
			clientCont.appendChild(protoEle);
		}else{

		}
	}

// })(document);