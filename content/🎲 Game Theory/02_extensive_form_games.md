---
title: Extensive Form Games
---
# Extensive Form Games
**Previously:** Simultaneous Play
- single decision
- simultaneously
- without knowledge of other's choices

**Now:** Sequential Play via Extensive Form Games
- possibly multiple decisions
- sequentially
- with knowledge of other's choices
- *capturing e.g. chess and Tic-Tac-Toe*

## Game Trees
Extensive Form Games can bei represented as game trees $G = (V, E)$
- **Leaves** correspond to **outcomes** and are labeled with player's payoffs in the outcome
- **Internal nodes** correspond to **decision nodes** and are labeled with the player who makes a decision (i.e. picks an edge) in this node
- **Edges** correspond to a player's **action** and a re labeled with the actions name
- **Notation** $V_i$ for the internal nodes of player $i$, $A_v$ for the actions available in vertex $v$

![[Screenshot from 2025-07-10 09-41-44.png|500]]

## Strategies
- A **pure strategy** $\tau_i$ for player $i$ is a function that maps each of $i$'s internal decision nodes $v \in V_i$ to an action available in $v$ (i.e. $\tau_i(v) \in A_v$)
- A **strategy profile** $\mathbf{\tau} = (\tau_1, \dots, \tau_n)$ induces a unique root leaf path in the tree leading to a unique outcome
- $u_i(\mathbf{\tau})$ is the **utility** player $i$ has for the outcome induced by $\mathbf{\tau}$

---
# Nash Equilibria
A strategy profile $\mathbf{\tau} = (\tau_1, \dots, \tau_n)$ is a **Nash equilibrium** if for every player $i \in \mathbb{N}$ and all of $i$'s strategies $\mathbf{\tau'}$:

$$u_i(\mathbf{\tau}) \geq u_i(\tau', \mathbf{\tau}_{-i})$$

*No player can modify the edges they select so that the induced root-leaf path leads to a leaf with a higher utility for the player*

## Backward Induction: Computing a Nash Equilibrium
*We fix "best responses" starting from the bottom of the tree*

**Algorithm:** Repeat until only root remains
- Pick a decision node $v \in V_i$ for some player $i$ whose successor are all leaves
- Let $a^* \in A_v$ be the action leading to the successor $v^*$ of $v$ with the highest utility for $i$
- Set $\tau(v) := a^*$. Delete all successors of $v$ and set $u_j(v) := u_j(v^*)$ for all player $j \in \mathbb{N}$

**Implications:**
- Backward induction always terminates in polynomial time
- The computed strategy profile is a Nash equilibrium
- Each extensive form game has a Nash equilibrium

## Subgame Perfect Nash Equilibrium
*Players will make rational decisions in every decision node*

- Each subtree in the game tree of an extensive form game $G$ defines a **subgame**
- A strategy profile $\mathbf{\tau} = (\tau_1, \dots, \tau_n)$ is a **subgame perfect Nash equilibrium** of a game $G$ if it induces a Nash equilibrium in each subgame $G'$ of $G$

**Observations:**
- Backward induction computes a SPNE
- Every extensive form game admits a SPNE
- Is every SPNE a NE? **✓**

---
# Extensive Form Games as Normale Form Games
Every extensive form game $G$ can be represented as a normal for game, where
- the strategy space $S_i$ for player $i$ is the set of $i$'s pure strategies in $G$
- $u_i(\tau_1, \dots, \tau_n)$ is the player $i$'s utility for the outcome in which player $i$ picks $\tau_i$ (for all $i \in \mathbb{N}$)

**Disadvantages:**
- *exponential blowup*
- some solution concepts and algorithms are specialized for extensive form games
