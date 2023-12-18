<template>
  <span>
    <div class="text-primary">{{ useBaseUrl() }}</div>
    <div
      class="text-primary"
      @click="useColorMode().value = 'light'"
    >light</div>
    <div
      class="text-primary"
      @click="useColorMode().value = 'dark'"
    >dark</div>

    <div
      class="text-primary"
      @click="click"
    >test</div>

    <CamelotMaterial3Provider :light-color-scheme="elLightColorScheme">
      <div
        class="text-on-primary bg-primary"
        @click="change"
      >CHANGE</div>
    </CamelotMaterial3Provider>

    <CamelotCustomColorSchemeProvider :light-color-scheme="elCustomLightColorScheme">
      <div
        class="text-test bg-primary"
        @click="changeCustom"
      >CHANGE</div>
    </CamelotCustomColorSchemeProvider>
  </span>
</template>

<script setup lang="ts">
const { lightColorScheme, darkColorScheme } = useMaterial3ColorScheme();
const click = () => {
  lightColorScheme.value.primary = "red";
  darkColorScheme.value.primary = "blue";
};

const elLightColorScheme = ref<Material3ColorSchemePartial>({
  primary: "yellow",
});

const change = () => {
  elLightColorScheme.value.primary = "green";
};

const elCustomLightColorScheme = ref<CustomColorScheme<{ test: string }>>({
  primary: "#44ffFF",
  test: "#F40fFF",
});

const changeCustom = () => {
  elCustomLightColorScheme.value.primary = "#F40fFF";
  elCustomLightColorScheme.value.test = "#44ffFF";
};
</script>

<style scoped></style>
../composables/useCustomColorScheme
