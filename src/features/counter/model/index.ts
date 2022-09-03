import { createStore, createEvent, is, sample } from 'effector'
import { modelFactory } from 'effector-factorio'
import type { CounterProps } from '../types'

export const counterModelFactory = modelFactory((params: CounterProps | void) => {
  const $counter = createStore(params?.initialValue ?? 0)
  const decrement = createEvent()
  const increment = createEvent()
  const reset = createEvent()

  $counter
    .on(decrement, counter => counter - 1)
    .on(increment, counter => counter + 1)
    .reset(reset)

  if (
    typeof params === 'object' &&
    'onReset' in params &&
    is.event(params?.onReset)
  ) {
    sample({
      clock: params.onReset,
      target: reset
    })
  }

  return {
    $counter,
    decrement,
    increment,
    reset
  }
})
