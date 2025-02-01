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
Seiten, die durch Working Set Replacement freigeben werden landen in der **Modified Page List**, falls sie verändert wurden, sonst in der **Standby Page List**. Aus diesen Listen können Seiten wieder in Prozesse geladen werden, falls sie erneut gebraucht werden. Wenn eine bestimmte Größe der Liste erreicht wird, beginnt der Modified Page Writer Thread Seiten aus der Modified List auf Disk zu schreiben und die Seite in die Standby Page List zu verschieben. Wenn ein Page Read aufgerufen wird können dafür Seiten aus der **Free Page List** genommen werden, welche allerdings garantieren müssen, diese direkt zu überschreiben. In dieser Liste stehen noch alte Werte (Junk). Der Zero Page Thread leert diese Seiten, wenn und verschiebt sie in die **Zero Page List**. Bei Demand Zero Page Faults werden Seiten aus dieser Liste entnommen. In der **Bad Page List** werden Seiten gesammelt die fehlerhaft sind, damit diese Seiten keinem Prozess zugewiesen werden. 

Die **Page Frame Number Database** enthält für jede physische Seite einen Eintrag von 24 Bit. Aktive/valide Seiten beinhalten den originalen PTE Wert, die virtuelle PTE-Adresse sowie einen Working Set Hint. Außerdem gibt es Flags für die oben genannten Listen. Der Share Count gibt an wie viele Prozesse auf diese Seite zugreifen und der Reference Count zählt die Anzahl an Prozessen die auf diese Seite referenzieren. Fällt der Reference Count auf $0$ kann diese Seite in die Free, Standby oder Modified Page List verschoben werden.

![[Screenshot from 2025-02-01 11-44-14.png]]
## Swapping vs. Page Replacement
Beim Swapping wird der gesamte Prozess aus dem Hauptspeicher auf Disk geschrieben, um Speicherplatz für andere Prozesse zu schaffen. Im Gegensatz dazu werden beim Page Replacement einzelne Seiten auf Disk geschrieben, um Platz für andere Seiten zu schaffen. Swapping wird in der Regel selten ausgeführt, da durch das Auslagern eines ganzen Prozesses eine hohe Latenzzeit entsteht. 

Das Page-Replacement findet häufiger statt, da der Prozess weiterlaufen kann. Solange kein **Thrashing** auftritt ist das Page Replacement der effizientere Weg.

> [!caution] Thrashing definieren

## Shared Memory
Die Page Table eines jeden Prozesses wird dazu verwendet, dessen eigenen logischen Adressraum (in Pages unterteilt) auf den physischen Adressraum (in gleich große Frames unterteilt) abzubilden. Da der physische Adressraum für alle Prozesse, die gerade im Hauptspeicher liegen, derselbe ist, versucht man normalerweise, die einzelnen Pages dieser Prozesse auf voneinander verschiedene Frames abzubilden. Im Rahmen der Interprozesskomunikation kann es jedoch von Nutzen sein, dass verschiedene Prozesse gemeinsam einen gewissen Speicherbereich lesen und beschreiben können.

Mithilfe der bereits erwähnten [[#Page Table|Page Tables]] lässt sich dies ganz einfach so umsetzen, dass einzelne Pages dieser kommunizierenden Prozesse auf dasselbe physische Frame abgebildet werden. Für die beteiligten Prozesse ist die jeweilige Page damit weiterhin ein Bestandteil des eigenen, zusammenhängenden logischen Adressraumes, allerdings können eben diese geteilten Pages als Shared Memory eben auch von anderen Prozessen in ihrem logischen Adressraum gelesen und beschrieben werden.
## Copy-on-Write
Die Idee hinter einem Copy-on-Write-Speicher ist es, die Bereitstellung neuer Pages für Prozesse, die mittels `fork`-Systemaufruf erzeugt wurden, zu verzögern. Gemäß der Semantik dieses Systemaufrufs übernimmt der neue Kind-Prozess eine Kopie des Adressraumes seine Elternprozesses. Häufig verwendet der Kind- Prozess jedoch nur bestimmte Pages in diesem Adressraum oder ruft sofort `exec` auf, womit er einen eigenen neuen Adressraum zugewiesen bekommt. Anstatt deshalb sofort nach dem `fork`-Aufruf alle Pages des Elternprozesses zu kopieren, werden diese als Copy-on-Write markiert und zunächst vom Eltern- und Kindprozess geteilt. Erst wenn einer der beiden Prozesse versucht, auf diese geteilte Page zu schreiben, wird eine ihm zugeordnete Kopie angelegt und von ihm beschrieben. Pages, die zum Beispiel ausschließlich Programmcode enthalten, müssen auf diese Weise nie kopiert werden.
## Page-Replacement Algorithmen
Der **First-In-First-Out (FIFO)** Algorithmus implementiert eine FIFO-Queue der Seiten eines Prozesses

Der **Least-Recently-Used (LRU)** Algorithmus ersetzt die Seite, die am längsten nicht genutzt wurde
- Implementierung über Timestamp je Page oder Stack, auf dem referenzierte Seiten nach oben gelegt werden ==???==

Der **Second-Chance Algorithmus** speichert sich für jede Seite ein zusätzliches Bit. Dieses ist initial $0$. Eine Seite die erneut referenziert wird, bekommt das Bit auf $1$ gesetzt. Wenn eine Seite ersetzt werden muss, wird sequentiell nach einer Seite mit Bit=$0$ gesucht und diese ersetzt, wobei Bit=$1$ auf $0$ gesetzt wird.
> [!caution] Wie heißt der Prozess, der das tut?

### Beispiele
> [!caution] Beispiele Einfügen (Blatt 5 Aufgabe 12) - Fehler bei FiFo
