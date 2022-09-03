import { allSettled, createEvent, fork } from 'effector'
import { counterModelFactory } from '.'

describe('Counter model', () => {
  test('should return default initial value', async () => {
    const model = counterModelFactory.createModel({})

    const scope = fork()
    expect(scope.getState(model.$counter)).toBe(0)
  })

  test('should decrement counter', async () => {
    const model = counterModelFactory.createModel({ initialValue: 0 })
    const scope = fork()

    await allSettled(model.decrement, { scope })
    expect(scope.getState(model.$counter)).toBe(-1)
  })

  test('should increment counter', async () => {
    const scope = fork()
    const model = counterModelFactory.createModel({ initialValue: 0 })

    await allSettled(model.increment, { scope })
    expect(scope.getState(model.$counter)).toBe(1)
  })

  test('should reset counter to zero', async () => {
    const scope = fork()
    const model = counterModelFactory.createModel({ initialValue: 0 })

    await allSettled(model.increment, { scope })
    await allSettled(model.reset, { scope })
    expect(scope.getState(model.$counter)).toBe(0)
  })

  test('should reset counter via external event', async () => {
    const onReset = createEvent()
    const scope = fork()
    const model = counterModelFactory.createModel({ initialValue: 0, onReset })

    await allSettled(model.increment, { scope })
    await allSettled(onReset, { scope })
    expect(scope.getState(model.$counter)).toBe(0)
  })
})
