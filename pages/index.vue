import { useFloat } from '../composables/useFloat';
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
      <CamelotRippleEffect><div class="w-10 h-10" /></CamelotRippleEffect>
      <CamelotRippleEffect ripple-color="#034324"><div class="w-10 h-10" /></CamelotRippleEffect>

      <CamelotNumberCounter
        v-model="v"
        class="w-4"
        :max="10"
        :min="0"
        min-step-by-value
        used-min-step-by-value
      />

    </CamelotCustomColorSchemeProvider>

  </span>
</template>

<script setup lang="ts">
const v = ref(0.3);

watch(v,(nV)=>{
  console.log(useFloat().plus(nV,0.1));
});

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
  rippleColor:"#000FFF"
});

const changeCustom = () => {
  elCustomLightColorScheme.value.primary = "#F40fFF";
  elCustomLightColorScheme.value.test = "#44ffFF";
};


</script>

<style scoped></style>
