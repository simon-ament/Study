---
title: Rasterisierung
---
# Rasterisierung
Rasterisierung und die damit verbundene Diskretisierung ist allgemein weder eindeutig noch perfekt möglich
- Häufig entstehen dabei **Aliasing-Artefakte** ("Treppenstufen"), die mit **Antialiasing-Methoden** abgeschwächt werden können

![[Screenshot from 2025-02-20 15-58-15.png|500]]

## OpenGL-Pipeline

![[Pasted image 20250224164152.png]]

---
# Midpoint-Algortihmus
Pixel als auf der Linie gegeben ansehen
$\Rightarrow$ Steigung der Linie sei o.B.d.A $\leq 45°$ (andernfalls $x$ und $y$ tauschen)
$\Rightarrow$ es kommen nur noch zwei Pixel für die nächste Spalte in Frage: East (E) und North-East (NE)
- $E: (x_p, y_p) \mapsto (x_p + 1, y_p)$
- $NE: (x_p, y_p) \mapsto (x_p + 1, y_p + 1)$

**Auswahlkriterium:** Wir betrachten den Mittelpunkt $M$ zwischen $N$ und $NE$. Liegt die Linie über oder unter $M$?

**Liniengleichung:**

$$f(x) = y = a \cdot x + b = \frac{\Delta y}{\Delta x} \cdot x + b$$

**Implizite Form ($\alpha x + \beta y + \gamma = 0$):**

$$\Delta x \times y = \Delta y \cdot x + \Delta x \cdot b \Leftrightarrow 0 = \Delta y \cdot x - \Delta x \cdot y + \Delta x \cdot b = F(x,y)$$

**Eigenschaften:** Für $M = (x_p + 1, y_p + \frac{1}{2})$ gilt
- $F(x_m, y_m) = 0$ falls $(x_m, y_m)$ auf der Linie
- $F(x_m, y_m) > 0$ falls $(x_m, y_m)$ unterhalb der Linie
- $F(x_m, y_m) < 0$ falls $(x_m, y_m)$ oberhalb der Linie

**Entscheidungsvariable:**

$$d := F(x_p + 1, y_p + \frac{1}{2})$$

1. Es wurde $E$ gewählt: $d_{i+1} - d_i = \Delta y$ also $d_{i+1} = d_i + \Delta y = d_i + \Delta E$
2. Es wurde $NE$ gewählt: $d_{i+1} - d_i = \Delta y - \Delta x$ also $d_{i+1} = d_i + \Delta y - \Delta x = d_i + \Delta E$

$d_0 = \Delta y - \frac{\Delta x}{2}$, da allerdings nur das Vorzeichen relevant ist, betrachten wir nachfolgend $2d_0 = 2 \cdot \Delta y - \Delta x$ und entsprechend $2 \cdot F(x,y)$

## Ablauf
**Initialwerte:** $d_0 = 2 \cdot \Delta y - \Delta x$ | $\Delta E = 2 \cdot \Delta y$ | $\Delta NE = 2 \cdot (\Delta y - \Delta x)$

1. **Falls *E* gewählt wird:** $d_{i+1} = d_i + 2 \cdot \Delta y$
2. **Falls *NE* gewählt wird:** $d_{i+1} = d_i + 2 \cdot (\Delta y - \Delta x)$

![[Screenshot from 2025-02-20 16-00-02.png|500]]

```ts
const rasterizeLine = (x0: number, y0: number, x1: number, y1: number): void => {
	const dx = x1 - x0;
	const dy = y1 - y0;
	
	const dE = 2 * dy;
	const dNE = 2 * dy - 2 * dx;
	
	writePixel(x0, y0);

	let [x, y, d] = [x0, y0, 2 * dy - dx];
	while (x < x1) {
		if(d <= 0) {
			d += dE;
		} else {
			d += dNE;
			y ++;
		}
		
		x ++;
		writePixel(x, y);
	}
};
```

---
# Midpoint-Algorithmus für Primitive
Das Primitiv $P$ sei vollständig durch eine implizite Funktion $F(x,y)$ definiert:

$$P=\{(x,y)|F(x,y) = 0\} \subset \mathbb{R}^2$$

- $F(x,y) = x^2 + y^2 - r^2$: Kreis mit Mittelpunkt im Ursprung und Radius $r$
- $F(x,y) = x + y$: Diagonale
- etc.

Weiter sei die Rasterisierung von $P$ dadurch vereinfacht, dass Symmetrien (z. B. 8-fache Symmetrie des Kreises) ausgenutzt sowie degenerierte Primitive (z. B. Linien, deren Anfangs- und Endpunkt übereinstimmen) und Sonderformen (z. B. horizontale Linien) separat behandelt werden

**Arbeitsweise:**
- Berechnung erfolgt inkrementell von einem Pixel $(x_i, y_i) \in P$ zum nächsten $(x_{i+1}, y_{i+1}) \in P$ (z.B. entlang einer Hauptachse wie der $x$-Achse mit $x_{i+1} = x_i + 1)$
- Bei jedem Schritt wird die Kandidatenpixelmenge möglichst klein gehalten (z.B. nur $Q = \{N, NE\}$)
- Entscheidungsvariable $d$ wird inkrementell berechnet und mitgeführt (z.B. $d_{i+1} = d_i + \Delta(Q_j)$, wobei $\Delta(E)$ bzw. $\Delta(NE)$ im Mindpoint-Linienalgorithmus Konstanten sind)

---
# Midpoint-Circle-Algorithmus
- Kreis ist 8-fach symmetrisch $\Rightarrow$ nur ein Oktant muss berechnet werden
- Wir betrachten oberen rechten Oktanten
- Wir nehmen einen Pixel $P$ als gegeben an
- Kandidatenpixel in $x$-Richtung sind $E$ und $SE$
- Entscheidungsvariable ist $d := F(M) = F(x_p + 1, y_p - \frac{1}{2})$
	- Falls $d < 0$, wähle $E$ ($M$ unterhalb des Kreisbogens)
	- Falls $d > 0$, wähle $SE$ ($M$ oberhalb des Kreisbogens)
	- Falls $d = 0$, wähle konsistent entweder $E$ oder $SE$
- $d_0 = 1 - r$ (aufgrund von eliminiertem Bruch eigentlich $d < -\frac{1}{4}$ statt $d < 0$, doch wir betrachten nur ganze Zahlen)
- $\Delta E = 2x_p + 3$
- $\Delta SE = 2x_p - 2y_p + 5$

![[Screenshot from 2025-02-20 16-01-30.png|500]]

![[Screenshot from 2025-02-20 16-01-34.png|500]]

---
# Dreiecksrasterisierung
- Scanline-Verfahren: horizontale / vertikale Pixellinien durch Dreieck durchgehen
- Rasterisierung im Anschluss an perspektivische Projektion (3D $\rightarrow$ 2D)

## Algorithmus

1. Sortiere Ecken des Dreiecks anhand der $y$-Koordinate: ($v_0, v_1, v_2)$
	- $\Rightarrow$ $\{(x_0, y_0), (x_1, y_1), (x_2, y_2)\}$ mit $y_0 \leq y_1 \leq y_2$
2. Rasterisiere untere Hälfte
	- das heißt zwischen $E_{01} = \overline{v_0v_1} = E_\text{bottom}$ und $E_{02} = \overline{v_0v_2} = E_\text{major}$
3. Rasterisiere obere Hälfte
	- das heißt zwischen $E_{12} = \overline{v_1v_2} = E_\text{top}$ und $E_{02} = \overline{v_0v_2} = E_\text{major}$
- Ziel: je Hälfte genau 2 Kanten mit 1 Segment pro Scanline

![[Screenshot from 2025-02-20 16-26-39.png|500]]

**Für jede Kante:** Berechnung von $\frac{1}{a} = \frac{\Delta x}{\Delta y}$

$$\Delta_{02} = \frac{x_2 - x_0}{y_2 - y_0}, \Delta_{01} = \frac{x_1 - x_0}{y_1 - y_0}, \Delta_{12} = \frac{x_2 - x_1}{y_2 - y_1}$$

**Für jede Hälfte:** Anzahl der Scanlines berechnen: 

$$N_{top} = y_2 - y_1, N_{bottom} = y_1 - y_0$$

![[Screenshot from 2025-02-20 16-32-47.png|500]]

### Segment-Rasterisierung
- Aus einem Segment entstehen Fragmente
- Fragmente werden in der Rendering-Pipeline in der **Rasterisierungsstufe** ausgewertet
	- d.h. es werden Werte für **Farbe, Beleuchtung, Texturen** etc. ermittelt
	- am Ende werden i.d.R. ein Farbwert und ein Tiefenwert berechnet, die in den Framebuffer bzw. den Tiefenbuffer geschrieben werden

![[Screenshot from 2025-02-20 16-34-11.png|500]]

![[Screenshot from 2025-02-20 16-34-30.png|500]]

## Tiefenwerte
Rasterisierung ermöglicht Fragment-Berechnung mit $z$-Wert
- dazu zweifache lineare Interpolation:
	1. entlang der Kanten
	2. in der Scanline

Neben Tiefenwerte können auch andere allgemeine Eckwerte (z.B. Farben, Texkturkoordinaten, etc.) auf diese Weise interpoliert werden

![[Screenshot from 2025-02-20 16-37-40.png|500]]

$$z_a = z_2 - (z_2 - z_0) \cdot \frac{y_2 - y_s}{y_2 - y_0}$$

$$z_b = z_2 - (z_2 - z_1) \cdot \frac{y_2 - y_s}{y_2 - y_1}$$

$$z_c = z_b - (z_b - z_a) \cdot \frac{x_b - x_c}{x_b - x_a}$$

### Inkrementelle Berechnung
Ebenengleichung für das Dreieck: $\alpha x + \beta y + \gamma z + \delta = 0$
- $\alpha, \beta, \gamma$ stellen Normalenvektor dar

Ebenenkoeffizienten: $(v_2 - v_0) \times (v_1 - v_0) = [\alpha, \beta, \gamma]$

$\Delta z_x = \frac{-\alpha}{\gamma}$ (Veränderung von $z$ bei horizontaler Bewegung, Schrittweite 1)
$\Delta z_y = \frac{- \beta}{\gamma}$ (Veränderung von $z$ bei vertikaler Bewegung, Schrittweite 1)

> [!caution] Vermutlich irrelevant

---
# Baryzentrischen Koordinaten
$P(\alpha, \beta,\gamma) = \alpha v_0 + \beta v_1 + \gamma v_2$ mit $\alpha + \beta + \gamma = 1$ nennen wir baryzentrische Koordinaten
- für Punkte innerhalb des Dreiecks $(v_0, v_1, v_2)$ gilt $\alpha, \beta, \gamma \geq 0$
- zwei Koeffizienten bestimmten den dritten: $\alpha = 1 - \beta - \gamma$

Bayzentrische Koordinaten sind proportional zu Größe der Dreiecke, in die ein Punkt im Inneren eines Dreiecks dieses zerlegt
- Können ebenfalls verwendet werden, um Eckwerte zu interpolieren
- **Anwendung:** erst Bounding Box berechnen, und dann für jedes Fragment innerhalb dieser die Baryzentrischen Koordinaten berechnen und das Vorzeichen prüfen ($\alpha < 0 \land \beta < 0 \land \gamma < 0$) $\Rightarrow$ **Dreiecksrasterisierung**

![[Screenshot from 2025-02-18 23-31-34.png|500]]

---
# Edged Function Testing
Benötigen Funktion $E: \mathbb{R}^2 \rightarrow \mathbb{R}$ mit folgenden Eigenschaften:
- $E(p) > 0$ wenn $P$ auf der rechten Seite der Kante
- $E(p) = 0$ wenn $P$ exakt auf der Kante
- $E(p) < 0$ wenn $P$ auf der linken Seite der Kante

Edge Function in Bezug auf die Kante $v_0v_1$ ist:

$$E_{01} = (P.x - v_0.x) \cdot (v_1.y - v_0.y) - (P.y - v_0.y) \cdot (v_1.x - v_0.x)$$

*Herleitung über Kreuzprodukt und dessen Orientierung*
- $E_{01}$ entspricht der vorzeichenbehafteten Länge des Vektors, der durch das Kreuzprodukt zwischen $a$ und $b$ definiert wird

> [!caution] Herleitung zum Verständnis des Kreuzprodukts nochmal anschauen, aber irrelevant

**Winding Order:** Die Reihenfolge, in der die Vertices ein Dreieck bilden, beeinflusst das Ergebnis der Kantenfunktion sowie die Ausrichtung der Oberflächennormale!
