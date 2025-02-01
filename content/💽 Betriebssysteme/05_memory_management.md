---
title: Speicherverwaltung
---
# Virtual Memory
- **logische / virtuelle Adressen:** Adressen, die von der CPU generiert werden
- **physische Adressen:** Adressen, die tatsächlich auf den Hauptspeicher zeigen

Diese Unterscheidung ermöglicht es, 
1. jedem Prozess seinen eigenen virtuellen Speicherraum zu geben auf den die anderen Prozesse nicht zugreifen können und
2. insgesamt mehr Speicher adressierbar zu machen, als physisch verfügbar ist

## Memory Management Unit (MMU)
Die Memory Management Unit (MMU) ist eine Hardware-Komponente, die **zur Laufzeit virtuelle Adressen in physische Adressen übersetzt**

---
# Segmentierung (veraltet)
Bei der Segmentierung werden die Speicherbereiche eines Prozesses in Abschnitte unterteilt 
- z.B. Daten, Programm, Stack, Heap
- jedes Segment erhält **Basisadresse** und **Länge**
- MMU addiert auf die jeweilige Basisadresse und prüft, ob die physische Adresse im zugewiesenen Speicher liegt
- es entsteht **externe Fragmentierung** durch Lücken zwischen Segmenten
- Segmente können nicht beliebig wachsen ohne verschoben werden zu müssen

---
# Paging (aktuell)
Beim Paging wird der physische Speicher in gleich-große **Frames** und der virtuelle Speicher in **Pages** der gleichen Größe unterteilt.
- Pages laufender Prozesse werden in den Hauptspeicher geladen
- Adresse besteht auf Page-Nummer und Offset
- durch feste Größe der Pages entsteht keine externe, aber ggf. interne Fragmentierung
- in 64-Bit Systemen ist der virtuelle Speicher deutlich größer als der physische Speicher wodurch die Seitentabellen sehr groß werden können

## Page-Table
Speichert Basisadressen zu den jeweiligen Page-Nummern sowie weitere Status-Bits je Eintrag:
- **Accessed-Bit:** wird gesetzt wenn die Page bereits verwendet wurde
- **Dirty-Bit:** wird gesetzt, wenn der Page-Inhalt modifiziert wurde
- **Valid-Bit:** wird gesetzt, wenn für eine Page das passende Frame im Hauptspeicher geladen ist

Bei mehrstufigen Page-Tabellen wir die Page-Nummer wiederholt unterteilt
- **Large Page-Bit:** gibt an, dass bspw. 4MB statt den typischen 4KB Seitengröße verwendet wurde
	- dazu wird letzte Page-Table-Ebene ausgelassen

> [!caution] Weitere Bits nachtragen (Windows)

## Transition Lookaside Buffer (TLB)
Die Übersetzung von virtuellen in physische Adressen kann viel Zeit in Anspruch nehmen, da man für jede Übersetzung in der **Page-Table im Hauptspeicher** nachschauen muss. Der TLB (Translation Lookaside Buffer) ist ein **Cache** in der MMU, der die zuletzt genutzten Page-Basisadressen bereithält
- MMU sucht Basisadresse zunächst im TLB (Zeitersparnis)
- ist kein passender TLB-Eintrag vorhanden, wird der Eintrag aus der Page-Table geladen und in den TLB übertragen

## Page Fault
Ein Seitenzugriffsfehler tritt auf, wenn ein Prozess versucht eine Seite zu laden, die **derzeit nicht im Hauptspeicher geladen** ist (Valid-Bit nicht gesetzt). Man unterscheidet
- **Hard Page Fault:** Referenzierte Seite liegt nicht im Hauptspeicher und muss von Disk geladen werden
- **Soft Page Fault:** Referenzierte Seite ist Prozess nicht (mehr) zugeordnet, liegt aber im Hauptspeicher, sodass kein Speicherzugriff nötig wird. Die kann zwei Gründe haben:
	1. Prozess referenziert shared library, die bereits im Speicher liegt
	2. Referenzierte Seite liegt noch in der Modified- bzw. Standby-Liste

## Working Set
Das Working Set eines Prozesses ist die Menge der Pages, auf die ohne [[#Page Fault]] zugegriffen werden kann
- es dient als Schätzung der Lokalität, in der ein Prozess sich derzeit bewegt
- oft ermittelt als die Menge der Pages, deren letzte Verwendung durch den Prozess maximal eine gewisse feste Zeitspanne (oft $\Delta$) zurückliegt

---
# Seitenverwaltung
## Windows
Windows verwaltet Pages mittels der folgenden Listen:
- **Standby Page List:** unveränderte Pages, die im Rahmen des Working Set Replacement freigegeben wurden
- **Modified Page List:** veränderte Pages, die im Rahmen des Working Set Replacement freigegeben wurden
	- ab einer gewissen Größe der Liste beginnt der **Modified Page Writer Thread** diese Pages auf Disk zu schreiben und die Einträge in die **Standby Page List** zu verschieben
- **Free Page List:** Liste freier, aber nicht genullter Seiten
	- Prozess muss garantieren, den vorhandenen Inhalt sofort zu überschreiben
- **Zero Page List:** Liste genullter Seiten
- **Bad Page List:** Liste fehlerhafter Seiten
	- wird zum Beispiel beim Boot durch Lesen und  Schreiben von Bitmustern überprüft

### Page Frame Number Database
Die **Page Frame Number Database** enthält für jede physische Seite einen Eintrag von 24 Bit. Aktive/valide Seiten beinhalten
- den originalen PTE Wert
- die virtuelle PTE-Adresse
- einen Working Set Hint
- Flags für die oben genannten Listen

Der **Share Count** gibt an wie viele Prozesse auf diese Seite zugreifen und der **Reference Count** zählt die Anzahl an Prozessen die auf diese Seite referenzieren
- fällt der Reference Count auf $0$ kann diese Seite in die Free, Standby oder Modified Page List verschoben werden

> [!caution] Woher kommen die 24 Bit?, Was ist PTE? Share Count vs Reference Count

![[Screenshot from 2025-02-01 11-44-14.png]]
## Swapping vs. Page Replacement
Beim Swapping wird der gesamte Prozess aus dem Hauptspeicher auf Disk geschrieben, um Speicherplatz für andere Prozesse zu schaffen. Im Gegensatz dazu werden beim Page Replacement einzelne Seiten auf Disk geschrieben, um Platz für andere Seiten zu schaffen. Swapping wird in der Regel selten ausgeführt, da durch das Auslagern eines ganzen Prozesses eine hohe Latenzzeit entsteht. 

Das Page-Replacement findet häufiger statt, da der Prozess weiterlaufen kann. Solange kein **Thrashing** auftritt ist das Page Replacement der effizientere Weg.

> [!caution] Thrashing definieren

## Shared Memory
Mithilfe der bereits erwähnten [[#Page Table|Page Tables]] lässt sich **Shared Memory** ganz einfach so umsetzen, dass einzelne Pages dieser kommunizierenden Prozesse auf **dasselbe physische Frame** abgebildet werden
- jeweilige Page ist weiterhin ein Bestandteil des zusammenhängenden logischen Adressraumes des Prozesses
- andere Prozesse können aber ebenfalls auf das Frame zugreifen
## Copy-on-Write
Die Idee hinter einem Copy-on-Write-Speicher ist die Verzögerung des Kopieren von Pages, etwa bei einem `fork`-Systemaufruf
- Kind-Prozess verwendet meist nur einige Pages oder ruft eh direkt `exec` auf
- Eltern- und Kind-Prozess verwenden deshalb zunächst dasselbe physische Frame ([[#Shared Memory]]), dieses wird allerdings als **Copy-on-Write** markiert
	- versucht ein Prozess zu schreiben, so wird zunächst die benötigte Kopie erstellt
	- Code-Pages müssen so nie kopiert werden
## Page-Replacement Algorithmen
Der **First-In-First-Out (FIFO)** Algorithmus implementiert eine FIFO-Queue der Seiten eines Prozesses

Der **Least-Recently-Used (LRU)** Algorithmus ersetzt die Seite, die am längsten nicht genutzt wurde
- Implementierung über Timestamp je Page oder Stack, auf dem referenzierte Seiten nach oben gelegt werden ==???==

Der **Second-Chance Algorithmus** speichert sich für jede Seite ein zusätzliches Bit. Dieses ist initial $0$. Eine Seite die erneut referenziert wird, bekommt das Bit auf $1$ gesetzt. Wenn eine Seite ersetzt werden muss, wird sequentiell nach einer Seite mit Bit=$0$ gesucht und diese ersetzt, wobei Bit=$1$ auf $0$ gesetzt wird.

### Beispiele
> [!caution] Beispiele Einfügen (Blatt 5 Aufgabe 12) - Fehler bei FiFo
