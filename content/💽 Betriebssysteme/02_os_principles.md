---
title: OS-Prinzipien
---
# Prozess-Erstellung
## Windows
Unter Windows wird mit `CreateProcess()` ein neuer Prozess erstellt und ein Programm in diesem Prozess geladen. Dieser Prozess bekommt seine eigene PID und seinen eigenen virtuellen Adressraum. Der Prozess kann bestimmte Handles (z. B. Dateien, Sockets) erben, wenn der Elternprozess diese explizit weitergibt. Außerdem erhält der neue Prozess eine Kopie der Umgebungsvariablen des Elternprozesses.

## Linux
Unter Linux wird mit `fork()` ein Prozess erstellt, der eine Kopie des Elternprozesses ist. Dieser lädt dann mit `exec()` ein neues Programm in seinen Adressraum und ersetzt den aktuellen Prozess. Zu Beginn teilen sich der Elternprozess und der Kindprozess allerdings den Speicher (Copy-On-Write). Außerdem erbt der Kindprozess die offenen Dateihandles des Elternprozesses.

---
# Subsysteme
> [!danger] Nachtragen

---
# Interprozesskommunikation (IPC)
Betriebssysteme bieten Methoden zur Interprozesskommunikation (IPC), damit Prozesse miteinander kommunizieren können, ohne direkt auf den Speicher an- derer Prozesse zuzugreifen. IPC ist wichtig, um Daten auszutauschen und die Zusammenarbeit zwischen Prozessen zu ermöglichen, ohne die Integrität der Daten oder die Sicherheit zu gefährden. Es gibt zwei gängige Arten von IPC: Shared Memory und Message Passing.

## Shared Memory
Bei Shared Memory teilen sich mehrere Prozesse einen gemeinsamen Speicherbereich, was den schnellen Austausch von Daten ermöglicht, ohne dass sie kopiert werden müssen. Allerdings erfordert diese Methode eine sorgfältige Synchronisation der Prozesse, um Datenkonflikte zu vermeiden. 

## Message Passing
Message Passing funktioniert anders, indem Prozesse Nachrichten austauschen, ohne direkt auf den Speicher des anderen zuzugreifen. Diese Methode ist sicherer und einfacher, da sie keine direkte Speicherfreigabe erfordert, ist jedoch langsamer, weil Nachrichten über das Betriebssystem übertragen werden müssen. 

## Abwägung
Im Allgemeinen eignet sich Shared Memory für Anwendungen, bei denen Geschwindigkeit wichtig ist und die Prozesse in engem Zusammenhang stehen, während Message Passing eine sicherere und flexiblere Lösung für die Kommunikation zwischen Prozessen darstellt, besonders in verteilten Systemen oder bei komplexeren Interaktionen.

## Pipes
Pipes sind uni- oder bi-direktionale Kommunikationskanäle zwischen Prozessen, die auf einem System laufen. Man unterscheidet zwischen unbenannten und be- nannten Pipes. Letztere können im Gegensatz zu Ersteren auch für die Kommunikation von Prozessen eingesetzt werden, welche nicht miteinander verwandt sind.

## Sockets
Sockets ermöglichen dies zusätzlich für die Kommunikation über ein Netzwerk. Dafür wird jeder Punkt mit einer IP-Adresse und einem Port gekennzeichnet. Sockets können im Gegensatz zu Pipes von laufenden Programmen erstellt werden und gleichzeitig im Kontakt mit mehreren anderen Sockets stehen. Pipes sind generell einfacher zu implementieren, sind aber auch aber auch weniger vielseitig als Sockets.

---
# Threads
## Thread-Kontext
Unter einem Thread-Kontext versteht man seinen gesamten Zustand. Dazu gehören die Registerinhalte, der Stack und der zugeteilte Speicherbereich. Bei einem Kontextwechsel, wenn die CPU von einem Thread auf einen anderen umschaltet. Dazu wird zunächst der Kontext des aktuellen Threads gespeichert. Anschließend wird der Kontext des neuen Threads geladen, welcher vom Scheduler ausgewählt wurde. Dazu gehört auch der Programm Counter, sodass dieser Thread an der richtigen Stelle fortgesetzt werden kann. Im Unterschied dazu ist werden bei einem Kontextwechsel vom User- in den Kernelmodus nicht alle Register der CPU gespeichert, da der Thread nicht gewechselt wird. Daher ist auch kein Scheduler nötig um diesen Wechsel zu vollziehen. Insgesamt ist dieser Wechsel schneller als ein Kontextwechsel zwischen zwei Threads

## Scheduling-Zustände
> [!caution] Graphik einfügen