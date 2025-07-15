---
title: Electronical Components
---
# Control
## Controller
device that **monitors** and **changes** the operating conditions of a given dynamical system
- historically analog
- nowadays they are digital (microprocessor / computer)

## Microcontroller
a small computer on a **single integrated circuit** containing a processor core, memory, and programmable input/output peripherals.​
- **Program memory** in the form of NOR flash or OTP ROM is also often included on chip, as well as a typically **small amount of RAM**.​
- Microcontrollers are designed for **embedded applications**, in contrast to the microprocessors used in personal computers or other general purpose applications.​

## Control system
manages, commands, directs, or regulates the behaviour of other devices or systems using **control loops**
- **open loop control:** no sensor involved, controlled using only the model of the **system** (e.g. electrical characteristics) and the **initial state** (room temperature, ...)
- **closed loop control:** adds negative feedback to **adjust the system output at all times** (sensor does not have to be electronical, can for example be mechanical)

---
# Sensors

a device, module, or subsystem whose purpose is to **detect events or changes in its environment** and send the information to the control
- **timer** not a sensor in our case (same as adding a Stromzähler,​ does not close the feedback loop, still predetermined control)

## Magnetometer
instrument that measures magnetism—either magnetization of magnetic material like a ferromagnet, or the direction, strength, or the relative change of a magnetic field at a particular location.

## Hall effect sensor
transducer that varies its output voltage in response to a **magnetic field**.​  
- Hall effect sensors are used for proximity switching, positioning, speed detection, and current sensing applications.

## Encoder 
Electro-mechanical device that converts​ the angular position or motion of a shaft or axle to an analog or digital code​
- **Magnetic encoder** produces a voltage proportional to the **orientation of a magnetic field​**

![[optical_encoder.jpg|300]]
![[encoder.jpg|300]]
![[mouse.jpg|300]]

---
# Motors

## Electrical Motor
an electrical machine that converts electrical energy $\rightarrow$ mechanical energy
- speed of a DC motor is not controlled by an **H-bridge**, but rather by the amount of voltage, typically controlled through **PWM**

## Relay
an electrically operated switch
- handles **high power** required to directly control an electric motor or other loads
- can be used to change direction of a DC motor using an **H-bridge**:
![[h-bridge.png]]

## Motor driver
includes H-bridge and speed control
- IN1, IN2, ENA
- fast stop | slow stop

>[!example]
> ## Dimmer
> - use **resistor** to dim a lamp?
> - heating up the resistor $\Rightarrow$ high loss of energy
> - instead use **PWM** (at least for LEDs)

