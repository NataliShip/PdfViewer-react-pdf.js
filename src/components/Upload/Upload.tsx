import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UploadPropsTypes, UploadStateTypes } from './types'
import './upload.sass'

class Upload extends Component<UploadPropsTypes, UploadStateTypes> {
  static propTypes = {
    maxSizeInKB: PropTypes.number,
    label: PropTypes.string,
    accept: PropTypes.array,
    afterUploadAction: PropTypes.func,
  }

  static defaultProps = {
    label: 'Загрузить',
    maxSizeInKB: 0
  }

  state = {
    error: null,
    isLoading: false
  }

  private input = React.createRef<HTMLInputElement>()

  onChangeHandler = (evt) => {
    const { afterUploadAction, maxSizeInKB } = this.props

    const file = evt.target.files[0]
    const type = file.type
    const fileReader = new FileReader()

    if (evt.target.accept.indexOf(type) < 0) {
      this.setState({ error: 'Неверный тип файла', isLoading: false })
      return false
    }

    const sizeInKB = file.size / 1024
    if (maxSizeInKB && sizeInKB > maxSizeInKB) {
      this.setState({ error: 'Слишком большой размер файла', isLoading: false })
      return false
    }

    this.setState({ error: null, isLoading: true })

    const isPdf = file.type === 'application/pdf'

    if (isPdf) {
      this.setState({ error: null, isLoading: false })

      fileReader.onload = () => {
        if (afterUploadAction) afterUploadAction({ fileContent: fileReader.result, fileObject: file, isPdf })
      }

      fileReader.readAsDataURL(file)

      return
    }

    fileReader.readAsDataURL(file)
  }

  render () {
    const { label, accept } = this.props
    const { error, isLoading } = this.state

    return (
      <div className='upload'>
        { isLoading
          ? <span>Downloading...</span>
          : <div className='holder'>
            <input
              onChange={this.onChangeHandler}
              className='input'
              accept={accept.join(', ')}
              type='file'
              ref={this.input}
            />
            <button
              className='btn'
              onClick={() => { this.input.current.click() }}
            >
              {label}
            </button>
          </div>
        }
      { error && <div className='error'>{error}</div> }
      </div>
    )
  }
}

export default Upload
