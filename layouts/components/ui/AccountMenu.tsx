import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import Link from 'next/link'

export const AccountMenu = (onClick) => (
  <List
    sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
    component='nav'
    aria-labelledby='nested-list-subheader'
    subheader={
      <ListSubheader component='div' id='nested-list-subheader'>
        アカウントメニュー
      </ListSubheader>
    }
  >
    <ListItemButton>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <Link href='/profile/edit'> プロフィールを変更する</Link>
    </ListItemButton>
    {/* <button className="m-5">
          <Link href="/profile/emailedit">メールアドレスを変更する</Link>
        </button> */}
    <ListItemButton>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <Link href='/profile/edit/password'>パスワードを変更する</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <button className='' onClick={onClick}>
        アカウントを退会する
      </button>
    </ListItemButton>
  </List>
)
