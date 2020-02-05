export type UploadPropsTypes = {
  maxSizeInKB: number,
  label: string,
  accept: Array<string>,
  afterUploadAction(file): void
}

export type UploadStateTypes = {
  error: null | string,
  isLoading: boolean
}