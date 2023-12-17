<template>
  <ClientOnly>
    <n-config-provider :theme="naiveTheme" :theme-overrides="naiveThemeOverrides">
      <n-notification-provider>
        <n-message-provider placement="bottom">
          <div class="min-h-screen bg-surface transition-all duration-300 flex flex-col">
            <NuxtLoadingIndicator />
            <slot></slot>
          </div>
        </n-message-provider>
      </n-notification-provider>
    </n-config-provider>
  </ClientOnly>
</template>

<script setup lang="ts">
const naiveUITheme = useNaiveUITheme();
const naiveTheme = naiveUITheme.theme;
const naiveThemeOverrides = naiveUITheme.themeOverrides;

const m3 = useMaterial3ColorScheme();

m3.customColorScheme.value = {
  ...defaultColorScheme,
  primary: "#94EDE4",
  primaryContainer: "#5ab9d5",
};

m3.darkCustomColorScheme.value = {
  ...defaultColorScheme,
  primary: "#f0c142",
  primaryContainer: "#f0c344",
};
</script>

<style scoped></style>
