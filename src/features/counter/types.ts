import { Event } from 'effector'

export interface CounterProps {
  initialValue?: number
  onReset?: Event<void>
}
