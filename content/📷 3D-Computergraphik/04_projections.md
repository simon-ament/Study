---
title: Geometrische Projektionen
---
> [!danger] Nachholen

![[cg1_2024_05_geometric_projections.pdf#page=14]]
bis Folie 41

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

# Parallele Projektionen
![[cg1_2024_05_geometric_projections.pdf#page=42]]
- Grundriss (*top view*)
- Aufriss (*front view*)
- Seitenriss (*side view*)

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

## Bildpräzisce Sichtbarkeitsalgorithmen
- Sichtbarkeitsermittlung im Zuge der Rasterisierung (pro Pixel)
- Laufzeit $\mathcal{O}(nq)$ bei $n$ Szenenobjekten und $q$ Pixeln

```
for(pixel in raster)
{
	color = determine_object_closest_to_camera(pixel, sceneobjects)
	set_color(pixel, color)
}
```

### Z-Buffer-Algorithmus
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

### Depth-Peeling
- arbeitet mit zweitem Z-Buffer
- ermöglicht schrittweise Rendering bei Überlagerung transparenter Objekte
