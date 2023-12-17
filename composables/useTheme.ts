import { isClient } from "@vueuse/core";

export const ThemeLight = "light";
export const ThemeDark = "dark";
export const ThemeSaveKey = "data-theme";

const ThemeValues = [ThemeLight, ThemeDark];
type Theme = (typeof ThemeValues)[number];

export const useTheme = () => {
  const theme = useLocalStorageProxy<Theme | undefined>(
    ThemeSaveKey,
    undefined
  );
  const isLight = computed(() => {
    return theme.storage.value === ThemeLight;
  });
  const isDark = computed(() => {
    return theme.storage.value === ThemeDark;
  });

  const isSystemDark = () => {
    if (isClient && window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const readTheme = () => {
    if (theme.value) {
      return theme.value;
    }

    if (isSystemDark()) {
      return ThemeDark;
    } else {
      return ThemeLight;
    }
  };

  const toggle = () => {
    if (theme.value === ThemeDark) {
      theme.value = ThemeLight;
    } else {
      theme.value = ThemeDark;
    }
  };

  if (isClient) {
    readTheme();
  }

  return { theme, isDark, isLight, toggle, isSystemDark, readTheme };
};
