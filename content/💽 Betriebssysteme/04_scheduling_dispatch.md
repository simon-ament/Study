---
title: Scheduling und Dispatching
---
# Scheduling
## Scheduler
Der Scheduler bestimmt, welcher Prozess als Nächstes die CPU nutzen darf. Hier unterscheidet man zwischen verschiedenen Arten von Schedulern. Der Langzeitscheduler entscheidet, welche Prozesse in den Arbeitsspeicher geladen werden dürfen. Der Kurzzeitscheduler wählt, welche Prozesse direkt auf der CPU ausgeführt werden können und der Mittelscheduler verlegt Prozesse zwischen Hauptspeicher und Sekundärspeicher.

## Varianten
Der Unterschied liegt hauptsächlich im Freigeben der CPU für einen neuen Prozess.
### Kooperativ
Beim kooperativen Scheduling gibt ein Prozess, sollte er fertig sein oder auf etwas warten, die CPU freiwillig für andere Prozesse frei. Das führt allerdings auch dazu, dass ein Prozess das System blockieren kann, sollte er die CPU nicht freigeben.
### Präemptiv
Beim präemptiven Scheduling kann das Betriebsystem einem Prozess die CPU zwangsweise entzieht, z.B. wenn eine gewisse Zeit abgelaufen ist. Das sorgt dafür, dass die CPU Zeit fairer auf verschiedene Prozesse aufgeteilt werden kann. Damit ist das präemptive Scheduling stabiler als das kooperative Scheduling, ist allerdings auch komplizierter und aufwändiger.
#### Quantum
Ein Quantum ist eine kleine Zeiteinheit von typischerweise $10$ bis $100$ Millisekunden. Der CPU-Scheduler gibt einem Prozess für bis zu ein Quantum Zeit auf der CPU. Wenn es $n$ Prozesse gibt und das Quantum ist $q$, dann wartet jeder Prozess maximal $(n−1) \cdot q$ Zeiteinheiten, bis er das nächste Mal ein Quantum zugewiesen bekommt (gilt nur für Scheduling ohne Prioritäten, also Round-Robin). Bei einem sehr großen Quantum ist das Scheduling ähnlich zu einem First-Come-First-Serve-System, da alle Prozesse nur ein Quantum benötigen. Ist das Quantum hingegen sehr klein, so entstehen extrem viele Kontextwechsel, welche zeitaufwendig sind. Eine typische Wahl der Quantumlänge ist so, dass ca. $80\%$ der Prozesse in einem Quantum fertig werden.

## Echtzeit-Scheduling
Bei Echtzeit(-Scheduling) geht es darum, dass Aufgaben innerhalb eines festen Zeitraums erledigt werden müssen. Bei harter Echtzeit ist es von elementarer Bedeutung, dass die Deadlines eingehalten werden und ein Überschreiten darf nicht passieren. Ein Beispiel ist die Sensorik in selbstfahrenden Autos. Hier könnte jede Verzögerung Menschenleben kosten. Bei weicher Echtzeit, sollten die Deadines zwar eingehalten werden, allerdings ist ein geringes Überschreiten dieser nicht problematisch. Ein Beispiel wären zum Beispiel Computerspiele. Eine Verzögerung könnte das Spielerlebnis leicht verschlechtern, wäre allerdings nicht sehr schlimm.
### Anforderungen an Scheduling-Verfahren
Ein echtzeitfähiges Scheduling-Verfahren muss sicherstellen, dass Prozesse innerhalb ihrer festgelegten Zeit ausgeführt werden. Dazu sollte es in der Lage sein, genau zu bestimmen, wann genau ein Prozess startet, um dessen Deadline einhalten zu können. Es sollte außerdem wichtige Prozesse, die ggf. kürzere Deadlines haben, bevorzugen, damit diese nicht hinter Prozessen, die eigentlich noch viel Zeit haben ausgeführt werden. Es sollte auch sicherstellen, dass alle Prozesse ihre Deadline auch einhalten können. Ein periodischer Prozess muss in regelmäßigen Abständen immer wieder ausgeführt werden. Der Scheduler muss also sicherstellen, das diese Prozesse innerhalb ihrer festgelegten Intervall ausgeführt und abgeschlossen werden.

- $\Rightarrow$ muss insbesondere auch präemptiv sein

## Scheduling-Algorithmen
> [!danger] Nachtragen (Blatt 3 Aufgabe 6 + 7)
### FiFo

#### Beispiel

### Prioritätsloser Round-Robin

#### Beispiel

### Prioritätenbasierter Round-Robin

#### Beispiel

## Starvation
Moderne Betriebssysteme verwenden verschiedene Fairness-Algorithmen, um auch Threads mit niedriger Priorität regelmäßig CPU-Zeit zuzuweisen. Zentraler Bestandteil solcher Fairness-Algorithmen ist häufig das Tracken der Wartezeiten der zur Ausführung bereiten Threads und das dynamische Anpassen der Thread-Prioritäten, um häufig ausgeführte Threads in den Queues herabzustufen und selten ausgeführte Threads durch Prioritätserhöhungen vor dem Verhungern zu bewahren. Diese zuletzt genannte Prioritätserhöhung für lange wartende Threads niedriger Priorität wird auch Aging genannt, wobei ein lange wartender Thread in dem Sinne ”altert”, als dass seine Priorität sich regelmäßig soweit über seine Basis-Priorität hinaus erhöht, bis dieser schließlich nach langer Wartezeit ausgeführt wird.

> [!caution] Boosting und Aging unterscheiden, Code-Beispiel einbauen

## Multilevel-Queue Scheduler
Ein Multilevel-Queue Scheduler teilt Prozesse in verschiedene Priority-Queues auf, abhängig von Priorität und Aufgabe. Jede Priority-Queue hat ihr eigenes Vorgehen und ihre eigenen Regeln für das Scheduling. Im Gegensatz dazu gibt es beim Completly Fair Scheduler von Linux keine festen Prioritäten, sondern jedem Prozess wird eine gewisse, fair-verteilte Menge an CPU-Zeit zugewiesen. Die beiden Haupttypen an Prozessen sind hierbei interaktive Prozesse, die häufiger CPU-Zeit bekommen um besonders schnell reagieren zu können und rechenintensive Prozesse, die weniger häufig CPU-Zeit bekommen, dafür allerdings dann mehr. Der Completly Fair Scheduler sorgt dafür, dass alle Prozesse proportional zu ihren Anforderungen CPU-Zeit erhalten, ohne feste Prioritäten, und versucht, die CPU fair unter allen Prozessen aufzuteilen.

---
# Dispatching
## Dispatcher
Der Scheduler trifft eine Entscheidung, die der Dispatcher dann umsetzt, indem er zunächst den Zustand der aktuellen Prozesses speichert und dann den neuen Prozess verbereitet und startet.