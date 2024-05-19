export interface LazyImageOptions {
  src: string;
}

export const useLazyImage = (options: LazyImageOptions) => {
  const isLoading = ref(true);
  const isError = ref(false);
  const isReady = ref(false);

  const load = () => {
    isLoading.value = true;
    isError.value = false;
    isReady.value = false;

    if (options.src) {
        const img = new Image();
        img.onerror = () => {
          isError.value = true;
          isLoading.value = false;
        };
        img.onload = () => {
          isReady.value = true;
          isLoading.value = false;
        };
        img.src = options.src;
    }
  };

  return {
    isLoading,
    isError,
    isReady,
    load,
  };
};
