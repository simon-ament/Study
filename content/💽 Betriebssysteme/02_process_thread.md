---
title: Prozesse und Threads
---
# Programme
Ein Programm ist eine Datei, die Code enthält und eine bestimmte Funktion umsetzt
- Code: Befehle in einer Programmiersprache oder Maschinencode
- liegt auf dem Datenträger und verbraucht erst Ressourcen, wenn Ausführung gestartet wird

## Prozess
Prozesse sind ein **Programme in Ausführung**
- werden durch das Betriebssystem verwaltet
- sind gegeneinander isoliert (z.B. eigener Speicherabschnitt)
- können Kindprozesse erstellen
	- Ressourcen des Elternprozesses können ganz, teilweise oder gar nicht übernommen werden
	- Kind- und Elternprozess können [[04_concurrency_synchronisation|nebenläufig]] oder in dieser Reihenfolge nacheinander ausgeführt werden
- identifizierbar über einen *process-identifier (pid)*

### Bestandteile
- Programm-Code (*text section*) und -Zähler (*program counter*)
- Globale Variablen (*data section*)
- Stack für temporäre Daten (Parameter, Rücksprungadressen, lokale Variablen)
- dynamisch allozierter Speicher (*heap*)

![[Screenshot from 2025-02-02 15-42-13.png|500]]

### Zustände

![[Screenshot from 2025-02-01 12-33-14.png|500]]

## Thread
Ein Thread ist die **kleinste Ausführungseinheit** innerhalb eines Prozesses
- mindestens ein Thread je Prozess
- ermöglichen die **parallele Ausführung** von Aufgaben das **Teilen von Ressourcen**
	- Leistungssteigerung insbesondere bei Mehrkern-Prozessoren
	- Erstellung und Wechsel von Threads ist weniger aufwendig als bei Prozessen
	- Geteilte Ressourcen innerhalb des Prozesses einfacher zu verwalten als [[#Shared Memory]] oder [[#Message Passing]]

![[Screenshot from 2025-02-03 10-11-40.png|500]]

---
# Prozess-Erstellung
## Windows
Unter Windows wird mit `CreateProcess()` ein neuer Prozess erstellt und ein Programm in diesem Prozess geladen:
- erhält eigene *pid* und eigenen virtuellen Adressraum
- kann bestimmte Handles (z. B. Dateien, Sockets) erben, sofern der Elternprozess diese explizit weitergibt
- erhält Kopie der Umgebungsvariablen des Elternprozesses

## Linux
Unter Linux wird mit `fork()` ein Prozess erstellt, der eine Kopie des Elternprozesses ist
- Zuweisung eigener Pages wird verzögert (*Copy-on-write*)
- erbt offene Dateihandles des Elternprozessen

Mit `exec()` kann daraufhin auch ein eigenes Programm in dem Kind-Prozesses geladen werden
- erhält eigenen Adressraum (inkl. Programm, Stack und Heap)
- lediglich Dateihandles (außer solche, die mit der `FD_CLOEXEC`-flag markiert sind) bleiben erhalten

Mit `wait()` kann der Elternprozess darauf warten, dass der Kindprozess terminiert
- gibt Status und *pid* des terminierten Prozess zurück: `pid = wait(&status)`
- Kindprozess terminiert und übergibt Status-Information via `exit()`
- Kindprozesse kann mittels `abort()` vorzeitig beendet werden
	- einige Betriebssystem erlauben keine laufenden Kindprozesse, wenn der Elternprozess beendet wird
- **Zombie:** Kindprozess, der beendet wurde, aber dessen Elternprozess nicht wartet (nicht `wait()` aufgerufen hat)
- **Orphan:** Kindprozess, dessen Elternprozess ohne Aufruf von `wait()` beendet wurde
	- wird vom **init**-Prozess adoptiert, der mittels `wait()` wartet

![[Screenshot from 2025-02-02 16-08-30.png|500]]

### `exec`-Varianten
Der Command `exec` dient zur Ausführung eines Programms.
- `execv` übergibt zusätzlich ein Array an Argumenten, welches mit einem NULL-Pointer terminiert
- `execvp` ermöglicht die Ausführung eines Programms, das nicht mit einem absoluten Pfad angegeben wird. Die angegebene Datei wird dann selbstständig gesucht
- `execvpe` hat zusätzlich ein Array mit Umgebungsvariablen als Eingabe. Damit kann die Standardumgebung überschrieben werden

---
# Prozessverwaltung
## Process Control Block (PCB)
Verwaltungsinformation, die für jeden Prozess gespeichert wird
- Prozess-Zustand
- Program-Counter
- CPU-Register
- CPU-Scheduling-Information: Priorität, Queue-Pointer
- Speicherverwaltungsinformation
- I/O-Statusinformationen: verwendete Geräte, offene Dateien
- Buchhaltung: CPU-time, Wall-clock-time, Zeitlimits

---
# Interprozesskommunikation (IPC)
Methoden zur Interprozesskommunikation (IPC) ermöglichen **Kommunikation und Datenaustausch** zwischen Prozessen
- unkontrollierte Zugriffe auf andere Prozesse werden verhindert
- Ziele: Information Sharing, Modularität, Berechnungsbeschleunigung

![[Screenshot from 2025-02-02 17-41-29.png|500]]
## Shared Memory
**Gemeinsamer Speicherbereich** ermöglicht schnellen Austausch von Daten ohne Kopier-Operationen
- keine Kontrolle durch das Betriebssystem
- sorgfältige [[04_concurrency_synchronisation|Synchronisation]] der Prozesse nötig
- **Use case:** hohe Geschwindigkeit benötigt + enge Kopplung der Prozesse

## Message Passing
**Nachrichten-Austausch** findet ohne direkte Speicherzugriffe statt, sondern wird durch das Betriebssystem verwaltet
- sicher und einfach zu verwenden | Kontrolle durch das Betriebssystem
- es stehen zwei Operationen zur Verfügung: `send(message)` und `receive(message)`
- **Use case:** flexible Lösung, insbesondere in komplexen oder verteilten Systemen, benötigt

Man unterscheidet:
- **direkte Kommunikation:** es kommuniziert stets genau ein Paar aus Prozessen
	- z.B. über `send(P, message)` und `receive(Q, message)`
	- meist bi-direktional, kann aber auch uni-direktional sein
	- es existiert nur ein *link* zwischen je zwei Prozessen
- **indirekte Kommunikation:** die Kommunikation findet über *mailboxes / ports* statt
	- z.B. über `send(A, message)` und `receive(A, message)`
	- jede Mailbox hat eine einzigartige ID, die allen beteiligten Prozessen bekannt sein muss
	- Kommunikation kann sowohl uni- als auch bi-direktional stattfinden
	- *links* können zu mehreren Prozessen gehören und zwischen denselben Prozessen können mehrere *links* bestehen

### Synchronisierung
**Blocking / synchronous:**
- **blocking send:** Der Sender blockiert, bis die Nachricht empfangen wurde
	- Ist der Buffer voll, so muss der Sender stets warten
- **blocking receive:** Der Empfänger blockiert, bis eine Nachricht verfügbar ist

**Non-blocking / asynchronous:**
- **non-blocking send:** Der Sender sendet die Nachricht und setzt seine Ausführung fort
- **non-blocking receive:** Der Empfänger erhält eine valide Nachricht oder eine Null-Nachricht

Wenn sowohl das Senden als auch das Empfangen *blocking* sind, so spricht man von einem **rendezvous**
- hat der Buffer keine Kapazität (nicht vorhanden), so muss stets ein **rendezvous** eintreten

## Implementierungen
- **UNIX:** Shared memory über `shm_open`, `ftruncate` und `mmap`
- **Mach:** Message Passing über `mach_port_allocate()` und `mach_msg()`
- **Windows:** advanced local procedure calls (LPC)
	- funktioniert nur für Prozesse auf demselben System

## Pipes
Uni- oder bi-direktionale **Kommunikationskanäle zwischen Prozessen**
- **unbenannte Pipes:** Verwendung nur bei verwandten Prozessen (Handle wird vererbt)
- **benannte Pipes:** Verwendung zwischen beliebigen Prozessen
- jedes Ende der Pipe wird jeweils durch einen File-Deskriptor beschrieben

![[Screenshot from 2025-02-02 18-11-18.png|500]]

## Sockets
Sockets ermöglichen zusätzlich die **Kommunikation über ein Netzwerk**
- Kennzeichnung mit IP-Adresse und Port
- können (anders als Pipes) von laufenden Programmen erstellt werden
- können gleichzeitig mit mehreren anderen Sockets verbunden sein 
- komplexer zu implementieren, aber auch vielseitiger als Pipes

![[Screenshot from 2025-02-02 18-12-11.png|500]]

## Remote Procedure Calls
Remote Procedure Calls ermöglichen den Aufruf von Unterprogrammen über eine Netzwerkverbindung
1. client-seitig wird ein **stub** (Funktionsrumpf) als Proxy aufgerufen
2. die Funktionsargumente werden in der **External Data Representation (XDL)** codiert und übertragen
	- Architektur-spezifische Unterschiede wie Endianess werden umgangen
	- erneut werden *ports* verwendet
	- Betriebssystem stellt oft einen **rendezvous / matchmaker**-Service zur Verfügung
3. Unterprogramm wird extern aufgerufen

![[Screenshot from 2025-02-02 18-21-11.png|500]]

## Signals
Primitive Form der Interprozesskommunikation, weisen meist auf das Eintreten eines Events hin
- eintreffende Signals werden von einem **signal handler** behandelt
	- jedes Signal hat einen **default handler**, der Nutzer kann jedoch einen eigenen *handler* definieren
	- Zuordnung bei Prozess mit einem Thread trivial, bei mehreren Threads gibt es verschiedene Optionen: betroffener Thread, alle Threads, signal-spezifischer Threads, Thread für alle Signale, etc.

---
# Threads
**Bibliotheken:**
- POSIX Pthreads
- Windows Threads
- Java Threads

## User / Kernel Mapping (Multithreading Model)
- **Many-to-one:** Mehrere *user-level* Threads gehören zu einem Kernel-Threads
	- $\Rightarrow$ keine parallele Ausführung möglich, da stets nur ein Threads im Kernel sein kann
- **One-to-one:** Jeder *user-level* Thread gehört zu genau einem Kernel-Thread
	- $\Rightarrow$ bei jeder Thread-Erstellung wird auch ein Kernel-Thread erstellt (*overhead*)
	- wird von Windows und Linux genutzt
- **Many-to-many:** Jeder *user-level* Thread kann einem beliebigen Kernel-Thread zugeordnet werden
	- $\Rightarrow$ Betriebssystem muss genügend Kernel-Threads zur Verfügung stellen
	- **Two-Level Model:** Ähnlich zu *many-to-many*, allerdings kann ein *user-level* Thread fest an einen Kernel-Thread gebunden sein

## Implizites Threading
Compiler übernimmt Erstellung und Verwaltung von Threads
- **Thread Pools:** Es wird ein Pool aus Threads erstellt, denen Aufgaben zugewiesen werden können
	- $\Rightarrow$ Threads müssen nicht erst erstellt werden, Anzahl der Threads ist begrenzt
- **Fork-join Parallelism:** Mehrere Threads (tasks) werden mittels `fork` erstellt und mittels `join` wartet der Haupt-Thread auf deren Beendigung
	- je nach Implementation wird bei `fork` nur der aufrufende oder alle Threads dupliziert
	- bei `exec` wird stets der gesamte Prozess (alle Threads) ersetzt
- **OpenMP:** Ein Toolkit aus Compiler-Anweisungen, mittels `#pragma omp parallel` können parallel ausführbare Code-Abschnitte markiert werden
	- erstellt so viele Threads, wie Kerne vorhanden sind
- **Grand Central Dispatch:** Erlaubt Markierung paralleler Sektionen als Block: `^{ ... }`
	- Blöcke werden in eine *dispatch queue* gelegt und einem Thread aus einem Pool zugewiesen, sobald einer verfügbar ist
		- **serial dispatch queue:** Prozess-weite Warteschlange, aus der in FIFO-Reihenfolge Threads ausgewählt werden
		- **concurrent dispatch queue:** System-weite Warteschlange, aus der in FIFO-Reihenfolge, ggf. aber mehrere Threads zugleich entnommen werden
- **Intel Threading Building Blocks (TBB):** Bibliothek für parallel C++-Programme
	- z.B. `parallel_for` anstelle von `for` für parallelisierte Schleifen

## Thread Cancellation
zum Beispiel über `pthread_cancel(tid)`
- **Asynchronous Cancellation:** Thread wird sofort beendet
- **Deffered Cancellation:** Thread überprüft regelmäßig, ob er sich selbst beenden muss
	- z.B. mittels `pthread_testcancel()` (*cancellation point*)
	- Standard-Einstellung
- Threads können Beendigung auch ausschalten (*state = disabled*)
- Auf Linux wird die Thread-Beendigung über [[#Signals]] implementiert

## Thread-Local-Storage (TLS)
Jeder Thread kann mit TLS seine eigenen lokalen Daten speichern
- sinnvoll, wenn keine Kontrolle über Thread-Erstellung (z.B. bei Thread-Pools)
- über Funktionsaufrufe hinweg verfügbar (anders als lokale Variablen)

