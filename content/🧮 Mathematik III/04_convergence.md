---
title: Konvergenzen
---
# Konvergenz
Gegeben eine Folge $(x_n)_{n \in \mathbb{N}}$ von Zahlen in $\mathbb{R}$, sagen wir, dass die Folge gegen eine Zahl $x$ konvergiert, $x_n \rightarrow x$, genau dann wenn für alle $\varepsilon > 0$ ein Index $N(\varepsilon)$ existiert, so dass

$$\forall j \geq N(\varepsilon): |x_j - x| < \varepsilon$$

## Stochastische Konvergenz
Gegeben sei eine Folge $(X_n)_{n \in \mathbb{N}}$ von reellen Zufallsvariablen und $X$ eine reelle Zufallsvariable auf einem Ereignisraum $(\Omega, \mathcal{F}, P)$.

### Konvergenz in Verteilung
$(X_n)_{n \in \mathbb{N}}$ konvergiert in Verteilung gegen $X$, $X_n \rightarrow^d X$, genau dann wenn für jedes $c \in \mathbb{R}$, bei welchem $F_X$ stetig ist, gilt, dass 

$$\lim F_{X_n}(c) = F_X(c)$$

### Konvergenz in Wahrscheinlichkeit
$(X_n)_{n \in \mathbb{N}}$ konvergiert in Wahrscheinlichkeit gegen $X$, $X_n \rightarrow^P X$, genau dann, wenn für jedes $\varepsilon > 0$ gilt, dass

$$\lim_{n \rightarrow \infty} P(|X_n - X| \geq \varepsilon) = 0$$

### Fast sichere Konvergenz
$(X_n)_{n \in \mathbb{N}}$ konvergiert fast sicher gegen $X$, $X_n \rightarrow^{f.s.} X$, genau dann, wenn gilt, dass

$$P(\{\omega \in \Omega | \lim_{n \rightarrow \infty} X_n(\omega) = X(\omega)\}) = 1$$
dies ist äquivalent dazu, dass für jedes $\varepsilon > 0$ gilt, dass

$$\lim_{n \rightarrow \infty} P(\max_{m \geq n} |X_m - X| > \varepsilon) = 0$$

> [!info] Implikation von oben nach unten (d $\Rightarrow$ P $\Rightarrow$ f.s.)

## Stabilitätseigenschaften
Für **fast sichere Konvergenz** und **Konvergenz in Wahrscheinlichkeit** folgt aus $X_n \rightarrow X$ und $Y_n \rightarrow Y$, dass

$$a \cdot X_n + b \cdot Y_n \rightarrow a \cdot X + b \cdot Y$$

sowie

$$X_n \cdot Y_n \rightarrow X \cdot Y$$

> [!caution] Gilt nicht für Konvergenz in Verteilung!

---
# Gesetz der großen Zahlen
## Schwaches Gesetz der großen Zahlen
Seien $(X_n)_{n \in \mathbb{N}}$ paarweise *unkorrelierte*, reelle Zufallsvariablen mit dem Erwartungswert $E[X_n] = m$ und Varianz $V[X_n] = v$ für alle $n \in \mathbb{N}$. Dann gilt

$$\frac1n \sum^n_{i=1}X_i \rightarrow^P m$$

## Starkes Gesetz der großen Zahlen
Seien $(X_n)_{n \in \mathbb{N}}$ paarweise unabhängige, identisch verteilte, reelle Zufallsvariablen mit dem Erwartungswert $E[X_n] = m$ für alle $n \in \mathbb{N}$. Dann gilt

$$\frac1n \sum^n_{i=1}X_i \rightarrow^{f.s.} m$$

---
# Zentraler Grenzwertsatz
Sei $(X_n)_{n \in \mathbb{N}}$ eine Folge von paarweise unabhängigen, identisch verteilten, reellen Zufallsvariablen mit Erwartungswert $E[X_i] = m$ und positiver Varianz $V[X_i] = v > 0$. Dann gilt

$$\overline{X}_n \rightarrow^d \mathcal{N}(m, \frac{v}{n})$$

wobei die asymptotische Verteilung des Mittelwerts $\overline{X}_n$ definiert ist als $\frac{1}{n} \sum^n_{i = 1}X_i$.

