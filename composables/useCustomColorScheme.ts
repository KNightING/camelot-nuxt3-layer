import type { MaybeElementRef } from "@vueuse/core";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";
import { Material3ColorSchemeKeys } from "./useMaterial3ColorScheme";

export type CustomColorScheme<T = any> = Material3ColorSchemePartial &
  Partial<T>;

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
  const lightColorScheme = ref(
    config?.lightColorScheme ?? <CustomColorScheme<T>>{ ...defaultColorScheme }
  );
  const darkColorScheme = ref(
    config?.darkColorScheme ??
      <CustomColorScheme<T>>{ ...defaultDarkColorScheme }
  );

  const usedColorScheme = computed(() => {
    let isDark = true;
    if (store.value === "auto") {
      isDark = system.value === "dark";
    } else {
      isDark = store.value === "dark";
    }
    const cs = <CustomColorScheme<T>>(
      (isDark ? darkColorScheme.value : lightColorScheme.value)
    );
    return { ...cs };
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
        const rbga = useColor().hexToRgbaArray(nV[key]);
        if (!rbga) {
          cssVar.value = nV[key];
        } else {
          cssVar.value = `${rbga[0]},${rbga[1]},${rbga[2]}`;
        }
      }
    }
  });

  // if (config) {
  //   if (config.lightColorScheme) {
  //     const a = config.lightColorScheme
  //     lightColorScheme.value =  config.lightColorScheme;
  //   }

  //   if (config.darkColorScheme) {
  //     darkColorScheme.value = config.darkColorScheme;
  //   }
  // }

  return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme };
};
