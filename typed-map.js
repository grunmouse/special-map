
/**
 * @param {Constructor} Ctor - конструктор элементов мапы
 * @param {?Array<any>} args - набор аргументов, передаваемый в конструктор при автодобавлении, 
 *		если опущен - автодобавление по умолчанию отключено
 * @returned {Class extends Map}
 */
function TypedMap(Ctor, args){
	//args = args || [];
	const TMap = class extends Map{
		
		/**
		 * @constructor
		 * @param {Iterable} iterable - итерируемый объект, для передачи в конструктор Map
		 * @param {Boolean} autoinit - признак того, что при отсутствии членов их нужно создавать
		 */
		constructor(iterable, autoinit){
			if(typeof iterable === 'boolean'){
				autoinit - iterable;
				iterable = undefined;
			}
			if(iterable){
				if([...iterable].every(a=>(a instanceof Ctor))){
					super(iterable);
				}
				else{
					throw new TypeError('invalid elements type');
				}
			}
			else{
				super();
			}
			
			if(args){
				autoinit = autoinit !== false;
			}
			else{
				autoinit = autoinit || false;
			}
			
			this._autoinit = autoinit;
			this._args = args || [];
		}
		
		/** 
		 * @override Map.prototype.get
		 * @method
		 * @param {any} key - ключ
		 * @returned {Ctor}
		 */
		get(key){
			if(super.has(key)){
				return super.get(key);
			}
			else if(this._autoinit){
				let item = new Ctor(...this._args);
				super.set(key, item);
				return item;
			}
			else{
				return;
			}
		}
		
		/** 
		 * @override Map.prototype.set
		 * @method
		 * @param {any} key - ключ
		 * @param {Ctor} item - добавляемое значение
		 */
		set(key, item){
			if(item instanceof Ctor){
				super.set(key, item);
			}
			else{
				throw new TypeError('invalid elements type');
			}
		}
		
		/**
		 * @method
		 * @returned {Map} - нетипизированная мапа с тем же содержимым
		 */
		untyped(){
			return new Map(this);
		}
	};
	
	return TMap;
}

module.exports = TypedMap;