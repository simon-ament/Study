---
title: Geometrische Transformationen
---
# Skalarprodukt

![[cg1_2024_04_geometric_transformations.pdf#page=5]]

## Anwendungen
- **Längenmessung** eines Vektors
- **Winkelmessung** zwischen Vektoren
- **Orthogonalitätstests** von Vektoren
- **Orthogonale Projektion eines Vektors** auf einen anderen Vektor
- **Orthogonale Projektion eines Punktes** auf eine Ebene
- **Front-Facing-/Back-Facing-Test** für Polygone

---
# Kreuzprodukt
![[cg1_2024_04_geometric_transformations.pdf#page=14]]

## Anwendungen
- Berechnung von Oberflächennormalen für planare Polygone
- Berechnung des Flächeninhalts von Parallelogrammen
- Berechnung des Flächeninhalts von Dreiecken

---
# Affiner Raum
Punkte werden durch Vektoren beschrieben

---
# Homogene Koordinaten
- Translationen (Verschiebungen) sind keine linearen Abbildungen auf dem $\mathbb{R}^3$
- Homogene Koordinaten nutzen $4 \times 4$-Matrizen, um alle Basistransformationen als lineare Abbildungen darzustellen

$$H: \begin{pmatrix}x \\ y \\ z\end{pmatrix} \rightarrow \begin{pmatrix}x \\ y \\ z \\ 1\end{pmatrix}$$

$$H^{-1}: \begin{pmatrix}x \\ y \\ z \\ w\end{pmatrix} \rightarrow \begin{pmatrix}x / w \\ y / w \\ z / w\end{pmatrix}$$

*Anmerkungen:* Punkte mit $w=0$ liegen im Unendlichen. Der Punkt $(0, 0, 0, 0)$ ist nicht definiert.

# 3D-Basistransformationen

![[cg1_2024_04_geometric_transformations.pdf#page=23]]
bis Slide 37

---
# Begriffe
**Orthogonale Matrix:** Eine Matrix $A \in GL(n, \mathbb{R})$ heißt orthogonal, falls gilt $AA^T = E$ als $A^{-1} = A^T$.
- Jede Rotationsmatrix ist orthogonal

**Orthonormalbasis (ONB):** Eine Orthonormalbasis eines Vektorraums $V$ ist eine Basis, deren Vektoren alle die Länge 1 haben (normiert sind) und paarweise orthogonal sind, unterschiedliche Basisvektoren haben also das Skalarprodukt 0.
- Für beliebige $x,y \in \mathbb{R}^n$ und orthogonale Matrix $A$ gilt $\langle Ax. Ay \rangle = \langle x,y \rangle$, das heißt orthogonale Transformationen erhalten Längen und Winkel (*Rigid-Body-Transformation*)
- Eine orthogonale Matrix bildet eine ONB auf eine weitere ONB ab
- Eine Matrix, welche eine ONB auf eine weitere ONB abbildet, ist orthogonal

## Transformation gerichteter Liniensegemente
![[cg1_2024_04_geometric_transformations.pdf#page=41]]
bis Slide 49

---
# Eulersche Winkel
Erlauben die Spezifikation einer Orientierung, d. h. einer Winkellage, eines Objekts im Raum.
- Eigentliche Eulerwinkel: $\alpha, \beta$ und $\gamma$
- Drehung $R$ kann in drei Drehungen um die jeweiligen Achsen aufgeteilt

# Smooth step function
$$
f(x) = \begin{cases}
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
Jedes Quaternion bildet ein Quadrupel mit vier reellwertigen Koeffizienten:

$$q = (q_x, q_y, q_z, q_w)$$

> [!danger] Nachtragen

## Einheitsquaternionen
Quaternionen mit einem Betrag von 1 heißen **Einheitsquaternionen**
- Sie sind abgeschlossen bezüglich der Addition und der Subtraktion
- Können jede 3D-Rotation repräsentieren

Sei $q$ ein Einheitsquaternion, so kann dies dargestellt werden als

$$q = (q_v, q_w) = (\sin \phi u_q, \cos \phi) = \sin \phi u_q + \cos \phi$$

Außerdem gilt

$$|q| = 1 \Leftrightarrow q^{-1} = \overline{q}$$

## Interpolation von Rotationen
Um zwischen zwei Rotationen q1 und q2 zu interpolieren, die als Einheitsquaternionen gegeben sind, wird zwischen deren Quaternionendarstellung interpoliert:

$$\text{Slerp}(q_1, q_2, t) = \frac{\sin((1 - t)\alpha)}{\sin \alpha} q_1 + \frac{\sin(t\alpha)}{\sin \alpha} q_2, \quad t \in [0, 1], \quad \cos \alpha = \langle q_1, q_2 \rangle$$
