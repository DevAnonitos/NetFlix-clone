import React from 'react';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GlobalLoading, AuthModal, TopBar, Footer, UserMenu } from '../common';

const MainLayout = () => {
    return (
        <>
            {/*--------- GlobalLoading------------ */}
            <GlobalLoading />
            {/* ---------LoginModal--------------- */}
            <AuthModal />
            <Box display="flex" minHeight="100vh">
                {/*-------- Header---------- */}
                <TopBar />
                {/* --------Main------------ */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
                <UserMenu />
            </Box>

            {/*------------------- Footer--------------- */}
            <Footer />
        </>
    );
};

export default MainLayout;
