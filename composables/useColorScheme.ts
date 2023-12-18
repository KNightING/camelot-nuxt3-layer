import type { MaybeElementRef } from "@vueuse/core";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";
import { Material3ColorSchemeKeys } from "./useMaterial3ColorScheme";

export type CustomColorScheme<T> = Partial<Material3ColorScheme & T>;

const getCssVar = (key: string, target?: MaybeElementRef) =>
  useElCssVar(`${key}`, target, { inherit: false });

const { system, store } = useColorMode();

export const useCustomColorScheme = <T>(
  target?: MaybeElementRef,
  config?: {
    lightColorScheme?: CustomColorScheme<T>;
    darkColorScheme?: CustomColorScheme<T>;
    cssVarKeyPrefix?: string;
    editMode?: boolean;
  }
) => {
  const lightColorScheme = ref(config?.lightColorScheme ?? defaultColorScheme);
  const darkColorScheme = ref(
    config?.darkColorScheme ?? defaultDarkColorScheme
  );

  const usedColorScheme = computed(() => {
    let isDark = true;
    if (store.value === "auto") {
      isDark = system.value === "dark";
    } else {
      isDark = store.value === "dark";
    }
    return { ...(isDark ? darkColorScheme.value : lightColorScheme.value) };
  });

  const changeCase = useChangeCase("", "paramCase");

  watchImmediate(usedColorScheme, (nV) => {
    if (config?.editMode === false) return;

    for (const key in nV) {
      if (useIsValidKey(key, nV)) {
        changeCase.value = key;
        let cssVarKey = changeCase.value;
        if (Material3ColorSchemeKeys.includes(key)) {
          cssVarKey = `--material3-${cssVarKey}`;
        } else {
          if (config?.cssVarKeyPrefix) {
            cssVarKey = `--${config.cssVarKeyPrefix}-${cssVarKey}`;
          } else {
            cssVarKey = `--custom-${cssVarKey}`;
          }
        }
        const cssVar = getCssVar(cssVarKey, target);
        cssVar.value = nV[key];
      }
    }
  });

  if (config) {
    if (config.lightColorScheme) {
      lightColorScheme.value = config.lightColorScheme;
    }

    if (config.darkColorScheme) {
      darkColorScheme.value = config.darkColorScheme;
    }
  }

  return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme };
};
