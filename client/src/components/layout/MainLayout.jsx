import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GlobalLoading, AuthModal, TopBar, Footer, UserMenu } from '../common';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userApi from '../../api/modules/user.api';
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from '../../redux/features/userSlice';

const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if(response) dispatch(setUser(response));
            if(err) dispatch(setUser(null));
        };

        authUser();
    },[dispatch]);

    useEffect(() => {
        const getFavorites = async () => {
            const { response, err } = await favoriteApi.getList();

            if(response) dispatch(setListFavorites(response));

            if(err)  toast.error(err.message);
        };

        if(user) getFavorites();
        if(!user) dispatch(setListFavorites([]));
    }, [user, dispatch]);

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
            </Box>

            {/*------------------- Footer--------------- */}
            <Footer />
        </>
    );
};

export default MainLayout;
