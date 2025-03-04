---
title: Relationale Algebra
---
**Anfrage** erzeugt aus Basisrelationen ein "abgeleitetes" **Relationenschema mit virtuellen** (nirgendwo dauerhaft gespeicherten) **Relationen**

## Kriterien für Anfragesprachen
- **Ad-Hoc-Formulierung:** Benutzer soll eine Anfrage formulieren können, ohne ein vollständiges Programm schreiben zu müssen.
- **Eingeschränktheit:** Anfragesprache soll keine komplette Programmiersprache sein (**dennoch:** SQL-Standarn besteht aus 1300 Seiten)
- **Deklarativität:** Benutzer soll formulieren „Was will ich haben?“ und nicht „Wie komme ich an das, was ich haben will?“
- **Optimierbarkeit:** Anfragesprache besteht aus wenigen Operationen und es gibt Optimierungsregeln für die Operartorenmenge.
- **Effizienz:** Jede einzelne Operation ist effizient ausführbar.
- **Abgeschlossenheit:** Anfragen werden auf Relationen ausgeführt und Anfrageergebnisse sind wiederum Relationen und können als Eingabe für die nächste Anfrage verwendet werden.
- **Mengenorientiert:** Operationen auf Mengen von Daten und nicht navigierend auf einzelnen Elementen ("tuple-at-a-time").
- **Adäquatheit:** Alle Konstrukte (Relationen, Attribute, Schlüssel) des zugrundliegenden Datenmodells werden unterstützt
- **Vollständigkeit:** Sprache muss mindestens die Anfragen einer Standardsprache (z.B. relationale Algebra) ausdrücken können.
- **Sicherheit:** Keine Anfrage, die syntaktisch korrekt ist, darf in eine Endlosschleife geraten oder ein unendliches Ergebnis liefern.

---
# Mengen vs. Multimengen
Relation (logisch): **Menge** von Tupeln:
- kein Element kann mehrfach in einer Menge vorkommen (enthalten oder nicht enthalten)
- **Relationale Algebra** verwendet Mengensemantik (explizite Ausnahmen möglich)

Datenbanktabelle (physisch): **Multimenge** von Tupeln:
- in einer Multimenge kann dasselbe Element mehrfach enthalten sein
- hat Einfluss auf **Effizienz**-Überlegungen

---
# Basisoperatoren
**Begriffe:** Ausdrücke der relationalen Algebra (Kombination von Operatoren und Operanden) = **Anfrage / Query**

## Mengenoperatoren
Es wird jeweils ein **gemeinsames Schema** benötigt
- Namen, Typen, Reihenfolge | ggf. umbenennen

**Vereinigung:** Sammelt Elemente zweier Relationen auf und *entfernt Duplikate*
- *union* , $\cup$

**Differenz:** Eliminiert Tupel aus der ersten Relation, die auch in der zweiten Relation vorkommen
- *difference* , $-$, $\setminus$

**Schnittmenge:** Ergibt die Menge aller Tupel, die in beiden Relationen gemeinsam vorkommen
- *intersection*, $\cap$
- lässt sich aus Vereinigung und Differenz darstellen: $R \cap S = R - (R - S)$ oder umgekehrt

## Entfernende Operatoren
**Projektion:**
- erzeugt eine neue Relation, aber mit einer Teilmenge der Attribute
- *projection*, $\pi$
- unärer Operator
- Es können *Duplikate* entstehen, die *implizit entfernt* werden

**Erweiterte Projektion:**
- vorher $\pi_L(R)$ wobei $L$ eine Attributliste ist
- nun Elemente von $L$ einer dieser drei Ausdrücke:
	1. Ein Attribut $R$ (wie vorher)
	2. Ein Ausdruck $A \rightarrow B$ mit Attributen $A$ und $B$ (Umbenennung)
	3. Ein Ausdruck $e \rightarrow C$, wobei $e$ ein Ausdruck mit Konstanten, arithmetischen Operatoren, Attributen von $R$ und String-Operationen ist, und $C$ ein neuer Name ist.

**Selektion:**
- *selection*, $\sigma$
- unärer Operator
- erzeugt neue Relation mit gleichem Schema, aber einer Teilmenge der Tupel, die der Selektionsbedingung $C$ (*condition*) entsprechen
- Als Operanden der Selektionsbedingung nur Konstanten oder Attribute (Verknüpfung logisch oder über Vergleiche)
- Selektion $\neq$ `SELECT`

## Kombinierende Operatoren
**Kartesisches Produkt:**
- *cartesian product, cross product*, $\times$
- auch: Kreuzprodukt oder Produkt
- Kreuzprodukt zweier Relationen $R$ und $S$ ist die Menge aller Zwei-Tupel / Paare mit erstem Element aus $R$ und zweitem Element aus $S$
- Attribute aus $R$ und $S$ werden allesamt übernommen, bei Namensgleichheit wird umbenannt (z.B. `R.B` und `S.B`)

### Join - Operatorfamilie
**Natürlicher Join:**
- *natural join*, $\bowtie$
- Statt im Kreuzprodukt alle Paare zu bilden, sollen nur Tupelpaare gebildet werden, deren Tupel "irgendwie" **übereinstimmen** (Tupel kann weiterhin mehrere Join-Partner finden)
- Beim natürlichen Join: Übereinstimmung in allen **gemeinsame Attributen** (gleicher Attributname), ggf. in Verbindung mit Umbenennungen
- $R \bowtie S = \sigma_{r[A_1, \dots, A_k] = s[A_1, \dots, A_k]}(R \times S)$, mit $r[A]$ die Projektion des Tupels $r$ auf das Attribut $A$ (anstatt $\pi$-Notation)
	- zusätzlich noch **Projektion der gemeinsamen (doppelten) Attribute**

**Theta-Join:**
- *theta-join*, $\bowtie_\theta$
- Verallgemeinerung des Joins
- Verknüpfungsbedingung nicht implizit Gleichheit, sondern explizit anzugeben
- **Schema:** Wie beim Kreuzprodukt (**Projektion** der doppelten Attribute **nicht enthalten**, bei Doppelung wird **Umbenennung** vorgenommen)
- **Equi-Join:** Spezialfall des Theta-Join mit Operator $=$
- **Natural Join:** Spezialfall des Theta-Join, aber mit anderem Schema

## Umbenennung
Verändert nicht Tupel, sondern Schema

**Umbenennung:**
- *rename*, $\rho$
- unärere Operator
- $\rho_{S(A_1, \cdots, A_n)}(R)$ benennt Relation $R$ in $S$ um und benennt die Attribute der neuen Relation $A_1, \dots, A_n$
- `AS` in SQL

## Komplexe Ausdrücke
- Kombination (Schachtelung) von Ausdrücke zur Formulierung komplexer Anfragen
- Relationale Algebra ist abgeschlossen $\Rightarrow$ Ergebnis stets wieder Relation
- Darstellung geschachtelt mit Klammern oder als Baum (für komplexere Anfragen übersichtlicher)

---
# Unabhängigkeit und Vollständigkeit
Minimale Relationenalgebra: $\pi, \sigma, \times, -, \cup$ (und $\rho$)
- Unabhängigkeit: Kein Operator kann weggelassen werden, ohne Vollständigkeit zu verlieren
- Natural Join, Join und Schnittmenge sind redundant

---
# Operatoren auf Multimengen
**Multimengen** (*bag*, *multiset*) erlauben Duplikate
- Duplikate treten insbesondere in Anfrageergebnissen auf (da DBMS auf Multimengen arbeiten)
- **Duplikate entfernen ist teuer:** am effizientesten entweder über Sortierung oder Hash-Verfahren
- Operatoren werden **effizienter**
	- Keine Duplikat-Entfernung bei Vereinigung, Projektion
	- Bei Aggregation ist Duplikateleminierung unintuitiv (bzw. sogar schädlich)

## Besonderheiten
- **Schnittmenge auf Multimengen:**
	- Tupel $t$ erscheine $n$-mal in $R$ und $m$-mal in $S$
	- Tupel $t$ erscheint $\min(n,m)$-mal in $R \cap S$
- **Differenz auf Multimengen:**
	- Tupel $t$ erscheine $n$-mal in $R$ und $m$-mal in $S$
	- Tupel $t$ erscheint $\max(0, n-m)$-mal in $R - S$
- **Projektion auf Multimengen:**
	- es können neue Duplikate entstehen
	- Tupel $t$ erscheine $n$-mal in $R$
	- Tupel $t$ erscheint mindestens $n$-mal nach Projektion
- **Selektion auf Multimengen:**
	- bereits vorhandene Duplikate bleiben erhalten, sofern sie selektiert werden
	- Tupel $t$ erscheine $n$-mal in $R$
	- Tupel $t$ erscheint $n$-mal oder keinmal nach Selektion
- **Kreuzprodukt auf Multimengen:**
	- Tupel $t$ erscheine $n$-mal in $R$ und Tupel $u$ $m$-mal in $S$
	- Tupel $tu$ erscheint $n \cdot m$-mal in $R \times S$
- **Joins auf Multimengen:**
	- keine Überraschungen

---
# Erweiterte Operatoren
**Duplikateliminierung:**
- in Mengensemantik unnötig
- *duplicate elimination*, $\delta$

**Aggregation:**
- fasst Werte einer Spalte zusammen (operiert also auf Menge / Multimenge von atomaren Werten)
- z.B. Summe (`SUM`), Durchschnitt (`AVG`), Minimum (`MIN`), Maximum (`MAX`), Anzahl (`COUNT`)
- nicht im SQL-Standard, aber meist mitgeliefert: `STDDEV` und `VARIANCE`

**Gruppierung:**
- *group*, $\gamma$
- Partitionierung der Tupel einer Relation gemäß ihrer Werte in einem oder mehreren Attributen
- $\gamma_L(R)$, wobei $L$ eine Menge von Attributen ist. Ein Element von $L$ ist entweder ein Gruppierungsattribut oder ein Aggregationsoperator auf ein Attribut von $R$ (inkl. neuem Namen für das aggregierte Attribut)

**Sortierung:**
- *sort*, $\tau$
- Sortiert nach Attributliste $L$

**Semi-Join:**
- $\ltimes$
- Gewissermaßen ein Filter, welche Tupel überhaupt einen Join-Partner haben
- Join über $R$ und $S$, wobei nur die Attribute von $R$ interessant sind (also die geschlossene Seite des $\ltimes$)

**Outer joins / Äußere Verbünde:**
- Übernahme von *dangling tuples* (keine Join-Partner gefunden) in das Ergebnis und Auffüllen mit `NULL`-Werten (*padding*, auch $\perp$)
- **Full outer join ($|\bowtie|$):** Übernimmt alle Tupel beider Operanden
- **Left outer join ($|\bowtie$):** Übernimmt alle Tupel des linken Operanden, ggf. mit `NULL`-Werten
- **Right outer join ($\bowtie |$):** *analog*
