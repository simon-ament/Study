---
tags:
---
# Normal Form Game
A game in normal form $G = (N, S, (u_i)_{i \in \mathbb{N}})$ consists of
- a finite set $N = \{1, 2, \dots, n\}$ of **players**,
- a set $S$ of **strategies**, and
- **utility functions** $u_i: S^n \to \mathbb{R}$ mapping a strategy profile $(s_1, \dots, s_n) \in S^n$ to the utility $u_i(s_1, \dots, s_n)$ player $i$ incurs when player $j \in [n]$ plays strategy $s_j$

**Notation:**
- We call $\mathbf{s} = (s_1, \dots, s_n) \in S^n$ a strategy profile or outcome
- For player $i \in \mathbb{N}$, let $s', \mathbf{s}_{-i})$ be the strategy profile $\mathbf{s} \in S^n$ where player $i$ plays strategy $s' \in S$

**Goal:** Each player tries to maximize its utility

![[Screenshot from 2025-04-09 10-28-58.png|500]]

---
# Domination (Solution Concept)
For player $i$, a strategy $s' \in S$ **strictly dominates** strategy $s'' \in S$ if $i$ always gets a higher utility when playing $s'$ instead of $s''$:

$$u_i(s', \mathbf{s}_{-i}) > u_i(s'', \mathbf{s}_{-i}) \text{ for all profiles } \mathbf{s} \in S^n$$

For player $i$, a strategy $s' \in S$ **weakly dominates** strategy $s'' \in S$ if $i$ always gets at least as much utility when playing $s'$ instead of $s''$ and larger utility once:

$$u_i(s', \mathbf{s}_{-i}) \geq u_i(s'', \mathbf{s}_{-i}) \text{ for all profiles } \mathbf{s} \in S^n$$

$$u_i(s', \mathbf{s}_{-i}) > u_i(s'', \mathbf{s}_{-i}) \text{ for some profile } \mathbf{s} \in S^n$$

## Iterated Elimination of Weakly / Strictly Dominated Strategies
- If there is a weakly/strictly dominated strategy for some player in the current game, delete the strategy for the player.
- If only one strategy per player remains, return this strategy profile.

---
# Best Response (Solution Concept)
Given a strategy profile $\mathbf{s} \in S^n$, $s_i \in S$ is a **best response** for player $i$ if it maximizes $i$'s utility, i.e. for all $s' \in S$:

$$u_i(s_i, \mathbf{s}_{-i}) \geq u_i(s', \mathbf{s}_{-i})$$

## Nash Equilibrium
A strategy profile $\mathbf{s} = (s_1, \dots, s_n)$ is a **(pure) Nash Equilibrium** if for every player $i \in \mathbb{N}$ and for all $s' \in S$:

$$u_i(\mathbf{s}) \geq u_i(s', \mathbf{s}_{-i})$$

i.e. $s_i \in \mathrm{BR}_i(\mathbf{s})$

## Properties of Pure Nash Equilibria
- Can a game admit multiple pure Nash equilibria? **✓**
- Can players have different utilities in different pure Nash equilibria? **✓**
- Is a pure Nash equilibrium guaranteed to exist? **✗**
- Can players play a strictly dominated strategy in a pure Nash equilibrium? **✗**
	- No, as a strictly dominated strategy can never be a best response.
- Can players play a weakly dominated strategy in a pure Nash equilibrium? **✓**

---
# Mixed Strategies
A mixed strategy $\sigma: S \rightarrow [0, 1]$ is a probability distribution over pure strategies:

$$\sigma(s) \in [0,1] \text{ for all } s \in S \text{ and } \sum_{s \in S} \sigma(s) = 1$$

$\mathrm{supp}(\sigma) = \{s \in S | \sigma(s) > 0\}$: support of $\sigma$ | $\Delta(S)$: set of all mixed strategies

## Mixed Strategy Profile
In a mixed strategy profile $\mathbf{\sigma} = (\sigma_1, \dots, \sigma_n)$, the expected utility $\mathbb{E} u_i (\mathbf{\sigma})$ is

$$\mathbb{E}u_i(\mathbf{\sigma}) = \sum_{\mathbf{s} \in S^n}\left(\left( \prod_{j \in [n]} \sigma_j(s_j) \right) u_i(\mathbf{s})\right)$$

For a mixed strategy profile $\mathbf{\sigma}$ and a player $i \in \mathbb{N}$. let
- $(\sigma', \mathbf{\sigma}_{-i})$ be the mixed strategy profile $\mathbf{\sigma}$ where player $i$ plays mixed strategy $\sigma' \in \Delta(S)$
- $(s', \mathbf{\sigma}_{-i})$ be the mixed strategy profile $\mathbf{\sigma}$ where player $i$ plays the pure strategy $s \in S$ i.e. assigns support $1$ to strategy $s$ and no support to any other strategy

## Nash Equilibrium in Mixed Strategies
A mixed strategy profile $\mathbf{\sigma} = (\sigma_1, \dots, \sigma_n)$ is a mixed Nash equilibrium if for every player $i \in \mathbb{N}$:

$$\mathbb{E}u_i(\mathbf{\sigma}) \geq \mathbb{E}u_i(\sigma', \mathbf{\sigma}_{-i}) \text{ for all } \sigma' \in \Delta(S)$$

### Equivalent Definition 1
A mixed strategy profile $\mathbf{\sigma} = (\sigma_1, \dots, \sigma_n)$ is a mixed Nash equilibrium if for every player $i \in \mathbb{N}$:

$$u_i(\mathbf{\sigma}) \geq u_i(s, \mathbf{\sigma}_{-i}) \text{ for all } s \in S$$

### Equivalent Definition 2
A mixed strategy profile $\mathbf{\sigma} = (\sigma_1, \dots, \sigma_n)$ is a mixed Nash equilibrium if for every player $i \in \mathbb{N}$:

$$\sigma_i \in \mathrm{BR}(\mathbf{\sigma})$$

---
# The Indifference Principle
A mixed strategy profile $\mathbf{\sigma} = (\sigma_1, \dots, \sigma_n)$ is a mixed Nash equilibrium if and only if for all players $i \in \mathbb{N}$:

$$\mathbb{E}u_i(s, \mathbf{\sigma}_{-i}) = \mathbb{E}(s', \mathbf{\sigma}_{-i}) \text{ for all } s, s' \in \mathrm{supp}(\sigma_i)$$

$$\mathbb{E}u_i(s, \mathbf{\sigma}_{-i}) \geq \mathbb{E}u_i(s', \mathbf{\sigma}_{-i}) \text{ for all } s \in \mathrm{supp}(\sigma_i) \text{ and } s' \not\in \mathrm{supp}(\sigma_i)$$

**Best Response:** Distribute probability over strategies from $S' := \arg \max_{s \in S} \mathbb{E}u_i(s, \mathbf{\sigma}_{-i})$ (pure strategies leading to the highest expected utility for player $i$)

> [!info] Can be used to find mixed Nash equilibria by deliberately creating indifference for all players

---
# Nash's Theorem
Every (finite) game admits a mixed Nash equilibrium.

---
# Social Welfare
**(Utilitarian) social welfare:** Summed players' utility for outcome $sw(\mathbf{s}) = \sum_{i \in \mathbb{N}} u_i(\mathbf{s})$

> [!info] Social suboptimality can arise despite indiviual optimality.

---
# Atomic Routing Games
An (atomic) routing game constitutes of
- a **directed graph** $G = (V, E)$
- a **set of players** $N = \{1, \dots, n\}$ with a source $\alpha_i \in V$ and target $\beta_i \in V$ for each player
- for each edge $e \in E$, a nondecreasing **cost function** $c_e: \mathbb{R} \to \mathbb{R}_{\geq 0}$ mapping the number of player taking the edge to its cost

**Additional notation:**
- the **strategy space** $S_i$ for player $i$ is the set of all $\alpha_ \to \beta_i$ paths
- $n_e(\mathbf{s})$ is the **number of players** taking edge $e$ in profile $\mathbf{s}$
- the path $s_i = (e_1, \dots, e_k)$ taken by player $i$ in profile $\mathbf{s}$ incurs **cost** $\sum_{i \in [k]} c_e(n_{e_i}(\mathbf{s}))$
	- players aim to minimize the cost of their strategy
- the **social cost** $sc(\mathbf{s})$ of a strategy profile $\mathbf{s}$ is the summed cost over all players 

![[Screenshot from 2025-07-10 09-39-59.png|500]]

---
# Price of Selfishness
**Price of Anarchy:** Ratio between the social cost of the **worst** Nash equilibrium and the minimum achievable social cost

$$\mathrm{PoA} = \frac{\max_{\text{Nash profile }\mathbf{s}} sc(\mathbf{s})}{\min_{\text{profile }\mathbf{s}} sc(\mathbf{s})} \geq 1$$

**Price of Stability:** Ratio between the social cost of the **best** Nash equilibrium and the minimum achievable social cost

$$\mathrm{PoS} = \frac{\min_{\text{Nash profile }\mathbf{s}} sc(\mathbf{s})}{\min_{\text{profile }\mathbf{s}} sc(\mathbf{s})} \geq 1$$

*When reasoning about welfare instead of cost, the fractions reverse*

## Bound on the PoA
We only allow **Affine Routing Games**, i.e. all cost functions are of the form $c_e(x) = a_e \cdot x + b_e$
- For finite (atomic) routing games, the PoA is at most $\frac52$

Bounds on other classes:
- different players control different amounts of flow to be routed over one path: PoA $\approx 2.618$
- cost functions degree $p$ polynomial: PoA in $p^{\mathcal{O}(p)}$
- players can split their flow into arbitrarily small units: PoA $= \frac43$ (Bress paradox is worst case example)
