---
title: Optimierung
---
# Optimierung
Wertebereich $\Omega$ bei uns ausschließlich diskret
- Zielfunktion: $F(x)$ soll maximiert werden (Minimierung durch Vorzeichenwechsel)
- Ungleichheitsbedingungen: $G_i(x) \leq 0$
- Gleichheitsbedingungen: $H_j(x) = 0$

Spezialfall $F(x) = \mathrm{const}$ heißt *constraint satisfaction problem*

**Approximation:** $F(x_\mathrm{approx}) \leq (1 + \varepsilon) \cdot F(x^*)$

---
# Greedy-Optimierung
**Problemklasse:**
1. Wir verwenden eine Nachbarschaftsrelation $N(x) \subseteq \Omega$ im Raum der Lösungen $x$, die es erlaubt, Lösungen schrittweise aus anderen Lösungen aufzubauen
2. Die Zielfunktion $F$ und Nebenbedingungen $G_i$ und $H_j$ sind effizient berechenbar für alle Nachbarn $N(x)$ einer Lösung $x$

**Prinzip:**
1. Starte bei einer Lösung $x$ (muss $G_i$ und $H_j$ nicht unbedingt erfüllen)
	1. $G_i$ und $H_j$ noch nicht erfüllt $\Rightarrow$ wähle $x' \in N(x)$ welches diese am besten erfüllt
	2. $G_i$ und $H_j$ erfüllt $\Rightarrow$ wähle $x' \in N(x)$ welches Nebenbedingungen weiterhin erfüllt und $F$ weiter maximiert
2. Gehe zu 1. mit $x \leftarrow x'$ oder stoppe, wenn keine bessere Lösung in $N(x)$ gefunden

**Beispiele:**
- Prim's Algorithmus für minimale Spannbäume
- Dijkstra's Algorithmus für Kürzeste-Pfade-Bäume

> [!caution] Achtung
> Greedy-Algorithmen führen nur zu lokalen Optima, haben aber gute Laufzeit

---
# Heuristische Optimierung
## Greedy Best-First Search
**Idee:** Schätze die Nähe zu $t$ für jeden Knoten $v$ basierend auf einer problemspezifischen Heuristik $h(v)$
- Euklidische Distanz, Länge eines bekannte Pfades, etc.

**Problem:** Oft schnell, aber bei Irrwegen auch beliebig schlecht

## A*-Algorithmus
**Idee:** Dijkstras Algortihmus mit Heuristik kombinieren
Startknoten $s$, Zielknoten $t$

**Dijkstra:** Es werden die kürzesten Pfade von 𝑠 zu allen anderen Knoten berechnet (SPT), indem alle Nachbarn des Knoten, der **am nähesten an $s$ ist**, relaxiert

**A\*-Algorithmus:** Es wird der kürzeste Pfad von 𝑠 zu 𝑡 berechnet, indem alle Nachbarn des Knoten, der geschätzt **am nähesten an $t$ ist**, relaxiert (verwendet ebenfalls Prioritätswarteschlange)

 **Ablauf:**
1. Initialisiere alle kürzesten Distanzen $d(v)$ vom Startknoten $s$ zu alle Knoten $v \neq s$ mit $\infty$ und $d(s) = 0$ 
2. Füge $s$ mit der Priorität $d(s) + h(s)$ in die Warteschlange ein 
3. Entferne den nächsten Knoten $v$ aus der Prioritätswarteschlange 
4. Wenn $v$ der Zielknoten $t$ ist, gebe den kürzesten Pfad zurück 
5. Ansonsten relaxiere alle Kanten $e = (v,w) \in E$:
   Wenn $d(v) + \mathrm{weight}(e) \leq d(w)$ dann 
	- $d(w) \leftarrow d(v) + \mathrm{weight}(e)$
	- Füge $w$ mit der Priorität $d(w) + h(w)$ in die Warteschlange ein 
6. Wiederhole Schritt 3, 4 und 5

**Unterschied zu Dijkstra:** Wir kennen einen Zielknoten, während Dijkstra einen SPT generiert
- Dijkstra als Spezialfall $h(v) = 0$
- Unterschied im Algorithmus / Code: Prioritäten beim Einfügen in Warteschlange mit Heuristik berechnen

## Heuristik
**Optimalität** der Pfade wird durch zwei Eigenschaften der Heuristik garantiert:
1. Die Heuristik muss _zulässig_ sein: Sie darf die Kosten (minimale Pfadlänge) nie Überschätzen, ansonsten leidet die Laufzeit massiv.
2. Die Heuristik soll _konsistent_ sein: Für jeden Knoten und jeden Nachfolgeknoten von gilt $h(v) \leq \mathrm{weight}(v,w) + h(w)$.
	- es kann sonst passieren, dass Knoten "übersehen" werden

---
# Dynamische Programmierung
Anwendung bei Optimierungsproblemen mit rekursiver Struktur, bei der Lösung aus Kombination von $n$ Optimierungsproblemen berechenbar ist

**Idee:** Berechne optimale Lösung für die kleinsten Teilprobleme und speichere diese (*memorize*). Benutze die gespeicherten Ergebnisse, um das nächstgrößere Teilproblem zu lösen

**Beispiel:** Fibonacci-Berechnung

## Bellmann-Gleichung
1. System im Urzustand $s_0$ (z.B. Position in einem Labyrinth)
2. Wir haben in jedem Zeitschritt die Möglichkeit eine von $k$ Aktionen $a_t$ auszuführen (z.B. nach vorn / rechts / links / hinten gehen)
3. Dafür gibt es eine Belohnung $r(s_t, a_t)$ (auch als Strafe einsetzbar)
4. Es gibt eine Dynamik, die den Zustand $s_t$ aufgrund der Aktion $a_t$ verändert: $s_{t+1} = D(s_t, a_t)$

**Ziel:** Finde diejenige Sequenz an Aktionen $a^*_0, \dots, a^*_{T-1}$ welche die Summe $\sum_{t=0}^{T-1} r(s_t, a_t)$ maximiert.

**Bellmann-Gleichung:** Wenn wir die Wertefunktion $V_i$ definieren als
$$V_i (s_i) = \max_{a_i, \dots, a_{T-1}} \sum_{t=1}^{T - 1} r (s_t, a_t)$$
dann gilt
$$V_i (s_i) = \max_{a_i}[r(s_i, a_i) + V_{i + 1}(D(s_i, a_i))]$$
![[Screenshot from 2024-07-25 10-21-06.png]]

## Optimale Matrixmultiplikation
Wenn wir mehr als zwei Matrizen multiplizieren, gibt es mehrere Möglichkeiten, die Multiplikation durchzuführen, welche deutlich unterschiedlichen Aufwand haben können

![[07_optimization 2024-07-28 23.06.59.excalidraw.svg]]
%%[[07_optimization 2024-07-28 23.06.59.excalidraw.md|🖋 Edit in Excalidraw]]%%
### Lösung mit dynamischer Programmierung
**Idee:** Gegeben die Matrizen $A_1, \dots, A_n$ berechnen wir die minimale Anzahl $m_{i,j}$ von Multiplikationen um die Matrizen $A_i, \dots, A_j$ zu multiplizieren

**Bellman-Gleichung (leicht abgewandelt):**
- $m_{i,j} = \min_{k = i, \dots, j-1} m_{i,k} + m_{k+1, j} + \mathrm{rows}(A_i) \cdot \mathrm{columns}(A_k) \cdot \mathrm{columns}(A_j)$ berechnet über **Kosten** für $(A_i \times \dots \times A_k) \times (A_{k+1} \times \dots \times A_j)$
	- hierbei: Value-Funktion + Value-Funktion + Kosten (reward)
- $s_{i,j} = \arg \min_{k = i, \dots, j-1} m_{i,k} + m_{k+1, j} + \mathrm{rows}(A_i) \cdot \mathrm{columns}(A_k) \cdot \mathrm{columns}(A_j)$ speichert den **Index** an dem die Multiplikation $A_i \times \dots \times A_j$ in zwei Produkte zerlegt wird
- **Initialisierung** mit $m_{i,i} = 0$
- **Iteration** über die Länge von $j- i$

![[Screenshot from 2024-07-25 10-26-46.png]]
![[Screenshot from 2024-07-25 10-26-55.png]]
