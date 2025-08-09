---
title: Wartung
---
# Maintenance & Evolution
**Software Engineering:** The application of a systematic, disciplined, quantifiable approach to the **development**, **operation**, and **maintenance** of software; that is, the application of engineering to software

![[Screenshot from 2025-08-09 14-43-38.png|500]]

**Maintenance:**
1. The process of modifying a software system or component after delivery to correct faults, improve performance or other attributes, or adapt to a changed
2. The process of retaining a hardware system or component in, or restoring it to, a state in which it can perform its required functions (*preventive maintenance*)
- Achtung: Wartung = Reparatur (Wiederherstellung) | maintenance = Erhalten

## Typischer Software Product Lifecycle
![[Screenshot from 2025-08-09 14-43-44.png|500]]

**Software Aging (Softwarealterung)** entsteht durch die Kombination von
- **Lack of Movement:** Alles ist in Veränderung (Anforderungen, Kontext, Plattform), aber die Software kommt nicht mit
- **Ignorant Surgery:** Änderungen ohne "hinreichendes" Verständnis der Software

**Software Evolution**: Software muss immer wieder mit der sich ständig im Wandel befindlichen realen Welt abgeglichen werden (implizite Annahmen in der Software)

## Neu- und Weiterentwicklung
Speziell für eine Organisation entwickelte Softwaresysteme häufig:
- lange Lebensdauer
- obsolete Technologien
- kritisch für wirtschaftlichen Betrieb der Organisation
- Dokumentation (falls überhaupt vorhanden) nicht konsistent mit Implementierung

> Large software systems that we don't know how to cope with but that are vital to our organization

- **Reverse Engineering:** Wiederbeschaffung der notwendigen Informationen für die Integration / Weiterentwicklung
- **Reengineering:** Gewährleistung der Erweiterbarkeit

### Weiterentwicklung
*no retirement*

**Wert für Nutzer:**
- Neuentwicklung schafft Wert für die Nutzer überhaupt erst
- Wartung vermindert Abnahme des Werts für die Nutzer (nicht verhindert!)
- Weiterentwicklung erhöht den Wert für die Nutzer wieder

![[Screenshot from 2025-08-09 14-48-19.png|500]]

**Interne Qualität:**
- Neuentwicklung etabliert interne Qualität als Basis für die Zukunft überhaupt erst
- Wartung erhält / erhöht intere Qualität als Basis für die Zukunft (oft Wunschdenken!)
- Weiterentwicklung verringert interne Qualität ungewollt

![[Screenshot from 2025-08-09 14-48-22.png|500]]

---
# Wartung

|              | Korrektur                                                                                                                                                                                                                 | Verbesserung                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reaktiv**  | **Korrektive Wartung:** Beheben von Softwarefehlern, die nach der Auslieferung aufgetreten sind<br><br>*Mängelkorrektur (mittelschwere und leicht Mängel) planbar*<br><br>*Instandhaltung (schwere Mängel) nicht planbar* | **Adaptive Wartung:** Anpassung an während der Lebensdauer aufgetretene Änderungen der Systemumgebung<br><br>*gut planbar*                                         |
| **Proaktiv** | **Präventive Wartung:** Beheben von latenten Softwarefehlern, bevor sie im Feld als effektive Fehler aufgetreten sind<br><br>*sehr gut planbar*                                                                           | **Perfektionierende Wartung:** Verbesserung der Software bzgl. Performanz oder anderer Attribute (meist nicht funktionale Anforderungen)<br><br>*sehr gut planbar* |

- **Adaptive Wartung:** stellt einen ursprünglichen Zustand wieder her
- **Erweiterung:** führt zu einem Mehrwert des Systems (zusätzliche Funktionalität)

![[Screenshot from 2025-08-09 14-49-52.png|500]]

![[Screenshot from 2025-08-09 14-50-11.png|500]]

Wartungsprozess ist eine vereinfachte und angepasste Form des Entwicklungsprozesses:
- **einfacher Fehler** muss nur behoben werden
- **folgenreicher Fehler** bedingt eine Änderung des Lösungsansatzes (vollständiger Entwicklungsprozess ab den Anforderungen)

**Abschätzung:**
- Auswirkung Lieferung: Welche Auswirkungen auf die Anwendung der Software?
- Auswirkungen im Code: Umfang, Lokalität, erforderliche Tests, bisherige Funktionalität "sicherstellen" und neue Fehler "ausschließen" (Regressionstest)

![[Screenshot from 2025-08-09 14-50-46.png|500]]

---
# Re-Engineering, Sanierung, Migration
**Re-Engineering:** Überarbeitung, um eine Verbesserung der Wartbarkeit zu erreichen (Zukunftsfähigkeit)
- Wenn Erweiterung und Wartung immer aufwendiger und unkontrollierbarer werden: **Sanierung** oder **Ablösung**
- Wenn Support von Hardware, Betriebssystem, Datenbank, etc. auslaufen: **Migration**

![[Screenshot from 2025-08-09 14-51-28.png|500]]

**Strategie für Legacy Systeme:**
- geringe Qualität und geringer Geschäftswert: **ausrangieren**
- geringe Qualität und hoher Geschäftswert: **Re-Engineering / Sanierung** oder Ersatz (falls verfügbar)
- hohe Qualität und geringer Geschäftswert: Ersatz mit COTS (commercial off-the-shelf), **ausrangieren** oder **warten**
- hohe Qualität und hoher Geschäftswert: normale **Wartung**

![[Screenshot from 2025-08-09 14-51-33.png|500]]

## Begriffe des Re-Engineering
**Re-Engineering:** Überarbeitung eines Softwaresystems oder einzelner Teile davon, um eine Verbesserung der Wartbarkeit zu erreichen (Funktionalität bleibt unverändert)

![[Screenshot from 2025-08-09 14-51-50.png|300]]

**Reverse Engineering** Nicht (mehr) vorhandenes Wissen über ein System zurückgewinnen (Voraussetzung für alle größeren Wartungsmaßnahmen)

![[Screenshot from 2025-08-09 14-51-53.png|300]]

**Restrukturierung:** Strukturen derselben Abstraktionsebene in eine anderen Form transformieren (semantikerhaltend)

![[Screenshot from 2025-08-09 14-51-58.png|300]]

**Forward Engineering:** Entspricht dem normalen ggf. inkrementellen Entwicklungsablauf, bei dem ausgehend von den Anforderungen eine Architektur, der detaillierte Entwurf und die Implementierung entwickelt wird

![[Screenshot from 2025-08-09 14-52-01.png|300]]

## Prozess des Re-Engineering
1. Übersetzung des Quellcodes
2. Reverse Engineering (vollständig automatisiert)
3. Verbesserung der Programmstruktur (teilweise automatisiert)
4. Modularisierung
5. Daten-Reengineering

![[Screenshot from 2025-08-09 14-52-09.png|500]]

**Kosten:** abhängig vom
- Umfang der ausgeführten Arbeiten
- Grad der möglichen Automatisierung der Aktivitäten

![[Screenshot from 2025-08-09 14-52-23.png|500]]

---
# Techniken des Re-Engineering
## Refactoring
Eine Änderung (bzw. Sammlung von Änderungen) der internen Struktur von Software, um sie verständlicher zu machen und Modifikationen zu erleichtern, ohne dass sich das sichtbare Verhalten verändert
- **Motivation:** disziplinierte Technik, um den vorhandenen Code zu verbessern ohne sein externes Verhalten zu beeinflussen
- z.B. Funktion extrahieren (wie etwa `printDetails()`)

**Code-Smells:** Vorgehen, um herauszufinden, welche Refactorings evtl. angebracht sind
1. Code-Smell bestimmen (z.B. redundanter Code)
2. Empfohlene Refactorings erwägen (z.B. Funktion extrahieren, Strategy-Entwurfsmuster, etc)

- Es sollte über **mögliche Konsequenzen** nachgedacht werden (keine Optimierung ohne Flaschenhälse zu identifizieren)
- Trotzdem sollte **guter initialer Entwurf** durchgeführt werden
- **Refactoring** beinhaltet Verbesserung der Programmstruktur (3), Modularisierung (4) und Teile des Daten-Reengineering (5)

## Wrapper
- **Wrap** Legacy Software (oder Teile davon) für eine spätere Ersetzung
- **Wrap** neue Software (oder Teile davon) bezüglich des Zugriffs der Legacy Software
- Auf verschiedenen Ebenen möglich: Prozesse, Transaktionen, Programme, Module, Prozeduren oder Dateien

![[Screenshot from 2025-08-09 14-52-50.png|500]]

**Technologie für Wrapper:**
- Middleware (Web, Services, SOA Service Bus)
- Wrapper-Umsetzung (Langugage interfaces, capture and parameterized replay für alte UIs / GUIs)

![[Screenshot from 2025-08-09 14-52-53.png|500]]

| Vorteile                                            | Nachteile                                                       |
| --------------------------------------------------- | --------------------------------------------------------------- |
| initiale Kosten niedriger als volles Re-Engineering | komplex, da verschiedene Technologien unterstützt werden müssen |
| minimale Änderungen des Legacy Systems              | langfristig hohe Kosten, da Code des Wrappers schwer zu warten  |
| Ersetzung stufenweise möglich                       | "wrap and forget" macht die Sache auf Dauer eher noch schlimmer |

---
# Technical Debt
> Grow, not build software... The building metaphor has outlived its usefulness. - Fred Brooks

- Ständige Anpassungen und Weiterentwicklung verhindern, dass
	- Kontext-/Platformänderungen die Software weniger nützlich machen
	- die Einnahmen für die Software sich verringern
- Ständige Reverse und Reengineering Aktivitäten verhindern eine Verschlechterung

**Technische Schulden** umfassen sowohl
- die Abstriche, die wir innerhalb des Entwicklungsprozesses bewusst herbeiführen und in Kauf nehmen
- als auch auf die vielen Defizite und Mängel, die Softwaresysteme plagen

## Beispiele
- Unpassendes (schlechtes) Design
- Defekte (bekannt, nicht behoben)
- Unzureichende Testabdeckung
- Übermäßiges manuelles Testen
- Schlechtes Integrations- und Release-Management (zeitraubend und fehleranfällig)
- Mangelnde Plattformerfahrung

## Bezug zur Wartung
![[Screenshot from 2025-08-09 14-53-12.png|500]]

## Ursachen
- Druck hinsichtlich des Erreichens einer Deadline
- Erfolglose Versuche der Velocity-Beschleunigung
- Schulden bauen auf Schulden auf

## Folgen
- Zunehmend verzögerte Auslieferung
- Beträchtliche Anzahl an Defekten
- Steigende Entwicklungs- und Support-Kosten
- Das Produkt verkümmert
- Schwindende Vorhersehbarkeit
- Leistungseinbruch
- Allgemeiner Frust
- Sinkende Kundenzufriedenheit

## Organisation
- Die Zunahme technischer Schulden überwachen
- Bewährte technische Praktiken anwenden
- Eine starke Definition von Fertig benutzen
- Die wirtschaftlichen Aspekte technischer Schulden richtig verstehen:
	- Beschleunigung der Entwicklung vs. Verschiebung des Auslieferungstermins

## Schulden sichtbar machen
- Technische Schulden auf geschäftlicher Ebene sichtbar machen

![[Screenshot from 2025-08-09 14-53-51.png|400]]

- Technische Schulden auf der technischen Ebene sichtbar machen:
	1. Fallbearbeitungs- bzw. Ticket-System
	2. Product-Backlog-Elemente anlegen
	3. spezielles Backlog für die technischen Schulden anlegen

![[Screenshot from 2025-08-09 14-53-58.png|300]]

## Technische Schulden abbauen
Hilfreiche Kategorien:
- Zufällig entdeckte technische Schulden
- Bekannte technische Schulden
- Gezielt gewählte technische Schulden

Ablauf:
- Nicht alle technischen Schulden sollten abgebaut werden
- Wenden Sie die Pfadfinderregel an (Bauen Sie die Schulden ab, sobald sie Ihnen begegnen)
- Bauen Sie technische Schulden schrittweise ab
- Bauen Sie die technischen Schulden mit den höchsten Zinsen zuerst ab
- Technische Schulden abbauen, während man für den Kunden werthaltige Arbeit erledigt:
	- Es sollten diejenigen technischen Schulden getilgt werden, die zur Entwicklung der Funktionen im Product Backlog passen

---
# Sanierung
Von **Softwaresanierung** spricht man, wenn **mehr als die Hälfte des Codes** überarbeitet wird
- sonst kleine Reengineering-Maßnahmen
- **einmalige Umbauaktion**
- Ziele: Komplexitätsreduktion + Qualitätsverbesserung
- Grenzen zur Wartung und Migration unscharf

**Beispiele für Tätigkeiten:**
- Überarbeitung der Subsystem- oder Modulstruktur
- Zerlegung komplexer Funktionen
- Saubere Separierung fachlicher und technischer Zuständigkeiten
- Komponentenidentifikation und -isolation
- Einführung und Dokumentation von Schnittstellen
- Elimination fachlich nicht mehr benötigter Logik
- Elimination von Code-Klonen
- Verkapselung systemtechnischer Komponenten
- Folgen neuer Entwurfsprinzipien (prozeduraler vs. objektorientierter Entwurf, Polling vs. ereignisgetriebene Interaktion)
- Einführung sauberer Fehler- und Ausnahmebehandlungen
- Vereinheitlichung der Formatierung des Quellcodes

**Schrittweises Vorgehen:**
1. Ausgangslage analysieren, Sanierungsziele festlegen
2. Sanierungsumfang und -aufwände festlegen
3. Transformation spezifizieren (Transformationsschritte priorisieren und planen)
4. Transformation durchführen
	- Techniken wie z.B. Refactoring verwenden: formalisierbar und teilweise sogar automatisierbar
	- Mittel zur Fortschrittsverfolgung (Metriken, Tests, etc.) verwenden
5. Abnahme und Übergabe: Regressionstests und Vergleichsläufe mit altem System, Dokumentation und Pflegeprozess übergeben