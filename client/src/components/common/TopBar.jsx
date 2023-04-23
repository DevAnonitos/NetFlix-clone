import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';
import menuConfigs from '../../configs/menu.configs';
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode  } from "../../redux/features/themeModeSlice";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import {
    AppBar,
    Box,
    Button,
    Stack,
    Toolbar,
    useScrollTrigger
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const ScrollAppBar = ({ children, window }) => {
    const { themeMode } = useSelector((state) => state.themeMode);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined,
    });

    return children && React.cloneElement(children, {
        sx: {
            color: trigger ? "text.primary" : themeMode === themeMode.dark ? "primary.contrastText" : "text.primary",
            backgroundColor: trigger ? "background.paper" : themeMode === themeMode.dark ? "transparent" : "background.default",
        }
    });
};

const TopBar = () => {
    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <ScrollAppBar>
                <AppBar
                    elevation={0}
                    sx={{
                        zIndex: 9999,
                    }}
                >
                    <Toolbar
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Button
                                color="inherit"
                                sx={{ mr: 2, display: { md: "none" } }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </Button>

                            <Box
                                sx={
                                    { display: { xs: "inline-block", md: "none" } }
                                }
                            >
                                <Logo />
                            </Box>
                        </Stack>

                        <Box
                            flexGrow={1}
                            alignItems="center"
                            display={{ xs: "none", md: "flex" }}
                        >
                            <Box
                                sx={
                                    {
                                        marginRight: "30px",
                                    }
                                }
                            >
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    tabIndex={index}
                                    key={index}
                                    sx={{
                                        color: appState.includes(item.state)
                                            ? "primary.contrastText"
                                            : "inherit",
                                        mr: 2,
                                        backgroundColor: appState.includes(item.state)
                                            ? "primary.main" : "unset",
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={
                                        appState.includes(item.state)
                                            ? "contained"
                                            : "text"
                                    }
                                >
                                    {item.display}
                                </Button>
                            ))}
                            <Button
                                sx={{
                                    color: "inherit",
                                }}
                                onClick={onSwitchTheme}
                            >
                                {themeMode === themeModes.dark &&
                                    <DarkModeOutlinedIcon />
                                }
                                {themeMode === themeModes.light &&
                                    <WbSunnyOutlinedIcon />
                                }
                            </Button>
                        </Box>

                        <Stack
                            spacing={3}
                            direction="row"
                            alignItems="center"
                        >
                            {!user &&
                                <Button
                                    sx={{
                                        color: "#fff",
                                        backgroundColor: "#61dafb",
                                        borderRadius: "15px",
                                    }}
                                    variant='contained'
                                    onClick={() => dispatch(setAuthModalOpen(true))}
                                >
                                    Sign In
                                </Button>
                            }
                        </Stack>
                        {user && <UserMenu />}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default TopBar;
