
function SetWithKeyFunction(func){
	/**
	 * Представляет набор уникальных значений, сравниваемых по свойству key
	 */
	class SetWithKey extends Map{
		add(item){
			const key = func(item);
			if(super.has(key)){
				return super.get(key);
			}
			this.set(key, item);
			return item;
		}
		get(item){
			if(typeof item !== 'string'){
				item = func(item);
			}
			return super.get(item);
		}
		has(item){
			if(typeof item !== 'string'){
				item = func(item);
			}
			return super.get(item);
		}
		[Symbol.iterator](){
			return super.values();
		}
		
		toJSON(){
			return [...this];
		}
	}
}
module.exports = SetWithKeyFunction;