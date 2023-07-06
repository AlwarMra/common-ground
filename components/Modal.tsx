import React, { useState } from 'react'
import { Spinner } from 'components/Icons'

interface ModalProps {
  modalAction: () => void
  modalState: boolean
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ modalAction, modalState, closeModal }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleModal = async () => {
    setIsLoading(true)
    await modalAction()
  }

  if (!modalState) return null

  return (
    <div
      onClick={e => {
        e.preventDefault()
        if (e.currentTarget === e.target) {
          closeModal(false)
        }
      }}
      id='popup-modal'
      style={{ background: 'rgba(0,0,0,.3)' }}
      className={
        (modalState ? '' : 'hidden') +
        'fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
      }
    >
      <div className='relative w-full max-w-md max-h-full mx-auto top-1/4'>
        <div className='relative bg-white rounded-lg shadow'>
          <button
            onClick={() => closeModal(false)}
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
            data-modal-hide='popup-modal'
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6 text-center'>
            <svg
              aria-hidden='true'
              className='mx-auto mb-4 text-gray-400 w-14 h-14'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500'>
              Are you sure you want to delete this product?
            </h3>
            <button
              onClick={e => handleModal()}
              data-modal-hide='popup-modal'
              className=' text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
              style={{
                background:
                  'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
              }}
            >
              {!isLoading ? "Yes, I'm sure" : <Spinner />}
            </button>
            <button
              onClick={() => closeModal(false)}
              data-modal-hide='popup-modal'
              type='button'
              className=' text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
