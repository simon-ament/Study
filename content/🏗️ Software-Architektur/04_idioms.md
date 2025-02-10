---
title: Idiome
---
# Why Idioms?
Low-level patterns **specific to a programming language**
- how to implement certain logic and relationships using a given language
- may include guidelines for code formatting

## Challenges
**Good names:** *Choose names that clarify the object's purpose*
- Name could encode **type** or **semantic role** (or both, depends on context)
- Adhering to conventions can make reading easier

**Good comments:** *Make comments succinct, concise, and grammatically correct*
- Too many comments can clutter the code
- To few comments can leave the reader confused
- **Don't comment bad code - rewrite it!**

**Magic numbers:** violates [[01_basics_and_history#Criteria|continuity]] (local changes)

**Global state:** might be **used / modified incorrectly** in some contexts

**Consequences of meta-programming:** can lead to 
- unexpected behavior
- hardly traceable errors 
- hardly comprehensible code

## Style Guides
- Ease reading and writing (object-oriented) code
- clear, easy to read, easy to understand $\Rightarrow$ more likely **correct** and **reliable**, easier to **adapt**, **maintain** and **evolve**
- consistent coding style $\Rightarrow$ **pretty-printing** can be supported by automated tools (support and check the programmer)
- *Best guidelines are those that people want to follow* (because they appreciate the benefit)

## Law of Demeter
- *Don't talk to strangers; only talk to your immediate friends*
- Each unit should have only **limited knowledge** about other units: **only units "closely" related** to the current unit
- $\Rightarrow$ simplifies **complexity** of programming and **modifications**
- **Class form:** classes can only sent messages to **argument classes** (including the class itself) or **instance variable classes**
- **Object form:** within a method, messages can only be sent to **parameter objects** (including itself), **immediate part objects** or **created objects**

Supplementary constraints
1. minimizing code duplication
2. minimizing number of arguments passed to methods
3. minimizing number of methods per class

---
# Idioms
## Double Dispatch
1. Send a **message to the argument**
2. **Append the class name of the receiver** to the selector
3. Pass the **receiver as an argument**

![[Screenshot from 2025-02-10 17-37-18.png|500]]

## Super
**Extending** super: send a message to super in overriding method

```smalltalk
BorderedFigure>>display
	super display.
	self displayBorder.
```

**Modifying super:** send a message to super in overriding method and then modify results

```smalltalk
SuperFigure>>initialize
	color := Color white.
	size := 0 @ 0.

SubFigure>>initialize
	super initialize.
	color := Color beige.
```

## Pluggable Behavior / Selector / Block
Parameterize **behavior of an object:** add a variable that will be used to trigger different behavior
- **Pluggable Selector:** add a variable that contains a selector the be performed (ends with 'Message')
	- used for simple instance-specific behavior
- **Pluggable Block:** add a variable to store block (ends with 'Block')
	- used for complex Pluggable Behavior, that is not quite worth its own class

```smalltalk
ListPane>>initialize
	printMessage := #printString.

ListPane>>printElement: anObject
	^ anObject perform: printMessage

"----------------------------------------------"

Car>>speedAdaptor
	^ PluggableAdaptor
	getBlock: [self speed]
	setBlock: [:newSpeed | self speed: newSpeed]

PluggableAdaptor>>value
^ getBlock value
```

> [!caution] Includes some meta-prgramming

## Other Rules (excerpt)

> [!note]- Naming Guidelines
>- Avoid namespace collisions by adding a project-specific **prefix** to the class name (up to four characters, capitalized)
>- **Avoid** naming a class that implies anything about its **implementation**
>- Form variable names from words suggesting objects in **natural language**
>- Use a phrase beginning with a **verb** for methods that answer a **Boolean**
>- **Avoid** the **parameter type** or name in the method name
>- Use a verb with a **preposition** for methods that **specify objects**
>- Use **semantic and type information** for parameter names that are the **same type** (e.g. `origin: topLeftPoint corner: bottomRightPoint`)
>- Do not use hard-coded numbers in an expression (**magic numbers**)
>- Spell out **identifiers completely**
>- Call the **enumeration parameter** `each`. If you have nested enumeration blocks, append a **descriptive word** to all parameter names

> [!note]- Comment Guidelines
>- Avoid relying on a comment to explain what could be **reflected in the code**

> [!note]- Code Formatting
>- Be **consistent** with your formatting style
>- Use **whitespaces** and **parentheses** (especially when it helps readability)
>- Use **cascades** and separate the receiver from the messages
>- Use `yourself` after **cascades** (when in doubt about return value)
>- Put zero or one argument messages on the same lines as their receiver. For messages with **two or more keywords** put each keyword / argument pair on its own line, **indented** one tab
>- Format the one-branch conditional with an explicit return (e.g. `self isConnected ifTrue: [^ self].`)
>- **Return** a value only when you intend for the **sender to use the value**

> [!note]- Reuse
>- Define an instance method `#initialize` to initialize instances created with `#new`
>- For each variable defined by a class, define **two accessor methods**
>- Use accessor methods to reference state variables (e.g. `self width`)
>- Always **inherit** to **obtain behavior**, not the representation

> [!note]- Pitfalls
>- If equality `=` or `~=` methods are implemented by subclasses, implement `#hash`
>- Avoid **modifying** a collection **while iterating** over it (use `copy` first)
>- Avoid using **global variables**
>- Use `#become:` with caution
>- **Avoid modifying** the existing behavior of **base system classes**
>- Avoid `#class`, `#isKindOf:`, and `#isMemberOf:` to check for class membership
>- Use `#do:`, `#collect:`, `#select:`, `#reject:`, `#inject:into:` instead of `#to:do:`

> [!note]- Methods
>- Divide your program into methods that perform **one identifiable task**. Keep all of the **operations in a method** at the **same level of abstraction**. This will naturally result in programs with **many small methods**, each a few lines long
>- Code a **single constructor method** that sets all the variables. Make its name **match the names of the variables**
>	- **Shortcut constructor:** Represent object creations as a message to one of the arguments to the Constructor Method (e.g. `Number>>@ y` with `^ Point x: self y: y`)
>- **Converter methods** should start with 'as' and directly convert to the other object
>	- **Converter constructor methods:** start with 'from'
>- **Query methods** should start with some form of 'be' (e.g. 'is' / 'will' / etc.)
>- **Reversing methods** allows a smooth flow of messages and control (e.g. `Stream>>print: anObject` with `anObject printOn: self`)
>	- overriding `printOn` can also be used for **debugging**
>- **Method object:** move temporary variables to instance variables and computation to `#compute` on a new class, replace method with instantiation and computation ob this object
>
>```smalltalk
Controller>>controlActivity
>
>	self
>		controlInitialize;
>		controlLoop;
>		controlTerminate.
>```

> [!note]- Messages
>- **Intention revealing message:** send a message to self and name it to show *what* is to be done, not *how* (e.g. `Collection>>isEmpty` with `^ self size = 0`)
>- **Dispatched interpretation:** when an object does not want to reveal ist representation, it may accept a block and pass it messages itself (e.g. `Collection do: aBlock`)
>- **Mediating protocol:** use consistent naming to keep objects independent (e.g. `addMyInteger` and `addMyFloat`)
>- **Self delegation:** when object needs reference to the delegating objects, pass `self` along using an additional `for: ...` parameter (e.g. `HashTable>>at: keyObject put: valueObject for: aCollection`)

> [!note]- Instance Variables
>- **Variable state:** put state whose presence varies from instance to instance in a Dictionary stored as an instance variable `properties`
>- **Lazy initialization:** write a getter that initializes the variable if necessary (e.g. `count ifNil: [count := 0]. ^ count`)
>- instance variables can be access **directly** (e.g. `x := xNumber`) or **indirectly** (e.g. `self x: xNumber`), **do not go half way!**
>- **Collection accessor / enumeration:** delegate (forward) the message to the collection and name the method accordingly
>- **Boolean property setting:** add tow method beginning with 'be' and optionally one with 'toggle' (e.g. `beVisible` / `beInvisible` / `toggleVisible`)

> [!note]- Temporary Variables
>- can be used for **collecting** / **caching**
>- can be used to **explain** (by naming) parts of complex expressions (e.g. `lastIndex := self size`)
>- **name** temporary variables according to the **role** they play **in the computation**

> [!note]- Collections
>- **Duplicate removal** can be done using `asSet`
>- **Temporary sorting:** send `asSortedCollection` or `asSortedCollection: aBlock` to retrieve a *sorted copy*
>- **Stack:** [[05_patterns#Adapter (Wrapper)|adapter]] to **OrderCollection**
>	- `push` $\to$ `addLast:`
>	- `pop` $\to$ `removeLast`
>	- `top` $\to$ `last`
>	- `depth` $\to$ `size`
>	- `empty` $\to$ `isEmpty`
>- **Queue:** [[05_patterns#Adapter (Wrapper)|adapter]] to **OrderCollection**
>	- `add` $\to$ `addFirst:`
>	- `remove` $\to$ `removeLast`
>	- `length` $\to$ `size`
>	- `empty` $\to$ `isEmpty`
>- **Literal collection** like `'aeiou'` or `#(bold italic)` can be searched like any collection
>- **Streams** can be used to concatenate several **Collections**
>
>```smalltalk
>writer := WriteStream on: String new.
>1000000 timesRepeat: [writer nextPutAll: 'abcdefg'].
>writer contents.
>```

---
# Collections
## Classes
- **Collection:** represents one-to-many relationship
	- **Ordered Collection:** dynamically sized
	- **Array:** fixed size
		- **ByteArray:** can only hold numbers in range $0..255$ or $-128..127$
		- **RunArray:** compresses long runs of the same element
			- e.g. `#(plain plain plain plain plain bold bold bold bold plain plain plain plain plain)` $\to$ `5-#plain 4-#bold 5-#plain`
	- **Set:** unique elements
	- **Bag:** duplicates allowed
	- **Dictionary:** indexed by keys (map one kind of object to another)
		- stores *associations* like `{{#plate} asBag. true. true} -> './items/plate.png'`
		- can be used with `add:` or alternatively `at:ifAbsentPut:`
	- **SortedCollection:** keeps elements sorted (optionally a sort block can be passed)
		- e.g. `self children asSortedCollection: [:a :b | a age < b age].`
	- **Interval:** collection of numbers in sequence (`Number>>to:` or `to:by:`)

![[Screenshot from 2025-02-10 18-20-12.png|500]]

**Equality method:** `Object>>= anObject`
- checks for equality
- must be protected to only fully test compatible classes
- needed for **Set**

```smalltalk
Book>>= aBook
	(aBook isMemberOf: self class) ifFalse: [^ false].
	^ self author = aBook author & (self title = aBook title)`
```

**Hashing method:** `Object>>hash`
- hashes the object
- if you override `=`, override hash as well so that two objects that are equal return the same hash value
- needed for hashed collections (like **Dictionary**)

## isEmpty
- `isEmpty` / `ifEmpty: aBlock`
- `notEmpty` / `ifNotEmpty: aBlock`

## contains | includes
- `includes: anObject` checks if element is included
- `contains: aBlock` equivalent to `anySatisfy: aBlock`

## allSatisfy | anySatisfy
- `allSatisfy: aBlock` checks if all elements satisfy the block condition
- `anySatisfy: aBlock` checks if any element satisfies the block condition

## select | reject | detect
- `select: aBlock` returns a new collection containing all elements satisfying the condition
- `reject: aBlock` returns a new collection containing all elements **not** satisfying the condition
- `detect: aBlock` return the **first** element to satisfy the condition
	- not finding an element can be caught with `... ifNone: aBlock`
- can be optimized by using a **Dictionary** instead

## fold | inject
- `inject: anObject into: aBlock` can be used to to keep a running value while iterating
- `fold: binaryBlock` can be used for simple fold operations (without initial value)

```smalltalk
self children
	inject: 0
	into: [:sum :each | sum max: each age].

(1 to: 10) fold: [:a :b | a + b].
```

## collect
- `collect: aBlock` return a new collection where the specified computation has been executed on each element

```smalltalk
(1 to: 10) collect: [:a | 2 * a].
```

## do | doWithIndex | withIndexDo
- used to **enumerate** (execute code for each element) a collection
- e.g. `aCollection do: [:each | ... ].`