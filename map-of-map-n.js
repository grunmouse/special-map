const TypedMap = require('./typed-map.js');
const MapOfMap = require('./map-of-map.js');
const mapping = [null, Map, MapOfMap];

function MapOfMapN(N){
	if(N < mapping.length){
		return mapping[N];
	}
	
	const Cls = TypedMap(MapOfMap(N-1), []);
	
	const proto = Cls.prototype;

	proto._oldGet = proto.get;
	proto._oldSet = proto.set;

	proto.get = function(...keys){
		if(keys.length === 1){
			return this._oldGet(...keys);
		}
		else{
			let map = this._oldGet(keys[0]);
			if(map){
				return map.get(...keys.slice(1));
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
				return map.set(...keys.slice(1), item);
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
	
	mapping[N] = Cls;
	
	return Cls;
}

module.exports = MapOfMapN;