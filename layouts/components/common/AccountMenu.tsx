import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Link from 'next/link'
import React from 'react'

// メニュー項目の定義
const MENU_ITEMS = [
  {
    id: 'profile-edit',
    label: 'プロフィールを変更する',
    href: '/profile/edit',
    icon: SendIcon,
  },
  {
    id: 'password-change',
    label: 'パスワードを変更する',
    href: '/profile/edit/password',
    icon: SendIcon,
  },
  {
    id: 'account-delete',
    label: 'アカウントを退会する',
    icon: DraftsIcon,
  },
] as const

interface AccountMenuProps {
  onDeleteAccount?: () => void
}

/**
 * メニュー項目コンポーネント
 */
const MenuItem = ({
  id,
  label,
  href,
  icon: Icon,
  onClick,
}: {
  id: string
  label: string
  href?: string
  icon: React.ElementType
  onClick?: () => void
}) => (
  <ListItemButton>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    {href ? (
      <Link id={id} href={href} aria-label={id}>
        {label}
      </Link>
    ) : (
      <button id={id} aria-label={id} onClick={onClick}>
        {label}
      </button>
    )}
  </ListItemButton>
)

/**
 * アカウントメニューコンポーネント
 * @param onDeleteAccount - アカウント削除ボタンクリック時のコールバック
 */
export const AccountMenu = React.memo(({ onDeleteAccount }: AccountMenuProps) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='account-menu-subheader'
      subheader={
        <ListSubheader component='div' id='account-menu-subheader'>
          アカウントメニュー
        </ListSubheader>
      }
    >
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.id}
          {...item}
          onClick={item.id === 'account-delete' ? onDeleteAccount : undefined}
        />
      ))}
    </List>
  )
})

AccountMenu.displayName = 'AccountMenu'
