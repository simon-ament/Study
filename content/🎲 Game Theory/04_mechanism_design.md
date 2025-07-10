---
title: Mechanism Design
---
**Mechanism Design:** How to design systems with strategic participants that have good performance guarantees?

# Single-Item Auctions
- There is a set $\{1, \dots, n\}$ of agents (or bidders)
- Each agent $i$ has a valuation $v_i$ for the good to be sold (only known to them)
- Each agent $i$ submits a bid $b_i$ to some auction mechanism
- Bids are called truth if $b_i = v_i$ for all $i \in [n]$
- We refer to a collection of bids $\mathbf{b} = (b_1, \dots, b_n)$ as a bidding profile

**Single-Item Auction Mechanism:** A single-item auction mechanism $f$ takes as input a bidding profile $\mathbf{b} = (b_1, \dots, b_n)$ and
1. **Allocation:** Decides on who gets the item
2. **Payment:** Sets a selling price $p$

**Utility:** Winning agent $i^*$ has utility $v_{i^*} - p$, all other agents have utility $0$

**Sealed-Bid Auctions:** Each agent $i$ privately communicates their bid $b_i$ to the mechanism

## First-Price Auction
Given a profile $\mathbf{b} = (b_1, \dots, b_n)$
- we assign the item to agent $i^* := \arg \max_{i \in [n]} b_i$ with the highest bid
- at the price of their bid $p := b_{i^*}$

## Second-Price Auction
Given a profile $\mathbf{b} = (b_1, \dots, b_n)$
- we assign the item to agent $i^* := \arg \max_{i \in [n]} b_i$ with the highest bid
- at the price of the second highest bid $p := \arg \max_{i \in [n] \setminus \{i^*\}} b_i$

## Desirable Properties
**Welfare Maximizing:** Assuming agents submit truthful bids, the mechanism assigns the item to the agent with the highest valuation.

**Strategyproofness:** A mechanism is strategyproof if submitting a truthful bid is a (weakly) dominating strategy for each agent $i \in [n]$:

$$u_i\left(f(v_i, \mathbf{b}_{-i})\right) \geq u_i\left(f(\mathbf{b})\right)$$

for all bidding profiles $\mathbf{b}$

- The first-price auction is not strategyproof
- The second-price auction is strategyproof

---
# Sponsored Search Auction
- Clickthrough rates (CTR): probability that users click on ad (depending on positioning)
- Every agent submits a single bid $b_i$, quantifying payment per click
- Utility of agent $i \in [n]$ for slot $j \in [k]$ at price $p_j$: $\alpha_j (v_i - p_j)$

![[Screenshot from 2025-07-10 09-55-32.png|500]]

## Generalized Second-Prize Auction
Given a bidding profile $\mathbf{b} = (b_1, \dots, b_n)$
- we assign the agent with the $i$ths highest bid to the $i$th slot
- at the price of the $i + 1$th highest bid per click

---
# Myerson's Lemma
## Setting
**Single-Parameter Environment:**
- Agents $\{1, \dots, n\}$ with valuation $v_i \in \mathbb{R}_{\geq 0}$ per unit each
- There is a feasible set $X \subseteq \mathbb{R}^n_{\geq 0}$ of allocations, where each element $(x_1, \dots, x_n) \in X$ encodes that $x_i$ units of the good are given to agent $i$

**Special Cases:**
- Single-Item Auction: $X$ contains all binary $n$-tuples with exactly one $1$
- Sponsored Search Auction: $X$ contains all permutations of $(\alpha_1 \cdot \alpha_k, 0, \dots, 0) \in \mathbb{R}^n_{\geq 0}$

**Blueprint for Auction Mechanism:**
Given a bidding profile $\mathbf{b} = (b_1, \dots, b_n)$:
- return an allocation $\mathbf{x}(\mathbf{b}) \in X$
- choose a payment $\mathbf{p}(\mathbf{b}) \in \mathbb{R}^n_{\geq 0}$
- Agent $i$ gets utility $v_i \cdot x_i(\mathbf{b}) - p_i(\mathbf{b})$
- Induces allocation rule $\mathbf{x}: \mathbb{R}^n_{\geq 0} \to X$ and payment rule $\mathbf{p}: \mathbb{R}^n_{\geq 0} \to \mathbb{R}^n_{\geq 0}$

## Definitions
An allocation rule $\mathbf{x}$ is implementable if there is a payment rule such that the resulting mechanism is strategyproof.

An allocation rule $\mathbf{x}$ is monotone if for every agent $i$ and bids $\mathbf{b}_{-i} \in \mathbb{R}^{n-1}_{\geq 0}$ the allocation $x_i(z, \mathbf{b}_{-i})$ to $i$ is nondecreasing in the bid $z$.

## Myerson's Lemma
In a single-parameter environment:
- An allocation rule $\mathbf{x}$ is implementable if and only if it is monotone
- If $\mathbf{x}$ is monotone, there is a unique payment rule that makes the mechanism strategyproof. This payment rule can be written as a closed-form expression.

## The Magical Payment Function
**Assumption:** $\mathbf{x}(z, \mathbf{b}_{-i})$ is piecewise constant

Myersons's Lemma tells us that player $i$ should pay $\sum_{j = 1}^l z_j \cdot t_j$ where $z_1, \dots, z_l$ are the breakpoints of the agent allocation function in the range $[0, z_i]$ and $t_j$ is the "jump" that the function makes at the breakpoint $z_j$ (i.e. the difference between the right-hand and left-hand limit at $z_j$)

**Minor tweak:** To realize this payment in sponsored search auctions (where we pay $\alpha_i \cdot p_i$), we need to charge $\sum_{j = 1}^k b_{j + 1} \frac{\alpha_j - \alpha_{j + 1}}{\alpha_i}$ per click $\Rightarrow$ total payment of $\alpha_i \cdot \sum_{j = 1}^k b_{j + 1} \frac{\alpha_j - \alpha_{j + 1}}{\alpha_i}$
