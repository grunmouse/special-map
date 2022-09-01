const mapping = new Map();
const SetWithKey = require('./set-with-key.js');

function SetWithKeyFunction(func){
	
	if(!func){
		return SetWithKey;
	}
	else if(!func.call){
		if(typeof func === 'object'){
			throw new Error('Incorrect key function');
		}
		
		const key = func;
		func = (item)=>(item[key]);
	}
	const sFunc = func.toString();
	
	if(mapping.has(sFunc)){
		return mapping.has(sFunc);
	}
	
	/**
	 * Представляет набор уникальных значений, сравниваемых по свойству key
	 */
	const Cls = class {
		static get [Symbol.species] (){
			return this;
		}
		
		constructor(iterable){
			this.map = new Map();
			if(iterable){
				for(let item of iterable){
					this.add(item);
				}
			}
		}
		add(item){
			const key = func(item);
			if(this.map.has(key)){
				return this.map.get(key);
			}
			this.map.set(key, item);
			return item;
		}
		
		clear(){
			this.map.clear()
		}
		
		delete(item){
			if(typeof item !== 'string'){
				item = func(item);
			}
			return this.map.delete(item);
		}
		
		*entries(){
			for(let [key, value] of this.map.entries()){
				yield [value, value];
			}
		}
		
		forEach(callback, context){
			context = context || this;
			for(let [key, value] of this.map.entries()){
				callback.call(value, value, this);
			}
		}	
		
		get(item){
			if(typeof item !== 'string'){
				item = func(item);
			}
			return this.map.get(item);
		}

		has(item){
			if(typeof item !== 'string'){
				item = func(item);
			}
			return this.map.has(item);
		}
		
		keys(){
			return this.map.values();
		}

		get size(){
			return this.map.size;
		}
		
		values(){
			return this.map.values();
		}
		
		[Symbol.iterator](){
			return this.map.values();
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
	
	mapping.add(sFunc, Cls);
	
	return Cls;
}
module.exports = SetWithKeyFunction;