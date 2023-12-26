export const useDelay = async (milliseconds: number) => {
  return await new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}
