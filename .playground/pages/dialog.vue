<template>
  <div>
    <div class="h-[1000px]" />
    <div class="text-test bg-primary" @click="open = true">
      open dialog
    </div>

    <CamelotBaseDialog v-model:open="open" :query="{
      key: 'dialog',
      value: 'test'
    }">
      <div class="overflow-hidden rounded-xl shadow flex flex-col w-[90vw] h-[30vh] bg-surface-container ">
        <div class="flex justify-end">
          <i-material-symbols-close class="text-primary text-lg m-1 cursor-pointer" @click="open = false" />
        </div>
        <div class="flex-1 overflow-auto bg-gradient-to-b from-red-700 to-violet-800">
          <CamelotNumberCounter v-model="v" class="w-4" :max="10" :min="0" min-step-by-value used-min-step-by-value />
          <div class="h-[600px]" />
        </div>
      </div>
    </CamelotBaseDialog>

    <div class="text-test bg-primary my-4" @click="openBottomSheet = true">
      open BottomSheet
    </div>

    <CamelotBaseBottomSheet v-model:open="openBottomSheet" tag="bottom">
      <div class="overflow-hidden rounded-xl shadow flex flex-col w-screen h-[30vh] bg-surface-container ">
        <div class="flex justify-end">
          <i-material-symbols-close class="text-primary text-lg m-1 cursor-pointer" @click="openBottomSheet = false" />
        </div>
        <div class="flex-1 overflow-auto bg-gradient-to-b from-red-700 to-violet-800">
          <CamelotNumberCounter v-model="v" class="w-4" :max="10" :min="0" min-step-by-value used-min-step-by-value />
          <div class="text-test bg-primary" @click="open = true">
            open dialog
          </div>
          <div class="h-[600px]" />
        </div>
      </div>
    </CamelotBaseBottomSheet>

    <div class="text-test bg-primary" @click="openLoading">
      open loading
    </div>
    <CamelotLoading />
  </div>
</template>

<script setup lang="ts">
const v = ref(0.3)

const globalColorScheme = useCustomColorScheme<{ test: string }>(undefined, {
  lightColorScheme: {
    test: '#F40fFF'
  },
  darkColorScheme: {
    test: '#140fF1'
  }
})

const elLightColorScheme = ref<Material3ColorSchemePartial>({
  primary: 'yellow'
})

const open = ref(false)

const openBottomSheet = ref(false)

const openLoading = async () => {
  const closeable = useLoading().open('test')
  await useDelay(3000)
  closeable()
}

const data =
  Array.from({ length: 21 }).map((_, rowIndex) => {
    return {
      no: `${rowIndex}`,
      name: `分類-${rowIndex}`
    }
  })

const tabSelected = ref(0)

const department = ref('韓式餐廳')

const options = ref([
  {
    label: '韓式餐廳',
    value: '韓式餐廳'
  },
  {
    label: '港式餐廳',
    value: '港式餐廳'
  },
  {
    label: '港式餐廳',
    value: '港式餐廳'
  },
  {
    label: '港式餐廳',
    value: '港式餐廳'
  },
  {
    label: '港式餐廳',
    value: '港式餐廳'
  },
  {
    label: '港式餐廳',
    value: '港式餐廳'
  }
])
</script>

<style scoped></style>
