---
title: Hashen
---
Mithilfe einer Hashfunktion $h : U \rightarrow \{0, \dots, M-1\}$ kann für einen Schlüssel $s \in U$ eine Speicheradresse $h(s)$ in einem Array $A$ berechnet werden und der Wert dann an der Stelle $A[h(s)]$ gespeichert werden.
- **Problem:** Balance zwischen Speicherplatz und Komplexität der Suche

---
# Eigenschaften
- Jedes Paar $s_1, s_2 \in U$ mit $s_1 \neq s_2$ und $h(s_1) = h(s_2)$ ist eine **Kollision**
- $h$ ist **perfekt**, falls sie niemals Kollisionen verursacht
- $h$ ist **gleichverteilt** ("ideal") falls $P(h(k) = i) = \frac{1}{M}$ für alle $i \in \{0, \dots, M-1\}$
- $h$ ist **ordnungserhaltend** genau dann wenn $s_1 < s_2 \Rightarrow h(s_1) < h(s_2)$
- Hashfunktionen sollten **effizient berechenbar** sein
- Hashfunktionen sollten **speichereffizient** sein (𝑀 sollte so klein wie möglich sein)

---
# Hashfunktionen
## Modulares Hashing
Für $U \subseteq \mathbb{N}$ ist eine einfache und überraschend gute Hashfunktion $h_{\mathrm{mod-}M}(s) \coloneqq s \mod M$

In der Praxis hat eine Primzahl für $M$ weniger Kollisionen als eine Zweierpotenz bzw. jede zusammengesetzte Zahl für $M$.

## Multiplikativer Hash
**Idee:** Benutze eine rationale Zahl $a \in (0, 1)$, die eine lange Periodizität besitzt
- $h_{\text{mult}-M}(s) \coloneqq \lfloor M \cdot (s \cdot a - \lfloor s \cdot a\rfloor)\rfloor$
- $s \cdot a - \lfloor s \cdot a\rfloor$ agiert als Pseudo-Zufallsgenerator in $(0,1)$.

**Häufig verwendet:** Goldener Schnitt $= \frac{\sqrt{5}-1}{2}$.

## Hashfunktionen für Zeichenketten
- Summe der ASCII- oder Uni-Codes (Achtung: Kollisionen)
- Gewichtung nach Position in der Zeichenkette (im Prinzip Stelllenwertsystem)
- **Zobrist-Hash:** Wenn Zeichenketten gleich lang, generiere Zufallscode $z_{c,i}$ für jede einzelne Kombination aus Zeichen $c$ und Position $i$ und berechne dann XOR aus den vorhandenen Codes:
	- $h_{\mathrm{zobrist}}(s) := z_{s_0, 0} \oplus z_{s_1, 1} \oplus \dots \oplus z_{s_k, k}$
	- Wird in Computerbrettspielen benutzt, um die Stellung mit 64-bit zu speichern

---
# Kollisionen
- keine Ausnahme, sondern die Regel (siehe Geburtstagsparadoxon)

## Verfahren zur Kollisionsbehandlung
**Overflow Hashing / chaining:** Kollisionen werden außerhalb vom Feld gespeichert (verkettete Listen)
- Separate Verkettung (separate chaining): in `A[i]` steht ein Tupel `(k, p)` aus initialem Schlüssel und einem Pointer auf die Liste, der kollidierenden Schlüssel
	- sinnvoll bei wenigen Kollisionen / kleinen Schlüsseln
- Direkte Verkettung (sequential chaining): in `A[i]` steht immer ein Pointer auf eine Liste aller Schlüssel
	- sinnvoll bei häufigen Kollisionen

**Closed Hashing / probing:**  Kollisionen werden innerhalb vom Feld gespeichert \
**Dynamisches Hashing:** Kollisionen werden innerhalb vom Feld gespeichert, welches seine Größe verändern kann

## Lineares Sondieren
Kein zusätzlicher Speicher soll benutzt werden

**Idee:** verwende nächste freie Stellen in Hashtabelle
- *Achtung:* beim Löschen muss spezielles Symbol hinterlassen werden, damit über die nun leere Stelle hinaus gesucht werden kann

---
# Bloom-Filter
- Ziel ist nicht, den Wert zum Schlüssel zu finden, sondern nur zu prüfen, ob dieser Schlüssel enthalten ist. (Liste $S$ aus $|S| = n$ Wörtern)
- **Idee:** Baue Hashtabelle $A \in \{0,1\}$ und nutze $A$ um zu markieren, ob ein Schlüssel in $S$ ist oder nicht.
	- 0: nicht enthalten (logisch abgesichert)
	- 1: enthalten (logisch nicht abgesichert, aufgrund von Kollisionen)
- **Verbesserung:** Die Verwendung mehrerer unabhängiger, gleichverteilter Hashfunktionen $h_1, \dots, h_j$ mit gleicher Eingabe und auf demselben $\{0,1\}$-Array verringert die Wahrscheinlichkeit zufälliger Kollisionen
	- nicht enthalten, wenn mindestens eine $A[h_{j'}(s)] = 0$
	- verbleibende falsch-positiv-Rate: approximativ $P(\text{false positive}) = (1 - \exp(-j \alpha))^j$ mit Füllrate $\alpha$
	- $\Rightarrow$ nicht zu viele Hashfunktionen, sonst zu viele $1$-Einträge und damit hohe falsch-positiv-Rate

