---
title: Squeak
---
# Squeak
Squeak is based on principles of **Live and Exploratory Programming**
- direct code changes $\Rightarrow$ instant visual / auditory effects

> [!info] Cheat-Sheet
> https://moodle.hpi.de/pluginfile.php/52730/mod_resource/content/2/squeakCheatSheet_4_0.pdf

## Object Model
- Everything is an object
	- classes are objects too
	- class is the single instance of an anonymous class (meta-class)
		- e.g. `Rectangle` is sole instance of `Rectangle class`
- Only message passing between objects
- (Very) late binding
- All methods are public
	- **method lookup:** starting at receiver class, then bubbling up the inheritance tree
- Instance variables are private to the object
- Class-based single inheritance
- Garbage collection

A few but powerful ideas and language constructs $\Rightarrow$ Small and extensible language

![[Screenshot from 2025-02-09 17-17-03.png|500]]

## Syntax (excerpt)
- Messages
	- unary: `receiver selector`
	- binary: `receiver binary-selector argument`
	- keyword: `receiver keyword1: arg1 keyword2: arg2`
	- **Priority:** unary > binary > keywords (same level from left to right | workaround: parantheses)
- Arrays
	- literal array: `#(1 2 3 (1 3) $a 4)`
	- byte array: `#[1 2 3]`
	- array: `{ Date today . Time now }`
		- syntactic sugar mapped to `Array with: with:`
- Fractions: `1/33`
- Comments: `"a comment"`
- Block: `[:var | | tmp | expr... ]`
	- Anonymous function objects (storeable and passable)
	- **higher order functions:** Closure / Lambda
	- Lexically scoped
- Method annotation (pragma): `<...>`
	- Primitive: `<primitive: ...>`

## Class Definition
**= a message sent to another class**

```smalltalk
Morph subclass: #CalculatorMorph
	instanceVariableNames: 'first second result'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Calculator'
```

## Method Definition
- usually defined in a browser (directly invoking the compiler also possible)
- always returns an object (default is `self`)

```smalltalk
ObjectSubclass>>descriptionForPartsBin
	^ self

		partName: 'Calculator'
		categories: #('Useful')
		documentation: 'Not yet...'
```

## Instance Creation
- Literal: e.g. `1` or `'abc'`
- General: `new` which uses `basicNew` and calls `initialize`
- Class specific: e.g. `Color orange` or `Color r: 1.0 g: 0.6 b: 0.0`

---
# Self and Super
## Similarities
- Refer to same object when used in same context
	- `{ self. super. self == super }` $\to$ `{ sameObject. sameObject. true }`
- can be passed as arguments to a message
	- rarely used for super
- can be assigned to variables
	- rarely used
- can receive messages

## Method Lookup
**self:**
- dynamic lookup at run-time
- search for method begins in instance's (receiver) class
	- even if `self` is used by superclass method

**super:**
- statically determined at compile-time
- search for method begins in superclass of the class containing the method, in which `super` was used
	- not necessarily direct superclass of instance (reveiver)

---
# Live and Exploratory Programming
**Benefits of short feedback loops:**
- understand code and its effect on the system
- check whether the program works as expected
- tests (unit, integration, acceptance)
- investigate bugs
- explore unfamiliar code

**Programming system vs. programming language:**
- Integration von Sprache und Werkzeugen in einer IDE

![[Screenshot from 2025-02-08 09-36-22.png|500]]

---
# Framework
## Morphic
- `#drawOn: aCanvas` | draws an Morph or similar onto a canvs 
- `#handlesMouseDown: evt` and `#mouseDown: evt` | override to handle mouse events
- `#handlesKeyboard: evt` and `#keyDown: enEvent` | override to handle keyboard events
- `#addMorph: aMorph` | adds a submorph 

## Observer
- `#changed: aParameter` or `#changed: anAspect with: anObject` | inform all the dependents about a change on the receiver
- `#update: aParameter` or  `#update: anAspect with: anObject` | override to receive a change notice from an object of whom the receiver is a dependent
- `#addDependent: anObject` | make the given object one of the receiver's dependents  

## Prototype
- `#copy` | executes `#shallowCopy` and then `#postCopy`
	- `#shallowCopy` | returns a copy of the receiver which shares the receiver's instance variables
	- `#postCopy` | should be overridden by subclasses to complete the full copy
- `#deepCopy` | returns a copy of the receiver with its own **copy of each instance variable**
	- recursively calls `#deepCopy`
	- does **not preserve object identities in cycles** in the object graph
- `#veryDeepCopy` | does a complete tree copy using a [[04_idioms#Collections|Dictionary]]
	- an object appearing twice in the tree is only copied once
	- all references to the object in the copy of the tree will point to the new copy
