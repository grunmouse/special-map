/**
 * Представляет набор уникальных значений, сравниваемых по свойству key
 */
class SetWithKey extends Map{
	add(item){
		const key = item.key;
		if(super.has(key)){
			return super.get(key);
		}
		this.set(key, item);
		return item;
	}
	get(item){
		if(typeof item !== 'string'){
			item = item.key;
		}
		return super.get(item);
	}
	has(item){
		if(typeof item !== 'string'){
			item = item.key;
		}
		return super.get(item);
	}
	[Symbol.iterator](){
		return super.values();
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