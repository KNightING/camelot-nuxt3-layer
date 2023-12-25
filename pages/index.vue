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

    <CamelotNumberCounter
      v-model="v"
      class="w-4"
      :max="10"
      :min="0"
      min-step-by-value
      used-min-step-by-value
    />

    <input v-model="v">

    <div
      class="text-test bg-primary"
      @click="open = true"
    >open dialog</div>

    <CamelotBaseDialog
      v-model:open="open"
    >
      <div class="overflow-hidden rounded-xl shadow flex flex-col w-[90vw] h-[30vh] bg-surface-container ">
        <div class="flex justify-end">
          <i-material-symbols-close
            class="text-primary text-lg m-1 cursor-pointer"
            @click="open = false"
          />
        </div>
        <div class="flex-1 overflow-auto bg-gradient-to-b from-red-700 to-violet-800">
          <CamelotNumberCounter
            v-model="v"
            class="w-4"
            :max="10"
            :min="0"
            min-step-by-value
            used-min-step-by-value
          />
          <div class="h-[600px]" />
        </div>

      </div>
    </CamelotBaseDialog>
  </span>
</template>

<script setup lang="ts">
const v = ref(0.3);

useCustomColorScheme<{ test: string }>(undefined,{
  lightColorScheme:{
  test: "#F40fFF",
},
darkColorScheme:{
  test: "#140fF1",
}
});

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
  elCustomLightColorScheme.value.primary = "#734F41";
  elCustomLightColorScheme.value.test = "#FF4F4F";
};

const open = ref(false);

</script>

<style scoped></style>
