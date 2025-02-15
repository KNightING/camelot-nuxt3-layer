export type SelectOptions<T> = SelectOption<T>[]

export interface SelectOption<T> {
  name: string
  value: string | number
  data?: T
}
