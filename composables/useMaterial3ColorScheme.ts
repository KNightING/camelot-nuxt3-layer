import { isClient } from "@vueuse/core";

export const MaterialThemeSystem = "system";
export const MaterialThemeLight = "light";
export const MaterialThemeDark = "dark";

const ThemeValues = [
  MaterialThemeSystem,
  MaterialThemeLight,
  MaterialThemeDark,
];
export type MaterialThemeMode = (typeof ThemeValues)[number];

export type Material3ColorScheme = {
  primary?: string;
  primaryContainer?: string;
  onPrimary?: string;
  onPrimaryContainer?: string;
  inversePrimary?: string;
  secondary?: string;
  secondaryContainer?: string;
  onSecondary?: string;
  onSecondaryContainer?: string;
  tertiary?: string;
  tertiaryContainer?: string;
  onTertiary?: string;
  onTertiaryContainer?: string;
  surface?: string;
  surfaceDim?: string;
  surfaceBright?: string;
  surfaceContainerLowest?: string;
  surfaceContainerLow?: string;
  surfaceContainer?: string;
  surfaceContainerHigh?: string;
  surfaceContainerHighest?: string;
  surfaceVariant?: string;
  onSurface?: string;
  onSurfaceVariant?: string;
  inverseSurface?: string;
  inverseOnSurface?: string;
  background?: string;
  onBackground?: string;
  error?: string;
  errorContainer?: string;
  onError?: string;
  onErrorContainer?: string;
  outline?: string;
  outlineVariant?: string;
  shadow?: string;
  surfaceTint?: string;
  scrim?: string;
};

export const defaultColorScheme: Material3ColorScheme = {
  primary: "#6750a4",
  primaryContainer: "#eaddff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#21005e",
  inversePrimary: "#d0bcff",
  secondary: "#625b71",
  secondaryContainer: "#e8def8",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#1e192b",
  tertiary: "#7d5260",
  tertiaryContainer: "#ffd8e4",
  onTertiary: "#ffffff",
  onTertiaryContainer: "#370b1e",
  surface: "#fef7ff",
  surfaceDim: "#ded8e1",
  surfaceBright: "#fef7ff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f7f2fa",
  surfaceContainer: "#f3edf7",
  surfaceContainerHigh: "#ece6f0",
  surfaceContainerHighest: "#e6e0e9",
  surfaceVariant: "#e7e0ec",
  onSurface: "#1c1b1f",
  onSurfaceVariant: "#49454e",
  inverseSurface: "#313033",
  inverseOnSurface: "#f4eff4",
  background: "#fef7ff",
  onBackground: "#1c1b1f",
  error: "#b3261e",
  errorContainer: "#f9dedc",
  onError: "#ffffff",
  onErrorContainer: "#410e0b",
  outline: "#79747e",
  outlineVariant: "#c4c7c5",
  shadow: "#000000",
  surfaceTint: "#6750a4",
  scrim: "#000000",
};

export const defaultDarkColorScheme: Material3ColorScheme = {
  primary: "#d0bcff",
  primaryContainer: "#4f378b",
  onPrimary: "#371e73",
  onPrimaryContainer: "#eaddff",
  inversePrimary: "#6750a4",
  secondary: "#ccc2dc",
  secondaryContainer: "#4a4458",
  onSecondary: "#332d41",
  onSecondaryContainer: "#e8def8",
  tertiary: "#efb8c8",
  tertiaryContainer: "#633b48",
  onTertiary: "#492532",
  onTertiaryContainer: "#ffd8e4",
  surface: "#141218",
  surfaceDim: "#141218",
  surfaceBright: "#3b383e",
  surfaceContainerLowest: "#0f0d13",
  surfaceContainerLow: "#1d1b20",
  surfaceContainer: "#211f26",
  surfaceContainerHigh: "#2b2930",
  surfaceContainerHighest: "#36343b",
  surfaceVariant: "#49454f",
  onSurface: "#e6e1e5",
  onSurfaceVariant: "#cac4d0",
  inverseSurface: "#e6e1e5",
  inverseOnSurface: "#313033",
  background: "#141218",
  onBackground: "#e6e1e5",
  error: "#f2b8b5",
  errorContainer: "#8c1d18",
  onError: "#601410",
  onErrorContainer: "#f9dedc",
  outline: "#938f99",
  outlineVariant: "#444746",
  shadow: "#000000",
  surfaceTint: "#d0bcff",
  scrim: "#000000",
};

export class Material3ColorSchemeProvider {
  constructor(
    target?: Ref<HTMLElement>,
    themeMode?: Ref<MaterialThemeMode>,
    editMode?: boolean
  ) {
    this.themeMode = themeMode ?? ref("system");

    const getCssVar = (key: string) =>
      useElCssVar(key, target, { inherit: false });

    this.primary = getCssVar("--material3-primary");
    this.primaryContainer = getCssVar("--material3-primary-container");
    this.onPrimary = getCssVar("--material3-on-primary");
    this.onPrimaryContainer = getCssVar("--material3-on-primary-container");
    this.inversePrimary = getCssVar("--material3-inverse-primary");
    this.secondary = getCssVar("--material3-secondary");
    this.secondaryContainer = getCssVar("--material3-secondary-container");
    this.onSecondary = getCssVar("--material3-on-secondary");
    this.onSecondaryContainer = getCssVar("--material3-on-secondary-container");
    this.tertiary = getCssVar("--material3-tertiary");
    this.tertiaryContainer = getCssVar("--material3-tertiary-container");
    this.onTertiary = getCssVar("--material3-on-tertiary");
    this.onTertiaryContainer = getCssVar("--material3-on-tertiary-container");
    this.surface = getCssVar("--material3-surface");
    this.surfaceDim = getCssVar("--material3-surface-dim");
    this.surfaceBright = getCssVar("--material3-surface-bright");
    this.surfaceContainerLowest = getCssVar(
      "--material3-surface-container-lowest"
    );
    this.surfaceContainerLow = getCssVar("--material3-surface-container-low");
    this.surfaceContainer = getCssVar("--material3-surface-container");
    this.surfaceContainerHigh = getCssVar("--material3-surface-container-high");
    this.surfaceContainerHighest = getCssVar(
      "--material3-surface-container-highest"
    );
    this.surfaceVariant = getCssVar("--material3-surface-variant");
    this.onSurface = getCssVar("--material3-on-surface");
    this.onSurfaceVariant = getCssVar("--material3-on-surface-variant");
    this.inverseSurface = getCssVar("--material3-inverse-surface");
    this.inverseOnSurface = getCssVar("--material3-inverse-on-surface");
    this.background = getCssVar("--material3-background");
    this.onBackground = getCssVar("--material3-on-background");
    this.error = getCssVar("--material3-error");
    this.errorContainer = getCssVar("--material3-error-container");
    this.onError = getCssVar("--material3-on-error");
    this.onErrorContainer = getCssVar("--material3-on-error-container");
    this.outline = getCssVar("--material3-outline");
    this.outlineVariant = getCssVar("--material3-outline-variant");
    this.shadow = getCssVar("--material3-shadow");
    this.surfaceTint = getCssVar("--material3-surface-tint");
    this.scrim = getCssVar("--material3-scrim");

    watch(this.usedColorScheme, (colorScheme) => {
      if (!colorScheme) return;
      if (colorScheme.primary) this.primary.value = colorScheme.primary;
      if (colorScheme.primaryContainer)
        this.primaryContainer.value = colorScheme.primaryContainer;
      if (colorScheme.primaryContainer)
        this.primaryContainer.value = colorScheme.primaryContainer;
      if (colorScheme.onPrimary) this.onPrimary.value = colorScheme.onPrimary;
      if (colorScheme.onPrimaryContainer)
        this.onPrimaryContainer.value = colorScheme.onPrimaryContainer;
      if (colorScheme.inversePrimary)
        this.inversePrimary.value = colorScheme.inversePrimary;
      if (colorScheme.secondary) this.secondary.value = colorScheme.secondary;
      if (colorScheme.secondaryContainer)
        this.secondaryContainer.value = colorScheme.secondaryContainer;
      if (colorScheme.onSecondary)
        this.onSecondary.value = colorScheme.onSecondary;
      if (colorScheme.onSecondaryContainer)
        this.onSecondaryContainer.value = colorScheme.onSecondaryContainer;
      if (colorScheme.tertiary) this.tertiary.value = colorScheme.tertiary;
      if (colorScheme.tertiaryContainer)
        this.tertiaryContainer.value = colorScheme.tertiaryContainer;
      if (colorScheme.onTertiary)
        this.onTertiary.value = colorScheme.onTertiary;
      if (colorScheme.onTertiaryContainer)
        this.onTertiaryContainer.value = colorScheme.onTertiaryContainer;
      if (colorScheme.surface) this.surface.value = colorScheme.surface;
      if (colorScheme.surfaceDim)
        this.surfaceDim.value = colorScheme.surfaceDim;
      if (colorScheme.surfaceBright)
        this.surfaceBright.value = colorScheme.surfaceBright;
      if (colorScheme.surfaceContainerLowest)
        this.surfaceContainerLowest.value = colorScheme.surfaceContainerLowest;
      if (colorScheme.surfaceContainerLow)
        this.surfaceContainerLow.value = colorScheme.surfaceContainerLow;
      if (colorScheme.surfaceContainer)
        this.surfaceContainer.value = colorScheme.surfaceContainer;
      if (colorScheme.surfaceContainerHigh)
        this.surfaceContainerHigh.value = colorScheme.surfaceContainerHigh;
      if (colorScheme.surfaceContainerHighest)
        this.surfaceContainerHighest.value =
          colorScheme.surfaceContainerHighest;
      if (colorScheme.surfaceVariant)
        this.surfaceVariant.value = colorScheme.surfaceVariant;
      if (colorScheme.onSurface) this.onSurface.value = colorScheme.onSurface;
      if (colorScheme.onSurfaceVariant)
        this.onSurfaceVariant.value = colorScheme.onSurfaceVariant;
      if (colorScheme.inverseSurface)
        this.inverseSurface.value = colorScheme.inverseSurface;
      if (colorScheme.inverseOnSurface)
        this.inverseOnSurface.value = colorScheme.inverseOnSurface;
      if (colorScheme.background)
        this.background.value = colorScheme.background;
      if (colorScheme.onBackground)
        this.onBackground.value = colorScheme.onBackground;
      if (colorScheme.error) this.error.value = colorScheme.error;
      if (colorScheme.errorContainer)
        this.errorContainer.value = colorScheme.errorContainer;
      if (colorScheme.onError) this.onError.value = colorScheme.onError;
      if (colorScheme.onErrorContainer)
        this.onErrorContainer.value = colorScheme.onErrorContainer;
      if (colorScheme.outline) this.outline.value = colorScheme.outline;
      if (colorScheme.outlineVariant)
        this.outlineVariant.value = colorScheme.outlineVariant;
      if (colorScheme.shadow) this.shadow.value = colorScheme.shadow;
      if (colorScheme.surfaceTint)
        this.surfaceTint.value = colorScheme.surfaceTint;
      if (colorScheme.scrim) this.scrim.value = colorScheme.scrim;
    });

    if (isClient) {
      if (target) {
        watch(
          [
            this.themeMode,
            target,
            this.customColorScheme,
            this.darkCustomColorScheme,
          ],
          (nV) => {
            if (
              nV[2] &&
              (!editMode ||
                (editMode && this.usedColorScheme.value === undefined))
            ) {
              this.updateScheme();
            }
          },
          { immediate: false }
        );
      } else {
        watch(
          [this.themeMode, this.customColorScheme, this.darkCustomColorScheme],
          (nV) => {
            this.updateScheme();
          },
          { immediate: true }
        );
      }
    }
  }

  private updateScheme = () => {
    let customColorScheme = this.customColorSchemeRef.value;
    switch (this.themeMode.value) {
      case "system":
        {
          if (useTheme().isDark.value) {
            customColorScheme =
              this.darkCustomColorSchemeRef.value ?? customColorScheme;
          }
        }
        break;
      case "dark":
        customColorScheme =
          this.darkCustomColorSchemeRef.value ?? customColorScheme;
        break;
    }
    this.usedColorScheme.value = customColorScheme;
  };

  public themeMode: Ref<MaterialThemeMode>;

  public primary: Ref<string>;
  public primaryContainer: Ref<string>;
  public onPrimary: Ref<string>;
  public onPrimaryContainer: Ref<string>;
  public inversePrimary: Ref<string>;
  public secondary: Ref<string>;
  public secondaryContainer: Ref<string>;
  public onSecondary: Ref<string>;
  public onSecondaryContainer: Ref<string>;
  public tertiary: Ref<string>;
  public tertiaryContainer: Ref<string>;
  public onTertiary: Ref<string>;
  public onTertiaryContainer: Ref<string>;
  public surface: Ref<string>;
  public surfaceDim: Ref<string>;
  public surfaceBright: Ref<string>;
  public surfaceContainerLowest: Ref<string>;
  public surfaceContainerLow: Ref<string>;
  public surfaceContainer: Ref<string>;
  public surfaceContainerHigh: Ref<string>;
  public surfaceContainerHighest: Ref<string>;
  public surfaceVariant: Ref<string>;
  public onSurface: Ref<string>;
  public onSurfaceVariant: Ref<string>;
  public inverseSurface: Ref<string>;
  public inverseOnSurface: Ref<string>;
  public background: Ref<string>;
  public onBackground: Ref<string>;
  public error: Ref<string>;
  public errorContainer: Ref<string>;
  public onError: Ref<string>;
  public onErrorContainer: Ref<string>;
  public outline: Ref<string>;
  public outlineVariant: Ref<string>;
  public shadow: Ref<string>;
  public surfaceTint: Ref<string>;
  public scrim: Ref<string>;

  public usedColorScheme = ref<Material3ColorScheme>();

  private customColorSchemeRef = ref<Material3ColorScheme>(defaultColorScheme);

  public customColorScheme = computed({
    get: () => this.customColorSchemeRef.value,
    set: (nV) => {
      if (nV) {
        this.customColorSchemeRef.value = {
          ...defaultColorScheme,
          ...nV,
        };
      }
    },
  });

  private darkCustomColorSchemeRef = ref<Material3ColorScheme>(
    defaultDarkColorScheme
  );

  public darkCustomColorScheme = computed({
    get: () => this.darkCustomColorSchemeRef.value,
    set: (nV) => {
      if (nV) {
        this.darkCustomColorSchemeRef.value = {
          ...defaultDarkColorScheme,
          ...nV,
        };
      }
    },
  });
}

let globalMaterial3ColorSchemeProvider:
  | Material3ColorSchemeProvider
  | undefined;

export const useMaterial3ColorScheme = (
  target?: Ref<HTMLElement>,
  themeMode?: Ref<MaterialThemeMode>,
  editMode?: boolean
) => {
  if (target) {
    return new Material3ColorSchemeProvider(target, themeMode, editMode);
  } else {
    return (
      globalMaterial3ColorSchemeProvider ??
      (() => {
        globalMaterial3ColorSchemeProvider = new Material3ColorSchemeProvider();
        return globalMaterial3ColorSchemeProvider;
      })()
    );
  }
};
