---
title: Nebenläufigkeit
---
# Begriffe
## Nebenläufigkeit
Nebenläufigkeit bezieht sich auf die logische Gleichzeitigkeit von Prozessen. Sie müssen allerdings nicht gleichzeitig laufen sondern können auch bspw. abwechselnd ausgeführt werden.

## Parallelität
Parallelität ist die physische Gleichzeitigkeit von Prozessen. Es werden also parallel zum Beispiel auf verschiedenen Kernen auf unterschiedlichen Speicherbereichen Prozesse ausgeführt.

> [!caution] Graphik hinzufügen

---
# Synchronisation
## Critical Section Problem
Ein kritischer Abschnitt ist ein Abschnitt von Code eines Prozesses, der Variablen, Dateien, usw. ändern könnte. Es ist von elementarer Bedeutung, das sich zwei gleichzeitig ausgeführte Prozesse in diesem Abschnitt nicht in die Quere kommen, da dies zu falschen geschriebenen Werten führen könnte. Bei der Behebung dieses Problems gibt es drei wichtige Kriterien, die eingehalten werden sollten: 
1. **Mutual exclusion:** Wenn ein Prozess gerade in seiner Critical Section ist, darf kein anderer Prozess dies ebenfalls sein. 
2. **Progress:** Nur dann, wenn gerade keiner der Prozesse in seiner Critical Section ist, darf - in endlicher Zeit - entschieden werden welcher der wartenden Prozesse in seine Critical Section übergehen darf. 
3. **Bounded waiting:** Wenn ein Prozess $P$ in seine Critical Section gehen möchte, muss es ein Limit für andere Prozesse geben, wie oft diese in ihre Critical Section übergehen dürfen, bevor P es tut.

> [!caution] Bezieht sich vor allem auf geteilte Variablen, kein festes Limit (stochastische Gewissheit genügt)
### Beispiel
> [!caution] Hinzufügen (Blatt 4 Aufgabe 2)

## Mutex
> [!danger] Fehlt

## Semaphore
Eine Semaphore ist eine Integer-Variable, auf welche (außer zur Initialisierung) nur durch die Funktionen `wait()` (auch `p()`) und `signal()` (auch `v()`) zugegriffen werden kann. Prozesse, die starten möchten, rufen wait auf der Semaphore auf. Wenn ein Prozess Ressourcen wieder freigibt, ruft `signal()` auf. Wenn die Semaphore auf 0 fällt, sind alle Ressourcen belegt und Prozesse müssen warten, bis ein anderer fertig wird. Man unterscheidet zwischen counting semaphore (beliebig groß) und binary semaphore ($0 - 1$, äquivalent zu [[#Mutex|mutex]] locks). 

Semaphoren können einen Prozess blocken, wenn keine Ressource verfügbar ist und so busy waiting vermeiden. Die gesparte CPU-Zeit kann von einem anderen Prozess sinnvoller genutzt werden.

Ein Vorteil von Spinlocks ist das Vermeiden von Kontextwechseln, um Zeit zu sparen. Wenn man davon ausgehen kann, dass locks wenig Zeit in Anspruch nehmen, sind Spinlocks sinnvoll. Auf Multiprozessorsystemen kann ein wartender Thread auf einem Kern warten, während ein anderer Prozess auf einem anderen Kern seine critical section ausführt und anschließend sofort weiterarbeiten.
### Beispiel
> [!caution] Hinzufügen (Blatt 4 Aufgabe 5)

## Monitor
> [!caution] Relevant? Ggf. nur Condition Variablen

## Deadlocks
Als Deadlock bezeichnet man eine Situation während der Ausführung mehrerer Threads, in der diese allesamt auf die Freigabe von locks, die etwa durch Mutexes oder Semaphoren implementiert sind, warten, wobei diese jeweils von den anderen Threads gehalten werden. In der Folge wird keiner der Threads seine gehaltenen locks freigeben, bevor dies nicht ein anderer Thread tut, sodass alle Threads endlos aufeinander warten.

Ein Deadlock kann bei der Ausführung zweier Threads zum Beispiel entstehen, wenn ein Thread $A$ eine Semaphore $1$ anfragt und dadurch auf $0$ (nicht mehr verfügbar) setzt, dann jedoch in seiner Ausführung unterbrochen wird, bevor er eine Semaphore $2$ anfragt. Nun wird ein Thread $B$ ausgeführt und fragt ebendiese Semaphore $2$ an, worauf diese im Anschluss ebenfalls nicht mehr verfügbar ist. Nun versucht Thread $B$ auch die Semaphore 1 anzufragen und blockiert daraufhin. Wenn nun Thread $A$ wieder ausgeführt wird, so blockiert er ebenfalls nachdem er die Semaphore $2$ anfragt und die Threads befinden sich nun in einem Deadlock.

## Windows
### Dispatcher-Objekte
Dispatcher Objekte stellen im Windows-Betriebssystem ein allgemeines Tool zur Thread-Synchronisierung zur Verfügung, mithilfe dessen verschiedene Synchronisations-Mechanismen wie Mutexes, Semaphoren, Events (ähnlich zu Condition Variablen) oder Timer verwendet werden können. Ein solches Dispatcher Objekt kann *signalised* sein, was bedeutet, dass dieses Objekt derzeit zur Verfügung steht und von einem anfragenden Prozess *aqcuired* werden kann. Wenn ein Dispatcher Objekt hingegen *non-signalised* ist, so blockiert ein Thread bei dem Versuch dieses Objekt zu erlangen. Er wird dann in einen wartenden Zustand versetzt und wartet in einer Warteschleife darauf, dass das angefragte Objekt wieder *signalised* wird. Dabei können die vor ihm in der Warteschlange befindlichen Threads das Objekt jedoch im signalisierten Zustand vor ihm erlangen und so ihre Ausführung früher wieder beginnen. 

Ein solcher Zustandsübergang kann entsprechend der oben beschriebenen Synchronisationsmachenismen etwa eintreten, wenn andere Threads das Objekt freigeben, wenn eine anderweitige vom Dispatcher Objekt überwachte Bedingung eintritt oder schlicht wenn eine gewisse Menge an Zeit verstrichen ist

> [!caution] Kurz: Alles, worauf man warten kann
