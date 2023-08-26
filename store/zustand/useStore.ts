import { User } from '@prisma/client'
import { createZustandChildrenStore } from './store'

type State = {
  userOrFalse: User | false
}

type Actions = {
  setAuthenticated: (user: User) => void
  setUnauthenticated: () => void
  reset: () => void
}

type UserOrFalseStore = State & Actions

const initialState: State = {
  userOrFalse: false,
}

const useUserOrFalseStore = createZustandChildrenStore<UserOrFalseStore>()(
  (set, get) => ({
    ...initialState,
    setAuthenticated: (user: User) => {
      set({ userOrFalse: user })
    },
    setUnauthenticated: () => {
      set({ userOrFalse: false })
    },
    reset: () => set(initialState),
  })
)

export { useUserOrFalseStore }
export type { UserOrFalseStore }

