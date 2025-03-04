---
title: Funktionen und Relationen
---
# Funktionen
Wenn $f, g$ injektiv, dann $g \circ f$ injektiv. Analog surjektiv, bijektiv.

$f$ injektiv $\Leftrightarrow$ es gibt Rechtsinverses (im Allgemeinen nicht eindeutig) $g: B \rightarrow A$ mit $g(f(a))=a$ für alle $a \in A$
Analog surjektiv mit Linksinversem.
$f$ bijektiv $\Rightarrow$ genau ein Rechtsinverses, das zugleich einziges linksinverses ist

---
# Relationen
## Ordnungsrelation
- Reflexivität: $\forall a \in A: a \preceq a$
- Antisymmetrie: $\forall a,b \in A: a \preceq b \land b \preceq a \Rightarrow a=b$
- Transitivität: $\forall a,b,c \in A: a \preceq b \land b \preceq c \Rightarrow a \preceq c$
- (total): $\forall a,b \in A: a \preceq b \lor b \preceq a$
## Äquivalenzrelation
- Symmetrie: $\forall a,b \in A: a \equiv b \Rightarrow b \equiv a$