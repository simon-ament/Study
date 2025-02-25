---
title: Beleuchtung und Schattierung
---
# Beleuchtung und Schattierung
- Licht ist eine zentrale Basis im Photorealismus
	- Ziel: nicht unterscheidbar von echtem Photo
- Modellierung der Lichtausbreitung
	1. Lichtstrahlen zu nichtsichtbaren Szenenelementen
	2. indirekt sichtbares Licht über spiegelnde Oberflächen
	3. direkt reflektiertes Licht an Oberflächen
	4. indirekt im Raum transportiertes, gestreutes Licht
	5. nicht aus Kamerasicht sichtbare Lichtstrahlung
- tatsächliche Berechnung der Lichtstrahlen (Photonen-tracing) in Echtzeit nicht möglich

**Schattierung:**
- Einfärben der Oberflächen von Objekten mit Farben, deren Intensität über ein Beleuchtungsmodell bestimmt ist
- Berechnung oft durch **Oberflächennormalen** und **Einfallswinkel**
- Schattierung ist eng an den Rasterisierungsprozess gekoppelt und findet daher in der Rasterisierungsstufe der Rendering-Pipeline statt
- Meist genügen wenige Samples, um eine Oberfläche zu schattieren (z.B. durch Interpolation)

**Hauptphänomene:**
- Reflexion: Zurückwerfen von Licht
- Transmission: Durchlassen von Licht
- Absorption: Verschlucken von Licht

**Weitere Phänomene:**
- Diffraktion: Beugen der Lichtwellen
- Refraktion: Brechen der Lichtwellen an Grenzflächen zweier Medien
- Interferenz: Überlagerungserscheinung beim Zusammentreffen zweier und mehrerer Wellenzüge

![[Screenshot from 2025-02-18 23-59-49.png|500]]

---
# Phong-Beleuchtungsmodell
Kombination aus Ambient (Grundfarbe), Diffuse und Specular

![[Screenshot from 2025-02-20 19-08-40.png|500]]

## Beleuchtungsmodelle
Für Oberflächenpunkte wird approximativ berechnet, wieviel Energie von den Lichtquellen direkt oder indirekt eintrifft

**Direkte Beleuchtung:**
- Es wird nur die Beleuchtung durch Lichtquellen berücksichtigt, die auf direktem Wege (ohne Hindernisse oder Reflexion) ankommt
- Approximation der Lichteinwirkung durch Modellvereinfachung
- Entsprechende Ansätze werden **lokale Beleuchtungsmodelle** genannt
	- z.B. Phong Illumination, Gooch Illumination

**Indirekte Beleuchtung:**
- Es werden direkte und indirekte Transportwege berücksichtigt, z.B. Licht, das über mehrere Objekte hinweg auf ein Objekt gestrahlt wird
- Komplexe Gleichungssysteme bzw. vielschichtige Lichtstrahlenverfolgung sind dazu notwendig
- Entsprechende Ansätze werden **globale Beleuchtungsmodelle** genannt
	- z.B. Ray-Tracing, Photon-Mapping

## Phong-Arbeitsweise
- Additive Berechnung der Intensität über drei Terme: *ambient, diffuse, spelular*
- Approximative Berechnung – experimentelle Bestätigung des Ansatzes

**Input:**
- Position $P = (x, y, z)$ in 3D-Objekt- bzw. 3D-Weltkoordinaten
- Normale $N = (n_x, n_y, n_z)$ der Reflexionsebene
- Materialkoeffizienten $k_a, k_d, k_s$, die Reflexionseigenschaften charakterisieren | getrennt für ambiente, diffuse und spekulare Reflexion
- Virtuelle Lichtquellen mit Lichtrichtung $L$
- Kamersichtrichtung $V$

**Ouput:**
- Lichtintensität $I$ für ausgewählte Wellenlängen (z.B. $R, G, B$)

## Ambiente Reflexion
- Approximation der **allgemeinen Raumhelligkeit**
- $I_{a_\text{global}}$: Globale, ambiente Intensitit, konstant für die Szene
- $k_a$: Ambienter Reflexionskoeffizient, objektabhängig

$$I = I_{a_\text{global}} k_a$$

$$I_{a_\text{global}} = \begin{pmatrix}I_r \\ I_g \\ I_b\end{pmatrix} \in [0, 1]^3$$

## Diffuse Reflexion
Modellierung des Streulichts an einer Oberfläche
- Modellannahme: eintreffendes Licht wird in alle Richtungen gleichmäßig abgegeben
- **Lambertsches Gesetz:** Lichtmenge reflektiert von einer Einheitsfläche zum Betrachter ist proportional zum Kosinus des Winkels zwischen der Einfallsrichtung des Lichtes und der Flächennormale
	- Berechnung: Gewichtung der einfallenden Energie proportional zum Winkel $\theta$ zwischen "Lichtrichtung" $L$ (eigentlich Vektor von $P$ zur Lichtquelle, also inverse Lichtrichtung) und Oberflächennormale $N$ mit
		- $I_d$: diffuse Intensität der Lichtquelle
		- $k_d$: diffuser Reflexionskoeffizient, objektabhängig
		- $\cos \theta$: Skalarprodukt von $L$ und $N$ (beide normalisiert)

$$I = I_{a_\text{global}} k_a + I_d k_d \langle N, L \rangle$$

![[Screenshot from 2025-02-20 19-14-37.png|500]]

## Spekulare (spiegelnde) Reflexion
Modelliert das Spiegellicht auf Oberflächen
- Modellannahme: eintreffendes Licht spiegelt sich an der Oberfläche ungleichmäßig und besonders konzentriert in eine Spiegelrichtung
- Intensität ist abhängig von der Betrachterrichtung $V$ (*Viewer*)
- Berechnung: Gewichtung proportional zum Winkel $\alpha$ zwischen Reflexionsrichtung $R$ und Betrachterrichtung $V$
	- Maximale spekulare Reflexion für $\alpha = 0$
	- Maß für das Abfallen der spekularen Reflexion ist Exponent: $\cos^n \alpha$
	- $I_s$: spekulare Intensität der Lichtquelle
	- $k_s$ spekularer Reflexionskoeffizient, objektabhängig (*shininess*)
		- beeinflusst Größe bzw. Konzentration des Lichtspots, aber nicht dessen Glanz (Farbe)
	- $\cos^n \alpha$: Skalarprodukt von $V$ und $R$ (beide normalisiert)
		- es lässt sich herleiten, dass $\langle R, V \rangle = \langle (2N \langle N, L \rangle - L), V \rangle$

$$I = I_{a_\text{global}}k_a + I_d k_d \langle N,L \rangle + I_sk_s \langle R,V \rangle^n$$
![[Screenshot from 2025-02-20 19-15-57.png|500]]

## Farbe und Stärke des reflektierten Lichts
- Explizite Definition mittels der "Spekularfarbe"
	- **Plastik:** spekulare Reflexion in der Farbe der Lichtquelle
	- **Metall:** spekulare Reflexion in der Farbe des Materials
	- $\Rightarrow$ für diffuse und spekulare Reflexion werden unterschiedliche Farben im Beleuchtungsmodell spezifiziert
- **Attenuation / Lichtdämpfung:** Abschwächung der Lichteinwirkung mit zunehmender Entfernung
	- invers proportional zum Quadrat der Distant $d$
	- sinnvoll für räumlich nahe Lichtquellen (Punktlichtquellen, Spotlights), nicht für gerichtete Lichtquellen (z.B. Sonnenlicht)
	- $c_1, c_2$ und $c_3$ sind benutzerdefinierte Konstanten, assoziiert mit der einzelnen Lichtquelle ($c_1$ konstant, $c_2$ linearer Verlauf, $c_3$ quadratischer Verlauf)
	- $c_1$ verhindert, dass der Faktor zu groß wird, falls die Distanz zu klein wird
	- in der Praxis wird entweder linear oder quadratisch eingestellt

**Universelle Attentuationsfunktion:**
$$f_\text{att} = \min\left( \frac{1}{c_1 + c_2 d + c_3 d^2}, 1 \right)$$

- **Eigenemission von Licht:** beschreibt die Helligkeit, die ein Flächenstück selbst besitzt
	- $k_\text{em}$: Emissionskoeffizient (meist $k_\text{em} = 0$)
	- nicht automatisch eigene Lichtquelle $\Rightarrow$ kein Einfluss auf Beleuchtungsberechnung anderer Flächen
	- Teil des ursprünglichen Fixed-Pipeline-Phong-Modells, in Shadern vollkommen flexibel modellierbar
- **Ambientbeitrag von Lichtquellen:** pro *zusätzlicher* Lichtquelle kann im Allgemeinen angenommen werden, dass die Intensität des ambienten Lichts zunimmt
	- $I_a$: zusätzlicher ambienter Intensitätsanteil je Lichtquelle
	- globale definierte ambiente Intensität $I_{a_\text{global}}$ bleibt bestehen 

**Phong-Implementierung:**
- Berechnung erfolgt simultan für den Rot-, Grün- und Blaukoeffizienten
- Materialkoeffizienten bzw. Intensitäten sind daher 3-Komponentenvektoren
- Diffuser und spekularer Anteil wird nur für Front-Facing-Polygone berechnet

**Kennzeichen des Phong-Beleuchtungsmodells:**
- Modelliert direkte Interaktion zwischen Lichtquellen und Objekten
- Ignoriert Verdeckung, Schattenwurf, Selbstschattierung und indirekte Lichtreflexion
- Empirisches Modell für Highlights um den Reflexionsvektor $R$
	- Vereinfachung der Berechnung von $R$ durch Half-Way-Vektoren

![[Screenshot from 2025-02-24 17-30-23.png|500]]

- An Oberflächeneigenschaften wird nur die geometrische Normale benötigt
- Effizient berechenbar, integrierbar in Realtime-Rendering-Pipeline
- Grundmodell und Varianten programmierbar durch Shader

## Mathematische Formulierung
**Phong-Beleuchtungsmodell für eine Lichtquelle:**

$$I = I_{a_\text{global}} k_a + k_\text{em} + I_ak_a + f_\text{att}(c) \cdot (I_d k_d \langle N, L \rangle + I_s k_s \langle R, V \rangle ^\text{shininess})$$

**Phong-Beleuchtungsmodell für mehrere Lichtquellen:**

$$I = I_{a_\text{global}} k_a + k_\text{em} + \sum_{i=1}^n \left( I_{a_i}k_a + f_\text{att}(c_i) \cdot (I_{d_i} k_d \langle N, L_i \rangle + I_{s_i} k_s \langle R_i, V \rangle ^{\text{shininess}_i}) \right)$$

**Verienfachte Parametrisierung in der Praxis:**

$$I = I_\text{global} k_a + \sum_{i=1}^n \left( I_ik_a + f_\text{att}(c_i) \cdot (I_i k_d \langle N, L_i \rangle + I_i k_s \langle R_i, V \rangle ^{\text{shininess}_i}) \right)$$

- $k_\text{em} = 0$
- $I_{a_\text{global}}, I_a, I_d, I_s$ vereinfacht zu $I_\text{global}, I$

## Phong-Parameter
- $I_{a_\text{global}}, I_a, I_d, I_s$: Intensität der Lichtquelle(n), *vektorwertig*
- $I_\text{global}, I$: vereinfachte Intensität der Lichtquelle(n), *vektorwertig*
- $L, R$: Lichtrichtung und Reflexionsrichtung, *vektorwertig*
- $V$: Blickrichtung der Kamera, *vektorwertig*
- $N$: Oberfächennormale, *vektorwertig*
- $k_a, k_d, k_s$: Materialkoeffizienten der Oberfläche, *vektorwertig*
- $\text{shininess}$: Spekular-Exponent der Oberfläche, *reelwertig, Materialkoeffizient*
- $k_\text{em}$: Materialkoeffizient für emissive Oberflächen (Verwendung heute eher unüblich, kann als überlagerte Farbe für z.B. Selektion oder Hervorhebung verwendet werden)
- $c_1, c_2, c_3$ bzw. $c$: Attentuationsparameter, *reelwertig bzw. vektorwertig*
- $n$: Anzahl zu berücksichtigender Lichtquellen

> [!caution] Kommt in der Klausur dran (erklären können)

---
# Lichtquellen-Modellierung
Lichtquellen in Echtzeit-Renderingsystemen sind "idealisiert"
- Emittieren Licht in speziellen Wellenlängenbereichen (R, G, B)
- Verfügen nicht über eine Oberfläche (bzw. Ausdehnung)
- Verfügen nicht über physikalische Eigenschaften (z.B. Leuchtmittel)
- sind konzeptionelle, nicht aber geometrische Elemente einer Szenenbeschreibung

**Umgebungslichtquelle:**
- *Ambient Light*
- ungerichtete Lichtstrahlen, gleichmäßig verteilt, Lichtintensität konstant (unabhängig von Entfernnung)
- Simuliert allgemeine Raumhelligkeit (Grundhelligkeit)

![[Screenshot from 2025-02-19 11-38-16.png|500]]

**Gerichtete Lichtquelle:**
- *Distant / Directional Light*
- Unendlich weit entfernt gedachte Lichtquelle $\Rightarrow$ Intensität unabhängig von Entfernung
- Lichtstrahlen verlaufen in der gesamten Szene parallel und gleichmäßig, Richtung wird als Vektor spezifiziert

![[Screenshot from 2025-02-19 11-38-26.png|500]]

**Punktlichtquelle:**
- *Point Light*
- Ausstrahlung gleichmäßig in alle Richtungen
- Optional: [[#Farbe und Stärke des reflektierten Lichts|Dämpfung]] zur Abschwächung der Wirkung

![[Screenshot from 2025-02-19 11-38-36.png|500]]

**Spotlichtquelle:**
- *Spot Light* / Scheinwerfer
- Spezielle Punktlichtquelle mit geometrischem Zentrum
- Ausstrahlung von Licht beschränkt auf einen kegelförmigen Bereich, dessen Spitze im Zentrum liegt
- Spezifiziert durch Öffnungswinkel (*cut-off angle*) und Exponenten für den Abfall der Helligkeit mit Abstand zum Zentrum

![[Screenshot from 2025-02-19 11-38-49.png|500]]

**Flächenlichtquelle:**
- *Area Light*
- Lichtquelle mit geometrischem Zentrum und geometrischer Ausdehnung (meist planar)
- Ausstrahlung über die gesamte Fläche analog zu einer Punktlichtquelle
- Optional [[#Farbe und Stärke des reflektierten Lichts|Attenuation]]
- Realisierung im Echtzeitrendering z.B. durch eine Menge von Punktlichtquellen oder Spot Lights

![[Screenshot from 2025-02-19 11-38-58.png|500]]

---
# Schattierung

![[Screenshot from 2025-02-18 23-55-41.png|500]]

- Einfärben der Pixel, auf die die Objektoberfläche projiziert wird, unter Berücksichtigung der Lichtintensität, die mit einem Beleuchtungsmodell berechnet wird
- Grundkonflikt: Beleuchtungsmodell im **Weltkoordinatensystem**, aber Schattierungsmodell im **normalisierten Projektionskoordinatensystem**

## Flat-Shading
- Aufruf des Beleuchtungsmodells für einen einzigen Punkt einer Fläche (z.B. Polygon-Zentrum)
- Schattierung des gesamten Polygons in der ermittelten Intensität
- Sinnvoll anwendbar, wenn:
	- Lichtquelle unendlich weit entfernt ($L, N$ konstant)
	- Betrachter unendlich weit entfernt ($V, N$ konstant)
	- Fläche ist Einzelfläche und nicht Teil einer Approximation (z.B. generiert durch Tesselation)
- Andernfalls: "Facettierte" Erscheinung der Objekte

## Garoud-Schattierung
- Interpolation von Intensitätswerten an den Polygonecken
- Voraussetzungen:
	- Flächenzerlegung in Polygone (meist Dreiecke)
	- Oberflächennormalen für die Polygonecken (*vertex normals*)
		- z.B. aus analytischer Flächenbeschreibung zusammen mit polygonaler Approximation ableitbar
		- z.B. durch Mittlung und Gewichtung der Polygonnormalen von angrenzenden Flächen berechenbar

**Arbeitsweise:**

1. Berechne Intensitätswerte $I_i$ für Polygonecken $v_i$
2. Lineare Interpolation der Intensitätswerte entlang der Kanten
3. Lineare Interpolation der Intensitätswerte entlang der **Scanlines**

**Interpolationsprobleme:**
- Intensitätsschwankungen im Inneren werden nicht berücksichtigt
	- z.B. Spotlight, das in Zentrum des Dreiecks scheint
	- lösbar durch höhere Tesselation
- Zusammenhängende Polynome, die nicht vollständig entlang der Kanten über gemeinsame Ecken verfügen, werden im Allgemeinen unterschiedlich schattiert
	- z.B. T-Konfiguration (zwei benachbarte Flächen an einer Kante)

## Phong-Schattierung
- Interpolation der Eckennormalen statt der Eckenintensitäten

**Arbeitsweise:**

1. Berechnung der Eckennormalen
2. Interpolation der Normalen zwischen den Ecken
3. Interpolation zwischen den Endpunkten einer **Scanline**
4. Pro Fragment einer Scanline:
	1. Normalisierung des interpolierten Normalenvektors
	2. Aufruf des Beleutungsmodells
	3. Färbung des Fragments

**Vorteile:**
- Hohe visuelle Qualität durch fragmentbasierte (= bildpräzise) Berechnung der Beleuchtung
- Intensitätsschwankungen werden auch im Inneren eines Polygons abgebildet
- Beleuchtungsqualität ist unabhängig von geometrischer Auflösung eines Modells
- Phong-Shading ist für das Echtzeit-Rendering in Form von Shadern implementierbar

**Nachteile:**
- Hoher Berechnungsaufwand pro Fragment
- Aufwand für die Beleuchtungsberechnung ist abhängig von der Bildkomplexität eines Modells (Zahl der Fragmente)

![[Screenshot from 2025-02-18 23-56-52.png|500]]

![[Screenshot from 2025-02-18 23-56-58.png|500]]

## Normalenberechnung für ein Polygon
**Kreuzprodukt der Randvektoren:**

1. Wähle zwei nichtdegenerierte Randvektoren des Polygons (z.B. $\vec{v_0v_1}$ und $\vec{v_0v_2}$)
2. Bilde Kreuzprodukt
3. Normalisiere den Ergebnisvektor

$$N = \frac{(v_1 - v_0) \times (v_5 - v_0)}{||(v_1 - v_0) \times (v_5 - v_0)||}$$

**Summierung einheitlich gewichteter Normalen:**
- *weight-uniformly*

1. Berechne Normalen für Polygone
2. Summiere Normalen der Polygone, die die ausgewählte Ecke enthalten
3. Normalisiere Ergebnisvektor

![[Screenshot from 2025-02-20 19-20-09.png|500]]

---
# Nicht-photorealistische Beleuchtungsmodelle
**Technische und wissenschaftliche Illustrationen:**
- Hervorhebung der Kanten durch *contour lines* (oft schwarz gefärbt)
- Spärliche Nutzung von Schattierungseffekten, um zu verhindern, dass relevante Details verdeckt werden
- Spezielle, *unrealistische* Lichtverhältnisse in ausgewählten Oberflächenbereichen, um Details hervorzuheben
- Beschränkung auf eine einzige Lichtquelle (Highlights häufig weiß gefärbt)
- Kodierung der Oberflächennormalen durch "Temperatur" der verwendeten Farben
- LDR-Schattierung (*low dynamic range*) von matten Objekten, d.h. Beschränkung auf Farben, die sich deutlich von schwarz und weiß abgrenzen und geringe Luminanzvariationen aufweisen

**Schattierung von metallenen Oberflächen:**
- Streifen parallel zur Fräsachse $\Rightarrow$ Darstellung durch alternierende Verwendung heller und dunkler Streifen
- kann durch Gooch-Schattierung unterstützt werden

## Farbton- und Luminanzverschiebung
- Kommunikation von Strukturinformationen in farbigen Illustrationen
- **Shades** (Hinzufügen von Schwarz), **Tints** (Hinzufügen von weiß), **Tones** (Hinzufügen von Grau)
- **Tones** unterscheiden sich nur gering hinsichtlich Luminanz und eher hinsichtlich des Farbtons $\Rightarrow$ eignet sich besonders für LDR-Schattierung
- **Farbtemperatur:** kalte Farben wirken weit entfernt, warme Farben wirken nahe (Objekte müssen eng beieinander stehen)

![[Screenshot from 2025-02-20 19-20-53.png|500]]

## Gooch-Schattierung
**Nachteil der Phong-Beleuchtung:** Verlust von Struktur und Materialinformationen in schattierten Oberflächenbereichen
- Lösungsansatz 1: Highlights für ausgewählte Oberflächenbereiche (Kanten hervorheben, ambiente und diffuse Reflexion **manuell** anpassen)
- Lösungsansatz 2: Gooch-Schattierung

**Arbeitsweise:**
- **Phong**-Beleuchtungsmodell wird auf Term zur **diffusen Beleuchtungsberechnung** beschränkt

$$I = I_d k_d \langle N, L \rangle$$

- Nutzung des Verhältnisses zwischen der Oberflächennormale und dem Lichtvektor zur Interpolation zwischen einer warmen und einer kalten Farbe

$$I = \left( \frac{1 + \langle N, L \rangle}{2} \right) k_\text{kalt} + \left( 1 - \frac{1 + \langle N, L \rangle}{2} \right) k_\text{warm}$$

**Eigenschaften:**
- geringe Luminanzvariation (LDR-Schattierung)
- verbesserte Tiefenwahrnehmung
- geringe Variation bezüglich Farbtemperatur, unnatürlich wirkende Farben
	- Lösung: automatisierte Farbtonverschiebung, stärkere Luminanzvariation (Kombination zweier Farbskalen)

![[Screenshot from 2025-02-20 19-22-43.png|500]]
## Cartoon-Schattierung (Cel-Shading)
- Verzicht auf Details
- hervorgehobene Kanten + Kategorisierung von Farben (beschränkte Anzahl) $\Rightarrow$ harte Übergänge zwischen Farben

![[Screenshot from 2025-02-20 19-22-19.png|500]]
