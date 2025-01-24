---
title: Speicherverwaltung
---
# Virtual Memory
> [!caution] Grundlagen eintragen (z.B. physische vs. logische Adressen)

---
# Memory Management Unit (MMU)
Die Memory Management Unit (MMU) ist eine Hardware-Komponente, welche zur Laufzeit virtuelle Adressen in physische Adressen übersetzt. Als logische/virtuelle Adressen, werden die Adressen bezeichnet, die von der CPU generiert werden. Adressen, die tatsächlich auf den Hauptspeicher zeigen, wer- den physische Adressen genannt. Diese Technik ermöglicht es jedem Prozess seinen eigenen virtuellen Speicherraum zu geben auf den die anderen Prozesse nicht zugreifen können. Virtueller Speicher ermöglicht es den Prozessen auch insgesamt mehr Speicher zur Verfügung zu stellen, als physisch verfügbar ist.

---
# Segmentierung (veraltet)
Bei der Segmentierung werden die Speicherbereiche eines Prozesses in Abschnitte unterteilt (z.B.: Daten, Programm, Stack, Heap). Jedes Segment erhält eine Basisadresse und eine Länge. Eine virtuelle Adresse wird von der MMU zur Basisadresse addiert und geprüft, ob die erhaltene physische Adresse im zugewiesenen Speicher liegt.

Bei Segmentierung entsteht externe Fragmentierung, es entstehen bei der Speicherzuweisung Lücken, die oft zu klein sind um andere Segmente zu speichern, wodurch Speicherplatz verloren geht. Des weiteren müssen Segmente verschoben werden, wenn sie wachsen und es zu wenig verfügbaren zusammenhängenden Speicher gibt.

---
# Paging (aktuell)
Beim Paging wird der physische Speicher in gleich-große **Frames** und der virtuelle Speicher in **Pages** der gleichen Größe unterteilt. Wenn ein Prozess läuft werden seine Pages in der verfügbaren Frames im Hauptspeicher geladen. Die virtuellen Adressen bestehen aus Pagezahl und dem Offset innerhalb der Page. Eine Page-Tabelle, die zu den Pages die Basisadresse der Frames speichert, wird zur Übersetzung in physische Adressen verwendet. Da Pages/Frames eine feste Größe haben, entsteht keine externe Fragmentierung. Interne Fragmentierung kann nicht ausgeschloßen werden, begrenzt sich allerdings auf die Seitengröße. In 64-Bit Systemen, ist der virtuelle Speicher deutlich größer als der physische Speicher wodurch die Seitentabellen sehr groß werden können. 
## Transition Lookaside Buffer (TLB)
Die Übersetzung von virtuellen in physische Adressen kann viel Zeit in Anspruch nehmen, da man für jede Übersetzung in der Seitentabelle im Hauptspeicher nachschauen muss. Der TLB (Translation Lookaside Buffer) ist ein Cache in der MMU, um schneller auf die Adresse der Frames zugreifen zu können, ohne in der Page-Tabelle nachschauen zu müssen. Wenn die MMU eine Adresse übersetzen soll, sieht sie zunächst im TLB nach und kann unter Umständen sehr viel Zeit sparen. Wenn sie nicht gefunden wird, muss dennoch in der Seitentabelle nachgesehen werden. Die erhaltene Adresse wird nun in die TLB eingetragen, um zukünftig schneller darauf zugreifen zu können.
## Page Table
Die Page-Adresse ist unterteilt in Page-Number und Page-Offset unterteilt. Bei mehrstufigen Page-Tabellen wir die Page-Nummer nochmal unterteilt. Das Accessed-Bit wird gesetzt wenn die Page bereits gelesen wurde. Wenn eine Page geändert wurde, wird das Dirty-Bit auf $1$ gesetzt. Ein Large Page-Bit gibt an, dass bspw. 4MB statt den typischen 4KB Seitengröße verwendet wurde. Wenn für eine Page das passende Frame im Hauptspeicher geladen ist, wird das Valid-Bit gesetzt.

> [!caution] Weitere Bits nachtragen (Windows)

## Working Set
Das Working Set eines Prozesses ist die Menge der Pages, deren letzte Verwendung durch den Prozess maximal eine gewisse feste Zeitspanne (oft $\Delta$) zurückliegt. Das Working Set dient als Schätzung der Lokalität, in der der Prozess sich gerade bewegt, also die im aktuellen Ausführungszustand (oft) verwendeten Pages.

- kurz gesagt: Die Menge der Pages, auf die ohne [[#Page Fault]] zugegriffen werden kann

## Page Fault
Ein Seitenzugriffsfehler tritt auf, wenn ein Prozess versucht eine Seite zu laden, die derzeit nicht im Hauptspeicher geladen ist (invalid-bit). Auf Windows versteht man unter einem **Hard Page Fault**, dass eine Seite referenziert wird, die nicht im Hauptspeicher liegt und in der Folge von Disk geladen werden muss. **Soft Page Faults** entstehen wenn ein Prozess keine logische Zuordnung zu einer Seite hat, diese sich aber im Hauptspeicher befindet. Das kann zwei Gründe haben:

1. Der Prozess hat eine Referenz auf eine shared library, welche im Speicher liegt, aber der Prozess hat keine Referenz in seiner Seitentabelle. Dafür muss der Prozess seine Seitentabelle lediglich aktualisieren. 
2. Eine Seite kann aus der Modified- oder Standby-Seitentabelle zurückgeschrieben werden. 

Ein Soft Page Fault ist deutlich weniger zeitaufwendig, als ein Hard Page Fault.

---
# Seitenverwaltung
## Windows
Seiten, die durch Working Set Replacement freigeben werden landen in der **Modified Page List**, falls sie verändert wurden, sonst in der **Standby Page List**. Aus diesen Listen können Seiten wieder in Prozesse geladen werden, falls sie erneut gebraucht werden. Wenn eine bestimmte Größe der Liste erreicht wird, beginnt der Modified Page Writer Thread Seiten aus der Modified List auf Disk zu schreiben und die Seite in die Standby Page List zu verschieben. Wenn ein Page Read aufgerufen wird können dafür Seiten aus der **Free Page List** genommen werden, welche allerdings garantieren müssen, diese direkt zu überschreiben. In dieser Liste stehen noch alte Werte (Junk). Der Zero Page Thread leert diese Seiten, wenn und verschiebt sie in die **Zero Page List**. Bei Demand Zero Page Faults werden Seiten aus dieser Liste entnommen. In der **Bad Page List** werden Seiten gesammelt die fehlerhaft sind, damit diese Seiten keinem Prozess zugewiesen werden. 

Die **Page Frame Number Database** enthält für jede physische Seite einen Eintrag von 24 Bit. Aktive/valide Seiten beinhalten den originalen PTE Wert, die virtuelle PTE-Adresse sowie einen Working Set Hint. Außerdem gibt es Flags für die oben genannten Listen. Der Share Count gibt an wie viele Prozesse auf diese Seite zugreifen und der Reference Count zählt die Anzahl an Prozessen die auf diese Seite referenzieren. Fällt der Reference Count auf $0$ kann diese Seite in die Free, Standby oder Modified Page List verschoben werden.
## Swapping vs. Page Replacement
Beim Swapping wird der gesamte Prozess aus dem Hauptspeicher auf Disk geschrieben, um Speicherplatz für andere Prozesse zu schaffen. Im Gegensatz dazu werden beim Page Replacement einzelne Seiten auf Disk geschrieben, um Platz für andere Seiten zu schaffen. Swapping wird in der Regel selten ausgeführt, da durch das Auslagern eines ganzen Prozesses eine hohe Latenzzeit entsteht. Das Page-Replacement findet häufiger statt, da der Prozess weiterlaufen kann. Solange kein **Thrashing** auftritt ist das Page Replacement der effizientere Weg.

> [!caution] Thrashing definieren

## Shared Memory
Die Page Table eines jeden Prozesses wird dazu verwendet, dessen eigenen logischen Adressraum (in Pages unterteilt) auf den physischen Adressraum (in gleich große Frames unterteilt) abzubilden. Da der physische Adressraum für alle Prozesse, die gerade im Hauptspeicher liegen, derselbe ist, versucht man normalerweise, die einzelnen Pages dieser Prozesse auf voneinander verschiedene Frames abzubilden. Im Rahmen der Interprozesskomunikation kann es jedoch von Nutzen sein, dass verschiedene Prozesse gemeinsam einen gewissen Speicherbereich lesen und beschreiben können.

Mithilfe der bereits erwähnten [[#Page Table|Page Tables]] lässt sich dies ganz einfach so umsetzen, dass einzelne Pages dieser kommunizierenden Prozesse auf dasselbe physische Frame abgebildet werden. Für die beteiligten Prozesse ist die jeweilige Page damit weiterhin ein Bestandteil des eigenen, zusammenhängenden logischen Adressraumes, allerdings können eben diese geteilten Pages als Shared Memory eben auch von anderen Prozessen in ihrem logischen Adressraum gelesen und beschrieben werden.
## Copy-on-Write
Die Idee hinter einem Copy-on-Write-Speicher ist es, die Bereitstellung neuer Pages für Prozesse, die mittels `fork`-Systemaufruf erzeugt wurden, zu verzögern. Gemäß der Semantik dieses Systemaufrufs übernimmt der neue Kind-Prozess eine Kopie des Adressraumes seine Elternprozesses. Häufig verwendet der Kind- Prozess jedoch nur bestimmte Pages in diesem Adressraum oder ruft sofort `exec` auf, womit er einen eigenen neuen Adressraum zugewiesen bekommt. Anstatt deshalb sofort nach dem `fork`-Aufruf alle Pages des Elternprozesses zu kopieren, werden diese als Copy-on-Write markiert und zunächst vom Eltern- und Kindprozess geteilt. Erst wenn einer der beiden Prozesse versucht, auf diese geteilte Page zu schreiben, wird eine ihm zugeordnete Kopie angelegt und von ihm beschrieben. Pages, die zum Beispiel ausschließlich Programmcode enthalten, müssen auf diese Weise nie kopiert werden.
## Page-Replacement Algorithmen
Der **First-In-First-Out (FIFO)** Algorithmus implementiert eine FIFO Queue der die Prozesse hinzugefügt werden. Die Seite, die als erstes eingefügt wurde, wird auch als erstes wieder entnommen und ersetzt.

Der **Least-Recently-Used (LRU)** ersetzt die Seite, die am längsten nicht genutzt wurde. Dafür wird entweder ein Zähler für jede Page erstellt und die Seite mit dem geringsten Wert ersetzt oder durch einen Stack implementiert, bei der eine referenzierte Seite nach oben geschoben wird.

Der **Second-Chance Algorithmus** speichert sich für jede Seite ein zusätzliches Bit. Dieses ist initial $0$. Eine Seite die erneut referenziert wird, bekommt das Bit auf $1$ gesetzt. Wenn eine Seite ersetzt werden muss, wird der Reihe nach, nach einer Seite mit Bit=$0$ gesucht und diese ersetzt, wobei Bit=$1$ auf $0$ gesetzt wird.
### Beispiele
> [!caution] Beispiele Einfügen (Blatt 5 Aufgabe 12) - Fehler bei FiFo