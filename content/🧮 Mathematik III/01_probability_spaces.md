---
title: Wahrscheinlichkeitsräume
---
# Zufallsexperimente
- fiktives Experiment zum Zwecke der Modellierung
- mehrere mögliche Ergebnisse (*outcomes*)
- Formale Beschreibung der Ergebnisse mit **Mengentheorie**

> [!info] Ergebnismenge
> Die **Menge aller möglichen Ausgänge** $\Omega \neq \emptyset$ eines Zufallsexperiments nennt man die Ergebnismenge (*sample space*).
> - Wird auch Ergebnisraum oder Stichprobenraum genannt
> - Ergebnisse $\omega \in \Omega$ werden auch Stichproben (*samples*) genannt
> - Ergebnisse müssen sich gegenseitig ausschließen
> - **Angemessene Ergebnismenge:** $\Omega$ sollte immer so klein wie möglich gewählt werden

> [!info] Ereignisse (*Events*)
> Ein Ereignis $A \subseteq \Omega$ ist eine **Teilmenge der Ergebnismenge** $\Omega$, d.h. eine gemeinsame Betrachtung eines oder mehrerer Ergebnisse.

---
# Darstellung
- **Venn-Diagramme:** Veranschaulichung von Mengenoperationen, indem einzelne Mengen als Kreise oder Ellipsen dargestellt werden.
	- Geometrische "Beweise" möglich
- **Punktwolkendiagramme:** Wenn das Zufallsexperiment in $\mathbb{N}^2$ liegt, kann man die Ergebnisse (*samples*) als Punkte in einem Koordinatensystem und Ereignisse als Punktwolken darstellen.

---
# Ereignissystem
Zuordnung von Wahrscheinlichkeiten zu den Ereignissen
- dazu darf es (maximal) **abzählbar unendlich** viele Ereignisse geben
- deshalb Beschränkung auf ein **Ereignissystem**

> [!info] Ereignissystem ($\sigma$-Algebra)
> Ein Ereignissystem $\mathcal{F}$ zur Ergebnismenge $\Omega$ ist eine Menge von Teilmengen von $\Omega$, wobei gilt
> 1. Abschluss unter sicherem Ereignis: $\Omega \in \mathcal{F}$
> 2. Abschluss unter Komplement: $\forall A \in \mathcal{F}: \overline{A} \in \mathcal{F}$ mit $\overline{A} := \Omega \setminus A$
> 3. Abschluss unter abzählbarer Vereinigung: $\forall A_1, A_2 \in \mathcal{F}: A_1 \cup A_2 \in \mathcal{F}$
> Wir bezeichnen $\Omega \in \mathcal{F}$ als das **sichere Ereignis** und $\emptyset \in \mathcal{F}$ als **unmögliches Ereignis**.

---
# Wahrscheinlichkeitsraum
Ein Wahrscheinlichkeitsraum ist ein Tripel $(\Omega, \mathcal{F}, P)$ bestehend aus:
1. einer Ergebnismenge $\Omega$
2. einem Ereignissystem $\mathcal{F}$
3. einer Wahrscheinlichkeitsverteilung $P: \mathcal{F} \rightarrow [0,1]$ mit folgenden drei Eigenschaften:
	1. **Nicht-Negativität:** Für alle $A \in \mathcal{F}: 0 \leq P(A) \leq 1$
	2. **$\sigma$-Additivität:** Für alle $A_1, A_2, \dots, A_n \in \mathcal{F}$ mit $A_i \cap A_j = \emptyset \Leftrightarrow i \neq j$ und $n \in \mathbb{N}$ gilt: $P(A_1 \cup A_2 \cup \dots \cup A_n) = P(A_1) + P(A_2) + \dots + P(A_n)$
	3. **Normierung:** $P(\Omega) = 1$

---
# Rechenregeln für Wahrscheinlichkeiten
**Wahrscheinlichkeit des Gegenereignisses:** Für alle $A \in \mathcal{F}$ gilt:

$$P(A) + P(\overline{A}) = 1$$

*Für alle $A \in \mathcal{F}$ gilt $A \cup \overline{A} = \Omega$ und $A \cap \overline{A} = \emptyset$. Nach Axiom 2 und 3 folgt $1 = P(\Omega) = P(A \cup \overline{A}) = P(A) + P(\overline{A})$.*

**Wahrscheinlichkeit der leeren Menge:**

$$P(\emptyset) = 0$$

*Folgt aus Obigem gemeinsam mit Axiom 3.*

**Endliche Additivität:** Für alle $A, B \in \mathcal{F}$ gilt:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

*Folgt mithilfe von [[#Darstellung|Venn-Diagrammen]] aus Axiom 2.*

**Monotonie:** Für alle $A, B \in \mathcal{F}$ gilt:

$$A \subseteq B \Rightarrow P(A) \leq P(B)$$

*Sei $C = B \setminus A$. Dann gilt $A \cap C = \emptyset$ und $B = A \cup C$. Aus Axiom 1 und 2 folgt $P(B) = P(A \cup C) = P(A) + P(C) \geq P(A)$*.

**Union Bound:** Für alle $A, B \in \mathcal{F}$ gilt:

$$P(A \cup B) \leq P(A) + P(B)$$

*Folgt direkt aus der **endlichen Additivität** und Axiom 1 für $P(A \cap B)$.*

---

# Gleichverteilung
> [!info] Laplace'sche Gleichverteilung
> Gegeben eine Ergebnismenge $\Omega$ ist die Gleichverteilung definiert als die Wahrscheinlichkeitsverteilung $P_{\text{naive}}$, bei der jedes Ergebnis die gleiche Wahrscheinlichkeit von $\frac{1}{|\Omega|}$ hat.
> - nur definiert für endliche Ergebnismengen $\Omega$
> - für jedes Ereignis $A \in \mathcal{F}$ gilt $P_{\text{naive}} (A) = \frac{|A|}{|\Omega|}$

**Zufallsgeneratoren im Computer:**
1. Physikalisch: Wir messen ein möglichst zufälliges physikalisches Phänomen wie z.B. Athmosphärisches Rauschen (Gewitter irgendwo auf der Welt), Thermisches Rauschen (Elektroschaltkreise), Kosmisches Rauschen, Radioaktive Strahlung
2. Algorithmisch: Pseudo-zufällige Sequenz, die deterministisch ist, aber sich erst nach vielen Beispielen wiederholt, also möglichst gleichverteilt ist
	1. **Lineare kongruente Generatoren**: $x_{n+1} = (a \cdot x_n + c) \mod m$
		- *seed* $x_0$
		- Multiplikator $a$
		- Inkrement $c$
		- Modulus $m$ z.B. Mersenne-Primzahl ($2^{32} - 1$)

---
# Counting Prinzip
Wenn $r$ Zufallsexperimente hintereinander ausgeführt werden und das erster Zufallsexperiment $n_1 = |\Omega_1|$ mögliche Ergebnisse hat und für jeden Ausgang des $k$-ten Zufallsexperiment das $k+1$-te Zufallsexperiment immer $n_{k+1} = |\Omega_{k+1}|$ mögliche Ergebnisse hat, dann haben die $r$ Zufallsexperimente $n_1 \cdot n_2 \cdot \dots \cdot n_r$ mögliche Ergebnisse.

---
# Kombinatorische Begriffe
## Permutation
Frage: Wie viele verschiedene Anordnungen gibt es für $n$ Objekte?

Antwort: $n!$

## Variation
Frage: Wie viele verschiedene Anordnungen gibt es, wenn $k$ Objekte von $n$ ausgewählt werden und die Reihenfolge einen Unterschied macht?

Antwort: $\frac{n!}{(n-k)!}$

## Kombination
Frage: Wie viele verschiedene Teilmengen der Größe $k$ aus einer Menge der Größe $n$ gibt es?

Antwort: $\frac{n!}{k! \cdot (n - k)!} = \binom{n}{k}$

---

# Numerische Approximation
Fakultätsfunktion wächst sehr schnell, aber Gleitkommadarstellung ist auf bis zu 380 Stellen begrenzt $\Rightarrow$ Wir speichern nur den **Logarithmus von Fakultäten**

> [!caution] Gut zu wissen
> $\log(a \cdot b) = \log(a) + \log(b)$\
> $\log(a^b) = b \cdot \log(a)$

**Stirlings Approximation:**

$$\log(n!) = n \cdot \log(n) - n + \mathcal{O}(\log(n))$$

*Herleitung über $\log(n!) = \log(1) + \log(2) + \dots + \log(n)$ und weiter $\int_{1}^{n} \log(x) dx$.*

**Korrolar:** Für alle $n \in \mathbb{N}$ und $k \in \mathbb{N}$ mit $k \leq n$ gilt die folgende Approximation:

$$\log(\binom{n}{k}) \approx n \cdot H(\frac{k}{n})$$

wobei

$$H(p) = -[p \cdot \log(p) + (1 - p) \cdot \log(1 - p)]$$
