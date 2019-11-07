const TypedMap = require('./typed-map.js');

const MapOfMap = TypedMap(Map, []);

const proto = MapOfMap.prototype;

proto._oldGet = proto.get;
proto._oldSet = proto.set;

proto.get = function(...keys){
	if(keys.length === 1){
		return this._oldGet(...keys);
	}
	else{
		let map = this._oldGet(keys[0]);
		if(map){
			return map.get(keys[1]);
		}
		else{
			return;
		}
	}
}

proto.set = function(...args){
	const item = args.pop();
	const keys = args;
	if(keys.length === 1){
		return this._oldSet(...keys);
	}
	else{
		let map = this._oldGet(keys[0]);
		if(map){
			return map.set(keys[1], item);
		}
		else{
			throw new Error();
		}
	}
}

proto[Symbol.iterator] = function*(){
	for(let key of this.keys()){
		let map = this.get(key);
		for(let pair of map){
			yield [key, ...pair];
		}
	}
}

module.exports = MapOfMap;