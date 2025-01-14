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
  targetRef?: MaybeElementRef,
  config?: {
    lightColorScheme?: CustomColorScheme<T>
    darkColorScheme?: CustomColorScheme<T>
    cssVarKeyPrefix?: string
    editable?: boolean
  },
) => {
  if (!isClient) {
    return
  }
  const target = targetRef ?? document.body

  if (target === document.body) {
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

  const lightColorScheme = target
    ? ref(
        {
          ...globalLightColorScheme.value,
          ...(config?.lightColorScheme ? config?.lightColorScheme : {}),
        },
      )
    : globalLightColorScheme
  const darkColorScheme = target
    ? ref(
        {
          ...globalDarkColorScheme.value,
          ...(config?.darkColorScheme ? config?.darkColorScheme : {}),
        },
      )
    : globalDarkColorScheme

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
    return { ...cs }
  })

  const changeCase = useChangeCase('', 'kebabCase')

  if (target) {
    watchImmediate(usedColorScheme, (nV) => {
      if (config?.editable === false) {
        return
      }

      for (const key in nV) {
        if (useIsValidKey(key, nV)) {
          changeCase.value = key
          let cssVarKey = changeCase.value

          // 因為tailwind V4 會將 變數放到 :root 導致無法覆蓋 所以需要多一個變數重新設定
          let cssVarOverrideTailwindKey = changeCase.value
          if (Material3ColorSchemeKeys.includes(key)) {
            // cssVarKey = `--cml-m3-${cssVarKey}`
            cssVarOverrideTailwindKey = `--color-${cssVarOverrideTailwindKey}`
            cssVarKey = `--cml-m3-${cssVarKey}`
          } else if (CamelotColorSchemeKeys.includes(key)) {
            // cssVarKey = `--cml-${cssVarKey}`
            cssVarOverrideTailwindKey = `--color-${cssVarOverrideTailwindKey}`
            cssVarKey = `--cml-c-${cssVarKey}`
          } else if (config?.cssVarKeyPrefix) {
            cssVarKey = `--${config.cssVarKeyPrefix}-${cssVarKey}`
          } else {
            // cssVarKey = `--custom-${cssVarKey}`
            cssVarOverrideTailwindKey = `--color-${cssVarOverrideTailwindKey}`
            cssVarKey = `--cml-x-${cssVarKey}`
          }
          const cssVar = getCssVar(cssVarKey, target)
          const cssVarOverrideTailwind = getCssVar(cssVarOverrideTailwindKey, target)

          // const rgba = useColor().hexToRgbaArray(nV[key])
          // if (!rgba) {
          //   cssVar.value = nV[key]
          // } else {
          //   cssVar.value = `${rgba[0]},${rgba[1]},${rgba[2]}`
          // }
          cssVar.value = nV[key]
          cssVarOverrideTailwind.value = `var(${cssVarKey})`
        }
      }
    })
  }

  // if (config) {
  //   if (config.lightColorScheme) {
  //     const a = config.lightColorScheme
  //     lightColorScheme.value =  config.lightColorScheme;
  //   }

  //   if (config.darkColorScheme) {
  //     darkColorScheme.value = config.darkColorScheme;
  //   }
  // }

  return { mode: store, lightColorScheme, darkColorScheme, usedColorScheme }
}
