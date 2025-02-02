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

![[Screenshot from 2025-02-02 15-42-13.png]]

### Zustände
![[Screenshot from 2025-02-01 12-33-14.png]]

## Thread
Ein Thread ist die **kleinste Ausführungseinheit** innerhalb eines Prozesses
- mindestens ein Thread je Prozess
- ermöglichen die **parallele Ausführung** von Aufgaben, Leistungssteigerung insbesondere bei Mehrkern-Prozessoren

---
# Prozess-Erstellung
## Windows
Unter Windows wird mit `CreateProcess()` ein neuer Prozess erstellt und ein Programm in diesem Prozess geladen:
- erhält eigene *pid* und eigenen virtuellen Adressraum
- kann bestimmte Handles (z. B. Dateien, Sockets) erben, sofern der Elternprozess diese explizit weitergibt
- erhält Kopie der Umgebungsvariablen des Elternprozesses

> [!caution] Copy-on-Write auch möglich, aber wie?

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
- **Zombie:** Kindprozess, dessen Elternprozess nicht wartet (nicht `wait()` aufgerufen hat)
- **Orphan:** Kindprozess, denn Elternprozess ohne Aufruf von `wait()` beendet wurde

![[Screenshot from 2025-02-02 16-08-30.png]]

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
Methoden zur Interprozesskommunikation (IPC) ermöglichen **Kommunikation und Datenaustausch** zwischen Prozessen ohne unkontrollierten Zugriff auf andere Prozesse.
## Shared Memory
**Gemeinsamer Speicherbereich** ermöglicht schnellen Austausch von Daten ohne Kopier-Operationen
- sorgfältige Synchronisation der Prozesse nötig
- **Use case:** hohe Geschwindigkeit benötigt + enge Kopplung der Prozesse

## Message Passing
**Nachrichten-Austausch** findet ohne direkte Speicherzugriffe statt, sondern wird durch das Betriebssystem verwaltet
- sicher und einfach zu verwenden
- **Use case:** flexible Lösung, insbesondere in komplexen oder verteilten Systemen, benötigt

## Pipes
Uni- oder bi-direktionale **Kommunikationskanäle zwischen Prozessen**
- **unbenannte Pipes:** Verwendung nur bei verwandten Prozessen (Handle vererbt)
- **benannte Pipes:** Verwendung zwischen beliebigen Prozessen

## Sockets
Sockets ermöglichen zusätzlich die **Kommunikation über ein Netzwerk**
- Kennzeichnung mit IP-Adresse und Port
- können (anders als Pipes) von laufenden Programmen erstellt werden
- können gleichzeitig mit mehreren anderen Sockets verbunden sein 
- komplexer zu implementieren, aber auch vielseitiger als Pipes

---
# Threads
## Thread-Kontext
Unter einem Thread-Kontext versteht man seinen **gesamten Zustand**. Dazu gehören:
- Registerinhalte
- Stack
- zugewiesener Speicher
- Programm-Counter

## Kontext-Wechsel
CPU schaltet von einem Thread auf einen anderen um
1. Kontext des aktuellen Threads im [[#Process Control Block (PCB)|PCB]] speichern
2. Kontext des neuen Threads laden, welcher vom Scheduler ausgewählt wurde
3. Fortsetzung der Programmausführung am aktuellen Programm-Counter

Im Unterschied dazu ist werden bei einem Kontextwechsel vom User- in den Kernelmodus nicht alle Register der CPU gespeichert, da der Thread nicht gewechselt wird. Daher ist auch kein Scheduler nötig um diesen Wechsel zu vollziehen. Insgesamt ist dieser Wechsel schneller als ein Kontextwechsel zwischen zwei Threads.

> [!caution] Letzten Absatz prüfen
