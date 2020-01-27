import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './pdfViewer.sass'
import pdfjs from "pdfjs-dist"

class PdfViewer extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    sandbox: PropTypes.bool
  }

  render () {
    return (
      <div className="root">
        PdfViewer wrapper for React
      </div>
    )
  }
}

export default PdfViewer
