<template>
  <div>
    <CamelotCustomColorSchemeProvider
      :light-color-scheme="lightColorScheme"
      :dark-color-scheme="darkColorScheme"
    >
      <div
        class="text-test bg-primary"
        @click="open = true"
      >
        open dialog
      </div>

      <CamelotBaseDialogV2
        v-model:open="open"
        :close-by-mask="false"
        :query="{
          key: 'dialog',
          value: 'test',
        }"
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
      </CamelotBaseDialogV2>
    </CamelotCustomColorSchemeProvider>

    <div class="h-[1000px]" />
    <div
      class="text-test bg-primary"
      @click="open = true"
    >
      open dialog
    </div>

    <div
      class="text-test bg-primary my-4"
      @click="openBottomSheet = true"
    >
      open BottomSheet
    </div>

    <CamelotBaseBottomSheetV2
      v-model:open="openBottomSheet"
      tag="bottom"
    >
      <div class="overflow-hidden rounded-xl shadow flex flex-col w-screen h-[30vh] bg-surface-container ">
        <div class="flex justify-end">
          <i-material-symbols-close
            class="text-primary text-lg m-1 cursor-pointer"
            @click="openBottomSheet = false"
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
          <div
            class="text-test bg-primary"
            @click="open = true"
          >
            open dialog
          </div>
          <div class="h-[600px]" />
        </div>
      </div>
    </CamelotBaseBottomSheetV2>

    <div
      class="text-test bg-primary"
      @click="openLoading"
    >
      open loading
    </div>
    <CamelotLoading />
  </div>
</template>

<script setup lang="ts">
import { SelectOptions } from '#types/selectOptions'

const v = ref(0.3)

const { lightColorScheme, darkColorScheme } = useCustomColorScheme<{ test: string }>(undefined, {
  lightColorScheme: {
    primary: '#1C32DAFF',
    test: '#F40fFF',
  },
  darkColorScheme: {
    primary: '#0EBEEAFF',
    test: '#140fF1',
  },
})

const open = ref(false)

const openBottomSheet = ref(false)

const openLoading = async () => {
  const closeable = useLoading().open('test')
  await useDelay(3000)
  closeable()
}
</script>

<style scoped></style>
