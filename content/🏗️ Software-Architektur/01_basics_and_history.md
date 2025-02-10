---
title: Basiswissen und Geschichte
---
# Good Software
## Permanent Software Crisis
**Cause:** vanishing hardware limitations, reduced hardware costs

**Positive Tendencies:**
- improved methodologies, tools, libraries, etc
- increased qualification and experience
- **generative AI**

**Negative Tendencies**
- exponential increase  of functionality
- **generative AI**
- ==high complexity of providing understandable, correct and verifiable programs and systems==

> “[…] as long as there were no machines, programming was no problem at all; when we had a few weak computers, programming became a mild problem, and now we have gigantic computers, programming has become an equally gigantic problem.” - Dijkstra

## External and Internal Criteria
**External:** **what** clients expect from a solution
- *behavior*, independent of implementation
- **important in our context:** comprehensibility, maintainability
1. **correctness:** perform tasks as specified
	- due to complexity, often achieved through [[06_architectural#Layers|layering]]
2. **robustness:** react appropriately to abnormal conditions
	- complements correctness (inside vs. outside of specification)
3. **efficiency:** place as few demands as possible on hardware resources
	- e.g. processor time, space occupied, bandwidth in communication device
	- often results in exaggerated concern for micro-optimizations and premature abstraction
4. **extensibility:** ease of adaption to changes of specification
	- a problem of scale (large software)
	- achieved through simplicity of design and decentralized / modular architecture
	- extension should be connected, but separated
5. **reusability:** ability to serve for the construction of many different applications
	- exploit **commonalities**, provide **variabilities**

**Internal:** **how** a solution meets clients' expectations
- *implementation*, perceivable by original developers and maintainers
- needed to achieve external criteria
1. [[#Modularity|modularity]]
2. readability
	- achieved through [[04_idioms|idioms]], [[05_patterns|design patterns]], [[06_architectural|architectural styles]], [[06_architectural#Frameworks|libraries and frameworks]]
3. separation of concerns
4. [[#Coupling and Cohesion|high cohesion and low coupling]]
	- entities with well-defined meaning
	- decouple entities by using interfaces
5. information hiding
	- system boundaries to localize change

## Essential und Accidental Complexity
- **Essential / Intrinsic complexity:** Inherent property of the problem / application domain
- **Accidential / Extrinsic complexity:** Property of the solution / implementation domain
	- complications caused by implementation decisions (models, language, libraries, tools, infrastructure, bad code)

## Program What, Not How
- Programming language designer makes the rules
	- New words, new grammar (loops instead of `goto`)
	- *"You will write elegant code"*
- **Modularity:**
	- Separation of Concerns
	- Group by shared secrets, common functionality, no up-calls / callbacks
	- Modules with clear, narrow interface

### Module Constructs
- Clear module interface (explicit, enforced, type systems, opacity)
	- Treat modules as their interface
- Abstraction mechanism: from the outside only the module abstraction is visible
- Makes overall system structure visible (architectural thinking) | parts of a system can be zoomed into one at a time

---
# Modularity
Software systems are structured into units called **modules** chosen to encourage **extensibility, reusability** and **maintainability**
- achieved by decomposing along tasks
- well-defined inputs and outputs, independently tested (and maintained)

**Modularity:** the degree to which a set of designs (or tasks) is **partitioned into components**, called modules, that are highly dependent within a module (**high cohesion**) but nearly independent across modules (**low coupling**)

**Module:** represents a set of tasks that **distinguishes** itself from others, provides **added value** to the system and depicts a **unit of substitution** in the architectural design
- hierarchical module structure possible
- modular in design $\neq$ modular at run-time

## Coupling and Cohesion
**Coupling:** measures interconnectedness / the strength of dependency **between classes and packages**
- low coupling $\Rightarrow$ local changes, understandable in isolation, independent reuse
- no coupling at all ist not desirable either (decomposability)

**Cohesion:** measures the strength of the relationship amongst elements of a class (module)
- e.g. similar instance variables used in methods
- class should be describable by a simple sentence (all operations and data belong the concept the class models)
- high cohesion $\Rightarrow$ easy to comprehend, reuse and maintain | fine-grained abstractions and responsibilities
1. **coincidental cohesion:** no meaningful relationship amongst elements of a class
2. **logical cohesion:** elements of a class perform one kind of a logical function
3. **temporal cohesion:** elements of a class are executed together

![[Screenshot from 2025-02-10 10-17-24.png|500]]

## Modularity according to Meyer
- Criteria $\to$ Rules $\to$ Principles

### Criteria
imposed on design methods
1. **Decomposability:** division of labor into less complex sub-problems
	- $\Rightarrow$ separation of concerns
	- **Example:** top-down design
	- **Counter example:** global initialization modules
2. **Composability:** free combination of software elements into new systems
	- $\Rightarrow$ sufficiently autonomous software elements, resusability
	- **Example:** Unix shell pipes
	- **Counter example:** Preprocessors (often not compatible)
3. **Understandability:** human reader can understand each module without having to know the others (or, at worst: examine only a few of the others)
	- $\Rightarrow$ low coupling / correct modularity
	- **Counter Example:** Sequential dependencies (e.g. pipes and filters with specific order), hard to understand element without its "predecessors"
4. **Continuity:** change in problem specification changes just one (or a small number of) module(s)
	- **Example:** symbolic constants (e.g. `self addVelocity: self velocity`)
	- **Counter example:** physical representations and static arrays (fixed size)
5. **Protection:** abnormal condition remains confined to that module (or, at worst: a few neighboring modules)
	- **Example:** validating input at the source
	- **Counter example:** undisciplined use of exceptions (useful to separate erroneous cases, but must be used carefully)

### Rules
1. **Direct mapping:** modular structure devised in the process of building a software system should remain compatible with any modular structure devised in the process if modeling the problem
	- **Follows from:** continuity (local changes) + decomposability
2. **Few interfaces:** every module should communicate with as few others as possible
	- for $n$ modules: stay closer to minimum of $n - 1$ connections than maximum of $n * (n - 1) / 2$
	- **Solution:** layers and levels of indirection (layered reference, e.g. [[05_memory_management#Hierarchical Page Table|hierarchical page tables]], intermediate representation in compilers / virtual machines)
3. **Small interfaces:** communicating modules should exchange as little information as possible
	- **Counter example:** Fortran's garbage common block (shared variables)
	- **Follows from:** continuity (local changes) + protection
4. **Explicit interfaces:** Whenever to modules A and B communicate, this must be obvious from the text of A or B or both
5. **Information hiding:** every module should only expose a subset of its properties an keep the rest private from clients
	- $\Rightarrow$ abstraction as design technique 

### Principles
1. **Linguistic modular units:** Modules must correspond to syntactic units in the language used
	- language: programming language (separately sompilable), design language, specification language, etc.
	- restriction introduced based on used language (if it does not offer the modular construct)
	- **Follow from:** continuity (local changes) + decomposability + composability + protection
	- *Program what, not how*
2. **Self-documentation:** information about the module should be part of the module itself
	- $\Rightarrow$ internal documentation. no separate documentation documents
	- **Follows from:** understandability
	- *Make the code look like the design!*
3. **Uniform access:** all services by a module should be available through a uniform notation
	- independent of implementation details (e.g. storage / computation)
	- **Example:** `account balance` in Smalltalk
	- **Counter example:** `account.balance` (stored) vs. `acount.balance()` (computed) in Java
	- *Uniform access hides complexity and avoids reimplementation*
4. **Open-closed:** Modules should be both open and closed
	- **Open module:** available for extension
		- natural concern: needed data and operations are not foreseeable over a module's lifetime
	- **Closed module:** available for use | well-defined and stable interface
		- project manager's concern: many modules $\to$ many dependencies, need to close some modules eventually
		- e.g. can be compiled, stored in a library and made available for other clients to use
	- **Approaches:** Inheritance and late binding allow flexible extension
5. **Single choice:** Whenever a software system must support a set of alternatives, one and only one module in the system should know their exhaustive list
	- $\Rightarrow$ distribution of knowledge, ==need-to-know== policy
	- **Follow from:** continuity (local changes) + open-closed principle
	- strong form of information hiding (hide list of variants)

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. – Robert C. Martin
