import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import menuConfigs from '../../configs/menu.configs';
import uiConfigs from "../../configs/ui.configs";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const Sidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const sidebarWidth = uiConfigs.size.sidebarWith;

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark
            ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const drawer = (
        <>
            <Toolbar
                sx={{
                    paddingY: "20px",
                    color: "text.primary",
                }}
            >
                <Stack
                    width="100%"
                    direction='row'
                    justifyContent="center"
                >
                    <Logo />
                </Stack>
            </Toolbar>
            <List
                sx={{
                    paddingX: "30px",
                }}
            >
                <Typography
                    variant='h6'
                    marginBottom="20px"
                    color="#25c2a0"
                >
                    Menu
                </Typography>
                {menuConfigs.main.map((item, index) => (
                    <ListItemButton
                        key={index}
                        tabIndex={index}
                        sx={{
                            borderRadius: "10px",
                            marginY: 1,
                            backgroundColor: appState.includes(item.state)
                                ? "primary.main" : "unset",
                        }}
                        component={Link}
                        to={item.path}
                        onClick={() => toggleSidebar(false)}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography>
                                    {item.display}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                ))}

                {user && (
                    <>
                        <Typography
                            variant="h6"
                            marginBottom="20px"
                            color="#25c2a0"
                        >
                            Personal
                        </Typography>
                        {menuConfigs.user.map((item, index) => (
                            <ListItemButton
                                key={index}
                                sx={{
                                    borderRadius: "10px",
                                    marginY: 1,
                                    backgroundColor: appState.includes(item.state)
                                        ? "primary.main" : "unset"
                                }}
                                component={Link}
                                to={item.path}
                                onClick={() => toggleSidebar(false)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography>
                                        {item.display}
                                    </Typography>
                                }
                            />
                            </ListItemButton>
                        ))}
                        <Typography
                            variant="h6"
                            marginBottom="20px"
                            color="#25c2a0"
                        >
                            Theme
                        </Typography>
                        <ListItemButton onClick={onSwitchTheme}>
                            <ListItemIcon>
                                {themeMode ===
                                    themeModes.dark && <DarkModeOutlinedIcon />
                                }
                                {themeMode ===
                                    themeModes.light && <WbSunnyOutlinedIcon />
                                }
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography>
                                        {themeMode ===
                                            themeModes.dark
                                            ? "dark mode" : "light mode"
                                        }
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </>
                )}
            </List>
        </>
    );

    return (
        <>
            <Drawer
                open={open}
                onClose={() => toggleSidebar(false)}
                sx={{
                    "& .MuiDrawer-Paper": {
                        boxSizing: "border-box",
                        width: sidebarWidth,
                        borderRight: "0px"
                    }
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Sidebar;
