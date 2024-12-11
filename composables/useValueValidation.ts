export const useValueValidation = (
  target: MaybeRef<string | undefined>,
  options: {
    type: 'email' | 'mobile' | 'number' | 'phone'
    allowUndefined?: boolean
  },
) =>
  computed(() => {
    const value = toValue(target)

    if (!value) {
      return options.allowUndefined ?? tryOnMounted
    }

    switch (options.type) {
      case 'email':
        return /^[\w\\-\\.]+@([\w\\-]+\.)+[\w\\-]{2,4}$/.test(value)
      case 'mobile':
        return /^[0-9]+$/.test(value)
      case 'phone':
        return /^0\d{8,9}$/.test(value)
      case 'number':
        return /^[0-9]+$/.test(value)
    }

    return true
  })
