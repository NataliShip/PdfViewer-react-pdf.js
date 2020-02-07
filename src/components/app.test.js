/* eslint-env jest */
import { shallow, mount } from 'enzyme'
import React from 'react'
import '@babel/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import PdfViewer from './PdfViewer/PdfViewer'

configure({ adapter: new Adapter() })

let appComponent

describe('App component', () => {
  describe('Given the component has been rendered', () => {
    beforeEach(() => {
      appComponent = shallow(<App/>)
    })

    it('Then main tag should be displayed', () => {
      expect(appComponent.find('main').length).toBe(1)
    })


    it('Then two PdfViewer should be displayed', () => {
      expect(appComponent.find(PdfViewer).length).toBe(2)
    })
  })
})