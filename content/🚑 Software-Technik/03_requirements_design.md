---
title: Anforderungen & Design
---
# Requirements Engineering
*Requirements engineering is a systematic and disciplined approach to the specification and management of requirements*

- Risiko für Projekte: fehlende / falsche / geänderte Anforderungen
- Requirement: A condition or capability **needed by a user** to solve a problem or achieve an objective | A condition or capability that **must be met or possessed by a system** or system component to satisfy a contract, standard, specification, or other formally imposed documents
- **zunehmende Bedeutung** durch steigende Komplexität, Verbreitung und Wichtigkeit von Software-Systemen

## Continuous Requirement Engineering
- früher: für jedes Projekt in vorgelagerter Phase
- heute: als parallele Aktivität für ein oder mehrere Produkte / Projekte
	- $\Rightarrow$ Anforderungen stets aktuell und wiederverwendbar, kürzere Entwicklungszeiten

---
# Klassisches Requirements Engineering

![[Screenshot from 2025-08-07 17-41-23.png|500]]
## 1. Dokumentation
**Typen von Anforderungen:**
1. **Funktionale Anforderungen:** zu entwickelnder Service des neuen Systems
2. **Qualitätsanforderungen:** Definition von Qualitätsaspekt für bestimmte Systemfunktionalität
3. **Constraint:** organisatorische oder technologische Einschränkungen

**Erwünschte Eigenschaften von Anforderungen:**
- korrekt
- unzweideutig
- vollständig
- konsistent
- nach Wichtigkeit und / oder Stabilität geordnet
- verifizierbar

**Anforderungsspezifikation:**

![[Screenshot from 2025-08-07 17-50-10.png|500]]

- **Ziele (Goals):** gewünschte Eigenschaften z.B. durch Modellierung festhalten
- **Szenarios:** Use Cases erfassen (z.B durch Sequenzdiagramme)
- **Lösungsorientierte Anforderungen:** Daten, Funktion und Verhalten in natürlicher Sprache erfassen

![[Screenshot from 2025-08-07 17-50-59.png|500]]

## 2. Erhebung
**Erhebungsverfahren:**
- **Interviews (SWT)**
- Workshops
- Fokusgruppen
- Beobachtung
- Fragebögen
- Perspektivisches Lesen (Studium schriftlicher Unterlagen aus einer speziellen Perspektive)

![[Screenshot from 2025-08-07 17-54-29.png|500]]

**Formen von Interviews:**
- Standardisierte Interviews: nur vorbereitete Fragen $\to$ hohe Vergleichbarkeit und oft wiederholbar
- **Explorative Interviews (SWT):** vorbereitete und spontan zusätzliche Fragen
- Unstrukturierte Interviews: keine vorbereiteten Fragen

Fragen können **geschlossen** (Auswahl aus möglichen Antworten) oder **offen** (Antwort in eigenen Worten) sein

- Individuelle Interviews: einzelne Wissensträger $\to$ Meinung einzelner Wissensträger wird sichtbar
- **Gruppeninterviews:** mehrere Wissensträger $\to$ Gruppenmeinung wird sichtbar, Einzelmeinungen evtl. nicht

## 3. Verhandlung
*Einigung zwischen Stakeholdern erreichen!*

- z.B. wenn Anforderungen nicht vollständig / konsistent / unzweideutig sind

![[Screenshot from 2025-08-07 18-01-03.png|500]]

---
# Agile Requirements
- Die Einzelheiten einer Anforderung werden in **kontinuierlich geführten Gesprächen** bedarfsorientiert ausgearbeitet
- **Platzhalter** im Product-Backlog statt ausführlichem Anforderungskatalog von Beginn an

## Gespräche
- Das wahre Ziel ist gemeinsames Verständnis
- In Gesprächen besser möglich als beim Lesen eines Dokumentes (Nachfragen u.ä.)
- Vorteile verbaler Kommunikation: eine **hohe Bandbreite**, **schnelles Feedback** und **bidirektionale Kommunikation**

## Progressive Verfeinerung
*Nach und nach große, relativ grob umrissene Anforderungen in kleinere, detailliertere Elemente zerlegen*

- Details erst ausarbeiten, wenn sie gebaut werden sollen $\to$ keine Vorhersagen, keine Überarbeitung / vergebener Aufwand, dafür regelmäßige Gespräche

![[Screenshot from 2025-08-07 19-54-11.png|500]]

## User Stories
- passendes Format, um Geschäftswert von Backlog-Elementen auszudrücken
- sowohl für Manager als auch Techniker leicht zu verstehen, einfach strukturiert, progressiv anpassbar / verfeinerbar
- [[04_agile_scrum#INVEST Principles|INVEST-Kriterien]]

**Die drei Cs:**
- **Card (Karte):** "Als `<Benutzerrolle>` möchte ich `<Ziel>`, so dass `<Nutzen>`"
- **Conversation (Gespräch):** Eine User Story ist ein Versprechen zu Gesprächen (anhaltender Dialog) über die Details einer Anforderung
- **Confirmation (Bestätigung):** Akzeptanzkriterien (Einigung zwischen Entwicklungsteam und Product Owner) und Akzeptanztests

**Nichtfunktionale Anforderungen:** Beschränkungen auf Systemebenen (z.B. Browsersupport) sollten möglichst in die Definition of Done aufgenommen werden

**Stories zum Wissenserwerb:** Product-Backlog-Elemente können auch dem Erwerb von neuem Wissen dienen
- Erkundungen / Untersuchungen mithilfe von Prototypen / Experimenten / Studien
- Vergleich zwischen verschiedenen Prototypen o.ä.

## Erhebung
*Workshops | Story Mapping | Brainstorming | Interviews | Fragebögen | Prototypen | Product Council (Entscheidungsgremium der Stakeholder) | Competitive Analysis (Vergleich mit Konkurrenten)*

### Workshops
- **Ziel:** gemeinsam nach Ideen für den gewünschten Geschäftswert zu suchen und User-Story-Platzhalter für diese anlegen
- **Teilnehmer (häufig):** Product Owner, Scrum Master, das Entwicklungsteam sowie interne und externe Stakeholder
- **Dauer:** zwischen einigen Stunden und einigen Tagen
- **Vorgehen:** Fokus wählen (z.B. nächster Sprint), dann Top-down (Epic $\to$ User Stories) oder Bottom-up (User Stories für nächsten Sprint ausdenken)

### Story Mapping

![[Screenshot from 2025-08-07 20-15-28.png|500]]

![[Screenshot from 2025-08-07 20-15-34.png|500]]

- **Rückgrat** (*Backbone*): lesen von links nach rechts
- **Restlicher Körper** (*Body*)
	- wichtige Aktivitäten (*Epic*), für die die Software genutzt wird | horizontal, zeitlicher Ablauf
	- Schritte (*Theme*) innerhalb der Aktivitäten | horizontal, zeitlicher Ablauf
	- Details (*User Story*, sprintfähig) zu einem Schritt | vertikal, Priorität
- Gute Story Maps zeigen einen **Aktivitäts-Flow aus Sicht des Benutzers**, liefern **Kontext** zum Verständnis der einzelnen Stories und deren **Relation zu größeren Kundenwerteinheiten**

## Dokumentation
*Pflege (Grooming) des Backlogs*

- **Erzeugen:** beim Bekanntwerden relevanter Informationen kommt es zu neuen Elementen
- **Verfeinern:** größere Elemente müssen in kleinere Elemente zerlegt werden
- **Löschen:** Wir löschen Element im Backlog, wenn diese nicht mehr gebraucht werden
- **Schätzen:** Aufwandsschätzung als Basis für eine Priorisierung
- **Priorisieren:** Kosten/Nutzen-Analyse, um die Reihenfolge im Backlog zu bestimmen

![[Screenshot from 2025-08-07 20-22-33.png|500]]

- Gemeinschaftsarbeit $\to$ fördert **Dialog** und **gemeinsames Verständnis**, verhindert Missverständnisse
- Am Ende der Pflege ist eine User Story **Ready** ([[04_agile_scrum#Definitions|Definition of Ready]]) | Product Backlog kann als **Pipeline** von wenig verstandenen Anforderungen hin zu fertigen Stories verstanden werden
- **Release-Linie:** trennt *must have* und *nice to have* von *won't have*

![[Screenshot from 2025-08-07 20-23-59.png|500]]

## Innovation
**Was ist die Aufgabe bei Software-Produkten?**
- **Irrglaube:** Sammeln von Anforderungen
- **Wahrheit:** die Welt verändern
	- War und Warum, nicht nur Was

**Design-Thinking:**
- früher: eine große Idee haben, sie produzieren und dann das Beste hoffen
- **heute:** rigorosen Design-Thinking-Prozess einsetzen, um die Probleme zu verstehen, die wir lösen wollen
	1. Raten und riskante Annahmen treffen
	2. MVPs bauen und mit Nutzern **testen!**
	3. **Lernziel:** Wer benutzt das Produkt wie und wozu? $\to$ User Stories

---
# Analysis & Design

![[Screenshot from 2025-08-09 15-19-25.png]]

---
# On Dependencies
## Modularity, Information Hiding
**Modularity:** partition a system into varying degrees of interdependence
- **Goal:** hide the complexity of each part behind an abstraction and interface

**Information Hiding:** he principle of segregation of the design decisions in a computer program that are most likely to change
- **Goal:** protect other parts of the program from extensive modification

## Twin Peaks
*Weaving together requirements and architectures*

![[Screenshot from 2025-08-09 15-19-30.png|400]]

**Advantages:**
1. Risk mitigation: Requirements take the system context into account (*react to changes*)
2. Speed: alternatives through prototyping (*I'll know it when I see it*)
3. Cost effective: Reuse of Commercial off-the-shelf software | workload of requirements can be estimated using first rough architecture plan $\Rightarrow$ reduction of cost by deleting "unrealistic" requirements

## Agile Design SOLID Principles
1. **Single Responsibility Principle (SRP):** A class should have only one reason to change
2. **Open/Closed Principle:** Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification
3. **Babara Liskov's Substitution Principle (LSP):** Derived or child classes must be substitutable for their base of parent class
4. **Interfrace Segregation Principle (ISP):** do not force any client to implement an interface which is irrelevant to them
5. **Dependency Inversion Principle:** High-level modules should not depend on low-level modules. Both should depend on abstractions

---
# On Functionalities
## Design Structured Matrix
![[Screenshot from 2025-08-09 15-19-38.png|500]]

- row or column = a separate domain-specific sub-model
- cell = link or dependency from the element listed on a row to the element listed on the column
	- **cell values:** number of links between the models
- red region = mission design models | blue region = models responsible for the margin calculations | green region = models responsible for the spacecraft subsystem sizing

**Advantages:**
1. Summarized dependencies
2. Ease of visualization
3. Matrix form can be used to execute algebraic operations
4. Dependencies can be represented as vectors (each row or each column), which can in turn be used to map to other spaces

**Disadvantages:**
1. Order of tasks (sequence of rows) depend on different goals (parallelization, sequencing, consistency, coupling)
2. Matrix for large systems might not be easy to visualize

![[Screenshot from 2025-08-09 15-20-02.png|500]]

## Software as a Service / Service Oriented Architecture (SOA)
*A service-oriented architecture is a software architecture based on the concepts of application front end, services, service repositories and service bus*

- A service is a software component with a specific functional meaning that typically encapsulates an abstract concept of the business world
	- Basic services form stable units that can be reused
- Process-centered services form flexible layers that can be adapted in line with business processes

![[Screenshot from 2025-08-09 15-21-08.png|500]]

1. Application front end (Lightweight, Uses services)
2. Services (include contracts, interfaces and implementations consisting of business logic and data)
3. Service repositories (connection option to existing services is provided | service contracts are provided as information)
	- Options: at the time of development, or at runtime
4. Service bus (enables connection, bridges heterogeneity, technical services)

![[Screenshot from 2025-08-09 15-21-13.png|500]]

![[Screenshot from 2025-08-09 15-21-15.png|500]]

## Microservices
*Independently executable software component that collaborates with other software components within an application system*
- Microservices are intended to take on a function within a technically delimited business domain and thus achieve a high level of cohesion in the sense of the **single responsibility principle**
- Special approach to SOA: has evolved from application practice to do SOA "right"

**Typical Problems:**
- **Hasty decomposition:** Splitting an application into microservices too early can cause problems, as there is a lack of experience in the domain and the costs for changes to the interfaces and across the microservices can be very high
- **Thinking in terms of data instead of capabalities:** Instead of identifying the truly relevant capabilities, generic CRUD (create, read, update, delete) interfaces are often used, leading to unnecessary coupling of domain models
- **Primary decomposition according to technical transitions:** technical transitions (e.g. for data access) should not be used for an initial division into microservices, as they lead to a horizontal and not the desired vertical decomposition

![[Screenshot from 2025-08-09 15-21-35.png|500]]

![[Screenshot from 2025-08-09 15-21-37.png|500]]

---
# On Systems
## Software Frameworks
- **Inversion of Control:** The framework controls the program flow, calling user-defined code via predefined hooks or templates (Template Method Pattern), unlike libraries where user code is in charge
- **Default Behavior:** Provides out-of-the-box functionality within a predefined structure, reducing setup effort (typically defined by invariant methods on abstract classes)
- **Extensibility:** Supports structured extension via hooks, APIs, or subclassing, enabling developers to override or add functionality
- **Non-Modifiable Core:** The framework’s internal code is fixed and extended through user code (e.g., plugins), not modified directly

## Software Product Lines
A set of software-intensive systems that share a common, managed set of features satisfying the specific needs of a particular market segment or mission and that are developed from a common set of core assets in a prescribed way

**Examples:**
1. Automotive Infotainment System – General Motors / Bosch
	- **Features:** navigation, media, voice control
	- **Variations:** vehicle model, region, trim level
2. Microsoft Office
	- **Features:** shared among Word, Excel, PowerPoint, and Outlook
	- **Variations:** desktop vs. web versions, business vs. personal editions, language / localization differences
3. Android Operating System – Google
	- **Features:** phones, tablets, TVs, wearables
	- **Variations:** OEMs (e.g. Samsung, Xiaomi) extend core Android with customized UIs and services
4. Siemens Industrial Automation Systems
	- **Features:** Programmable Controllers, Touch panels, Communication networks, IoT support
	- **Variations:** power plants, automotive, pharmaceutical
5. Eclipse IDE
	- **Features:** Java, C++, Web development, Model-Based Engineering
	- **Variations:** composable via plugins

**Advantages:**
1. **Increased Productivity:** Core assets can be reused across multiple products, reducing development time and effort
2. **Reduced Time-to-Market:** Reusing existing components accelerates the release of new products
3. **Lower Development Costs:** Shared components and architectures lower overall cost per product
4. **Improved Quality:** Core assets are developed and tested for reuse, increasing their reliability and consistency
5. **Systematic Variability Management:** Supports controlled customization for different market segments or customer needs
6. **Better Maintenance and Evolution:** Changes to shared assets benefit all products

## Designing Systems with Machine Learning
*Machine learning is an approach to (1) learn (2) complex patterns from (3) existing data and use these patterns to make (4) predictions on (5) unseen data*

ML solutions will shine if your problem has theses following **characteristics:**
- It's repetitive
- The cost of wrong predictions is cheap
- It's at scale (lots of data available, up-front investment in data, infrastructure, compute time and talent)
- The patterns are constantly changing (update model without figuring out the changes yourself)

ML algorithms **shouldn't** be use under any of the following conditions:
- It's unethical
- Simpler solutions do the trick
- It's not cost-effective
- **however:** the problem might still be partially solvable with ML algorithms

**Use Cases:**
![[Screenshot from 2025-08-09 15-22-26.png|500]]

![[Screenshot from 2025-08-09 15-22-28.png|500]]

**Comparison to Traditional Software:**
- Traditional assumption: code and data are separated
- ML: part code, part data, and part artifacts created from the two
- Trend: applications developed with the most/best data win $\Rightarrow$ focus on improving data
- Still relevant: test and version the data

**Challenges:**
- Not all data samples are equal (some are more valuable, e.g. more trustworthy)
- Size and runtime of ML models (especially on edge devices)
- Monitoring and debugging ML models is nontrivial
- In theory: small problem with single model | In practice: many features per application, up to one model per feature $\Rightarrow$ huge amount of models in one company
	- e.g. Uber with thousands of models
