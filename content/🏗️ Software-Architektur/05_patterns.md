---
title: Patterns
---
# Creational Patterns
## Factory Method (Virtual Constructor)
**Factory Method** is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

![[Pasted image 20250127213227.png]]

1. `Product` declares common interface, that all objects created by `Creator` and it's subclasses need to provide
2. `Concrete Products` are different implementations of the product interface
3. `Creator` declares the **factory method**, that returns new product objects and may contain some core business logic related to the products
4. `Concrete Creators` override the base factory method to return a different type of product
	- the may also return objects from a cache / pool / etc. instead of creating **new** ones all the time

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details] 
> https://refactoring.guru/design-patterns/factory-method
## Abstract Factory
**Abstract Factory** is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

![[Pasted image 20250127214554.png]]

1. `Abstract Products` declare interfaces fora set of distinct but related products (product family)
2. `Concrete Products` are various implementations of abstract products, grouped by variants. Each abstract product must be implemented in all variants.
3. The `Abstract Factory` interface declares a set of methods for creating each of the abstract products
4. `Concrete Factories` implement creation methods of the abstract factory corresponding to exactly one product variant
5. The `Client` can work with any factory / product variant, as long as it communicates with their objects via abstract interfaces

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/abstract-factory

## Builder
**Builder** is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

![[Pasted image 20250127220233.png]]

1. The `Builder` interface declares product construction steps, that are common to all types of builders
2. `Concrete Builders` provide different implementations of the construction steps
3. `Products` are resulting objects and do not have to belong to the same class hierarchy or interface if constructed by different builders
4. The `Director` class defines the order in which to call construction steps
	- is optional
	- allows simple reuse of specific product configurations
5. The `Client` must associate one of the builder objects with the director. This can either be done via the builders constructor or as a dynamic argument to the production method

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/builder

## Prototype (Clone)
**Prototype** is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.

![[Pasted image 20250127220311.png]]

1. The `Prototpye` interface declares the cloning method (most often simply `clone`)
2. The `Concrete Prototype` class implements the cloning method
	- This method might have to handle some edge cases such as cloning linked objects, untangling recursive dependencies, etc.
3. The `Client` can produce a copy of any object that follow the prototype interface

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/prototype

## Singleton
**Singleton** is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.

![[Pasted image 20250127221929.png]]

1. The `Singleton` class declares the static method `getInstance` that returns the same instance of it's own class
	- The Singleton's constructor should be hidden from the client code, so that calling `getInstance` becomes the only way of getting the Singleton object

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/singleton

---
# Structural Patterns
## Adapter (Wrapper)
**Adapter** is a structural design pattern that allows objects with incompatible interfaces to collaborate.

> [!details]
> https://refactoring.guru/design-patterns/adapter

## Bridge
**Bridge** is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.

> [!details]
> https://refactoring.guru/design-patterns/bridge

## Composite (Object Tree)
**Composite** is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

> [!details]
> https://refactoring.guru/design-patterns/composite

## Decorator (Wrapper)
**Decorator** is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

![[Pasted image 20250128084240.png]]

1. The `Component` declares the common interface for both wrappers and wrapped objects
2. `Concrete Component` is a class of objects being wrapped. It defines basic behavior, which can be altered by decorators
3. The `Base Decorator` class has a field for referencing a wrapped object and delegates all operations to it. The field should use the component interface, so that both concrete components and decorators can be wrapped
4. `Concrete Decorators` define extra behaviors that can be added to components dynamically. They override methods of the base decorator und execute their behavior either before or after calling the parent method
5. The `Client` can wrap components in multiple layers of decorators (as long as they comply with the component interface)

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/decorator

## Facade
**Facade** is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

![[Pasted image 20250128084306.png]]

1. The `Facade` provides convenient access to a particular part of the subsystem's functionality. It knows where to direct the client's request and how to operate all the moving parts
2. An `Additional Facade` class can be created to prevent polluting a single facade with unrelated features that might make it yet another complex structure. They can be used by both clients and other facades
3. The `Complex Subsystem` consists of dozens of various objects. To make them all do something meaningful, you have to dive deep into the subsystem's implementations detail (initialization order, proper data format, etc). Subsystem classes aren't aware of the facade's existence. They operate within the system and work with each other directly
4. The `Client` uses the facade instead of calling the subsystem objects directly

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/facade

## Flyweight (Cache)
**Flyweight** is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

> [!details]
> https://refactoring.guru/design-patterns/flyweight

## Proxy
**Proxy** is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

> [!details]
> https://refactoring.guru/design-patterns/proxy

---
# Behavioral Patterns
## Chain of Responsibility (CoR, Chain of Command)
**Chain of Responsibility** is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

> [!details]
> https://refactoring.guru/design-patterns/chain-of-responsibility

## Command (Action, Transaction)
**Command** is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request’s execution, and support undoable operations.

> [!details]
> https://refactoring.guru/design-patterns/command

## Iterator
**Iterator** is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

> [!details]
> https://refactoring.guru/design-patterns/iterator

## Mediator (Intermediary, Controller)
**Mediator** is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.

![[Pasted image 20250128084346.png]]

1. `Components` are various classes that contain some business logic. Each component has a reference to a mediator interface. The component isn't usually aware of the actual class of the mediator, so you can reuse the component in other programs by linking it to a different mediator
	- Components must not be aware of other components. If something important happens within or to a component, it must only notify the mediator. When the mediator receives the notification, it can easily identify the sender, which might be just enough to decide what component should be triggered in return
	- From a components perspective, it all looks like a total black box. The sender doesn't know who'll end up handling its request, and the receiver doesn't know who sent the request in the first place
1. The `Mediator` interface declares methods of communication with components, which usually include just a single notification method. Components may pass any context as arguments of this method, including their own objects, but only in such a way that no coupling occurs between a receiving component and the sender's class
2. `Concrete Mediators` encapsulate relations between various components. They often keep references to all components they manage and sometimes even manage their lifecycle

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/mediator

## Memento (Snapshot)
**Memento** is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.

> [!details]
> https://refactoring.guru/design-patterns/memento

## Observer (Event-Subscriber, Listener)
**Observer** is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

![[Pasted image 20250128084432.png]]

1. The `Publisher` issues events of interest to other objects. These events occur when the publisher changes its state or executes some behaviors. Publishers contain a subscription infrastructure that lets new subscribers join and current subscribers leave the list
	- When a new event happens, the publisher goes over the subscription list and calls the notification method declared in the subscriber interface on each subscriber object
2. The `Subscriber` interface declares the notification interface (most often just `update` method). Details about the event (e.g. data, the publisher itself) may be passed alongside the update through the method parameters
3. `Concrete Subscribers` perform some actions in response to notifications issued by the publisher and must implement the subscriber interface
4. The `Client` creates publisher and subscriber objects separately and then registers subscribers for publisher updates

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/observer

## State
**State** is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.

> [!details]
> https://refactoring.guru/design-patterns/state

## Strategy
**Strategy** is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

> [!details]
> https://refactoring.guru/design-patterns/strategy

## Template Methode
**Template Method** is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

> [!details]
> https://refactoring.guru/design-patterns/template-method

## Visitor
**Visitor** is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.

> [!details]
> https://refactoring.guru/design-patterns/visitor

---
# Architectural Patterns
## Layers

## Pipes and Filters

## Broker

## Model-View-Controller

## Reflection

## Command Processor

---
# Related Concepts
## Double Dispatch