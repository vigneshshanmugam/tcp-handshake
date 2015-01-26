var d = document;
var desAddr, protocol;
var clientCont = $('.left-cont .result');
var serverCont = $('.right-cont .result');

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
	var packetDiv = d.createElement('div');
	packetDiv.className = "packet-info";
	var addEle = d.createElement('span');
	var protoEle = d.createElement('span');
	getRequiredData(packet);
	if(side === 'client'){
		$(addEle).text(desAddr);
		$(protoEle).text(protocol);
		$(packetDiv).append(addEle).append(protoEle);
		clientCont.append(packetDiv);
	}else{

	}
};

localStorageUtil = {
    setObject : function(key, value) {
        if (!window.localStorage || !key || !value) {return;}
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObject : function(key) {
        if (!window.localStorage || !key) {return;}
        var data = localStorage.getItem(key);
        if(data) {
           return JSON.parse(data);
        }
    },
    removeObject : function(key){
        if (!window.localStorage || !key) {return;}
        localStorage.removeItem(key);
    }
};
