---
title: OS-Prinzipien
---
# Begriffe
## Programm
Ein Programm ist eine Datei, die Code enthält und eine bestimmte Funktion umsetzt
- Code: Befehle in einer Programmiersprache oder Maschinencode
- Liegt auf dem Datenträger und verbraucht erst Ressourcen, wenn Ausführung gestartet wird ([[#Prozess]])

## Prozess
Ein Prozess ist ein **Programm in Ausführung**
- wird durch das Betriebssystem verwaltet
- sind gegeneinander isoliert (z.B. eigener Speicherabschnitt)
- können Kind-Prozesse erstellen

## Thread
Ein Thread ist die **kleinste Ausführungseinheit** innerhalb eines Prozesses
- mindestens ein Thread je Prozess
- ermöglichen die **parallele Ausführung** von Aufgaben, Leistungssteigerung insbesondere bei Mehrkern-Prozessoren

---
# Prozess-Erstellung
## Windows
Unter Windows wird mit `CreateProcess()` ein neuer Prozess erstellt und ein Programm in diesem Prozess geladen:
- erhält eigene PID und eigenen virtuellen Adressraum
- kann bestimmte Handles (z. B. Dateien, Sockets) erben, sofern der Elternprozess diese explizit weitergibt
- erhält Kopie der Umgebungsvariablen des Elternprozesses

## Linux
Unter Linux wird mit `fork()` ein Prozess erstellt, der eine Kopie des Elternprozesses ist
- Zuweisung eigener Pages wird verzögert (*Copy-on-write*)
- erbt offene Dateihandles des Elternprozessen

Mit `exec()` kann daraufhin auch ein eigenes Programm in dem Kind-Prozesses geladen werden
- eigener Adressraum
- Dateihandles gehen verloren

> [!caution] Details checken

### `exec`-Varianten
Der Command `exec` dient zur Ausführung eines Programms.
- `execv` übergibt zusätzlich ein Array an Argumenten, welches mit einem NULL-Pointer terminiert
- `execvp` ermöglicht die Ausführung eines Programms, das nicht mit einem absoluten Pfad angegeben wird. Die angegebene Datei wird dann selbstständig gesucht
- `execvpe` hat zusätzlich ein Array mit Umgebungsvariablen als Eingabe. Damit kann die Standardumgebung überschrieben werden

---
# Subsysteme
> [!danger] Nachtragen

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

**Kontextwechsel:** CPU schaltet von einem Thread auf einen anderen um
1. Kontext des aktuellen Threads speichern
2. Kontext des neuen Threads laden, welcher vom Scheduler ausgewählt wurde
3. Fortsetzung der Programmausführung am aktuellen Programm-Counter

Im Unterschied dazu ist werden bei einem Kontextwechsel vom User- in den Kernelmodus nicht alle Register der CPU gespeichert, da der Thread nicht gewechselt wird. Daher ist auch kein Scheduler nötig um diesen Wechsel zu vollziehen. Insgesamt ist dieser Wechsel schneller als ein Kontextwechsel zwischen zwei Threads.

> [!caution] Letzten Absatz prüfen

## Scheduling-Zustände
![[Screenshot from 2025-02-01 12-33-14.png]]