import React from 'react';
import { Link } from "react-router-dom";
import Container from './Container';
import Logo from './Logo';
import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import menuConfigs from "../../configs/menu.configs";

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
                                Thiết kế và phát triển bởi 🕵️‍♂️
                                <span className='font-semibold text-[#f44336]'>Nguyễn Bảo</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Copyright © 2022 - 2023 All rights reserved
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cập nhật lần cuối: 02:24:30, 17/4/2023
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default Footer;
