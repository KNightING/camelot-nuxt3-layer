import { darkTheme, type GlobalThemeOverrides } from "naive-ui";

import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";

// * 本身watch[useTheme]與[useMaterial3ColorScheme]，故其他地方不使用
// * 且會依照theme修改m3 color
class NaiveUITheme {
  constructor() {
    const m3 = useMaterial3ColorScheme();
    const { system, store } = useColorMode();

    watch(
      m3.usedColorScheme,
      (nV) => {
        if (nV)
          this.themeOverrides.value =
            useNaiveUIUtil().getThemeFromMaterial3ColorScheme(nV);
      },
      { immediate: true }
    );

    watch(
      system,
      (nV) => {
        if (nV === "dark") {
          this.theme.value = darkTheme;
          return;
        }
        this.theme.value = undefined;
        return;
      },
      { immediate: true }
    );
  }

  public theme = ref<BuiltInGlobalTheme | undefined>(undefined);

  public themeOverrides = ref<GlobalThemeOverrides | undefined>();
}

const naiveUITheme = new NaiveUITheme();

export const useNaiveUITheme = () => naiveUITheme;
