const TypedMap = require('./typed-map.js');

const MapOfSet = TypedMap(Set, []);

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