---
title: Geometrische Transformationen
---
# Vektorraum
Ein Vektorraum über einem Körper $\mathbb{K}$ ist ein Tripel $(V, +, \cdot)$ bestehend aus einer Menge $V$, einer Additions-Operation $+: V \times V \rightarrow V$ und einer Operation zur skalaren Multiplikation $\cdot : \mathbb{K} \times V \to V$, so dass gilt
- $(V, +)$ ist eine **abelsche Gruppe**
- **Assoziativität der skalaren Multiplikation:** $\forall \lambda, \eta \in \mathbb{K}, v \in V: (\lambda \cdot \eta) \cdot v = \lambda \cdot (\eta \cdot v)$
- **Neutrales Element:** $\forall v \in V: 1 \cdot v = v$
- **Distributivgesetze:** $\forall \lambda, \eta \in \mathbb{K}, v, w \in V: (\lambda + \eta) \cdot v = \lambda \cdot v + \eta \cdot v$ und $\lambda \cdot (v + w) = \lambda \cdot v + \lambda \cdot w$

---
# Skalarprodukt
Sei $V$ ein $\mathbb{R}$-Vektorraum. Ein inneres Produkt (Skalarprodukt) ist eine Abbildung $\langle \cdot , \cdot \rangle: V \times V \to \mathbb{R}, (u,v) \mapsto \langle u,v \rangle$, so dass für beliebige Elemente $u, v, w, \in V$ und $\lambda \in \mathbb{R}$ gilt:
- **Symmetrie:** $\langle u, v \rangle = \langle v, u \rangle$
- **Additivität:** $\langle u + v, w \rangle = \langle u, w \rangle + \langle v, w \rangle$
- **Multiplikativität:** $\langle u, \lambda v\rangle = \lambda \langle u,v \rangle = \langle \lambda u,v \rangle$
- **Positive Definitheit:** $\langle u, u \rangle \geq 0$ und $\langle u, u \rangle = 0 \Leftrightarrow u$ ist der Nullvektor (neutral bezüglich Addition)

## Euklidisches Standardskalarprodukt
Das Euklidische Standardskalarprodukt im $\mathbb{R}^n$ ist definiert als $\langle u,v \rangle = u \cdot v = \sum_{i=1}^n u_iv_i$

Zum Beispiel: $u = \begin{pmatrix} 1 \\ 2 \\ -7 \end{pmatrix}$ und $v = \begin{pmatrix}4 \\ 2 \\ 3\end{pmatrix}$, $\langle u,v \rangle = 1 \cdot 4 + 2 \cdot 2 + (-7) \cdot 3 = 13$

## Anwendungen
### Längenmessung
Die Länge eines Vektors entspricht dessen Betrag:

$$|| \cdot || : \mathbb{R}^3 \rightarrow \mathbb{R}, v \mapsto ||v|| = \sqrt{\langle v, v \rangle} = \sqrt{v_x^2 + v_y^2 + v_z^2}$$

Die Betragsfunktion erfüllt dabei folgende Eigenschaften für beliebige Elemente $u,v \in \mathbb{R}^3, \lambda \in \mathbb{R}$:
- $||u|| = 0 \Leftrightarrow u = 0$
- $||\lambda u || = \lambda ||u||$
- $||u + v|| \leq ||u|| + ||v||$ (Dreiecksungleichung)

Damit erfüllt die Betragsfunktion die Eigenschaften einer **Norm** (Abbildung, die die Größe eines Objekts beschreibt) und kann unter anderem dazu verwendet werden, Vektoren zu normalisieren (gleiche Orientierung, Länge 1):

$$\mathrm{norm}: \mathbb{R}^n \to \mathbb{R}, v \mapsto \mathrm{norm}(v) = \frac1{||v||}v$$

### Winkelmessung
Die Messung von Winkeln zwischen zwei Vektoren gilt als **Hauptanwendung des Skalarprodukts**. Mithilfe des Kosinussatzes lässt sich für $v, u \in \mathbb{R}^3$ und deren Schnittwinkel $\theta$ herleiten:

$$\langle u, v \rangle = ||u|| \cdot ||v|| \cos(\theta) \Leftrightarrow \cos(\theta) = \frac{\langle u,v \rangle}{||u|| \cdot ||v||}$$

Somit gilt:
- $\langle u, v \rangle > 0$ falls $-\frac\pi2 < \theta < \frac\pi2$
- $\langle u, v \rangle < 0$ falls $\frac\pi2 < \theta < \frac{3\pi}2$
- zwei Vektoren sind genau dann orthogonal, wenn ihr Skalarprodukt $0$ ist: $u \perp v \Leftrightarrow \langle u , v \rangle = 0$

![[Screenshot from 2025-02-19 10-36-52.png|500]]

**Front-Facing/Back-Facing-Test:** lässt sich nun mithilfe der Normalen $N$ der vom Polygon aufgespannten Ebenen durchführen:

$$\mathrm{sign}(\langle v,N\rangle) = \begin{cases}+1 & \text{front-facing} \\ -1 & \text{back-facing}\end{cases}$$

![[Screenshot from 2025-02-19 10-47-21.png|500]]

### Orthogonale Projektion von Vektoren
Ausgehend von den beschriebenen Eigenschaften des Skalarprodukts lässt sich ein Vektor $u, \in \mathbb{R}^3$ wie folgt orthogonal auf einen Vektor $v \in \mathbb{R}^3$ projizieren. Den projizierten Vektor bezeichnen wir mit $w = \lambda \cdot v$. Die Vektoren $u - w$ und $v$ sind orthogonal zueinander, sodass gilt

$$0 = \langle u - w, v\rangle = \langle u - \lambda v, v\rangle = \langle u,v \rangle - \lambda \langle v, v \rangle$$

Daraus ergibt sich

$$w = \lambda \cdot v = \frac{\langle u ,v \rangle}{\langle v, v \rangle}v$$

![[Screenshot from 2025-02-19 10-39-47.png|500]]

> [!info] Orthogonale Projektion eines Punktes auf eine Ebene
> Ebene gegeben durch Punkt $P_0$ und Normalenvektor $\vec{n}$, Punkt $P$ soll auf die Ebene projiziert werden
> 1. Projektion des Vektors $\vec{P_0P} = \vec{P} - \vec{P_0}$ auf den Normalenvektor $\vec{n}$ berechnen
> 2. Projektion von $P$ auf die Ebene ist $P$ minus die zuvor berechnete Projektion

### Abstandsmessung Punkt-Ebene
Wir betrachten einen Punkt $q$ in einer Ebene $E$. Es bezeichne $N = \begin{pmatrix}A \\ B \\ C \end{pmatrix}$ die Normale der Ebene. Die Ebene $E$ ist folglich mit $D = -\langle q, N \rangle$ gegeben durch die Menge:

$$E = \{p = (x,y,z) \in \mathbb{R}^3 | \langle p - q, N\rangle = \langle p, N\rangle - \langle q, N\rangle = \langle p, N\rangle + D = 0\}$$

also

$$E = \{p = (x,y,z) \in \mathbb{R}^3 | Ax + By + Cz + D = 0\}$$

Der Abstand eines Punktes $p \in \mathbb{R}^3$ zur Ebene $E$ ist demnach gegeben durch

$$\mathrm{dist}(p, E) = ||p - q || \cdot \cos(\theta) = ||p - q || \cdot \frac{\langle p - q, N \rangle}{||p - q || \cdot ||N||} = \frac{\langle p , N \rangle + D}{||N||}$$

![[Screenshot from 2025-02-19 10-59-02.png|500]]

> [!caution] Ebenengleichungen verstehen, Üben mit Altklausur, Aufgabe 3 b)

---
# Kreuzprodukt
Das Kreuzprodukt ist definiert als:

$$\times: \mathbb{R}^3 \times \mathbb{R}^3 \to \mathbb{R}^3, (u, v) \mapsto u \times v = \begin{pmatrix}u_1 \\ u_2 \\ u_3\end{pmatrix} \times \begin{pmatrix}u_v \\ u_v \\ v_3\end{pmatrix} = \begin{pmatrix}u_2v_3 - u_3v_2 \\ u_3v_1 - u_1v_3 \\ u_1v_2 - u_2v_1 \end{pmatrix}$$

![[Screenshot from 2025-02-19 11-04-05.png|500]]

## Anwendungen
- Berechnung von Oberflächennormalen für planare Polygone
- Berechnung des Flächeninhalts von Parallelogrammen
- Berechnung des Flächeninhalts von Dreiecken (halbes Parallelogram)

---
# Affiner Raum $A^3$
Punkte werden durch Vektoren beschrieben
- Assoziierter Vektorraum $V^3$
- Elemente: $a, b \in A^3 \Leftrightarrow \exists v \in V^3: v = b - a$
	- Positionen, keine Richtungen
	- Abstand von $a$ und $b$: $||a - b||$
- Affine Basis: $\{o, e_1, e_2, e_3\}$
	- Ursprung $o \in A^3$ und Basis des Vektorraums
	- Ortsvektor eines Punktes $p$: $(p-o) \in V^3$
- Affine Kombination zweier Punkte: $P = \lambda P_1 + (1 - \lambda) P_2$

**Klassifizierung von Abbildungen:**
1. Isometrische Abbildung
	- Invariante: Abstände
	- Reflexionen, starre Körper (Rotation und Translation)
2. Ähnlichkeitsabbildung
	- Invariante: Winkel
	- Uniforme Skalierung, Drehstreckung
3. **Affine Abbildung** $T: A^3 \rightarrow A^3$ (kontinuierlich, bijektiv. invertierbar)
	- nutzt meist [[#Homogene Koordinaten|Homogene Koordinaten]]:
	- Invariante: parallele Geraden
	- Nicht-uniforme Skalierung, Scherung
4. Kollineare Abbildung
	- Invariante: Geraden
	- Perspektive
5. Nicht-lineare Abbildung
	- Biegung, Verzerrung, etc.

## Lineare Abbildungen

Eine Abbildung $f: V \to W$ zwischen zwei Vektorräumen des gleichen Körpers $\mathbb{R}$ heißt lineare (genauer K-linear), falls für beliebige Elemente $u, v \in V$ und $\lambda \in \mathbb{K}$ gilt:
- $f(u+v) = f(u) + f(v)$
- $f(\lambda v) = \lambda f(v)$

Lineare Abbildungen von $\mathbb{R}^3$ nach $\mathbb{R}^3$ lassen sich durch $3 \times 3$-Matrizen darstellen, die jeweils das Bild eines Basis-Vektoren beinhalten (lineare Abbildungen sind über diese Bilder eindeutig definiert)

---
# Homogene Koordinaten
- Translationen (Verschiebungen) sind keine linearen Abbildungen auf dem $\mathbb{R}^3$
- Homogene Koordinaten nutzen $4 \times 4$-Matrizen, um alle Basistransformationen als lineare Abbildungen darzustellen

$$H: \begin{pmatrix}x \\ y \\ z\end{pmatrix} \rightarrow \begin{pmatrix}x \\ y \\ z \\ 1\end{pmatrix}$$

$$H^{-1}: \begin{pmatrix}x \\ y \\ z \\ w\end{pmatrix} \rightarrow \begin{pmatrix}x / w \\ y / w \\ z / w\end{pmatrix}$$

*Anmerkungen:* Punkte mit $w=0$ liegen im Unendlichen. Der Punkt $(0, 0, 0, 0)$ ist nicht definiert. Allerdings kann $w = 0$ genutzt werden, um Richtungen anstelle von Positionen anzugeben.

# 3D-Basistransformationen

![[Screenshot from 2025-02-18 23-39-53.png|500]]

## Translation
- Verschiebung von Objekten im Raum entlang eines Verschiebungsvektors (repräsentiert durch die Parameter)

$$T(d_x, d_y, d_z) =
\begin{pmatrix}
1 & 0 & 0 & d_x \\
0 & 1 & 0 & d_y \\
0 & 0 & 1 & d_z \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

**Eigenschaften:**
- Verkettung / Vertauschung: $T(d_1)T(d_2) = T(d_2)T(d_1) = T(d_1 + d_2)$
- Inverse: $T^{-1}(d) = T(-d)$

## Rotation
- Rotation um die Achsen $x, y$ und $z$
- Bewahrt Längen und Winkel (rigide)
- Im **rechtshändigen Koordinatensystem (RH-KS)** gilt für $90°$-Rotationen:
	- wir schauen bei Rotationen von einer positiven Achse zum Ursprung
	- Rotation um $+x$-Achse: $+y$ wird nach $+z$ gedreht
	- Rotation um $+y$-Achse: $+z$ wird nach $+x$ gedreht
	- Rotation um $+z$-Achse: $+x$ wird nach $+y$ gedreht

$$R_x(\theta) =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & \cos(\theta) & -\sin(\theta) & 0 \\
0 & \sin(\theta) & \cos(\theta) & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

$$R_y(\theta) =
\begin{pmatrix}
\cos(\theta) & 0 & \sin(\theta) & 0 \\
0 & 1 & 0 & 0 \\
-\sin(\theta) & 0 & \cos(\theta) & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

$$R_z(\theta) =
\begin{pmatrix}
\cos(\theta) & -\sin(\theta)  & 0 & 0 \\
\sin(\theta) & \cos(\theta) & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

**Eigenschaften:**
- Verkettung / Vertauschung (*achsengleich*): $R_a(\phi)R_a(\theta) = R_a(\phi + \theta) = R_a(\theta)R_a(\phi)$
- Inverse: $R_a^{-1}(\theta) = R_a(- \theta)$
- Rotation um *verschiedene Achsen* **nicht kommutativ**

## Skalierung
- Vergrößerung und Verkleinerung von Objekten
- bewahrt nicht die Länge und nur bei uniformer Skalierung ($s_x = s_y = s_z$) die Winkel

$$S(s_x, s_y, s_z) =
\begin{pmatrix}
s_x & 0 & 0 & 0 \\
0 & s_y & 0 & 0 \\
0 & 0 & s_z & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

**Eigenschaften:**
- Verkettung / Vertauschung: $S(s_{1_x}, s_{1_y}, s_{1_z})S(s_{2_x}, s_{2_y}, s_{2_z}) = S(s_{1_x}s_{2_x}, s_{1_y}s_{2_y}, s_{1_z}s_{2_z}) = S(s_{2_x}, s_{2_y}, s_{2_z})S(s_{1_x}, s_{1_y}, s_{1_z})$ 
- Inverse: $S^{-1}(s_x, s_y, s_z) = S(\frac1{s_x}, \frac1{s_y}, \frac1{s_z})$

## Spiegelung
- Spiegelung an der $xy$-, $xz$- oder $yz$-Ebene
- linkshändiges Koordinatensystem $\to$ rechtshändiges Koordinatensystem
- bewahrt Längen und Winkel, aber nicht die Polygonorientierung
	- $\Rightarrow$ Verwendung: Invertierung der Polygonorientierung

$$M_x =
\begin{pmatrix}
-1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

$$M_y =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & -1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

$$M_z =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & -1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

> [!caution] Auch als Skalierung darstellbar

## Scherung
- Allgemeine Scherungstransformation: $H_{xy}, H_{xz}, H_{yx}, H_{yz}, H_{zx}, H_{zy}$
- **1. Index:** Koordinate, die geändert wird
- **2. Index:** Koordinate, die dies kontrolliert

Beispiel:
$$H_{xz}(s) =
\begin{pmatrix}
1 & 0 & s & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

![[Screenshot from 2025-02-18 23-41-16.png|500]]

## Komposition
- erfolgt durch Multiplikation der Transformationsmatrizen: $(T_1 \cdot T_2 \cdot \dots \cdot T_n)p = T_\text{composite}p$
- Interpretation: Anwendung von rechts nach links

---
# Begriffe
**Orthogonale Matrix:** Eine Matrix $A \in GL(n, \mathbb{R})$ heißt orthogonal, falls gilt $AA^T = E$ als $A^{-1} = A^T$.
- Jede Rotationsmatrix ist orthogonal

$$
A^T =
\begin{pmatrix}
\cos(\theta) & \sin(\theta) \\ -\sin(\theta) & \cos(\theta)
\end{pmatrix}
=
\begin{pmatrix}
\cos(\theta) & -\sin(-\theta) \\ \sin(-\theta) & \cos(\theta)
\end{pmatrix}
= A^{-1}
$$

**Orthonormalbasis (ONB):** Eine Orthonormalbasis eines Vektorraums $V$ ist eine Basis, deren Vektoren alle die Länge 1 haben (normiert sind) und paarweise orthogonal sind, unterschiedliche Basisvektoren haben also das Skalarprodukt 0.
- Für beliebige $x,y \in \mathbb{R}^n$ und orthogonale Matrix $A$ gilt $\langle Ax. Ay \rangle = \langle x,y \rangle$, das heißt orthogonale Transformationen erhalten Längen und Winkel (*Rigid-Body-Transformation*)
- Eine orthogonale Matrix bildet eine ONB auf eine weitere ONB ab
- Eine Matrix, welche eine ONB auf eine weitere ONB abbildet, ist orthogonal

## Transformation gerichteter Liniensegemente
- Gegeben Liniensegmente $P_1P_2$ und $P_1P_3$. Transformiere sie in die $xz$-Ebene, wobei $P_1P_2$ auf der $z$-Achse liegen soll
- Die Transformation soll Längen und Winkelverhältnisse nicht ändern

![[Screenshot from 2025-02-19 14-29-50.png|500]]

### Weg 1 - Transformationsfolge

1. Transliere $P_1 = (−x_1, −y_1, −z_1)$ in den Ursprung 
2. Rotiere um die $y$-Achse, so dass $P_1P_2$ in der $yz$-Ebene liegt 
3. Rotiere um die $x$-Achse, so dass $P_1P_2$ in der $z$-Achse liegt 
4. Rotiere um die $z$-Achse, so dass $P_1P_3$ in der $xz$-Ebene liegt

### Weg 2 - Nutzung der Eigenschaften orthogonaler Matrizen
Wir suchen eine orthogonale Matrix $R$, sodass $X = R \cdot T$ die Liniensegmente wie gewünscht überführt, wobei $T$ die Translation von $P_1$ in den Ursprung beschreibt
- Suche ONB $(r_1, r_2, r_3)$, die den Liniensegmenten entspricht, und - eingesetzt als Zeilenvektor in $R$ - die Rotation von $(r_1 , r_2, r_3)$ auf ONB $(e_1, e_2, e_3)$ beschreibt

Der Vektor $r_3$ soll auf $e_3$ abgebildet werden. Da $P_1P_2$ auf der $z$-Achse liegen soll, wählen wir für $r_3$:

$$r_3 = \frac{P_2 - P_1}{||P_2 - P_1||}$$

Unter [[#Kreuzprodukt|Verwendung des Kreuzprodukts]] definieren wir weiter

$$r_2 = \frac{(P_3 - P_1) \times (P_2 - P_1)}{||(P_3 - P_1) \times (P_2 - P_1)||}, r_1 = \frac{r_2 \times r_3}{||r_2 \times r_3||}$$

![[Screenshot from 2025-02-19 14-39-10.png|500]]

![[Screenshot from 2025-02-19 14-39-19.png|500]]

## Transformation als Koordinatensystemänderung
Alternative Sichtweise auf Transformationen: nicht Punkte werden überführt, sondern lediglich Änderung des Koordinatensystems
- einzelne Objekte einer Szene erhalten ihr eigenes, lokales Koordinatensystem
- die lokalen Koordinatensysteme der Objekte müssen in ein gemeinsames Koordinatensystem, das Weltkoordinatensystem, überführt werden
	- $M_{i \leftarrow j}$ bezeichnet den Wechsel von $KS_j$ in das $KS_i$
	- $P^{(i)}$ bezeichnet die Darstellung des Punkte $P$ im $KS_i$
	- Invertierung: $M_{i \leftarrow j} = M^{-1}_{j \leftarrow i}$
	- Transition: $M_{i \leftarrow j} \cdot M_{j \leftarrow k} = M_{i \leftarrow k}$

![[Screenshot from 2025-02-19 14-42-34.png|500]]

**Koordinatensysteme für 3D-Transformationen:**
- Rechtshändiges: $z$-Achse schaut zum Betrachter
- Linkshändiges: $z$-Achse schaut vom Betrachter weg
- WebGL / OpenGL schreiben die Verwendung nicht vor, aber:
	- Konvention in Mathematik, Physik, 3D-Modellierung und *view/eye*-Koordinaten ist rechtshändig
	- *clip space* Koordinatensystem und *[[05_geometric_projections#Normalized Screen Coordinates / Normalized Device Coordinates (NDC)|normalized device coordinates]]* sind linkshändig

![[Screenshot from 2025-02-19 14-49-22.png|500]]

---
# Eulersche Winkel
Erlauben die Spezifikation einer Orientierung, d. h. einer Winkellage, eines Objekts im Raum.
- Eigentliche Eulerwinkel: $\alpha, \beta$ und $\gamma$
- Drehung $R$ kann in drei Drehungen um die jeweiligen Achsen aufgeteilt

# Smooth step function
$$f(x) =
\begin{cases}
0 &\text{falls } x < 0 \\
3x^2 - 2x^3 &\text{falls } 0 \leq x \leq 1 \\
1 &\text{sonst}
\end{cases}
$$

Eigenschaften:
- $f(0) = f(1) = 0$
- $f'(0) = f'(1) = 0$
- Gibt Familie an Polynomen mit solchen Eigenschaften (auch für höhere Ableitungen)

# Quaternion
Jedes Quaternion bildet ein Quadrupel mit vier reellwertigen Koeffizienten
- Verallgemeinerung der komplexen Zahlen (Quadrupel mit drei imaginären Komponenten)
- **Realteil:** $q_w$
- **Imaginärteil:** $q_x, q_y, q_z$

$$q = (q_x, q_y, q_z, q_w) = iq_x + jq_y + kq_z + q_w$$

**Mathematischer Hintergrund:** imaginäre Zahlen $i, j, k$ mit $i^2 = j^2 = k^2 = -1$ und $ij = k, jk = i, ki = j, ji = -k, kj = -i, ik = -j$

## Operationen auf Quaternionen
- Addition: (assozitiv und kommutativ): $q + r = (q_v, q_w) + (r_v, r_w) = (q_v + r_v, q_w + r_w)$
- Multiplikation mit Skalarwert: $\lambda q = \lambda(q_v, q_w) = (\lambda q_v, \lambda q_w)$
- Subtraktion von Quaterionen: $q - r = q + (-1)r$
- Multiplikation (assoziativ, aber nicht kommutativ): $qr = (q_v \times r_v + r_w q_v + q_w r_v, q_wr_w - \langle q_v, r_v \rangle)$
- Konjugierte eines Quaternions: $\overline{q} = \overline{(q_v, q_w)} = (-q_v, q_w)$
- Norm (Betrag) eines Quaternions: $|q| = \sqrt{\langle q_v, q_v \rangle + q_w^2} = \sqrt{q_x^2 + q_y^2 + q_z^2 + q_w^2}$
- Inverse zu einem Quaternion: $q^{-1} = \frac{1}{|q|^2}\overline{q}$
- Identitätsquaternion: $I = (0, 1) = ((0, 0, 0), 1)$

## Einheitsquaternionen
Quaternionen mit einem Betrag von 1 heißen **Einheitsquaternionen**
- Sie sind abgeschlossen bezüglich der Addition und der Subtraktion
- Können jede 3D-Rotation repräsentieren

Sei $q$ ein Einheitsquaternion, so kann dies dargestellt werden als

$$q = (q_v, q_w) = (\sin \phi u_q, \cos \phi) = \sin \phi u_q + \cos \phi$$

Außerdem gilt

$$|q| = 1 \Leftrightarrow q^{-1} = \overline{q}$$

### Rotationen
Sei $p$ ein Punkte (bzw. Vektor), der in Quaternionendarstellung gegeben ist und sei $q = (\sin(\phi) u_q, \cos(\phi))$ mit Vektor $u_q$ der Länge 1
- dann repräsentiert das Quaternionenprodukt $qpq^{-1}$ die Rotation von $p$ um die Achse $u_q$ mit einem Rotationswinkel von $2 \phi$
- die Verkettung von Rotationen ist definiert als $r(qp\overline{q})\overline{r} = (rp) p \overline{rq} = c p \overline{c}$ mit einer Einheitsquaterionen $c$, die die verkette Rotation darstellt

> [!caution] Quaternion-Details nochmal anschauen

## Interpolation von Rotationen
Um zwischen zwei Rotationen $q_1$ und $q_2$ zu interpolieren, die als Einheitsquaternionen gegeben sind, wird zwischen deren Quaternionendarstellung interpoliert:

$$\text{Slerp}(q_1, q_2, t) = \frac{\sin((1 - t)\alpha)}{\sin \alpha} q_1 + \frac{\sin(t\alpha)}{\sin \alpha} q_2, \quad t \in [0, 1], \quad \cos \alpha = \langle q_1, q_2 \rangle$$
