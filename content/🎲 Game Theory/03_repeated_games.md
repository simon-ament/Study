---
title: Repeated Games
---
# T-Repeated Game
*A normal form game $G$ is player multiple times*

**Setting:**
- Normal form game $G$ is called the **stage game** and gets played at each of $T$ stages
- In a stage, all players pick their actions simultaneously, knowing the actions played by all payers so far and the number of remaining stages

**Strategies:**
- Let $H^t$ be the set of all length-$t$ histories (i.e. the strategy profiles played in the last $t$ stages)
- A strategy for a player maps a history (from $\bigcup_{1 \leq t \leq T} H^t$) to an action

If the stage game $G$ has a unique Nash equilibrium, the only SPNE is playing $G$'s Nash equilibrium in every stage

## Nash Equilibria
A strategy profile $\mathbf{\tau} = (\tau_1, \dots, \tau_n)$ is a Nash equilibrium if for every player $i \in \mathbb{N}$:

$$u_i(\mathbf{\tau}) \geq u_i(\tau', \mathbf{\tau}_{-i}) \text{ for all functions } \tau': \cup_{0 \leq t \leq T - 1} H^t \to S$$

## Subgame Perfect Nash Equilibrium
A strategy profile $\mathbf{\tau} = (\tau_1, \dots, \tau_n)$ is a subgame perfect Nash equillibrium if for every player $i \in \mathbb{N}$ 

==missing==

## Adding Dominated Strategies

Adding a dominated strategy changes equilibria: **Threatening** can lead to new Nash equilibria, more desirable for everyone

![[Screenshot from 2025-07-10 09-53-44.png|700]]

---
# Infinite Games
*Instead of playing the stage game only for a known, finite number of times, we play it infinitely often*

**Relevant Scenarios:**
- Number of stages is unknown
- Players cannot distinguish between stages
- At every stage, players believe game continues for several more stages

**Utility:**
- Let $u_{i, t}$ be the utility of player $i$ in step $t$
- Parameterized by some discount factor $0 < \lambda < 1$, players aim to maximize their discounted average reward, i.e. $\sum_{t=1}^\infty \lambda^{t-1} u_{i,t}$

**Strategies:**
- Recall $H^t$ is the set of all length-$t$ histories
- A strategy for a player maps all finite histories (from $\bigcup_{t \geq 1} H^t$) to an action

---
# Automata Strategies
A (strategy) automata is defined by
- a set $Q$ of states with an initial state $q_0 \in Q$
- a transition function $\delta: Q \times S^{n-1} \to Q$ and
- an output function $\gamma: Q \to S$

Strateg automata playing against each other will eventually enter a finite repeating sequence of outcomes, i.e., the produced sequence of profiles is:

$$\mathbf{s}^1, \dots \mathbf{s}^k, (\mathbf{s}^{k+1}, \dots, \mathbf{s}^{k+m})^*$$

where $\mathbf{s}^1, \dots \mathbf{s}^k$ is the initial string and $\mathbf{s}^{k+1}, \dots, \mathbf{s}^{k+m}$ the infinitely repeated period
- $\Rightarrow$ agent's aim to maximize their average utility in the period, i.e., $\frac1m \sum^m_{j = 1} u_i(\mathbf{s}^{k + j})$
