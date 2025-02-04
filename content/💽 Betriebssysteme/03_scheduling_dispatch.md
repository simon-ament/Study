---
title: Scheduling und Dispatching
---
# Scheduling
Hat die Maximierung der CPU-Ausnutzung zu Ziel
- **CPU-Burst:** Prozess führt Instruktionen direkt auf der CPU aus
	- häufig kurze Bursts, selten lange
- **I/O-Bursts:** Prozess wartet auf I/O-Event

CPU-Scheduling kann nur stattfinden, wenn ein Prozess:
1. von *running* zu *waiting* wechselt
2. von *running* zu *ready* wechselt (nur *preemptive*)
3. von *waiting* zu *ready* wechselt (nur *preemptive*)
4. terminiert
## Scheduler
Der Scheduler bestimmt, welcher Prozess als nächstes die CPU nutzen darf. Man unterscheidet zwei Formen:
- **Long-Term-Scheduler** entscheidet, welche Prozesse in den Arbeitsspeicher geladen werden dürfen
- **Short-Term-Scheduler** entscheidet, welche Prozesse direkt auf der CPU ausgeführt werden können

Er verwaltet dazu 2 Queues:
- **Ready Queue:** Prozesse, die im Hauptspeicher liegen und auf Ausführung warten
- **Waiting Queue:** Prozesse, die auf ein Event (z.B. I/O) warten

![[Screenshot from 2025-02-02 15-56-11.png|500]]

### Kooperativ
Beim kooperativen Scheduling gibt ein Prozess, sollte er fertig sein oder auf etwas warten, die **CPU freiwillig für andere Prozesse frei**
- $\Rightarrow$ einzelner Prozess kann System blockieren
### Präemptiv
Beim präemptiven Scheduling kann das Betriebsystem einem Prozess die CPU zwangsweise entziehen
- $\Rightarrow$ faire Aufteilung der CPU-Zeit möglich
- stabiler, aber aufwändiger zu implementieren

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

---
# Scheduling-Algorithmen
## Kriterien für Scheduling-Algorithmen
- **CPU-Ausnutzung** maximieren
- **Throughput / Durchsatz:** Anzahl der Prozesse, die in einer Zeiteinheit fertig werden
- **Turnaround time:** Zeit, die es braucht, einen spezifischen Prozess auszuführen
- **Waiting time:** Zeit, die ein Prozess in der *ready queue* verbringt
- **Response time:** Zeit, die vergeht, bis ein Prozess das erste Mal ausgeführt wird

## Beispiel

| Thread ID | Startzeit | Ausführungszeit | Priorität |
| --------- | --------- | --------------- | --------- |
| 1         | 0         | 8               | 9         |
| 2         | 2         | 6               | 11        |
| 3         | 2         | 6               | 10        |
| 4         | 4         | 10              | 11        |

- Quantum-Länge = 3

## First-Come, First-Served / FiFo

| Thread ID | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  | 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1         | R   | R   | R   | R   | R   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| 2         |     |     | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| 3         |     |     | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |
| 4         |     |     |     |     | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   | R   | R   | R   | R   |

- **Convoy effect:** Kurze Prozesse (*I/O-bound*) können lange hinter langen Prozessen (*CPU-bound*) hängen

## Round-Robin
- Jeder Prozess erhält ein Zeitquantum $q$, nachdem er unterbrochen wird, sofern er nicht bereits terminiert ist
- **Durchsatz geringer** als bei FCFS, wenn der *overhead* für [[#Kontext-Wechsel]] hinzugerechnet wird

### Quantum
Ein Quantum ist eine **kleine Zeiteinheit** von typischerweise $10$ bis $100$ Millisekunden.
- Schranke für die zusammenhängende CPU-Zeit eines Prozesses
- bei prioritätenlosem Scheduling (Round-Robin): $n$ Prozesse und Quantum $q$ $\Rightarrow$ jeder Prozess wartet maximal $(n−1) \cdot q$ Zeiteinheiten, bis er das nächste Mal ein Quantum zugewiesen bekommt
- großes Quantum $\to$ FiFo
- kleines Quantum $\to$ viele Kontextwechsel (Zeitverlust)
- Quantum wird meist so gewählt, dass ca. $80\%$ der Prozesse in einem Quantum fertig werden

### Prioritätsloser RR

| Thread ID | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  | 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1         | R   | R   | R   | -   | -   | -   | -   | -   | -   | R   | R   | R   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   |     |     |     |     |     |     |     |
| 2         |     |     | -   | R   | R   | R   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |     |     |
| 3         |     |     | -   | -   | -   | -   | R   | R   | R   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   |     |     |     |     |     |     |     |     |     |
| 4         |     |     |     |     | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   | R   |

### Prioritätenbasierter RR
- Beim **Priority Scheduling** werden Prozesse mit höherer Priorität zuerst ausgeführt
	- bei gleichen Prioritäten wird Round Robin angewandt
- kann allerdings zu [[#Starvation Avoidance|Starvation]] führen

| Thread ID | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  | 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1         | R   | R   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   |
| 2         |     |     | R   | R   | R   | -   | -   | -   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| 3         |     |     | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | R   | R   | R   | R   | R   | R   |     |     |     |     |     |     |
| 4         |     |     |     |     | -   | R   | R   | R   | -   | -   | -   | R   | R   | R   | R   | R   | R   | R   |     |     |     |     |     |     |     |     |     |     |     |     |

## Shortest Job First
- SJF ist optimal in Bezug auf durchschnittliche Wartezeit (Gegenteil vom *Convoy effect*)
- präemptive Variante heißt **Shortest Remaining Time First**
- SJF ist eine Variante von [[#Prioritätenbasierter RR|prioritätenbasiertem Scheduling]], wobei die Priorität invers zur nächsten CPU-Burst-Dauer ist
- Länge des nächsten CPU-Burst muss jeweils geschätzt werden:
	- Es sei $t_n$ die tatsächliche Länge des $n$-ten CPU-Bursts, $\tau_n$ die geschätzte Länge des $n$-ten CPU-Bursts und $0 \leq \alpha \leq 1$ (oft $\frac12$). Dann schätzen wir mittels: $$\tau_{n+1} = \alpha t_n + (1 - \alpha) \tau_n$$

## Starvation Avoidance
Moderne Betriebssysteme verwenden verschiedene Fairness-Algorithmen, um auch Threads mit niedriger Priorität regelmäßig CPU-Zeit zuzuweisen. Zentraler Bestandteil solcher Fairness-Algorithmen sind häufig:
- Tracken der Wartezeiten der zur Ausführung bereiten Threads
- dynamische Anpassen der Thread-Prioritäten
	- häufig ausgeführte Threads: Priorität wird verringert
	- selten ausgeführte Threads: Priorität wird erhöht, um Starvation zu vermeiden (**Aging**)
	- **Boosting:** Belohnung für langes Warten, z.B. auf I/O-Event

> [!caution] Boosting und Aging unterscheiden, Code-Beispiel einbauen

## Multilevel-Queue Scheduler
Ein Multilevel-Queue Scheduler teilt Prozesse in **verschiedene Priority-Queues** auf, abhängig von Priorität und Aufgabe
- Jede Priority-Queue hat ihr eigenes Vorgehen und ihre eigenen Regeln für das Scheduling
- Auch die Auswahl der zu bearbeitenden Queue kann mittels Scheduling-Verfahren definiert werden
- **Multilevel-Feedback-Queue:** ein Prozesse kann zwischen den verschiedene Queues wechseln, z.B. hilfreich für die Implementierung von [[#Starvation Avoidance|Aging]]

## Completely Fair Scheduler (Linux)
Im Gegensatz dazu gibt es beim Completely Fair Scheduler von Linux keine festen Prioritäten, sondern jedem Prozess wird eine gewisse, fair-verteilte Menge an CPU-Zeit zugewiesen, die proportional zu seinen Anforderungen sein soll

Dabei werden zwei Typen von Prozessen unterschieden:
- **interaktive Prozesse:** benötigen häufig CPU-Zeit, um schnell reagieren zu können
- **rechenintensive Prozesse:** benötigen weniger häufig, dafür aber mehr CPU-Zeit

---
# Dispatcher
## Kontext-Wechsel
CPU schaltet von einem Prozess auf einen anderen um:
1. Kontext (gesamter, aktueller Zustand) des aktuellen Prozess im [[#Process Control Block (PCB)|PCB]] speichern
2. Kontext des neuen Prozesses laden, welcher vom Scheduler ausgewählt wurde
3. Fortsetzung der Programmausführung im **User-Mode** am aktuellen Programm-Counter

**Dispatch-Latency:** Zeit zwischen dem Stoppen des einen uns Starten des anderen Prozesses

Im Unterschied dazu ist werden bei einem Kontextwechsel vom User- in den Kernelmodus nicht alle Register der CPU gespeichert, da der Thread nicht gewechselt wird. Daher ist auch kein Scheduler nötig um diesen Wechsel zu vollziehen. Insgesamt ist dieser Wechsel schneller als ein Kontextwechsel zwischen zwei Threads.

> [!caution] Letzten Absatz prüfen
