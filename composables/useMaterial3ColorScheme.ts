import { type MaybeElementRef } from '@vueuse/core'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

export type Material3ColorScheme = {
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  inversePrimary: string;
  secondary: string;
  secondaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  background: string;
  onBackground: string;
  error: string;
  errorContainer: string;
  onError: string;
  onErrorContainer: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  surfaceTint: string;
  scrim: string;
};

export type Material3ColorSchemePartial = Partial<Material3ColorScheme>;

// Default color scheme

export const defaultColorScheme: Material3ColorScheme = {
  primary: '#6750a4',
  primaryContainer: '#eaddff',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#21005e',
  inversePrimary: '#d0bcff',
  secondary: '#625b71',
  secondaryContainer: '#e8def8',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#1e192b',
  tertiary: '#7d5260',
  tertiaryContainer: '#ffd8e4',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#370b1e',
  surface: '#fef7ff',
  surfaceDim: '#ded8e1',
  surfaceBright: '#fef7ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f7f2fa',
  surfaceContainer: '#f3edf7',
  surfaceContainerHigh: '#ece6f0',
  surfaceContainerHighest: '#e6e0e9',
  surfaceVariant: '#e7e0ec',
  onSurface: '#1c1b1f',
  onSurfaceVariant: '#49454e',
  inverseSurface: '#313033',
  inverseOnSurface: '#f4eff4',
  background: '#fef7ff',
  onBackground: '#1c1b1f',
  error: '#b3261e',
  errorContainer: '#f9dedc',
  onError: '#ffffff',
  onErrorContainer: '#410e0b',
  outline: '#79747e',
  outlineVariant: '#c4c7c5',
  shadow: '#000000',
  surfaceTint: '#6750a4',
  scrim: '#000000'
}

export const defaultDarkColorScheme: Material3ColorScheme = {
  primary: '#d0bcff',
  primaryContainer: '#4f378b',
  onPrimary: '#371e73',
  onPrimaryContainer: '#eaddff',
  inversePrimary: '#6750a4',
  secondary: '#ccc2dc',
  secondaryContainer: '#4a4458',
  onSecondary: '#332d41',
  onSecondaryContainer: '#e8def8',
  tertiary: '#efb8c8',
  tertiaryContainer: '#633b48',
  onTertiary: '#492532',
  onTertiaryContainer: '#ffd8e4',
  surface: '#141218',
  surfaceDim: '#141218',
  surfaceBright: '#3b383e',
  surfaceContainerLowest: '#0f0d13',
  surfaceContainerLow: '#1d1b20',
  surfaceContainer: '#211f26',
  surfaceContainerHigh: '#2b2930',
  surfaceContainerHighest: '#36343b',
  surfaceVariant: '#49454f',
  onSurface: '#e6e1e5',
  onSurfaceVariant: '#cac4d0',
  inverseSurface: '#e6e1e5',
  inverseOnSurface: '#313033',
  background: '#141218',
  onBackground: '#e6e1e5',
  error: '#f2b8b5',
  errorContainer: '#8c1d18',
  onError: '#601410',
  onErrorContainer: '#f9dedc',
  outline: '#938f99',
  outlineVariant: '#444746',
  shadow: '#000000',
  surfaceTint: '#d0bcff',
  scrim: '#000000'
}

export const Material3ColorSchemeKeys = Object.keys(
  defaultColorScheme
) as (keyof Material3ColorScheme)[]

type Material3ColorSchemeConfig = {
  lightColorScheme?: Material3ColorSchemePartial;
  darkColorScheme?: Material3ColorSchemePartial;
  editMode?: boolean;
};

const { system, store } = useColorMode()

const getCssVar = (key: string, target?: MaybeElementRef) =>
  useElCssVar(`--material3-${key}`, target, { inherit: false })

const globalLightColorScheme =
  ref<Material3ColorSchemePartial>(defaultColorScheme)

const globalDarkColorScheme = ref<Material3ColorSchemePartial>(
  defaultDarkColorScheme
)

const globalUsedColorScheme = computed(() => {
  let isDark = true
  if (store.value === 'auto') {
    isDark = system.value === 'dark'
  } else {
    isDark = store.value === 'dark'
  }
  return {
    ...(isDark ? globalDarkColorScheme.value : globalLightColorScheme.value)
  }
})

// const globalChangeCase = useChangeCase("", "paramCase");

// watchImmediate(globalUsedColorScheme, (nV) => {
//   for (const key in nV) {
//     if (useIsValidKey(key, nV)) {
//       globalChangeCase.value = key;
//       const cssVar = getCssVar(globalChangeCase.value);
//       const rbga = useColor().hexToRgbaArray(nV[key]);
//       if (!rbga) {
//         cssVar.value = nV[key];
//       } else {
//         cssVar.value = `${rbga[0]},${rbga[1]},${rbga[2]}`;
//       }
//     }
//   }
// });

export const useGlobalMaterial3ColorScheme = (
  config?: Material3ColorSchemeConfig
) => {
  if (config?.lightColorScheme) {
    globalLightColorScheme.value = config?.lightColorScheme
  }

  if (config?.darkColorScheme) {
    globalDarkColorScheme.value = config?.darkColorScheme
  }

  return {
    mode: store,
    lightColorScheme: globalLightColorScheme,
    darkColorScheme: globalDarkColorScheme,
    usedColorScheme: globalUsedColorScheme
  }
}

export const useMaterial3ColorScheme = (
  target?: MaybeElementRef,
  config?: Material3ColorSchemeConfig
) => {
  if (!target) {
    return useGlobalMaterial3ColorScheme(config)
  }

  const lightColorScheme = ref<Material3ColorSchemePartial>(
    config?.lightColorScheme ?? globalLightColorScheme.value
  )
  const darkColorScheme = ref<Material3ColorSchemePartial>(
    config?.darkColorScheme ?? globalDarkColorScheme.value
  )

  const usedColorScheme = computed(() => {
    let isDark = true
    if (store.value === 'auto') {
      isDark = system.value === 'dark'
    } else {
      isDark = store.value === 'dark'
    }
    return { ...(isDark ? darkColorScheme.value : lightColorScheme.value) }
  })

  const changeCase = useChangeCase('', 'paramCase')

  watchImmediate(usedColorScheme, (nV) => {
    if (config?.editMode === false) { return }

    for (const key in nV) {
      if (useIsValidKey(key, nV)) {
        changeCase.value = key
        const cssVar = getCssVar(changeCase.value, target)
        const rbga = useColor().hexToRgbaArray(nV[key])
        if (!rbga) {
          cssVar.value = nV[key]
        } else {
          cssVar.value = `${rbga[0]},${rbga[1]},${rbga[2]}`
        }
      }
    }
  })

  if (config) {
    if (config.lightColorScheme) {
      lightColorScheme.value = config.lightColorScheme
    }

    if (config.darkColorScheme) {
      darkColorScheme.value = config.darkColorScheme
    }
  }

  return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme }
}
