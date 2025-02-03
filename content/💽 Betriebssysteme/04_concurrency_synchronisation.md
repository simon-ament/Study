---
title: Nebenläufigkeit und Synchronisation
---
# Begriffe
## Nebenläufigkeit
Nebenläufigkeit bezieht sich auf die **logische Gleichzeitigkeit** von Prozessen
- müssen nicht gleichzeitig laufen. sondern können auch abwechselnd ausgeführt werden
- mehrere Prozesse machen Fortschritte

## Parallelität
Parallelität ist die **physische Gleichzeitigkeit** von Prozessen
- parallele Ausführung auf verschiedenen Kernen
- **Data parallelism:** Daten werden aufgeteilt und dieselbe Operation auf verschiedenen Prozessoren / Kernen darauf ausgeführt
- **Task parallelism:** Threads mit unterschiedlichen Aufgaben werden auf verschiedenen Prozessoren / Kernen ausgeführt

![[Screenshot from 2025-02-01 11-47-28.png|500]]

## Amdahl's Law
Es sei $S$ der serielle Anteil eines Programms und $N$ die Anzahl der Prozessor-Kerne. Dann ist der erreichbare *speedup* beschränkt durch

$$speedup \le \frac{1}{S + \frac{(1 - S)}{N}}$$

- Für $N$ gegen unendlich geht der Speedup gegen $\frac{1}{S}$
- Der serielle Anteil $S$ hat damit einen entscheidenden Effekt auf den möglichen Speedup

## Multiprocessing
- **symmetrisch:** jeder Prozesse kann jede Aufgabe übernehmen
- **asymmetrisch:** jeder Prozesse erhält eine spezifische Aufgabe

---
# Synchronisation
## Race Condition
Zwei Prozesse versuchen auf dieselben Variablen / Daten zuzugreifen, wobei die korrekte Ausführung vom Scheduling der beiden Prozesse abhängt

## Critical Section Problem
Ein kritischer Abschnitt ist ein Abschnitt von Code eines Prozesses, der **geteilte Variablen, Dateien, usw. ändern** könnte
- es darf sich stets nur ein Prozess zur Zeit in seinem kritischen Abschnitt befinden
- Problem: Entwicklung eines Protokolls, das dies gewährleistet

Eine Lösung des Critical-Section-Problems muss die folgenden drei Kriterien erfüllen:
1. **Mutual exclusion:** Wenn ein Prozess sich in seiner Critical Section befindet, darf kein anderer Prozess dies ebenfalls tun
2. **Progress:** Wenn sich gerade kein Prozess in seiner Critical Section befindet, dann muss nach einer gewissen Zeit in neuer Prozess dafür ausgewählt werden (*cannot be postponed indefinitely*)
3. **Bounded waiting:** Wenn ein Prozess $P$ in seine Critical Section gehen möchte, muss es ein Limit dafür geben geben, wie oft andere Prozesse in ihre Critical Section übergehen dürfen, bevor $P$ es tut

> [!info] Kein festes Limit, stochastische Gewissheit genügt

### Lösungsansätze
- **Interrupts** während Critical Section **deaktivieren**: Kein Zeitlimit für Critical Section, nicht anwendbar auf 2 Kerne
- **Software-basiert:** `int turn`-Variable gibt an, wer als nächstes seinen kritischen Abschnitt betreten darf
	- Mutual exclusion ist erfüllt, aber Progress und Bounded waiting nicht, wenn der jeweils andere Prozess gar nicht in seinen kritischen Abschnitt eintreten möchte
- **Peterson's Solution:** `int turn`-Variable zusammen mit `boolean flag[2]`-Array, das angibt, ob ein Prozess bereit ist, seinen kritischen Abschnitt zu betreten
	- Hält alle drei Bedingungen ein (für 2 Threads)
	- scheitert auf modernen Architekturen allerdings am Umordnen von Instruktion
- **Bakery Algorithm:** Threads bekommen Ticket-Nummern in nicht-absteigender Reihenfolge zugeweisen, Thread mit der niedrigsten Ticket-Nummer oder bei Gleichheit Thread ID darf in kritischen Abschnitt eintreten

#### Memory Barries
Ansatz gegen *Instruction Reordering* bzw. fehlende Cache-Kohärenz
- **Memory Models:** Garantien, die ein Betriebssystem bezüglich des Speichers an Programme macht
	- **Strongly ordered:** Veränderung auf einem Prozessor ist sofort auf allen anderen sichtbar
	- **Weakly ordered:** Veränderung auf einem Prozessor kann erst verzögert auf anderen Prozessoren sichtbar werden
- **Memory Barrier:** Instruktion, die die Weitergabe aller Änderungen an die anderen Prozessoren erzwingt
	- z.B. `memory_barrier();`
	- alle *loads* und *stores* vor der Barriere werden **vor** allen nach der Barriere ausgeführt $\Rightarrow$ schützt auch gegen *Instruction Reordering*

#### Hardware Instructions
Garantieren *atomare* Ausführung von kurzen Speicher-Instruktionen
- **Test and Set:** `boolean test_and_set(boolean *target)` setzt einen Boolean auf wahr und gibt den ursprünglichen Wert zurück
	- Verwendung etwa um *lock* zu prüfen (`while`) und direkt zu setzen
	- löst Mutual Exclusion, aber nicht Bounded Waiting und verwendet Spinlocks
- **Compare and Swap:** `int compare_and_swap(int *value, int expected, int new_value)` setzt `value` genau dann auf `new_value`, wenn `*value == expected` und gibt den ursprünglichen Wert zurück
	- gleiche Verwendung und Probleme wie *Test and Set*, aber Bounded Waiting lässt sich lösen
- werden meist als Basis für komplexere Synchronisations-Tools verwendet

#### Atomic Variables
Eine atomare Variable stellt *atomare* Veränderungen von simplen Datentypen wie Integers und Booleans bereit
- z.B. atomare Variable `sequence` mit atomarem Zugriff `increment(sequence)`
- implementiert etwa mit `compare_and_swap()`

## Mutex
Für Programmierer leicht verwendbare Lösung des Critical Section Problems
- eine **Mutex** ist eine Boolean-Variable, die angibt ob ein *lock* verfügbar ist oder nicht
- *atomare* Instruktionen: `aqcuire()` und `release()`
- benötigt **busy waiting** und wird daher Spinlock genannt

### Spinlocks
Bei einem Spinlock **fragt ein Prozess eine Mutex wiederholt an**, bis diese verfügbar ist
- vermeidet Kontextwechsel
- jedoch wird in der Zeit nichts Sinnvolles ausgeführt (*busy waiting*)
- sinnvoll insbesondere auf **Multiprozessorsystemen**, auf denen keine hohe Wartezeit erwartet / erlaubt wird

## Semaphore
Eine Semaphore ist eine **Integer-Variable**, auf welche (außer zur Initialisierung) nur über folgende Funktionen zugegriffen werden kann:
- `wait()` / `P()`: Prozesse, die starten möchten, rufen `wait()` auf der Semaphore auf
	- Wert der Semaphore wird dekrementiert
- `signal()` / `V()`: Wenn ein Prozess Ressourcen wieder freigibt, ruft er `signal()` auf
	- Wert der Semaphore wird inkrementiert

Wenn die Semaphore auf $0$ fällt, sind alle Ressourcen belegt und Prozesse müssen warten, bis ein anderer fertig wird. Man unterscheidet
- **counting semaphore:** beliebig groß
- **binary semaphore:** $0 - 1$, äquivalent zu [[#Mutex|mutex]] locks

Semaphoren implementieren eine **waiting queue** und vermeiden so *busy waiting*
- Prozesse blockieren, wenn Ressource nicht verfügbar ist $\Rightarrow$ CPU-Zeit kann sinnvoll genutzt werden
- `block` legt einen Prozesse in die *waiting queue* und `wake` legt ihn wieder in die *ready queue*

## Monitor
Eine *high-level* Abstraktion, die einen effektiven Mechanismus zur Prozess-Synchronisierung zur Verfügung stellt
- Es kann stets nur ein Prozess innerhalb des Monitors aktiv sein
- Über **Condition Variables** kann auf das Eintreten von Events gewartet werden
	- z.B. `condition x` mit `x.wait()` und `x.signal()`, wobei letzteres eine wartenden Prozess startet (sofern einer vorhanden ist)
	- Erweiterung mit Prioritäten über `x.wait(p)` möglich
- Implementation vollständig mittels **Semaphoren** möglich

```c
monitor monitor-name
{
	// shared variable declarations
	procedure P1 (...) { ... }
	procedure P2 (...) { ... }
	procedure Pn (...) { ... }
	initialization code (...) { ... }
}
```

![[Screenshot from 2025-02-03 20-57-56.png|500]]

### Single Resource Allocation
Dient der Zuteilung einer Ressource unter konkurrierenden Prozesse, wobei jeweils eine maximale Nutzungsdauer der Ressource angegeben wird
- Interface z.B. `R.acquire(t)` und `R.release`
- Prozess mit der kürzesten Nutzungsdauer wird bevorzugt
- implementierbar mit **prioritäten-basiertem Monitor**

## Liveness
Bedingungen, die ein System erfüllen muss, um *progress* zu garantieren. Verstöße sind etwa:
- **Starvation:** Ein Prozess wird niemals aus der Semaphore-Warteschlange entfernt, in der er wartet
- **Priority Inversion:** Prozess mit niedriger Priorität hält *lock*, auf den Prozess mit höherer Priorität wartet
	- **Priority-inheritance protocol:** Priorität des Prozesses, der das *lock* hält, wird angehoben, um das *Inversion*-Problem zu lösen
- **Deadlocks**

### Deadlocks
Als Deadlock bezeichnet man eine Situation während der Ausführung mehrerer Threads, in der diese allesamt auf die Freigabe von *locks* (z.B. Mutex oder Semaphore) warten, wobei diese jeweils von den anderen Threads gehalten werden. 
- $\Rightarrow$ keiner der Threads wird seine gehaltenen *locks* freigeben, bevor dies nicht ein anderer Thread tut, sodass alle Threads endlos aufeinander warten

![[Screenshot from 2025-02-01 11-51-43.png|500]]

## Windows
- verwendet auf Uniprozessor-Systemen [[01_overview#Interrupts|Interrupt]] Masks (teilweise *disabled*)
- verwendet auf Multiprozessor-Systemen Spinlocks
- verwendet **Dispatcher-Objekte**, die sich etwa wie eine **Mutex** oder **Semaphore** verhalten können

### Dispatcher-Objekte
Dispatcher-Objekte stellen im Windows-Betriebssystem ein **allgemeines Tool zur Thread-Synchronisierung** zur Verfügung
- Unterstützung für Mutexes, Semaphoren, Events (ähnlich zu Condition Variablen), Timer, etc.
- Verwendung mittels `WaitForSingleObject()` bzw. `WaitForMultipleObjects`

> [!info] Kurz: Alles, worauf man warten kann

Ein Dispatcher-Objekt kann sich in **zwei Zuständen** befinden:
- *signalised:* Objekt steht derzeit zur Verfügung und kann von einem anfragenden Prozess *aqcuired* werden
- *non-signalised:* Thread blockiert bei dem Versuch, dieses Objekt zu erlangen. Wird zu einer Warteschlange hinzugefügt (FiFo)

### Bedeutungen von *signalised*
- **Prozess:** ist beendet
- **Datei:** I/O-Vorgang (z.B. lesen oder schreiben) abgeschlossen
- **Event:** ist eingetreten
- **Timer:** gewisse Zeit verstrichen
- **Mutex / Semaphore:** ist verfügbar
- und weitere

## Linux
- deaktiviert [[01_overview#Interrupts|Interrupts]] auf Uniprozessor-Systemen
- verwendet auf Multiprozessor-Systemen Spinlocks
- nutzt **Semaphoren**, **[[#Atomic Variables|Atomic Integers]]** und **[[#Readers-Writers|Reader-writer locks]]**, wenn länger Code-Abschnitte Datenzugriff benötigen
	- Typ `atomic_t` mit Operationen `atomic_set(&i, 5)`, `atomic_add(5, &i)`, `atomic_sub(5, &i)`, `atomic_inc(&i)` und `value = atomic_read(&i)`
- implementiert POSIX-Synchronisations-Primitive (darunter auch Condition Variablen)

## Alternative Ansätze
- **Transactional Memory:** Speicher Transaktion `atomic { /* modify shared data */ }` wird *atomar* ausgeführt
- **OpenMP:** Code innerhalb von `#pragma omp critical { ... }` wird als kritischer Abschnitt behandelt und *atomar* ausgeführt
- **Functional Programming Languages:** verbieten Zustand, indem Variablen *immutable* (unveränderlich) sind. Die beschriebenen Synchronisations-Probleme entstehen daher gar nicht erst

---
# Klassische Probleme
## Bounded Buffer
- $n$ Buffers, jeder kann ein Item halten
- Semaphore `mutex`, die auf $1$ initialisiert ist
- Semaphore `full`, die auf $0$ initialisiert ist
- Semaphore `empty`, die auf $n$ initialisiert ist

```c title="producer"
while (true) {
	/* produce an item in next_produced */
	wait(empty);
	wait(mutex);
	/* add next produced to the buffer */
	signal(mutex);
	signal(full);
}
```

```c title="consumer"
while (true) {
	wait(full);
	wait(mutex);
	/* remove an item from buffer to next_consumed */
	signal(mutex);
	signal(empty);
	/* consume the item in next consumed */
}
```

## Readers-Writers
- Ein Datensatz wird unter nebenläufigen Prozessen geteilt, die sich wie folgt unterteilen:
	- **Readers:** Lesen den Datensatz nur, verändern ihn also nicht
	- **Writers:** Können sowohl lesen als auch schreiben
- Problem: Mehreren Prozesse sollen zugleich lesen dürfen, doch ein schreibender Prozess muss alleinigen Zugriff haben
- Lösung über `rw_mutex`-Semaphore ($1$), die von schreibendem Prozess bzw. erstem lesendem Prozess übernommen wird
	- darüber hinaus `mutex`-Semaphore ($1$) für Critical Sections und `int read_count` ($0$), worüber die Anzahl der lesenden Zugriffe dokumentiert wird
- Bei validen Lösungen kann es passieren, dass ein *Writer* niemals Zugriff erhält $\Rightarrow$ **Second reader-writer problem**, bei dem sobald der *Writer* bereit ist, kein neuer *Reader* Zugriff erhalten darf
	- bei beiden Problemen kann es bei validen Lösungen zu Starvation kommen, einige Betriebssysteme lösen das Problem mit **Reader-writer locks**

## Dining Philosophers
- $n$ Philosophen sitzen an einem runden Tisch mit einer Schüssel Reis in der Mitte
	- manchmal denken Philosophen nach, manchmal essen sie, dabei interagieren sie aber nie mit ihren Nachbarn
	- wenn sie essen wollen, müssen sie das Stäbchen rechts und links von ihnen **nacheinander** aufnehmen
- Modellierung: Datensatz (Reis-Schüssel) und Semaphoren `chopstick[5]`, jeweils auf $1$ initialisiert
- in naivem Algorithmus sind Deadlocks möglich, mit [[#Monitor|Monitoren]] lässt sich das verhindern, aber Starvation ist weiterhin möglich
	- Monitor verwendet komplexere `pickup(int i)` und `putdown(int i)` Methoden, die jeweils einen `test(int i)` ausführen und andernfalls auf ein `signal()` warten