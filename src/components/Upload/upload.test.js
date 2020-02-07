/* eslint-env jest */
import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Upload from './Upload'

configure({ adapter: new Adapter() })

let uploadComponent, props

props = {
  afterUploadAction: () => {},
  maxSizeInKB: 1000000000,
  accept: ['application/pdf'],
  label: 'Выберите PDF документ'
}

describe('Upload component', () => {
  describe('Given the component has been rendered', () => {
    beforeEach(() => {
      uploadComponent = shallow(<Upload {...props}/>)
    })

    it('Then upload should be displayed', () => {
      expect(uploadComponent.find('.upload').length).toBe(1)
    })

    it('Then button text should be equal to props', () => {
      expect(uploadComponent.find('.btn').text()).toBe(props.label)
    })
  })
})