---
title: Basiswissen und Geschichte
---
# Project Management
## Development Concepts
1. **Spike:** time-bounded exploration of a concern 
	- vertical
	- e.g. enemy AI, minimap
2. **Vertical Slice:** playable game with very little features
	- horizontal
	- Milestone: "Skeleton Game"
	- e.g. just the jumping mario and a goal
3. **Minimum Viable Product (MVP):** smallest deployable feature set
4. **Requirements engineering (MosCoW):** Must-have, Should-have, Could-have, Wont-have

## Teamworking Practices
1. **Pair Programming**
	- Two Roles: Driver and Passenger | regular switching | prefer less experienced person to drive
2. **Collective Code Ownership:** anyone can change any piece of code (no knowledge silos)
	- accelerates processes (no permissions necessary)
3. **Coding Standards:** no personal styles | pretty printer
4. **Trunk-based Development:** use of *feature flags* instead of branches
	- everyone has newest state of code
	- avoids "merge hell"

## Meetings
### Goals
- reduce process overhead (branches, issue trackers, etc.)
- iterative mindset: exploration, prototyping, *"don't build for the future"*

### Types
1. **Team Meetings:** coordination, planning, knowledge sharing | coding together
2. **Tutor Meetings:** demo, questions, etc. | discussion partner for architectural decisions
3. **Retrospectives:** reflect past processes | evaluate old and identify new action items
	- e.g. “ask earlier in Slack”, “more pair programming”

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

---
# Object Oriented History