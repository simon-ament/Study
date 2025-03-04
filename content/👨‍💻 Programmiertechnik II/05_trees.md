---
title: Bäume
---
- Ein ungerichteter, zusammenhängender, azyklischer Graph ist ein Baum
- Ein gerichteter, schwach zusammenhängender (= der entsprechende ungerichtete Graph ist zusammenhängend), azyklischer Graph, in dem jeder Knoten höchstens eine eingehende Kante hat, ist ein gerichteter Baum
- **Lemma:** In einem ungerichteten Baum gibt es genau einen Pfad zwischen jedem Knotenpaar
- **Wurzel:** Sei der Knoten $v$ in einem gerichteten Baum ohne eingehende Kanten, dann nennen wir $v$ die Wurzel des Baumes und den Baum einen **verwurzelten Baum** (auch *gewurzelt*).
- **Lemma:** In einem gerichteten, verwurzelten Baum gibt es genau einen Pfad zwischen der Wurzel und jedem anderen Knoten

## Rekursive Definition
- Ein einzelner Knoten ist ein Baum der Höhe 0 und dieser Knoten seine Wurzel
- Falls $T_1$ und $T_2$ Bäume, dann ist folgende Struktur ein Baum mit Höhe $\max(\text{Höhe}(T_1), \text{Höhe}(T_2)) + 1$ und Wurzel $v$:
	- neuer Knoten $v$
	- neue Kanten von $v$ zu den Wurzeln von $T_1$ und $T_2$

## Terminologie
- **Blatt:** Knoten ohne ausgehende Kanten (sonst **innere Knoten**)
- **Tiefe / Niveau:** Länge des eindeutigen [[06_graphs#Terminologie|Pfades]] von der Wurzel zum Knoten
- **Höhe:** Tiefe des tiefsten Blattes
- **Grad:** maximale Anzahl an Kindern (ausgehenden Kanten) eines Knotens (binäre Baume haben Grad 2)
- **Ebene:** bezeichnet alle Knoten mit einer festen Tiefe
- **Kinder:** Alle Knoten an ausgehenden Kanten von $v$
- **Vater / Elternknoten:** jeder Knoten in Beziehung zu seinen Kinderknoten
- **Vorgänger / Nachfolger:** bezüglich einem Pfad von der Wurzel zu $v$ vor / hinter $v$ liegende Knoten
- **Rang:** Anzahl der Kinder eines Knoten (kleiner-gleich **Grad** des Baumes)
- **Vollständiger Baum:** Ein gerichteter Baum $T$ mit Grad $k$ ist vollständig, wenn alle inneren Knoten den Rang $k$ und alle Blätter dieselbe Tiefe haben

> [!info]
> In der Vorlesung zumeist verwurzelte, gerichtete, binäre Bäume

## Eigenschaften
- $|V| = |E| + 1$, denn jeder Knoten hat eine eingehende Kante, außer der Wurzel mit 0 eingehenden
- Ein vollständiger Baum $T$ mit Grad $k$ hat $k^{\text{Höhe}(T)}$ Blätter
- Falls $T$ ein vollständiger binärer Baum ist, hat er $2^{\text{Höhe}(T)+1}-1$ Knoten
- Falls $T$ ein binärer Baum ist, gilt $\text{Höhe}(T) \in [\lfloor \log(|V|) \rfloor, |V| - 1]$

---
# Halden (Heaps)
Ein *Heap* (auch Halde) ist ein Binärbaum, dessen Knoten die folgenden drei Eigenschaften erfüllen:
1. Der Schlüssel jedes Knotens ist größer oder gleich den Schlüsseln aller seiner Kindknoten.
2. Der Baum ist vollständig (bis auf die letzte Ebene)
3. Blattebene wird von links nach rechts befüllt

Das heißt: nur partielle Ordnung im Baum, keine Ordnung innerhalb einer Ebene

## Repräsentation
Baumrepräsentation:
- Schlüssel in den Knoten
- Elternschlüssel nie kleiner als Kindknoten
- Jeder Knoten enthält Referenz zu 2 Kindern und Referenz zum Elternknoten

**Kompakte Feldrepräsentation / Arrayrepräsentation:**
- Indizes starten bei 1
- Knoten sind in *level order* (Ebenen-Reihenfolge)
- **Elternknoten von $k$:** $\lfloor \frac{k}{2} \rfloor$
- **Kindknoten von $k$:** $2k$ und $2k + 1$
- Kein Speicher für explizite Kanten!

![[05_trees 2024-07-28 23.12.58.excalidraw.svg]]
%%[[05_trees 2024-07-28 23.12.58.excalidraw.md|🖋 Edit in Excalidraw]]%%

## Haldenbedingung wiederherstellen (heapify)
- Verletzung: Ein Knoten ist größer als sein Elternknoten
- Lokale Lösung: die beiden Knoten tauschen und nach oben **iterieren** (*swim up*, Sicht des Kindknoten)
- Alternative lokale Lösung: den größeren der beiden Kindknoten mit Elternknoten tauschen und nach unten **iterieren** (*sink down*, Sicht des Elternknoten)

![[05_trees 2024-07-28 23.34.58.excalidraw.svg]]
%%[[05_trees 2024-07-28 23.34.58.excalidraw.md|🖋 Edit in Excalidraw]]%%

**Einfügen in Heap:**
- Neuen Knoten am Ende einfügen und nach oben schwimmen (*swim up*) lassen

**Maximum entfernen:**
- Wurzelknoten durch letztes Element (nicht unbedingt das kleinste) **ersetzen** und dann neue Wurzel **nach unten sinken** (*sink down*) lassen
- **Kosten:** Garantiert nicht mehr als $2 \cdot \log_2(n)$ Vergleiche (hauptsächlich für *sink down*)

## [[02_sort#Heapsort|Heapsort]]

---
# Balancierte Bäume
**Motivation:** Balancierte Bäume sind schneller (geringere Tiefe bei Suche / Einfügen)

## 2-3-Bäume
- **2-Knoten:** Ein Suchschlüssel und entsprechend sortierte Teilbäume
- **3-Knoten:** Zwei Suchschlüssel $a$ und $b$ und drei Kinder (Links: alle Knoten kleiner als $a$, Mitte: alle Knoten größer als $a$ und kleiner als $b$, Rechts: alle Knoten größer als $b$)
- **Satz (Perfekte Balance):** Jeder Pfad von der Wurzel zu `nullptr` hat die gleiche Länge

### Suche (`get`) 
Wie bei binären Suchbäumen
- Bei einem 2-3 Baum mit $n$ Schlüsseln werden garantiert nicht mehr als $\log_2(n)$ Knoten besucht

### Einfügen (`put`)
1. Einfügen in den entsprechenden Blattknoten
2. Mögliche (temporäre) 4-Knoten auf dem Weg zurück zur Wurzel hin auflösen (4 Fälle), wobei die Tiefe sich nicht verändert, sofern nicht an der Wurzel ein 4-Knoten entsteht
	- 4-Knoten werden hochgereicht

Durch diesen Algorithmus in 2-3-Bäumen nun Laufzeit $\log_2(n)$ für alle Operationen

### 3-Knoten anders darstellen
- Darstellung als regulärer Binärsuchbaum nicht sinnvoll, da nicht als 3-Knoten erkennbar
- Regulärer Binärsuchbaum mit extra Verbindungsknoten nicht sinnvoll, da zusätzlicher Knoten und zusätzliche Kante

## (Links-neigende) Rot-Schwarz-Bäume
- Eindeutige Repräsentation von 2-3-Bäumen als binäre Suchbäume
- Eine <span style="color: red">rote</span> Kante, die einen 3-Knoten darstellt, muss die **linke Kante** sein
- Kein Knoten hat zwei rote Kanten (das wäre ein temporärer 4-Knoten)

**Strategie:** 1-1 Korrespondenz mit 2-3-Bäumen erhalten \
**Symmetrische Ordnung:** Alle Knoten bleiben in der richtigen Reihenfolge \
**Perfekte Balance:** Jeder Pfad von der Wurzel zu `nullptr` hat die gleiche **Anzahl schwarzer Kanten**

**Einfügen:** Analog zu den Strategien beim 2-3-Baum. Dabei entstehen allerdings Problemfälle, die mit elementaren Operationen **Rotation** und **Farbwechsel** gelöst werden können. \
**Suchen:** Identisch zu normalen binären Suchbäumen

**Kantenfarbe:** Kann eindeutig in Farbe des Kindknotens kodiert werden $\Rightarrow$ Kindknoten ist genauso wie die Kante <span style="color: red">rot</span>

![[05_trees 2024-07-26 23.21.13.excalidraw.svg]]
%%[[05_trees 2024-07-26 23.21.13.excalidraw.md|🖋 Edit in Excalidraw]]%%
