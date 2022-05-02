import React from "react";
import "./header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

const commonpages = ["Зарегистрироваться", "Войти"];
const userPages = ["Мои песни", "Мои плейлисты"];
const adminPages = ["Исполнители", "Жанры", "Песни", "Пользователи"];
const settings = ["Главная", "Выйти"];

function Header() {
  const isAuth = useSelector((s) => s.auth.login.success);
  const isAdmin = useSelector((s) => s.auth.user.isAdmin);
  const user = useSelector((s) => s.auth.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const commonPageClickHandler = (page) => {
    if (page === "Зарегистрироваться") {
      navigate("auth/registration");
    } else {
      navigate("auth/login");
    }
    setAnchorElNav(null);
  };

  const userPageClickHandler = (page) => {
    if (page === "Мои песни") {
      navigate("/user/myTracks");
    }
    if (page === "Мои плейлисты") {
      navigate("/user/myPlaylists");
    }
    setAnchorElNav(null);
  };

  const adminPageClickHandler = (page) => {
    if (page === "Исполнители") {
      navigate("/admin/authors");
    }
    if (page === "Жанры") {
      navigate("/admin/genres");
    }
    if (page === "Песни") {
      navigate("/admin/musics");
    }
    if (page === "Пользователи") {
      navigate("/admin/users");
    }
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Выйти") {
      dispatch(logout());
    }
    if (setting === "Главная") {
      navigate("/");
    }
    setAnchorElUser(null);
  };

  return (
    <div className="header">
      <AppBar position="static" sx={{ backgroundColor: "blue" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to="/" className="header__logo">
              <LibraryMusicIcon sx={{ display: { xs: "none", md: "flex" } }} />
            </NavLink>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {isAuth
                  ? isAdmin
                    ? adminPages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => adminPageClickHandler(page)}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))
                    : userPages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => userPageClickHandler(page)}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))
                  : commonpages.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => commonPageClickHandler(page)}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>

            {!isAuth && (
              <NavLink to="/" className="header__logo">
                <LibraryMusicIcon
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                />
              </NavLink>
            )}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {isAuth
                ? isAdmin
                  ? adminPages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => adminPageClickHandler(page)}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))
                  : userPages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => userPageClickHandler(page)}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))
                : commonpages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => commonPageClickHandler(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
            </Box>

            {isAuth && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
