import { createStore, createEvent, sample, is } from 'effector'
import { modelFactory } from 'effector-factorio'
import type { CounterProps } from '../types'

export const counterModelFactory = modelFactory(({
  initialValue = 0,
  onReset
}: CounterProps) => {
  const $counter = createStore(initialValue)
  const decrement = createEvent()
  const increment = createEvent()
  const reset = createEvent()

  $counter
    .on(decrement, counter => counter - 1)
    .on(increment, counter => counter + 1)
    .reset(reset)

  if (is.event(onReset)) {
    sample({
      clock: onReset,
      target: reset
    })
  } else {
    console.log(123)
  }

  return {
    $counter,
    decrement,
    increment,
    reset
  }
})
