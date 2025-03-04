---
title: Integrität und Trigger
---
Aktive Datenbanken: Integritätsbedingungen werden aktiv überwacht
- einmal spezifizieren, wann immer nötig automatisch ausführen
- beugt typographischen und logischen Fehlern vor

---
# Schlüssel und Fremdschlüssel
- Ein oder mehrere Attribute können einen Schlüssel bilden
- Falls $S$ die Schlüsselmenge ist, müssen sich zwei Tupel in mindestens einem Attributwert der Schlüsselmenge unterscheiden
- Primärschlüssel: `PRIMARY KEY`
	- maximal einer pro Relation
	- zwei Tupel müssen sich in mindestens einem Attributwert der Primärschlüsselattribute unterscheiden
	- dürfen keinen `NULL`-Wert haben
- (Sekundär-)Schlüssel: `UNIQUE` oder `UNIQUE NOT NULL`
	- es darf mehrere `UNIQUE`-Deklarationen geben
	- kann mit Fremdschlüssel referenziert werden
	- NULL-Werte erlaubt (außer bei `NOT NULL`)

Primärschlüssel bei einem Attribut (direkt hinter Attribut, `UNIQUE` analog):
```sql
CREATE TABLE Schauspieler( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255), 
	Geschlecht CHAR(1), 
	Geburtstag DATE);
```

Primärschlüssel bei mehreren Attributen (nach den Attributen, `UNIQUE` analog):
```sql
CREATE TABLE Schauspieler( 
	Name CHAR(30), 
	Adresse VARCHAR(255), 
	Geschlecht CHAR(1), 
	Geburtstag DATE, 
	PRIMARY KEY (Name, Adresse) );
```

Schlüsselbedingungen müssen stets gelten:
- relevant nur bei `INSERT` und `UPDATE`
- effiziente Prüfung mittels Index
- DBMS legen i.d.R. **automatisch Indizes für Primärschlüssel** an, optional auch für `UNIQUE`-Attribute
- ohne Index: binäre Suche (bei sortierten Daten), sonst sequentielle Suche

---
# Referentielle Integrität
- Ein Attribut / eine Attributmenge kann als `FOREIGN KEY` deklariert werden
	- referenzierte Attributmenge muss `UNIQUE` oder `PRIMARY KEY` sein
- Ein Fremdschlüssel darf den Wert `NULL` haben
- keine *dangling tuples*

Fremdschlüssel auf einem Attribut:
```sql
CREATE TABLE Studios( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255), 
	VorsitzenderID INT REFERENCES Manager(ManagerID));
```

Fremdschlüssel auf einem oder mehreren Attributen:
```sql
CREATE TABLE Studios( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255), 
	VorsitzenderID INT, 
	FOREIGN KEY (VorsitzenderID) REFERENCES Manager(ManagerID));
```

Referenzielle Integrität erzwingen (Optionen):
1. verletzende Änderung ablehnen (SQL default)
2. Kaskadierung (Operation weiterreichen)
3. `NULL`-Werte (Verletzungen werden aufgehoben)
- `NULL`-Wert-Strategie und Kaskadierung in ähnlichen Fällen anwendbar (`DELETE` und `UPDATE`), nur Form der Anwendung unterscheidet sich
	- es werden dabei nie neue Tupel erstellt, sondern lediglich gelöscht oder `NULL`-Werte eingesetzt

Strategie kann je nach Situation gewählt werden;
```sql
CREATE TABLE Studios( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255), 
	VorsitzenderID INT REFERENCES Manager(ManagerID) 
	ON DELETE SET NULL 
	ON UPDATE CASCADE 
);
```

Es ist nicht immer möglich, Tupel einzufügen, die der referentiellen Integrität gehorchen
- dann in richtiger Reihenfolge einfügen oder `NULL`-Werte verwenden (werden nicht auf referentielle Integrität geprüft)
- bei zyklischen Integritätsbedingungen nicht möglich
	- dann mehrere Operationen zu **Transaktion** zusammenfassen und **Integritätscheck** bis zum Ende der Transaktion **verschieben**

## Integritätschecks verschieben
- Jeder Constraint kann `DEFERRABLE` oder `NOT DEFERRABLE` (default) sein
- `INITIALLY DEFERRED`: Verschieben bis ans Ende der Transaktion oder bis wir die Verschiebung aufheben
- `INITIALLY IMMEDIATE`: Zunächst nichts verschieben, bis wir Verschiebung verlangen

---
# Bedingungen auf Attributen und Tupeln
- einzelne Attribute: `NOT NULL` oder `CHECK`
- ganze Tupel: `CHECK`

**Attribut-basierte `CHECK`-Bedingung:**
- Bedingung beliebig komplex (`WHERE` oder sogar `SELECT ... FROM ... WHERE ...`)
- i.d.R eine einfache Einschränkung der Werte
- Check wird bei `INSERT` und `UPDATE` auf dem jeweiligen Attribut geprüft
- muss `TRUE` oder `FALSE` zurückgeben (z.B. mit `IN`, oder arithmetischen Operatoren)
- darf sich auch auf andere Attribute beziehen (eigene SQL-Anfrage)
	- ggf. wird die `CHECK`-Bedingung dadurch allerdings später ungültig, ohne dass sie erneut überprüft wird (Änderung in referenzierter Relation)

```sql
CREATE TABLE Studios( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255) NOT NULL, 
	VorsitzenderID INT REFERENCES Manager(ManagerID) 
		CHECK (VorsitzenderID >= 100000) 
	);

CREATE TABLE Studios( 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255) NOT NULL, 
	VorsitzenderID INT CHECK ( VorsitzenderID IN 
		(SELECT ManagerID FROM Manager)) 
	);
```

**Tupel-basierte `CHECK`-Bedingung:**
- wird geprüft bei jedem `INSERT` und jedem `UPDATE` eines Tupels, aber nur auf diesem Tupel
- bei komplexen Bedingungen daher eher `ASSERTION` verwenden

```sql
CREATE TABLE Schauspieler ( 
	Anrede CHAR(10), 
	Name CHAR(30) PRIMARY KEY, 
	Adresse VARCHAR(255), 
	Geschlecht CHAR(1) CHECK (Geschlecht IN (‘W‘, ‘M‘, ‘D‘)), 
	Geburtstag DATE, 
	CHECK (Geschlecht = ‚W‘ OR Anrede NOT LIKE ‚Fr%‘ ) );
```

**Bedingungen ändern:**
- zur Änderungen der Bedingungen müssen Namen vergeben werden (meist intern sowieso vergeben)
- durch `ADD` hinzugefügte Bedingungen sind Tupel-basiert (Attribute-basierte Bedingungen können nicht nachträglich eingefügt werden)

```sql
CREATE TABLE Schauspieler ( 
	Anrede CHAR(19), 
	Name CHAR(30) CONSTRAINT NamePrimaer PRIMARY KEY, 
	Adresse VARCHAR(255), 
	Geschlecht CHAR(1) CONSTRAINT NichtGeschlechtslos 
		CHECK (Geschlecht IN (‚W‘, ‚M‘)), 
	Geburtstag DATE, CONSTRAINT AnredeKorrektConstraint 
		CHECK (Geschlecht = ‚W‘ OR Anrede NOT LIKE ‚Frau%‘ );

ALTER TABLE Schauspieler DROP CONSTRAINT NamePrimaer;
ALTER TABLE Schauspieler ADD CONSTRAINT NamePrimaer PRIMARY KEY (Name);
```

---
# Zusicherungen und Trigger
- manche Bedingungen sollen sich nicht auf bestimmte Tupel beziehen, sondern auf Schemaebene definiert werden (wie Relationen und Sichten)

## Assertion
`CREATE ASSERTION Name CHECK (Bedingung)`
- Bedingung muss bei Erzeugung der Assertion gelten
- Änderungen, die die Assertion falsch machen, werden abgewiesen (schwer, effizient zu implementieren)
- Kein direkter Bezug zu Relationen, deshalb müssen Attribute und Relationen in einer SQL Anfrage eingeführt werden
- wird im Gegensatz zu normaler `CHECK`-Bedingung immer geprüft, kann also auch bei Bezug auf andere Relation nicht umgangen werden
	- Teil des Datenbankschemas
	- **Assertions sind stärker**

```sql
CREATE ASSERTION ReicheVorsitzende CHECK 
	(NOT EXISTS 
		(SELECT * 
		FROM Studios, Manager 
		WHERE ManagerID = VorsitzenderID 
		AND Gehalt < 1000000) 
	);
```

## Vergleich
![[Pasted image 20240626002405.png]]

## Trigger
- *Event-Condition-Action Rules*
- gelten nicht immer, sondern werden bei bestimmten Ereignissen (*event*) ausgeführt
- ein Ereignis wird zunächst nicht verhindert, sondern wenn die Bedingung (*condition*) nicht erfüllt wird, passiert nichts
- falls Bedingung erfüllt, wird eine Aktion (*action*) ausgeführt, die beliebiges tun kann

- Ausführung vor / nach dem Ereignis möglich (`BEFORE` / `AFTER`)
- Bezug auf alte / neue Werte es betroffenen Tupels (`OLD TABLE`/ `NEW TABLE` | bei `INSERT` oder `DELETE` entsprechend angepasst)
- `WHEN` für bool'sche Bedingungen (optional)
- entweder einmalig für jedes oder einmalig für alle Tupel, die verändert wurden (`FOR EACH ROW` oder default: `FOR EACH STATEMENT`)
- auch **mehrere SQL-Ausdrücke** erlaubt (`BEGIN ... END`)
- Rekursionsverhalten ist DBMS-Hersteller-spezifisch (triggert ein Trigger sich selbst?)

```sql
CREATE TRIGGER GehaltsTrigger 
AFTER UPDATE OF Gehalt ON Manager 
REFERENCING 
	OLD ROW AS AltesTupel, 
	NEW ROW AS NeuesTupel 
FOR EACH ROW 
WHEN (AltesTupel.Gehalt > NeuesTupel.Gehalt)
-- BEGIN
	UPDATE Manager 
	SET Gehalt = AltesTupel.Gehalt 
	WHERE ManagerID = NeuesTupel.ManagerID;
-- END
```

- Bedingungen am ehesten direkt in der Datenbank festlegen, da **schneller als** in der **Anwendung** (Indizes und Tricks vs. Anfrage an komplette Datenbank)
	- zudem **zentrale Regeln** statt Regeln in verschiedenen Anwendungen


