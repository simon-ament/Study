---
title: Verteilungen
---
# Bernoulliverteilung
Experiment mit nur zwei Ausgängen:
- Erfolg: $X = 1$
- Misserfolg: $X = 0$

Für die Ergebnismenge $\Omega = \{0,1\}$ und einen Parameter (*Erfolgswahrscheinluchkeit*) $p \in [0, 1]$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathrm{Bern}(\cdot; p)$ als Bernoulliverteilung, falls gilt, dass

$$\mathrm{Bern}(1; p) = p$$

## Erwartungswert

$$E[X] = p$$

## Varianz

$$V[X] = p \cdot (1- p)$$

---
# Binomialverteilung
Es werden $n$ Bernoulli-Experimente hintereinander ausgeführt, wobei uns die Anzahl der Erfolge interessiert

Für zwei Parameter $n \in \mathbb{N}_+$ und $p \in [0,1]$ sowie die Ergebnismenge $\Omega = \{0, \dots, n\}$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathrm{Bin}(\cdot; n, p)$ als Binomialverteilung, falls für alle $k \in \Omega$ gilt, dass

$$\mathrm{Bin}(k;n,p) = \binom{n}{k} \cdot p^k \cdot (1-p)^{n-k}$$

## Erwartungswert

$$E[X] = n \cdot p$$

*Folgt aus Linearität des Erwartungswertes*

## Varianz

$$V[X] = n \cdot p \cdot (1-p)$$

*Folgt aus Unabhängigkeit der einzelnen Zufallsexperimente*

## Summe
Seien $X$ und $Y$ zwei binomialverteilte Zufallsvariablen mit $X \sim \mathrm{Bin}(n,p)$ und $Y \sim \mathrm{Bin}(m,p)$. Dann ist

$$X + Y \sim \mathrm{Bin}(n + m, p)$$

---
# Hypergeometrische Verteilung


---
# Poissonverteilung

> [!danger] Nachtragen

---
# Hypergeometrische Verteilung
## Erwartungswert
Sein $X$ eine hypergeometrisch-verteilte Zufallsvariable nach den Parametern $M$, $N$ und $n$. Dann hat $X$ den Erwartungswert 

$$E[X] = n \cdot \frac{M}{M+N}$$

## Varianz
Sein $X$ eine hypergeometrisch-verteilte Zufallsvariable nach den Parametern $M$, $N$ und $n$. Dann hat $X$ die Varianz

$$V[X] = n \cdot p \cdot (1-p) \cdot (1 - \frac{n-1}{N+M-1})$$

## Bedingte Binimialverteilung
Seien $X \sim \mathrm{Bin}(n,p)$ und $Y \sim \mathrm{Bin}(m,p)$ zwei unabhängige binomialverteilte Zufallsvariablen mit den Parametern $n, m$ und $p$. Dann gilt für die bedingte Wahrscheinlichkeit von $X$ gegeben, dass die Summe von $X$ und $Y$ eine feste Zahl $k = \{0, \dots, n + m\}$ ist

$$P(X = i | X+Y = k) = \mathrm{Hyp}(i;n,m,k)$$

---
# Poissonverteilung
Für einen Parameter $\lambda \in \mathbb{R}_+$ und die Ergebnismenge $\Omega = \mathbb{N}$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathrm{Pois}(\cdot; \lambda)$ als Poissonverteilung, falls für alle $k \in \Omega$ gilt, dass

$$\mathrm{Pois}(k; \lambda) = \frac{\lambda^k}{k!} \cdot \exp(-\lambda)$$

Wobei $\lambda = n \cdot p$ mit den Parametern $n$ und $p$ einer Binomialverteilung, deren Grenzwert wir für $n \rightarrow \infty$ bei konstantem $\lambda$ betrachten.

## Erwartungswert
$$E[X] = E[Y_\infty] = \lim_{n \rightarrow \infty} n \cdot p(n) = \lambda$$

$$V[X] = \lambda$$

*Herleitung der Varianz analog zu Erwartungswert*

## Summe
Seien $X_1 \sim \mathrm{Pois}(\lambda_1)$ und $X_2 \sim \mathrm{Pois}(\lambda_2)$ zwei unabhängige poissonverteilte Zufallsvariablen. Dann gilt

$$X_1 + X_2 \sim \mathrm{Pois}(\lambda_1 + \lambda_2)$$

---
# Gleichverteilung
Für zwei Zahlen $a, b \in \mathbb{R}$ mit $a < b$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathcal{U}(\cdot; a, b)$ auf dem Ereignisraum $(\mathbb{R}, \mathcal{B}(\mathbb{R}))$  als stetige Gleichverteilung, falls hierbei für alle $A \in \mathcal{B}(\mathbb{R})$ gilt, dass

$$\mathcal{U}(A; a, b) = \frac{1}{b-a} \cdot \int_A \mathbb{I}_{[a,b]}(x) dx$$

## Erwartungswert
Sei $X \sim \mathcal{U}(a,b)$ eine reelle Zufallsvariable. Dann hat $X$ den Erwartungswert

$$E[X] = \frac{a+b}{2}$$

## Varianz
Sei $X \sim \mathcal{U}(a,b)$ eine reelle Zufallsvariable. Dann hat $X$ die Varianz

$$V[X] = \frac{(b-a)^2}{12}$$

---
# Exponentialverteilung
Für einen Parameter $\lambda \in \mathbb{R}_+$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathcal{E}(\cdot; \lambda)$ auf dem Ereignisraum $(\mathbb{R}, \mathcal{B}(\mathbb{R}))$ als Exponentialverteilung, falls für alle $A \in \mathcal{B}(\mathbb{R})$ gilt, dass

$$\mathcal{E}(A; \lambda) = \int_A \lambda \cdot \exp(-\lambda \cdot x) \cdot \mathbb{I}_{[0, \infty)]} (x) dx$$

## Verteilungsfunktion
Sei $X \sim \mathcal{E}(\lambda)$ exponentialverteilt mit Parameter $\lambda$. Dann gilt für die Verteilungsfunktion

$$F(c) = P(X \leq c) = 1 - \exp(-\lambda \cdot c)$$

## Erwartungswert
Sei $X \sim \mathcal{E}(\lambda)$ eine reelle Zufallsvariable. Dann hat $X$ den Erwartungswert

$$E[X] = \frac{1}{\lambda}$$

## Varianz
Sei $X \sim \mathcal{E}(\lambda)$ eine reelle Zufallsvariable. Dann hat $X$ die Varianz

$$V[X] = \frac{1}{\lambda^2}$$

## Gedächtnislosigkeit
Die Wahrscheinlichkeitsverteilung $P$ einer reellen Zufallsvariablen $X$ ist gedächtnislos, falls für alle $s, t \in \mathbb{R}$ gilt, dass

$$P(X > s + t | X > s) = P(X > t)$$

Wenn $X \sim \mathcal{E}(\lambda)$ dann ist die Zufallsvariable gedächtnislos für alle $\lambda \in \mathbb{R}_+$.

## Verteilung des Minimums
Seien $X_1, \dots, X_n$ unabhängige reelle exponentialverteilte Zufallsvariablen mit $SX_i \sim \mathcal{E}(\lambda_i)$. Dann ist die Verteilung des Minimums von $X_1, \dots, X_n$ auch exponentialverteilt mit $\lambda = \sum^n_{i=1} \lambda_i$

$$P(\min(X_1, \dots, X_n) \leq c) = \mathcal{E}(c; \sum^n_{i=1} \lambda_i)$$

---
# Gammaverteilung
Für zwei Parameter $\alpha, \lambda \in \mathbb{R}_+$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\text{Gam}(\cdot; \alpha, \lambda)$ auf dem Ereignisraum $(\mathbb{R}, \mathcal{B}(\mathbb{R}))$ als Gammaverteilung, falls für alle $A \in \mathcal{B}(\mathbb{R})$ gilt, dass

$$\text{Gam}(A; \alpha, \lambda) = \frac{1}{\Gamma(\alpha)} \cdot \int_A \lambda \cdot \exp(- \lambda x)(\lambda x)^{\alpha - 1} \cdot \mathbb{I}_{[0, \infty)} (x) dx$$

## Erwartungswert
$$E[X] = \frac{\alpha}{\lambda}$$

## Varianz
$$V[X] = \frac{\alpha}{\lambda^2}$$

## Summe
Seien $X_1 \sim \text{Gam}(\alpha_1, \lambda)$ und $X_2 \sim \text{Gam}(\alpha_1, \lambda)$ zwei unabhängige reelle Zufallsvariablen. Dann gilt

$$X_1 + X_2 \sim \text{Gam}(\alpha_1 + \alpha_2, \lambda)$$

Da Exponentialverteilungen dem Spezialfall $\alpha = 1$ von Gammverteilungen entsprechen, folgt für $X_1 \sim \mathcal{E}(\lambda)$ und $X_2 \sim \mathcal{E}(\lambda)$ zwei unabhängige reelle Zufallsvariablen

$$X_1 + X_2 \sim \text{Gam}(2, \lambda)$$

---
# Normalverteilung
Für zwei Parameter $\mu \in \mathbb{R}$ und $\sigma^2 \in \mathbb{R}_+$ bezeichnen wir die Wahrscheinlichkeitsverteilung $\mathcal{N}(\cdot; \mu, \sigma^2)$ auf dem Ereignisraum $(\mathbb{R}, \mathcal{B}(\mathbb{R}))$ als Normalverteilung, falls für alle $A \in \mathcal{B}(\mathbb{R})$ gilt, dass

$$\mathcal{N}(A; \mu, \sigma^2) = \frac{1}{\sqrt{2 \cdot \pi \cdot \sigma^2}} \cdot \int_A \exp(- \frac12 \frac{(x - \mu)^2}{\sigma^2}) dx$$

## Lineartransformation normalverteilter Zufallsvariablen
Seien $a, b \in \mathbb{R}$ und $X \sim \mathcal{N}(\mu, \sigma^2)$ eine reelle Zufallsvariable. Dann gilt

$$a \cdot X + b \sim \mathcal{N}(a \mu + b, a^2 \sigma^2)$$

## Korollar Standardnormalverteilung
Sei eine reelle Zufallsvariable $X \sim \mathcal{N}(\mu, \sigma^2)$. Dann ist die Variable $Z \sim \mathcal{N}(0,1)$ standardnormalverteilt, wobei

$$Z = \frac{X - \mu}{\sigma}$$

## Verteilung
> [!danger] Nachtragen

## Erwartungswert
Eine reelle Zufallsvariable $X \sim \mathcal{N}(\mu, \sigma^2)$ hat den Erwartungswert

$$E[X] = \mu$$

*Dies folgt aus dem Erwartungswert $E[X] = 0$ für Verteilungen $X \sim \mathcal{N}(0, \sigma^2)$*

## Varianz
Eine reelle Zufallsvariable $X \sim \mathcal{N}(0,1)$ hat die Varianz

$$V[X] = \sigma^2$$

*Dies folgt aus der Varianz $V[X] = 1$ für Verteilungen $X \sim \mathcal{N}(0, 1)$*

## Summe von normalverteilten Zufallsvariablen
Seien $X_1 \sim \mathcal{N}(\mu_1, \sigma_1^2)$ und $X_2 \sim \mathcal{N}(\mu_2, \sigma_2^2)$ unabhängige reelle Zufallsvariablen. Dann gilt

$$X_1 + X_2 \sim \mathcal{N}(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$$

---
# $\chi^2$-Verteilung
Sei $n \in \mathbb{N}_+$ und seien $X_1, \dots, X_n$ unabhängige standardnormalverteilte Zufallsvariablen. Dann folgt die Zufallsvariable $Z = \sum_{i=1}^n X^2_i$ einer $\chi^2$-Verteilung mit $n$ Freiheitsgraden, auch als $\chi^2(n)$ bezeichnet. Für alle $A \in \mathcal{B}(\mathbb{R})$ gilt, dass

$$\chi^2(A;n) = \int_A \frac{1}{2^{\frac{n}{2}} \cdot \Gamma(\frac{n}{2})} \cdot x^{\frac{n}{2}-1} \cdot \exp(- \frac{x}{2}) \cdot \mathbb{I}_{[0, \infty)}(x) dx$$

- Spezialfall der Gammaverteilung mit $\alpha = \frac{n}{2}$ und $\lambda = \frac{1}{2}$

## Erwartungswert und Varianz
Sei $X \sim \chi^2(n)$ eine reelle Zufallsvariable. Dann gilt

$$E[X] = n$$

$$V[X] = 2n$$

## Summe von $\chi^2$-verteilten Zufallsvariablen
Seien $X_1 \sim \chi^2(n_1)$ und $X_2 \sim \chi^2(n_2)$ zwei unabhängige reelle Zufallsvariablen. Dann gilt

$$X_1 + X_2 \sim \chi^2(n_1 + n_2)$$

---
# $t$-Verteilung
Sei $Z \sim \mathcal{N}(0,1)$ und $Y \sim \chi^2(n)$. Dann folgt die reelle Zufallsvariable $X = Z / \sqrt{\frac{Y}{n}}$ einer $t$-Verteilung mit $n$ Freiheitsgraden. Für eine $t$-Verteilung mit $n$ Freiheitsgraden gilt für alle $A \in \mathcal{B}(\mathbb{R})$ dass

$$t(A;n) = \int_A \frac{\Gamma(\frac{n+1}{2})}{\sqrt{n \cdot \pi} \cdot \Gamma(\frac{n}{2})} \cdot (1 + \frac{x^2}{n})^{-\frac{n+1}{2}} dx$$

---
