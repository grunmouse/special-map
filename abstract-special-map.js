class AbstractSpecialMap extends Map{
	
	__prepare_construct(iterable, config){
		if(iterable[Symbol.iterator] == null){
			config = iterable;
			iterable = undefined;
		}
		return [iterable, config];
	}
	
	__use_config(config){
	}
	
	/**
	 * @constructor
	 * @param {Iterable} iterable - итерируемый объект, для передачи в конструктор Map
	 * @param {Boolean} autoinit - признак того, что при отсутствии членов их нужно создавать
	 */
	constructor(iterable, config){
		let doReturn;
		[iterable, config, doReturn] = __prepare_construct(iterable, config);
		
		if(doReturn){
			return doReturn;
		}
		
		if(iterable){
			super(iterable);
		}
		else{
			super();
		}
		
		__use_config(config);

	}
	
	__prepare_key(key){
		return key;
	}
	
	__create_default(key){
		
	}
	
	__alter_get(key){
		
	}
	
	__alter_has(key){
	}
	
	/** 
	 * @override Map.prototype.get
	 * @method
	 * @param {any} key - ключ
	 * @returned {Ctor}
	 */
	get(key){
		key = __prepare_key(key);
		
		if(super.has(key)){
			return super.get(key);
		}
		else{
			let item = __create_default(key);
			if(item){
				this.set(key, item);
			}
			else{
				item = __alter_get(key);
			}
			return item;
		}
	}
	
	has(key){
		key = __prepare_key(key);
		
		return super.has(key) || this.__alter_has(key);
	}
	
	__prepare_set(key, item){
		key = __prepare_key(key);
		return [key, item];
	}
	
	/** 
	 * @override Map.prototype.set
	 * @method
	 * @param {any} key - ключ
	 * @param {Ctor} item - добавляемое значение
	 */
	set(key, item){
		[key, item] = this.__prepare_set(key, item);
		
		if(item){
			super.set(key, item);
		}
	}
	
};