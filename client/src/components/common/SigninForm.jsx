import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Box,
    Button,
    Stack,
    TextField
} from "@mui/material";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";

const SigninForm = ({ switchAuthState }) => {

    const dispatch = useDispatch();

    const [isLoginRequest, setIsLoginRequest] = useState(false);

    return (
        <>
            SigninForm
        </>
    );
};

export default SigninForm;
