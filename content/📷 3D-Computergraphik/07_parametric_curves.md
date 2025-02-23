---
title: Parametrische Kurven
---
# Parametrische Kurven und Flächen
## Darstellung
- **Explizite Darstellung** einer Kurve $C$ im $\mathbb{R}^3$
	- $C = \{(x,y,z) \in \mathbb{R}^3: x \in [a, b], y = f(x), z = g(x)\}$
- **Implizite Darstellung** einer Kurve $C$ im $\mathbb{R}^3$ als Lösungsmenge einer Funktion $F$
	- $C = \{(x, y, z) \in \mathbb{R}^3: F(x,y,z) = c\}$
- **Parametrische Darstellung** einer Kurve $C$ durch parametrisierte Funktionen für die (kartesischen) Koordinaten der Kurvenpunkte
	- $C = \{(x, y, z) \in \mathbb{R}^3: x = c_x(t), y = c_y(t), z = c_z(t), t \in [a, b] \subset \mathbb{R}\}$
	- in der Praxis zumeist verwendet, da Biegungs-, Stetigkeits- und Formungseigenschaften effizient bereitgestellt werden

### Parametrische Kurvendarstellung
**Parametrisierte Kurve:** Sein $\mathcal{I} \subset \mathbb{R}$ ein reelwertiges Intervall. Eine *parametrisierte Kurve* $C$ wird dargestellt als differenzierbare Abbildung der Form

$$C: \mathcal{I} \to \mathbb{R}^n, t \mapsto C(t) = (c_1(t), \dots, c_n(t))$$

mit den komponentenweise definierten Funktionen $c_i: \mathcal{I} \to \mathbb{R}$

**Kurve:** Das Bild $\mathrm{im}(C) = \{C(t) | t \in \mathcal{I}\}$ heißt *Kurve* 

**Reguläre Kurve:** Eine Kurve heißt *regulär*, falls sie stetig differenzierbar ist, d.h.

$$\frac{d}{dt} C(t) = \left(\frac{d}{dt} c_1(t), \cdot \frac{d}{dt} c_n(t) \right) \neq 0$$

für alle $t \in \mathcal{I}$. Jede reguläre Kurve hat damit in jedem Kurvenpunkt einen Tangentenvektor

**Kurvenlänge:** Sei $\mathcal{I} = [a, b] \subset \mathbb{R}$ ein Interval und die Kurve $C$ darauf regulär. Die Länge $L$ von $C$ bezüglich $\mathcal{I}$ ist gegeben durch:

$$L(C) = \int_a^b |C'(t)| \ dt$$

### Beispiele von Kurven
**Geraden:** Eine gerade durch den Punkt $c_0 \in \mathbb{R}^2$ mit Richtung $v \in \mathbb{R}^2 \setminus \{0\}$ wird parametrisiert dargestellt durch

$$c: \mathbb{R} \to \mathbb{R}^2, t\mapsto c(t) = c_0 + tv$$

Es gilt $\frac{d}{dt} c(t) = v \neq 0$ für alle $t \in \mathbb{R}$, d.h. die Kurve ist *regulär*

![[Screenshot from 2025-02-19 19-42-06.png|500]]

**Kreise:** Die implizite Darstellung einer Kreislinie mit Mittelpunkt $(0, 0)$ und Radius $r > 0$ ist gegeben durch $\{(x,y) \in \mathbb{R}^2 | x^2 + y^2 = r^2\}$. Sie wird parametrisiert durch

$$c: \mathbb{R} \to \mathbb{R}^2, t \mapsto c(t) = \begin{pmatrix}r \cdot \cos(t) \\ r \cdot \sin(t)\end{pmatrix}, t \in [0, 2\pi)$$

Für die erste Ableitung gilt: $\frac{d}{dt} c(t) = \begin{pmatrix}-r \cdot \sin(t) \\ r \cdot \cos(t)\end{pmatrix} \neq 0$

![[Screenshot from 2025-02-19 19-46-36.png|500]]

**Schraubenlinie:** Eine Schraubenlinie im Dreidimensionalen lässt sich parametrisch darstellen als:

$$c: \mathbb{R} \to \mathbb{R}^3, t \mapsto \begin{pmatrix}r \cdot \sin(t) \\ r\cdot \cos(t) \\ h \cdot t\end{pmatrix}$$

wobei $r, h > 0$

![[Screenshot from 2025-02-19 19-48-49.png|500]]

## Polynomiale Kurven
Eine polynomiale Kurve $C$ ist eine parametrische Kurvendarstellung $C(t)$, bei der die einzelnen komponentenweise definierten Funktionen $c_i(t)$ Polynome $n$-ten Grades in $t$ sind, d.h.

$$c_i(t) = a_{i,0} + a_{i,1}t + a_{i,2}t^2 + \dots + a_{i,n}t^n$$

$C$ lässt sich damit definieren als


$C(t) = \sum^n_{i=0} a_i t^i = a_0 + a_1t + a_2t^2 + \dots + a_nt^n$


mit den $a_i \in \mathbb{R}^n$ als Kontroll- oder Stützpunkte (bzw. Vektoren), über die die Gestalt und der Verlauf der Kurve spezifiziert wird

- in der Praxis meistens **quadratische** oder **kubische Polynome** ($n = 2$ oder $n = 3$)
- Tangentialvektor $C'(t)$ | Gerade an einer Stelle $C(t)$ mit gleicher Richtung wie Tangentialvektor wird auch **Kurventangente** genannt
- eine stückweise zusammengesetzte, polynomiale Kurve $C$ wird durch eine Reihe von polynomialen Kurven $Q_i$ (**Kurvensegmente**) definiert, d.h. $C = \bigcup Q_i$

### Kontinuität
**Geometrische Kontinuität:**
- $Q_1$ und $Q_2$ sind an ihrer Nahtstelle $G^0$-geometrisch kontinuierlich (auch $G^0$-stetig), falls $Q_1(1) = Q_2(0)$
	- "sie stimmen in ihrer Position überein"
- $Q_1$ und $Q_2$ sind an ihrer Nahtstelle $G^1$-geometrisch kontinuierlich, falls $\frac{d}{dt} Q_1(1) = \frac{d}{dt}k \cdot Q_2(0), k > 0$
	- d. h. ihre Tangentialvektoren besitzen dieselbe Richtung, aber evtl. unterschiedliche Längen
- Allgemein: $Q_1$ und $Q_2$ sind an ihrer Nahtstelle $G^i$-geometrisch kontinuierlich, falls sie richtungsmässig (Tangentialvektor) in ihrer $i$-ten Ableitung übereinstimmen
	- exakte Gleichheit für $C^i$-parametrisch kontinuierlich

**Parametrische Kontinuität:**
- $Q_1$ und $Q_2$ sind an ihrer Nahtstelle $C^1$-parametrisch kontinuierlich, falls $Q'_1 (1) = Q'_2(0)$
- Allgemein: $Q_1$ und $Q_2$ sind an ihrer Nahtstelle $C^n$-parametrisch kontinuierlich, falls $\frac{d^i}{dt^i} Q_1(t) = \frac{d^i}{dt^i} Q_2(0), 0 \leq i \leq n$
	- d. h. die i-ten Ableitungen stimmen an der Nahtstelle überein

![[Screenshot from 2025-02-20 18-56-35.png|500]]

---
# Bézier-Kurven
- Grad $n$: $n + 1$ Stützpunkte $p_i$
- $B_i^n$ ist $i$-tes Bernstein-Polynom mit Grad $n$
- Gewichtung: $Q(t) = \sum_{i = 0}^n B_i^n(t) \cdot p_i$
- **Bézier-Kurve:** $C := \{Q(t) | t \in [0, 1]\}$

## Bernstein-Polynome
Seien $n \in \mathbb{N}_0$ und $0 \leq i \leq n$ natürliche Zahlen und $t \in [0, 1]$. Das $i$-te Bernstein-Polynom vom Grad $n$ ist definiert als

$$B_i^n(t) = \binom{n}{i} t^i (1 - t)^{n - i}$$

### Eigenschaften
**Bernstein-Polynome:**
1. Positivität: für $0 \leq t \leq 1$ gilt $0 \leq B_i^n(t) \leq 1$
2. Zerlegung der Eins: $\sum_{i = 0}^n B^n_i(t) = 1$
	- **Konvexkombination der $p_i$:** Positivität und Zerlegung der Eins $\Rightarrow$ Jeder Kurvenpunkt ist Element der konvexen Hülle seiner Stützpunkte
3. Extrema: $B_i^n(t)$ besitzt genau ein absolutes Maximum an der Stelle $t = \frac{i}{n}$
4. Symmetrie: $B^n_i(t) = B^n_{n-i}(1 - t)$
5. Ableitung: $\frac{d}{dt} B^n_i(t) = n(B^{n-1}_{i-1}(t) - B_i^{n-1}(t))$
6. Rekursion: $B_i^n(t) = (1- t)B_i^{n-1}(t) + tB_{i-1}^{n-1}$ mit $B^n_i(t) := 0$ für $i < 0$ oder $i > n$ sowie $B_0^0(t) := 1$

> [!caution] Berstein-Polynome: Eigenschaft und $n = 2$ bis $n = 4$ durchgehen, Konvexkombination (KLAUSURRELEVANT)

**Bézier-Kurven:**
1. Die Punkte $P_0$ und $P_n$ werden durch die Kurve interpoliert und tatsächlich erreicht
2. Die Punkte $P_1$ bis $P_{n-1}$ werden approximiert, d.h. die Kurve verläuft in der Nähe
3. Die Bézier-Kurve befindet sich immer **vollständig in der konvexen Hülle** der Menge der Punkte $\{P_0, \dots, P_n\}$
4. Der Linienzug $P_0, \dots, P_n, P_0$ wird als **charakteristisches Polygon** der Bézier-Kurve bezeichnet
5. Die Tangente im Anfangspunkt ist gegeben durch den Vektor $n \cdot (P_i - P_0)$
6. Die Tangente im Endpunkt ist gegeben durch den Vektor $n \cdot (P_n - P_{n-1})$
7. Eine Bézier-Kurve durch $n + 1$ Punkte ist eine polynomiale Kurve vom Grad $n$
8. Jeder einzelne Punkt $P_i$ hat einen "globalen" Einfluss, d.h. Einfluss auf den gesamten Kurvenverlauf
	- $\Rightarrow$ mehr Stützstellen heißt nicht mehr Kontrolle, stattdessen werden komplexe Kurven aus Teilkurven mit niedrigem Grad zusammengesetzt

![[Screenshot from 2025-02-20 09-38-03.png|500]]
## Zusammengesetzte Bézier-Kurven
- Verbindung der Kurvensegmente über einen gemeinsamen End- bzw. Anfangspunkt
- $G^1$-kontinuierlich, wenn $P_3 - P_2 = k(P_4 - P_3), k > 0$
	- gleiche Richtung vor und hinter gemeinsamem Verbindungspunkt $P_3$
- $C^1$-kontinuierlich, wenn $P_3 - P_2 = P_4 - P_3$
	- zusätzlich gleiche Länge vor und hinter gemeinsamem Verbindungspunkt $P_3$

## Rekursive Konstruktion eines Bézier-Kurvenpunktes (De-Casteljau-Algorithmus)
Für die Bézier-Kurve zu den Punkten $P_0, \dots, P_n$ gilt:

$$Q_{0, \dots, n}(t) = (1 - t) \cdot Q_{0, \dots, n-1}(t) + t \cdot Q_{1, \dots, n}$$

Dabei wird also die Stützpunkte-Menge also in zwei Mengen mit Größe $n-1$ geteilt. Dies kann rekursiv wiederholt werden

### Algorithmus
Wir definieren $P_0^0 := P_0, \dots, P_n^0 :P_n$. Für $1 \leq j \leq n$ und $1 \leq i \leq n - j$ berechnen wir den Punkt $P_i^j$ durch

$$P_i^j = (1 - t) P_i^{j - 1} + tP_{i+1}^{j-1}$$

Der gesuchte Punkt $Q_{0, \dots, n}(t)$ ist gegeben durch $P_0^n$

- Rekursives Verfahren, das die jeweilige Kurve in zwei Unterkurven unterteilt und durch Interpolation die Kurvenpunkte berechnet
- Zeitaufwand: $\mathcal{O}(n^2)$
- Numerisch stabil, da stets nur Konvexkombination berechnetet Daten erzeugt werden
- $\Rightarrow$ Effizienter, numerisch stabiler Algorithmus zur Berechnung von Kurvenpunkte
- **Verwendung:** z.B. Definition von Schriftzeichen (*Glyphs*) für Zeichensätze (*Fonts*)

![[Screenshot from 2025-02-21 21-27-46.png|500]]

![[Screenshot from 2025-02-21 21-27-53.png|500]]

---
# Kubische Hermitisches Splines
- stückweise definierte, kubische polynomial definierte Kurve $C$, die durch eine Menge von $n$ Kontrollpunkten $p_0, p_1, \dots, p_{n-1}$ definiert ist
- Die Kurve interpoliert die Stützpunkte, sie werden also allesamt einmal erreicht ($C(t_i) = p_i)$
- Kurvensegmente sind abschnittsweise zwischen den Stützpunkten definiert $\Rightarrow$ konstanter Grad, unabhängig von $n$
- Tangente an Stützpunkt entspricht Richtungsvektor zwischen benachbarten Stützpunkten
- im Allgemeinen $C^1$-kontinuierlich, aber nicht $C^2$-kontinuierlich
- **keine Konvexe-Hülle-Eigenschaft**

$m$ sind Tangentenvektoren, anstatt Punkten $p$

---
# B-Spline
- Splines repräsentieren kontinuierliche Kurven mit **beliebig vielen Kontrollpunkten**, die jeweils nur *lokalen Einfluss* auf den Kurvenverlauf haben
- Splines setzen sich aus **stückweise zusammengesetzten, polynomial definierten Kurvensegmenten** zusammen, die jedoch nicht einzeln spezifiziert werden, sondern sich aus den Kontrollpunkten und Parametervektoren ergeben
- frei **wählbarer Polynomgrad**
- Zusätzlich zu den Kontrollpunkten wird ein **Knotenvektor** spezifiziert, der die Gewichte der Kontrollpunkte ausdrückt
- **Uniforme Splines** besitzen im gesamten Kurvenverlauf gleiche Stetigkeitseigenschaften. Bei einem Grad $k > 0$ sind die Nahtstellen der Kurvensegmente $C^{k-1}$-kontinuierlich (z.B. für kubische B-Splines gilt $C^2$-Kontinuität)

## Definition
- $n+1$ Kontrollpunkte: $P = \{P_0, \dots, P_n\}$ mit $P_i \in \mathbb{R}^3$
- konstanter Polynomgrad $k \in \mathbb{N}^+$
- Knotenvektor $T = (t_0, \dots t_n, t_{n+1}, \dots, t_{n + k + 1})$, eine wachsende Folge mit $n + k + 2$ Werten $t_i \in \mathbb{R}$
- für jedes $t$ ergibt sich $Q(t)$ als gewichtete Summe der Punkte $P_i$

Die B-Spline-Kurve $C$ ist definiert wie folgt

$$C = \{Q(t) | t \in [t_0, t_{n + k + 1}]\}$$

mit

$Q(t) = \sum^n_{i=0} B_{i, k+1}(t) P_i$

mit den B-Spline-Basisfunktionen $B$ (nicht Berstein-Polynome!)

## B-Spline-Basisfunktionen
- Rekursive Definition auf Basis von Polynomen niedrigeren Grades
- Einflussbereiche der Punkte werden über die Knotenwerte in $T$ definiert

$$B_{i,j} = \frac{t - t_i}{t_{i+j - 1} - t_i} B_{i, j - 1}(t) + \frac{t_{i + j} - t}{t_{i + j} - t_{i + 1}} B_{i+1, j - 1}(t)$$

$$B_{i, 1}(t) = \begin{cases}0 & t_i \leq t < t_{i + 1} \\ 0 & \text{sonst}\end{cases}$$

![[Screenshot from 2025-02-19 20-05-52.png|500]]

![[Screenshot from 2025-02-20 09-39-37.png|500]]

**Einflussbereich:** Wird durch den Polynomgrad bestimmt
- der Einflussbereich von $B_{i,4}$ ergibt sich aus der Vereinigung der Einflussbereiche von $B_{i, 1}, B_{i+1, 1}, B_{i+2, 1}$ und $B_{i+3, 1}$
	- Der Einflussbereich ist damit $[t_i, t_{i+4})$
- **Lokaler Kontrollpunkteinfluss:** Einflussbereich eines Kontrollpunktes $P_i$ ergibt sich aus dem Wirkungsbereich der Gewichtungsfunktion $B_{i, n + 1}$
	- Da die Gewichtungsfunktionen im Allgemeinen nur in einem Teilabschnitt $> 0$ sind, hat $P_i$ nur lokalen Einfluss
	- Lokaler Kontrollpunkteinfluss ist die Voraussetzung für die flexible Gestaltung komplexer Kurven

![[Screenshot from 2025-02-20 09-43-05.png|500]]

![[Screenshot from 2025-02-20 09-43-54.png|500]]

## Kontrollpunktgewichtung
- Kurvenpunkte ergeben sich als Summe gewichteter Kontrollpunkte mit lokalem Einfluss: $Q(t) = \sum_{i=0}^n B_{i, 4}(t) P_i$
- Aufbau des Knotenvektors $T$ entscheidet *maßgeblich* über Kontrollpunkteeinfluss
- **Knotenmultiplizität:** $x$-faches Gleichsetzen eines Knotenwertes (Knotenmultiplizität $x$) bewirkt, dass gezielt die Stetigkeit zwischen zwei Kurvensegmenten reduziert wird

![[Screenshot from 2025-02-20 09-51-59.png|500]]

## Typen von B-Splines
- **Geschlossene** B-Splines: Anfangskontrollpunkte werden am Ende der Kontrollpunktfolge wiederholt | z.B. $P_0, \dots, P_{n^*}, P_0, P_1, P_2$
- **Uniforme** B-Splines: Knotenwerte sind äquidistant | $t_{i+1} - t_{i} = \delta$ konstant für innere Knoten des Knotenvektors
- **Nichtuniforme** B-Splines: Knotenwerte sind nicht äquidistant
- **Nichtrationale** B-Splines: $x(t), y(t)$ und $z(t)$ sind Polynome in $t$
- ==**Rationale** B-Splines:== $x(t) = X(t)/W(t), y(t) = Y(t) /W(t)$ und $z(t) = Z(t) / W(t)$ sind Polynombrüche in $t$ mit $W(t)$ als Polynome gleichen Grades wie $x(t), y(t)$ und $z(t)$
- **NURBS:** Nicht-uniforme (NU), rationale (R) B-Splines (BS)

> [!caution] Definitionen Bezier vs. Spline (auch rekursiv) können

---
# Parametrische Flächen
- Darstellung ähnlich zu Splines, aber über Punktegitter
- Fläche entsteht durch Kombination zweier Kurven

## Patches
### Kurvenfamilie
- Der Rand eines Patches bezüglich $u$- bzw. $v$-Dimensions des Parameterraums wird durch eine **Randkurve** geformt
- Für ein feste $u$ (bzw. ein festes $v$) ergibt sich aus der Flächenfunktion stets eine eindimensional parametrisierte Kurvenfunktion
- Die Geometrie eines Patches ist durch das **reguläre 2D-Gitter** seiner Kontrollpunkte festgelegt
	- jeder Gitterpunkt entspricht einem Kontrollpunkt im $\mathbb{R}^3$
	- Die Kontrollpunkte eines Patches werden im Allgemeinen in einem 2D-Array gespeichert
	- Die Kontrollpunkte werden zur Berechnung eines Patchflächenpunktes gewichtet summiert; die Gewichtung wird durch Mischfunktionen definiert

### Definition
- Sei $p(u,v)$ eine zweifach parametrisierte polynomiale Funktion $p: \mathbb{R}^2 \rightarrow \mathbb{R}^3$ mit $u, v \in [0,1]$
- Ein Patch $P$ ist definiert durch $$P = \{p(u,v) \in \mathbb{R}^3 \ | \ u, v \in [0, 1]\}$$
- Die Normale im Punkt $p(u,v)$ ist gegeben durch $\frac{\delta p}{\delta u}(u,v) \times \frac{\delta p}{\delta v}(u,v)$
- Die geometrische Form von $P$ im $\mathbb{R}^3$ wird durch die Kontrollpunkte und Knotenvektoren von $p$ gesteuert
- Das Rendering eines Patches erfolg z.B. durch Triangulation der Oberfläche mit einer festen oder adaptiven (z.B. sichtabhängigen) Auflösung

### Bilineare Patches
- Sonderfall mit 4 Kontrollpunkten
- verwendet lineare Interpolation entlang der beiden Achsen
- entspricht Bézier-Patch mit Grad 1

---
# Bezier-Flächen
Eine **Bézier-Fläche** (*Bézier Surface, Bézier Patch*) ist eine parametrische Fläche auf Basis von Bernstein-Polynomen $n$-ten Grades mit einem $(n + 1) \times (n + 1)$-Kontrollpunktgitter mit den Kontrollpunkten $P_{i,j}$

$$p(u,v) = \sum_{i = 0}^n \sum_{j = 0}^n B_i^n(u) B_j^n(v) P_{i,j}$$

mit $0 \leq u,v \leq 1$
- Im Allgemeinen habe die Bernsteinpolynome in $u$ und $v$ denselben Grad (häufigster Fall ist $n = 3$)

## Eigenschaften
- **Konvexe-Hülle-Eigenschaft:** Das Bézier-Flächenstück liegt in der konvexen Hülle des definierenden Kontrollnetzes 
- **Globaler Einfluss der Kontrollpunkte:** e: Alle Kontrollpunkte beeinflussen global die Bézier-Fläche
- **Interpolation der Eckpunkte:** Die vier Eckpunkte des Kontrollnetzes und die Eckpunkte der Fläche stimmen überein
- **Bézier-Randkurven:** Die Randpunkte des Kontrollnetzes sind die Bézier-Punkte der Randkurven der Fläche
- **Planarität:** Genau dann eben, wenn das Kontrollnetz in einer Ebene liegt

### Ableitungen und Normalen
Gradienten durch partielle Ableitungen:

$$\frac{\delta p(u,v)}{\delta u} = n \sum_{i=0}^{n-1} \sum_{j=0}^n B_i^{n-1} (u) B_j^n(v) (p_{i+1, j} - p_{i, j})$$

$$\frac{\delta p(u,v)}{\delta v} = n \sum_{i=0}^{n} \sum_{j=0}^{n-1} B_i^{n} (u) B_j^{n-1}(v) (p_{i, j+1} - p_{i, j})$$

Die Normale ein einem Flächenpunkt kann durch das Kreuzprodukt der Gradientenvektoren berechnet werden:

$$n(u,v) = \mathrm{normalize}\left( \frac{\delta p(u,v)}{\delta u} \times \frac{\delta p(u,v)}{\delta v} \right)$$

### Kontinuitätsbedingungen
- $G^0$ und $C^0$-Kontinuität: Durch 4 gemeinsame Kontrollpunkte entlang der gemeinsamen Flächenkante
- $G^1$-Kontinuität: 2 Kontrollpunktmengen zur Seite der gemeinsamen Flächenkante

## Triangulierung von Bézier-Flächen
- Für das Rendering werden Bézier-Flächen durch Dreiecksnetze approximiert
- Triangulierung sollte adaptive erfolgen, um optimale Netzauflösung bezüglich Canvas zu gewährlesiten
- Tesselation sollte von der GPU (vollständig) übernommen werden, um Rendering-Effizienz zu maximieren
- An gemeinsamen Patch-Rändern muss über entsprechende Auflösung das Mesh „vernäht“ werden (z.B. bei nicht-uniformer Tesselation)

![[Screenshot from 2025-02-20 10-15-46.png|500]]

---
# B-Spline-Flächen
- Entkopplung von Grad und Anzahl der Punkte (==???==)
- Eine **B-Spline-Fläche** ist eine zwei-dimensional un $u$ und $v$ parametrisierte Fläche $S = \{p(u,v) | u,v \in [0, 1]\}$
- $S$ wird durch ein Kontrollpunkt-Gitter spezifiziert, dass $(n_u + 1) \times (n_v + 1)$ viele Punkte $P_{i,j} \in \mathbb{R}^3$ enthält
- Die Punkte $P_{i, j}$ werden durch die polynomialen Funktionen $N_{i, k_u}$ bzw. $N_{j, k_v}$ gewichtet, deren Polynomgrad $k_u$ in Dimension $u$ bzw. $k_v$ in Dimension $v$ sei
	- meist $k_u = k_v$
	- die minimale Anzahl der Punkte in der $u$- bzw. $v$-Dimension wird durch den ==Polynomgrad $n_u$ bzw. $n_v$ definiert (nicht $k_u$ und $k_v$???)==
- Die Knotenvektoren, die in der Definition der $N$-Funktionen verankert sind, sind bezüglich $u$ bzw. $v$ definiert als $U = \{u_0, u_1, \dots, u_{n_u + k_u + 1}\}$ bzw. $V = \{v_0, v_1, \dots, v_{n_v + k_v + 1}\}$

Die **B-Spline-Flächen-Funktion** $p$ ist definiert wie folgt:

$$p(u,v) = \sum_{i = 0}^{n_u} \sum_{j = 0}^{n_v} N_{i, k_u} (u) N_{j, k_v} (v) P_{i, j}$$

![[Screenshot from 2025-02-20 10-24-49.png|500]]

## Eigenschaften
- **Lokaler Einfluss**
- **Nichtnegativität:** $\forall u,v \in [0,1]: N_{i, n_u}(u) \geq 0 \land N_{j,n_v}(v) \geq 0$
- **Partition der Eins:** $\forall u,v \in [0, 1]: \sum_{i=0}^{n_u} \sum_{j=0}^{n_v} N_{i, n_u}(u) N_{j,n_v}(v) = 1$

Rekursive Definition der Basis-Funktion $N$:

$$N_{i,k}(u) = \frac{u - u_i}{i_{i+k} - u_i} N_{i, k-1}(u) + \frac{u_{i + k + 1} - u}{u_{i + k + 1} - u_{i - 1}} N_{i + 1, k - 1}(u)$$

$$N_{i , 0} = \begin{cases}1 & u_i \leq u \leq u_{i+1} \\ 0 & \text{sonst} \end{cases}$$

## NURBS-Flächen
Nicht-uniforme rationale B-Spline-Flächen
- Verallgemeinerung durch rationalen Polynomfunktionen
- Generalisierung der polynombasierten, parametrischen Flächen
- Zusätzlich pro Punkt: Gewicht $w$
	- mit den Kontrollpunkten im homogenen Koordinatenrau, $P = (wy, wy, wz, w)$

Definition:

$$p(u,v) = \frac{\sum_{i = 0}^{n_u} \sum_{j = 0}^{n_v} N_{i, k_u}(u) N_{j, k_v}(v) w_{i,j}p_{i,j}}{\sum_{i = 0}^{n_u} \sum_{j = 0}^{n_v} N_{i, k_u}(u) N_{j, k_v}(v) w_{i,j}}$$