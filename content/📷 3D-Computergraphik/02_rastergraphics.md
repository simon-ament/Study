---
title: Rastergraphiken
---
# Rastergraphik
Reguläres Gitter aus $n \times m$ Pixeln
- Gitterpunkte = Pixel (mathematisches Modell)
- äquivalent zu 2D-Array, im Speicher sogar linear
- je Pixel (*picture element* | Voxel = *volume element* in dreidimensionalem Gitter) **einheitliche Bitzahl**:
	- 1 Bit (monochromatisch)
	- 8 Bit (oft Tiefe, Graustufe u.ä.)
	- 24 Bit (RGB, 8 Bit je Farbkanal)
	- 32 Bit (RGBA)
	- $\dots$
- Auflösung und Komplextität durch Rastergröße definiert
	- Bits-per-Pixel (BPP), Dots-per-Inch (DPI)
- Geometrie, Topologie, Semantik und Identität rasterisierter Objekte nicht unmittelbar rekonstruierbar
- Down-Scaling = Raster verkleiner | Up-Scaling = Raster vergrößern
- Formate: **JPEG, BMP, PNG, GIF** und viele mehr
- *Aspect Ratio* ist Verhältnis von Breite zu Höhe (z.B. 16:9)
- Pixel (*picture elements*): einzeln adressierbar, nicht weiter teilbare Einheiten eines Rasters, eine oder mehrere Komponenten (z.B. RGB)

**Rasterisierung** bezeichnet den Prozess der **Diskretisierung** von grafisch-geometrischen Objekten in einem gegebenen Raster
- zu einem abzubildenden Objekt werden die im Raster entsprechenden Pixel ermittelt und beschrieben
- Realität $\rightarrow$ **Modellierung** $\rightarrow$ 3D-Modellraum $\rightarrow$ **Diskretisierung / Rasterisierung** $\rightarrow$ 2D-Bildraum
- Räumliche (Rastergröße), farbliche (8 Bit je Pixel bei RGB u.ä.) sowie zeitliche Diskretisierung (Framerate)

![[Screenshot from 2025-02-18 23-07-19.png|500]]

## Technische Konzepte
**Repräsentationen:**
- GPU: Framebuffer (z.B. Color Buffer, Depth Buffer) oder Textures
- CPU: Datenarrays (z.B. RGBA-Array als `Uint8ClampedArray`) oder Bildobjekte (z.B. `Image` bzw `Canvas`, `Context` und `ImageData`)
- File System: Kodierung einem einem Rastergraphikformat (s.o.)

**Raster Layer:** Konzeptionelle Aufteilung eines Rasters in $L$ Layer (*planes* / Ebenen), in denen jeweils je Eintrag $K_L$ Bits zur Verfügung stehen
- meist $L \in \{1, 2, 3, 4\}$ (z.B. 3 Layer für RGB)
- pro Pixel damit $L \cdot K_L$ Bits (Bittiefe)
- Mögliche Layer-Semantiken:
	- Color (Farbwerte), Surface Normal (8 + 8 + 8 Bit mit $n = (x,y,z)$), Luminance (Helligkeit / Intensität), Alpha (Transparenz), ID (Objekterkennung), Depth (z-Werte, Kameradistanz) Stencil (Allgemeiner Pro-Pixel-Zähler, z.B. für Bildmaske)

## Vektorgraphik
**Objektbasierte Kodierung** von Bildinhalten
- Geometrische Objekte (z. B. Polygone, Kurven, Texte), bezeichnet als *Primitive*
- Grafische Attribute (z. B. Randfarbe, Füllfarbe, Linienstärke)
- Hierarchischer Aufbau von Bildinhalten in Form von Szenengraphen
- $\Rightarrow$ Auflösungsunabhängigkeit, d. h. geometrische Transformationen, Projektionsänderungen und Objekteditierung möglich ohne Informationsverlust (beliebig skalierbar)
- Die „Komplexität“ eines Bildes entspricht der Komplexität der objektbasierten Spezifikation
- in der Computergraphik nicht relevant, da Hardware nur Raster unterstützt
- Formate: SVG, PDF, Adobe PostScript, DXF, DWG

---
# Rastergraphik-Operationen
## Bildtransformation
- Umwandlung der Farbwerte eines RGB-Rasters nach Graustufen
	- jeweiliger Farbwert in Bitdarstellung durch 255 teilen
	- $(r, g, b) \mapsto 0,299r + 0.587g + 0.144b$ (*magic numbers*) je nach Farbmodell
	- multipliziert mit 255 wieder 8 Bit Wert

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
- Farbquantisierung verringert die Zahl der unterschiedlichen Farben, die in einem gegebenen Raster vorkommen
- Ziel ist es, den Bildinhalt mit weniger Farben möglichst gut anzunähern; der Speicherbedarf sinkt entsprechend

**Ablauf:**
1. Sampling der Eingangsdaten und Erstellen einer Farbstatistik (meist Histogramm)
2. Erstellen einer Farbtabelle auf der Basis der Statistik (z.B. durch Clustering)
3. Prozessierung der Eingangsdaten durch Auswahl der neuen Farbe aus der Farbtabelle für die Pixel
$\Rightarrow$ Kompression (z.B. bei JPEG)

### Median-Cut-Algorithmus
Versucht Farben zu finden, die möglichst jeweils eine gleiche Zahl an ähnlichen Farben im echten Bild repräsentieren
- rekursive Unterteilung des RGB-Farbraums in RGB-Farbwürfel mit gleicher Anzahl an enthaltenen Farben
- Ersetzung der Farben durch Median in jeweiligen RGB-Farbwürfel, nachdem eine gegebenen Anzahl $n$ an Teilwürfel erreicht wurde

![[Screenshot from 2025-02-20 15-41-24.png|500]]

### Dithering
Approximation des gegebenen Bildes durch gegebene Menge an Primärfarben (z.B. Schwarz-Weiß für Drucker)
- **Error Diffusion Dithering:** Lineare Verarbeitung des Bildes (z.B. links $\rightarrow$ recht; oben $\rightarrow$ unten), wobei erzeugter **Fehler** (z.B. bei Farbtiefenreduktion) **auf lokale Pixelumgebung** in Richtung der Traversierung (hier rechts und unten; links unten auch erlaubt) **verteilt** wird
- alternativ **Ordered Dithering** mit Threshold-Map, bei der die Farbwerte des Bildes mit der Map verglichen werden (GPU-unterstützt, kann aber zu erkennbaren Mustern führen)
	- Nutzt oft Noise oder Bayer-Matrizen (letztere: Durchschnittswert $< 0.5$)

![[Screenshot from 2025-02-20 15-44-08.png]]

![[Screenshot from 2025-02-20 15-44-13.png]]

**Bayer-Matrizen:**

$$M_2 = \frac14 \cdot \begin{bmatrix}0 & 2 \\ 3 & 1\end{bmatrix}$$

$$M_{2n} = \frac1{(2n)^2} \cdot \begin{bmatrix}(2n)^2 \cdot M_n + 0 & (2n)^2 \cdot M_n + 2 \\ (2n)^2 \cdot M_n + 3 & (2n)^2 \cdot M_n + 1\end{bmatrix}$$

---
# Bildfilterung

1. Nachbarschaft fester Größe (z.B. 3 x 3, 5 x 5, etc.) definieren
2. Auswertung der Nachbarschaftspixel mit einem sogenannten Filterkern ($2k +1 \times 2k + 1$, z.B. 3 x 3, 5 x 5) für jeden Pixel

$$G[i,j] = \sum_{u=-k}^k \sum_{v=-k}^k H[u+k, v+k] \cdot F[i+u, j+v]$$

**Neutrale Faltung:** Bild bleibt unverändert

$$H_{id} = \begin{bmatrix}   0 & 0 & 0\\   0 & 1 & 0\\ 0 & 0 & 0   \end{bmatrix}$$

**Mean-Filter:** Mittelt die Nachbarschaftspixel gleichmäßig
- Tiefpassfilter bzw. „Rechteckfilter“, der hochfrequente Bildinhalte abschwächt
- Einsatz zur Elimination von kleinen Bildstörungen (z. B. noise), Bildglättung (z. B. Kantenverwischung)
- Homogene Bildbereiche bleiben unverändert

$$H = \frac19 \begin{bmatrix}   1 & 1 & 1\\   1 & 1 & 1\\ 1 & 1 & 1   \end{bmatrix}$$

**Gauss-Filter:** Mittelt die Nachbarschaftspixel mit unterschiedlichen Gewichten, die zur Pixeldistanz korrespondieren
- Tiefpassfilter, ausgewogenere Filterung im Vergleich zum Rechteckfilter

$$H = \frac1{16} \begin{bmatrix}   1 & 2 & 1\\   2 & 4 & 2\\ 1 & 2 & 1   \end{bmatrix}$$

**Motion-Blur-Filter:** Bildeffekt, der eine Bewegung der Kamera während der Aufnahme suggeriert

$$H = \frac14 \begin{bmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{bmatrix}$$ 
(oft noch größer, z.B. 9)

**Emboss-Filter:** Bildfilter, der den hypothetischen Kontrasts entlang z. B. einer $45°$-Diagonalen ermittelt
- Hochpassfilter

$$H = \begin{bmatrix}2 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & -1\end{bmatrix}$$

**Sharpness-Filter:** Hebt Kantenübergänge hervor, d. h. „akzentuiert“ Kanten im Bildraum

$$H = \begin{bmatrix}-1 & -1 & -1 \\ -1 & 9 & -1 \\ -1 & -1 & -1\end{bmatrix}$$ 

**Sobel-Filter:** berechnen pro Pixel einen lokalen Gradienten
- dienen zum Aufspüren von Änderungen in den Pixelwerten in einer bestimmten Richtung (horizontal, vertikal, diagonal)
- zum Beispiel zur Kantendetektion verwendet

$$S_x = \begin{bmatrix}-1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1\end{bmatrix}, S_y = \begin{bmatrix}-1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1\end{bmatrix}$$

**Tiefpass- und Hochpassfilter:**
- Tiefpassfilter lassen niedrige Frequenzen durch und blockieren hohe $\Rightarrow$ Weichzeichnung, globale Strukturen sichtbar
- Hochpassfilter lassen hohe Frequenzen durch und blockieren niedrige $\Rightarrow$ betont Kanten und Texturen

## Rangordnungfilter
analog zur Bildfaltung, allerdings mehr Freiheiten im Umgang mit der Nachbarschaft
- z.B. wird Min / Max / Median einer Nachbarschaft ausgewählt
	- **Erosion:** geringster Helligkeitswert (Schwarz) wird ausgewählt $\Rightarrow$ weiße Areale werden verkleinert, sehr kleine verschwinden ganz
	- **Dilation:** höchster Helligkeitswert (Weiß) wird ausgewählt $\Rightarrow$ weiße Areale werden vergrößert
	- **Denoising:** Median-Elemente der nach Helligkeit sortierten Nachbarschaftspixel wird ausgewählt $\Rightarrow$ kann Störpixel (z.B. Schwarz oder Weiß) entfernen
- kann Artefakte beseitigen (z.B. erst Erosion und dann Dilation ausführen | Denoising allein)

![[Screenshot from 2025-02-20 15-52-11.png|500]]

![[Screenshot from 2025-02-20 15-52-22.png|500]]

---
# Bildvergrößerung
## Resampling
Transformation eines Bildes von einem Koordinatensystem in ein anderes, die durch eine Abbildungsfunktion beschrieben wird
- Die inverse Transformation projiziert des Ausgabebild auf das Eingabebild, wodurch für jedes Ausgabebild ermittelt werden kann, welche Eingabepixel neu abgetastet werden müssen (*re*sampling)
- Anwendungen: Bildauflösung erhöhen / verkleinern, Bilder geometrisch transformieren

**Verfahren:**
- *Nearest-Neighbor:* suche das nächstliegende Pixel im Eingabebild, wobei im Allgemeinen Anti-Aliasing-Artefakte entstehen
- *Bilineare Interpolation:* ermittle die vier nächstgelegenen Eingabebildpixel, interpoliere linear zwischen ihnen, wodurch Blureffekte auftreten

---
# Farbmodelle
Menschliche Lichtrezeptoren: Stäbchen (verantwortlich für Nachtsehen) und Zapfen (drei Arten, verantwortlich für des Farbsehen, unterschiedliche Empfindlichkeit)

Ein Farbraum ist ein mathematisches Modell und Schema zur Darstellung einer Menge von Farben
- allgemein dreidimensionaler Vektorraum
- Gesamtheit der wahrnehmbaren Farben im **CIE-Farbnormsystem** erfasst
- gebräuchlich sind etwa RGB, YIQ / YUV / YCbCr, CMYK
	- RGB = Red-Green-Blue Color Space (*additiv*)
	- HSV = Hue-Saturation-Value Color Space (*nicht HSL*)
	- HSV und RGB sind äquivalent und gleichmächtig, allerdings ist die Transformation nicht vollständig bijektiv (Graustufen und Schwarz in HSV uneindeutig)
	- YIQ: enthält Schwarz-Weiß-Kanal (Y, entstanden durch Wechsel auf Farbfernsehen) und Chroma-Koeffizienten I (*in-phase*, Cyan $\leftrightarrow$ Orange) sowie Q (*quadrature*, Magenta $\leftrightarrow$ Grün)
	- CMYK (Cyan-Magenta-Yellow-Key): *subtraktives* Farbmodell (im Gegensatz zum *additiven* RGB), in der Praxis von Ausgabemedium (Papierart u.ä.) relevant sowie dunkle Farben nur mit Key-Kanal darstellbar
- **Gamut:** “a certain complete subset of colors”, z.B. Farbbereich, der von einem Gerät tatsächlich erfasst bzw. dargestellt werden kann

![[Screenshot from 2025-02-20 15-55-25.png|500]]

**Chromatic Subsampling:**
- speichert für benachbarte Pixel nur gemeinsame Grundfarbe sowie einzelne Helligkeitswerte
- reduziert Bandbreite ohne die Bilddarstellung wesentlich zu verschlechtern

![[Screenshot from 2025-02-20 15-56-39.png|500]]

**Gamma-Korrektur:**
- RGB-Werte von Kameras sind linear
- RGB-Werte von Ausgabegeräten sind nicht-linear
- Gamma-Korrektur bezeichnet nichtlineare Voranpassung der RGB-Werte, mit dem Ziel der linearen Darstellung der RGB-Werte im Ausgabegerät
- Implementierung z.B. mit Look-Up-Tables

![[Screenshot from 2025-02-24 22-11-20.png|500]]

---
# Funktionsplots
Ein Raster $P$ mit einer Auflösung $N \times M$ Pixel lässt sich zur Visualisierung einer Funktion $f: \mathbb{R}^2 \rightarrow \mathbb{R}$ über einen zweidimensionalen Definitionsbereich $(x,y) \in D \subset \mathbb{R}^2$ einsetzen

**Reverse Mapping:** Jeder Rasterposition $P_{i,j}$ wird eine entsprechende Position $(x_{i,j}, y_{i,j})$ in $D = [x_{min}, x_{max}] \times [y_{min}, y_{max}]$ zugeordnet.

$$x_{i,j} = x_{min} + \frac{i}{N-1} \cdot (x_{max} - x_{min})$$

$$y_{i,j} = y_{min} + \frac{j}{M-1} \cdot (y_{max} - y_{min})$$

Das Funktionsergebnis $F(x_{i,j}, y_{i,j})$ wird an der zugehörigen Rasterposition abgebildet (z.B. mit Farbskala)
