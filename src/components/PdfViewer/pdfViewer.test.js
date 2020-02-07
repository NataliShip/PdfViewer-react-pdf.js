/* eslint-env jest */
import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PdfViewer from './PdfViewer'
import Upload from '../Upload/Upload'

configure({ adapter: new Adapter() })

let pdfViewerComponent

describe('PdfViewer component', () => {
  describe('Given the component has been rendered', () => {
    beforeEach(() => {
      pdfViewerComponent = shallow(<PdfViewer src='/'/>)
    })

    it('Then root should be displayed', () => {
      expect(pdfViewerComponent.find('.root').length).toBe(1)
    })
  })

  describe('When it is sandbox mode', () => {
    beforeEach(() => {
      pdfViewerComponent = shallow(<PdfViewer sandbox />)
    })

    it('Then sandbox should be displayed', () => {
      expect(pdfViewerComponent.find('.sandbox').length).toBe(1)
    })

    it('Then Upload should be displayed', () => {
      expect(pdfViewerComponent.find(Upload).length).toBe(1)
    })
  })
})
