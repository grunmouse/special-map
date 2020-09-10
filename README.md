# @grunmouse/special-map

```
const {TypedMap, MapOfSet} = require("@grunmouse/special-map");
```

## Назначение
Набор классов, представляющих часто используемые специализации класса Map

## Состав

### \@function TypedMap

Создаёт класс, представляющий собой типизированную Map

Переопределяет конструктор и методы get и set.

\@function TypedMap(Ctor, args)
* \@param {Function} Ctor - конструктор значения
* \@param {Array?} args - необязательный набор параметров, передаваемых в конструктор при создании нового значения в геттере
* \@returned {Function} - конструктор созданного класса

\@class TypedMap<Ctor, args>

\@constructor(iterable, autoinit)
* @param {Iterable} iterable? - итерируемый объект, для передачи в конструктор Map
* @param {Boolean} autoinit? - признак того, что при отсутствии членов их нужно создавать
\
Значение autoinit по умолчанию зависит от наличия args.\
Если args существует, то autoinit = autoinit !== false.\
Если args было опущено, то autoinit = autoinit || false.

\@method get(key)
\@override Map.prototype.get
* @param {any} key - ключ
* @returned {Ctor}
\
Если autoinit=true, то несуществующее значение будет автоматически создано.

\@method set
\@override Map.prototype.set
* @param {any} key - ключ
* @param {Ctor} item - добавляемое значение, должно быть instanceof Ctor, иначе произойдёт ошибка
* @throwed {TypeError} - ошибка произойдёт при попытке добавить в Map не экземпляр Ctor
\
Перед присвоением значения будет проверено, 

### \@class MapOfSet

\@class MapOfSet == \@class TypedMap<Set, []>;

\@constructor(iterable?, autoinit=true)

Это Map, элементами которого являются наборы (Set).
Дополнительно определяет метод add и переопределяет @@iterator

\@method add(key, value) - добавляет значение в один из наборов, лежащих в мапе
* @param {any} key - ключ, по которому будет выбран набор
* @param {any} value - значение, которое будет добавлено в

```
obj.add(key, value);
//Эквивалентно
obj.get(key).add(value);
```

[@@iterator]
Итерирует пары ключ-значение, но ключ может повторяться.
