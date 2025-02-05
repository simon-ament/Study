---
title: Programmierbeispiele
---
# POSIX (unistd.h)
## Forking a Process
```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main() {
	pid_t pid;
	/* for a child process */
	pid = fork();

	if (pid < 0) { /* error occured */
		fprintf(stderr, "Fork failed");
		return 1;
	} else if (pid == 0) { /* child process */
		execlp("/bin/ls", "ls", NULL);
	} else { /* parent process */
		/* parent will wait for the child to complete */
		wait(NULL);
		printf("Child Complete");
	}

	return 0;
}
```

- **Windows:** nutzt `CreateProcess()` und `WaitForSingleObject()`
- **Linux** alternativ auch 
	- `spawn()`, wenn kein MMU-Support vorhanden und `fork()` deshalb nicht unterstützt
	- `system()`, um einen Shell-Command auszuführen

## Interprocess Communication
```c title="Producer"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <sys/shm.h>
#include <sys/stat.h>

int main() {
	/* the size (in bytes) of shared memory object */
	const int SIZE = 4096;
	/* name of the shared memory object */
	const char *name = "OS";
	/* strings written to shared memory */
	const char *message_0 = "Hello";
	const char *message_1 = "World!";

	/* shared memory file descriptor */
	int shm_df;
	/* pointer to shared memory object */
	void *ptr;
	/* create the shared memory object */
	shm_fd = shm_open(name, O_CREAT | O_RDRW, 0666);
	/* configure the size of the shared memory object */
	ftruncate(shm_fd, SIZE);
	/* memory map the shared memory object */
	ptr = mmap(0, SIZE, PROT_WRITE, MAP_SHARED, shm_fd, 0);

	/* write to the shared memory object */
	sprintf(ptr, "%s", message_0);
	ptr += strlen(message_0);
	sprintf(ptr, "%s", message_1);
	ptr += strlen(message_1);

	return 0;
}
```

```c titel="Consumer"
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/shm.h>
#include <sys/stat.h>

int main() {
	/* the size (in bytes) of shared memory object */
	const int SIZE = 4096;
	/* name of the shared memory object */
	const char *name = "OS";
	
	/* shared memory file descriptor */
	int shm_fd;
	/* pointer to shared memory object */
	void *ptr
	/* open the shared memory object */
	shm_fd = shm_open(name, O_RDONLY, 0666);
	/* memory map the shared memory object */
	ptr = mmap(0, SIZE, PROT_READ, MAP_SHARED, shm_fd, 0);

	/* read from the shared memory object */
	printf("%s", (char*)ptr);
	/* remove the shared memory object */
	shm_unlink(name);
	
	return 0;
}
```

## Thread-Erstellung
```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

int sum; /* this daza is shared by the thread(s) */
void *runner(void *param); /* threads call this function */

int main() {
	pthread_t tid; /* the thread identifier */
	pthread_attr_t attr; /* set of thread attributes */

	/* set the default attributes of the thread */
	pthread_attr_init(&attr);
	/* create the thread */
	pthread_create(&tid, &attr, runner, argv[1]);
	/* wait for the thread to exit */
	pthread_join(tid, NULL);

	printf("sum = %d\n", sum);
}

/* the thread will execute this function */
void *runner(void *param) {
	int i, upper = atoi(param);
	sum = 0;

	for (i = 1; i <= upper; i++)
		sum += 1;

	pthread_exit(0);
}
```

- **Windows:** `CreateThread()` und `WaitForSingleObject()` 
- **Linux:** `clone()` mit Flags `CLONE_FS`, `CLONE_VM`, `CLONE_SIGHAND`, `CLONE_FILES`

### Joining multiple Threads
```c
# define NUM_THREADS 10
/* an array of threads to be joind upon */
pthread_t workers[NUM_THREADS];

for (int i = 0; i < NUM_THREADS; i++)
	pthread_join(workers[i], NULL);
```

## Canceling a Thread
```c
pthread_t tid;

/* create the thread */
pthread_create(&tid, 0, worker, NULL);

...

/* cancel the thread */
pthread_cancel(tid);

/* wait for the thread to terminate */
pthread_join(tid, NULL);
```

## Scheduling Scope
POSIX bietet die Möglichkeit, den Scheduling Scope (*process-contention scope, system-contention scope*) auszuwählen
- möglich mittels `ptread_attr_getscope()` und `pthread_attr_setscope()`
- von Linux und macOS wird nur `PTHREAD_SCOPE_SYSTEM` und nicht `PTHREAD_SCOPE_PROCESS` unterstützt

## Scheduling Policy
- `pthread_attr_getschedpolicy()` und `pthread_attr_setschedpolicy()`
- `SCHED_FIFO`, `SCHED_RR` und system-spezifisches `SCHED_OTHER`

## Mutex locks
```c
#include <pthread.h>

pthread_mutex_t mutex;

/* create and initialize the mutex lock */
pthread_mutex_init(&mutex, NULL);
```

```c
/* acquire the mutex lock */
pthread_mutex_lock(&mutex);

/* critial section */

/* release the mutex lock */
pthread_mutex_unlock(&mutex);
```

## Semaphoren
- POSIX stellt zwei Varianten zur Verfügung: **unnamed** (nur verwandte Prozesse) und **named** (beliebige Prozesse)

```c
#include <semaphore.h>

/* create unnamed semaphore and initialize it to 1 */
sem_t sem;
sem_init(&sem, 0, 1);

/* create named semaphore and initialize it to 1 */
sem_t *sem;
sem = sem_open("SEM", O_CREAT, 0666, 1);
```

```c
/* acquire the semaphore */
sem_wait(&sem); // named just sem

/* critical section */

/* release the semaphore */
sem_post(&sem); // named just sem
```

## Condition Variablen
```c
pthread_mutex_t mutex;
pthread_cond_t cond_var;

pthread_mutex_init(&mutex, NULL);
pthread_cond_init(&cond_var, NULL);

/* thread waiting for the condition a == b to become true */
pthread_mutex_lock(&mutex);
while (a != b)
	pthread_cond_wait(&cond_var, &mutex);

pthread_mutex_unlock(&mutex);

/* thread signaling another thread waiting on the condition variable */
pthread_mutex_lock(&mutex);
a = b;
pthread_cond_signal(&cond_var);
pthread_mutex_unlock(&mutex);
```

---
# Synchronisation Examples
## Bounded Buffer
- $n$ Buffers, jeder kann ein Item halten
- Semaphore `mutex`, die auf $1$ initialisiert ist
- Semaphore `full`, die auf $0$ initialisiert ist
- Semaphore `empty`, die auf $n$ initialisiert ist

```c title="Producer"
while (true) {
	/* produce an item in next_produced */
	wait(empty);
	wait(mutex);
	/* add next produced to the buffer */
	signal(mutex);
	signal(full);
}
```

```c title="Consumer"
while (true) {
	wait(full);
	wait(mutex);
	/* remove an item from buffer to next_consumed */
	signal(mutex);
	signal(empty);
	/* consume the item in next consumed */
}
```

## Readers-Writers Problem
- Datensatz
- Semaphore `rw_mutex`, die auf $1$ initialisiert ist
- Semaphore `mutex`, die auf $1$ initialisiert ist
- Integer `read_count`, der auf $0$ initialisiert ist

```c title="Writer"
while (true) {
	wait(rw_mutex);
	
	/* writing is performed */

	signal(rw_mutex);
}
```

```c title="Reader"
while (true){
	wait(mutex);
	read_count++;
	if (read_count == 1) /* first reader */
		wait(rw_mutex);
	signal(mutex);
	
	/* reading is performed */
	
	wait(mutex);
	read_count--;
	if (read_count == 0) /* last reader */
		signal(rw_mutex);
	signal(mutex);
}
```

## Dining Philosophers
### Semaphoren
```c
while (true){
	wait (chopstick[i] );
	wait (chopStick[ (i + 1) % 5] );
	
	/* eat for awhile */
	
	signal (chopstick[i] );
	signal (chopstick[ (i + 1) % 5] );
	
	/* think for awhile */
}
```

### Monitor
```c
monitor DiningPhilosophers
{
	enum {THINKING; HUNGRY, EATING} state [5];
	condition self [5];
	
	void pickup (int i) {
		state[i] = HUNGRY;
		test(i);
		if (state[i] != EATING) self[i].wait;
	}
	
	void putdown (int i) {
		state[i] = THINKING;
		// test left and right neighbors
		test((i + 4) % 5);
		test((i + 1) % 5);
	}
	
	void test (int i) {
		if ((state[(i + 4) % 5] != EATING) &&
		(state[i] == HUNGRY) &&
		(state[(i + 1) % 5] != EATING) ) {
			state[i] = EATING ;
			self[i].signal () ;
		}
	}
	
	initialization_code() {
		for (int i = 0; i < 5; i++)
			state[i] = THINKING;
	}
}
```

- der Philosoph $i$ ruft erst `DiningPhilosophers.pickup(i)` und dann irgendwann ``DininigPhilosophers.putdown(i)` auf

---
# Systemaufrufe

> [!caution] Aufgaben auf Blatt 1 nach relevanten Themen durchsuchen
