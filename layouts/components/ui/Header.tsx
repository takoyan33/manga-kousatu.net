import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CachedIcon from '@mui/icons-material/Cached'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Image from 'react-image-resizer'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
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
  Tooltip,
  Button,
  Box,
} from '@mui/material'
import { useLogOut } from 'layouts/api/auth/useAuth'
import { useAuthContext } from 'layouts/context/AuthContext'
import { NotificationModal } from 'layouts/components/ui'
import { useGetMyUser } from 'layouts/components/hooks'
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
  const user: any = useAuthContext()
  const router = useRouter()
  const { logout } = useLogOut()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [users, setUsers] = useState<Array<GetUser>>([])

  useEffect(() => {
    if (user) {
      useGetMyUser(setUsers, user.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    setAnchorEl(null)
    setUsers([])
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }

  const handleNotificationOpen = () => {
    setNotificationOpen(true)
    handleClose()
  }

  const handleNotificationClose = () => {
    setNotificationOpen(false)
  }

  console.log(users)

  return (
    <AppBar position='static' color='transparent'>
      <div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '80px' }}>
          <Toolbar style={{ height: '80px' }}>
            <Link href='/top'>
              <Typography sx={{ flexGrow: 1, textAlign: 'left' }}>
                <Image height={100} width={200} src='/logo.png' alt='logo' />
              </Typography>
            </Link>
            {user && (
              <button onClick={handleNotificationOpen}>
                <NotificationsIcon fontSize='small' />
              </button>
            )}
            <NotificationModal open={notificationOpen} handleClose={handleNotificationClose} />
            <Tooltip title='メニュー'>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                {users.map((user) => {
                  return (
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={user.profileImage}
                      className='border'
                    />
                  )
                })}
                {!user && <span>三</span>}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </div>
      </div>

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
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
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
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Divider />
        {!user && (
          <>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <Link href='/login'>ログイン</Link>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <Link href='/register'>新規登録</Link>
            </MenuItem>
          </>
        )}
        {user && (
          <>
            {LOGIN_ADMIN_MENU_ITEMS.map((item) => (
              <MenuItem key={item.text} onClick={handleClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link href={item.href}>{item.text}</Link>
              </MenuItem>
            ))}
            <MenuItem style={{ padding: '0 16px' }}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <Button
                color='inherit'
                onClick={handleLogout}
                style={{ fontSize: '16px', padding: '0px' }}
              >
                ログアウト
              </Button>
            </MenuItem>
          </>
        )}
        {ACCOUNT_MENU_ITEMS.map((item) => (
          <MenuItem key={item.text} onClick={handleClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link href={item.href}>{item.text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  )
}
