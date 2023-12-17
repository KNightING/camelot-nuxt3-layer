import type { GlobalThemeOverrides } from "naive-ui";

function getThemeFromMaterial3ColorScheme(
  cs: Material3ColorScheme
): GlobalThemeOverrides {
  const color = useColor();
  const primaryLightness = color.lightness(cs.primary);
  const primaryDarkness = color.darkness(cs.primary);

  return {
    common: {
      primaryColor: cs.primary,
      borderColor: cs.primary,
      errorColor: cs.error,
      textColorBase: cs.primary,
      textColor1: cs.onSurface,

      // * [Select] Border Hover Color
      primaryColorHover: cs.primary,

      // * [Select] 選項的顏色
      // * [Select] 選擇後的顏色
      textColor2: cs.onSurface,

      textColorDisabled: cs.outline,

      // * [Select] 清單背景的顏色
      popoverColor: cs.surfaceContainer,

      // * [Select] 輸入框的顏色
      inputColor: cs.surface,

      // * [Select] Placeholder的顏色
      placeholderColor: cs.outline,

      // * [Select] Arrow Icon的顏色
      iconColor: cs.onSurface,

      hoverColor: color.hexToRgba(cs.onSurface, 0.1),
    },
    Button: {
      textColor: cs.primary,
      textColorHover: primaryLightness,
      textColorPressed: primaryDarkness,
      textColorFocus: primaryLightness,
      colorSecondary: cs.secondary,
      colorSecondaryHover: color.lightness(cs.secondary),
      colorSecondaryPressed: color.darkness(cs.secondary),

      border: `1px solid ${cs.primary}`,
      borderHover: `1px solid ${primaryLightness}`,
      borderPressed: `1px solid ${primaryDarkness}`,
      borderFocus: `1px solid ${primaryLightness}`,

      colorPrimary: cs.primary,
      colorHoverPrimary: primaryLightness,
      colorPressedPrimary: primaryDarkness,
      colorFocusPrimary: primaryLightness,
      textColorPrimary: cs.onPrimary,
      borderHoverPrimary: `1px solid ${primaryLightness}`,
      borderPressedPrimary: `1px solid ${primaryDarkness}`,
      borderFocusPrimary: `1px solid ${primaryLightness}`,

      colorTertiary: cs.tertiary,
      colorTertiaryHover: color.lightness(cs.tertiary),
      colorTertiaryPressed: color.darkness(cs.tertiary),
      textColorTertiary: cs.onTertiary,
      colorError: cs.error,
      colorErrorHover: color.lightness(cs.error),
      colorErrorPressed: color.darkness(cs.error),
      textColorError: cs.onError,
    },
    Layout: {
      siderColor: cs.surfaceContainer,
    },
    Menu: {
      // drawer
      itemIconColorCollapsed: cs.onSurface,
      itemIconColor: cs.onSurface,
      itemIconColorHover: cs.onSurface,
      itemTextColor: cs.onSurface,
      itemTextColorHover: cs.onSurface,
      arrowColor: cs.onSurface,
      arrowColorHover: cs.onSurface,
      itemColorHover: cs.primaryContainer,
      itemColorActive: cs.primaryContainer,
    },
  };
}

export const useNaiveUIUtil = () => {
  return { getThemeFromMaterial3ColorScheme };
};
