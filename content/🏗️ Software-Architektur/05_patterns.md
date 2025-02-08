---
title: Patterns
---
# Why Patterns?
Patterns are collections of recurring design structures that promote valuable design knowledge
- e.g. Abstraction, Flexibility, Modularity, Elegance, etc.
- Rule of three: Once is an event, twice is an incident, thrice it's a pattern
- Medium scale: between [[04_idioms|Idioms]] and [[06_architectural|Architectural Styles]]
	- design at a more abstract level: class and object interaction as a unit
- independent of language, specific to paradigm
- concrete implementation can vary (*variation points*)

> Each pattern describes a **problem which occurs over and over again** in our environment, and then describes the **core of the solution** to that problem, in such a way that you can **use this solution a million times over**, without ever doing it the same way twice.

> Each pattern is a **three-part rule**, which expresses a relation between certain **context**, a **problem**, and a **solution**.

![[Screenshot from 2025-02-08 11-44-40.png|500]]

## Documenting Patterns
- Objects and class diagrams: context and roles
- Sequence diagram: interactions and chronology
- Communication diagram: context and interaction

## Role of Patterns
- Reading: recurring patterns enable fast understanding of code and its intent
- Development: provide a guide to solve recurring problems
- Documentation: patterns and their implications describe a system (better than prose)
- Clean-up: organize existing code and prepare it for changes

---
# Creational Patterns
## Factory Method (Virtual Constructor)
**Factory Method** is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

![[Pasted image 20250127213227.png|500]]

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

![[Pasted image 20250127214554.png|500]]

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

![[Pasted image 20250127220233.png|500]]

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

![[Pasted image 20250127220311.png|500]]

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

![[Pasted image 20250127221929.png|500]]

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

![[Pasted image 20250207111824.png|500]]

1. The `Client` is a class that contains the existing business logic of the program
2. The `ClientInterface` describes a protocol that other classes must follow to be able to collaborate the the client code
	- The client code does't get coupled to the concrete adapter class. Therefore, adapters can easily be replaced or introduced without breaking the existing client code
3. The `Service` ist some useful class (usually 3rd-party or legacy). The client can't use this class directly because it has an incompatible interface
4. The `Adapter` implements the client interface, while wrapping the service object. The adapter receives calls from the client vie the client interface and translates them into calls to the wrapped service object

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/adapter

## Bridge
**Bridge** is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.

![[Pasted image 20250207112626.png|500]]

1. The `Abstraction` provides high-level control logic. It relies on the implementation object to do the actual low-level work
	- *Optional:* `Refined Abstractions` provide variants of control logic
2. The `Implementation` declares the interface that's common for all concrete implementations. An abstraction can only communicate with an implementation object via methods declared here
	- These methods may be the same as those provided by the abstraction, but usually the abstraction declares some complex behaviors that rely on a wide variety of primitive operations declared by the implementation
3. `Concrete Implementations` contain platform-specific code
4. Usually, the `Client` is only interested in working with the abstraction. However, it's the client's job to link the abstraction object with one of the implementation objects

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/bridge

## Composite (Object Tree)
**Composite** is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

![[Pasted image 20250207114306.png|500]]

1. The `Component` interface describes operations that are common the both simple and complex elements of the tree
2. The `Leaf` is a basic element of a tree that doesn't have sub-elements
	- Usually, leaf components end up doing most of the real work, since they don't have anyone to delegate the work to
3. The `Composite` (aka *container*) is an element that has sub-elements: leaves or other containers. It delegates work to them using the component interface and then processes and returns a final result
4. The `Client` code works with all elements through the component interface, regardless of their complexity

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

### Composition vs. Inheritance


> [!details]
> https://refactoring.guru/design-patterns/composite

## Decorator (Wrapper)
**Decorator** is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

![[Pasted image 20250128084240.png|500]]

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

## Proxy
**Proxy** is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

![[Pasted image 20250207195046.png|500]]

1. The `ServiceInterface` declares the interface of the service. The proxy must follow this interface to be able to disguise itself as a service object
2. The `Service` is a class that provides some useful business logic
3. The `Proxy` class has a reference field that points to a service object. After the proxy finished its processing (e.g. lazy initialization, logging, access control, caching, etc.), it passes the request to the service object
	1. Usually, proxies manage the full lifecycle of their service objects
4. The `Client` should work with both services and proxies via the same interface. This way you can pass a proxy into any code that expects a service object

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/proxy

---
# Behavioral Patterns
## Mediator (Intermediary, Controller)
**Mediator** is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.

![[Pasted image 20250128084346.png|500]]

1. `Components` are various classes that contain some business logic. Each component has a reference to a mediator interface. The component isn't usually aware of the actual class of the mediator, so you can reuse the component in other programs by linking it to a different mediator
	- Components must not be aware of other components. If something important happens within or to a component, it must only notify the mediator. When the mediator receives the notification, it can easily identify the sender, which might be just enough to decide what component should be triggered in return
	- From a components perspective, it all looks like a total black box. The sender doesn't know who'll end up handling its request, and the receiver doesn't know who sent the request in the first place
2. The `Mediator` interface declares methods of communication with components, which usually include just a single notification method. Components may pass any context as arguments of this method, including their own objects, but only in such a way that no coupling occurs between a receiving component and the sender's class
3. `Concrete Mediators` encapsulate relations between various components. They often keep references to all components they manage and sometimes even manage their lifecycle

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/mediator

## Observer (Event-Subscriber, Listener)
**Observer** is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

![[Pasted image 20250128084432.png|500]]

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

![[Pasted image 20250207200050.png|500]]

1. The `Context` provides a setter and stores a reference to a concrete state object. It delegates to it all state-specific work using the state interface
2. The `State` interface declares the state-specific methods
	- They should be used by all concrete states, rather than being senseless for some of them
3. `Concrete States` provide their own implementations for the state-specific methods
	- Intermediate abstract classes may be used to avoid code duplication
	- State objects may store a reference to the context object to fetch required info and initiate state changes
		- **State changes:** happen by replacing the state object linked in the context and can be performed by both context or state objects

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/state

## Strategy
**Strategy** is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

![[Pasted image 20250207201440.png|500]]

1. The `Context` maintains a reference to one of the concrete strategies and provides an according setter
2. The `Strategy` interface is common to all concrete strategies. It declares a method the context uses to execute a strategy
3. `Concrete Strategies` implement different variations of an algorithm the context uses
	- The context calls the execution method on the linked strategy object each time it needs to run the algorithm. It doesn't know what type of strategy it works with or how the algorithm is executed
4. The `Client` creates a specific strategy object and passes it to the context

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/strategy

## Template Methode
**Template Method** is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

![[Pasted image 20250207201535.png|500]]

1. The `Abstract Class` declares methods that act as steps of an algorithm, as well as the actual template method which calls these methods in a specific order. The steps may either be declared `abstract` or have a default implementation
2. `Concrete Classes` can override all of the steps, but not the template method itself

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

> [!details]
> https://refactoring.guru/design-patterns/template-method

## Visitor
**Visitor** is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.

![[Pasted image 20250207201633.png|500]]

1. The `Visitor` interface declares a set of visiting methods that can take concrete elements of an object structure as arguments
	- These methods may have the same names if the program is written in a language that supports overloading, but the type of their parameters must be different
2. Each `Concrete Visitor` implements several versions of the same behaviors, tailored for different concrete element classes
3. The `Element` interface declares a method for "accepting" visitors. This method should have one parameter declared with the type of the visitor
4. Each `Concrete Element` must implement the acceptance method. The purpose of this method is to redirect the call to the proper visitor's method corresponding to the current element class
	- Even if a base element class implements this method, it must be overwritten by all subclasses to call the appropriate method on the visitor object
5. The `Client` usually represents a collection or some other complex object (e.g. a [[#Composite (Object Tree)]])
	- Usually, client's aren't aware of all the concrete element classes because they work with objects from that collection via some abstract interface

### Pros
- 
### Cons
- 
### Relations to other Patterns
- 

### Double Dispatch

> [!details]
> https://refactoring.guru/design-patterns/visitor
