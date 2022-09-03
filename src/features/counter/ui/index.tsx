import { memo } from 'react'
import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import { Button } from 'shared/ui'
import { counterModelFactory } from '../model'
import type { CounterProps } from '../types'
import classes from './style.module.css'

const CounterView = modelView(counterModelFactory, ({ model }) => {
  const [counter, decrement, increment, reset] = useUnit([
    model.$counter,
    model.decrement,
    model.increment,
    model.reset
  ])

  return (
    <div className={classes.counter}>
      <Button
        ghost
        onClick={decrement}
      >
        -
      </Button>

      <span className={classes.value}>
        {counter}
      </span>

      <Button
        ghost
        onClick={increment}
      >
        +
      </Button>

      <Button
        className={classes.reset}
        ghost
        danger
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  )
})

// memo используется для запрета пересоздания модели компонента фабрикой
export const Counter = memo((props: CounterProps | void) => {
  const model = counterModelFactory.createModel(props)

  return (
    <CounterView model={model} />
  )
}, (prevProps, nextProps) => prevProps?.initialValue === nextProps?.initialValue)
