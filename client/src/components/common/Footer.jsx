import React from 'react';
import { Link } from "react-router-dom";
import Container from './Container';
import Logo from './Logo';
import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import menuConfigs from "../../configs/menu.configs";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <>
            <Container>
                <Paper
                    square={true}
                    sx={{ backgroundImage: "unset", padding: "2rem" }}
                >
                    <Stack
                        alignItems="center"
                        justifyContent="space-between"
                        direction={{ xs: "column", md: "row " }}
                        sx={{ height: "max-content" }}
                    >
                        <Logo />
                        <Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{ color: "#25c2a0" }}
                                    component={Link}
                                    to={item.path}
                                >
                                    {item.display}
                                </Button>
                            ))}
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Design by 🕵️‍♂️
                                <span
                                    className='font-semibold text-[#61dafb]
                                    text-lg'
                                >
                                    <a
                                        href="https://www.facebook.com/baonguyenno1412/"
                                    >
                                        Nguyễn Bảo
                                    </a>
                                </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Copyright © 2023 All rights reserved
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: "1rem",
                                }}
                            >
                                <FacebookIcon
                                    sx={{
                                        color: "#1877F2",
                                        fontSize: "2rem",
                                        marginRight: "1rem",
                                    }}
                                />
                                <TwitterIcon
                                    sx={{
                                        color: "#48dbfb",
                                        fontSize: "2rem",
                                        marginRight: "1rem"
                                    }}
                                />
                                <GitHubIcon
                                    sx={{
                                        fontSize: "2rem",
                                        marginRight: "1rem",
                                    }}
                                />
                                <InstagramIcon
                                    sx={{
                                        color: "#FC427B",
                                        fontSize: "2rem",
                                        marginRight: "1rem",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default Footer;
