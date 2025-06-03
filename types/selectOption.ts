export interface SelectOption<T = string> {
  value: string
  label: string
  disabled?: boolean
  data?: T
}
