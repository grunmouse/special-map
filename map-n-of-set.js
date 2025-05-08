const TypedMap = require('./typed-map.js');
const MapOfSet = require('./map-of-set.js');

const mapping = [Set, MapOfSet];

function MapNOfSet(N){
	if(N < mapping.length){
		return mapping[N];
	}


	const MapOfSet = TypedMap(MapNOfSet(N-1), []);

	const proto = MapOfSet.prototype;
	proto._oldGet = proto.get;
	proto._oldSet = proto.set;

	/**
	 * @method add - добавляет значение в один из наборов, лежащих в мапе
	 * @param {any} key - ключ, по которому будет выбран набор
	 * @param {any} value - значение, которое будет добавлено в
	 */
	proto.add = function(...args){
		this._oldGet(args[0]).add(...args.slice(1));
	}
	
	
	proto.get = function(...args){
		if(args.length === 1){
			return this._oldGet(args[0]);
		}
		else{
			return this._oldGet(args[0]).get(...args.slice(1));
		}
	}

	proto[Symbol.iterator] = function*(){
		for(let key of this.keys()){
			let set = this.get(key);
			for(let item of set){
				yield [key, ...item];
			}
		}
	}

	proto.untyped = function(){
		return new Map(this.entries());
	}

	proto.sumsize = function(){
		let result = 0;
		for(let set of this.values()){
			result += set.sumsize;
		}
		return result;
	}
	
	mapping[N] = MapOfSet;
	
	return MapOfSet;
	
}
module.exports = MapNOfSet;