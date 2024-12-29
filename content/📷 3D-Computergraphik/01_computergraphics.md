---
title: Computergraphische Systeme
---
## Anwendungsfelder
- Architektur-Vorschau
- Graphic Design (Web, Visual Media, Druck, etc.)
- Engineering (Computer-Aided Design / Manufacturing | CAD / CAM)
- Virtual Reality (z.B. Flugsimulator)
- Augmented Reality (z.B. virtuelle Kleidungsanprobe)
- Entertainment (z.B. Kino)
- Digital Games
- Edutainment
- Digital Arts
- User Interfaces (z.B. OpenGL)
- Volumen-Visualisierung (geschnittene 3D-Modelle)
- Informationsvisualisierung (z.B. Visualisierung von Musik, Börsen, etc.)
	- Geovisualisierung (GIS = Geoinformationssystem)
- Computer Vision

![[cg_1.png]]

> **The Sketchpad** system uses drawing as a novel communication medium for a computer. The system contains input, output, and computation programs which enable it to interpret information drawn directly on a computer display.

---
# Einteilung der Computergraphik
## Die drei Hauptgebiete
**Image Processing:**
- *auch Imaging, Bildverarbeitung, Bildbearbeitung*
- Eingabe: Rasterdaten
- Ausgabe: Rasterdaten

**Image Synthesis:**
- *auch Rendering, Bilderzeugung, Bildsynthese*
- Methoden zur automatischen Generierung von Bildern von 3D-Modellen durch den Rechner
- Eingabe: 3D-Modelle, 2D-Bilddaten / Rasterdaten (Texturen), Video Streams, prozedurale Modelle, Sound, ==Scene Graph== (Szenenbeschreibung) | **Modellraum**
- Ausgabe: 2D-Bilddaten (Frames), Tiefenbild (zBuffer), Stereo Images, Video Streams | **Bildraum**

**Computer Vision:**
- *auch Bildinterpretation, Bildanalyse*
- Automatische, maschinelle Extraktion von Informationen aus Bilddaten
- Eingabe: 2D-Bilddaten, z. B. perspektivische Bilder von 3D-Szenen, Stereobilder | **Bildraum**
- Ausgabe: Objektdaten und Aussagen zu Farben, Farbmustern, Farbverteilung, Objektklassifikationen, Objektpositionen (Tracking), Objekterkennungen | **Modellraum**

![[cg_2.png]]

## Rendering (Image Synthesis)
**Rendering Pipeline:** Application $\rightarrow$ Geometry Processing $\rightarrow$ Rasterization $\rightarrow$ Pixel Processing
- ganz oder teilweise GPU-unterstützt

**Hauptkategorien:**
1. Photorealistisches Rendering (durch Raytracing, Radiocity-Verfahren u.ä. | beachtet physikalische und optische Gesetze)
2. Nichtphotorealistisches Rendering (NPR | eher künstlerisch, beliebig, unregelmäßig, oft unscharf)
3. Echtzeit-Rendering (Real-Time Rendering, RTR)

## Szenengraph
- meist ==DAG== (nicht normiert)
- **Bestandteile:** geometrische Objekte (z.B. Dreiecksnetze), graphische Attribute (z.B. Material, Textur), Umgebungseinstellungen (z.B. Lichtquellen, virtuelle Kameraeinstellung)
- **Real-Time Rendering:** Auswertung des Szenengraphen für jedes Frame

---
# Systeme
## CGS (Computergraphisches System)
Ein CGS setzt sich aus **Software- und Hardwarekomponenten** zusammen
- zentrale Komponente vieler IT-Systeme und IT-Anwendungen, die visuelle Schnittstellen aufweisen
- Auswahl geeigneter CGS ist strategisch und technisch kritischer Vorgang

## Graphical User Interfaces (GUIs)
Funktionen zur Umsetzung **grafisch-interaktiver Benutzungsschnittstellen**
- Basisobjekte bilden sogenannte **Widgets**, d. h. Klassen von Benutzungsschnittstellen-Elementen (z. B. Button, Checkbox, Scrollbar, Liste, Textfeld, Menü, Fensterlayouts, Dialoge)
- Keine detaillierte 3D-Funktionalität, aber entsprechende Platzhalter-Widgets

## Game Engines
Funktionalität zum Aufbau, zur Verwaltung und zur Ausführung von **3D-Szenen** virtueller Welten im Bereich Computer Games, Serious Games, Visualisierung und Simulation/VR
- bestehend aus **Rendering Engine, Physics Engine, Audio Engine, Scripting, Animation, Networking, Memory Management, Asset Management**, etc.

## Weitere Systeme
- 3D-Computergrafikanwendungen und Renderer (photorealistische Visualisierungen)
- Low-Level APIs (z.B. OpenGL, WebGL, Vulkan, etc.)
- High-Level APIS (Three.js, Babylon)

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

**Rasterisierung** bezeichnet den Prozess der **Diskretisierung** von grafisch-geometrischen Objekten in einem gegebenen Raster
- zu einem abzubildenden Objekt werden die im Raster entsprechenden Pixel ermittelt und beschrieben
- Realität $\rightarrow$ **Modellierung** $\rightarrow$ 3D-Modellraum $\rightarrow$ **Diskretisierung / Rasterisierung** $\rightarrow$ 2D-Bildraum
- Räumliche (Rastergröße), farbliche (8 Bit je Pixel bei RGB u.ä.) sowie zeitliche Diskretisierung (Framerate)

## Technische Konzepte
**Repräsentationen:**
- GPU: Framebuffer (z.B. Color Buffer, Depth Buffer) oder Textures
- CPU: Datenarrays (z.B. RGBA-Array als `Uint8ClampedArray`) oder Bildobjekte (z.B. `Image` bzw `Canvas`, `Context` und `ImageData`)
- File System: Kodierung einem einem Rastergraphikformat (s.o.)

**Raster Layer:**
> [!danger] Nachtragen

## Vektorgraphik
- beliebig skalierbar
- in der Computergraphik nicht relevant, da Hardware nur Raster unterstützt
