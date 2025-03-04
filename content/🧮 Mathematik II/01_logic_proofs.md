---
title: Logik und Beweise
---
# Logik
$A\rightarrow B \equiv \neg A \lor B$

Klausel: Disjunktion über Literale (pos. / neg.) <br>
KNF: Konjunktion von Disjunktionen

## Quantoren-Umformungen
Für jede Menge $X$: <br>
$(\exists x \in X: \varphi(x)) \wedge A \equiv \exists x \in X: (\varphi(x) \wedge A)$ <br>
$(\forall x \in X: \varphi(x)) \vee A \equiv \forall x \in X: (\varphi(x) \vee A)$

Für jede **nicht-leere** Menge $X$: <br>
$(\exists x \in X: \varphi(x)) \vee A \equiv \exists x \in X: (\varphi(x) \vee A)$ <br>
$(\forall x \in X: \varphi(x)) \wedge A \equiv \forall x \in X: (\varphi(x) \wedge A)$

## Begriffe
**Pränexform:** Quantoren nur zu Beginn

**Logische Äquivalenz:** gleiche Wahrheitswerte für alle Belegungen): $\varphi \equiv \psi$ 

---
# Beweisemethoden
## Beweis von Mengeninklusionen und Mengengleichheit
Seien $A$ und $B$ Mengen. Möchte man zeigen, dass $A \subseteq B$, so zeigt man $\forall a \in A: a \in B$. Man wählt sich also ein beliebiges aber festes $a \in A$ und zeigt dann, dass $a \in B$ auch gilt. Darüber kann man nun auch Mengengleichheit zeigen: Möchte man $A=B$ zeigen, so zeigt man $A \subseteq B \wedge B \subseteq A$, also zunächst $\forall a \in A: a \in B$ und danach $\forall a \in B: a \in A$.