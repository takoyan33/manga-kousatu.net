import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../firebaseConfig";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

export const MuiNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let router = useRouter();
  const databaseRef = collection(database, "CRUD DATA");
  const [firedata, setFiredata] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const logout = () => {
    // sessionStorage.removeItem("Token");

    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AppBar position="static" color="transparent" className="w-full m-0">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/home">漫画考察.net</Link>
        </Typography>
        <Button color="inherit">
          <Link href="/about">About</Link>
        </Button>
        <Stack direction="row" spacing={2}>
          {user && (
            <>
              <Button color="inherit">
                <Link href="/profile">プロフィール</Link>
              </Button>
              <Button color="inherit" onClick={logout}>
                ログアウト
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit">
                <Link href="/login">ログイン</Link>
              </Button>
              <Button color="inherit">
                <Link href="/register">新規登録</Link>
              </Button>
            </>
          )}
          {/* <Button color="inherit" onClick={logout}>
            お問い合わせ
          </Button> */}
          {/* <Button
            color="inherit"
            id="resources-button"
            aria-controls={open ? "resources-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Resources
          </Button> */}
        </Stack>
        {/* <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "resources-button",
          }}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};
