import { isClient, type MaybeElementRef } from '@vueuse/core'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import { Material3ColorSchemeKeys } from './useMaterial3ColorScheme'

type CamelotColorScheme = {
  rippleColor: string
  maskColor: string
}

export const CamelotColorSchemeKeys = Object.keys(
  <CamelotColorScheme>{
    rippleColor: '',
    maskColor: '',
  },
) as (keyof CamelotColorScheme)[]

export type CustomColorScheme<T = any> = Material3ColorSchemePartial &
  Partial<CamelotColorScheme> &
  Partial<T>

const getCssVar = (key: string, target?: MaybeElementRef) =>
  useElCssVar(`${key}`, target, { inherit: false })

const { system, store } = useColorMode()

const defaultCamelotLightColorScheme: CamelotColorScheme = {
  rippleColor: '#111827',
  maskColor: '#111827',
}

const defaultCamelotDarkColorScheme: CamelotColorScheme = {
  rippleColor: '#111827',
  maskColor: '#111827',
}

const globalLightColorScheme = ref<CustomColorScheme<any>>({ ...defaultColorScheme, ...defaultCamelotLightColorScheme })

const globalDarkColorScheme = ref<CustomColorScheme<any>>({ ...defaultDarkColorScheme, ...defaultCamelotDarkColorScheme })

/**
 *
 * ! 建議自定義的顏色light dark模式都需要設定，因為不會刪除設定過的顏色
 * ! 主題切換不會移除前個主題遺留的變數，只會覆蓋方式
 * @param target use global color when target is null
 * @param config
 * @returns
 */
export const useCustomColorScheme = <T>(
  targetRef: MaybeElementRef,
  config?: {
    lightColorScheme?: CustomColorScheme<T>
    darkColorScheme?: CustomColorScheme<T>
    cssVarKeyPrefix?: string
    editable?: boolean
  },
) => {
  if (!isClient) {
    const lightColorScheme = globalDarkColorScheme
    const darkColorScheme = globalDarkColorScheme
    const usedColorScheme = globalDarkColorScheme

    return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme }
  }

  const isGlobal = targetRef === document.documentElement

  if (isGlobal) {
    if (config?.lightColorScheme) {
      globalLightColorScheme.value = {
        ...globalLightColorScheme.value,
        ...config.lightColorScheme,
      }
    }

    if (config?.darkColorScheme) {
      globalDarkColorScheme.value = {
        ...globalDarkColorScheme.value,
        ...config.darkColorScheme,
      }
    }
  }

  const lightColorScheme = isGlobal
    ? globalLightColorScheme
    : ref(
        {
          ...globalLightColorScheme.value,
          ...(config?.lightColorScheme ? config?.lightColorScheme : {}),
        },
      )

  const darkColorScheme = isGlobal
    ? globalDarkColorScheme
    : ref(
        {
          ...globalDarkColorScheme.value,
          ...(config?.darkColorScheme ? config?.darkColorScheme : {}),
        },
      )

  const usedColorScheme = computed<CustomColorScheme<T>>(() => {
    let isDark = true
    if (store.value === 'auto') {
      isDark = system.value === 'dark'
    } else {
      isDark = store.value === 'dark'
    }

    const cs = <CustomColorScheme<T>>(
        (isDark ? darkColorScheme.value : lightColorScheme.value)
      )
    console.log(isGlobal, 'cs', cs, lightColorScheme.value)
    return cs
  })

  const changeCase = useChangeCase('', 'kebabCase')

  watchImmediate([usedColorScheme, () => unrefElement(targetRef)], ([colorScheme, target]) => {
    if (!target) {
      return
    }

    if (config?.editable === false) {
      return
    }

    console.log('target', target, colorScheme)

    for (const key in colorScheme) {
      if (useIsValidKey(key, colorScheme)) {
        changeCase.value = key
        let cssVarKey = changeCase.value
        if (Material3ColorSchemeKeys.includes(key)) {
          cssVarKey = `--material3-${cssVarKey}`
        } else if (CamelotColorSchemeKeys.includes(key)) {
          cssVarKey = `--camelot-${cssVarKey}`
        } else if (config?.cssVarKeyPrefix) {
          cssVarKey = `--${config.cssVarKeyPrefix}-${cssVarKey}`
        } else {
          cssVarKey = `--custom-${cssVarKey}`
        }
        const cssVar = getCssVar(cssVarKey, targetRef)
        const rgba = useColor().hexToRgbaArray(colorScheme[key])
        if (!rgba) {
          cssVar.value = colorScheme[key]
        } else {
          cssVar.value = `${rgba[0]},${rgba[1]},${rgba[2]}`
        }
      }
    }
  })

  return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme }
}
