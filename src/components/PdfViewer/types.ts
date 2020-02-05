export type PdfViewerPropsTypes = {
  src?: string,
  sandbox?: boolean
}

export type PdfViewerStateTypes = {
  pdf: null | {
    getPage(currentPageNumber: number): pageType
  },
  testFileContent: null | string,
  pagesCount: number,
  currentPageNumber: number,
  onCatchErrorReloadedCount: number,
  switchPageBlocked: boolean,
  scale: number,
  isPdfLoaded: boolean,
  isShowError: boolean,
  pdfLoadingError: boolean
}


export type pageType = {
  getViewport(scale: object): viewportType
  getTextContent(): object
  render(renderContext: renderContextType): renderTaskType
}

export type renderTaskType = {
  promise: Promise<object>
}

export type renderContextType = {
  canvasContext: object,
  viewport: viewportType
}

export type viewportType = {
  width: number,
  height: number
}