import React from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { uiActions } from 'store/ui'

const Overlay = () => {
  const dispatch = useAppDispatch()
  const overlayHidden = useAppSelector(state => state.ui.overlayHidden)
    ? 'hidden bg-opacity-0'
    : 'overflow-y-hidden bg-black bg-opacity-25'

  const handleOverlay = () => {
    dispatch(uiActions.showDrawer(false))
    dispatch(uiActions.showOverlay(true))
    return
  }

  return (
    <div
      className={
        'fixed w-full h-full top-0 left-0 right-0 bottom-0 z-10 bg-white transition ease-in-out duration-500 ' +
        overlayHidden
      }
      aria-hidden={false}
      onClick={handleOverlay}
    />
  )
}

export default Overlay
