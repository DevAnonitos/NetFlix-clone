import React from 'react';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
    return (
        <>
            <Box display="flex" minHeight="100vh">
                {/*-------- Header---------- */}

                {/* --------Main------------ */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default MainLayout;
