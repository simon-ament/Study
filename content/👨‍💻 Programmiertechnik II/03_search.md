---
title: Suchen
---
# Sequentielle Suche
Einfache Methode eine Symboltabelle (*key value storage*) basierend auf einer einfach verketteten Liste zu implementieren
- `put(k, v)`: Beginnend mit dem Listenkopf werden die Schlüssel verglichen und der Wert verändert, ggf. wird neuer Listenkopf erstellt
- `get(k)`: Beginnend mit dem Listenkopf werden die Schlüssel verglichen

**Worst-Case-Laufzeit** für Suche / Einfügen / Löschen: $n$ \
**Average-Case-Laufzeit** bei Suche und Löschen sogar: $\frac{n}{2}$

## Binäre Suche
**Idee:** Halbierung des Suchraums bei sortierter Liste möglich

**Datenstruktur:** Sortiertes Array (Zugriff $\mathcal{O}(1)$) von Schlüssel und Werten

**Hilfsfunktion:** `rank(k)` gibt zurück, wie viele Schlüssel kleiner als $k$ sind (also den Index von $k$)
- findet beim Einfügen die korrekte Position für das neue Element $\Rightarrow$ Elemente dahinter müssen zunächst verschoben werden

```cpp
int rank(const Key& key) {
	int lo = 0, hi = n-1;
	while (lo <= hi) {
		int mid = lo + (hi - lo) / 2;
		if (key < keys[mid])
			hi = mid - 1;
		else if (key > keys[mid])
			lo = mid + 1;
		else
			return mid;
	}
	return lo;
}
```

---
# Traversierung von [[05_trees#Bäume|Bäumen]]
## Tiefensuche (depth first traversal)
- **Pre-Order:** 1. Knoten, 2. linker Teilbaum, 3. rechter Teilbaum
- **In-Order:** 1. linker Teilbaum, 2. Knoten, 3. rechter Teilbaum
- **Post-Order:** 1. linker Teilbaum, 2. rechter Teilbaum, 3. Knoten

![[03_search 2024-07-26 18.32.11.excalidraw.svg]]
%%[[03_search 2024-07-26 18.32.11.excalidraw.md|🖋 Edit in Excalidraw]]%%

- Die Tiefensuche markiert alle Knoten, die mit einem gegebenen Startknoten verbunden sind
- Die Tiefensuche berechnet einen Pfad von einem gegebenen Startknoten zu jedem verbundenen Knoten in einer Zeit, die proportional zur Länge des Pfades ist (effizient)
	- ermittelt, ob es einen Pfad zwischen zwei Knoten gibt
- **Praktische Anwendung:** Zusammenhängende Flächen auf digitalen Fotos füllen (Pixel als Knoten und Kanten genau dann wenn benachbarte Pixel eine ähnliche Intensität haben)

### Implementierung
- `marked` markiert bereits besuchte Knoten
- `edge_to[w] == v` bedeutet, dass die Kante nach `w` von `v` kommt

```cpp
void dfs(const Graph& g, const int v) {
	marked[v] = true;
	for (auto w : g.adj(v)) {
		if (!marked[w]) {
			dfs(g, w);
			edge_to[w] = v; // edge_to exists outside this function
		}
	}
}
```

## Breitensuche (breadth first traversal)
- wird mithilfe einer Queue implementiert
- berechnet von einem gegebenen Startknoten den kürzesten Pfad zu einem gegebenen Zielknoten in einem **ungewichteten Graphen**
- selber Algorithmus wie Tiefensuche, nur mit **Queue statt Stack** für zu besuchende Knoten

### Implementierung
- `marked` markiert schon besuchte Knoten
- `edge_to[w] == v` bedeutet, dass die Kante nach $w$ von $v$ kommt (auf dem kürzesten Weg zu $w$)
- `dist_to` speichert, wie lang der kürzeste Pfad zum Startknoten ist

1. Füge den Startknoten in eine Warteschlange ein und markiere ihn
2. Solange die Warteschlange nicht leer ist
	- Entferne den Kopf der Warteschlange
	- Überprüfe alle Nachbarn, ob sie schon markiert sind. Wenn nicht, markiere den Nachbarn und füge ihn zur Warteschlange hinzu

```cpp
void bfs(const Graph& g, const int s) {
	Queue<int> q;

	// initialize distances and visitations
	for (auto v = 0; v < no_vertices; v++) {
		dist_to[v] = std::numeric_limits<int>::max();
		edge_to[v] = -1;
		marked[v] = false;
	}
	dist_to[s] = 0;
	marked[s] = true;
	q.enqueue(s);

	// run BFS by processing the queue
	while(!q.is_empty()) {
		int v = q.dequeue();
		for (auto w : g.adj(v)) {
			if (!marked[w]) {
				edge_to[w] = v;
				dist_to[w] = dist_to[v] + 1;
				marked[w] = true;
				q.enqueue(w);
			}
		}
	}

	return;
}
```

---
# Binärer Such[[05_trees#Bäume|baum]]
- Ein binärer Suchbaum (*binary search tree*) ist ein geordneter binärer Baum
- Jeder Knoten hat einen Schlüssel. In jedem Knoten gilt für den Schlüssel:
	- größer als alle Schlüssel im linken Teilbaum
	- kleiner als alle Schlüssel im rechten Teilbaum
- Für die gleichen Schlüssel, gibt es viele BSTs (mehr oder weniger balanciert)
- Optimalerweise ist der Baum balanciert (initial und als Reaktion auf Änderungen)

`get` nutzt die Ordnung des Baumes
- Vergleiche: Tiefes des Baums + 1

## Einfügen
`put` nutzt erneut die Ordnung des Baumes (gleich zur Suche) und fügt dann ein
1. Suche, die an einem `nullptr` endet
2. Den neuen Knoten anfügen
3. Rekursiv die Größe der darüber liegenden Teilbäume updaten

- Vergleiche: Tiefe des Baums + 1
- ggf. geht Balance des Baumes verloren

**Satz von Reed:** Wenn $n$ Schlüssel in zufälliger Reihenfolge in einen binären Suchbaum eingefügt werden, dann ist die erwartete Anzahl an Vergleichen für Suche / Einfügen $\approx 1.39 \cdot \log_2(n)$ und der Baum hat eine erwartete Tiefe von $\approx 3 \cdot \log_2(n)$.

## Entfernen (Hibbard Deletion)
**Fall 1 (keine Kinder):** Schlicht Knoten löschen

**Fall 2 (ein Kind):** Knoten löschen und Kind stattdessen anhängen

**Fall 3 (zwei Kinder):** `min` im rechten Teilbaum finden und entfernen (`remove_min`) und damit den zu entfernenden Knoten ersetzen 
- $\Rightarrow$ der neue Knoten ist größer als alle im linken Teilbaum (da er aus dem rechten kommt), aber kleiner als alle im rechten Teilbaum (da er dort das Minimum ist)

1. Nach links gehen, bis ein `nullptr`
2. Pointern auf Minimum nun auf den rechten unteren Teilbaum des Minimums zeigen lassen

![[03_search 2024-07-26 23.05.21.excalidraw.svg]]
%%[[03_search 2024-07-26 23.05.21.excalidraw.md|🖋 Edit in Excalidraw]]%%

**Satz:** Durchschnittliche Anzahl an Schritten zum Löschen: $\sqrt{n}$
