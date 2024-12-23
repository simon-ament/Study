---
title: Parameterschätzung und Konfidenzintervalle
---
# Stichproben
## Mittelwert
Für eine Sequenz $x$ von Beobachtungen $x_1, \dots, x_n \in \mathbb{R}$ ist der Mittelwert $\overline{x}$ definiert als

$$\overline{x} = \frac1n \cdot \sum^n_{i=1} x_i$$

## Quantil
Für eine Sequenz $x$ von Beobachtungen $x_1, \dots, x_n \in \mathbb{R}$ und ein $p \in (0,1)$ bezeichnen wir die Beobachtung an der Position $[n \cdot p]$ nach Sortieren der Werte $x_1, \cdots x_n$ als $p$-Quantil.

## Median
Für eine Sequenz $x$ von Beobachtungen $x_1, \dots, x_n \in \mathbb{R}$ bezeichnen wir das $\frac12$-Quantil als Median $\widetilde{x}$ von $x$.

## Median Absolute Deviation - MAD
Für eine Sequenz $x$ von Beobachtungen $x_1, \dots, x_n \in \mathbb{R}$ ist die *median absolute deviation* (MAD) definiert als

$$\text{MAD} = \text{median}(|x_1 - \widetilde{x}|, |x_2 - \widetilde{x}|, \dots, |x_n - \widetilde{x}|)$$

## Empirische Varianz und Standardabweichung

$$V[x] = \frac1n \cdot \sum_{i=1}^n(x_i - \overline{x})^2$$

## Empirische Kovarianz und Korrelation

$$\mathrm{Cov}[x,y] = \frac1n \cdot \sum_{i=1}^n(x_i - \overline{x}) \cdot (y_i - \overline{y})$$

$$\mathrm{Corr}[x,y] = \frac{\mathrm{Cov}[x,y]}{\sqrt{V[x] \cdot V[y]}}$$

---
# Parametrisches Modell
Ein parametrisches Modell ist ein Tripel $(\Omega, \mathcal{F}, \{P_\theta | \theta \in \Theta\})$ bestehend aus einer Ergebnismenge $\Omega$, einem Ereignissystem $\mathcal{F}$ und einer Menge $\{P_\theta | \theta \in \Theta\}$ von Wahrscheinlichkeitsverteilungen $\Omega, \mathcal{F}$, die mit einer Indexmenge $\Theta \subset \mathbb{R}^d$ für ein $d \in \mathbb{N}$ indiziert. Man spricht von einem $d$-parametrigen Modell.

## Schätzer
Für ein parametrisches Modell heißt eine beliebige Zufallsvariable $T$ von $\Omega$ nach $\Theta$ ein Schätzer.
- der Schätzer ist auch eine Zufallsvariable (in Abhängigkeit von den Stichproben)

### Mittlerer Quadratischer Schätzfehler
Für ein parametrisches Modell und einen Schätzer $T: \Omega \rightarrow \Theta$ ist der mittlere quadratische Fehler (MSE) definiert als

$$\mathrm{MSE}[T; \theta] = E_{X \sim P_\theta}[(T(X) - \theta)^2]$$
### Verzerrungs-Varianz Zerlegung des Schätzfehlers
Für ein parametrisches Modell und einen Schätzer gilt für den mittleren quadratischen Schätzfehler (vorne Verzerrung / bias, hinten Varianz)

$$\mathrm{MSE}[T; \theta] = (\theta - E_{X \sim P_\theta}[T(X)])^2 + V_{X \sim P_\theta}[T(X)]$$

### Erwartungstreue eines Schätzers
Für ein parametrisches Modell und einen Schätzer ist der Schätzer erwartungstreu, wenn er eine Verzerrung von Null hat, d.h. für alle $\theta \in \Theta$ gilt:

$$E_{X \sim P_\theta}[T(X)] = \theta$$

## Verteilung von Schätzern
Der empirische Mittelwert einer Stichprobe $\overline{X}_n = \frac{1}{n} \sum_{i=1}^n X_i$ ist selbst eine Zufallsvariable. Nach dem [[04_convergence#Zentraler Grenzwertsatz|zentralen Grenzwertsatz]] gilt damit

$$\overline{X}_n \xrightarrow{d} \mathcal{N}(E[X], \frac{V[X]}{n})$$
### Verteilung von Schätzern bei Normalverteilung
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit $X_i \sim \mathcal{N}(\mu, \sigma^2)$ für alle $i = 1, \dots, n$. Dann sind der [[#Mittelwert]] $\overline{X}_n$ und die ==korrigierte Varianz== $\hat{V}[X_1, \dots, X_n]$ folgendermaßen verteilt

$$\overline{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \sim \mathcal{N}(\mu, \frac{\sigma^2}{n})$$

$$\frac{n-1}{\sigma^2} \cdot \hat {V}[X_1, \dots, X_n]) = \sum_{i=1}^n \frac{(X_i - \overline{X_n})^2}{\sigma^2} \sim \chi^2(n-1)$$

## Verteilung des empirischen normierten Mittelwertschätzers
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit $X_i \sim \mathcal{N}(\mu, \sigma^2)$ für alle $i = 1, \dots, n$. Dann ist der normierte Mittelwertschätzer $t$-verteilt mit $n - 1$ Freiheitsgraden:

$$\frac{\overline{X}_n - \mu}{\sqrt{\frac{\hat{V}[X_1, \dots, X_n]}{n}}} \sim t(n-1)$$

---
# Likelihood
Ist $(\Omega, \mathcal{F}, \{P_\theta | \theta \in \Theta\})$ ein parametrisches Model und und sei $x \in \Omega$ eine Stichprobe, so heißt die Funktion $\mathcal{L}: \Theta \times \Omega \rightarrow [0, + \infty)$ mit $\mathcal{L} = p_\theta (x)$ die zugehörige Likelihood, wobei $p_\theta$ die (Zähl)dichte von $P_\theta$ ist.
- Die Likelihood ist nicht normiert (summiert / integriert sich nicht zu 1) über $\theta$!

## Maximum Likelihood Schätzer
Ein Schätzer $T_{\mathrm{MLE}}: \Omega \rightarrow \Theta$ heißt ein Maximum Likelihood Schätzer wenn

$$T_{\mathrm{MLE}}(x) = \arg \max_{\theta \in \Theta} \mathcal{L}(\theta, x)$$

**Trick:** Bestimmte das Maximum des Logarithmus der Likelihood weil aus Produkten Summen werden, der Logarithmus monoton steigend ist und der Wertebereich numerisch besser in Gleitkommzahlen abzubilden ist.
- Die Nullstelle der ersten Ableitung der log-likelihood ist ein möglicher Kandidat
- Zur Überprüfung, dass es sich um ein Maximum handelt, muss noch die zweite Ableitung geprüft werden

### MLE der Bernoulliverteilung
Seien $X_1, \dots, X_n$ unabhängig und $X_i \sim \mathrm{Bern}(p)$. Dann ist der Maximum Likelihood Schätzer $T_\mathrm{MLE}$ für $p$ gegeben durch:

$$T_\mathrm{MLE} (X_1, \dots, X_n) = \frac1n \sum_{i=1}^n X_i$$

### MLE der Poissionverteilung
Seien $X_1, \dots, X_n$ unabhängig und $X_i \sim \mathrm{Pois}(\lambda)$. Dann ist der Maximum Likelihood Schätzer $T_\mathrm{MLE}$ für $\lambda$ gegeben durch:

$$T_\mathrm{MLE} (X_1, \dots, X_n) = \frac1n \sum_{i=1}^n X_i$$

### MLE der Exponentialverteilung
Seien $X_1, \dots, X_n$ unabhängig und $X_i \sim \mathcal{E}(\lambda)$. Dann ist der Maximum Likelihood Schätzer $T_\mathrm{MLE}$ für $\lambda$ gegeben durch:

$$T_\mathrm{MLE} (X_1, \dots, X_n) = \frac{n}{\sum^n_{i=1} X_i}$$

### MLE der Normalverteilung
Seien $X_1, \dots, X_n$ unabhängig und $X_i \sim \mathcal{N}(\mu, \sigma^2)$. Dann ist der Maximum Likelihood Schätzer $T_\mathrm{MLE}$ für $\mu$ gegeben durch:

$$T_\mathrm{MLE} (X_1, \dots, X_n) = \frac1n \sum_{i=1}^n X_i$$

### MLE der Varianz der Normalverteilung
Seien $X_1, \dots, X_n$ unabhängig und $X_i \sim \mathcal{N}(\mu, \sigma^2)$. Dann ist der Maximum Likelihood Schätzer $T_\mathrm{MLE}$ für $\sigma^2$ gegeben durch:

$$T_\mathrm{MLE} (X_1, \dots, X_n) = \frac1n \sum_{i=1}^n (X_i - \sigma)^2$$

- nicht erwartungstreu wie die ==korrigierte empirische Varianz==

---
# Method of Moments
## Momente einer Verteilung
Sei $X$ eine reelle Zufallsvariable. Dann heißt $E[X^k]$ das $k$-te Moment von $X, k \in \{0,1,2, \dots\}$. Gegeben eine Stichprobe $x_1, \dots, x_n$ ist das $k$-te empirische Moment definiert als

$$\frac1n \sum^n_{i = 1} x^k_i$$

## Method of Moments Schätzer
Sei $(\mathbb{R}^n, \mathcal{B}(\mathbb{R}^n), \{\prod^n_{i=1} P_\theta | \theta \in \Theta\})$ ein parametrisches Modell, das eine unabhängige und identische Verteilung $P_\theta$ annimmt. Ein Schätzer $T_{\mathrm{MomM},k}: \mathbb{R}^n \rightarrow \Theta$ heißt ein Method of Moments Schätzer, wenn er diejenige Verteilung berechnet, bei welcher das $k$-te Moment dem $k$-ten empirischen Moment entspricht:

$$T_{\mathrm{MomM},k}(x_1, \dots, x_n) \in \{\theta \in \Theta | E_{X \sim P_\theta}[X^k] = \frac1n \sum_{i=1}^n x^k_i\}$$

---
# Konfidenzintervall
Betrachte ein parametrisches Modell $(\Omega, \mathcal{F}, \{P_\theta | \theta \in \Theta\})$, eine Kenngrößenfunktion $t: \Theta \rightarrow \mathbb{R}$ und eine reelle Zahl $\alpha \in (0,1)$. Wir nennen die Abbildung $C_\alpha: \Omega \rightarrow \mathcal{B}(\mathbb{R})$ ein Konfidenzintervalll zum Irrtumsniveau $\alpha$ genau dann, wenn für alle $\theta \in \mathbb{R}$ gilt, dass

$$P_\theta(\{x \in \Omega | t(\theta) \notin C_\alpha(x)\}) \leq \alpha$$

- Wir bezeichen $1 - \alpha$ als das Konfidenzniveau
- $t$ ist bei ein-parametrigen Modellen oft die Identität und bei mehrparametrigen Modellen eine Projektion

## Konstruktion von Konfidenzintervallen
![[Unit10a - Konfidenzintervalle.pdf#page=9]]

# Konfidenzintervalle unter Normalverteilungsannehme
## Zweiseitiges Konfidenzintervall für den Erwartungswert
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit unbekanntem Erwartungswert $\mu$ und bekannter Varianz $\sigma^2$. Sei $z_\alpha$ das $\alpha$-Quantil der Standardnormalverteilung, d.h. $z_\alpha = \Phi^{-1}(\alpha)$. Dann ist das zweiseitige Konfidenzintervall für $\mu$ zum Konfidenzniveau $1 - \alpha$ gegeben durch

$$(\frac1n \sum_{i=1}^n X_i + z_\frac\alpha2 \cdot \frac\sigma{\sqrt{n}}, \frac1n \sum_{i=1}^n X_i - z_\frac\alpha2 \cdot \frac\sigma{\sqrt{n}})$$

## Einseitige Konfidenzintervalle für den Erwartungswert
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit unbekanntem Erwartungswert $\mu$ und bekannter Varianz $\sigma^2$. Sei $z_\alpha$ das $\alpha$-Quantil der Standardnormalverteilung, d.h. $z_\alpha = \Phi^{-1}(\alpha)$. Dann sind die folgenden Konfidenzintervalle für $\mu$ zum Konfidenzniveau $1 - \alpha$ gegeben durch

**Unteres Konfidenzintervall:**

$$(- \infty, \frac1n \sum_{i=1}^n X_i - z_\alpha \cdot \frac\sigma{\sqrt{n}})$$

**Oberes Konfidenzintervall:**

$$(\frac1n \sum_{i=1}^n X_i - z_{1-\alpha} \cdot \frac\sigma{\sqrt{n}}, +\infty)$$

## Konfidenzintervalle für den Erwartungswert ohne Varianz
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit unbekanntem Erwartungswert $\mu$ und **unbekannter** Varianz $\sigma^2$. Sei $\tau_{\alpha,n}$ das $\alpha$-Quantil der $t$-Verteilung mit $n$ Freiheitsgraden. Dann sind die folgenden Konfidenzintervalle für $\mu$ zum Konfidenzniveau $1 - \alpha$ gegeben durch

![[Unit10a - Konfidenzintervalle.pdf#page=17]]

## Konfidenzintervalle für die Varianz
Seien $X_1, \dots, X_n$ unabhängige normalverteilte Zufallsvariablen mit unbekanntem Erwartungswert $\mu$ und **unbekannter** Varianz $\sigma^2$. Sei $c_{\alpha,n}$ das $\alpha$-Quantil der $\chi^2$-Verteilung mit $n$ Freiheitsgraden. Sei $S^2_n = \widehat{V}[X_1, \dots, X_n]$. Dann sind die folgenden Konfidenzintervalle für $\mu$ zum Konfidenzniveau $1 - \alpha$ gegeben durch

![[Unit10a - Konfidenzintervalle.pdf#page=20]]

---
# Konfidenzintervalle
## Konstruktion von approximativen Konfidenzintervallen
- Wir nutzen Normalverteilungsapproximation der Summe (Bernoulli, Exponential, etc.)

Für $p \in [0,1]$, wähle via $Z_\frac\alpha2$ ein symmetrisches Intervall um $\frac{Y-E[Y]}{\sqrt{V[Y]}}$ mit Wahrscheinlichkeit $1 - \alpha$

$$P(z_\frac\alpha2 < \frac{Y- n \cdot p}{\sqrt{n \cdot p \cdot (1-p)}} < -z_\frac\alpha2) \approx 1 - \alpha$$

**Trick:** Für den Nenner benutzen wir den MLE (Maximum Likelihood Schätzer) von $p$ gegeben durch $\hat{p} = \frac Yn$. Durch Umformungen erhalten wir:

$$P(\hat{p} + z_\frac\alpha2 \cdot \sqrt\frac{\hat p \cdot (1 - \hat p)}n < p < \hat{p} - z_\frac\alpha2 \cdot \sqrt\frac{\hat p \cdot (1 - \hat p)}n) \approx 1 - \alpha$$

Größtes Konfidenzintervall bei $\hat p = 0.5$ $\Rightarrow$ Damit lässt sich benötigte Stichprobengröße für gegebene Konfidenz (Größe des Intervalls) berechnen

## Approximatives Konfidenzintervall für den Erwartungswert
- Wir treffen keine konkrete Verteilungsannahme

### Tschebyscheff-Ungleichung
Sei $X$ eine reelle Zufallsvariable mit Erwartungswert und Varianz. Dann gilt für alle $\lambda > 0$:

$$P(|X - E[X]| \geq \lambda \cdot \sqrt{V[X]}) \leq \frac1{\lambda^2} \Leftrightarrow P(|X - E[X]| \geq \lambda \cdot \sqrt{V[X]}) \geq 1 - \frac1{\lambda^2}$$

## Approximatives Konfidenzintervall für den Erwartungswert
Sei $(\Omega, \mathcal{F}, \{P_\theta | \theta \in \Theta\})$ ein parametrisches Modell mit $V_{P_\theta}[X] = v$ für alle $\theta \in \Theta$. Dann ist das folgende Intervall ein Konfidenzintervall zum Niveau $\alpha \in (0,1)$

$$C_\alpha(x) = [x - \sqrt\frac v\alpha, x + \sqrt\frac v\alpha]$$
