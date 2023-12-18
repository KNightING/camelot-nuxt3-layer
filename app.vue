<template>
  <ClientOnly>
    <CamelotCustomColorSchemeProvider :light-color-scheme="elCustomLightColorScheme">
      <n-config-provider
        :theme="naiveTheme"
        :theme-overrides="naiveThemeOverrides"
      >
        <n-notification-provider>
          <n-message-provider placement="bottom">
            <div class="min-h-screen bg-surface transition-all duration-300 flex flex-col">
              <NuxtLoadingIndicator />
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </div>
          </n-message-provider>
        </n-notification-provider>
      </n-config-provider>
    </CamelotCustomColorSchemeProvider>
  </ClientOnly>
</template>

<script setup lang="ts">
const elCustomLightColorScheme = ref<CustomColorScheme<{ test2: string }>>({
  primary: "#44ffFF",
  test2: "#F40fFF",
});

const naiveUITheme = useNaiveUITheme(elCustomLightColorScheme);
const naiveTheme = naiveUITheme.naiveTheme;
const naiveThemeOverrides = naiveUITheme.naiveThemeOverride;

</script>
