import { create, StateCreator } from 'zustand'

const resetters: (() => void)[] = []

const createZustandChildrenStore = (<T extends unknown>(
  f: StateCreator<T> | undefined
) => {
  if (f === undefined) return create
  const store = create(f)
  const initialState = store.getState()
  resetters.push(() => {
    store.setState(initialState, true)
  })
  return store
}) as typeof create

const resetZustandStore = () => {
  for (const resetter of resetters) {
    resetter()
  }
}

export { createZustandChildrenStore, resetZustandStore }
