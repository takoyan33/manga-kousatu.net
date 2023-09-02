import React from 'react'
import { Modal, Typography, Box } from '@mui/material'
import { RELEASE_NOTES } from 'layouts/components/ui'

export const NotificationModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className='m-auto mt-20 h-3/4 max-w-5xl bg-white p-4' sx={{ overflowY: 'scroll' }}>
        <Typography variant='h6'>通知欄</Typography>
        {RELEASE_NOTES.map(({ version, date, features }) => (
          <div key={version}>
            <h2 className='my-4 mt-8 text-xl font-semibold'>Manga Study {version}</h2>
            <p>{date}</p>
            <h4 className='my-2 text-lg'>変更点</h4>
            {features.map((feature, index) => (
              <p key={index}>{feature}</p>
            ))}
          </div>
        ))}
      </Box>
    </Modal>
  )
}
