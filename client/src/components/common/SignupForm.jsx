import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
import {
    Alert,
    Box,
    Button,
    Stack,
    TextField
} from "@mui/material";

const SignupForm = ({ switchAuthState }) => {

    const dispatch = useDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signForm = useFormik({
        initialValues: {
            password: "",
            username: "",
            displayName: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "Username minimum 8 characters🥲")
                .required("Username is required😀"),
            password: Yup.string()
                .min(8, "Password minimum 8 characters🥲")
                .required("Password is required😀"),
            displayName: Yup.string()
                .min(8, "DisplayName minimum 8 characters🥲")
                .required("DisplayName is required😀"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "ConfirmPassword not match")
                .min(8, "ConfirmPassword minimum 8 characters🥲")
                .required("ConfirmPassword is required😀")
        })
    })

    return (
        <>
            <Box>

            </Box>
        </>
    );
};

export default SignupForm;
