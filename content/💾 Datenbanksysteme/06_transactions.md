---
title: Transaktionen und Optimierung
---
- realistische Annahmen:
	- Datenbankzugriff **nicht isoliert**, sondern viele Nutzer und Anwender gleichzeitig
	- auch einfache Anfragen sind nicht atomar (bestehen aus Teilschritten), sodass die Datenbank während der Anfrage ausfallen könnte
	- synchrone Zugriffe / Änderungen können zu Inkonsistenzen führen (*lost update*)

**Transaktion:** Eine **Folge von Operationen** (Aktionen), die die Datenbank von einem **konsistenten Zustand** in einen konsistenten (eventuell veränderten) Zustand überführt, wobei das **ACID-Prinzip** eingehalten werden muss.

---
# ACID
**Atomicity / Atomarität:**
- Transaktion wird entweder ganz oder gar nicht ausgeführt
- Es darf nicht nur ein Teil der Anfrage ausgeführt werden (entweder ganz oder gar nicht)
- Beispiel: Überweisung von einem Konto auf ein anderes $\Rightarrow$ Betrag auf einem Konto abziehen und auf einem anderen addieren

**Consistency / Konsistenz / Integritätserhaltung:**
- Datenbank ist vor Beginn und nach Beendigung einer Transaktion jeweils in einem konsistenten Zustand $\Rightarrow$ Mehrere Transaktionen dürfen sich nicht widersprechen / gegenseitig stören

**Isolation:**
- Transaktion, die auf einer Datenbank arbeitet, sollte den „Eindruck“ haben, dass sie allein auf dieser Datenbank arbeitet

**Durability / Persistenz:**
- Nach erfolgreichem Abschluss einer Transaktion muss das Ergebnis dieser Transaktion „dauerhaft“ in der Datenbank gespeichert werden $\Rightarrow$ Speichern auf Disk und nicht im Hauptspeicher (Persistenz bei Stromausfall und ähnlichem)

> [!tip]
> Unbedingt auswending lernen (oder auf den Spickzettel schreiben)

**Serialisierbarkeit:** Auch wenn mehrere Transaktionen gleichzeitig laufen (z.B. aus Optimierungsgründen), sollen sie im Effekt doch so ablaufen, als würden sie nacheinander ausgeführt.

## Probleme im Mehrbenutzerbetrieb
- **Abhängigkeiten von nicht freigegebenen Daten:** *Dirty Read*
	- Lesen einer Änderung, die nicht commited ist
- **Inkonsistentes Lesen:** *Nonrepeatable Read*
	- Lesebefehl ergibt (potentiell) unterschiedliche Werte zu unterschiedlichen Zeitpunkten der Transaktionsausführung
- **Berechnungen auf unvollständigen Daten:** *Phantom-Problem* 
	- Insert wird übersehen (z.B. Anzahl der Mitarbeiter ändert sich dadurch)
- **Verlorengegangenes Ändern:** *Lost Update*
	- Ein `write` wird von einer anderen Transaktion überschrieben

## Transaktionen
**Idee:** Gruppierung mehrerer Operationen / Anfragen in eine Transaktion
- Ausführung atomar
- Ausführung serialisierbar (per SQL-Standard), ggf. über Isolationsstufen aufgeweicht
- Ein SQL-Befehl entspricht einer Transaktion (inklusive ausgelöste Trigger)

- Beginn einer Transaktion: `START TRANSACTION`
- Ende einer Transaktion: `COMMIT` bzw. `ROLLBACK | ABORT`
	- Abbruch kann auch durch DBMS ausgelöst werden, Anwendung muss Fehlermeldung handeln

**Isolationsebenen:** dienen der Effizienzsteigerung (*Klausur: Fehlertypen kennen, aber nicht die SQL-Befehle*)
- kann pro Transaktion angegeben werden
```sql
 set transaction 
 [ { read only | read write }, ] -- Versprechen ans DBS
 [isolation level { 
	 read uncommitted | 
	 read committed | 
	 repeatable read | 
	 serializable }, ] 
[ diagnostics size ...]
```

- `read uncommited` (am schwächsten): Zugriff auf nicht geschriebene Daten, z.B. für statistische und ähnliche Transaktionen (ungefährer Überblick), keine Sperren
	- Default ausnahmsweise `read only`, sonst anders angeben
- `read commited`: Nur Lesen endgültig geschriebener Werte, aber *nonrepeatable read* möglich
	- verhindert bereits *lost update*
- `repeatable read`: verhindert nonrepeatable read, aber *Phantomproblem* kann auftreten
- `serializable` (am stärksten): garantiert Serialisierbarkeit, Transaktion sieht nur Änderungen, die zu Beginn der Transaktion commited waren

**default:**
```sql
set transaction read write, 
isolation level serializable
```

---
# Serialisierbarkeit
- Grundannahme: Jede Transaktion ist korrekt
- einfache Lösung: alle Transaktionen seriell ausführen
- Effizienzvortiele durch parallele Ausführung
- deshalb: korrekte parallele *Schedules* finden

**Schedule:** geordnete Abfolge wichtiger Aktionen, die von einer oder mehreren Transaktionen durchgeführt werden, "Ablaufplan" aus Transaktionsoperationen

**Serieller Schedule:** Schedule, in dem Transaktionen hintereinander ausgeführt werden

**Serialisierbarer Schedule:** Es existiert ein *serieller Schedule* mit identischem Effekt
- es wird immer das schlimmste angenommen (nur `read / write` bekannt aber nicht genauer Effekt)

## Konfliktserialisierbarkeit
**Hinreichende Bedingung** für Serialisierbarkeit
- Ein Konflikt herrscht zwischen zwei Aktionen eines Schedules, falls die Änderung ihrer Reihenfolge das Ergebnis verändern kann (nicht muss).
- Konflikt: zwei Aktionen betreffen das gleiche Datenbankelement und eine von beiden schreibt

**Notation:** $r_i(X)$ bzw. $w_i(X)$ mit Transaktionsnummer $i$
- Transaktion ist Sequenz solcher Aktionen
- **Schedule** einer Menge von Transaktionen ist eine Sequenz von Aktionen, wenn **alle Aktionen** aller Transaktionen enthalten sind und zwar jeweils in der **Reihenfolge**, in der die in der jeweiligen Transaktion auftreten

**Idee:** So lange nicht-konfligierende Aktionen tauschen bis aus einem Schedule ein serieller Schedule wird $\Rightarrow$ falls das klappt, ist der Schedule serialisierbar
- **konfliegierende Aktionen:** `read` und `write` oder `write` und `write` auf selbem Eintrag
- Zwei Schedules $S$ und $S'$ heißen *konfliktäquivalent*, wenn die Reihenfolge aller Paare von konfligierenden Aktionen in beiden Schedules gleich ist
- Ein Schedule $S$ ist genau dann *konfliktserialisierbar*, wenn $S$ konfliktäquivalent zu einem seriellen Schedule ist.

**Sichtserialisierbarkeit:** serialisierbar, aber nicht konfliktserialisierbar (denn Werte werden am Ende sowieso wieder überschrieben)

## Konfliktgraph G
- Konten sind Transaktionen, gerichtete Kanten zwischen konfligierenden Transaktionen
	- Kantenrichtung entsprechend zeitlicher Reihenfolge in $S$
- Schedule $S$ ist konkliktserialisierbar gdw. der vorliegende Konfliktgraph azyklisch ist
- Für jeden azyklischen Konfliktgraphen $G(S)$  lässt sich ein serieller Schedule $S'$ konstruieren, so dass $S$ konflikäquivalent zu $S'$ ist, also ist $S$ konfliktserialisierbar

---
# Sperrprotokolle
**Idee:** Transaktion sperrt Objekte der Datenbank für die Dauer der Bearbeitung, Zugriff für andere Objekte nicht möglich
- Objekte: Tabellenweise sehr streng, Tupelweise hoher Verwaltungsausfwand | **meist** werden **Blöcke** (4kb auf Disk) **gesperrt**
- Scheduler als Softwarekomponente für Schedule zuständig (verwendet Sperrtabelle / *lock table*)

Transaktionen müssen selbst Sperren anfordern bzw. freigeben
- **Konsistenz** einer Transaktion: Lesen oder Schreiben eines Objektes nur nachdem Sperre angefordert wurde und bevor diese wieder freigegeben wurde + alle Sperren müssen freigegeben werden
- **Legalität** eines Schedules: Zwei Transaktionen dürfen nicht das zeitgleich dasselbe Objekt sperren
- neue Aktionen: $l_i(X)$ zum Sperren, $u_i(X)$ zum Entsperren
- Sperren und Entsperren genügen alle noch nicht, um Konfliktserialisierbarkeit zu garantieren

Sperrtabelle: `Sperren (Element, Transaktion)` mit normalen `INSERT` und `DELETE`
- Sperren können vorgezogen werden, ohne dass Konsistenz verlorgen geht

Sperrprotokoll: Unlock erst erlaubt, sobald alle später noch benötigten Sperren gesichert

## 2-Phase-Locking
- einfache Bedingung an Transaktionen **garantiert Konfliktserialisierbarkeit** (Sperren alleine genügen nicht)
- Alle Sperranforderungen geschehen vor allen Sperrfreigaben (Sperrphase, Freigabephase)
- Bedingung an Transaktion, nicht an Schedule
- Reihenfolge, in der die Transaktionen ihre erste Freigabe erteilen, entspricht Reihenfolge in seriellem Schedule

## Sperrmodi
- mehrere Arten von Sperren erhöhen die Flexibilität und verringern die Menge der abgewiesenen sperren
- Schreibsperre: $xl_i(X)$ *exclusive lock*, sperrt Zugriff aller anderen Transaktionen
- Lesesperre: $sl_i(X)$ *shared lock*, sperrt Schreibzugriff für alle anderen Transaktionen
- Kompatibilität: Für ein Objekt darf es nur eine Schreibsperre oder mehrere Lesesperren geben
- Unlock für alle Sperrarten

- **Legalität** eines Schedules: übernimmt Kompatibilitätsforderung (nicht mehrere Schreibsperren gleichzeitig, mehrere Lesesperren aber erlaubt)

## Weitere Sperrarten
- **Upgrade einer Sperre** von Lesesperre zu Schreibsperre
- **Updatesperre:** zunächst nur Lesesperre, kann aber Upgrade erfahren (sozusagen vorgemerkt für den Scheduler), normale Lesesperren dann entsprechend ohne Upgrades
- **Inkrementsperre:** eigentlich Lesesperre, erlaubt aber Schreibzugriff, wenn Werte ausschließlich inkrementiert oder dekrementiert werden (Inkremente kommutativ, Vertauschung erlaubt)

## Aborts
**Fehlererholung:** Bei Abbruch (*abort*) in einer Transaktion ist *dirty read* trotz Serialisierbarkeit möglich $\Rightarrow$ *Cascading rollback*
- Ein Schedule ist *recoverable*, falls alle Transaktionen erst commiten, falls alle Transaktionen, von denen sie gelesen hat, commited werden
- Ein Schedule *vermeidet Cascading rollbacks*, falls Transaktionen nun Daten von Transaktionen lesen dürfe, die commited sind

**In DBS:** Wir gehen nicht davon aus, dass es *aborts* gibt bzw. kümmern uns nicht um diese (innerhalb des DBMS)

---
# Anfragebearbeitung und -optimierung
DBMS: muss deklarative Anfrage (mengenorientiert) in prozedurale Form übersetzen $\Rightarrow$ Anfrageplan / **Query Execution Plan** (QEP | schnell, geringer Ressourcenverbrauch)

Unser Ziel: **Möglichst kleine Zwischenergebnisse**, dadurch meist auch schnell
## Ablauf
1. Parsing (Syntax, Semantik, Parsebaum)
2. Wahl des logischen Anfrageplans (interne Baum-Darstellung mit relationaler Algebra, Wahl des optimalen Plans, Reihenfolge der Schritte)
3. Wahl des physischen Anfrageplans (Wahl der einzelnen Algorithmen, physische Optimierung)

## Parsing: Syntaxanalyse / Parsebaum
**Blätter / Atome:** Schlüsselworte, Konstanten, Namen (Relationen + Attribute), Syntaxzeichen, Operatoren
**Syntaktische Kategorien:** Namen für Teilausdrücke einer Anfrage (ggf. rekursiv verschachtelt)

**BNF-Grammatik:**
- Aufbau des Parsebaums, damit syntaktische Prüfung

![[Screenshot from 2024-08-02 00-17-44.png]]

- anschließend semantische Prüfung
- abschließend entsprechende Übersetzung in Operatorbaum (relationale Algebra)

## Transformationsregeln der relationalen Algebra
Zwei Ausdrücke sind **äquivalent**, falls sie die gleichen Operanden (Relationen) verwenden und stets die **gleiche Antwortrelation** liefern
- **stets:** für jede mögliche Instanz der Datenbank
- $\times$ (Kreuzprodukt), $\cup$, $\cap$, $\bowtie$ sind kommutativ und assoziativ (sowohl für Mengen als auch Multimengen)

**Regeln für Selektion und Projektion:**
![[Screenshot from 2024-08-02 00-18-34.png]]

---
# Optimierung
- **Regelbasierte Optimierung:** fester Regelsatz, heuristische Priorisierung unter den Regeln
- **Kostenbasierte Optimierung:** Kostenmodell, Transformationen sollen Kosten verringern

Optimaler Plan meist schwer zu finden, Ziel ist eine einigermaßen effiziente Variante (*avoid the worst case*)

**Optimierungsphasen:**
- **Logische Optimierung:** Auswahl unter semantisch äquivalenten Ausdrücken
- **Physische Optimierung:** Tatsächlich gewählte Implementierung für die einzelnen Operatoren (verschiedene Algorithmen z.B. für Joins, Indizes, sortierter Zugriff, etc.)
- Beide **Phasen** sind **voneinander abhängig** (z.B. besondere Merge-Algorithmen für sortierte Daten)

## Regelbasierte Optimierung
leichter zu implementieren, kleine Systeme

**Beispielregeln:**
- Selektionen so weit wie möglich im Baum nach unten schieben
- Selektionen mit `AND` aufteilen und separat verschieben
- Projektionen so weit wie möglich im Baum nach unten schieben
- Duplikateliminierung ggf. entfernen oder verschieben
- Kreuzprodukte ggf. mit Selektionen zu Join zusammenfassen
	- aber keine Information zu optimaler Join-Reihenfolge

**Ziel:** Große Zwischenergebnisse vermeiden
- Auswertung im Baum: von unten nach oben

**mySQL Explain u.ä.:** Stellen Anfragepläne graphisch dar

---
# Kostenmodelle
## Kostenbasierte Optimierung
- Konzeptionell: Ale denkbaren Anfrageausführungspläne erzeugen
- jeweils Kosten bestimmen
	- Statistiken und Histogramme
	- Hardware-spezifische Einflüsse, verfügbarer Speicher
	- meist **Durchsatz-maximierend** und **nicht Antwortzeit-minimierend** (korreliert aber oft)
- Kostengünstigsten Plan ausführen
	- bei $n$ Tabellen gibt es $\frac{(2(n-1))!)}{(n-1)!}$ Bushy-Pläne $\Rightarrow$ nicht zu viel optimieren, guter Plan genügt (es gibt meist sehr schlechte und sehr gute Pläne)
- Optimierungsproblem ist NP-schwer
	- **effizient** = polynomiell, also insbesondere nicht exponentiell

## Kostenmodell
**Eingaben:**
- Algebraischer Audruck
- DB-Kardinalitäten
- Attributwertverteilungen
- Index-Informationen
- Ballungs-Informationen (Clustering on disk)
	- ggf. weit verstreut, ggf. sogar sortiert

**Ausgabe:**
- Ausführungskosten

## Hilfreiche Statistiken
- Basisrelation: Anzahl Tupel, Tupelgröße
- Attribute: Min / Max, Anzahl der *distinct* Werte ("Kardinalität"), Werteverteilung (Histogramme)
	- oft auch zweit-größter bzw. zweit-kleinster Wert, da Min und Max auch Default-Werte sein können (z.B. Jahr 1000)
- System: Speichergröße. Bandbreite, I/O-Zeiten, CPU-Zeiten
- werden meist nur explizit / manuell initiiert (Erstellung + Update erzeugt hohe Kosten)
	- `runstats()`

## Kosten von Operationen
**Projektion:** Keine Kosten, sofern mit anderem Operator kombiniert

**Selektion:**
- Ohne Index: Gesamte Relation von Festplatte lesen
- Mit Baum-Index: Teil des Index von Platte lesen (Baumtiefe)
- Bei Pipelining (Daten werden von anderer Operation gelesen): (Fast) keine Kosten

**Join:** Je nach Joinalgorithmus (Nested Loops, Hash-Join, Sort-Merge Join, usw.)

**Sortierung:** Nicht hier

**Wesentliches Kostenmerkmal:** Anzahl der Tupel im Input
- Passt die Relation in den Hauptspeicher?
- Selektion, Projektion, Sortierung, Join
- Input-Größe ist Output-Größe des vorherigen (tiefer im Baum) Operators
	- $\Rightarrow$ Kostenmodell schätzt Output-Größe (Anzahl der Ausgabetupel)
	- **Selektivität** in Bezug auf Inputgröße
	- *#* Ausgabetupel = *#* Eingabetupel $\times$ Selektivität (auch Selektivitätsfaktor, *selectivity factor*, *sf*)

## Selektivität
**Projektion:** $sf = |R| / |R| = 1$

**Selektion:** $sf = |\sigma_C(R)| / |R|$
- Selektion auf einen Schlüssel: $sf = 1 / |R|$
- Selektion auf einem Attribut $A$ mit $m$ verschiedenen Werten: $sf = (|R| / m) / |R| = 1 / m$ (*Achtung:* Schätzung)

**Join:** $sf = |R \bowtie S| / |R \times S| = |R \bowtie S| / (|R| \cdot |S|)$
- **Equijoin** zwischen $R$ und $S$ über **Fremdschlüssel** in $S$: $sf = |R \bowtie S| / (|R \times S|) = |S| / (|R| \cdot |S|) = 1 / |R|$
- **Equijoin** über **beliebiges Attribut** zwischen $R$ und $S$: $sf = 1 / max(|R|, |S|)$
	- "Die Schlüsselseite ist ausschlaggebend"

## Weitere Modelle
**Gleichverteilung der Werte:**
- platzsparend (count, max, min), einfach
- Schlechte Abschätzung bei "skew" (ungleiche Verteilung)

**Histogramme:**
- Parametrisierte Größe, einfach
- Feinheit (Histogrammtyp und -größe) festlegbar
- Aktualität garantieren ist aufwendig

**Sampling:**
- Repräsentative Teilmenge der Relation
- Parametrisierte Größe, schwierig zu finden
- Feinheit festlegbar
- Aktualität aufwendig

## Weitere Komplikationen
- Parallelität / **Pipelining**: Kosten aller Operatoren sollten nicht addiert werden
- **Haupspeichergröße:** Pufferung und Caching
- I/O-Kosten (Lesen einer Seite) vs. **CPU-Kosten**
- Multiuser: **Durchsatz** statt Antwortzeit

$\Rightarrow$ Kostenmodelle sind **hochkomplex**







