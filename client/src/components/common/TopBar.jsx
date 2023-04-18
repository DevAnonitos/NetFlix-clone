import React, { useState, cloneElement  } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';
import menuConfigs from '../../configs/menu.configs';
import { themeMode } from "../../configs/theme.configs";
import { setThemeMode  } from "../../redux/features/themeModeSlice";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import {
    AppBar,
    Box,
    Button,
    IconButton,
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
            backgroundColor: trigger ? "background.paper" : themeMode === themeMode.dark ? "transparent" : "background.paper"
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
        const theme = themeMode === themeMode.dark ? themeMode.light : themeMode.dark;
        dispatch(setThemeMode(theme));
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar />
            <ScrollAppBar>
                <AppBar
                    elevation={0}
                    sx={{
                        zIndex: 9999,
                    }}
                >

                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default TopBar;
