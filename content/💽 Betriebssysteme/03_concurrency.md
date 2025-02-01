---
title: Nebenläufigkeit
---
# Begriffe
## Nebenläufigkeit
Nebenläufigkeit bezieht sich auf die **logische Gleichzeitigkeit** von Prozessen
- müssen nicht gleichzeitig laufen. sondern können auch abwechselnd ausgeführt werden

## Parallelität
Parallelität ist die **physische Gleichzeitigkeit** von Prozessen
- parallele Ausführung auf verschiedenen Kernen

![[Screenshot from 2025-02-01 11-47-28.png]]

> [!caution] Data-Parallelism

---
# Synchronisation
## Critical Section Problem
Ein kritischer Abschnitt ist ein Abschnitt von Code eines Prozesses, der **geteilte Variablen, Dateien, usw. ändern** könnte. Es darf sich deshalb stets nur ein Prozess zur Zeit in seinem kritischen Abschnitt befinden.

Eine Lösung des Critical-Section-Problems muss die folgenden drei Kriterien erfüllen:
1. **Mutual exclusion:** Wenn ein Prozess sich in seiner Critical Section befindet, darf kein anderer Prozess dies ebenfalls tun
2. **Progress:** Nur dann, wenn gerade keiner der Prozesse in seiner Critical Section ist, darf - in endlicher Zeit - entschieden werden welcher der wartenden Prozesse in seine Critical Section übergehen darf
3. **Bounded waiting:** Wenn ein Prozess $P$ in seine Critical Section gehen möchte, muss es ein Limit für andere Prozesse geben, wie oft diese in ihre Critical Section übergehen dürfen, bevor $P$ es tut

> [!caution] Bezieht sich vor allem auf geteilte Variablen, kein festes Limit (stochastische Gewissheit genügt)
### Beispiel
> [!caution] Hinzufügen (Blatt 4 Aufgabe 2)

## Mutex
> [!danger] Fehlt

### Spinlocks
Bei einem Spinlock **fragt ein Prozess eine Mutex wiederholt an**, bis diese verfügbar ist
- vermeidet Kontextwechsel
- jedoch wird in der Zeit nichts Sinnvolles ausgeführt (*busy waiting*)
- sinnvoll insbesondere auf **Multiprozessorsystemen**, auf denen keine hohe Wartezeit erlaubt wird

## Semaphore
Eine Semaphore ist eine **Integer-Variable**, auf welche (außer zur Initialisierung) nur über folgende Funktionen zugegriffen werden kann:
- `wait()` / `p()`: Prozesse, die starten möchten, rufen `wait()` auf der Semaphore auf
- `signal()` / `v()`: Wenn ein Prozess Ressourcen wieder freigibt, ruft er `signal()` auf

Wenn die Semaphore auf $0$ fällt, sind alle Ressourcen belegt und Prozesse müssen warten, bis ein anderer fertig wird. Man unterscheidet
- **counting semaphore:** beliebig groß
- **binary semaphore:** $0 - 1$, äquivalent zu [[#Mutex|mutex]] locks

Semaphoren können einen Prozess blockieren, wenn keine Ressource verfügbar ist und so *busy waiting* vermeiden. Die gesparte CPU-Zeit kann von einem anderen Prozess sinnvoller genutzt werden

### Beispiel
> [!caution] Hinzufügen (Blatt 4 Aufgabe 5)

## Monitor
> [!caution] Relevant? Ggf. nur Condition Variablen

## Deadlocks
Als Deadlock bezeichnet man eine Situation während der Ausführung mehrerer Threads, in der diese allesamt auf die Freigabe von *locks* (z.B. Mutex oder Semaphore) warten, wobei diese jeweils von den anderen Threads gehalten werden. 
- $\Rightarrow$ keiner der Threads wird seine gehaltenen *locks* freigeben, bevor dies nicht ein anderer Thread tut, sodass alle Threads endlos aufeinander warten

![[Screenshot from 2025-02-01 11-51-43.png]]

## Windows
### Dispatcher-Objekte
Dispatcher-Objekte stellen im Windows-Betriebssystem ein **allgemeines Tool zur Thread-Synchronisierung** zur Verfügung
- Unterstützung für Mutexes, Semaphoren, Events (ähnlich zu Condition Variablen), Timer, etc.
- Verwendung mittels `WaitForSingleObject()` bzw. `WaitForMultipleObjects`

> [!caution] Kurz: Alles, worauf man warten kann

Ein Dispatcher-Objekt kann sich in **zwei Zuständen** befinden:
- *signalised:* Objekt steht derzeit zur Verfügung und kann von einem anfragenden Prozess *aqcuired* werden
- *non-signalised:* Thread blockiert bei dem Versuch, dieses Objekt zu erlangen. Wird zu einer Warteschlange hinzugefügt (FiFo)

### Bedeutungen von *signalised*
- **Prozess:** ist beendet
- **Datei:** kann gelesen werden (also I/O fertig ==???==)
- **Event:** ist eingetreten
- **Timer:** gewisse Zeit verstrichen
- **Mutex / Semaphore:** ist verfügbar
- und weitere
