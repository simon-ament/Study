---
title: Objekt-Orientierung
---
# History
## Philosophy
- Model the objects of the world (domain objects and relationships)
- **noun-oriented** (as opposed to verb-oriented)
- **messaging**
- encapsulation / containment of data
	- better control access
	- better control consistency
- inheritance: complex objects as extension of simple ones

## Birth of objects
- Objects as **models of real-world entities**
- Objects as **cells** (independent, interacting)
- Objects **scale well**
	- **Complexity** through distributed responsibility
	- **Robustness** through independence
	- **Growth** by having same mechanisms everywhere
	- **Reuse** by providing services

---
# Squeak / Smalltalk
- The Lisp of object-oriented languages
	- very little syntax, highly reflective
- Dynamic Typing
	- unrestricted polymorphism, very late binding
- Virtual Machine
	- *write ocne, run everywhere*
	- Bytecode compiler
	- Important files: Virtual Machine, Image file, Sources file, Changes file
- WIMP interface: Windows, Icons, Menus, Pointing Device (Mouse)

---
# Object-Oriented Programming
## Living Software
 **50% to 75% of global software development effort** is spent on maintenance, the bulk of which being **new functionality**
 
**Lehman's Laws:**
1. **Continuing change** (1): A [...] program that is used must be continually adapted else it becomes progressively less satisfactory
2. **Increasing Complexity** (2): As a program is evolved its complexity increases unless work is done to maintain or reduce it
3. **Continuing Growth** (6): Functional content of a program must be continually increased to maintain user satisfaction over its lifetime
4. **Declining Quality** (7): [...] Programs will be perceived as of declining quality unless rigorously maintained and adapted to a changing operational environment

$\Rightarrow$ successful software must **adapt** and **evolve**

## OO Core Components
- Messages
	- entities able to communicate (only) via messages
- Objects
	- contain code and data
	- can be called through messaging
	- internals are inaccessible from the outside
	- [[#Object = Identity + Behavior + State|have an identity, exhibit behavior, maintain state]]
	- **instance:** particular exemplar of an object defined by a class (same methods, own values)
- Classes
	- **blueprint / mold** of objects (object creation)
		- define behavior and shape / layout (state, but not effective values) of all instances of the class
	- specializations of other classes
	- organization of concepts and code

## OO Core Concepts
**Inheritance or delegation:** Objects can obtain structure (data) and behavior (methods) from other classes (meta-objects) or objects
- most OOP languages offer **inheritance**
	- **reuse** and **specialization** of classes
	- **state** and **behavior** can be added or hidden
	- hierarchy of definitions (superclass, subclass)

**Encapsulation:**
- Local retention, protection, and hiding of state (implementation details)
- Clients can talk to objects **only** by using their **public interfaces**
	- behavior invoked by messages, but data is private
- Protected implementation $\Rightarrow$ internal **integrity** and **changes** without affecting clients

**Late Binding:**
- Mapping of **messages sent** to **methods executed** on objects
- Deferred until **run-time** (dynamic binding)
- $\Rightarrow$ run-time adaption, exploratory and live programming, agile and incremental development
	- also small compilations units (if necessary)

**Polymorphism:**
- "Let the receiver decide"
- Same messages can be sent to different objects
	- different receivers can **react differently** to the same message

## Object = Identity + Behavior + State
**Identity:**
- Object can be identified (distinguished from the other)
- Equality ("das Gleiche", *similar* instance) vs. Identity ("das Selbe", *same* instance)

**Behavior:**
- Response to **messages** received
	- state **what** behavior objects are to provide / is expected
	- Program *what*, not *how* $\Rightarrow$ powerful control mechanism
- Implemented via **methods**
	- specify **how** operations are to be performed
	- access, manipulate and need knowledge of **state ("data")**

**State:**
- Other objects it refers to or contains
- $\Rightarrow$ Attributes + relationships with / references to other objects

![[Screenshot from 2025-02-09 22-36-07.png|500]]

## Object-oriented Modeling
All activities in a software lifecycle involve modeling:
- **Analysis**: Modeling of the **problem**
- **Design:** Modeling of the **solution**
- **Implementation:** Making models **effective**
- **Maintenance:** **Changing** the model and / or its implementation

Assumption: People perceive and model the world as entities / objects and relationships between them:
- **Relationships** between objects (e.g. acquaintances, interactions)
- **Instances** and classes
- $\Rightarrow$ OO development is often **more natural** and uses a single concept across domain, design, implementation, etc.