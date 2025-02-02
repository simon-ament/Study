---
title: Grundlagen
---
# Betriebssysteme
Ein Betriebssystem dient als **Schnittstelle zwischen Computer-Hardware und Nutzer** und soll diesem eine möglichst **unkomplizierte Verwendung des Computers** ermöglichen. 

## Wichtige Bestandteile (u.a.):
- Hardware-Treiber
- Kernel
- Nutzer-Software und -Interfaces (oft Graphical User Interface)
- Subsysteme für Virtualisierung u.ä.

## Wichtige Aufgaben (u.a.):
- Prozessverwaltung (Fairness, Prioritäten, non-blocking)
- Speicherverwaltung (Virtual Memory, Schutz der Prozesse gegeneinander)
- Festplattenverwaltung (externes Dateisystem)
- Geräteverwaltung (Abhängigkeiten und Zugriffe verwalten)
- Batch Processing (mehrere Nutzer zugleich, transparent)
- Fehler-Erkennung
- Schutz und Sicherheit (inkl. Logging)

## Anforderungen (u.a)
- Minimierung des **Stromverbrauchs**
- Effiziente **Ressourcen-Verwaltung** (Speicher, CPU-Kerne, uvm.)
- [[06_security_protection|Schutz]] vor internen und externen Gefahren für Nutzer und System bieten
- **Nutzerfreundlichkeit** gewährleisten

Nutzerfreundlichkeit, Sicherheit und Effizienz sind zugleich auch die obersten Design-Ziele bei der Entwicklung eines Betriebssystems

## Ziele von Windows NT
- **Portabilität:** Unterstützung verschiedener und immer neuer Architekturen
	- Hardware Abstraction Layer (HAL) versteckt Maschinen-spezifische Details
	- Unterstützung für x86, MIPS, Alpha AXP, PowerPC, Itanium
- **Erweiterbarkeit:** Code muss an Erwartungen des Marktes angepasst werden können
- **Zuverlässigkeit:** Schutz des Betriebssystems gegen Prozess sowie dieser untereinander
- **Kompatibilität:** bestehende MS-DOS APIs und Programme weiter unterstützen
	- darüber hinaus Kompatibilität mit UNIX, OS/2 und NetWare
	- **Subsysteme** für Windows, OS/2 und POSIX (nach relevanz sortiert)
		- dienen der Ausführung von Programmen, die für andere Betriebssysteme / APIs geschrieben wurden
- **Performance:** Schnelligkeit und Responsivität im Rahmen der anderen Design-Ziele optimieren
- **Architektur:**
	- symmetrisches Multiprocessing unterstützen
	- Varianten für Client & Server (Unterschied u.a. in Standard-Quantum-Länge)
- POSIX-Einhaltung

---
# Interrupts
Ein Interrupt ist ein **Signal an die Control-Einheit**, das von verschiedenen Quellen zum Beispiel in den folgenden Fällen gesendet werden kann, um den aktuellen **Programmablauf** zu **unterbrechen**:
- I/O-Prozess fertig
- Nutzeranfrage eingegangen
- Software- oder Hardware-Prozess gescheitert

Man unterscheidet zwischen
- **Hardware-Interrupts:** Absender ist Hardware-Komponente
- **Software-Interrupts:** Absender ist Software-Komponente und nutzt Betriebssystem-Aufrufe wir `INT` zur Anforderung besonderer Behandlung
	- auch als **trap** oder **exception** bezeichnet

---
# User- und Kernel-Mode
Unterteilung dient **Schutz des Betriebssystem und anderer Systemkomponenten** vor unberechtigtem und ggf. schädlichem Zugriff.
- **Mode-Bit:** definiert aktuellen Modus | fest in die Hardware des Computers implementiert
- einige Instruktionen sind **privilegiert** und können nur im Kernel-Mode ausgeführt werden

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
	- kann durch Prozesse im User-Mode, die etwa als Hardware-Treiber fungieren, erweitert werden
- **Layered:** Unterteilung des Betriebssystems in Schichten, wobei jede Schicht nur Funktionalität aus den darunterliegenden Schichten verwendet
	- Hardware (Layer 1) $\to$ User Interface (Layer $n$)
	- **loadable kernel modules (LKMs)** funktionieren ähnlich, sind aber flexibler (ersetzbar, nur Kommunikations-Interface vorgeschrieben)

## Typische Kerneldatenstrukturen
- Linked list (singly, doubly, circular)
- Binary search tree
- Hash map
- Bitmap

## Implentierungsorte
**Kernel Space:**
- CPU-, Speicher- und Input / Output-Verwaltung
- Verwaltung mehrerer Prozessoren, Diagnosen und Tests
- Teile des Dateisystems und Netzwerk-Interfaces

**User Space:**
- Compiler, Assembler, Interpreter und Linker / Loader
- Dateisystem- und Netzwerk-Verwaltung
- Nutzerprogramme (z.B. Office-Suite)

---
# Nutzer-Schnittstellen
## Shell
Die Shell ist eine Schnittstelle, über die Benutzer mit dem Betriebssysteme kommunizieren können
- z.B. Programme starten, Prozesse erzeugen oder beenden und Dateien verwalten
- Betriebssystem-spezifische Syntax
	- z.B. `$ sort <file1 >file2`
- **Command-Interpreter**, Pseudo-Terminal

## Terminal
Ein Terminal ist ein Container, in dem eine Shell läuft
- historisch gesehen ein eigenes Gerät (Monitor + Tastatur)
- heutzutage oft eine App, die eine Shell startet (nicht unbedingt graphisch)

## System-Aufrufe
Nutzerprogramme greifen über System-Aufrufe auf Betriebssystem-Funktionen zu
- Parameter werden per [[#Interrupts|trap]], Register oder Stack übergeben
- werden meist mittels einer *high-level* API verwendet (Windows API, POSIX API oder Java API)
- Interaktion oft indirekt über *system services*

Man unterscheidet 6 Typen von System-Aufrufe:

![[Screenshot from 2025-02-02 12-27-18.png]]

---
# UNIX-Werkzeuge
## Man-Pages
Sammlung von Hilfe- und Dokumentationsseiten unter Unix und verwandten Betriebssystemen. Unterteilt in:
7. **User Commands and Deamons**
8. **System Calls and Kernel Services**
9. Subroutines
10. Special Files, Device Drivers and Hardware
11. Configuration Files
12. Games
13. Miscellaneous Commands
14. Administrative Commands and Deamons

Beispielverwendung: `man 2 kill`

## Weitere Befehle
- `whereis`: Speicherort von Executables, man pages und Programm-Quellen finden
- `find`: Flexible Dateisuche
- `objdump`: Informationen zu Objekt-Dateien ausgeben
- `nm`: Informationen zu Symbolen in Objekt-Dateien ausgeben
- `strace`: Systemaufrufe abfangen und ausgeben

## Debugging
- **core dump file:** Prozessspeicher zum Zeitpunkt eines Fehlers
- **crash dump file:** Kernelspeicher zum Zeitpunkt eines Fehlers
- **Tracing:** z.B. mittels `strace`, `gdb` (source-level debugger), `perf` (Unix performance tools) u.ä.
	- **BPF Compiler Collection (BCC):** Große Sammlung an Tracing-Tools für Unix

---
# Evolution von Betriebssystemen

![[Screenshot from 2025-02-02 12-08-11.png]]