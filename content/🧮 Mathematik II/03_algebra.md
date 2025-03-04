---
title: Algebra
---
# Algebra
zweistellige Funktion $\diamond: A \times A \rightarrow B$
**Magma $(A,\diamond)$:** abgeschlossen: $\forall a,b \in A: a \diamond b \in A$
**Halbgruppe:** zusätzlich Assoziativität: $\forall a,b,c \in A: (a \diamond b) \diamond c = a \diamond (b \diamond c)$
**Monoid:** zusätzlich neutrales Element: $\forall a \in A: e \diamond a = a = a \diamond e$ (stets eindeutig)
**Gruppe:** zusätzlich inverses Element: $\forall a \in A \exists b \in A: a \diamond b = e$ (stets eindeutig)
**abelsche Gruppe:** zusätzlich Kommutativität: $\forall a,b \in A: a \diamond b = b \diamond a$

Wenn $a$ Inverses von $b$ dann auch umgekehrt also auch $(g^{-1})^{-1}=g$.
$(a \diamond b)^{-1} = b^{-1} \diamond a^{-1}$.

## Ringe und Körper
$(A,+,\cdot)$ ein _Ring_ falls $(A,+)$ eine kommutative Gruppe und $(A, \cdot)$ eine Halbgruppe, sowie
1. $\forall a,b,c \in A: (a+b)\cdot c = a\cdot c + b \cdot c$.
2. $\forall a,b,c \in A: a\cdot(b+c) = a\cdot b + a \cdot c$.

Zusätzlich $(A \setminus \{0\},\cdot)$ eine kommutative Gruppe dann, $(A,+,\cdot)$ ein _Körper_.

1. $\forall a \in R: 0a = 0 = a0$
2. $\forall a,b \in R: a(-b) = -(ab)$
3. $\forall a,b \in R: (-a)b = -(ab)$
4. $\forall a,b \in R: (-a)(-b) = ab$
5. Falls $(R,\cdot)$ neutrales Element $1$ hat, $\forall a \in R$, $-a = (-1)a$.

---
# Strukturen
## Unterstrukturen
Untergruppe $U \subseteq A$, wenn $(U, \diamond)$ Gruppe. Analog für andere Strukturen.
*Untermonoid* zusätzlich Übernahme des neutralen Elements.

Wenn $U$ Untergruppe von $A$ dann $e_A = e_U$. Gilt nicht für Untermonoide.

**Untergruppenkriterium:** $U$ ist Untergruppe von $G$ $\Leftrightarrow$ $U$ nicht-leer und $\forall a,b \in U: a \cdot b^{-1} \in U$.

## Homomorphismen und Isomorphismen
Homomorphismus: $f(a \diamond b) = f(a) \ast f(b)$ zwischen Magmen $(A,\diamond)$ und $(B,\ast)$.
Isomorphismen sind invertierbar und bleiben Isomorphismen

Für $(A,\diamond) \cong (B,\ast)$ isomorphe Magmen:
1. Falls $(A,\diamond)$ Halbgruppe / Monoid / Gruppe, dann auch $(B,\ast)$.
2. Falls $(A,\diamond)$ ein neutrales Element $e$ hat, so ist $f(e)$ ein neutrales Element in $(B,\ast)$.

---
# Zahlentheorie
## Modulo
 $a \mod m$ mit $m \in \mathbb{N}_+$ und $a \in \mathbb{Z}$ ist eindeutige Zahl $r \in \{0,…, m-1\}$ für die gilt $\exists x \in \mathbb{Z}: a = xm +r$

## Teilbarkeit
$m | z$ für $m,z \in \mathbb{Z}$ falls $\exists n \in \mathbb{Z}: mn = z$
$a \equiv_m b$ falls $m|(a-b)$
$m\mathbb{Z} = \{z \in \mathbb{Z} \mid m|z\} = \{0,m,-m,2m,-2m,…\}$

$a,m \in \mathbb{Z}$ _teilerfremd_ falls $\{x \in \mathbb{Z} \mid x |a  \land x | m\} = \{1,-1\}$
$a,m > 1$ teilerfremd $\Rightarrow$ $\exists b \in \mathbb{Z}$ so, dass $ab \equiv_m 1$

**Lemma von Euklid:** Seien $a,b$ und $m \in \mathbb{N}_+$ so, dass $a,m$ teilerfremd sind. Falls nun $m | ab$, so gilt $m|b$. Insbesondere gilt für alle $p$ Primzahlen und $a,b \in \mathbb{Z}$, dass falls $p | ab$, so $p | a$ oder $p | b$.
## Struktur
Sei $m \in \mathbb{N}_{\geq 2}$.
1. $(\mathbb{Z}_m,+_m)$ ist abelsche Gruppe
2. $m$ Primzahl $\Rightarrow$ $(\mathbb{Z}_m^*,\cdot_m)$ Gruppe
3. $(\mathbb{Z}_m,+_m,\cdot_m)$ ist Ring mit Monoid als multiplikativer Halbgruppe
4. $m$ Primzahl $\Rightarrow$ $(\mathbb{Z}_m,+_m,\cdot_m)$ Körper

---
# Gruppentheorie
## Endliche Gruppen
$(G,\cdot)$ endliche Gruppe:
1. Ordnung: $|G|$
2. $g^{-n} := (g^{-1})^n$
3. Erzeugte Untergruppe: $\langle g \rangle = \{g^i \mid i \in \mathbb{Z}\}$ ist $\subseteq$-kleinste Untergruppe von $G$, welche $g$ enthält + abelsch
4. Ordnung von $g$ in $G$: $|\langle g \rangle|$
5. G **zyklisch**, falls es $g \in G$ mit $\langle g \rangle = G$ gibt

Sei $(G,\cdot)$ eine endliche Gruppe, $g \in G$ und $k$ die Ordnung von $g$. Dann ist $\langle g \rangle = \{g^i \mid i \in \mathbb{N}\} = \{1,g,g^2,g^3,…,g^{k-1}\}$. Weiterhin gilt $g^{k-1} = g^{-1}$ und $k$ ist die kleinste positive natürliche Zahl mit $g^k=1$.

**Satz von Lagrange:** Sei $(G,\cdot)$ eine endliche Gruppe und $U \subseteq G$ eine Untergruppe. Dann teilt $|U|$ die Gruppenordnung $|G|$.

**Kleiner Satz von Fermat:** Sei $(G,\cdot)$ eine endliche Gruppe und $g \in G$. Dann ist $g^{|G|} = 1$.
Sei $G$ eine endliche Gruppe mit Ordnung $k \in \mathbb{N}$ und sei $g \in G$. Dann gilt $g^{-1} = g^{k-1}$.  
Sei $p$ eine Primzahl. Dann gilt für alle Zahlen $a \in \mathbb{Z}$, die nicht von $p$ geteilt werden, dass $a^{p-1} \equiv_p 1$.

## Polynome
Sei $(G,\cdot)$ eine Gruppe. Dann ist $r \in G$ eine Wurzel von $g \in G$, falls gilt $r^2 = g$. Wenn $R$ ein Ring und $g$ ein Element des Rings ist, kann man auch sagen: Alle Nullstellen des Polynoms $x^2-g$ sind Wurzeln von $g$.

Sei $R$ ein Ring. Ein _Polynom über $R$_ ist eine endliche Sequenz aus Koeffizienten $a_0,a_1,…,a_d \in R$ mit $a_d \neq 0$ (mit der Ausnahme falls $d=0$). Wir schreiben die Menge aller Polynome über $R$ als $R[X]$. Intuitiv steht diese Sequenz für die Polynomfunktion $x \mapsto \sum_{i=0}^d a_i x^i$, und wir schreiben auch $\sum_{i=0}^d a_i x^i$ für das Polynom $a_0,a_1,…,a_d$.

**Polynomprodukt:** Produkt von $a_0,a_1,…,a_d$ und $b_0,b_1,…,b_{d'}$ = $c_0, c_1, …, c_{d+d'}$ mit, für alle $n \leq d+d'$, $c_n = \sum_{i=0}^n a_i b_{n-i}$

$R$ Ring $\Rightarrow$ $(R[X],+,\cdot)$ Ring

**Nullstellensatz:** $K$ Körper und $p(x)$ ein Polynom über $K$. $a$ Nullstelle von $p(x)$ $\Leftrightarrow$ $(x-a)$ teilt $p(x)$. $p(x)$ höchstens grad$(p)$ Nullstellen.