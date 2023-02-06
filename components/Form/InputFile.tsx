import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
  fileState: File[]
  setFileState: React.Dispatch<React.SetStateAction<File[]>>
}

const InputFile = ({ fileState, setFileState }: Props) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileState(prev => prev.concat(Array.from(e.dataTransfer.files)))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFileState(prev => prev.concat(Array.from(e.target!.files!)))
    }
  }
  return (
    <div
      className='w-36 h-36'
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label
        htmlFor='dropzone-file'
        className={
          (dragActive ? 'bg-gray-100 ' : 'bg-gray-50 ') +
          'flex flex-col items-center justify-center border-2 w-full h-full p-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 '
        }
      >
        <div className='flex flex-col items-center justify-center'>
          <svg
            aria-hidden='true'
            className='w-10 h-10 mb-3 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='mb-2 text-sm text-center text-gray-500'>
            <span className='font-semibold'>Click to upload</span> or drag and
            drop images
          </p>
        </div>
        <input
          onChange={handleChange}
          id='dropzone-file'
          type='file'
          className='hidden'
          multiple={true}
          accept='image/*'
        />
      </label>
    </div>
  )
}

export default InputFile
