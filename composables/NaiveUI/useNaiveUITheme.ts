import { darkTheme } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";

import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";

// * 本身watch[useTheme]與[useMaterial3ColorScheme]，故其他地方不使用
// * 且會依照theme修改m3 color
class NaiveUITheme {
  constructor() {
    const m3 = useMaterial3ColorScheme();
    const systemTheme = useTheme();

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
      systemTheme.theme.storage,
      (nV) => {
        m3.themeMode.value = nV ?? "light";

        if (systemTheme.isDark) {
          // 有覆蓋黑暗模式時，使用暗黑模式
          // if (this.darkThemeOverrides.value) {
          //   this.theme.value = darkTheme;
          //   return;
          // }

          // 沒有覆蓋暗黑模式但有覆蓋一般模式時，使用一般模式
          // if (this.themeOverrides.value){
          //   this.theme.value = undefined;
          // }

          // 都沒有覆蓋行為則預設暗黑模式
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
