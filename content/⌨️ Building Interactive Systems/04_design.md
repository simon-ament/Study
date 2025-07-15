---
title: Design Principles
---
# Design for assembly and manufacturing (DFMA)
the design of a product with the objective to ease the manufacturing of the parts and to ease their assembly​
- DFMA can costs millions of dollars
- commonly performed when producing 100,000s of units
- rough DFMA might already be worth it for 10s of units
- potential future DFMA automation might make it applicable to single units (e.g. 3D printing)

## Design for assembly (DFA)
1. design parts with self-fastening features​ (e.g. [[04_design#Press fit|press fit]] or [[04_design#Snap fit|snap fit]])
2. encourage **modular** design​ (e.g. battery packs)
3. eliminate over-constrain​
4. design for **component symmetry** for insertion​
	- avoids the necessity for assembly workers to reorient parts, thus assembles faster
5. consider **foolproof** design​
	- incapable of being assembled incorrectly​
6. design parts for handling​
7. design parts for insertion (e.g. [[04_design#Heat insertion|heat insertion]] oder [[04_design#Hole insertion|hole insertion]])
8. design parts with self-locating features

## Design for additive manufacturing
avoiding support material is one element of an emerging field called **design for additive manufacturing**
- e.g. linkages with openings in different directions (x and y axis)

## Top-down assembly
1. the assembly will be stable
2. eliminate the time to re-orient the assembly

---
# Techniques

## Press fit
under pressure, one part is forced into a slightly smaller hole in the other part
- avoids additional parts like screws and takes less time than glue

![[pressfit.jpg|300]]

## Snap fit
assembly method used to attach flexible parts​ by pushing the parts' interlocking components together


## Crush rib
small protruding features that deform to create friction when different components are pushed together, securing their position.
- used for example in Lego pieces

![[crushrib.png|300]]

## Living hinge
thin sections of plastic that connect two segments of a part and allow it to flex and bend

![[livinghinge1.jpg|300]]
![[livinghinge2.jpg|300]]

## Heat insertion
mounting a part by transferring heat​ from the heated part to the enclosing plastic part​

![[heatinsertion.jpg|300]]

## Hole insertion
inserting spring into hole requires trial and error​ $\Rightarrow$ slant (schräge Kante) guides spring

## Jig or fixture (aka custom tool)
custom-made tool used to control the location and/or motion of parts or other tools​
- e.g. casing of DualPanto
- typically separate and re-used

## Bolt (Maschinenschraube)
somewhat similar to a screw, but allows mounting a nut​ (Mutter)

![[bolt.jpg|300]]

## 3D printing
fused-deposition modeling​ melts plastic (ABS or PLA)​ and squeezes it through a thin nozzle
