<template>
  <div>
    <div class="text-primary">
      {{ useBaseUrl() }}
    </div>
    <div
      class="text-primary"
      @click="useColorMode().value = 'light'"
    >
      light
    </div>
    <div
      class="text-primary"
      @click="useColorMode().value = 'dark'"
    >
      dark
    </div>
    <button
      type="button"
      @click="useRouter().push('/dialog')"
    >
      go to dialog
    </button>

    <!-- <CamelotCustomColorSchemeProvider :light-color-scheme="elCustomLightColorScheme">
      <div
        class="text-test bg-primary"
        @click="changeCustom"
      >
        CHANGE
      </div>
      <CamelotRippleEffect><div class="w-10 h-10" /></CamelotRippleEffect>
      <CamelotRippleEffect ripple-color="#034324">
        <div class="w-10 h-10" />
      </CamelotRippleEffect>

      <CamelotNumberCounter
        v-model="v"
        class="w-4"
        :max="10"
        :min="0"
        min-step-by-value
        used-min-step-by-value
      />
    </CamelotCustomColorSchemeProvider> -->

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
    >
      open dialog
    </div>

    <CamelotTabs
      v-model="tabSelected"
      class="top-0 sticky bg-surface py-2 px-2  z-10 drop-shadow"
      :data="data"
      display-key="name"
    />

    <CamelotInput />

    <CamelotSelectV2
      v-model="department"
      :options="options"
      options-container-background-color="#F35F6F"
    />

    <CamelotSteps
      v-model="step"
      :steps="[
        '確認商品',
        '填寫資料',
        '訂購完成',
      ]"
      enable-change-by-click
    >
      <template #dot="{ index, isComplete }">
        <div
          class="w-7 aspect-square bg-white rounded-full flex justify-center items-center"
          :class="{ '!bg-yellow-500': isComplete }"
        >
          <span
            class=" text-red-500 "
            :class="{ '!text-blue-500': isComplete }"
          >{{ index }}</span>
        </div>
      </template>
      <!-- <template #content="{ value,index }">
        <span class="text-red-100">{{ index }}{{ value }}</span>
      </template> -->
    </CamelotSteps>
    <div class="text-on-surface">
      {{ step }}
    </div>
    <div @click="expanded = !expanded">
      Expanded
    </div>

    <CamelotExpanded :expanded="expanded">
      <template #header>
        <div>
          Expanded
        </div>
      </template>
      <div class="bg-gradient-to-b from-red-500 to-blue-500 h-28" />
    </CamelotExpanded>

    <div class="w-40 h-40 ">
      <CamelotSkeleton />
    </div>

    <div class="w-40 h-40">
      <CamelotImage
        src="https://cataas.com/cat?v=1"
        class="w-full h-full object-scale-down"
      >
        <template #error>
          <span class="flex w-full h-full bg-black text-red-600">loading image error</span>
        </template>
      </CamelotImage>
    </div>
    <CamelotSelect
      v-model="department"
      class="w-full"
      :options="options"
      options-container-background-color="#F35F6F"
    >
      <div
        class="w-full border bg-background text-black-700 border-black-300 focus:border-primary-500 outline-none rounded-lg px-4 py-2 text-base caret-primary-500 flex"
      >
        <span class="flex-1">新竹縣</span>
      </div>
    </CamelotSelect>

    <CamelotPopupV2>
      <div>Open Popup 123</div>
      <template #popup>
        <div class="h-80 !w-80 bg-blue-400" />
      </template>
    </CamelotPopupV2>

    <div class="w-40 h-40">
      <CamelotImage
        src="https://123"
        class="w-full h-full object-scale-down"
      >
        <template #error>
          <span class="flex w-full h-full bg-black text-red-600">loading image error</span>
        </template>
      </CamelotImage>
    </div>

    <CamelotSelect
      v-model="department"
      class="w-full"
      :options="options"
      options-container-background-color="#F35F6F"
    >
      <div
        class="w-full border bg-background text-black-700 border-black-300 focus:border-primary-500 outline-none rounded-lg px-4 py-2 text-base caret-primary-500 flex"
      >
        <span class="flex-1">新竹縣</span>
      </div>
    </CamelotSelect>
  </div>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'

const loading = useLoading()

const a = await loading.run('', async () => {
  return ''
})

const step = ref(0)
const expanded = ref(false)

const v = ref(0.3)

const globalColorScheme = useCustomColorScheme<{ test: string }>(undefined, {
  lightColorScheme: {
    test: '#F40fFF',
  },
  darkColorScheme: {
    test: '#140fF1',
  },
})

const elLightColorScheme = ref<Material3ColorSchemePartial>({
  primary: 'yellow',
})

const change = () => {
  elLightColorScheme.value.primary = 'green'
}

const elCustomLightColorScheme = ref<CustomColorScheme<{ test: string }>>({
  primary: '#44ffFF',
  test: '#F40fFF',
  rippleColor: '#000FFF',
})

const open = ref(false)

const openBottomSheet = ref(false)

const openLoading = async () => {
  const closeable = useLoading().open('test')
  await useDelay(3000)
  closeable()
}

const data
  = Array.from({ length: 21 }).map((_, rowIndex) => {
    return {
      no: `${rowIndex}`,
      name: `分類-${rowIndex}`,
    }
  })

const tabSelected = ref(0)

const department = ref('韓式餐廳')

const options = ref([
  {
    name: '韓式餐廳',
    label: '韓式餐廳',
    value: '韓式餐廳',
  },
  {
    name: '港式餐廳',
    label: '港式餐廳',
    value: '港式餐廳',
  },
  {
    name: '日式餐廳',
    label: '日式餐廳',
    value: '日式餐廳',
  },
  {
    name: '中式餐廳',
    label: '中式餐廳',
    value: '中式餐廳',
  },
])

if (isClient) {
  const v = ref('1')
  const id = computed(() => toValue(v))

  const catApi = useBaseApi({
    baseURL: 'https://cataas.com',
    timeout: 30000,
  })

  const cat = catApi.get<string>(() => `/cat?v=${id.value}`, {

  }).fetch()
}

const baseApi = useBaseApi({
  baseURL: 'http://localhost:5182',
  timeout: 30000,
})

const ping = () => baseApi.get<string>('/ping', {
  // onRequests: [
  //   useBasicTokenRequest('account', 'pwd')
  // ],
}).useFetch()

try {
  const { data, refresh, status } = ping()
  await refresh()
  watch(data, (nV) => {
    console.log('data', nV)
  }, { immediate: true })

  // await refresh()
} catch (e) {
  console.log('error', e)
}
</script>

<style scoped></style>
