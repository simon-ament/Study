---
title: Agile & Scrum
---
# Agile Scrum Basics

![[Screenshot from 2025-08-07 10-34-23.png]]

**Sprint:** container for all the **work** that is done by the team to **achieve a Sprint Goal**
- no work outside the Sprint | no gaps between Sprints
- starts with a **Sprint Planning** meeting
- lasts no longer than a month
- ends with two reviews: **Sprint Review** (work completed) & **Sprint Retrospective** (process)

**Sprint Backlog:** all the **work to be done** by the team over one or more Sprint Goals

**Sprint Planning:** select product backlog items to be part of Sprint Goal | **focus on value** that can be created by the Sprint
- **Sprint Goal:** selection of items that were estimated and prioritized to be done

**Sprint Review:** working meeting where the Scrum Team presents their completed work to their stakeholders and asks for feedback and guidance
- used to discuss **progress** towards Product Goal, **emerging changes** in the business and technical landscape as well as future **collaboration strategies**

**Retrospective:**
- *What went well in the Sprint?* : collaboration, impediments and handling of them, [[#Definitions|Definition of Done]] still appropriate?
- *What can be improved?* : process & methods, tooling, communications, attitude (+ priority among those issues)

![[Screenshot from 2025-08-07 15-21-43.png|500]]

## Lifecycle of Backlog Item
1. **Backlog:** waiting to be estimated and prioritized
2. **Ready / To-Do:** waiting to be added to a Sprint Goal
3. **In Progress:** item is in the current Sprint Goal
4. **Review:** implemented (and tested), waiting to be reviewed
5. **Done:** finished by the team

## Definitions
**Definition of Ready:** The team defines the criteria to decide if a **User Story** can be part of a Sprint
- e.g. dependencies accounted for, acceptance criteria defined, estimation finished, value and priority aligned on current Sprint Goal, design assets available, testing defined (manual / automated)

**Definition of Done:** The team must specify the criteria for deciding if a **User Story** is finished, hence it can be presented (demo) to the user during the **Review Meeting**
- e.g. fully reviewed, tested without errors, documentation updated, implementation compliant with standards

## User Stories, Epic, Initiatives
**User Story:** short requirements or requests written from the perspective of an end user

**Epic:** large body of work that can be broken down into smaller items (called stories)
- Systemfunktionen

**Initiative:** collection of epics that drive toward a common goal
- größere geschäftliche und gesellschaftliche Ziele

**Theme:** strategische, übergeordnete Zielsetzung eines Unternehmens
- z.B. "in 10 Jahren CO2-neutral werden"
- zur Verwirklichung müssen mehrere Initiativen ins Leben gerufen werden

*Theme > Initiative > Epic > User Story*

---
# User Stories
1. Small piece of functionality
2. Describe from the perspective of the user
3. Deliver value to the user

> As a [type of user], I want [goal] so that [reason].

1. **User role:** this could be a specific type of user, like an "admin" or "customer," or a more general role, like "end user"
2. **Goal:** this should be a single, clear objective
3. **Reason:** explain why the user wants to achieve this goal | provide context and justification for the feature
4. **Acceptance Criteria:** set the expectations that have to be met for the user story to be **closed** | often written as a checklist of specific requirements

## Benefits
- **User centric:** keeps the focus on the user's needs
- **Collaboration:** Encourages teamwork and communication
- **Flexibility:** Easily adjustable as priorities change
- **Clarity:** Offers clear guidance on what needs to be built

## Common Mistakes
- **Vagueness:** "As a user, I want a better dashboard"
- **Too large:** "As an admin, I want to manage users, roles, and permissions"
- **Focusing on Solutions:** "As a user, I want a drop-down menu to select my country"

> [!example] Examples
> 1. As an **online shopper**, I want to **receive price alerts** so that **I can buy my** **favorite products a lower prices**
> 2. As a **frequent traveler**, I want to **receive flight status updates** so that **I can** **plan my airport arrival accordingly**
> 3. As a **customer**, I want to **receive an email confirmation** so that **I know my order has been processed**

![[Screenshot from 2025-08-06 21-08-24.png]]

## INVEST Principles
- **Independent:** They should stand alone and not depend on other stories
- **Negotiable:** They should be flexible and open to discussion
- **Valuable:** They should deliver value to the user
- **Estimable:** They should be easy to estimate in terms of time and effort
- **Small:** They should be small enough to complete within a single sprint
- **Testable:** They should have clear acceptance criteria

---
# Agile
*Ermöglicht bessere Abstimmung zwischen Werten $\to$ Prinzipien $\to$
Methoden $\to$ Tools*

- **Wohldefinierte Probleme:** klare Ziele und Lösungswege $\to$ Engineering als Optimierungsproblem
- **Verzwickte Probleme (wicked problems):** unklar definiert, Verständnis durch Lösungsentwicklung $\to$ Engineering als iteratives Suchproblem

![[Screenshot from 2025-08-08 10-07-44.png|500]]

**The Agile Manifest:**
- **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge
- **Funktionierende Software** mehr als umfassende Dokumentation
- **Zusammenarbeit mit Kunden** mehr als Vertragsverhandlung
- **Reagieren auf Veränderung** mehr als das Befolgen eines Plans

![[Screenshot from 2025-08-08 10-13-53.png|500]]

![[Screenshot from 2025-08-08 10-13-57.png|500]]

---
# Scrum

![[Screenshot from 2025-08-08 10-17-11.png|500]]

**Sprints (Aktivität):**
- Time-Boxen / Iterationen (feste Länge $\leq$ Kalendermonat)
- sollte etwas von greifbarem Wert schaffen
- normalerweise: während des Sprints keine Änderungen, die das Ziel gefährden

**Rollen:**
- **Product Owner:** was und in welcher Reihenfolge
- **Scrum Master:** Nutzung des Scrum-Frameworks anleiten
- **Entwicklungsteam:** verantwortlich das zu liefern, was der Product Owner haben möchte

**Product Backlog (Artefakt):**
- **Elemente:** erforderliche Funktionen / Eigenschaften, technische Verbesserungen, etc.
- Elemente werden durch Product Owner mit Stakeholdern gesammelt
- Arbeitsreihenfolge wird durch Product Owner bestimmt
- **Pflege (Grooming | Aktivität):** Anlegen und Verfeinern der Elemente, Priorisierung auf Basis der Kosten (z.B. Story-Punkte oder Idealtage)

**Sprint-Planung (Aktivität):**
- Planungstreffen mit Owner, Entwicklungsteam und Scrum Master
- Owner und Entwicklungsteam einigen sich auf Sprint Goal
- Entwicklungsteam ermittelt Elemente mit höherer Priorität, die realistisch im nächsten Sprint umgesetzt werden können
- ca. 2 Stunden Planung pro Sprint-Woche

**Sprint Backlog (Artefakt):**
- Aufteilen der angestrebten Funktionen in eine Reihe von Aufgaben (**Just-in-time-Planung**)
- Aufwandsschätzung der Aufgaben (typischerweise in Stunden)

**Sprint-Ausführung (Aktivität):**
- Entwicklungsteam führt unter Anleitung des Scrum Masters alle Aufgaben durch
	- Reihenfolge und wie der Arbeiten selbstbestimmt
- Ziel ist das Erreichen des **Done**-Zustandes
	- **Fertig (Done | Artefakt):** Aus Sicht des Scrum-Teams ein potenziell auslieferungsfähiges Produktinkrement (Definition variabel)

**Daily Scrum (Aktivität):**
- Tägliches zeitlich begrenztes Treffen (max. 15 Minuten)
- *Was wurde geschafft? Woran wird nun gearbeitet? Welche Hindernisse gibt / gab es?*

**Sprint Review (Aktivität):**
- **Teilnehmer:** Scrum Team, Stakeholder, Sponsoren, Kunden sowie aus anderen Teams
- **Fokus:** Überprüfen der gerade fertiggestellten Funktionen im Kontext, Beeinflussung der weiteren Entwicklung
- **Scrum Team:** entwickelt ein tieferes Verständnis für die Geschäfts- und Marketingseite ihres Produkts

**Sprint Retrospektive (Aktivität):**
- **Teilnehmer:** Scrum Team, Scrum Master und Product Owner
- **Fokus:** stetige Verbesserung des Prozesses
- **Scrum Team:** sollte konkrete Aktionen zur Prozessverbesserung für den nächsten Sprint identifiziert haben

---
# Code Review
*Methodology to inspect the source code for compliance and possible bugs*

![[Screenshot from 2025-08-07 11-16-56.png|500]]

- Improves **code quality**, promotes **code ownership** of the team and can help **onboard** new members
- **Best practices:**
	- create a **checklist** (e.g. readability, security, test coverage, architecture, reusability)
	- code review **metrics** (e.g. inspection rate, defect rate, defect density)
	- provide rich **feedback**: what, why, and how to change

---
# Planung
## Kanban Board
- visualize work (minimize work invisibility)
- limit work-in-progress
- maximize efficiency

![[Screenshot from 2025-08-08 15-11-39.png|500]]

- **Ready:** understood by team | has business value | dependencies identified | is small | clear acceptance criteria
- **Done:** built without errors | acceptance criteria are met | demonstrated to stakeholders | approved by Product Owner | documentation updated

## Scrumban
**Splitting User Stories:** Smaller User Stories
1. are easier to understand $\Rightarrow$ less bugs
2. help identify waste $\Rightarrow$ promotes simplicity
3. are quicker to release $\Rightarrow$ faster feedback loop

- **User Story:** provides business value
- **Task:** doesn't provide business value

## Velocity, Burndown & Burnup
- **Velocity:** how many story points the team delivered in a sprint
	- $\Rightarrow$ prediction of time, cost and next sprint
	- **Capacity Planning:** necessary size of the team (future)
- **Burndown Chart:** shows
	1. the amount of work that has been completed in an epic or sprint
	2. the total work remaining
	- $\Rightarrow$ prediction of completion time & identification of scope creeps

![[Screenshot from 2025-08-08 15-25-05.png|500]]

- **Burnup Chart:** total work planned vs. work completed to date

![[Screenshot from 2025-08-08 15-26-22.png|500]]
