import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import './pdfViewer.sass'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

class PdfViewer extends Component {
  static propTypes = {
    src: PropTypes.string
  }

  static defaultProps = {
    src: `${process.env.PUBLIC_URL}/test.pdf`
  }

  render(): React.ReactElement<any, string> {
    return (
      <div className='root'>test</div>
    )
  }
}

export default PdfViewer
