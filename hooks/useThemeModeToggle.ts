import { useThemeStore } from '@/store/zustand/themeStore'

interface HookProps {}

export function useThemeModeToggle({}: HookProps): {
  switchMode: () => void
} {
  const {
    isDarkTheme,
    switchToPreferredDarkTheme,
    switchToPreferredLightTheme,
  } = useThemeStore()

  const switchMode = () => {
    if (isDarkTheme()) {
      switchToPreferredLightTheme()
    } else {
      switchToPreferredDarkTheme()
    }
  }

  return { switchMode }
}