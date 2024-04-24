export type ValidatorFn = () => boolean

export interface InputValidationController {
  addValidatorComputed:(ref:ComputedRef<boolean>)=>void
  addValidator: (fn: ValidatorFn) => void
  validate: () => boolean
  isValidate: ComputedRef<boolean>
}

export const useInputValidationController = ():InputValidationController => {
  const validateFnList = ref<(ValidatorFn)[]>([])
  const validateRefList = ref<ComputedRef<boolean>[]>([])

  const addValidatorComputed = (ref:ComputedRef<boolean>) => {
    validateRefList.value.push(ref)
  }

  const addValidator = (fn: ValidatorFn) => {
    validateFnList.value.push(fn)
  }

  const validate = () => {
    let hasError = false
    validateFnList.value.forEach((fn) => {
      const result = fn()
      if (!result) {
        hasError = true
      }
    })
    return !hasError
    // return validateFnList.value.every(fn => fn())
  }

  const isValidate = computed(() => {
    return validateRefList.value.every(ref => ref.value)
  })

  return {
    addValidatorComputed,
    addValidator,
    validate,
    isValidate
  }
}
