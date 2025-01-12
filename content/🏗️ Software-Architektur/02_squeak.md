---
title: Squeak
---
> [!info] Cheat-Sheet
> https://moodle.hpi.de/pluginfile.php/52730/mod_resource/content/2/squeakCheatSheet_4_0.pdf

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
