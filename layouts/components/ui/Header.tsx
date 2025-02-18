'use client'

import CachedIcon from '@mui/icons-material/Cached'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import Settings from '@mui/icons-material/Settings'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useLogOut } from '../../../layouts/api/auth/useAuth'
import { SiteButton } from '../../../layouts/components/button'
import { NotificationModal } from '../../../layouts/components/ui'
import { useGetMyUser } from '../../../layouts/hooks'
import { useAuthContext } from '../../context/auth-context'
import { GetUser } from 'types/user'

const ACCOUNT_MENU_ITEMS = [
  { text: 'About', href: '/about', icon: <Settings fontSize='small' /> },
  { text: '更新履歴', href: '/releasenotes', icon: <CachedIcon fontSize='small' /> },
]

const LOGIN_ADMIN_MENU_ITEMS = [
  { text: 'プロフィール', href: '/profile', icon: <PersonIcon fontSize='small' /> },
  {
    text: 'いいねした投稿',
    href: '/profile/likespost',
    icon: <FavoriteBorderIcon fontSize='small' />,
  },
]

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user }: any = useAuthContext()
  const router = useRouter()
  const { logout } = useLogOut()
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<GetUser>()

  useEffect(() => {
    if (user) {
      useGetMyUser(setUsers, user.uid)
    }
  }, [user])

  // メニューの開閉
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // ログアウト処理
  const handleLogout = async () => {
    await logout()
    setAnchorEl(null)
    setUsers(undefined)
    setTimeout(() => router.push('/login'), 2000)
  }

  const handleNotificationOpen = (): void => {
    setNotificationOpen(true)
    handleClose()
  }

  const handleNotificationClose = (): void => {
    setNotificationOpen(false)
  }

  return (
    <AppBar position='static' color='transparent'>
      <nav>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '80px' }}>
          <Toolbar style={{ height: '80px', justifyContent: 'space-between' }}>
            {/* ロゴ */}
            <Link href='/'>
              <Typography sx={{ flexGrow: 1, textAlign: 'left' }}>
                <Image height={20} width={150} src='/logo.png' alt='logo' />
              </Typography>
            </Link>

            <div className='flex'>
              <NotificationModal isOpen={notificationOpen} handleClose={handleNotificationClose} />

              {/* 通知アイコン */}
              {user && (
                <button onClick={handleNotificationOpen}>
                  <NotificationsIcon fontSize='small' />
                </button>
              )}

              {/* ユーザーメニュー */}
              <IconButton
                onClick={handleClick}
                id='humbuger-menu'
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                {user && users?.profileImage && (
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={users.profileImage}
                    className='border'
                    key={users?.id}
                  />
                )}
                {user && users?.profileImage === undefined && (
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src='/images/avater.svg'
                    className='border'
                  />
                )}
                {!user && <MenuIcon fontSize='small' />}
              </IconButton>

              {/* 投稿ボタン */}
              {user && (
                <div className='ml-4 mr-6 text-center'>
                  <SiteButton
                    href='/post/new'
                    text='投稿する'
                    className='w-50 m-auto my-2'
                    id='add-post'
                  />
                </div>
              )}
            </div>
          </Toolbar>
        </div>
      </nav>

      {/* メニュー */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 100,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!user ? (
          <div>
            <MenuItem component={Link} href='/login'>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              ログイン
            </MenuItem>
            <MenuItem component={Link} href='/register'>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              新規登録
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem>{user.displayName || users?.userName || 'ユーザー名未設定'}</MenuItem>
            <Divider />
            {LOGIN_ADMIN_MENU_ITEMS.map((item) => (
              <MenuItem key={item.text} component={Link} href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.text}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              ログアウト
            </MenuItem>
          </div>
        )}
        {ACCOUNT_MENU_ITEMS.map((item) => (
          <MenuItem key={item.text} component={Link} href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  )
}
