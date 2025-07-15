---
title: DualPanto
---
A haptic device that might potentially enable blind users to interact
1. with 2D spatial contents
2. in real-time

**me handle:**
represents the user's avatar in 2D space

**it handle:**
represents one other moving object

## Pantograph
great compromise between low motor forces required (like in an **x/y table aka gantry**) and freedom of movement (like in a **robot arm**)
- 4 linkages $\rightarrow$ 1 end effector

Does not use gears in order to avoid [[03_physics#Slack / Backlash|slack]]
- alternatives: friction drive, capstan, archimedes drive, etc.
- chosen: **direct drive** with high amount of current (because of leverage)

---
# Dual Panto Projects
- **2D spatial:** 2D space must play a key role to succeeding at the task​ (tasks that aren't better solved using iPhone "voiceover")
- **real-time:** fast-paced app, more likely a game (**e.g. porting simple 80's games**)​, but stay within bandwidth of device/user (sparse world)​
	- alternatively **complex data (sensemaking):** let user explore the complex world, but then that world​ has to be stationary,​ to give user time to figure it out

## Right level of challenge (balancing)
**Push the boundaries** of what blind people can do​ (e.g., towards what a sighted person can do)​
- narrow down the app to a task (editing or sensemaking)
- simplify games (i.e. Tetris with 3 columns)

---
# Handle Tracking
- 14 bits digital encoder (absolute) meassures rotation of magnet
## Forward kinematics (FK)
Given joint angles and the length of linkages, calculate the position of end effector: $P_E = f(\theta_l, \theta_r)$
- angles $\theta_l$ and $\theta_r$ can be read from encoder
- lengths $l_{\mathrm{lower}}$ and $l_{\mathrm{upper}}$ are known
- positions $\mathrm{motor\_left}_{x,y}$ and $\mathrm{motor\_right}_{x,y}$ are known
- end effector position ($P_E$) can be calculated using **trigonometry / vector addition and rotation**

## Inverse kinematics (IK)
Given the target position, calculate the motor angles: $(\theta_l, \theta_r) = f^{-1} (P_E)$
- the angles can be calculated analogously to FK
- however, sometimes **multiple angle combinations** lead to the same $P_E$

## Iterative method
Mathematical procedure to generate a sequence of approximate, yet continuously improving solutions (removes ambiguities)
- make slight adjustments in $P_E$ until desired position is reached
	- e.g. both motors left $\Rightarrow$ end effector moves left
	- e.g. both motors inwards $\Rightarrow$ end effector moves outwards
	- etc.
- so far this model is ignorant of mass and inertia (Massenträgheit) $\Rightarrow$ oscillation | see [[06_hapkit|Hapkit]] controls
- therefore use force **proportional** to error $\Rightarrow$ no more oscillation, instead springy
- solution: implement [[06_hapkit#PID - differential control|PID controls]]

## Extra: p5.js vector syntax
```js
var vec = createVector(10, 5);
vec.normalize(); // normalizes to length 1
vec.rotate(PI); // rotates the vector by the specified angle
vec.mult(2); // multiplies each component of the vector by the specified value

var vec_length = vec.mag();
var vec2 = vec.copy(); // create a copy in JavaScript

var add_vec = p5.Vector.add(vec, vec2); // static method on the Vector class
var sub_vec = p5.Vector.sub(vec, vec2); // static method on the Vector class
```

---
# Rendering Walls
Because of high resolution encoder and quick reaction times, DualPanto only implements [[06_hapkit#P - proportional control|proportional control]] (trimmed like a really stiff spring)
## Springs
- spring: converts force into position
- torsion spring: converts **torque** (Drehmoment) into position $\Rightarrow$ torque sensor
- **hooke's law:** the force of a spring is proportional to the displacement with spring constant $k$

![[Pasted image 20240701195608.png]]

## God object
Into which direction should the hapkit push back, when a wall has been passed?
- **Unity me:** stays outside the wall
- **God object:** a proxy object which behaves as if the object were infinitely stiff $=$ ideal position of end effector (unity me follows handle)

### Tracking mechanism
- **On edge entry:** create a line segment from the previous to the current “me” position test against all edge in the scene. If it intersects then *activate* the edge.
- **Convex corners:** keep edge active, until god object outside of boundaries (length) of edge $\Rightarrow$ search for new active corner
- **Concave corners:** (optimization problem: **minimize** distance to active edge **such that** point is always on the edge)
	1. calculate three points: closest points on both edges and intersection point of the two edges
	2. remove any points, that are inside the wall
	3. choose the one that is closest to me handle

![[god.png|300]]
![[god2.png|300]]

### Motor output
We need some function
- **input:** desired force vector
- **output:** motor torques / voltages that produce those forces
- **solution:** inverse kinematics towards a target slightly (1mm) off the end effector
- **problem:** target further away from the motors $\Rightarrow$ longer levers $\Rightarrow$ less force applied

## Mesh map
- draw a map by rotating one motor while fixing the other
- knowing this mesh allows us to adjust motor power so as to compensate for variations in lever, thus get consistent haptic forces
- **challenge:** mesh is in motor torque $\theta_1$ and $\theta_2$, how to translate to $x$ and $y$ coordinates?

![[mesh.png]]

## Jacobian matrix
- a matrix of all first-order partial derivatives of a function 
	- used to map vectors (in our case **force vectors**) in one variable space to another
	- in our case: calculated for a **specific motor angle constellation** (position on the mesh map)
- $\Delta P = J \cdot \Delta \theta$ ($J$ is Jacobian matrix) and $F \cdot \Delta P = T \cdot \Delta \theta$ ($F$ is force and $T$ is torque)
	- that gives $F \cdot J = T$
	- Jacobian is vector map **and** Force-Torque map
- part of `panto.cpp` at dualpantoframework (firmware)​

![[jacobian.png]]
![[Pasted image 20240701212105.png|300]]

---
# DualPanto Capabilites
## Design choices
**User movement:**
1. freely in 2D space
2. along lines (what graph structure?)
3. 2D space on a grid (quad, hex, triangle, etc.)
4. 1D space with detents

**User choice making:**
1. no choices needed
2. speech input
3. mechanical GUI widget (e.g. switch)

**Me and it introduction:**
1. no need to explain
2. explanation upfront
3. synchronized movement with speech

**Handle choices:**
1. "me" and "it" handle
2. two "me" handles
3. two "it" handles

**More than two objects in the world:**
1. nope, just two things to deal with
2. "it" always jumps to the closest "it" object in the world
3. "it" jumps to the closest "it" when previously selected "it" dies
4. user can manually switch what "it" represents

---
# [[11_unity#DualPanto Toolkit|DualPanto Toolkit]] Capabilities
## General observations
- there exists some me-only and it-only space $\Rightarrow$ very uncommonly used

![[Pasted image 20240706133754.png|300]]

## Already implemented
**Rooms:**
- can be built using rectangles (with `PantoBoxCollider.cs`) as walls
- walls should overlap, to form solid corners
- to start the app, move me handle into room (using `MoveToPosition` [[11_unity#Toolkit Functions|toolkit function]])
- object placement:
	- along the walls
	- in the middle of the room $\Rightarrow$ use passable rails (`Rail.cs`) to guide user
- room shape:
	- convex
	- non-convex $\Rightarrow$ tracing the outline of the room is impossible (already for a simple L shape) | possible solutions using rails or grid movement
	- nooks and hallways $\Rightarrow$ hard to get a sense of

![[rooms.png]]

**GUI widgets:**
- sink using `CenterForceField.cs`
- hill using `CenterForceField.cs`
- dial using `PantoCircularCollider.cs`

**Information visualisation:**
- point at objects by rotating unity object of "me" / "it" handle

**Haptic feedback:**
- recoil (Rückstoß) using `MoveToPosition()`
- show velocity using recoil

![[recoil.png|300]]

## Currently being implemented
**Paths:**
- using `Path.cs` (WIP)
- can connect multiple rooms (instead of hallway)
- can provide a movement grid $\Rightarrow$ paths with bifurcations (Abzweigungen)

**GUI widgets:**
- dial with detents using `PantoCircularCollider.cs` and `CenterForceField.cs` or alternatively using `Path.cs` (WIP)
- slider using `PantoCircularCollider.cs` and `CenterForceField.cs`
- slider with detents using `PantoCircularCollider.cs` and `CenterForceField.cs`
- "taster" switch using `PantoCircularCollider.cs` and `CenterForceField.cs`
- bi-stable switch using `PantoCircularCollider.cs` and `CenterForceField.cs`
- gearshift using `PantoCompoundCollider.cs` and `Path.cs` (WIP)

![[gui.png]]

## Might be possible
**Haptic feedback:**
- pushing me handle to simulate a moving obstacle using `MoveToPosition()` | but impossible using `MovingObstacle`
