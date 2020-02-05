import React from 'react'
import PdfViewer from './PdfViewer/PdfViewer'

export default function App () {
  return (
    <main>
      <h1 className='header'>
        Sandbox - download your pdf to try viewer
      </h1>
      <PdfViewer sandbox />

      <h1 className='header'>
        PdfViewer React wrap component for Pdf.js library
      </h1>
      <PdfViewer src={`${process.env.PUBLIC_URL}/test.pdf`} />
    </main>
  )
}