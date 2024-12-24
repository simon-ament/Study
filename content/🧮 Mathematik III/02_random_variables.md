---
title: Zufallsvariablen
---

# Bedingte Wahrscheinlichkeit
Gegeben zwei Ereignisse $A, B$. Das Ereignis $B$ ist bereits eingetreten (**sicheres Ereignis**). Dadurch muss die Eintrittswahrscheinlichkeit von $A$ neu bewertet werden:
- $A$ kann nur noch eintreten, wenn $A \subseteq B$
- vor Neubewertung: **a priori**
- nach Neubewertung: **a posteriori**

Für einen Wahrscheinlichkeitsraum $(\Omega, \mathcal{F}, P)$ bezeichnen wir für alle $A, B \in \mathcal{F}$ mit $P(B) > 0$ die Wahrscheinlichkeit $P(A | B)$ als die bedingte Wahrscheinlichkeit von $A$ unter der Bedingung $B$, wobei:

$$P(A | B) = \frac{P(A \cap B)}{P(B)}$$

**Zwei mögliche Interpretationen:**
1. Wahrscheinlichkeit von $A$, nachdem $B$ eingetreten ist
2. Anteil der Fälle, in denen $A$ eingetreten ist, unter der Gesamtheit der Fälle, in denen $B$ eingetreten ist, bei einem (häufig) wiederholten Zufallsexperiment

## Totale Wahrscheinlichkeit
**Satz der Totalen Wahrscheinlichkeit:** Sei $(\Omega, \mathcal{F}, P)$ ein Wahrscheinlichkeitsraum und $\Omega = \cup_{i \in I} B_i$ eine abzählbare Zerlegung von $\Omega$ in paarweise disjunkte Ereignisse $B_i$. Dann gilt für alle $A \in \mathcal{F}$:

$$P(A) = \sum_{i \in I} P(A \cap B_i) = \sum_{i \in I} P(A | B_i) \cdot P(B_i)$$

*Beweis über Axiom 2 sowie Definition der bedingten Wahrscheinlichkeit*

## 4-Felder-Tafel
Gegeben sind ein Wahrscheinlichkeitsraum $(\Omega, \mathcal{F}, P)$ sowie zwei Ereignisse $A, B \in \mathcal{F}$. Dann ist die 4-Felder-Tafel darstellbar als Tabelle von **Häufigkeiten oder Wahrscheinlichkeiten**.

|                | $A$                               | $\overline{A}$                               | Summe                      |
| -------------- | --------------------------------- | -------------------------------------------- | -------------------------- |
| $B$            | $\vert A \cap B \vert$            | $\vert \overline{A} \cap B \vert$            | $\vert B \vert$            |
| $\overline{B}$ | $\vert A \cap \overline{B} \vert$ | $\vert \overline{A} \cap \overline{B} \vert$ | $\vert \overline{B} \vert$ |
| Summe          | $\vert A \vert$                   | $\vert \overline{A} \vert$                   | $\vert \Omega \vert$       |

*Für Wahrscheinlichkeiten mit $P(\dots)$ für jeden Eintrag*

**Sensitivität:** Anteil der positiven Fälle, der als solcher erkannt wird \
**Spezifität:** Anteil der negativen Fälle, der als solcher erkannt wird

---
# Satz von Bayes
Sei $(\Omega, \mathcal{F}, P)$ ein Wahrscheinlichkeitsraum. Dann gilt für alle $A, B \in \mathcal{F}$ mit $P(A) > 0$ und $P(B) > 0$, dass

$$P(A | B) = \frac{P(A) \cdot P(B | A)}{P(B)}$$

*Herleitung über Definition der bedingten Wahrscheinlichkeit.*

> [!caution] Gut zu wissen
> Hiermit Berechnung von $P(A | B)$ aus $P(B | A)$ und umgekehrt.

---
# Stochastische Unabhängigkeit
Zwei Ereignisse $A, B \in \mathcal{F}$ in einem [[01_probability_spaces#Wahrscheinlichkeitsraum]] heißen stochastisch unabhängig, wenn $P(A | B) = P(A)$
- dann gilt auch $P(B | A) = P(B)$ | *folgt aus der Definition der bedingten Wahrscheinlichkeit*
- außerdem gilt dann $P(A \cap B) = P(A) \cdot P(B)$ | *folgt analog oder über den Satz von Bayes*

**Stochastische Unabhängigkeit mehrerer Ereignisse:** Eine Familie $F \subseteq \mathcal{F}$ von Ereignissen mit $F \neq \emptyset$ heißt stochastisch unabhängig, genau dann, wenn für jede endliche Teilfamilie $E \subseteq F$ mit $E \neq \emptyset$ gilt, dass:

$$P(\bigcap_{M \in E} M) = \prod_{M\in E} P(M)$$

- stochastische Unabhängigkeit bleibt in Teilmengen erhalten
- stochastische Unabhängigkeit ist symmetrisch
- zwei Ereignisse mit je positiver Wahrscheinlichkeit und leerer Schnittmenge sind stets stochastisch unabhängig

---
# Mehrstufige Modelle
Mit $P_{k | \omega_1, \dots, \omega_n-1}(\{\omega_n\})$ bezeichnen wir die Wahrscheinlichkeitsverteilung für das $k$-te Teilexperiment, wobei die Ergebnisse $\omega_1, \dots, \omega_{k-1}$ bereits bekannt sind.

**Gesamtwahrscheinlichkeit in mehrstufigen Modellen:**
Gegeben ein mehrstufiges Modell aus $n$ Teilexperimenten mit Ergebnismenge $\Omega$ und Ereignissystem $\mathcal{F} = \mathcal{P}(\Omega)$. Dann gilt, dass die Wahrscheinlichkeitsverteilung $P$ für das Gesamtexperiment eindeutig beschreiben werden kann, für alle $1 \leq k \leq n$, für jedes Ergebnis $\omega = (\omega_1, \dots, \omega_n)$ mit:

$$P(\{\omega\}) = \prod^n_{k=1} P_{k|w_1, \dots, w_{k-1}}(\{\omega_k\}) = P_1(\{\omega_1\}) \cdot P_{2|\omega_1}(\{\omega_2\}) \cdot \dots \cdot P_{n|\omega_1, \dots, \omega_{n-1}}(\{\omega_n\}) $$

## Multiplikationsformel
Sei $(\Omega, \mathcal{F}, P)$ ein Wahrscheinlichkeitsraum und $A_1, \cdots, A_n \in \mathcal{F}$ Ereignisse. Dann gilt:

$$P (\bigcap^n_{k=1}A_k) = \prod^n_{k=1} P(A_k|\cap^{k-1}_{l=1} A_l)$$
---
# Zufallsvariablen
$X: \Omega_1 \rightarrow \Omega_2$ z.B. $X: \omega = (n_1, n_2) \mapsto n_1 + n_2$ \
$X^{-1}: \Omega \rightarrow \mathcal{P}(\Omega_1)$ z.B. $X^{-1}: i \mapsto \{(n_1, n_2) | n_1 + n_2 = i\}$ \
$P(X = i) = P(X^{-1}(i))$

## Definition
Wir nennen die Funktion $X: \Omega_1 \rightarrow \Omega_2$ eine Zufallsvariable, wenn für jedes Ereignis $A \in \mathcal{F}_2$ gilt, dass $X^{-1}(A) \in \mathcal{F}_1$, das heißt wenn $X$ messbar ist.

## Diskrete und reelle Zufallsvariablen
Wenn $\Omega_2$ endlich oder abzählbar unendlich ist, so bezeichnen wir $X$ als diskrete Zufallsvariable. Wenn $\Omega_2 = \mathbb{R}$, so bezeichnen wir $X$ als stetige oder reelle Zufallsvariable.

## Verteilung
Gegeben zwei Wahrscheinlichkeitsräume $(\Omega, \mathcal{F}, P)$ und $(\Omega_X, \mathcal{F}_X, P_X)$ mit einer Zufallsvariable $X: \Omega \rightarrow \Omega_X$

> [!danger] Notationen nachtragen

Gilt für zwei Zufallsvariablen $X$ und $Y$, dass $P_X = P_Y$, so nennen wir $X$ und $Y$ identisch verteilt (*Achtung:* nicht gleichverteilt). Wir schreiben hierfür auch kurz $Y \sim Y$.
- bei $X=Y$ gilt stets $P_X = P_Y$, aber nicht umgekehrt

---
# Dichte und Zähldichte
Eine Zähldichte / Gewichtung ist eine Funktion $p: \Omega \Rightarrow [0,1]$ mit $\sum_{\omega \in \Omega}p(\omega) = 1$ ($p$ ist *normiert*).

Bei stetigen Zufallsvariablen verwendet man die Borelalgebra ($\{(a, b] | a, b \in \mathbb{R} \land a \neq b\}$) als Ereignissystem.

> [!danger] Dichte nachtragen

---
# Verteilungsfunktion

> [!danger] Nachtragen

Verteilungsfunktion ist Stammfunktion der Dichte | Dichte ist Ableitung (Differentialfunktion) der Verteilungsfunktions (nur eine von vielen möglichen)

---
# Transformation von Zufallsvariablen
Gegeben eine Zufallsvariable $X$ mit Verteilung $P_X$ sowie eine Funktion $g: \mathbb{R} \rightarrow \mathbb{R}$. Dann wird durch Anwendung von $g$ auf den Wert von $X$ eine neue Zufallsvariable $Y$. Wir nennen $Y$ die Transformation von $X$ mit $g$.

Sie $X$ eine Zufallsvariable in einem Raum $(\Omega_X, \mathcal{F}_X, P_X)$. Gegeben die Transformation $Y$ von $X$ mit einer Funktion $g: \mathbb{R} \rightarrow \mathbb{R}$, wobei $g$ differenzierbar und strikt monoton wachsen oder fallend ist. Dann ist die Dichte $\mathcal{p}_Y$ von $Y$ gegeben durch

$$\mathcal{p}_Y(y) = \mathcal{p}_X(x) \cdot |\frac{dx}{dy}| = \mathcal{p}_X(x) \cdot |\frac{dg^{-1}(y)}{dy}|$$

wobei $y = g(x)$ und $x = g^{-1}(y)$ ist.

> [!danger] Beweis / Beispiele nachtragen

> [!danger] Erwartungswert nachtragen

---
# Varianz
Sei $X$ eine Zufallsvariable mit Erwartungswert $E[X]$. Dann definieren wir die Varianz $V[X]$ dieser Zufallsvariable als

$$V[X] = E[Y - E(X)^2]$$

Ferner definieren wir $\sqrt{V[X]}$ als Standardabweichung von $X$.

Nach dem **Varianzzerlegungssatz** gilt:

$$V[X] = E[X^2] - (E[X])^2$$

> [!caution] Sehr wichtig!

> [!danger] Rechenregeln nachtragen 

---
# Ungleichungen
Abschätzung einer Wahrscheinlichkeit oft mittels Erwartungswert und Varianz möglich.

## Markov-Ungleichung
Sei $X$ eine Zufallsvariable, welche nur positive Werte annehmen kann ($P(X \geq 0) = 1$). Dann gilt für alle $a > 0$:

$$P(X \geq a) \leq \frac{E[X]}{a}$$

## Tschebyscheff-Ungleichung
Sei $X$ eine reelle Zufallsvariable mit Erwartungswert und Varianz. Dann gilt für alle $k > 0$:

$$P(|X - E[X]| \geq k) \leq \frac{V[X]}{k^2}$$

---
# Mehrdimensionale Zufallsvariablen
**Gemeinsame Verteilung:** Seien $X$ und $Y$ Zufallsvariablen auf einem Raum $(\Omega, \mathcal{F}, P)$, wobei $X$ in den Raum $(\Omega_X, \mathcal{F}_X, P_X)$ und $Y$ in den Raum $(\Omega_Y, \mathcal{F}_Y, P_Y)$ abbildet. Dann ergibt sich eine eindeutige gemeinsame Verteilung $P_{X,Y}$ von $X$ und $Y$, wobei für beliebige $A_X \in \mathcal{F}_X$ und $A_Y \in \mathcal{F}_Y$ gilt:

$$P_{Y,X}()$$

> [!danger] Nachtragen

---
# Randverteilung

> [!danger] Nachtragen

---
# Unabhängigkeit von Zufallsvariablen
Seien $X$ und $Y$ Zufallsvariablen mit zugehörigen Bildräumen $(\Omega_X, \mathcal{F}_X)$ und $(\Omega_X, \mathcal{F}_X)$. Wir nennen $X$ und $Y$ unabhängig genau dann, wenn für alle $A_X \in \mathcal{F}_X$ und $A_Y \in \mathcal{F}_Y$ gilt, dass

$$P(X \in A_X \land Y \in A_Y) = P(X \in A_X) \cdot P(Y \in A_Y)$$

**Kriterien:**
- Für diskrete Räume sind $X$ und $Y$ genau dann unabhängig, wenn für alle $\omega_X \in \Omega_X$ und alle $\omega_Y \in \Omega_Y$ gilt. dass $P(X = \omega_X \land Y = \omega_Y) = P(X = \omega_X) \cdot P(Y = \omega_Y)$
- Für stetige reelle Räume sind $X$ und $Y$ genau dann unabhängig, wenn für alle $c_X, c_Y \in \mathbb{R}$ gilt, dass $P(X \leq c_X \land Y \leq c_Y) = P(X \leq c_X) \cdot P(Y \leq c_Y)$

---
# Produktverteilung

> [!danger] Nachtragen

---

> [!danger] Nachtragen

---
# Erwartungswert
Gegeben zwei reelle Zufallsvariablen $X$ und $Y$ und eine Funktion $g: \mathbb{R}^2 \rightarrow \mathbb{R}$. Dann ist der Erwartungswert von $g$ definiert als

$$E[g(X,Y)] = \sum_{x \in \Omega_X} \sum_{y \in \Omega_Y} g(x,y) \cdot p_{X,Y}(x,y) \text{ im diskreten Fall}$$

$$E[g(X,Y)] = \int_\mathbb{R} \int_\mathbb{R} g(x,y) \cdot p_{X,Y}(x,y) \ dxdy \text{ im stetigen Fall}$$

## Linearität des Erwartungswertes
Seien $X$ und $Y$ reelle Zufallsvariablen mit je einem existierenden Erwartungswert. Seien außerdem $a, b, c \in \mathbb{R}$. Dann gilt:

$$E[a \cdot X + b \cdot Y + c] = a \cdot E[X] + b \cdot E[Y] + c$$

*Beweis über Definition des Erwartungswertes*

> [!abstract] Unabhängigkeit nicht benötigt!

## Produktregel für Erwartungswert
Seien $X$ und $Y$ reelle Zufallsvariablen mit je einem existierenden Erwartungswert. Wenn $X$ und $Y$ unabhängig sind, dann gilt:

$$E[X \cdot Y] = E[X] \cdot E[Y]$$

*Beweis über Definition des Erwartungswertes und Unabhängigkeit*

---
# Kovarianz
Gegeben seien zwei reelle Zufallsvariablen $X$ und $Y$ mit jeweils existierendem Erwartungswert und Varianz. Die Kovarianz $\mathrm{Cov}[X,Y]$ zwischen $X$ und $Y$ ist dann gegeben als

$$\mathrm{Cov}[X,Y] = E[(X - E[X]) \cdot (Y - E[Y])]$$

> [!info] Negatives Vorzeichen, genau dann wenn Abweichung in verschiedene Richtungen (Vorzeichen)

## Interpretation
- **positives Vorzeichen:** mit höheren Werten von $X$ treten tendenziell höhere Werte für $Y$ auf (und umgekehrt)
- **negatives Vorzeichen:** mit höheren Werten von $X$ treten tendenziell niedrigere Werte für $Y$ auf (und umgekehrt)
- **gleich bzw. ungefähr 0:** keine erkennbare Tendenz für einen linearen Zusammenhang

## Kovarianzzerlegung
Für zwei reelle Zufallsvariablen $X$ und $Y$ gilt:

$$\mathrm{Cov}[X,Y] = E[X \cdot Y] - E[X] \cdot E[Y]$$

*Beweis über Definition der Kovarianz und Linearität des Erwartungswertes*

Insbesondere ist damit:

$$
\begin{align*}
\mathrm{Cov}[X,Y] &= \mathrm{Cov}[Y,X] \\
\mathrm{Cov}[X,X] &= \mathrm{Var}[X] \\
\end{align*}
$$

Für unabhängige $X$ und $Y$ folgt außerdem:

$$\mathrm{Cov}[X,Y] = 0$$
> [!caution] Die Umkehrung gilt im Allgemeinem nicht!

## Wertebereich
Der Wertebereich der Kovarianz ist abhängig von $X$ und $Y$ und beschränkt auf

$$[-\sqrt{V[X] \cdot V[Y]}, \ +\sqrt{V[X] \cdot V[Y]}]$$

*Beweis über [[#Varianz|Varianzzerlegungssatz]] auf $Z = (X - E[X]) \cdot (Y - E[Y])$*

## Rechenregeln
Seien $X$ und $Y$ zwei reelle Zufallsvariablen mit Erwartungswert und Varianz sowie $a, b, c, d \in \mathbb{R}$. Dann gilt:

$$\mathrm{Cov}[a \cdot X + b, c \cdot Y + d] = a \cdot c \cdot \mathrm{Cov}[X,Y]$$

*Beweis über die Linearität des Erwartungswertes*

## Kovarianz einer Summe
Seien $X_1, X_2$ und $Y$ drei reelle Zufallsvariablen mit Erwartungswert und Varianz. Dann gilt:

$$\mathrm{Cov}[X_1 + X_2, Y] = \mathrm{Cov}[X_1, Y] + \mathrm{Cov}[X_1,Y]$$

*Beweis über Linearität des Erwartungswertes*

## Linearität der Kovarianz
Seien $X_1, \dots, X_n$ und $Y_1, \dots, Y_m$ reelle Zufallsvariablen mit Erwartungswert und Varianz. Dann gilt:

$$\mathrm{Cov}[\sum_{i=1}^{n}X_i, \sum_{j=1}^m] = \sum_{i=1}^n \sum_{j=1}^m \mathrm{Cov}[X_i, Y_j]$$

*Beweis über Kovarianz einer Summe*

## Varianz der Summe
Gegeben eine Folge von $n$ reellen Zufallsvariablen $X_i$ mit $1 \leq i \leq n$ mit Erwartungswert und Varianz. Dann gilt:

$$V[\sum_{i=1}^n X_i] = \sum_{i=1}^n V[X_i] + \sum_{i=1}^n \sum_{j=1 \land j \neq i}^n \mathrm{Cov}[X_i, X_j]$$

Im Spezialfall zweier reeller Zufallsvariablen $X$ und $Y$ gilt:

$$V[X + Y] = V[X] + V[Y] + 2 \cdot \mathrm{Cov}[X, Y]$$

---
# Korrelation
Gegeben zwei reelle Zufallsvariablen $X$ und $Y$ mit Erwartungswerten $E[X]$ und $E[Y]$ sowie Varianzen $V[X]$ und $V[Y]$ ist die Korrelation zwischen $X$ und $Y$ gegeben als

$$\mathrm{Corr}[X,Y] = \frac{\mathrm{Cov}[X,Y]}{\sqrt{V[X] \cdot V[Y]}}$$

## Interpretation
- **nahe an 1:** stärkerer positiver linearer Zusammenhang zwischen $X$ und $Y$
- **nahe an -1:** stärkerer negativer linearer Zusammenhang zwischen $X$ und $Y$
- **nahe an 0:** kein erkennbarer linearer Zusammenhang zwischen $X$ und $Y$

