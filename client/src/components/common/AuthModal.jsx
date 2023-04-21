import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Modal } from "@mui/material";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const actionState = {
    signin: "signin",
    signup: "signup",
};

const AuthModal = () => {
    return (
        <>
            <Modal>
                <Box>
                    
                </Box>
            </Modal>
        </>
    )
};

export default AuthModal;
