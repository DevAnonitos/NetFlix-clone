import React from 'react';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GlobalLoading, AuthModal, TopBar, Footer } from '../common';

const MainLayout = () => {
    return (
        <>
            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            {/* login modal */}
            <AuthModal />
            {/* login modal */}

            <Box display="flex" minHeight="100vh">
                {/* header */}
                <TopBar />
                {/* header */}

                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
                {/* main */}
            </Box>

            {/* footer */}
            <Footer />
            {/* footer */}
        </>
    );
};

export default MainLayout;
