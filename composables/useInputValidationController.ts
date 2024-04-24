export type ValidatorFn = () => boolean

export interface InputValidationController {
  addValidator: (fn: ValidatorFn) => void
  validate: () => boolean
}

export const useInputValidationController = ():InputValidationController => {
  const validateFnList = ref<(ValidatorFn)[]>([])

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

  return {
    addValidator,
    validate
  }
}
