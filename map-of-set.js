const TypedMap = require('./typed-map.js');

const MapOfSet = TypedMap(Set, []);

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

module.exports = MapOfSet;