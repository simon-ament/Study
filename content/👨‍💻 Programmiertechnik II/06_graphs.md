---
title: Graphen
---
## Terminologie
**Graph:** Ein Graph $G = (V, E)$ besteht aus einer Knotenmenge $V$ und einer Kantenmenge $E \subseteq V \times V$
- **ungerichteter Graph:** ein Graph ist ungerichtet, wenn jede in $E$ enthaltene Kante auch in der entgegengesetzten Richtung in $E$ enthalten ist
- **gerichteter Graph:** auch *Digraph (directed graph)*
- **Graph mit Kantengewichten:** Eine Funktion $\omega: E \rightarrow \mathbb{R}$ ordnet jeder Kante ein Gewicht zu

**(Gerichteter) Pfad:** Eine verbundene Folge von Kanten (bei gerichteten Graphen in entsprechender Richtung)
- **Länge:** Anzahl der Kanten auf dem Pfad

**Zyklus / zyklischer Pfad:** Ein Pfad, bei dem Startknoten und Endknoten identisch sind \
**Verbundenheit:** Zwei Knoten sind verbunden, wenn zwischen ihnen ein Pfad existiert

## Repräsentationen
**Graphische Repräsentation:** Gibt eine Intuition über die Struktur des Graphen \
**Kantenliste:** schlicht jede Kante als Paar aus Knoten in einer verlinkten Liste speichern

### Adjazensmatrix
Benutze eine Matrix `adj` mit $|V| \times |V|$ vielen `bool` Einträgen
- für jede Kante zwischen Knoten $v$ und $w$ wird `adj` wie folgt verändert: `adj[v][w] = true` (bei ungerichteten Graphen auch `adj[w][v] = true`)
- für *dünne* Graphen mit $|E| = \mathcal{O}(|V|)$ brauchen wir trotzdem $\mathcal{O}(|V|^2)$ Speicher

### Adjazenzlisten
Für jeden Knoten wir eine verlinkte Liste der Knoten gespeichert, zu denen der Knoten verbunden ist
- **in der Praxis benutzt**, weil Algorithmen oft über Nachbarknoten iterieren und echte Graphen meist *dünn* sind $\Rightarrow$ Kanten doppelt speichern ist akzeptabel

### Graph mit Knotennamen
Zuordnung der Namen über Symboltabelle
- Knoten $\rightarrow$ Name: Array
	- Knoten im Graphen werden aufsteigend durchnummeriert $0, \dots, |V| - 1$
- Name $\rightarrow$ Knoten: [[05_trees#(Links-neigende) Rot-Schwarz-Bäume|Links-neigender Rot-Schwarz-Baum]]

### Kanten
Wir verwenden abstrakten Datentyp, der folgende Operationen unterstützt:
- either: $\rightarrow \{0, 1, \dots, V - 1\}$
- other: $\{0, 1, \dots, V - 1\} \rightarrow \{0, 1, \dots, V - 1\}$
- from: $\rightarrow \{0, 1, \dots, V - 1\}$
- to: $\rightarrow \{0, 1, \dots, V - 1\}$
- weight: $\rightarrow \mathbb{R}$

---
# Algorithmen auf Graphen
## Zyklen finden
Wenn Tiefensuche von jedem Knoten aus keinen Zyklus hat, dann ist der Digraph zyklenfrei 
- $\Rightarrow$ Topologische Sortierung möglich

## Topologisches Sortieren
Auf einem azyklischen Digraphen (*directed acyclic graph*, DAG) $G = (E,V)$ ist eine topologische Ordnung eine **Knotenordnung** (Permutation), bei der alle gerichteten Kanten von einem in der Ordnung vorhergehenden zu einem in der Ordnung nachfolgenden Knoten zeigen.

**Idee für Algorithmus:** Tiefensuche laufen lassen und Knoten in umgekehrter *Post-order*-Reihenfolge zurückgeben

**Satz:** Die umgekehrte *Post-order*-Reihenfolge in einem azyklischen Digraphen ist eine topologische Sortierung.

![[Screenshot from 2024-07-29 00-01-15.png]]

## Zusammenhangskomponente (ungerichteter Graph)
- Kantenrelation ist eine Äquivalenzrelation
- Eine Zusammenhangskomponente eines Graphen $G = (V,E)$ ist eine maximale Menge verbundener Knoten. Also eine **Äquivalenzklasse**.
- Zusammenhangskomponenten lassen sich über wiederholte Tiefensuche von jedem potentiellen Startknoten ermitteln

## Starke Zusammenhangskomponente (gerichteter Graph)
Zwei Knoten in einem gerichteten Graphen sind stark zusammenhängend, wenn es jeweils einen Pfad in beide Richtungen gibt.

Die Relation starker Zusammenhänge (`sconnected(v,w)`) ist eine **Äquivalenzrelation**.

**Starke Zusammenhangskomponente** ist eine maximale Menge stark zusammenhängender Knoten.

**Beispielanwendung:**
- Interaktion von Software-Modulen

**Kosaraju-Sharir-Algorithmus:**
Einfacher Algorithmus, um starke Zusammenhangskomponenten zu berechnen
- Phase 1: Tiefensuche auf inversem Digraph laufen lassen und Knoten in umgekehrter *Post-order*-Reihenfolge zurückgeben
- Phase 2: Tiefensuche auf (ursprünglichem) Digraphen laufen lassen mit Knotenreihenfolge aus Phase 1

![[Screenshot from 2024-07-29 00-06-53.png]]

*Anmerkung:* Bei der Tiefensuche werden hier Knoten mit hohem Index zuerst besucht 🤷‍♀️

---
# Spannbäume
Ein Spannbaum eines ungerichteten Graphen ist ein Teilgraph von diesem, der
- zusammenhängend ist
- azyklisch ist
- alle Knoten umfasst

Ein Spannbaum ist also ein Baum, der alle Knoten umfasst. Daher hat der Spannbaum genau $|V|-1$ Kanten.

## Minimale Spannbäume
In einem ungerichteten Graphen $G$ mit positiven Kantengewichten ist ein **minimaler Spannbaum** ein Spannbaum, bei dem die Summe der Kantengewichte minimal ist.

**Anwendung:** Netzwerkdesign (minimale Latenz / Abstände, maximale Vernetzung), Ethernet Bridges, Clustering-Algorithmen in KI

### Schnitteigenschaft
**Schnitt:** Ein Schnitt teilt die Knotenmenge $V$ in einem Graphen in zwei nicht-leere, disjunkte Teilmengen

**Kreuzende Kanten:** Verbinden jeweils Knoten aus der einen Menge mit Knoten aus der anderen Menge.

**Satz:** Für jeden Schnitt liegt eine kreuzende Kante mit minimalem Gewicht im minimalen Spannbaum

### Greedy-Algorithmus
1. Färbe alle Kanten grau
2. Finde einen Schnitt mit keiner schwarzen Kante
3. Färbe die minimale kreuzende Kante schwarz
4. Wiederhole bis $|V| - 1$ Kanten schwarz
### Prim's Algorithmus
**Idee:** Baue den MST in einer Zusammenhangskomponente sukzessiv aus
1. Beginne mit Knoten 0 im MST und füge alle seine Kanten in die Liste der kreuzenden Kanten ein
2. Wähle die Kante in der Liste der kreuzenden Kanten, die minimales Gewicht hat
3. Füge den neuen verbunden Knoten zum MST und füge alle seine Kanten zur Liste der kreuzenden Kanten hinzu
4. Wiederhole Schritt 2 & 3 bis der MST $|V| - 1$ Kanten hat oder keine Kante mehr in der Liste der kreuzenden Kanten liegt

![[Screenshot from 2024-07-28 23-26-35.png]]

**Implementierung:**
- Liste der Knoten im MST: `boolean` Array (`marked`)
- Liste der Kanten im MST: `Queue<Edge>` Warteschlange
- Liste der kreuzenden Kanten: `MinPQ<Edge>` Prioritätswarteschlange (*heap*)

**Aufwand:**
- Speicher: $\mathcal{O}(|E|)$, irgendwann alle Kanten in Prioritätswarteschlange
- Zeit: $\mathcal{O}(|E| \cdot \log_2(|E|)$, für jede Kante einmal das Minimum in der Prioritätswarteschlange (*heap*) mit logarithmischer Laufzeit finden

**Details:**
- *Lazy Prim:* Entferne zyklische Kanten nicht während des Algorithmus
- *Eager Prim:* Entferne zyklische Kanten während des Algorithmus + Update aller minimalen Distanzen $\Rightarrow$ ist schneller

---
# Gerichtete Graphen: Kürzeste Pfade bei positiven Kantengewichten
**Anwendung:**
- Routenplanung
- Bildbearbeitung (*seam carving*)
- Netzwerkrouting

## Kürzeste-Pfade-Baum (SPT)
In einem Graphen mit einem frei gewählten Startknoten $s$ ist der **Kürzeste-Pfade-Baum** derjenige azyklische Teilgraph des Graphen, der $s$ als Wurzel und für alle von $s$ aus erreichbaren Knoten jeweils den kürzesten Pfad dorthin enthält
- Verallgemeinerung des MST auf gewichtete gerichtete Graphen

### Kantenrelaxation
**Idee:** Betrachte Kante von $v$ nach $w$. Überprüfe, ob der Pfad über diese Kante kürzer ist als der bisher kürzeste bekannte Pfad von $s$ nach $w$.

```cpp
void relax(const Edge& e) {
	const int v = e.from();
	const int w = e.to();
	if (dist_to[w] > dist_to[v] + e.weight()) {
		dist_to[w] = dist_to[v] + e.weight();
		edge_to[w] = e;
	}
}
```

## Dijkstras-Algorithmus
**Idee:** Baue den SPT sukkzesiv über die Knoten auf, die am nähesten am Startknoten sind
1. Initialisieren alle Distanzen mit $\infty$ (außer dem Starknoten mit Distanz $0$) und färbe alle Knoten grau
2. Beginne mit Knoten $s$ im SPT
3. Färbe den momentanten Knoten weiß und relaxiere alle Nachbarkanten
4. Wähle die Kante, die zum Knoten $w$ zeigt, der am nähesten an $s$ ist
5. Wiederhole Schritt 3 & 4 bis alle Knoten weiß gefärbt sind

**Implementierung:**
- Prioritätswarteschlange über Kanten
- Prioritäten werden separat in einem Schlüssel gesetzt und müssen angepasst werden können

Dijkstras-Algorithmus und Prim's Algorithmus sind **essenziell gleich**:
- beide berechnen einen minimalen Spannbaum
- **Prim:** Nähsten Knoten zum minimalen Spannbaum wählen
- **Dijkstra:** Nähsten Knoten zum Start wählen

> [!important] Komplexität
> $|E| \cdot \log_2(|V|)$
