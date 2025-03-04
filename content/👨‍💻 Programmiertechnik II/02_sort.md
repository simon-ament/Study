---
title: Sortieren
---
<link rel="stylesheet" href="/static/sort/style.css"></link>

Einträge in einer Liste über einen Schlüssel in eine Ordnung bringen, dazu wird [[02_functions_relations#Ordnungsrelation|totale Ordnung]] benötigt

**Beispiele für totale Ordnungen:**
- Vergleichsoperator für Ganzzahlen und Gleitkommazahlen
- Lexikographische (alphabetische) Ordnung von Zeichenketten
- **Keine totale Ordnung:** Schere-Stein-Papier ist nicht transitiv weil Papier $\leq$ Schere und Schere $\leq$ Stein, aber Stein $\leq$ Papier

**Repräsentationssatz:**
Jede totale Ordnung lässt sich auf die Ordnung der reellen Zahlen abbilden

---
# Selection Sort
Kleinstes, noch nicht sortiertes Element an das Ende der sortierten Elementen tauschen.

Für jeden Index $i$ aufsteigend von $0$ bis $n-1$:
1. Finde den Index $\min \in \{i+1, \dots, n\}$, so dass $a_{\min}\leq a_j$ für alle $j \in \{i + 1, \dots, n\}$
2. Tausche $a_i$ und $a_{\min}$, wodurch $a_i$ danach das $i$-kleinste Element enthält

<div class="sort-div top">
    <canvas id="selection-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="selection-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void selection_sort(Value* a, const int n) {
	for (auto i = 0; i < n; i++) {
		auto min = i;
		for (auto j = i + 1; j < n; j++) {
			if (less(a, j, min)) {
				min = j;
			}
		}
		swap(a, i, min);
	}
	return;
}
```

> [!important] Laufzeit
> Unabhängig von der Eingabe $\frac{n^2 - n}{2} \sim \frac{n^2}{2}$ Vergleiche und $n$ Vertauschungen \
> **Worst-Case:** $n^2$ \
> **Average-Case:** $n^2$ \
> **Best-Case:** $n^2$
 
---
# Insertion Sort
Das nächste, noch nicht sortierte Element, an die korrekte Stelle in die sortierten Element tauschen.

Für jeden Index $i$ aufsteigend von $0$ bis $n-1$:
1. Starte bei $j = i$
2. Tausche $a_j$ und $a_{j - 1}$ so lange wie $a_j < a_{j-1}$ und zähle $j$ um eins runter

<div class="sort-div top">
    <canvas id="insertion-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="insertion-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void insertion_sort(Value* a, const int n) {
	for (auto i = 1; i < n; i++) {
		for (auto j = i; j > 0 && less(a, j, j - 1); j--) {
			swap(a, j, j - 1);
		}
	}
	return;
}
```

> [!important] Laufzeit
> In einem zufällig sortierten Array: $\sim \frac{n^2}{4}$ Vergleiche und $\sim \frac{n^2}{4}$ Vertauschungen (denn im Schritt $i$ im Erwartungswert $\frac{i}{2}$ Vertauschungen notwendig) \
> **Best-Case:** $n$ (bei aufsteigender Sortierung) \
> **Average-Case:** $n^2$ \
> **Worst-Case:** $n^2$ (bei absteigender Sortierung)

---
# Bubble Sort
Sehr ähnlich zu Insertion Sort: Nach dem $i$-ten Schritt sind immer alle $a_0, \dots, a_i$ sortiert, aber $a_{i+1}, \dots, a_{n-1}$ noch unsortiert.

- Insertion Sort: Im $i$-ten Schritt wird $a_i$ an die richtige Stelle in $a_0, \dots, a_i$ getauscht
- Bubble Sort: Im $i$-ten Schritt wird das kleinste Element von $a_i, \dots, a_{n-1}$ zu $a_i$ getauscht (dazu "runterbubblen")

<div class="sort-div top">
    <canvas id="bubble-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="bubble-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void bubble_sort(Value* a, const int n) {
	for (auto i = 0; i < n; i++) {
		bool swapped = false; // check if array is already sorted
		for (auto j = n - 1; j > i; j--) {
			if (less(a, j, j - 1)) {
				swap(a, j, j - 1);
				swapped = true;
			}
		}
		if (!swapped) return;
	}
	return;
}
```

> [!important] Laufzeit
> Analog zu Insertion Sort \
> **Best-Case:** $n$ (bei aufsteigender Sortierung und zusätzlicher *Erkennung von sortierten Arrays*) \
> **Average-Case:** $n^2$ \
> **Worst-Case:** $n^2$ (bei absteigender Sortierung)

---
# Shell Sort
$h$-Sortierung eines Arrays für absteigende Werte von $h$ über Insertion Sort.
- reduziert die Anzahl der benötigten Vertauschungen gegenüber Insertion Sort
## h-Sortierung
Ein Array ist $h$-sortiert, wenn $\{a_i, a_{i+h}, \dots, a_{i+k \cdot h}\}$ für alle $i \in \{o, \dots, h-1\}$ sortiert sind.
## h-Werte
Generierung nach der $3x+1$-Regel: 1, 4, 13, 40, 121, 364, ...

<div class="sort-div top">
    <canvas id="shell-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="shell-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void shell_sort(Value* a, const int n) {
	int h = 1;
	while (h < n/3) {
		h = 3*h + 1;
	}

	while (h >= 1) {
		for (auto i = h; i < n; i++) {
			for (auto j = i; j >= h && less(a, j, j - h); j -= h) {
				swap(a, j, j - h);
			}
		}
		h /= 3;
	}
	return;
}
```

> [!important]
> **Best-Case:** $n \cdot \log_2(n)$ \
> **Average-Case:** $n \cdot \log_2(n)$ (empirische Schätzung für Werte nach der $3x + 1$-Regel | offenes Forschungsfeld) \
> **Worst-Case:** $n^{1.5}$

---
# Merge Sort
**Grundidee:** Problem in Teilprobleme zerlegen, einzelne Probleme lösen und dann zusammenführen (*divide and conquer, merge*)

1. Zerlege Array in zwei (fast) gleich große, nicht-überlappende Teilarrays
2. Sortiere beide Teilarrays wiederum *rekursiv*
3. Sortierte Teilarrays wieder verschmelzen (*merge*)

**Merge-Schritt:** Zwei Pointer auf die heads der beiden sortierten Teilarrays, dann einzeln vergleichen und entsprechend zusammenführen.

## Komplexität
**Vergleiche:** *Merge Sort* benutzt höchstens $n \cdot \log_2(n)$ Vergleiche, um ein Array der Länge $n$ zu sortieren.
- Vergleiche treten nur in `merge` (Rekursions-Rückkehr), aber nicht in `merge_sort` (Rekursion) auf
- Beweis entsprechend über Induktion
- Weniger Vergleiche nicht möglich (Beweis über minimale Tiefe eines Entscheidungsbaumes) $\Rightarrow$ Merge-Sort ist optimal in der Anzahl der Vergleiche (**aber** nicht im Speicherplatz)

<div class="sort-div top">
    <canvas id="merge-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
	<canvas id="merge-sort-canvas-2" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="merge-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void merge_sort(Value* a, Value* aux, const int lo, const int hi) {
	if (hi <= lo) return;

	auto mid = lo + (hi - lo) / 2;
	// Variante ohne Kopieren: bei merge_sort() jeweils a und aux getauscht
	merge_sort(a, aux, lo, mid);
	merge_sort(a, aux, mid + 1, hi);
	merge(a, aux, lo, mid, hi);
	return;
}

void merge(Value* a, Value* aux, const int lo, const int mid, const int hi) {
	// Variante ohne Kopieren: for-Schleife entfällt
	for (auto k = lo; k <= hi; k++) {
		aux[k] = a[k];
	}

	auto i = lo, j = mid + 1;
	for (auto k = lo; k <= hi; k++) {
		if (i > mid)			{ a[k] = aux[j++]; }
		else if (j > hi)		{ a[k] = aux[i++]; }
		else if (less(aux, j, i))	{ a[k] = aux[j++]; }
		else				{ a[k] = aux[i++]; }
	}
	return;
}
```

> [!important] Laufzeit
> **Best-Case:** $\frac{1}{2} \cdot n \cdot \log_2(n)$ \
> **Average-Case:** $n \cdot \log_2(n)$ \
> **Worst-Case:** $n \cdot \log_2(n)$

## In der Praxis
1. **Insertion Sort** für kleine Arrays benutzen (große Kopierkosten von **Merge Sort** für kleine Arrays vermeiden | Cutoff typischerweise bei Länge 10)
2. **Kein Verschmelzen** wenn die Arrays schon sortiert sind (Test in der Mitte beider Teilarrays | vorrangig bei teilweise sortierten Arrays)
	- $\Rightarrow$ Best-Case-Laufzeit: $\Omega(n)$ (bei bereits sortiertem Array)
3. **Kein Kopieren** zum temporären Array notwendig, indem die Rolle der beiden Arrays in der Rekursion vertauscht wird (Rollenvertauschung der Zeiger auf Zwischenspeicher und Zielarray)

## Bottom-Up Merge Sort
**Idee:** Verschmelze Teilarrays der Größe $2^i$ mit $i$ aufsteigend beginnend bei $i = 1$.

## Natural Merge Sort
**Idee:** Anstatt Größe $2^i$ zu verwenden, benutzen wir im ersten Schritt schlicht diejenigen Teilarrays, die bereits sortiert sind.

## Timsort (2002)
- Natural Merge Sort
- binärer *Insertion Sort* für den ersten Durchlauf
- Optimierung beim Zwischenspeicher für das Verschmelzen
- In der Praxis oft **lineare Komplexität**

---
# Quick Sort
**Grundidee:** Array in zwei Teile zerlegen, so dass alle Elemente in dem linken Teil kleiner als alle Element in dem rechten Teil sind
1. Ein spezielles Element `a[j]` (Pivotelement) teilt das Array in zwei Teile
2. Für alle `a[i]` links von `j` gilt `a[i] <= a[j]`
3. Für alle `a[i]` rechts von `j` gilt `a[i] >= a[j]`
4. Sortiere beide Teilarrays *rekursiv*

**Problem:** Partitioniere das Array `a` vom Index `lo` (Anfang) bis `hi` (Ende) mit `a[lo]` als Pivotelement \
**Initialisierung:** `i = lo` und `j = hi + 1` \
**Schleife:** Solange wie `i <= j` (d.h. die Zeiger überschneiden sich nicht)
- Erhöhe `i` so lange wie `a[i] < a[lo]`
- Verringere `j` so lange wie `a[j] > a[lo]`
- Tausche `a[i]` und `a[j]`

<div class="sort-div top">
    <canvas id="quick-sort-canvas" class="sort-canvas" width="1000" height="500"></canvas>
</div>

<div class="sort-div bottom">
    <p id="quick-sort-code" class="sort-code"></p>
</div>

```cpp
template <typename Value>
void quick_sort(Value* a, const int lo, const int hi) {
	if (hi <= lo) return;
	auto j = partition(a, lo, hi);
	quick_sort(a, lo, j - 1);
	quick_sort(a, j + 1, hi);
	return;
}

int partition(Value* a, const int lo, const int hi) {
	auto i = lo, j = hi + 1;
	while (true) {
		while (less(a, ++i, lo)) { if (i == hi) break; }
		while (less(a, lo --j)) { if (j == lo) break; }
		if (i >= j) break;
		swap(a, i, j);
	}
	swap(a, lo, j);
	return j;
}
```

> [!important] Laufzeit
> **Best-Case:** $n \cdot \log_2(n)$ \
> **Average-Case:** $2n \cdot \ln(n)$ \
> **Worst-Case:** $\frac{1}{2} \cdot n^2$

## Algorithmische Verbesserungen
### Insertion Sort für kleine Arrays
- Quick Sort hat zu viel Kopierkosten für kleine Arrays
- Typischer cutoff bei Array der Länge 10

### Median als Pivotelement
- Optimal wäre der Median weil das zur exakten Teilung führt
- Schätzung des Medians durch drei Beispiele aus dem Array

### Gleiche Schlüssel: 3-Way Quick Sort
**Problem:** Quick Sort zerlegt Arrays mit gleichen Schlüssel weiter \
**Lösung:** Unterscheidung der 3 Fälle `a[i] < a[j]`, `a[i] = a[j]` und `a[i] > a[j]`

---
# [[05_trees#Halden (Heaps)|Heap]]sort
**Idee:** 
1. Betrachte das Eingabefeld als einen vollständigen binären Baum
2. **Heapaufbau:** baue einen *heap* aus dem Feld mit allen $n$ Schlüsseln
	- *top-down*-Aufbau: auf Knoten $\frac{n}{2}$ bis $1$ jeweils `sink` aufrufen (alle anderen haben keine Kinder)
	- $\leq n$ Vertauschungen und $\leq 2n$ Vergleiche
4. **Runtersortieren:** Nach und nach den maximalen Schlüssel entfernen, indem man ihn mit `swap` nach hinten tauscht und dann `sink` auf der neuen Wurzel des nun kleineren Baums aufruft
	- $\leq n \log_2(n)$ Vergleiche und Vertauschungen

```cpp
// heapify phase
for (int k = n / 2; k >= 1; k--) {
	sink(heap, k, n);
}

// sortdown phase
int k = n;
while (k > 1) {
	swap(heap, 1, k--);
	sink(heap, 1, k);
}
```

**Signifikanz:** *In-place* Sortieralgorithmus mit $\mathcal{O}(n \log_n(n))$ Laufzeitgarantie
- Merge-Sort: nicht *in-place*
- Quicksort: *in-place*, aber schlechteste Laufzeit $\mathcal{O}(n^2)$

> [!important] Laufzeit
> **Best-Case:** $n \log(n)$ \
> **Average-Case:** $n \log(n)$ \
> **Worst-Case:** $n \log(n)$
