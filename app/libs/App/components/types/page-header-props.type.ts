export type PageHeaderProps = {
  title?: string
  description?: string
  backTo?: string
  isLoading?: boolean
  editable?: boolean
  editFn?: (newTitle: string) => Promise<unknown>
}
