---
title: Rasterisierung
---
# Rastergraphik-Operationen
## Bildtransformation
- Umwandlung der Farbwerte eines RGB-Rasters nach Graustufen
	- jeweiliger Farbwert in Bitdarstellung durch 255 teilen
	- $(r, g, b) \mapsto 0,299r + 0.587g + 0.144b$ (*magic numbers*) je nach Farbmodell
	- multipliziert mit 255 wieder 8 Bit Wert

---
# Bildtransformation
```
for i {
	for j {
		p_i_j <- f(p_i_j)
	}
}
```
*Anmerkung:* Doppelte Schleife nur didaktisch

**Beispiele für `f`:**
- Graustufen (*magic numbers*)
- Entsättigung (z.B. Rot-Werte herabsetzen)
- Transparenz (einzelne Farbe herausfiltern)
- Farbreduktion (z.B. 8-Bit $\rightarrow$ 4-Bit)

**Bildfilterung:**
- Analog zu Transformation, allerdings wird neben dem Pixel auch seine Nachbarschaft betrachtet
- Kante = große Differenz in der Helligkeit zwischen Pixel in einer Nachbarschaft

## Farbquantisierung
1. Sampling der Eingangsdaten und Erstellen einer Farbstatistik (meist Histogramm)
2. Erstellen einer Farbtabelle auf der Basis der Statistik (z.B. durch Clustering)
3. Prozessierung der Eingangsdaten durch Auswahl der neuen Farbe aus der Farbtabelle für die Pixel
$\Rightarrow$ Kompression (z.B. bei JPEG)

### Median-Cut-Algorithmus
Versucht Farben zu finden, die möglichst jeweils eine gleiche Zahl an ähnlichen Farben im echten Bild repräsentieren
- rekursive Unterteilung des RGB-Farbraums in RGB-Farbwürfel mit gleicher Anzahl an enthaltenen Farben
- Ersetzung der Farben durch Median in jeweiligen RGB-Farbwürfel, nachdem eine gegebenen Anzahl $n$ an Teilwürfel erreicht wurde

### Dithering
Approximation des gegebenen Bildes durch gegebene Menge an Primärfarben (z.B. Schwarz-Weiß für Drucker)
- **Error Diffusion Dithering:** Lineare Verarbeitung des Bildes (z.B. links $\rightarrow$ recht; oben $\rightarrow$ unten), wobei erzeugter **Fehler** (z.B. bei Farbtiefenreduktion) **auf lokale Pixelumgebung** in Richtung der Traversierung (hier rechts und unten; links unten auch erlaubt) **verteilt** wird
- alternativ **Ordered Dithering** mit Threshold-Map (GPU-unterstützt)

---
# Bildfilterung
1. Nachbarschaft fester Größe (z.B. 3 x 3, 5 x 5, etc.) definieren
2. Auswertung der Nachbarschaftspixel mit einem sogenannten Filterkern ($2k +1 \times 2k + 1$, z.B. 3 x 3, 5 x 5) für jeden Pixel

$$G[i,j] = \sum_{u=-k}^k \sum_{v=-k}^k H[u+k, v+k] \cdot F[i+u, j+v]$$

**Neutrale Faltung:** $H_{id} = \begin{bmatrix}   0 & 0 & 0\\   0 & 1 & 0\\ 0 & 0 & 0   \end{bmatrix}$

**Mean-Filter:** $H = \frac19 \begin{bmatrix}   1 & 1 & 1\\   1 & 1 & 1\\ 1 & 1 & 1   \end{bmatrix}$

**Gauss-Filter:** $H = \frac1{16} \begin{bmatrix}   1 & 2 & 1\\   2 & 4 & 2\\ 1 & 2 & 1   \end{bmatrix}$

> [!danger] Filter nachtragen

## Rangordnungfilter
analog zur Bildfaltung, allerdings mehr Freiheiten im Umgang mit der Nachbarschaft
- z.B. wird Min / Max / Median einer Nachbarschaft ausgewählt
	- **Erosion:** geringster Helligkeitswert (Schwarz) wird ausgewählt
	- **Dilation:** höchster Helligkeitswert (Weiß) wird ausgewählt
	- **Denoising:** Median-Elemente der nach Helligkeit sortierten Nachbarschaftspixel wird ausgewählt
- kann Artefakte beseitigen (z.B. erst Erosion und dann Dilation ausführen | Denoising allein)

---
# Bildtransformation / Resampling

> [!danger] Bildvergrößerung?

---
# Resampling
Transformation eines Bildes von einem Koordinatensystem in ein anderes, die durch eine Abbildungsfunktion beschrieben wird
- Die inverse Transformation projiziert des Ausgabebild auf das Eingabebild, wodurch für jedes Ausgabebild ermittelt werden kann, welche Eingabepixel neu abgetastet werden müssen (*re*sampling)

## HQnx-Resampling (High Quality Scaling)
- Fallunterscheidung über mögliche Farbabweichungen in $3 \times 3$-Nachbarschaft des Pixels mittels *Thresholding*

![[hqnx.png]]

---
# Farbmodelle
Menschliche Lichtrezeptoren: Stäbchen (verantwortlich für Nachtsehen) und Zapfen (drei Arten, verantwortlich für des Farbsehen, unterschiedliche Empfindlichkeit)

Ein Farbraum ist ein mathematisches Modell und Schema zur Darstellung einer Menge von Farben
- allgemein dreidimensionaler Vektorraum
- Gesamtheit der wahrnehmbaren Farben im **CIE-Farbnormsystem** erfasst
- gebräuchlich sind etwa RGB, YIQ / YUV / YCbCr, CMYK
	- RGB = Red-Green-Blue Color Space
	- HSV = Hue-Saturation-Value Color Space (*nicht HSL*)
	- HSV und RGB sind äquivalent und gleichmächtig, allerdings ist die Transformation nicht vollständig bijektiv (Graustufen und Schwarz in HSV uneindeutig)
	- YIQ: enthält Schwarz-Weiß-Kanal (Y, entstanden durch Wechsel auf Farbfernsehen)
	- CMYK: *subtraktives* Farbmodell (im Gegensatz zum *additiven* RGB), in der Praxis von Ausgabemedium (Papierart u.ä.) relevant sowie dunkle Farben nur mit Key-Kanal darstellbar
- **Gamut:** “a certain complete subset of colors”, z.B. Farbbereich, der von einem Gerät tatsächlich erfasst bzw. dargestellt werden kann

**Chromatic Subsampling:**
- speichert für benachbarte Pixel nur gemeinsame Grundfarbe sowie einzelne Helligkeitswerte
- reduziert Bandbreite ohne die Bilddarstellung wesentlich zu verschlechtern

**Gamma-Korrektur:**
- RGB-Werte von Kameras sind linear
- RGB-Werte von Ausgabegeräten sind nicht-linear
- Gamma-Korrektur bezeichnet nichtlineare Voranpassung der RGB-Werte, mit dem Ziel der linearen Darstellung der RGB-Werte im Ausgabegerät

---
# Funktionsplots
Ein Raster $P$ mit einer Auflösung $N \times M$ Pixel lässt sich zur Visualisierung einer Funktion $f: \mathbb{R}^2 \rightarrow \mathbb{R}$ über einen zweidimensionalen Definitionsbereich $(x,y) \in D \subset \mathbb{R}^2$ einsetzen

**Reverse Mapping:** Jeder Rasterposition $P_{i,j}$ wird eine entsprechende Position $(x_{i,j}, y_{i,j})$ in $D = [x_{min}, x_{max}] \times [y_{min}, y_{max}]$ zugeordnet.

$$x_{i,j} = x_{min} + \frac{i}{N-1} \cdot (x_{max} - x_{min})$$

$$y_{i,j} = y_{min} + \frac{j}{M-1} \cdot (y_{max} - y_{min})$$

Das Funktionsergebnis $F(x_{i,j}, y_{i,j})$ wird an der zugehörigen Rasterposition abgebildet (z.B. mit Farbskala)

---
# Rasterisierung
Rasterisierung und die damit verbundene Diskretisierung ist allgemein weder eindeutig noch perfekt möglich.
- Häufig entstehen dabei **Aliasing-Artefakte** ("Treppenstufen"), die mit **Antialiasing-Methoden** abgeschwächt werden können

---
# Midpoint-Algortihmus
Pixel als auf der Linie gegeben ansehen \
$\Rightarrow$ Steigung der Linie sei o.B.d.A $\leq 45°$ (andernfalls $x$ und $y$ tauschen) \
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
**Initialwerte:** $d_0 = 2 \cdot \Delta y - \Delta x$ | $\Delta E = 2 \cdot \Delta y$ | $\Delta NE = 2 (\Delta y  \Delta x)$
**Falls *E* gewählt wird:** $d_{i+1} = d_i + 2 \cdot \Delta y$
**Falls *NE* gewählt wird:** $d_{i+1} = d_i + 2 \cdot (\Delta y - \Delta x)$

---
# Midpoint-Algorithmus für Primitive
Das Primitiv $P$ sie vollständig durch eine implizite Funktion $F(x,y)$ definiert:

$$P=\{(x,y)|F(x,y) = 0\} \subset \mathbb{R}^2$$

- $F(x,y) = x^2 + y^2 - r^2$: Kreis mit Mittelpunkt im Ursprung und Radius $r$
- $F(x,y) = x + y$: Diagonale
- etc.

> [!danger] Nachtragen

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

---
# Dreiecksrasterisierung
- Scanline-Verfahren: horizontale / vertikale Pixellinien durch Dreieck durchgehen
- Rasterisierung im Anschluss an perspektivische Projektion (3D $\rightarrow$ 2D)

## Algorithmus
1. Sortiere Ecken des Dreiecks anhand der $y$-Koordinate: ($v_0, v_1, v_2)$
2. Rasterisiere untere Hälfte
3. Rasterisiere obere Hälfte

Für jede Kante: Übergang von $y$ nach $y+1$ betrachten: $+ \frac{\Delta x}{\Delta y} = \frac{1}{a}$

Anzahl der Scanlines: $N_{top} = y_2 - y_1$ und $N_{bottom} = y_1 - y_0$

> [!caution] Nochmal anschauen

---
# Dreiecksrasterisierung
## Tiefenwerte
Rasterisierung ermöglicht Fragment-Berechnung mit $z$-Wert
- dazu zweifache lineare Interpolation:
	1. entlang der Kanten
	2. in der Scanline

> [!caution] Ebenengleichungen, Kreuzprodukt, etc. nachholen

Neben Tiefenwerte können auch andere allgemeine Eckwerte (z.B. Farben, Texkturkoordinaten, etc.) auf diese Weise interpoliert werden
## Inkrementelle Berechnung
Ebenengleichung für das Dreieck: $\alpha x + \beta y + \gamma z + \delta = 0$
- $\alpha, \beta, \gamma$ stellen Normalenvektor dar

Ebenenkoeffizienten: $(v_2 - v_0) \times (v_1 - v_0) = [\alpha, \beta, \gamma]$

$\Delta z_x = \frac{-\alpha}{\gamma}$ (Veränderung von $z$ bei horizontaler Bewegung, Schrittweite 1)
$\Delta z_y = \frac{- \beta}{\gamma}$ (Veränderung von $z$ bei vertikaler Bewegung, Schrittweite 1)

---
# Baryzentrischen Koordinaten
$P(\alpha, \beta,\gamma) = \alpha v_0 + \beta v_1 + \gamma v_2$ mit $\alpha + \beta + \gamma = 1$ nennen wir baryzentrische Koordinaten
- für Punkte innerhalb des Dreiecks $(v_0, v_1, v_2)$ gilt $\alpha, \beta, \gamma \geq 0$
- zwei Koeffizienten bestimmten den dritten: $\alpha = 1 - \beta - \gamma$

Bayzentrische Koordinaten sind proportional zu Größe der Dreiecke, in das ein Punkt im Inneren eines Dreiecks dieses zerlegt
- Können ebenfalls verwendet werden, um Eckwerte zu interpolieren
- Können durch Berechnung einer Bounding Box (BBox) optimiert werden

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
