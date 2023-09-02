import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CachedIcon from '@mui/icons-material/Cached'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Image from 'react-image-resizer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

const ACCOUNT_MENU_ITEMS = [
  { text: '更新履歴', href: '/releasenotes', icon: <CachedIcon fontSize='small' /> },
  { text: 'About', href: '/about', icon: <Settings fontSize='small' /> },
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
  const { user } = useAuthContext()
  const router = useRouter()
  const { logout } = useLogOut()
  const [notificationOpen, setNotificationOpen] = useState(false)

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

  return (
    <AppBar position='static' color='transparent' className='m-0 w-full'>
      <Box
        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        className='m-0 w-full'
      >
        <Link href='/top'>
          <Toolbar className='m-0 w-full'>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Image
                className='m-auto max-w-sm text-center'
                height={100}
                width={200}
                src='/logo.png'
              />
            </Typography>
            <button onClick={handleNotificationOpen}>
              <NotificationsIcon fontSize='small' />
            </button>
            <NotificationModal open={notificationOpen} handleClose={handleNotificationClose} />
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Link>
      </Box>

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
        {ACCOUNT_MENU_ITEMS.map((item) => (
          <MenuItem key={item.text} onClick={handleClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link href={item.href}>{item.text}</Link>
          </MenuItem>
        ))}
        {user && (
          <>
            {LOGIN_ADMIN_MENU_ITEMS.map((item) => (
              <MenuItem key={item.text} onClick={handleClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link href={item.href}>{item.text}</Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Button color='inherit' onClick={handleLogout}>
                <Logout fontSize='small' />
                ログアウト
              </Button>
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  )
}
