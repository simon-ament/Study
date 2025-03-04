---
title: Algorithmen, Datentypen und Laufzeiten
---
# Algorithmenbegriff
> Ein Algorithmus ist eine **präzise** (in einer festgelegten Sprache abgefasste) **endliche** Beschreibung eines **allgemeinen** Verfahrens unter Verwendung **ausführbarer** elementarer (Verarbeitungs-)Schritte.

In der Informatik:
- Berechnungsvorgänge statt Bearbeitungsvorgänge
- Schwerpunkt auf Ausführbarkeit durch (abstrakte) Maschinen

## Eigenschaften von Algorithmen
- **Abstraktion, Parameter:** Algorithmus löst Klasse von Problemen
- **Beschreibung hat endliche Länge:** Algorithmus benötigt in jedem Schritt nur endlich viel Platz
- **Terminierung:** Resultat steht nach endlich vielen Schritten fest
- **Determinismus:** Zu jedem Zeitpunkt besteht höchstens eine Möglichkeit zur Fortsetzung (eindeutige Folge der auszuführenden Schritte)
	- Nicht dringend nötig, solange Ergebnis determiniert ist
- **Determiniertheit:** gleiche Resultate bei gleichen Eingaben
	- Normalerweise erwünscht, Probleme bei Zufallszahlen und Parallelität

> [!tip] Tipp aus Altklausuren
> Diese Eigenschaften für Multiple-Choice-Fragen auswendig lernen!

## Weitere Begriffe
**Korrektheit:** Algorithmen (Programme) sollen sich wie beabsichtigt verhalten

**Berechenbarkeit:** Nicht alles ist berechenbar / programmierbar
- z.B. Halteproblem, Programmäquivalenz (verhalten sich zwei Programme gleich?), Korrektheit von Algorithmen

**3-Summen-Problem:** Gegeben $n$ unterschiedliche Ganzzahlen, bestimme wie viele Tripels von Zahlen sich genau zu Null addieren.

---
# Laufzeitklassen
## Vereinfachtes Mathematische Modell
$T(n) = \sum_{\{\mathrm{ops}\}} C(\mathrm{ops}) \cdot N(\mathrm{ops})$
- $C(\mathrm{ops})$ hängt von Hardware und Compiler / Interpreter ab
- $N(\mathrm{ops})$ hängt von Algorithmus und Eingabedaten ab
	- für uns zumeist interessant: **Vergleiche** und **Zuweisungen**

## Tilde-Notation
Schätzung der Laufzeit als Funktion der Eingabelänge $n$
- Dazu werden Ausdrücke niedriger Ordnung / Potenz (von $n$) ignoriert
	- aber Vorfaktoren werden beibehalten (Unterscheid zur $\mathcal{O}$-Notation)
- Für zwei Funktionen $f$ und $g$ ist $f \sim g$ genau denn wenn
$$\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)} = 1$$

## Wachstumsordnung
Eine Funktion $f: \mathbb{N} \rightarrow \mathbb{N}$ hat die Wachstumsordnung $\Theta(g)$, wenn es eine Konstante $c \in \mathbb{R}$ gibt, so dass $f \sim c \cdot g$.

**Praktisch relevant:**
- konstant: $1$
- logarithmisch: $\log_2(n)$
- linear: $n$
- linearithmetisch: $n \cdot \log_2(n)$
- quadratisch: $n^2$
- kubisch: $n^3$
- exponentiell: $2^n$

## Notationen
- $\sim$ (Tilde): approximatives Laufzeitmodell (dominierender Ausdruck)
- $\Theta$ (Big-Theta): Klassifikation von Algorithmen (Wachstumsordnung)
- $\mathcal{O}$ (Big-O): Entwicklung von **oberen Schranken** $\Rightarrow$ entsprechendes $\Theta$ oder kleiner
- $\Omega$ (Big-Omega): Entwicklung von **unteren Schranken** $\Rightarrow$ entsprechendes $\Theta$ oder größer

Bei einem **optimalen Algorithmus** gilt untere Schranke = obere Schranke

---
# Datentypen
## Abstrakte Datentypen
Beschreibung von Datenstrukturen unabhängig von ihrer späteren Implementierung in einer konkreten Programmiersprache (**konkrete Datentypen** aus Basisdatentypen und Klassen)
- Spezifikation der Schnittstelle (Operationen und Funktionalität) nach außen
- **Kapselung:** Darf nur über Schnittstelle benutzt werden
	- Stabilität gegenüber Änderungen
	- Auswahl einer geeigneten Implementierungsvariante
- **Geheimnisprinzip:** Interne Realisierung ist verborgen
- Grundlage des Prinzips der objektorientierten Programmierung

```
type Bool
	operators
		true: → Bool   // Konstante ohne Parameter (null-wertiger Operator)
		false: → Bool
		∧: Bool×Bool → Bool // Konstruktor (mehr-wertiger Operator)
		∨: Bool×Bool → Bool
		¬: Bool → Bool
		
	axioms
		∀𝑥 ∈ Bool:  false ∧ 𝑥 = false
		∀𝑥 ∈ Bool:  𝑥 ∧ false = false
			    true ∧ true = true
		∀𝑥 ∈ Bool:  true ∨ 𝑥 = true
		∀𝑥 ∈ Bool:  𝑥 ∨ true = true
			    false ∨ false = false
			    ¬false = true
			    ¬true = false
```

**Implementierung in C++:**
- Typen $\rightarrow$ Klassen
- Null-wertige Operatoren $\rightarrow$ Konstanten
- Mehr-wertige Operatoren $\rightarrow$ Methoden

## Stapel (Stack)
Last-In-First-Out (LIFO)

```
type Stack(T)
	operators
		empty: → Stack
		is_empty: Stack → Bool
		push: Stack × T → Stack
		pop: Stack → Stack
		top: Stack → T
		
	axioms
		∀𝑠 ∈ Stack, 𝑥 ∈ T:  pop(push(𝑠, 𝑥)) = 𝑠
		∀𝑠 ∈ Stack, 𝑥 ∈ T:  top(push(𝑠, 𝑥)) = 𝑥
		∀𝑠 ∈ Stack, 𝑥 ∈ T:  is_empty(push(𝑠, 𝑥)) = false
				    is_empty empty = true
```

**Implementierung:**
- Effizient mit Arrays (Feldern) möglich, Pointer auf **Ende** des Stacks speichern
- **Feste Größe:** gegebenenfalls irgendwann kein Platz mehr
- **Variable Größe:** Wie soll das Feld wachsen oder schrumpfen?
	- Nach jedem `push` die Größe um 1 erhöhen (dabei wird ggf. gesamtes Feld kopiert) $\Rightarrow$ Worstcase-Laufzeit $\mathcal{O}(n^2)$
	- Wenn das Feld voll ist, Größe verdoppeln $\Rightarrow$ Worstcase-Laufzeit $\mathcal{O}(n)$

![[01_algorithms_datatypes_runtime 2024-07-26 17.20.46.excalidraw.svg]]
%%[[01_algorithms_datatypes_runtime 2024-07-26 17.20.46.excalidraw.md|🖋 Edit in Excalidraw]]%%

## Warteschlangen (Queue)
First-In-First-Out (FIFO)

```
type Queue(T)
	operators
		empty: → Queue
		is_empty: Queue → Bool
		enqueue: Queue × T → Queue
		dequeue: Queue → Queue
		front: Queue → T
		
	axioms ∀𝑞 ∈ Queue, 𝑥, 𝑦 ∈ T
	dequeue(enqueue(empty, 𝑥))         = empty
	dequeue(enqueue(enqueue(𝑞, 𝑥), 𝑦)) = enqueue(dequeue(enqueue(𝑞, 𝑥)), 𝑦)
	front(enqueue(empty, 𝑥))           = 𝑥
	front(enqueue(enqueue(𝑞, 𝑥), 𝑦))   = front(enqueue(𝑞, 𝑥))
	is_empty(enqueue(𝑞, 𝑥))            = false
	is_empty(empty)                    = true
```

**Implementierung:**
- Effizient mit Arrays (Feldern) möglich, Pointer auf **Anfang** und **Ende** des Stacks speichern
- **Feste Größe:** Queue verschiebt sich mit der Zeit nach hinten, dann einfach am Anfang des Arrays fortsetzen (möglich aufgrund der zwei Pointer)
	- Queue kann allerdings weiterhin zu lang werden
- **Variable Größe:** Verdoppelung der Länge analog zum Stack

![[01_algorithms_datatypes_runtime 2024-07-26 17.31.27.excalidraw.svg]]
%%[[01_algorithms_datatypes_runtime 2024-07-26 17.31.27.excalidraw.md|🖋 Edit in Excalidraw]]%%

## Listen (Bag)
Dynamische Datenstruktur, kann sich an tatsächlichen Speicherbedarf anpassen

```
type List(T)
	operators
		empty: → List
		is_empty: List → Bool
		add: List × T → List
		head: List → T
		tail: List → List
		
	axioms
		∀𝑙 ∈ List, 𝑥 ∈ T: head(add(𝑙, 𝑥)) = 𝑥
		∀𝑙 ∈ List, 𝑥 ∈ T: tail(add(𝑙, 𝑥)) = 𝑙
		∀𝑙 ∈ List, 𝑥 ∈ T: is_empty(add(𝑙, 𝑥)) = false
				 is_empty(empty) = true
```

**Implementierung:**
- Menge von Knoten mit Verweis auf Nachfolger (`next`) sowie jeweiligem Element (`data`)
- **Listenkopf:** spezieller Knoten `head`
- **Listenende:** `nullptr` auf `next`

![[01_algorithms_datatypes_runtime 2024-07-26 17.33.42.excalidraw.svg]]
%%[[01_algorithms_datatypes_runtime 2024-07-26 17.33.42.excalidraw.md|🖋 Edit in Excalidraw]]%%