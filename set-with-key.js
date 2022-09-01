/**
 * Представляет набор уникальных значений, сравниваемых по свойству key
 */
class SetWithKey{
	constructor(iterable){
		this._map = new Map();
		if(iterable){
			for(let item of iterable){
				this.add(item);
			}
		}
	}	
	add(item){
		const key = item.key;
		if(this._map.has(key)){
			return this._map.get(key);
		}
		this.set(key, item);
		return item;
	}
	get(item){
		if(typeof item !== 'string'){
			item = item.key;
		}
		return this._map.get(item);
	}
	has(item){
		if(typeof item !== 'string'){
			item = item.key;
		}
		return this._map.has(item);
	}
	[Symbol.iterator](){
		return this._map.values();
	}
	toString(){
		return [...this].join(';\n');
	}
	
	get key(){
		return [...this].sort().join(';\n');
	}
	
	toJSON(){
		return [...this];
	}
}

module.exports = SetWithKey;