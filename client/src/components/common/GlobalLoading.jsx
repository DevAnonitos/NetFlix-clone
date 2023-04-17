import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import Logo from './Logo';

const GlobalLoading = () => {

    const { globalLoading } = useSelector((state) => state.globalLoading);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if(globalLoading) {
            setLoading(true);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [globalLoading]);

    return (
        <>
            <Paper
                sx={{
                    opacity: isLoading ? 1 : 0,
                    pointerEvents: "none",
                    transition: "all .3s ease",
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 999
                }}
            >
                <Toolbar />
                <LinearProgress />
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <Logo />
                </Box>
            </Paper>
        </>
    );
};

export default GlobalLoading;
