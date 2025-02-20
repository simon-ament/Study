---
title: Geometrische Modellierung
---
# 3D-Modellierung
- Abstraktion und Idealisierung von 3D-Objekten und ihren Eigenschaften
- Automatisierte Herstellung z.B. mit Bilddaten oder durch prozedurale Modellierung
- **3D-Modellierung** bezeichnet Konzepte, Methoden und Verfahren zum Aufbau, zur Modifikation und zur Gestaltung von 3D-Modellen

## Darstellungen
### Boundary Represantations (BRep)
- Repräsentation der Oberfläche eines 3D-Modells
- Polygonsuppen (*Polygon Soups*) als einfachste Form
	- Sammlung von Polygonen ohne garantierte Nachbarschaftsbeziehungen (ungeordnet)
- Grundlage für das Real-Time Rendering
- **Adaptive Triangulierung:** Je stärker die Oberfläche gewölbt, desto feiner die Dreiecke
	- Ein Dreieck lässt sich mithilfe eines Punkt im Inneren (z.B. Mittelpunkt) in drei Dreiecke zerlegen

### Solid Models
- Grundlage der 3D-Modellierung in CAD un CAM
- Repräsentation von 3D-Objekten unter Einhaltung geometrisch-topologischer Constraints (wohldefinierte, lückenlose Oberfläche)
- Eindeutig definiertes endliches inneres Objektvolumen
- Keine niederdimensionalen Bestandteile (z.B. einzelnes Polygon mit Nullvolumen)

### Volume Models
- Repräsentation von Volumendaten durch ein Voxelraster
- Grundlage z.B. der medizinischen Visualiserung
- Großer Speicherbedarf durch Speicherung einzelner Schichten

### Image-Based 3D Reconstruction
- Repräsentation durch Kombination von 2D-Aufnahmen
- Grundlage für Modellierung realer Objekte (z.B. Scanning)
- Herstellung mit Hilfe photogrammetrischer Verfahren (z.B. Image Matching)

### Kennzeichen von 3D-Repräsentationen
- **Genauigkeit:** Wie gut nähert die Repräsentation die Form und Erscheinung des modellierten Objekts an?
- **Integrität:** Wie weit kann die Repräsentation geometrische und topologische Eigenschaften sicherstellen und analysieren?
- **Prozessierungseffizienz:** Wie schnell kann die Repräsentation vom Rendering verarbeitet werden? Wie schnell können Operationen (z.B. Intersektion) auf der Repräsentation ausgeführt werden
- **Speichereffizienz:** Wie viel Speicher benötigt die Repräsentation?
- **Herstellungseffizienz:** Wie einfach ist die Übersetzung von Eingabedaten in eine Repräsentation?

## Anwendungsgebiete
- **3D-Rekonstruktion:** zum Beispiel Cultural Heritage (Laser-Scanning $\to$ 3D-Punktwolken $\to$ Oberflächenmodell)
- **3D-Assets:** zum Beispiel im Produkt-Design oder Gaming
- **3D-Printing:** Herstellung von 3D-Objekten
	- Grundanforderung: Solidität
- **Prototyping & Manufacturing**

---
# Geometrische Objekte

![[Screenshot from 2025-02-20 18-40-15.png|500]]

## Linien
**Linie:** Eine *Strecke / Liniensegment* zwischen $p$ und $p$
- definiert als $[p, q] := \{p + \lambda(q - p) \ | \ \lambda \in [0,1]\}$

**Strahl:** Ein *Strahl / Halbstrahl* von $p$ aus in Richtung $q$
- definiert als $[p, q ;= \{p + \lambda(q - p) \ | \ \lambda \in \mathbb{R}_{\geq 0}\}$

**Gerade:** Eine *Gerade* durch $p$ und $q$
- definiert als $\overline{p, q} := \{p + \lambda(q - p) \ | \ \lambda \in \mathbb{R}\}$

## Polygone
Sei $P$ eine geordnete Menge von $n$ Punkten $p_i$ aus dem $\mathbb{R}^d$.

**Polygonale Kette:** ein Weg $w \subset \mathbb{R}^d$, der aus einer endlichen Folge von Liniensegmenten $[p_1,p_2], [p_2, p_3], \dots, [p_{n-1},p_n]$ aufgebaut ist

**Polygon:** für eine einfache, geschlossene polygonale Kette $w \subset \mathbb{R}^d$ nennt man das umschlossene Gebiet zusammen mit $w$ selbst *einfaches Polygon* $P$

**Kanten:** die zu einem Polygon $P$ definieren Liniensegmente

**Ecken:** die das Polygon $P$ definierenden Punkte $p_i$

**Diagonalen:** alle Strecken zwischen den Ecken $p_i$, die keine Kante bilden
- $[p_i, p_j]$ mit $j \neq (i+1) \mod n$

**Orientierung:** o.B.d.A kann das Innere eines Polygons dadurch definiert werden, dass es stets links von den geordneten Liniensegmenten liegt

**Innenwinkel:** Für zwei aufeinanderfolgende Liniensegmente $s_i = [p_i, p_{i+1}]$ und $s_{i+1} = [p_{i+1}, p_{i+2}]$ wird der Winkel $\alpha(s_i, s_{i+1}) \in [0, 2\pi]$ zwischen den beiden Segmenten definiert als Drehwinkel, mit dem $s_i$ in $s_{i+1}$ rotiert werden kann
- Die Summe aller Innenwinkeln eines Polygons (mit $n$ Punkten) ist $(n - 2) \pi$

### Polygoncharakteristiken
- **Überschlagen:** mindestens zwei Kanten haben einen Schnittpunkt im Kanteninneren
- **Einfach:** genau eine polygonale Kette, die selbstüberschneidungsfrei ist
- **Komplex:** nicht einfach
- **Planar:** polygonale Kette liegt in einer gemeinsamen Ebene des $\mathbb{R}^d$
- **Konvex:** für zwei beliebige Punkte aus dem Polygon oder Polygoninneren liegt die verbindende Strecke vollständig im Polygon
	- kein Innenwinkel größer als $180°$
	- der Schnitt endlich vieler konvexer Mengen ist konvex
	- $\Rightarrow$ einfach
- **Konkav:** einfach, aber nicht konvex
- **Sternförmig:** es gibt einen Punkt im Polygon, vom dem aus das gesamte Polygon "gesehen" werden kann
- **Regulär:** Kanten gleich lang (*gleichseitig*) und Innenwinkel benachbarter Segmente gleich groß (*gleichwinklig*)
- **Stern:** planar, überschlagen und regulär (sieht aus wie ein Stern)

![[Screenshot from 2025-02-18 23-48-50.png|500]]

- **Degeneriert:** Polygon kollabiert ganz oder in Teilen zu einem Punkt / Linie, enthält Kanten mit Länge Null oder ist nicht planar
- **Monoton** bezüglich einer Linie $L$: jede zu $L$ orthogonale Linie $K$ bildet mit dem Polygon eine Schnittmenge, die genau einem Liniensegment / Punkt oder der leeren Menge entspricht

![[Screenshot from 2025-02-20 18-41-02.png|500]]

### Bestimmung des Polygoninnern
- **Ungerade-Gerade-Regel:** virtuelle horizontal und parallel verlaufende Strahlen beginnen außerhalb des Polygons und invertieren bei jedem Kantenübertritt eine Flag, die mit $0$ initialisiert ist
	- Innen bei Flag $=1$
- **Nicht-Null-Regel:** jeder horizontale Strahl inkrementiert einen Zähler dort um 1, wo die Polygonkante von oben nach unten den Strahl schneidet
	- Innen bei Zähler $\geq 1$

### Boolsche Operationen
- z.B. Vereinigung, Schnittmenge, Differenz
- auf konvexen / monotonen Polygonen z.B. mit ==Sweep-Line-Algorithmen== in linearer Zeit ausführbar
- **nicht abgeschlossen**. d.h. die Ergebnisse sind nicht notwendigerweise Polygone

![[Screenshot from 2025-02-18 23-50-01.png]]

## Polyeder
Ein Körper, der durch ebene Polygone begrenzt wird
- **regulär:** alle Oberflächen bestehen demselben regelmäßigen Polygon und in jeder Ecke treffen gleich viele dieser Polygone zusammen
	- *Tetraeder, Hexaeder, Oktaeder, Ikosaeder, Dodekaeder* (auch Platonische Körper)
- **Eulerscher Polyedersatz:** $V - E + F = 2$
- **Erweiterter Eulerscher Polyedersatz:** $V - E + F - H = 2 (C - G)$
	- Anzahlen: Ecken $V$ (*vertices*), Kanten $E$ (*edges*), Flächen $F$ (*facettes*), ==Löcher== $H$ (*holes*), Einzelteile $C$ (*components*), ==Löcher durch den Körper== $G$ (*Genus)

![[Screenshot from 2025-02-20 18-41-49.png|500]]

## Solid
Ein beschränkter, endlicher Teil des Raums, der durch Flächen eindeutig begrenzt ist
- endliches positives Volumen
- Oberfläche ist geschlossen, d.h. von außen gelangt man nicht in das Innere
- abgrenzende Flächen können polygonal oder kurvenförmig sein
- Basis von CAD/CAM-Werkzeugen

Ein **Polyeder**, das **geschlossen**, **orientierbar** und **2-mannigfaltig** ist, ist ein Solid.
- **Orientierbarkeit:** Oberfläche kann eindeutig in eine Vorder- und Rückseite eingeteilt werden (Definition über Normalen)
	- Möbius-Band / Kleinsche Flasche nicht orientierbar
- **2-Mannigfaltigkeit:** Zu jedem Punkt auf der Oberfläche (des Polygonnetzes) kann eine Nachbarschaft von Punkten gefunden werden, die topologisch einer Scheibe in der Ebene entspricht

![[Screenshot from 2025-02-20 18-42-48.png|500]]

---
# Polygonnetz
Ein Pologynnetz $M = (V, E, F)$ wird durch eine Menge von Eckpunkten $V$ (*vertices*), Kanten $E$ (*edges*) und Seiten $F$ (*faces*) definiert
- beliebig genaue  Approximation jedwelcher Formen
- Stückweise glatte Oberflächen
- Effizientes Rendering durch GPU-Beschleunigung (triangulierte Polygonnetze)

**Eigenschaften:**
- Jede Kante verbindet 2 Eckpunkte
- Jede Kante gehört zu höchstens 2 Seiten
- Jede Kante gehört zu mindestens einer Seite
- Jede Seite ist spezifiziert durch eine Folge von Kanten
- Ein Eckpunkt ist mindestens 2 Kanten gemeinsam
- Die Seiten repräsentieren Abschnitte der Oberfläche
- Die durch die Seiten definierten Polygone sind im Allgemeinen konvex

![[Screenshot from 2025-02-20 18-45-17.png|500]]

## Polygon Soup
Darstellung eines Polygonnetzes $M$ durch eine Menge von Faces $F$, die jeweils durch eine Liste der Eckpunkte $v$ kodiert werden
- Eckpunkte werden redundant gespeichert
- Keine Information zu Nachbarschaftsbeziehungen enthalten
	- Identifikation wird durch Ungenauigkeit von Floating-Point-Darstellungen zusätzlich erschwert
- 3D-Hardware-Unterstützung
- Keine Ordnung für die Polygone (willkürlich)

## Face-Vertex Mesh
Darstellung eines Polygonnetzes $M$ durch eine Tabelle mit den insgesamt vorhandenen Eckpunkten $V$ und eine Menge von Faces $F$, die jeweils durch eine Liste von Eckpunktindizes spezifiziert werden
- keine Redundanz bei Eckpunkten
- **Erweiterung:** im Vertexarray werden auch anliegende Seiten gespeichert
- Unterstützung durch 3D-Hardware (z.B. *vertex arrays*) $\Rightarrow$ weit verbreitet
- Geringerer Speicherplatzbedarf wegen gemeinsam genutzter Eckpunktliste
- Gemeinsame Polygonnetzkanten können nur durch explizite Traversierung gefunden werden
	- Operationen teilweise ineffizient

## Kantenlisten
Darstellung eines Polygonnetzes $M$ durch eine Tabelle mit den insgesamt vorhandenen Eckpunkten $V$, eine Tabelle mit Kanten $E$ und eine Menge von Faces $F$, die jeweils durch eine Liste von Kantenindizes spezifiziert werden
- Jede Kante hält Indizes auf den Anfangs- und Endeckpunkt sowie Indizes auf die Seiten, an der die Kante liegt
- Zahl der zu einer Kante gehörenden Polygone kann auf 2 eingeschränkt sein (Oberflächen entsprechen einer 2-Mannigfaltigkeit) bzw. uneingeschränkt sein für beliebige Oberflächen
- Nachbarschaftsrelationen und topologische Informationen effizient auslesbar
- Größerer Speicherplatzbedarf wg. der Kantenliste
- Keine Unterstützung durch 3D-Hardware

## Winged-Edge Polygon Meshes
Repräsentation 2-mannigfaltiger Polygonnetze, **navigierbar**
- **Kanten:** Referenz auf Anfangs- und Endeckpunkt, Referenz auf angrenzende Seiten (rechts und links), Referenzen auf vier Folgekanten (jeweils erste *clock-wise* und *counter-clock-wise* dabei)
	- $\Rightarrow$ rekursiv alle Kanten an einem Eckpunkt bestimmbar
- **Eckpunkte:** Koordinaten und Per-Vertex-Attributdaten, Referenz auf beliebige Kante, die den Eckpunkt referenziert
- **Seiten:** Indizes der Kanten, die das zugehörige Polygon definieren
- *Aber:* Keine GPU-Unterstützung, sondern Umwandlung on GPU-optimierte Polygonnetze nötig

![[Screenshot from 2025-02-20 18-50-47.png|500]]

**Vorteile:**
- Explizite Darstellung der Netztopologie
- Effizienter (d. h. direkter) Zugriff auf Nachbarschaftsbeziehungen: Einfaches Auffinden aller adjazenter Eckpunkte, Kanten und Polygone zu einem gegebenen Eckpunkt, zu einer gegebenen Kante oder zu einem gegebenen Polygon

**Nachteile:**
- Erhöhter Speicherbedarf
- Nichttriviale Implementierung der Datenstruktur
- Keine GPU-Unterstützung, d. h. GPU-optimierte Polygonnetzdarstellung muss abgeleitet werden (z. B. Dreiecksnetze)
- Einschränkung hinsichtlich der Oberflächenstruktur: Oberflächen mit Kanten, an die drei oder mehr Polygone angrenzen, sind nicht darstellbar

![[Screenshot from 2025-02-20 18-52-28.png|500]]

### Halfedge Polygon Meshes
Erweiterung der [[#Winged-Edge Polygon Meshes]], wobei jede Kante in zwei gegenläufige **halfedges** zerlegt wird (mit Pointer aufeinander)
- **Euler-Operatoren:** Ausführung respektiert den Eulerschen Polyedersatz
- zum Beispiel: MSVG (*make vertex, facet & shell*), MEV (*make edge & vertex*), MEKL (*make edge, kill loop*), etc.
- wird zum Beispiel in [CGAL](https://www.cgal.org/) implementiert

![[Screenshot from 2025-02-18 23-51-29.png|500]]

![[Screenshot from 2025-02-18 23-52-11.png|500]]

**Vorteile:**
- effiziente, feingranulare Datenstruktur für den topologieorientierten Aufbau von Polygonnetzen
- Systematische Operatoren für die Modifikation der Polygonnetze
- Grundlage für High-level Netzoperatoren
- De-fakto-Standard im Bereich Solid-Modeling

**Nachteile:**
- größerere Speicherplatzbedarf aufgrund der expliziten, doppelten Kantendarstellung
- Hoher Konsistenzprüfungs- und Erstellungsaufwand
- Keine Unterstützung durch 3D-Hardware / GPU

> [!caution] Vor- und Nachteile der Darstellungen nochmal überfliegen

---
# Dreiecksnetze
**Vorteile von Dreiecken**
- kann in jede gewölbte Oberfläche eingebettet werden (siehe vier Tischbeine) oder umgekehrt: Dreiecke sind stets planar
- stets konvex
- parametrisierbar (siehe ==Baryzentrische Koordinaten==)
- $\Rightarrow$ GPU-unterstützt

**Tesselation:**
- Dreieck in durch Punkt im inneren in drei neue Dreiecke zerlegen $\Rightarrow$ inkrementelle Modellierungs-Verfeinerung (z.B. Kugeloberfläche)
- alternative Strategie: über Mittelpunkte der Kanten vier neue Dreiecke

## Triangulierung
Zerlegen einer gegebenen Oberfläche in ein Dreiecksnetz
- exakt gleich bei polygonalen Oberflächen
- Approximation bei nicht-polygonalen Oberflächen (z.B. implizit definiert, parametrische / analytisch) einstellbar

**Trivialer Algorithmus für konvexe Polynome:**
- beliebiger Eckpunkt als *Ankerpunkt*
- Dreiecke werden durch jede *Diagonale* von dem Ankerpunkt zu allen anderen nicht-benachbarten Eckpunkte hergeleitet
- Laufzeit $\mathcal{O}(n)$

**Monotone Polygone:**
- Punkte werden in einer doppelt verketteten Liste nach ihrem $y$-Wert (bzw. $x$) absteigend sortiert
- Eckpunkte des linke / rechten Teil des Polygonzuges werden zusammengefasst
- Laufzeit $\mathcal{O}(n)$ | mittels Stack

**Einfache Polygone:**
- Jedes ==einfache Polygon== mit $n$ Ecken besitzt eine Triangulierung mit $n - 2$ Dreiecken und $n - 3$ Diagonalen
	- jedes einfache Polygon besitzt *strikt konvexe Ecke* und damit auch eine Diagonale im Inneren
- ähnliche große und gleichmäßige Polygone insbesondere für Beleuchtung wünschenswert (Berechnung nur an den Eckpunkten)

### Ear Cutting
- Jedes einfache Polygon mit mindestens 4 Ecken hat mindestens zwei Ohren, d. h. Dreiecke, bei den zwei Kanten den Polygonkanten entsprechen
- Cutting-Ear-Algorithmen suchen solche Ohren zu einem Eingabepolygon, entfernen das Ohr und arbeiten rekursiv auf dem verbleibenden Teilpolygon weiter, bis nur noch ein Dreieck übrig ist
- Laufzeit $\mathcal{O}(n)$ | trivial und rekursiv zu Programmieren

---
# Graphische Primitive
## OpenGL
- `GL_POINTS` (heutige Verwendung vorrangig für Laser-Scans)
- `GL_LINES`
	- `GL_LINE_STRIP`
	- `GL_LINE_LOOP`
- `GL_TRIANGLES`
	- `GL_TRIANGLE_STRIP` (letzte drei Vertices)
	- `GL_TRIANGLE_FAN` (erste Vertex + letzte beiden Vertices)
- `GL_PATCHES`

![[Screenshot from 2025-02-20 18-54-51.png|500]]

## Triangle Strips & Triangle Fans
- Strips können über degenerierte Dreiecke (doppelter Index) zusammengefügt werden
- **Primitive Restart:** Statt degenerierter Dreiecke kann auch der maximale Index (`0xFFFF`, 65535) als Steuerelement eingefügt werden

## Triangle Stripification
Ziel: Möglichst kleine Anzahl von möglichst großen Streifen, die insgesamt die Oberfläche vollständig und redundanzfrei darstellen
- Algorithmen Greedy oder auf Grundlage eines Oberflächengraphs und dessen Analyse

---
# Höhenfelder
- Höhenfeld $H$ ist gegeben durch entweder eine stetige, reelwertige Funktion $H(x,y)$ oder ein reguläres $H[i,j]$ mit Höhenwerten an den Gitterpunkten
- Triviale Triangulierung besteht darin, zu einem Zeilenabstand (Gitterabstand) jeweils einen Dreiecksstreifen zu bilden
- **Adaptive Triangulierung** erzeugt dort mehr Dreiecke (höhere Auflösung), wo eine stärkere Formveränderung vorliegt
- **Level-of-Detail-Triangulierungen** erzeugen Triangulierungen mit unterschiedlicher Auflösung
	- z.B. Quadtree (sichtabhängiges LoD)
- "2,5-dimensional", denn nur ein Höhenwert je $xz$-Koordinate erlaubt

## Triangulierung regulärer Gitter
Wahl der Diagonale je Gitterzelle zum Beispiel nach folgenden Kriterien:
- möglichst große Normalenwinkel-Unterschiede
- möglichst flächengleiche Dreiecke
- Diagonale zwischen Eckpunkten auf möglichst gleicher Höhe

---
# Oberflächennormale
**Polygon / Facid Normals** sind den Flächen zugeordnet
- werden für Ausrichtung der Fläche (Front-Facing / Back-Facing) verwendet

**Vertex Normals** sind den Punkten zugeordnet
- werden für Shader (z.B. [[08_illumination_and_shading|Beleuchtung und Schattierung]]) verwendet
- **smooth shading:** benachbarte Polygone haben dieselben Normalen an den Eckpunken (z.B. Mittelwert der anliegenden Facid Normals)
- **hard shading:** ab z.B. 15° wird harte Kante erkannt $\Rightarrow$ demselben Eckpunkt werden in verschiedenen Polygonen verschiedene Normalen zugewiesen
	- *Smoothing groups:* lokal glatte Flächenstücke mit (anschließender Berechnung von) gemeinsam genutzten Normalen

![[Screenshot from 2025-02-19 18-35-17.png|500]]

## Normalenberechnung
Können bereits gegeben sein:
- explizit im Polygonnetz enthalten (ggf. manuell modeliert)
- implizit aus der Polygondarstellung berechenbar
- implizit aus ursprünglicher (nicht-polygonalen) Objektform herleitbar (z.B. Zylindermantel)

**Allgemeine Berechnung** über die Ebenengleichung $Ax + By + Cz + D = 0$ der Ebene, in der das Polygon liegt
- Auswahl dreier Punkte $p_0, p_1, p_2$ des Polygons
- Normalenberechnung durch $(A, B, C)^T$, d.h. $N = \text{norm}((p_0 - p_1) \times (p_0 - p_2))$
- **Problematisch:** Berechnung bei fast planaren Polygonen
	- Auswahl von 3 Punkten ist i. Allg. kritisch (z. B. koplanare Punkte, numerische Ungenauigkeiten)
	- Berücksichtigung aller Koordinaten eines Polygons sinnvoll

**Lösungsansätze:** Numerische Genauigkeit ist ein generelles Problem bei der Berechnung von Polygonnormalen
- Umstellung der Berechnung: $N = (p_2 - p_0) \times (p_1 - p_0) = p_2 \times p_1 - p_2 \times p_0 - p_0 \times p_1$
- Berechnung konsekutiver Kanten und Mittelung der resultierenden Normalen
- Auswahverfahren:

```
Repeat k times
	Pick 3 random polygon vertices
	Calculate the normal of the according triangle
Choose the longest normal as the polygon's normal / discard those with length < epsilon
```

## Weitere Probleme
**Konsistente Orientierung:** Polygone im Polygonnetz müssen konsistent orientiert sein, damit die implizit definierten Polygonnormalen einheitlich nach außen oder innen zeigen
- Grundproblem bei [[#Polygon Soup|Polygon Soups]]

**Folgen fehlerhafter Polygonberechnung:**
- Inkonsistente Orientierung benachbarter Polygone (Innen- und Außenflächen sind inkonsistent)
- Überlappende Polygone (Modellfehler, Rendering-Artefakte)
- Nichtintendierte Löcher (*holes* – Modellfehler, Rendering-Artefakte)
- Brüche (*cracks*)
- T-Verbindungen (*T-junctions*)
- Degenerierte Polygone (*degenerated polygons*)
- etc.

![[Screenshot from 2025-02-19 18-38-58.png|500]]
