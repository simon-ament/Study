---
title: Methoden & Tools
---
# Aufwandsschätzung
## Planning Poker
*consensus-building technique to estimate the items in the product backlog*

![[Screenshot from 2025-08-08 10-41-20.png|500]]

1. To start a poker planning session, the product owner or customer reads a user story or describes a feature to the players
	- z.B. "Customer enters search criteria for a hotel reservation"
2. Players estimate by selecting numbered cards face-down to the table
3. Cards are simultaneously displayed
4. Discuss and explain the **high** and **low** estimates
5. Repeat as needed until convergence (**same number**)

**Vorteile:**
- Schätzungen sind **relativ**, nicht absolut $\to$ einfacher zu aktualisieren, Aufwand in Stunden an historischen Daten abschätzbar
- Alle Teammitglieder haben die **gleiche Stimm**e (Vielfalt)
- Prozess hilft, **Lücken** in den User Stories und technischen Lösungen zu **identifizieren** $\to$ reduziert Risiko, falsche Anforderungen umzusetzen

**Nachteile:**
- **schwierig**, bei stark unterschiedlichen Komplexitäten $\to$ kleine und ähnliche Stories
- **teuer**, wenn viele Runden bis zum Konsens benötigt werden

> [!info]- Alternative Beschreibung
> Jedes Teammitglied erhält Karten mit Werten aus einer angepassten Fibonacci-Folge (z.B. $0, \frac12, 1, 2, 3, 5, 8, 13, 20, 40, 100$). Diese Werte stehen für den geschätzten Aufwand (z.B. in Stunden). Zusätzlich kann es besondere Karten wie "?" oder "$\infty$" geben. 
>
>Zu Bestimmung des Aufwandes decken alle Mitglieder gleichzeitig die Karte mit Ihrer Schätzung zu einer User auf. Bei abweichenden Einschätzungen können die Personen mit den höchsten und niedrigsten Schätzungen jeweils ihre Position kurz erläutern (max. $30$ Sekunden), bevor erneut geschätzt und aufgedeckt wird. Dieser Prozess wiederholt sich bis ein Konsens erreicht wurde.
>
>Bei Bedarf übernimmt ein Teammitglied die Moderation, darf dafür aber nicht mit schätzen.

> [!info] Informationen und Tools
> https://en.wikipedia.org/wiki/Planning_poker
> 
> https://planningpokeronline.com

## T-Shirt Sizing
Ordnen Sie gemeinsam im Team die User Stories den T-Shirt-Größen *S*, *M*, *L* oder *XL* zu. Definieren Sie zuvor im Team, was die einzelnen Größen in Ihrem konkreten Fall bedeuten (z.B. hinsichtlich Umfang, Komplexität oder Zeitaufwand). Diskutieren Sie Ihre Einordnungsvorschläge im Team und entscheiden Sie für jede User Story gemeinsam.

> [!info] Informationen
> https://daily.dev/blog/t-shirt-sizing-in-agile-guide-2024

## NoEstimates
Bei dieser Methode erfolgt keine klassische Aufwandsschätzung der User Stories. Stattdessen liegt der Fokus darauf, User Stories bereits bei der Formulierung so zu gestalten, dass sie möglichst gleich groß, überschaubar und gut planbar sind.

In der Sprint-Planung prüfen Sie lediglich gemeinsam im Team, ob die Größe der jeweiligen User Story von allen als angemessen empfunden wird.

> [!info] Informationen
> https://t2informatik.de/blog/die-idee-no-estimates/

## Relative Affinity Estimation
Anstatt User Stories mit Punkten zu bewerten oder in vordefinierte Kategorien einzuordnen, verwenden Sie in dieser Methode eine relative Schätzung. Ziel ist es, die User Stories im Vergleich zueinander auf einer Skala von geringem bis hohem Aufwand anzuordnen.

> [!info] Informationen
> https://www.techagilist.com/agile/scrum/affinity-estimation-agile-estimation-method/

---
# Priorisierung
## Dot Voting
Nutzen Sie ein physisches oder digitales Whiteboard, um alle aktuell im Backlog befindlichen User Stories aufzulisten. Eine Gruppierung thematisch ähnlicher Stories ist dabei erlaubt und kann hilfreich sein.

Zur Priorisierung kann nun jedes Teammitglied eine festgelegte Anzahl an Punkten auf die User Stories Verteilen (z.B. Klebepunkte, Magnete, Stiche). Die User Stories mit den meisten Punkten werden priorisiert.

Diese Priorisierung sollte regelmäßig nachdem User Stories abgeschlossen wurden wiederholt werden.

> [!info] Informationen
> https://daily.dev/blog/dot-voting-in-agile-prioritization-technique

## MoSCoW-Priorisierung
Bei der MoSCoW-Priorisierung ordnen Sie User Stories in vier Kategorien ein:
- **Must:** Diese User Story ist zwingend erforderlich und sollte bald umgesetzt werden
- **Should:** Diese User Story sollte umgesetzt werden, sobald alle Must-Stories abgeschlossen sind
- **Could:** Diese User Story kann umgesetzt werden, nachdem alle höher priorisierten Anforderungen erfüllt wurden
- **Won't:** Diese User Story wird nicht umgesetzt

> [!info] Informationen
> https://de.wikipedia.org/wiki/MoSCoW-Priorisierung

## Value vs. Complexity Matrix
Ordnen Sie die User Stories auf einem Graphen an, wobei auf der $x$-Achse der geschätzte Aufwand für Ihr Team und auf der $y$-Achse der Mehrwert für diejenigen, die Ihre Software nutzen, dargestellt wird.

Nachdem die Stories platziert sind, priorisieren Sie diese basierend auf ihrer Position im Graphen. User Stories mit geringem Aufwand und hohem Mehrwert sollten höher priorisiert werden als solche mit hohem Aufwand und geringem Mehrwert.

> [!info] Informationen
> https://www.productplan.com/glossary/value-vs-complexity/

---
# Git
## Tags
- `HEAD`: der aktuell ausgecheckte Branch des lokalen Repositories (sichtbare Dateien)
- `main`: neueste Version des Hauptstranges im lokalen Repository
- `origin/main`: neueste Version des Hauptstranges im Repository auf dem Server
- `RELEASE_v1.2` o.ä.: benutzerdefinierte Tags, z.B. für Versionsnummern in der Historie

## Befehle
- `git add`: lokale Änderungen für den nächsten commit stagen
- `git status`: aktuellen Stand des Arbeitsverzeichnisses anzeigen (*staged changes*)
- `git reset`: aktuelles Arbeitsverzeichnis auf einen bestimmten / den letzten Commit zurücksetzen
- `git commit`: aktuelle Änderungen (*staged*) commiten
- `git log`: Historie der commits anzeigen

- `git branch <new_branch>`: neuen Branch erstellen
- `git checkout <branch/tag/commit>`: auf Branch wechseln
- `git merge <branch/tag/commit>`: anderen Branch auf den aktuellen Branch mergen

- `git clone`: Remote-Repository lokal klonen
- `git pull`: Änderungen aus Remote-Repository laden und lokal anwenden
- `git fetch`: Änderungen aus Remote-Repository laden (ohne sie lokal anzuwenden)
- `git push`: lokale Commits in Remote-Repository hochladen

![[Screenshot from 2025-08-06 11-17-01.png|500]]

---
# Angular NgRx

![[Pasted image 20250806102056.png|500]]

---
# Code of Conduct / Working Agreement
How we should interact when we:
1. communicate positive / negative, written / oral, private / public
2. disclose information and risks
3. make estimates and promises
4. address each other and customers / users
5. express disagreement and frustration
6. manage conflict
7. negotiate and share decisions
8. register & write down dissenting opinions

---
# Requirements Elicitation / Interviewing
**Five Orders of Ignorance:**
0. **Lack of Ignorance:** I know the answer
1. **Lack of Knowledge:** I know the question
2. **Lack of Awareness:** I know the type of question
3. **Lack of Process:** I know how to go from one type of question to another
4. **Meta Ignorance:** I know that knowledge is captured at various levels of abstraction

## Asking Questions: SPIN
- **Situation (of users):** context, systems, business processes, regulations, user's role
- **Problems (affecting user):** mistakes, latency, time-outs
- **Implications (cause-effect):** cognitive load $\to$ mistakes | delays $\to$ low satisfaction of users | sequential reprocessing of item $\to$ time-outs
- **Needs-Payoff (solution-benefits):** usability $\to$ intuitive, easy to find functions and keep track of $n$ number of inputs, indexing $\to$ speed up queries by $x$% | distributed processing $\to$ eliminate time-outs

---
# UML Diagramme
## Komponentendiagramme

![[Screenshot from 2025-08-07 10-07-07.png|500]]

![[Screenshot from 2025-08-07 10-07-13.png|500]]

## Klassendiagramme
- auf Code-Ebene (Liste aller Softwareklassen) oft zu umfangreich
- sinnvoll für Zusammenhänge zwischen (technischen und nicht-technische) Konzepten

![[Screenshot from 2025-08-07 10-09-14.png|500]]

## Paketdiagramme
- Hierarchie und Abhängigkeiten (insbesondere `import`) zwischen Paketen
- Darstellung von Bibliotheksabhängigkeiten und Ordnerstruktur

![[Screenshot from 2025-08-07 10-10-50.png|500]]

## Kommunikationsdiagramme
- wie Sequenzdiagramm, aber geographisch angeordnet
- Reihenfolge der Nachrichten nummeriert
- keine Kontrollfluss-Fragmente (z.B. `opt`, `alt`, `loop`)

![[Screenshot from 2025-08-07 10-10-55.png|500]]

---
# FMC Diagramme
## Aufbaustrukturdiagramme

![[Screenshot from 2025-08-07 10-07-38.png|500]]

![[Screenshot from 2025-08-07 10-07-51.png|500]]
