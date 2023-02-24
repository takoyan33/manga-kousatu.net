import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import Image from "next/image";
import { useAuthContext } from "../context/AuthContext";
import { useLogout } from "../api/auth/useAuth";

const ACCOUNT_MENU_ITEMS = [
  { text: "About", href: "/about" },
  { text: "リリースノート", href: "/realsenotes" },
];

export const MuiNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuthContext();
  const router = useRouter();
  const { logout } = useLogout();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    setAnchorEl(null);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <AppBar position="static" color="transparent" className="w-full m-0">
      <Box
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        className="w-full m-0"
      >
        <Toolbar className="w-full m-0">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <Link href="/">
              <Image
                src="/magastudylogo.png"
                width="200"
                height="30"
                alt="ロゴ"
              />
            </Link>
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />
        {user && (
          <>
            <MenuItem>
              <Link href="/profile">プロフィール</Link>
            </MenuItem>
            <MenuItem>
              <Button color="inherit" onClick={handleLogout}>
                <Logout fontSize="small" />
                ログアウト
              </Button>
            </MenuItem>
          </>
        )}
        {!user && (
          <>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Link href="/login">ログイン</Link>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Link href="/register">新規登録</Link>
            </MenuItem>
          </>
        )}
        {ACCOUNT_MENU_ITEMS.map((item) => (
          <MenuItem key={item.text} onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Link href={item.href}>{item.text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};
