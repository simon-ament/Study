---
title: Geometrische Projektionen
---
# Perspektive
**Zentralprojektion:** Festgelegt durch Projektionszentrum (CoP, *center of projection*)
- Parallele Geraden, die nicht parallel zur Projektionsebene verlaufen, werden auf sich schneidende Geraden abgebildet
- Verzerrte Darstellung von Objekten im Bildraum
- Verkleinerung dargestellter Objekte mit zunehmender Entfernung vom Projektionszentrum
- Vermittlung realistischer Ansichten dreidimensionaler Objekte und Raumeindruck
- **Strahlensatz** anwendbar

![[Screenshot from 2025-02-20 18-34-50.png|500]]

# Virtuelle Kamera
![[Screenshot from 2025-02-18 23-43-27.png|500]]

## View- / "LookAt"-Transformation
- ==dasselbe?==
- Kamerastandpunkt (*look-from* bzw. *eye)
- Kamerablickrichtung (*look-to* bzw. *center*)
- Aufwärtsrichtung (*up*)
- Transformation des **3D-Welt-Koordinatensystems** $(x, y, z)$ in das **3D-Kamera-Koordinatensystem** $(u, v, n)$

![[Screenshot from 2025-02-13 23-27-00.png|500]]

$$T_\text{lookAt}(\text{eye}, \text{center}, \text{up}) = R(u,v,n)^{-1} T(-\text{eye})$$
1. Translation von $\text{eye}$ in den Ursprung
2. Rotation in das $(u,v,n)$ Koordinatensystem über ==Orthonormalbasis==: $$
R(u,v,n)^{-1} = 
\begin{pmatrix} 
u_x & u_y & u_z & 0 \\
v_x & v_y & v_z & 0 \\
n_x & n_y & n_z & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}$$
- Verwendung der inversen $R$-Transformation
- danach ist das Sichtvolumen (Pyramidenstumpf) im Ursprung zentriert und die *Look*-Richtung verläuft entlang der negativen $z$-Achse

Dabei ist

$$F = \frac{C - E}{||C - E||}$$

$$n = -F$$

$$u = \frac{U \times n}{||U \times n||}$$

$$v = n \times u$$

Sonderfälle:
- $||F|| = 0$: Falls $||F|| < \epsilon$, berechne z.B. $C$ neu durch $C \leftarrow C + F$
- $U || F$: Falls $||U \times F|| < \epsilon$, betrachte z.B. die früheren $F$ bzw. $U$

## Projection-Transformation
- Projektion auf planare Sicht- oder Bildebene
- Clipping (*front / back* bzw. *near / far clipping pane*)
	- findet vor der Rasterisierung statt
	- reduziert Rendering-Aufwand, indem Objekte nahe an oder hinter der Kamera sowie weit entfernte Objekte ignoriert werden
- Sichtwinkel (*width angle* bzw. *height angle*)
- Verhältnis von Breite und Höhe des Bildes (*aspect ratio*)
- ==Strahlensatz==

**Sichtvolumen (view frustum):**
- Konisches Sichtvolument: rund, zu teuer (Lösen quadratischer Gleichungen)
- Pyramidensychtvolumen: perspektivische Projektion, Clipping mit 6 Halbebenen
- Rechtwinkliges Sichtvolumen (3D-Block): Parallelprojektion, Clipping mit 6 Halbebenen
- allgemein: durch zwei Halbebenen abgeschnittenes Solid (*Clipping*)
- ==Bild?==

### 1. Winkeländerung des Sichtvolumens
- Frustum hat Öffnungswinkel $\theta_W$ und $\theta_H$ $\Rightarrow$ sollen auf $90°$ skaliert werden ($45°$ in jede Richtung)
- Dazu Skalierung in $x$- und $y$-Koordinaten (Tiefe $z$ bezüglich der Kamera bleibt unverändert)

$$S_{xy}(\theta_W, \theta_H) = 
\begin{pmatrix}
\cot(\theta_W / 2) & 0 & 0 &0 \\
0 & \cot(\theta_H/2) & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix}$$

### 2. Skalierung des Sichtvolumens
- Far-Clipping-Plane soll bei $z = -1$ liegen
- Uniforme Skalierung ($x, y$ und $z$), um Proportionen zu erhalten
- Abstand der Near-Clipping-Plane danach: $\frac{\text{near}}{\text{far}}$

$$S_{xyz}(1/\text{far}) =
\begin{pmatrix}
1/\text{far} & 0 & 0 & 0 \\
0 & 1/\text{far} & 0 & 0 \\
0 & 0 & 1/\text{far} & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

### 3. Perspektivische Transformation
- Punktkoordinaten müssen entsprechend ihrere Tiefe perspektivisch verkürzt werden
- Mittels homogenen Koordinaten: resultierende ==2D-Punkte== haben eine $w$-Komponente, die bei der Umwandlung in nicht-homogene Koordinaten eine perspektivische Verkürzung bewirken
- Sichtbarkeitsermittlung: meist mittels $z$-Buffer mit Wertebereich $[0, 1]$ (DirectX) oder $[-1, 1]$ (OpenGL) $\Rightarrow$ Tiefenbereich $[-1, 0]$ muss entsprechend abgebildet werden
- ==Bild der Wirkungsweise==

Sei $k = \frac{\text{near}}{\text{far}}$

$$D(\text{near}, \text{far}) =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 / (k-1) & k/(k-1) \\
0 & 0 & -1 & 0
\end{pmatrix}$$

Ein Punkt $(x, y, z, 1)^T$ wird dadurch abgebildet auf $(x, y, z/(k-1) + k(k - 1), -z)^T$, wobei bei der Umwandlung in nicht-homogene Koordinaten die ersten drei Komponenten durch $-z$ geteilt werden
- ein Punkt auf der Far-Clipping-Plane ($z = -1$) wird dadurch final auf $(x,y,1)^T$ abgebildet, ein Punkt auf der Near-Clipping-Plane ($z = -k$) auf $(x / k, y / k, 0)^T$

## Gesamttransformation
$$D(\text{near}, \text{far}) \cdot S_{xyz}(1 / \text{far}) \cdot S_{xy}(\theta_H \cdot \text{aspect}^{-1}, \theta_H) \cdot R(\text{look}, \text{up})^T \cdot T(-\text{eye})$$

- sowohl die Teil- als auch die Gesamttransformation lassen sich als $4 \times 4$-Matrix darstellen
- homogene Koordinaten ermöglichen Darstellung perspektivischer Verkürzung
- perspektivische Transformation ist nicht ==affin== (sie verzerrt das Frustum zu einem Quader)

## Transformation des Frustums in den Einheitswürfel
- $l, r, t, b, n, f$ für *left, right, top, bottom, near, far*
- Punkte mit $z = f$ werden auf $+1$ abgebildet
- Punkte mit $z = n$ werden auf $-1$ abgebildet
- OpenGL: spiegelt die $z$-Koordinate, sodass $0 < n' < f'$

$$P = \begin{pmatrix}2n / (r - l) & 0 & -(r+l)/ (r - l) & 0 \\
0 & 2n / (t- b) & -(t+b) / (t-b) & 0 \\
0 & 0 & (f+n)/(f - n) & -2fn/(f- n) \\
0 & 0 & 1 & 0\end{pmatrix}$$

![[Screenshot from 2025-02-19 15-27-39.png|500]]

## Normalized Screen Coordinates / Normalized Device Coordinates (NDC)
- Berechnung durch die Umwandlung von homogenen Clip-Koordinaten in nicht-homogene Koordinaten durch die Division mit der $w$-Komponente
	- $(x_\text{NDC}, y_\text{NDC}, z_{NDC}) = (x_\text{clip} / w_\text{clip}, y_\text{clip} / w_\text{clip}, z_\text{clip} / w_\text{clip})$
- Normalisiert für den Wertebereich $[-1, 1]^3$

**Screen Coordinates:**
- Abbildung der NDC auf das Fenster- bzw. Bildkoordinatensystem mit Hilfe der Viewport Transformation
- NDC werden transliert und skaliert, sodass die in den festgelegten Fensterausschnitt passen
- OpenGL legt den Fensterausschnitt mit `glViewport(x, y, width, height)` fest
- OpenGL legt den zu rendernden Tiefenbereich mit `glDepthRange(z_min, z_max)` fest, wobei des Tiefeninterval auf des Interval $[0,1]$ abgebildet wird (mit $2^N$ Bit Genauigkeit des ==Depth Buffers==)
- Die Fensterkoordinaten sind die Grundlage für die anschließende [[03_rasterization|Rasterisierung]]

---
# Kameramodelle
- First-Person View: aus Sicht eines Objektes
- Third-Person View: direkt hinter einem Objekt
- High-Angle View: über einem Objekt, großer Winkel nach unten
- Wide-View: große Entfernung zur Szene, vollständige Sicht, wenige Details
- Bird's Eye View: schwebt über Szene

Eine direkte Kamerakontrolle durch den Nutzer mit allen Freiheitsgraden ist i. Allg. nicht effektiv für die Interaktion.

---
# Transformationspipeline
**3D Object Coordinates**
- World Transform (Applikations-spezifisch)
**World Coordinates**
- Look at (Vertex Shader)
**Eye Coordinates**
- Projektion (Vertex Shader)
**Clip Coordinates**
**NDC Coordinates**
- Viewport, Depth Range (Fragment Shader ==??==)
**Window Coordinates**
- Rasterisierung

![[Screenshot from 2025-02-18 23-45-09.png|500]]

---
# Parallele Projektionen

![[Screenshot from 2025-02-19 15-33-25.png|500]]

- Festgelegt durch Projektionsrichtung (*DOP, direction of projection*) | alle Projektionsstrahlen besitzen diese gleiche Richtung
- Erhalten Größen der parallel projizierten Objekte
- Anwendung bei technischen Illustrationen und Ingenieurszeichnungen (z.B. Konstruktionszeichnungen von Maschinen oder Bauzeichnungen)

**Hauptrisse:**
- Grundriss (*top view*)
- Aufriss (*front view*)
- Seitenriss (*side view*)

**Vorteile:**
- Genaue Längen- und Winkelmessungen im Bild möglich
- Gleicher Maßstab für alle Objekte im Bild

**Nachteile:**
- keine (photo-)realistische Darstellung für 3D-Objekte und ihre Umgebung
- im Allgemeinen sind mehrere Ansichten notwendig, um einen Raumeindruck zu gewinnen

**Transformation:**
- Ausgangspunkt bildet die Spezifikation eines rechtwinkligen Sichtvoluments mit Hilfe einer 3D-Bounding-Box: $(l,r,b,t,n,f)$
	- es handelt sich um eine Axis-Aligned Bounding Box (AABB)
	- Sichtrichtung entlang der negativen $z$-Achse
- Mittels Translation und Skalierung wird die AABB in das kanonische Sichtvolumen mit einer Ausdehnung von $(-1, -1, -1)$ bis $(1, 1, 1)$ abgebildet
	- Durch die Transformation werden *normalized device coordinates, NDC* im Bereich $[1, -1]$ bestimmt

![[Screenshot from 2025-02-19 15-39-35.png|500]]

![[Screenshot from 2025-02-19 15-39-45.png|500]]

---
# Z-Buffer
**Sichtbarkeitsproblem:** Gegeben eine Menge von Szenenobjekten und eine Kameraspezifikation. Entscheide, welche Teile der 3D-Objekte projiziert in der Projektionsebene sichtbar sind.
- *Annahme:* Szenenobjekte sind opak, matt und liegen im Vakuum (z.B. nicht im Nebel)

## Objektpräzise Sichtbarkeitsalgorithmen
- jedes Objekt wir mit allen anderen Objekten **z.B. durch 2D-Polygonüberschneidungstests** mit allen anderen Objekten
- Laufzeit $\mathcal{O}(n^2)$ bei $n$ Szenenobjekten

```
for(obj in sceneobjects)
{
	visibleParts = determine_visible_surfaces(obj, sceneobjects)
	render(visibleParts)
}
```

## Bildpräzise Sichtbarkeitsalgorithmen
- Sichtbarkeitsermittlung im Zuge der Rasterisierung (pro Pixel)
- Laufzeit $\mathcal{O}(nq)$ bei $n$ Szenenobjekten und $q$ Pixeln

```
for(pixel in raster)
{
	color = determine_object_closest_to_camera(pixel, sceneobjects)
	set_color(pixel, color)
}
```

## Vergleich
- Laufzeit: Bei einer **überschaubaren Anzahl von Objekten** (z. B. bis zu 1000 Szenenobjekte) erscheint zunächst der **objektpräzise** Ansatz grundsätzlich im Vorteil, da bildpräzise Ansätze mit Pixelmengen von z. B. $q = 1920 \times 1080$ arbeiten
- In der **Praxis** sind jedoch **bildpräzise** Algorithmen fast immer im Vorteil, da die zum Einsatz kommenden Berechnungen (numerisch gesehen) wesentlich einfacher und Hardware-unterstützt und hoch parallel ablaufen
- Die Berechnung objektpräziser sichtbarer Geometrie mit Verfahren der algorithmischen Geometrie besitzt numerische, robustheitsbezogene Schwächen und muss mit Sonderfällen umgehen. Bereits kleine Änderungen der Kameraeinstellung können zu großen Änderungen bei der ermittelten sichtbaren Geometrie führen
- Die Verlagerung der Sichtbarkeitsermittlung auf die Fragmente ermöglichte, historisch gesehen, erst die Echtzeitcomputergrafik

## Z-Buffer-Algorithmus
- hardware-unterstützt
- 2D-Raster, dessen Werte Tiefenwerte enthalten
- Tiefe ist der Abstand von der Near-Clipping-Plane zu einem sichtbaren Fragment in normalisierten Gerätekoordinaten
- Z-Buffer ist Teil des Framebuffers, d. h. für jedes Pixel wird neben den Farbwerten auch der Tiefenwert abgelegt
- Z-Buffer besitzen i. Allg. 16–32 Bits Genauigkeit, d. h. das Tiefenwerteinterval $[0, 1]$ wird durch den Integerbereich $[0, 2^N)$ dargestellt

**Ablauf:**
- Z-Buffer wird mit einem Hintegrundwert (z.B. $z = 1.0$) initialisiert
- Für jedes Objekt:
	- Rasterisiere Objekt (Zerlegung in Fragmente)
	- Für jedes Fragment, berechne Z-Wert
	- **Falls der Z-Wert kleiner ist als der aktuelle Tiefenwert** an der korrespondierenden Fragmentposition im Z-Buffer:
		- Schreibe den Z-Wert in den Z-Buffer (Aktualisierung)
		- Übertrage Fragmentfarbe in den Color-Buffer
	- **Andernfalls** Ignoriere Fragment und lasse Wert im Z-Buffer unverändert (Fragment liegt hinter einem weiter vorne liegenden, bereits gezeichneten Fragment)

![[Screenshot from 2025-02-20 11-13-58.png]]

![[Screenshot from 2025-02-20 11-14-03.png|500]]

**Problem der Tiefenwert-Verteilung:**
- Near-Clipping-Plane-Distanz und Far-Clipping-Plane-Distanz müssen geeignet gewählt werden, soll die Tiefengenauigkeit optimal verteilt sein
- Zu nahe Near-Clipping-Plane führt zu hoher Tiefengenauigkeit in unmittelbarer Nähe der Kamera; Genauigkeit wird aber i. Allg. auf mittlerer Distanz benötigt
- Bei zu geringer Tiefengenauigkeit: Z-fighting (z-flickering), d. h. Bildartefakte bei nahestehenden Objekten
- $\Rightarrow$ **Exakte Wahl der Near-Clipping-Plane notwendig!**

## Depth-Peeling
- arbeitet mit zweitem Z-Buffer
- ermöglicht schrittweise Rendering bei Überlagerung transparenter Objekte

**Abblättern der Oberfläche:**
- Extrahieren der Fragmente, die dem Betrachter am nächsten sind (Fragmente mit geringstem Z-Wert) im ersten Rendering-Durchlauf
- Extrahieren der nächst-tieferen Fragmente in jedem weiteren Rendering-Durchlauf
- Der $n$-te Rendering-Durchlauf liefert die Fragmente zur $n$-ten Tiefenebene
- $\Rightarrow$ **Schrittweise Verfeinerung**

![[Pasted image 20250220112232.png]]

**Algorithmus:**
1\. Pass
1. Rendere die Szene mit Tiefentest
2. Reguläres Tiefenbild mit Z-Buffer 1 entsteht
3. Color-Buffer wird als Layer 1 in einer Textur gespeichert

2\. Pass
1. Rendere die Szene mit folgendem Tiefentest: verwerfe Fragmente, die eine geringere oder gleiche Tiefe haben als gegenwärtig im Z-Buffer 1
2. Tiefenbild der Fragment in der zweiten „Ebene“ entsteht im Z-Buffer 2
3. Color-Buffer wird als Layer 2 in einer Textur gespeichert

3\. Pass
1. Tausche Rolle von Z-Buffer 1 und Z-Buffer 2
2. Verfahren wie in Pass 2

$\dots$

Letzter Pass: Kombiniere Layer 1 bis $N$ im Color-Buffer (*screen-aligned textures*)

![[Screenshot from 2025-02-20 11-28-52.png|500]]

### Bewertung des Depth-Peelings
**Vorteile:**
- Keine Vorsortierung der Szenenobjekte erforderlich (Auswertung der Objekte in beliebiger Reihenfolge)
- Nicht auf polygonale Geometrien beschränkt (alle raterisierbaren Objekte wie Kurven, Fraktale, etc. möglich)
- Einfache Implementierung
- Hardware-Unterstützung selbst mit *low-cost* Hardware
- Optimal in die Rendering-Pipeline einbaubar
- Separate Speicherung des Z-Buffer-Inhalts („Tiefenbild“) ermöglicht Speicherung von Bildern mit Tiefeninformation

**Nachteile:**
- Unnötige Rasterisierung von nicht-sichtbarer Szenengeometrie
- Beschränkte numerische Genauigkeit des Z-Buffers
- Nichtlineare Verteilung der Tiefengenauigkeit
- Zusätzlicher Z-Buffer als Ressource notwendig

![[Screenshot from 2025-02-20 11-31-20.png|500]]

> [!caution] Nichtplanare Projektionen einmal überfliegen?

