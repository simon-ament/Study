---
title: Hapkit
---
1D handle that can for example simulate a wall by controlling a motor the right way
- hard to get right i.e. make it feel natural ([[01_general#Haptics]])

---
# Hapkit control
in order to prevent oscillation: consider **[[03_physics#Dynamics|dynamic]] properties** of the device as opposed to just **[[03_physics#Kinematics|kinematic]] properties** with a god-like motor power

## on/off control
*aka "bang-bang"*

`if (measured value < lower threshold) turn on​`<br>
`if (measured value > higher threshold) turn off`
- avoid oscillations through **hysteresis** i.e. two different thresholds

## P - proportional control
make the controller output **proportional** to the error signal

`motorOutput(pwm) = Err * Kp​`
- prevents oscillations caused by overshooting

## PI - integral control
accounts for past values of the error. For example, if the current output is not sufficiently strong, the integral of the error will accumulate over time, and the controller will respond by applying a stronger action

`motorOutput = P + I with I = errorAccumulator += Err`
- prevents steady state error (i.e. small errors that are never accounted for)

## PID -  differential control
accounts for possible future trends of the error, based on its current rate of change 

`motorOutput = P + I + D with D = (error – prevError) * Kd`
- prevents over-correcting mainly caused by integral control when the error is suddenly being corrected faster than before (e.g. no counter force present anymore)

> [!abstract] Insight
> there is no general purpose PID controller.​ Instead, any control has to be tuned for the specific use case $\Rightarrow$ rather than buying expensive actuators (such as steppers) buy cheap actuators + cheap sensors