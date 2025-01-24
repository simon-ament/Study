---
title: Grundlagen
---
# Betriebssysteme
Ein Betriebssystem dient als Schnittstelle zwischen Computer-Hardware und Nutzer und soll diesen eine möglichst unkomplizierte Verwendung des Computers ermöglichen. Es besteht unter anderem aus
- Hardware-Treiber
- Kernel
- Nutzer-Software und -Interfaces
- Subsysteme für Virtualisierung u.ä.

## Anforderungen an ein Betriebssystem
Die Aufgaben eines Betriebssystems sind unter anderem:
- Minimierung des Stromverbrauchs
- Effiziente Ressourcen-Verwaltung (Speicher, CPU-Kerne, uvm.)
- Schutz vor internen und externen Gefahren für Nutzer und System bieten
- Nutzerfreundlichkeit gewährleisten

Nutzerfreundlichkeit, Sicherheit und Effizienz sind zugleich auch die obersten Design-Ziele bei der Entwicklung eines Betriebssystems.

---
# Interrupts
Ein Interrupt ist ein Signal an die Control-Einheit, das von verschiedenen Quellen gesendet werden kann, um den aktuellen Programmablauf zu unterbrechen, etwa weil ein I/O-Prozess fertig, eine Nutzeranfrage eingegangen oder ein Software- oder Hardware-Prozess gescheitert ist. Ist der Absender eine Hardware-Komponente, so spricht man von einem *Hardware-Interrupt*, nutzt hingegen eine Software-Komponente Betriebssystem-Aufrufe wie `INT` um eine besondere Behandlung vom Betriebssystem anzufordern, so spricht man von einem *Software-Interrupt*

---
# User- und Kernel-Mode
## Zweck der Unterteilung
Die Unterteilung in die beiden Betriebsmodi dient des Schutzes des Betriebssystems und anderer Systemkomponenten vor unberechtigtem und ggf. schädlichem Zugriff. Das zur Festlegung des aktuellen Modus verwendete **Mode-Bit** ist fest in die Hardware des Computers implementiert.

## Rolle von Systemaufrufen
Systemaufrufe sind vom Betriebssystem unter anderem für Nutzer-Software bereitgestellte Schnittstellen, um Zugriff auf grundlegende Funktionen des Betriebssystems zu ermöglichen. Je nach Sicherheitsrelevanz der aufgerufenen Funktion, wechselt das Betriebssystem dazu selbstständig in den Kernel-Mode und macht die Änderung des Mode-Bits anschließend wieder rückgängig, um unautorisierten Zugriff auf den Kernel-Mode zu verhindern.

## Monolithisch vs. Mikrokern
Beispiele für Betriebssystem-Komponenten, die nicht im User-Mode laufen können sind etwa die Speicher- bzw. Prozessverwaltung, da es eine der essenziellen Aufgaben eines Betriebssystems ist, die im User-Mode laufenden Prozesse und ihre Speicherzugriffe sicher und fair zu verwalten sowie gegeneinander zu schützen. 

In einem monolithischen Kernel sind wichtige Hardware-Treiber wie etwa ein Graphikkartentreiber, der auf schnelle und direkte Zugriffe auf Speicher und CPU angewiesen ist, sowie andere erweiterte Funktionen aus Gründen der Geschwindigkeit und einfachen Bedienbarkeit direkt im Kernel enthalten. Ein Mikrokernel hingegen stellt nur eine minimale Menge an Betriebssystem-Funktionen zur Verfügung und kann durch Prozesse im User-Mode, die etwa als Hardware-Treiber fungieren, erweitert werden.

---
# Zentrale Begriffe
## Prozess
Wenn ein Programm ausgeführt wird, wird es zu einem Prozess, der vom Betriebssystem verwaltet wird. Prozesse sind gegeneinander isoliert in einem eigenen Speicherbereich. Prozesse können wiederum neue Prozesse starten (Kind-Prozesse).

## Thread
Ein Prozess enthält ein oder mehrere Threads. Ein Thread ist die kleinste Ausführungseinheit innerhalb eines Prozesses. Sie ermöglichen die parallele Ausführung von Aufgaben, was vor allem bei Mehrkern-Prozessoren zu Leistungssteigerung führt.

## Programm
Ein Programm ist eine Datei die einen Code enthält und eine bestimmte Funktion umsetzt. Es besteht aus Befehlen in einer Programmiersprache oder Maschinencode. Es liegt auf dem Datenträger und verbraucht erst Ressourcen, wenn es ausgeführt und ein Prozess erzeugt wird.

## Shell
Die Shell ist eine Schnittstelle mit der Benutzer mit dem Betriebssysteme kommunizieren können, beispielsweise Programme starten, Prozesse erzeugen oder beenden und Dateien verwalten. Die Befehle fol- gen einer bestimmten Syntax welche vom Betriebssystem abhängt.

## Terminal
Das Terminal ist die grafische Oberfläche mit der Benutzer auf die Shell zugreift.

> [!danger] Abgrenzung Shell vs. Terminal war ungenau (Terminal nicht unbedingt graphisch)

---
# Systemaufrufe

> [!caution] Aufgabe nach relevanten Themen durchsuchen

---
# UNIX-Werkzeuge
## Man-Pages
> [!caution] Eintragen

## `exec`-Varianten
Der Command `exec` dient zur Ausführung eines Programms. `execv` übergibt zusätzlich ein Array an Argumenten, welches mit einem NULL-Pointer terminiert. `execvp` ermöglicht die Ausführung eines Programms, das nicht mit einem absoluten Pfad angegeben wird. Die angegebene Datei wird dann selbstständig gesucht. `execvpe` hat zusätzlich ein Array mit Umgebungsvariablen als Eingabe. Damit kann die Standardumgebung überschrieben werden.

## Weitere Befehle
- `whereis`: Speicherort von Executables, man pages und Programm-Quellen finden
- `find`: Flexible Dateisuche
- `objdump`: Informationen zu Objekt-Dateien ausgeben
- `nm`: Informationen zu Symbolen in Objekt-Dateien ausgeben
- `strace`: Systemaufrufe abfangen und ausgeben