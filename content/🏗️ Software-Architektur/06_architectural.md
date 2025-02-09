# Why Architectural Styles?
Express fundamental structural organization schemas for software systems
- **Subsystems** and their **responsibilities** + **relationships** between them
- large-scale patterns
- specify the system-wide structural properties of an application

---
# Architectural Styles

## Layers
The Layers architectural pattern helps to structure applications that can be decomposed into groups of subtasks in which each group of subtasks is at a particular level of abstraction.

![[Screenshot from 2025-02-08 11-17-07.png|500]]

1. Define **abstraction criterion** for layering
2. Determine number of abstraction **levels**
3. Name layers, assign tasks to each of them
4. Specify the **services**
5. Refine the layering (iterate over steps 1 - 4)
6. Specify an **interface** for each layer (*protocols*)
	- layer $n - 1$ should be a black box for layer $n$
7. Structure the individual layers
8. Specify the communication between layers (*push* or *pull*)
9. Decouple adjacent layers (use *callbacks*, *commands*, *events*, etc.)
10. Design an **error-handling** strategy

![[Screenshot from 2025-02-08 11-22-15.png|500]]

### Pros
- **Reuse** of layers
- Support for **standardization**
	- **Exchangeability:** e.g. installation of new graphics driver
- Dependencies kept **local**

### Cons
- **Cascades** of changing behavipr
- Lower **efficiency**
	- **Unnecessary work:** e.g. packing and unpacking
- Difficult to establish correct granularity of layers
	- **Too many layers:** unnecessary complexity and overhead
	- **To few layers:** does not fully exploit pattern's potential

### Variants
- **Relaxed layers:** Layer $n$ communicates with layers $1$ through $n - 1$
	- higher flexibility and performance
	- loss of maintainability
- **Layering through inheritance:**
	- class of layer $n$ is a subclass of layer $n - 1$ class
	- higher layer can modify lower-layer services
	- higher coupling between layers (fragile base class problem)

## Model-View-Controller

## Pipes and Filters

## CRC-Cards

---
# Frameworks
A framework is the design for an application or subsystem
- A set of abstract classes and the way objects in those classes collaborate (Ralph. E. Johnson)
- **Object-oriented:** A collection of cooperating classes that together define a **generic or template solution** to a **family of domain specific requirements**
- Dictate **overall structure** of a **family of applications**
	- partitioning into **components** + their **responsibilities** and **interaction**
- Make intensive use of [[05_patterns#Template Method|Template Methods]] for modeling **hot-spots** in a design
	- application-specific details filled in during **instantiation (customization)**
- $\Rightarrow$ **Design reuse** (domain concepts) + **Implementation reuse** (instantiate concrete and inherit abstract classes)

**A framework defines:**
1. A **model** of some domain (or aspect thereof)
2. The **abstract design** of this model as a set of interfaces
	- The **space of possible run-time object configurations**
	- The **object coupling** on an abstract level
	- The allowed **control flow** between objects
	- The **distribution of responsibilities** between classes
3. Possible **implementations** and the **constrains** thereon by means of a partial (abstract) implementation
	- Generic reusable functionality
	- A reuse skeleton and a reuse contract

## Hollywood Principle
> "Don't Call US, We Will Call You"

- inversion of control: framework coordinates sequencing of application activity
- communication between framework and application can be two-way, but typically is **one-way**

![[Screenshot from 2025-02-09 00-30-56.png|500]]

## Patterns vs. Frameworks
- Patterns are **smaller**: usually multiple patterns in a framework
- Patterns are **more abstract**: frameworks provide implementations that can be reused as is
- Patterns are **less specialized**: Frameworks apply to specific application domain, patterns to any [[02_object_oriented|OO]] software system

## White-box vs. black-box
**White-box:** Customized by **subclassing** existing framework classes and providing concrete implementations
- hooks within the framework's **hot-spot** regions
- need to know the framework implementation in more details

**Black box:** Customized through **composition**
- Filling in parameters or plugging together compatible components from a library of prefabricated components
	- **Prefabricated components:** Existing framework classes which must be complete implementations of some interface in the abstract design
	- Selection and parameterization often supported by tools
- **Fixed number of choices** foreseen by framework developers

**Gray-box:** Framework using both **refinement / inheritance** and **parameterization**
- Frameworks often evolve: white-box $\to$ gray-box $\to$ black-box

## Framework Integration
**Inversion of control:**
- Workaround: one thread per framework

**Integration with legacy code:**
- Workaround: use Adapter design pattern

**Architectural mismatches:**
- Different models of integrated framework components
- Different interactions
- Different pragmatics ([[02_object_oriented|OO]], [[06_architectural#Pipes and Filters|Pipes and Filters]], etc.)

## Documenting a Framework
1. Intention
2. Default behavior
3. Constraints
4. Override instructions

![[Screenshot from 2025-02-09 09-46-08.png|500]]

> About 80% of all framework projects fail - Grady Booch

---
# Pattern Languages
## Pattern language vs. collection of patterns
> A set of patterns becomes a pattern language when each of its patterns, once solved, leads to more patterns that should then be considered.

- structured system of **interconnected patterns**, where each pattern is part of a larger, cohesive structure
- patterns within a language are often related in a way that the application of **one pattern might lead to the use of another**, creating a flow or network of solutions
- short: **dynamic and interrelated set of patterns**
- GoF patterns (*Gang of Four / Design Patterns. Elements of Reusable Object-Oriented Software*) is a collection, not a language

## Null Object


## Extension Object


## Half-Object + Protocol
