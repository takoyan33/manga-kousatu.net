import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { getAuth } from 'firebase/auth'
import { collection, onSnapshot } from 'firebase/firestore'
import { query, orderBy } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import React from 'react'
import { database } from '../../../firebaseConfig'
import { postsRef } from 'layouts/utils/post'

// type Props = {
//   getallPost?: () => Promise<void>;
//   getallOldpost?: () => Promise<void>;
//   getallLikepost?: () => Promise<void>;
// };

// eslint-disable-next-line react/display-name
export const Changetab = React.memo(({ getallOldpost, getallPost, getallLikepost }) => {
  const [firedata, setFiredata] = useState([])

  const q = query(postsRef, orderBy('timestamp', 'desc'))
  //新しい順
  const u = query(postsRef, orderBy('timestamp'))
  //古い順
  const f = query(postsRef, orderBy('likes', 'desc'))
  //いいね数順

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='demo-select-small'>並び順</InputLabel>
        <Select labelId='demo-select-small' id='demo-select-small' label='並び順'>
          <MenuItem value='新しい順' onClick={getallPost}>
            新しい順
          </MenuItem>
          <MenuItem value='古い順' onClick={getallOldpost}>
            古い順
          </MenuItem>
          <MenuItem value='いいね順' onClick={getallLikepost}>
            いいね順
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )

  return { firedata }
})
