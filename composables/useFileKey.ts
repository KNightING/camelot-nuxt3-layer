export const useFileKey = (file: File) => {
  return `${file.type}_${file.name}_${file.size}_${file.lastModified}`
}
