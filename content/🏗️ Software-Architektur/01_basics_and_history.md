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
	- e.g. “ask earlier in Slack”, “more pair prog”
