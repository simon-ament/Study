---
title: Grundlagen
---
# Betriebssysteme
Ein Betriebssystem dient als **Schnittstelle zwischen Computer-Hardware und Nutzer** und soll diesem eine möglichst **unkomplizierte Verwendung des Computers** ermöglichen. 

Wichtige Bestandteile sind (u.a.):
- Hardware-Treiber
- Kernel
- Nutzer-Software und -Interfaces
- Subsysteme für Virtualisierung u.ä.

## Anforderungen an ein Betriebssystem
- Minimierung des **Stromverbrauchs**
- Effiziente **Ressourcen-Verwaltung** (Speicher, CPU-Kerne, uvm.)
- [[06_security_protection|Schutz]] vor internen und externen Gefahren für Nutzer und System bieten
- **Nutzerfreundlichkeit** gewährleisten
- und weitere

Nutzerfreundlichkeit, Sicherheit und Effizienz sind zugleich auch die obersten Design-Ziele bei der Entwicklung eines Betriebssystems.

---
# Interrupts
Ein Interrupt ist ein **Signal an die Control-Einheit**, das von verschiedenen Quellen zum Beispiel in den folgenden Fällen gesendet werden kann, um den aktuellen **Programmablauf** zu **unterbrechen**:
- I/O-Prozess fertig
- Nutzeranfrage eingegangen
- Software- oder Hardware-Prozess gescheitert

Man unterscheidet zwischen
- **Hardware-Interrupts:** Absender ist Hardware-Komponente
- **Software-Interrupts:** Absender ist Software-Komponente und nutzt Betriebssystem-Aufrufe wir `INT` zur Anforderung besonderer Behandlung

---
# User- und Kernel-Mode
Unterteilung dient **Schutz des Betriebssystem und anderer Systemkomponenten** vor unberechtigtem und ggf. schädlichem Zugriff.
- **Mode-Bit:** definiert aktuellen Modus | fest in die Hardware des Computers implementiert

## Systemaufrufe
Systemaufrufe sind vom Betriebssystem unter anderem für Nutzer-Software bereitgestellte **Schnittstellen**, die **Zugriff auf grundlegende Funktionen des Betriebssystems** ermöglichen. 
- sofern notwendig, wechselt das Betriebssystem dazu selbstständig in den Kernel-Mode
	- z.B. Speicher- bzw. Prozessverwaltung nur im Kernel-Mode möglich (Konkurrenz der Prozesse)
- Änderung des Mode-Bits wird anschließend wieder rückgängig gemacht, um unautorisierten Zugriff auf den Kernel-Mode zu verhindern

## Kernel-Philosphien
- **Monolithischer Kernel:** wichtige Hardware-Treiber wie etwa ein Graphikkartentreiber sowie andere erweiterte Funktionen direkt im Kernel enthalten
	- einfachen Bedienbarkeit
	- schnelle und direkte Zugriffe auf Speicher und CPU (Geschwindigkeit)
- **Mikrokernel:** minimale Menge an Betriebssystem-Funktionen verfügbar
	- kann durch Prozesse im User-Mode, die etwa als Hardware-Treiber fungieren, erweitert werden.

---
# Zentrale Begriffe
## Prozess
Ein Prozess ist ein **Programm in Ausführung**
- wird durch das Betriebssystem verwaltet
- sind gegeneinander isoliert (z.B. eigener Speicherabschnitt)
- können Kind-Prozesse erstellen

## Thread
Ein Thread ist die **kleinste Ausführungseinheit** innerhalb eines Prozesses
- mindestens ein Thread je Prozess
- ermöglichen die **parallele Ausführung** von Aufgaben, Leistungssteigerung insbesondere bei Mehrkern-Prozessoren

## Programm
Ein Programm ist eine Datei, die Code enthält und eine bestimmte Funktion umsetzt
- Code: Befehle in einer Programmiersprache oder Maschinencode
- Liegt auf dem Datenträger und verbraucht erst Ressourcen, wenn Ausführung gestartet wird ([[#Prozess]])

## Shell
Die Shell ist eine Schnittstelle über die Benutzer mit dem Betriebssysteme kommunizieren können
- zum Beispiel Programme starten, Prozesse erzeugen oder beenden und Dateien verwalten
- Betriebssystem-spezifische Syntax

## Terminal
Das Terminal ist die grafische Oberfläche, mit der ein Benutzer auf die Shell zugreift

> [!danger] Abgrenzung Shell vs. Terminal war ungenau (Terminal nicht unbedingt graphisch)

---
# Systemaufrufe

> [!caution] Aufgabe nach relevanten Themen durchsuchen

---
# UNIX-Werkzeuge
## Man-Pages
> [!caution] Eintragen

## Weitere Befehle
- `whereis`: Speicherort von Executables, man pages und Programm-Quellen finden
- `find`: Flexible Dateisuche
- `objdump`: Informationen zu Objekt-Dateien ausgeben
- `nm`: Informationen zu Symbolen in Objekt-Dateien ausgeben
- `strace`: Systemaufrufe abfangen und ausgeben