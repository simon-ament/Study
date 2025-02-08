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
- correctness, robustness, efficiency
- **important in our context:** comprehensibility, maintainability

**Internal:** **how** a solution meets clients' expactations
- *implementation*
- separation of concerns
- high cohesion and low coupling
	- entities with well-defined meaning
	- decouple entities by using interfaces
- information hiding
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
