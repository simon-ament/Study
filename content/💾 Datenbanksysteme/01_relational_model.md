---
title: Relationales Modell
---
# Phasen des Datenbankentwurfs
1. **Anforderungsanalyse:** Sammlung des Informationsbedarfs in den Fachabteilungen
2. **Konzeptioneller Entwurf:** Erste *formale* Beschreibung des Fachproblems $\Rightarrow$ [[01_relational_model#ER-Diagramme|ER-Modell]]
	- Auflösung von Namenskonflikten, Typkonflikten, Wertebereichskonflikten, Bedingungskonflikten und Strukturkonflikten
3. **Verteilungsentwurf:** Art und Weise der verteilten Speicherung (optional) festlegen
	- vertikale vs. horizontale Partitionierung
4. **Logischer Entwurf:** Datenmodell des ausgewählten DBMS in logischem (nicht physischem) Schema darstellen
	- ER $\rightarrow$ [[01_relational_model#Relationales Modell|Relationales Modell]]
	- [[01_relational_model#Normalisierung|Normalisierung]] (Redundanzvermeidung)
6. **Datendefinition:** Umsetzung des logischen Schemas in ein relationales Schema
	- [[04_sql#Schemata (DDL)|DDL]] und [[04_sql#Datenbearbeitung (DML)|DML]] (z.B. SQL) nutzen
	- ggf. bereits `views` erstellen (Anforderungen der Anwendung testen)
7. **Physischer Entwurf:** DBMS nimmt automatisiert physischen Entwurf vor (echte Daten auf der Festplatte)
	- ggf. Einrichtung von [[04_sql#Indizes|Indizes]]
8. **Implementierung und Wartung:** Anpassungen, Wartung, Tuning, Portierung (neues Datenbankmanagementsystem) etc.
	- kosten- und zeitaufwendigste Phase

**Wichtigkeit des Entwurfs:** Verwendung für viele Jahre, Redundanz und unnötige Daten vermeiden, etc.

---
# ER-Diagramme
- Entitytypen + Entities (Objekt der realen Welt oder Vorstellungswelt)
- Relationshiptypen + Relationships (zwischen obigen Entitäten, meist binär)
- Attribute (sowohl an )

![[Pasted image 20240626000314.png]]

- wir betrachten IST-Beziehung nur als Bäume
- Entities aus der Subklasse sind auch in der Superklasse repräsentiert
- Entities sind in allen Subklassen repräsentiert, in die sie gehören

**Nebenbedingungen:** sind Teil des Schemas, nicht der Daten. Dazu gehören:
- Schlüssel
- referenzielle Integrität (Existenz referenzierter Objekte)
- Domänen (eingeschränkte Wertebereiche)
- [[05_integrity_trigger#Assertion|Assertions]] und ähnliches

---
# Schlüssel
Minimale Menge an Attributen eines Entitytyps, sodass **keine zwei** Entities in **allen Schlüsselattributen** übereinstimmen (natürlich vs. nicht natürlich / generiert wie z.B. ID)
- für jeden Entitytp **muss** ein Schlüssel angegeben werden
- es kann mehrere Schlüssel für einen Entitytyp geben, dann wird üblicherweise ein **Primärschlüssel** ausgewählt (in ER-Diagramm nur ein Schlüssel darstellbar)
- bei IST-Beziehungen müssen sämtliche Schlüsselattribute in der Wurzel-Superklasse enthalten sein

**Fehlende Schlüssel** wirken **kapazitätserhöhend** (unerlaubte Tupel sind dadurch möglich) \
**Zusätzliche Schlüssel** wirken **kapazitätsvermindernd** (erlaubte Tupel werden dadurch unmöglich)

---
# Referenzielle Integrität
offener Pfeil: → (genau ein) \
sonst geschlossener Pfeil: --▸ (höchstens ein)

**Beispiel:** n:1 Relationship zwischen "Film" und "Studio"
- Ein Film gehört zu genau einem Studio (mit *RI*)
- Ein Film gehört zu höchstens einem Studio (ohne *RI*)

**Erzwingung der RI:** DBMS-spezifisch (z.B. Studio mit Filmen darf nicht gelöscht werden / Filme werden mit Studio gelöscht)

---
# Relationen
- Eine Relation ist eine Menge an $n$-Tupeln
- Dinge, die in der Relation $R$ stehen, bilden ein $n$-Tupel, das Element von $R$ ist
- Teilmenge des kartesischen Produkts
	- $R \subseteq A_1 \times \dots \times A_n$
	- Mengen $A_1, \dots, A_n$ sind Domänen (Wertebereiche wie z.B. Integer, String, Boolean, etc.)
	- Tupel $(a_1, \dots, a_n)$ sind Datenwerte

---
# Relationales Modell erstellen
**Grundidee:** Jeder Entitytyp und jeder Relationshiptyp wird mit seinen Attributen eine Relation übersetzt.
- Relationshiptypen übernehmen zusätzlich **Schlüsselattribute der beteiligten Entitytypen** und **müssen** bei doppelten Bezeichnungen **umbenannt** werden
- **Zusammenlegen von Relationen** bei 1:n-Beziehung möglich (inklusive Sonderfall 1:1)

*Achtung:* Gleiches Schema bei Relationen bedeutet nicht gleiche Domäne / Bedeutung

## Schwache Entitytypen
- Relation des *schwachen Entitytypen* muss Schlüssel aller relevanten Entitytypen enthalten 
	- $\Rightarrow$ **schwacher Relationshiptyp** ist **redundant**, **normaler Relationshiptyp** übernimmt auch alle **relevanten Schlüssel** (Zweck: Identifizierung)

*Achtung:* Wenn ein Relationshiptyp einen Entitytyp vollständig umfasst, kann letzterer dennoch benötigt werden, falls gar keine Relationships für die Entity auftreten (Entity kann ohne Relationship sonst nicht dargestellt werden)

## IST-Beziehung (Spezialisierung)
**Keine eigene Relation** für IST-Beziehung! Stattdessen:
1. **ER-Stil:** Eigene Relationen für Entitytpen jeder Hierarchiebene
	- $n$ Relationen
	- ggf. große Redundanz => großer Speicherbedarf
	- Anfragen an Wurzelentitätstyp schnell, spezifische Anfragen nur mithilfe von Joins über die Relationships
2. **Objekt-orientierter Stil:** Eigene Relation für jede mögliche Kombination aus vorliegenden Spezialisierungen (Abhilfe etwa mithilfe von Views)
	- $O(2^n)$ Relationen
	- geringster Speicherbedarf, da keine Redundanz
	- Anfragen an Wurzelentitätstyp nur über (nicht so teure) Unions möglich, spezifischere Anfragen schneller
3. **Nullwert-Stil:** Eine einzige Relation mit allen möglichen Attributen, möglicherweise mit `NULL`-Wert belegt (ggf. Informationsverlust durch "natürliche" `NULL`-Werte, Lösung: zusätzliche Attribute)
	- $1$ Relation
	- ggf. zahlreiche Nullwerte => großer Speicherbedarf
	- keine (teuren) Joins notwendig, alle Anfragetypen leicht zu bearbeiten

![[Pasted image 20240626000338.png]]

---
# Normalisierung
## Funktionale Abhängigkeiten (FDs)
$X \rightarrow A$: $X$ bestimmt $A$ funktional, also Übereinstimmung in der Attributmenge $X$ $\Rightarrow$ Übereinstimmung in der Attributmenge $A$
- Schreibweise: auch $XYZ \rightarrow ABC$ statt $\{X, Y, Z\} \rightarrow \{A, B, C\}$ erlaubt
- Funktionale Abhängigkeiten sind **Eigenschaften des Schemas, nicht der Instanz** (spezifische Daten)
- **Dekomposition** (rechte Seite auseinanderziehen) und **Vereinigung** (rechte Seite verbinden) erlaubt
- FDs sind **transitiv** (FD-Ableitung)

### Herkunft von FDs
- aus der **Deklaration** eines **Schlüssels**
- aus der **Deklaration** von **FDs**, z.B. durch Expertenwissen
- aus den **Naturwissenschaften**, z.B. Einhaltung physikalischer Gesetze
- aus einem **ER-Diagramm** über markierte Schlüsselattribute
- **Data Profiling:** alle FDs entdecken und die "besten" als echt deklarieren

### Triviale FDs
- **trivial:** Attribute rechts sind Teilmenge der Attribute links
- **nicht-trivial:** rechts ein Attribut, das links nicht vorkommt
- **völlig nicht-trivial:** beide Attributmengen disjunkt

## Schlüssel ([[01_relational_model#Schlüssel|neu definiert]])
Eine Attributmenge ist ein Schlüssel einer Relation $R$, wenn sie alle (anderen) Attribute von $R$ funktional bestimmt und keine echte Teilmenge der Attributmenge ebenfalls diese Eigenschaft hat
- $\Rightarrow$ ein Schlüssel ist also stets minimal (in Bezug auf Teilmengen)
- **kleinster Schlüssel:** der Schlüssel mit den wenigsten Attributen
- **Superschlüssel:** Attributmenge, die einen Schlüssel enthält
- bei mehreren Schlüssel wird meist ein **Primärschlüssel** ausgewählt

## FD-Mengen
Zwei Mengen $S$ und $T$ an FDs heißen **äquivalent**, wenn die Menge der gültigen Instanzen unter $S$ und $T$ jeweils gleich sind.

Eine Menge $S$ an FDs **folgt aus** einer Menge $T$ an FDs, falls jede unter $T$ gültige Instanz auch unter $S$ gültig ist.

## Hüllenbildung
Gegeben eine Menge an Attributen $A_1, A_2, \dots, A_k$ und eine Menge an FDs $S$.
- Die **Hülle** von $A_1, A_2, \dots, A_k$ unter $S$ ist die Menge $Y$ aller Attribute für die gilt, dass für jede unter $S$ gültige Relation auch $A_1, A_2, \dots, A_k \rightarrow Y$ gilt
	- also Menge der funktional ableitbaren Attribute
- Notation: Hülle von $A_1, A_2, \dots, A_k$ ist $\{A_1, A_2, \dots, A_k\}^+$ 
- Berechnung: Wiederholt nach anwendbaren FDs suchen

### Basis
Eine Menge an FDs, aus der **alle anderen FDs abgeleitet** werden können
- Wenn keine echte Teilmenge der Basis wiederum eine Basis ist, dann ist die Basis **minimal**

## Armstrong-Axiome
- Axiomatisieren FDs und ihre Ableitung
- korrekt, vollständig und minimal (d.h. kein Axiome aus den anderen herleitbar)

1. **Reflexivität:** $X \subseteq Y \Rightarrow X \rightarrow Y$ (triviale FDs)
2. **Akkumulation:** $X \rightarrow Y \Rightarrow XZ \rightarrow YZ$
3. **Transitivität:** $X \rightarrow Y, Y \rightarrow Z \Rightarrow X \rightarrow Z$

## FDs nach Projektionen
- Gegeben eine Relation $R$ mit Menge $F$ an FDs. Sei $S$ das Ergebnis nach Entfernung einiger Attribute aus $R$ ("Projektion")
- Für $S$ gelten alle FDs, die aus $F$ folgen und nur Attribute aus $S$ verwenden
- **Algorithmus:** Hülle jeder Teilmenge von $S$ mit den FDs aus $F$ bilden und daraus resultiernde FDs überprüfen. Tricks:
	1. Hülle der leeren Menge und Menge aller Attribute muss nicht gebildet werden
	2. Falls die Hülle von $X$ alle Attribute enthält, gilt das auch für alle Supermengen von $X$ (müssen also nicht mehr betrachtet werden)

---
# Redundanzvermeidung
## Anomalien durch Redundanz und schlechtes Design
- Redundanz kann zu **Update-Anomalien** führen (nicht alle redundanten Informationen werden geändert)
- Redundanz kann zu **Insert-Anomalien** führen (neue Informationen widersprechen bereits gespeicherten)
- Bei **Delete-Anomalien** werden mehr Informationen gelöscht als gewollt (zu viele Informationen in einem Tupel enthalten, stattdessen aufteilen)

## Dekomposition
Aufteilung einer Relation $R$ in zwei Relationen $S$ und $T$
- es muss $\{A_1, A_2, \dots, A_n\} = \{S_1, S_2, \dots, S_n\} \cup \{T_1, T_2, \dots, T_n\}$ gelten
	- Überlappung erlaubt, z.B. für Schlüssel sinnvoll
- die neuen Relationen dürfen nur durch Projektionen entstehen (also Attributwerte werden ausschließlich übernommen)

## Boyce-Codd-Normalform
- Eine Relation ist in BCNF genau dann, wenn für jede nicht-triviale FD ist die linke Seite der FD ein *beliebiger* Superschlüssel (inklusive minimale Schlüssel) ist

## Dekomposition für BCNF
- beruhend auf FDs, die keinen Schlüssel als Teilmenge in der linken Seite haben (*verletzende FDs*)
- dabei **rechte Seite** der FD **möglichst groß** wählen (**expandieren** durch Hüllenbildung)
	- Beispiel: $A_1A_2\dots A_n \rightarrow B_1B_2\dots B_n$
- **neue Relation:**
	1. $A_1,A_2\dots A_nB_1B_2\dots B_n$
	2. $A_1,A_2\dots A_n$ + alle anderen Attribute (weder $A$ noch $B$)
- **wiederherstellbar** durch Join (über die gemeinsamen Attribute auf der linken Seite der FD)
