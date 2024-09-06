import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Link from 'next/link'

interface AccountMenuParams {
  onClick?: () => void
}

export const AccountMenu = ({ onClick }: AccountMenuParams) => (
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
      <Link href='/profile/edit' aria-label='profile-edit'>
        プロフィールを変更する
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <Link href='/profile/edit/password' aria-label='password-change'>
        パスワードを変更する
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <button aria-label='account-delete' onClick={onClick}>
        アカウントを退会する
      </button>
    </ListItemButton>
  </List>
)
