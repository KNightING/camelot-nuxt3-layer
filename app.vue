<template>
  <ClientOnly>
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
  </ClientOnly>
</template>

<script setup lang="ts">

const naiveUITheme = useNaiveUITheme();
const naiveTheme = naiveUITheme.theme;
const naiveThemeOverrides = naiveUITheme.themeOverrides;

</script>
