export interface SelectOption<T = string> {
  value: string
  label: string
  disable?: boolean
  data?: T
}
