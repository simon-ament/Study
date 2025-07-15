---
title: Prototyping and Game Design
---
# Lingo
the special vocabulary of a particular field of interest
- outside immediate work group: **lingo is bad**
- helps efficiency within small group

## Groupthink
The tendency for groups to think in harmony
- $\Rightarrow$ valuable opinions may get lost
- **counteracting groupthink:** test with actual users early and often
- but what if I don't even have a prototype?

> [!tip] Take away lesson
> Don't forget main goal over detailed discussions (happens especially in big companies)

---
# Paper Prototyping
- interactive prototyping using a visibly mocked-up paper interface
- participant ("clicking"), computer (showing cards), interviewer (watching, making notes)
- playing out interactions as if they were real

**For DualPanto:** Fingers replace paper

## Storyboard
sequence of sketches that show what will be going on.
- walkthrough of specific use case = path through the UI including the involved data
- arrows / motion tend to **represent a future state** (unlike speed lines in comic books)

---
# Tutorials
- should be brief ($\approx$ 4 min / lesson)
- should be task-oriented, not functionality-oriented
- should show an actual example
- should provide good help: desired function $\rightarrow$ tools $\rightarrow$ solution (intention and big picture of the program)

---
# Progressive Disclosure (Levels)
improve usability by presenting only the minimum data required for the task at hand

## A few decades ago
- one could sell *shrink-wrapped* software with a collection of tutorial videos $\Rightarrow$ first user value after hours / days

![[user_value.png|300]]
## Today (the 2020's)
1. software has to have low entry barriers (e.g. web-based)
2. it has to deliver value in the **first few seconds** and always stay net positive in terms of value generated for the user (switching to a competitor takes only seconds)

## Gaming industry
- has always been using levels, to lower entry barrier and give instant **sense of accomplishment**
- games are like **onions** (consisting of shells)
- great inspiration for *productivity app* design

**Level Design Algorithm:**
1. Design the **final level**
2. List the **game elements** users need to know by then
3. rank these game elements by relevance
4. create a **sequence of levels**, each of which introduces one additional game element

## DualPanto examples
**Drawing app:**
- first level should make user draw a simple shape (e.g. a triangle)
- but they can already do this on paper, DualPanto allows creating complexity by showing users, **what was drawn previously**
- $\Rightarrow$ first level should make user finish a drawing using a simple shape (e.g. triangular roof on top of a square house)

**Breakout:**
- removing all or even one brick is quite complex
- hitting things back is a fun game itself (see pong)
- $\Rightarrow$ first level should make user reflect the ball by moving the paddle

## (Game difficulty) balancing
tweaking parameters, scenarios, and behaviors in a video game to match **the player's ability at that moment in the game**, in order to avoid making the player bored (if the game is too easy)  or frustrated (if it is too hard)
- learning about the game tends to be fun itself
- but learning rate (just as game difficulty) has to be carefully designed $\Rightarrow$ constant learning rate

![[Pasted image 20240706103542.png|300]]

---
# Speech [[11_unity#Text-to-Speech (TTS)|Output]] and [[11_unity#Speech input (speech recognition / speech to text)|Input]]
- **serializability:** if something can be done in audio + speech, it should be done this way $\Rightarrow$ DualPanto apps should not be (almost) fully serializable
- **a word is worth a thousand icons:** use speech output to identify specific objects (instead of different sound)

**Functionality blind users need:**
1. a sense of where they ("me" handle) and the opponents ("it" handle) are
2. information on events happening, such as collisions $\Rightarrow$ haptics + **sound / speech out**
3. allow player to trigger events, such as invoking power-ups $\Rightarrow$ **speech input**

[[11_unity#DualPanto Toolkit|DualPanto Toolkit]] provides utilities for implementation

## Discoverability
Discoverability, in the context of product and interface design, is the degree of ease with which the **user can find all the elements and features** of a new system when they first encounter it

## Guessability study
a prototype of an interactive system, that is intentionally designed to require user input, yet **not to respond**
- conducted to gather data on how users would naturally interact with the system
- typically to then (re)design the system so as to behave in a guessable way

![[edgewrite.png|300]]

> [!tip] Take away lesson
> A combination of haptics + sound + speech makes DualPanto app better $\Rightarrow$ please think of those three when you design, and find the best combination
