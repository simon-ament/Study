---
title: Arduino
---
an open source, computer hardware and software company, project, and user community that designs and manufactures **single-board microcontrollers​** for building digital devices and interactive objects that can **sense and control objects in the physical world**.​

---
# Methods
**pinMode():** 
initializes a pin for the specified usage
- for example: `pinMode(12, OUTPUT)`

**digitalWrite():** 
sets voltage at the specified pin to either `HIGH` or `LOW`
- for example: `digitalWrite(12, HIGH)`
- **PWM (pulse width modulation):** technique using a rectangular pulse wave whose pulse width is modulated resulting in the variation of the average value of the waveform
	- simulate / create an analog signal from a digital one

**analogWrite():**
writes an analog signal to the specified pin using **PWM** | accepts values from 0 to 255
- for example: `analogWrite(12, 255)`

**digitalRead():**
reads the signal at the specified pin, returns 0 if voltage < 3V and 1 otherwise
- for example: `int result = digitalRead(12)`

**analogRead():**
reads the signal at the specified pin, returns 0 for a voltage of 0V, 1023 for a voltage of 5V and accordingly for values in between
- for example: `int result = analogRead(12)`

---
# Tips
1. use **serial print** sparsely, it will keep the microcontroller busy for too long
2. avoid using **delays** because they as well slow down the main loop
3. instead use **timer loops** using `millis()`

```c
// debug print
currentTime = millis();
if (currentTime - lastUpdateTime > 100) {
	// println();
	lastUpdateTime = currentTime;
}
```
