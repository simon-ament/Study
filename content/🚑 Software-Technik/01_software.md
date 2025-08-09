---
title: Software Development
---
# Introduction and Outlook
It took only a bit more of 10 years from the 2011 prediction of "software is eating the world", to the 2017 presage of "deep learning is eating software", and now this projection of 95% of user interactions mediated by some sort of AI.
- *Caveat: the adoption is much lower where safety/mission critical systems are involved...*
- **Products (*e.g. washing machine*):** mechanical without motor $\to$ with electrical motor $\to$ with electrical control $\to$ with more sensors and smart software control $\to$ **intelligent**
- **Services (*e.g. finance*):** paper folders $\to$ automated financial transactions $\to$ online banking $\to$ online trading $\to$ **intelligent**

> ChatGPT Will Replace Programmers Within 10 Years

> Current AI innovations such as machine learning, large language models (LLMs) and generative AI will offer new opportunities to extend the models and methods of SE. They may automate some routine development processes, and they will bring new kinds of components and architectures. If we’re fortunate they may force SE to rethink what we mean by correctness and reliability. **They will not, however, render SE irrelevant.**

---
# Our Product (Software)
## Craftsmanship Manifesto
> Architects, sculptors, painters, we all must return to craftsmanship! - Walter Gropius’s 1919 Bauhaus Manifesto

- **Affordances:** in design, perceived affordance is important — that is, our implicit understanding of **how to interact with an object**
- **Ergonomics:** the scientific study of people and their **working conditions**, especially done to improve **effectiveness**, **efficiency**, and **safety**
- **Semiotics:** the study of signs and symbols, their **meaning** and **use**
- **Code of Conduct:** a set of **rules** that members of an organization or people with a particular job or position must follow
- **Contract:** a document that states and explains a formal **agreement** between two different people or groups, or the agreement itself

## Essential and Accidential Properties
1. **Invisibility** – the source code and the UI are very partial visualizations
	- *Software lacks a physical, spatial, or geometric representation*
	- **Particularly challenging:** Legacy systems | Blackbox frameworks | Code-generated components | Embedded systems | Unreachable code | Untested code | AI-based systems

2. **Complexity** – number of components and dependencies surpass hardware
	- **Difficulties:** Estimating cost | Distributing tasks | Testing | Regression testing | Debugging | Refactoring | Adding new features | Guarantee stability | Integration | Migration | Usability | Safety | Security | Performance

3. **Conformity** – software must conform with the hardware
	- *Software does not exist in isolation*
	- **Particularly challenging:** Legacy systems | Regulatory compliance | Data format compatible | 3rd party APIs

4. **Changeability** – software constantly subject to pressures for change
	- *Software changes are subject to many external forces: hardware, business, other systems, standards, etc.*
	- **Particularly challenging:** Enterprise systems | Operating systems | Legacy modernization | Market platforms

---
# Our Methods (Tools)
## What is engineering?
1. Creating cost-effective solutions $\dots$
2. to practical problems
3. by applying scientific knowledge
4. to building things
5. in the service of mankind

![[Screenshot from 2025-08-09 14-23-54.png|500]]

## Hype Cycles Gartner
1. **Technology Trigger:** A potential technology breakthrough kicks things off. Early proof-of- concept stories and media interest trigger significant publicity
2. **Peak of Inflated Expectations:** Early publicity produces a number of success stories— often accompanied by scores of failures
3. **Trough of Disillusionment:** Interest wanes as experiments and implementations fail to deliver 
4. **Slope of Enlightenment:** More instances of how the technology can benefit the enterprise start to crystallize and become more widely understood
5. **Plateau of Productivity:** Mainstream adoption starts to take off. Criteria for assessing provider viability are more clearly defined

![[Screenshot from 2025-08-09 14-24-42.png|500]]

---
# Our Profession (Expertise)
## What is an Expert?
- Dominates 50.000 chunks of information
- Chunks = knowledge sufficiently familiar that it can be remembered rather than derived
- Full-time professionals expect to accumulate 10 years or 10.000 hours of practice

| Traditional Contract                                         | Reflective Contract                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Expert presumes to have all necessary knowledge              | Knowledge is acquired through Expert-Client collaboration                        |
| Expert pre-establishes a professional distance to client     | Respect emerges from interaction                                                 |
| Expert looks for deference to professional status            | Looks for freedom and real connection                                            |
| Client security is based on faith on professional status     | Client collaborates with expert to make sense of the case/project                |
| Client has the comfort of being in good hands                | Client can exercise control of the situation                                     |
| Client is pleased to be served by the best persons available | Client is pleased to be able to test her judgments about the expert’s competence |

---
# Our Ethics (Responsibility)
*In case of a **disaster** or **system failure** the question who is responsible naturally arises*
## Role Types
*Responsibilities can result from contracts, code of conducts, or moral norms and moral duties*
- **Role responsibility:** The responsibility that is based on the role one has or plays in a certain situation
- **Moral responsibility:** Responsibility that is based on moral obligations, moral norms or moral duties
- **Professional responsibility:** The responsibility that is based on one’s role as professional in as far it stays within the limits of what is morally allowed
- Different roles result in different responsibilities (engineer vs. employee)

## Types of Responsibility
### Active: before the event
- Responsibility before something has happened referring to a duty or task to care for certain state-of-affairs or person

1. Adequate perception of threatened violations of norms;
2. Consideration of the consequences;
3. Autonomy, i.e., the ability to make one’s own independent moral decisions;
4. Displaying conduct that is based on a verifiable and consistent code; and
5. Taking role obligations seriously.

### Passive: after the event
- Backward-looking responsibility, relevant after something occurred

1. **Accountability:** Backward-looking responsibility in the sense of being held to account for or justify one’s action towards others
2. **Blameworthiness:** Backward-looking responsibility in the sense of being a proper target for blame for one’s action or its consequences. The following conditions need to apply:
	- wrong-doing
	- causal contribution
	- foreseeability, and
	- freedom of action
- **Liability / Legal Responsibility:** Backward-looking responsibility according to the law

## Liability (passive)

| Moral Responsibility                                              | Legal Liability                                      |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| Blameworthiness (wrong-doing, causality, foreseeability, freedom) | Based on conditions formulated in laws               |
| Informally established                                            | Formally established in court                        |
| Not necessarily connected to punishment or compensation           | Implies obligation to pay a fine or to repay damages |
| Backward-looking and forward-looking                              | Only backward-looking                                |

**Negligence vs. Strict Liability:**

1. **Negligence:** Not living by certain duties. Negligence is often a main condition for legal liability.
	- To show negligence for the law, usually proof must be given of a duty owed, a breach of that duty, an injury or damage, a causal connection between the breach and the injury or damage.
2. **Duty of Care:** The legal obligation to adhere to a reasonable standard of care when performing any acts that could foreseeably harm others
3. **Strict Liability:** A form of liability that does not require the defendant to be negligent

**Product Liability:** Liability of manufactures for defects in a product, without the need to proof that those manufactures acted negligently (exception for development defects, e.g. EU directives)

1. **Development Risk:** In the context of product liability: Risk that could not have been foreseen given the state of scientific and technical knowledge at the time the product was put into circulation
2. **Corporate Liability:** Liability of a company (corporation) when it is treated as a legal person (may be limited)
3. **Limited Liability:** The principle that the liability of shareholders for the cooperation's debts and obligations is limited to the value of their shares

## Active
*Responsibility before something has happened referring to a duty or task to care for certain state-of-affairs or person*

**Features:**
1. Adequate perception of threatened violations of norms
2. Consideration of the consequences
3. Autonomy, i.e., the ability to make one’s own independent moral decisions
4. Displaying conduct that is based on a verifiable and consistent code
5. Taking role obligations seriously

**Code of Conduct:** A code in which organizations lay down guidelines for responsible behavior of their members
- **Professional Code:** Code of conduct that is formulated by a professional association (e.g. IEEE, ACM, $\dots$)
- **Corporate Code:** Code of conduct that is formulated by a company (e.g. HPI)
- **Global Code:** Code of conduct that is believed to apply worldwide (e.g. The Ten Principles of the UN Global Compact)
