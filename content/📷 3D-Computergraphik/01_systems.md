---
title: CG-Systeme
---
# Computergraphik
**Computergrafik** erforscht und entwickelt computergestützte Methoden, Konzepte und Verfahren für die Erzeugung, Gestaltung und Darstellung visueller Objekte, Strukturen und Szenen
- **Computergrafik-Spezialgebiete** umfassen u. A. Computer Vision (CV), Virtual Reality (VR), Augmented Reality (AR), Real-Time Rendering, Computer Animation und Digital Photography
- **Anwendungsfelder:** Graphics Design (Web, Visual Media, etc.), Engineering, Virtual Reality (VR), Augmented Reality (AR), Entertainment (Kino, TV, etc.), Digital Games, Edutainment, Digital Arts, User Interfaces (UIs), Volume Visualization, Geovisualisierung, Informationsvisualisierung, Computer Vision

## Hauptgebiete
**Image Processing:**
- *auch Imaging, Bildverarbeitung, Bildbearbeitung*
- Eingabe: Rasterdaten
- Ausgabe: Rasterdaten

**Image Synthesis:**
- *auch Rendering, Bilderzeugung, Bildsynthese*
- Methoden zur automatischen Generierung von Bildern von 3D-Modellen durch den Rechner
- Eingabe: 3D-Modelle, 2D-Bilddaten / Rasterdaten (Texturen), Video Streams, prozedurale Modelle, Sound, [[#Szenengraph|Scene Graph]] (Szenenbeschreibung) | **Modellraum**
- Ausgabe: 2D-Bilddaten (Frames), Tiefenbild ([[05_geometric_projections#Z-Buffer|Z-Buffer]]), Stereo Images, Video Streams | **Bildraum**

**Computer Vision:**
- *auch Bildinterpretation, Bildanalyse*
- Automatische, maschinelle Extraktion von Informationen aus Bilddaten
- Eingabe: 2D-Bilddaten, z. B. perspektivische Bilder von 3D-Szenen, Stereobilder | **Bildraum**
- Ausgabe: Objektdaten und Aussagen zu Farben, Farbmustern, Farbverteilung, Objektklassifikationen, Objektpositionen (Tracking), Objekterkennungen | **Modellraum**

![[Screenshot from 2025-02-20 15-22-44.png|500]]

## Rendering
- Eingangsdaten werden in Form von 3D-Modellen bzw. Szenengraphen repräsentiert
- Ganz oder teilweise GPU-unterstützt

![[Screenshot from 2025-02-20 15-24-12.png|500]]

**Photorealistisches Rendering:**
- **Physikalisch-basierte** Beleuchtungsberechnung
- Beachtung optischer Gesetze und von Materialeigenschaften
- [[08_illumination_and_shading#Beleuchtung und Schattierung|Lichteffekte]]: Lichtbrechung, Lichtreflexion, Lichttransmission, etc.
- Hohe Laufzeitkomplexität (i. Allg. nicht in Echtzeit)
- Implementierung auf Basis von Ray-Tracing und Radiosity-Verfahren

**Nichtphotorealistisches Rendering:**
- Imitation illustrativer, künstlerischer Zeichen- und Darstellungstechniken
- Kennzeichen von NPR-Bildern:
	- Häufig visueller Ausdruck von **Unschärfe und Unsicherheit** in den Bildern
	- **Beliebigkeit und Unregelmäßigkeit** bei den Bildelementen und bei der Bilderzeugung
	- Beleuchtung und Schattierung folgen nicht strikt der Physik
	- Farbgebung und Texturen folgen nicht etwaigen realen Vorlagen

**Real-Time Rendering:**
- Bildgenerierung mit **interaktiven Bildwiederholraten**
	- 1 - 6 fps: keine Interaktivität gegeben
	- 6 - 15 fps: grundlegende Interaktivität gegeben
	- 15 - 72 fps: volle Interaktivität, kontinuierlicher Bildfluss, „real-time“
	- $>$ 72 fps: durch den Menschen nicht weiter verbessert wahrnehmbar (Displays, VR höher)
- Notwendig für interaktive, grafische Anwendungen
- Kennzeichen:
	- Prozessierung polygonaler 3D-Modelle (insbesondere Dreiecksnetze)
	- **Vereinfachte Beleuchtungsmodelle:** Imitation von Photorealismus nur bedingt möglich, Imitation u. a. durch Texturierung/Shading
	- Unterstützung durch Computergrafik-Hardware, insbesondere für Texturierung, Beleuchtung, Schattierung und Rasterisierung

## Szenengraph
- meist DAG (*directed acyclic graph*, nicht normiert)
- **Bestandteile:** geometrische Objekte (z.B. Dreiecksnetze), graphische Attribute (z.B. Material, Textur), Umgebungseinstellungen (z.B. Lichtquellen, virtuelle Kameraeinstellung)
- **Real-Time Rendering:** Auswertung des Szenengraphen für jedes Frame

![[Screenshot from 2025-02-25 09-31-43.png|500]]

---
# Systeme
## CGS (Computergraphisches System)
Ein CGS setzt sich aus **Software- und Hardwarekomponenten** zusammen
- zentrale Komponente vieler IT-Systeme und IT-Anwendungen, die visuelle Schnittstellen aufweisen
- Auswahl geeigneter CGS ist strategisch und technisch kritischer Vorgang

## Graphical User Interfaces (GUIs)
Funktionen zur Umsetzung **grafisch-interaktiver Benutzungsschnittstellen**
- Basisobjekte bilden sogenannte **Widgets**, d.h. Klassen von Benutzungsschnittstellen-Elementen (z.B. Button, Checkbox, Scrollbar, Liste, Textfeld, Menü, Fensterlayouts, Dialoge)
- Keine detaillierte 3D-Funktionalität, aber entsprechende Platzhalter-Widgets

## Game Engines
Funktionalität zum Aufbau, zur Verwaltung und zur Ausführung von **3D-Szenen** virtueller Welten im Bereich Computer Games, Serious Games, Visualisierung und Simulation/VR
- bestehend aus **Rendering Engine, Physics Engine, Audio Engine, Scripting, Animation, Networking, Memory Management, Asset Management**, etc.

## Weitere Systeme
- 3D-Computergrafikanwendungen und Renderer (photorealistische Visualisierungen)
- Low-Level APIs (z.B. OpenGL, WebGL, Vulkan, etc.)
- High-Level APIs (Three.js, Babylon)