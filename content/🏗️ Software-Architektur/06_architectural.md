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


---
# Pattern Languages

## Null Object


## Extension Object


## Half-Object + Protocol
