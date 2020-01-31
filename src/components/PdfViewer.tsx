import React, {Component} from 'react'
import PropTypes from 'prop-types'
import pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { AnnotationLayerBuilder } from 'pdfjs-dist/lib/web/annotation_layer_builder'
import { PDFLinkService } from 'pdfjs-dist/lib/web/pdf_link_service'
import NullL10n from 'pdfjs-dist/lib/web/ui_utils.js'
import screenfull from 'screenfull'
import { PdfViewerProps, PdfViewerState, pageType } from "./types"
import './pdfViewer.sass'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {
  static propTypes = {
    src: PropTypes.string
  }

  static defaultProps = {
    src: `${process.env.PUBLIC_URL}/test.pdf`
  }

  state: PdfViewerState = {
    pdf: null,
    testFileContent: null,
    pagesCount: 0,
    currentPageNumber: 1,
    onCatchErrorReloadedCount: 0,
    switchPageBlocked: false,
    scale: 1,
    isPdfLoaded: false,
    isShowError: false,
    pdfLoadingError: false
  }

  isPageRendering = false

  private wrap = React.createRef<HTMLDivElement>()
  private document = React.createRef<HTMLDivElement>()
  private canvas = React.createRef<HTMLCanvasElement>()
  private textAndAnnotationLayer = React.createRef<HTMLDivElement>()

  componentDidMount () {
    this.fetchPdf(this.props.src)
        .then(() => this.pageRendering())
        .catch(() => this.setState({pdfLoadingError: true}))
  }

  private fetchPdf = async (src: string) => {
    const loadingTask = pdfjs.getDocument(src)
    const pdf = await loadingTask.promise
    this.setState({pdf, isPdfLoaded: true, pagesCount: pdf.numPages})
  }

  private pageRendering = async () => {
    if (this.isPageRendering) return
    this.setState({switchPageBlocked: true})
    this.isPageRendering = true

    const {state: { currentPageNumber, pdf }} = this

    if (!pdf) return
    const page: pageType = await pdf.getPage(currentPageNumber)

    // подготовка canvas по размерам pdf при выбранном scale
    const scale = this.getScaleForCurrentWidth(page)
    const viewport = page.getViewport({scale})
    this.canvas.current.height = viewport.height
    this.canvas.current.width = viewport.width

    // рендерим страницу pdf в контекст canvas
    const context = this.canvas.current.getContext('2d')
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }
    const renderTask = page.render(renderContext)
    await renderTask.promise

    // получаем текстовое содержимое pdf
    const textContent = await page.getTextContent()
    this.textAndAnnotationLayer.current.innerHTML = ''

    // рендерим текст из pdf
    pdfjs.renderTextLayer({
      textContent: textContent,
      container: this.textAndAnnotationLayer.current,
      viewport: viewport,
      textDivs: []
    })

    // рендерим аннотации
    // необходимо рендерить текст и аннотации в один слой иначе слои перекрывают друг друга
    const linkService = await new PDFLinkService({
      // для того что бы ссылки открывались в новой вкладке, по умолчанию NONE
      externalLinkTarget: pdfjs.LinkTarget.BLANK
    })

    const annotation = new AnnotationLayerBuilder({
      pageDiv: this.textAndAnnotationLayer.current,
      linkService: linkService,
      pdfPage: page,
      l10n: NullL10n
    })
    annotation.render(viewport)

    this.setState({switchPageBlocked: false})
    this.isPageRendering = false
  }

  private getScaleForCurrentWidth (page) {
    // это необходимо так как размеры canvas, textLayer и annotationLayer зависят от viewport
    // поэтому что бы canvas и другие слои были правильных размеров нужно вычислить scale
    // вычисляю по пропорции опираясь на ширину или высоту
    const viewport = page.getViewport({scale: this.state.scale})
    let newScale = this.state.scale

    if (this.wrap.current.clientWidth === viewport.width) return newScale

    // @ts-ignore
    if (screenfull.isFullscreen && viewport.width / viewport.height < 1.5) { // screenfull library not support types for isFullscreen property
      newScale = this.wrap.current.clientHeight / viewport.height * this.state.scale
    } else {
      newScale = this.wrap.current.clientWidth / viewport.width * this.state.scale
    }

    this.setState({scale: newScale})
    return newScale
  }

  render(): React.ReactElement {
    return (
      <div className='root'>
        <div className='wrap' ref={this.wrap}>
          <div className='document' ref={this.document}>
            <canvas className='canvas' ref={this.canvas} />
            <div className='textAndAnnotationLayer' ref={this.textAndAnnotationLayer} />
          </div>
        </div>
      </div>
    )
  }
}

export default PdfViewer
