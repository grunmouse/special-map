const TypedMap = require('./typed-map.js');

function MapOfSpecialSet(Ctor, args){
	const MapOfSet = TypedMap(Ctor, args);

	/**
	 * @method add - добавляет значение в один из наборов, лежащих в мапе
	 * @param {any} key - ключ, по которому будет выбран набор
	 * @param {any} value - значение, которое будет добавлено в
	 */
	MapOfSet.prototype.add = function(key, value){
		this.get(key).add(value);
	}

	MapOfSet.prototype[Symbol.iterator] = function*(){
		for(let key of this.keys()){
			let set = this.get(key);
			for(let item of set){
				yield [key, item];
			}
		}
	}

	MapOfSet.prototype.untyped = function(){
		return new Map(this.entries());
	}

	MapOfSet.prototype.sumsize = function(){
		let result = 0;
		for(let set of this.values()){
			result += set.size;
		}
		return result;
	}

	return MapOfSet;
}

module.exports = MapOfSpecialSet;