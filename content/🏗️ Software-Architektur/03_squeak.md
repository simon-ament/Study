---
title: Squeak
---
> [!info] Cheat-Sheet
> https://moodle.hpi.de/pluginfile.php/52730/mod_resource/content/2/squeakCheatSheet_4_0.pdf

Squeak is based on principles of **Live and Exploratory Programming**
- direct code changes $\Rightarrow$ instant visual / auditory effects

# Collections
## contains | includes


## allSatisfy | anySatisfy


## select | reject | detect


## fold | inject


## collect


## do | doWithIndex | withIndexDo


---
# Morphic
## Mouse and Keyboard Input


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
# Commands

---
# Squeak Internals
> [!info] Slides: Objects in Squeak/Smalltalk

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
- `#drawOn:`
- `#mouseDown:`
- `#addMorph`

## Observer
- `#changed:`
- `#update:(with:)`
- `#addDependent`

## Prototype
- `#copy`
- `#postCopy`
- `#deepCopy`
- `#veryDeepCopy`
