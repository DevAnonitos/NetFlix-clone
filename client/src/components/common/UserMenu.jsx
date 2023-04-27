import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import menuConfigs from '../../configs/menu.configs';
import { setUser } from "../../redux/features/userSlice";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Typography
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const UserMenu = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);

    return (
        <>
            {user && (
                <>
                    <Typography
                        variant='h6'
                        sx={{
                            cursor: "pointer",
                            userSelect: "none",
                            border: 2,
                            paddingX: 2,
                            paddingY: 1,
                            borderRadius: 2,
                            fontWeight: "bold",

                        }}
                        onClick={toggleMenu}
                    >
                        {user.displayName}
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{
                            sx: {
                                padding: 0,
                                borderRadius: 3,
                            }
                        }}
                    >
                        {menuConfigs.user.map((item, index) => (
                            <ListItemButton
                                tabIndex={index}
                                component={Link}
                                to={item.path}
                                key={index}
                                onClick={() => setAnchorEl(null)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            textTransform="uppercase"
                                        >
                                            {item.display}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            sx={{
                                borderRadius: "10px",
                            }}
                            onClick={() => dispatch(setUser(null))}
                        >
                            <ListItemIcon>
                                <LogoutOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography
                                        textTransform="uppercase"
                                    >
                                        Sign out
                                    </Typography>
                            } />
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    );
};

export default UserMenu;
