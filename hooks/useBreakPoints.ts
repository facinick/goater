//@ts-nocheck
import tailwindConfig from '@/tailwind.config.js'
import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

const {
  theme: { screens },
} = resolveConfig(tailwindConfig)

type Size = '2xl' | 'lg' | 'md' | 'sm' | 'xl'

type Screens = Record<Size,string>

const getNextBreakpoint = (current: Size) => {
  const breakpointNames = Object.keys(screens as Screens)
  const currentIndex = breakpointNames.indexOf(current)
  return breakpointNames[currentIndex + 1]
}

const getPrevBreakpoint = (current: Size) => {
  const breakpointNames = Object.keys(screens as Screens)
  const currentIndex = breakpointNames.indexOf(current)
  return breakpointNames[currentIndex - 1]
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const breakpoints = Object.entries(screens as Screens)
      const currentBreakpoint = breakpoints.reduce((acc, [name, size]) => {
        if (window.matchMedia(`(min-width: ${size})`).matches) {
          return name
        }
        return acc
      }, null)
      setBreakpoint(currentBreakpoint)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMin = (size: Size) => {
    const breakpointSizes = Object.values(screens as Screens)
    const windowSize = window.innerWidth
    const index = breakpointSizes.indexOf(screens[size])
    const breakPoint = Number(breakpointSizes[index].replace('px', ''))
    return windowSize >= breakPoint
  }

  const isMax = (size: Size) => {
    const breakpointSizes = Object.values(screens as Screens)
    const windowSize = window.innerWidth
    const index = breakpointSizes.indexOf(screens[size])
    const breakPoint = Number(breakpointSizes[index].replace('px', ''))
    return windowSize <= breakPoint
  }

  return { breakpoint, isMin, isMax }
}