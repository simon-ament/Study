---
title: Scheduling und Dispatching
---
# Scheduling
## Scheduler
Der Scheduler bestimmt, welcher Prozess als nächstes die CPU nutzen darf. Man unterscheidet zwei Formen:
- **Long-Term-Scheduler** entscheidet, welche Prozesse in den Arbeitsspeicher geladen werden dürfen
- **Short-Term-Scheduler** entscheidet, welche Prozesse direkt auf der CPU ausgeführt werden können

Er verwaltet dazu 2 Queues:
- **Ready Queue:** Prozesse, die im Hauptspeicher liegen und auf Ausführung warten
- **Waiting Queue:** Prozesse, die auf ein Event (z.B. I/O) warten

![[Screenshot from 2025-02-02 15-56-11.png]]

### Kooperativ
Beim kooperativen Scheduling gibt ein Prozess, sollte er fertig sein oder auf etwas warten, die **CPU freiwillig für andere Prozesse frei**
- $\Rightarrow$ einzelner Prozess kann System blockieren
### Präemptiv
Beim präemptiven Scheduling kann das Betriebsystem einem Prozess die CPU zwangsweise entziehen
- $\Rightarrow$ faire Aufteilung der CPU-Zeit möglich
- stabiler, aber aufwändiger zu implementieren
#### Quantum-basiert
Ein Quantum ist eine **kleine Zeiteinheit** von typischerweise $10$ bis $100$ Millisekunden.
- Schranke für die zusammenhängende CPU-Zeit eines Prozesses
- bei prioritätenlosem Scheduling (Round-Robin): $n$ Prozesse und Quantum $q$ $\Rightarrow$ jeder Prozess wartet maximal $(n−1) \cdot q$ Zeiteinheiten, bis er das nächste Mal ein Quantum zugewiesen bekommt
- großes Quantum $\to$ FiFo
- kleines Quantum $\to$ viele Kontextwechsel (Zeitverlust)
- Quantum wird meist so gewählt, dass ca. $80\%$ der Prozesse in einem Quantum fertig werden

## Echtzeit-Scheduling
Bei Echtzeit(-Scheduling) geht es darum, dass Aufgaben **innerhalb eines festen Zeitraums** erledigt werden müssen
- **harte Echtzeit:** Einhaltung von Deadlines wird garantiert
	- z.B. verwendet bei Sensorik selbstfahrender Autos (Gefährdung von Menschenleben)
- **weiche Echtzeit:** Deadines sollten zwar eingehalten werden, allerdings ist ein geringes Überschreiten dieser nicht problematisch. 
	- z.B. Computerspiele (Framerate, Verzögerung verschlechtert Spielergebnis, aber ist akzeptabel)

### Anforderungen an Echtzeit-Scheduling-Verfahren
Ein echtzeitfähiges Scheduling-Verfahren muss sicherstellen, dass Prozesse innerhalb ihrer festgelegten Zeit ausgeführt werden. Dazu sollte es:
- die Startzeit eines Prozesses an seine Deadline anpassen können
- Prozesse mit kürzeren Deadlines bevorzugen können
- **periodische Prozesse**, die regelmäßig innerhalb derselben Deadline ausgeführt werden müssen, verwalten können
- $\Rightarrow$ insbesondere auch präemptiv sein

## Scheduling-Algorithmen
> [!danger] Nachtragen (Blatt 3 Aufgabe 6 + 7)
### FiFo

### Prioritätsloser Round-Robin

### Prioritätenbasierter Round-Robin


## Starvation Avoidance
Moderne Betriebssysteme verwenden verschiedene Fairness-Algorithmen, um auch Threads mit niedriger Priorität regelmäßig CPU-Zeit zuzuweisen. Zentraler Bestandteil solcher Fairness-Algorithmen sind häufig:
- Tracken der Wartezeiten der zur Ausführung bereiten Threads
- dynamische Anpassen der Thread-Prioritäten
	- häufig ausgeführte Threads: Priorität wird verringert
	- selten ausgeführte Threads: Priorität wird erhöht, um Starvation zu vermeiden (Aging)

> [!caution] Boosting und Aging unterscheiden, Code-Beispiel einbauen

## Multilevel-Queue Scheduler
Ein Multilevel-Queue Scheduler teilt Prozesse in **verschiedene Priority-Queues** auf, abhängig von Priorität und Aufgabe
- Jede Priority-Queue hat ihr eigenes Vorgehen und ihre eigenen Regeln für das Scheduling

## Completely Fair Scheduler (Linux)
Im Gegensatz dazu gibt es beim Completely Fair Scheduler von Linux keine festen Prioritäten, sondern jedem Prozess wird eine gewisse, fair-verteilte Menge an CPU-Zeit zugewiesen, die proportional zu seinen Anforderungen sein soll

Dabei werden zwei Typen von Prozessen unterschieden:
- **interaktive Prozesse:** benötigen häufig CPU-Zeit, um schnell reagieren zu können
- **rechenintensive Prozesse:** benötigen weniger häufig, dafür aber mehr CPU-Zeit

---
# Dispatching
## Dispatcher
Der Scheduler trifft eine Entscheidung, die der Dispatcher dann umsetzt, indem er
1. den **Zustand des aktuellen Prozesses speichert** und dann
2. den **neuen Prozess verbereitet und startet**

> [!danger] Nachtragen: Scheduling-Kriterien
