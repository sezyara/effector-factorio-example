import { Fragment, useEffect, useMemo, useState } from 'react'
import { createEvent } from 'effector'
import { useUnit } from 'effector-react'
import { Counter } from 'features/counter'
import { Button } from 'shared/ui'
import classes from './style.module.css'

const resetEvent = createEvent()

export const App = () => {
  const [instances, setInstances] = useState(1)
  const reset = useUnit(resetEvent)

  const renderCounters = useMemo(() => new Array(instances).fill(0).map((_, counterIndex) => (
    <Counter
      key={counterIndex}
      onReset={resetEvent}
    />
  )), [instances])

  useEffect(() => {
    const { unsubscribe } = resetEvent.watch(() => setInstances(1))

    return unsubscribe
  }, [])

  return (
    <Fragment>
      <div className={classes.instances}>
        <div>
          Instances created: <strong>{instances}</strong>
        </div>

        <Button
          ghost
          onClick={() => setInstances(instances + 1)}
        >
          Add new one
        </Button>

        <Button
          danger
          ghost
          onClick={() => reset()}
        >
          Reset all
        </Button>
      </div>

      <div className={classes.counters}>
        {renderCounters}
      </div>
    </Fragment>
  )
}
