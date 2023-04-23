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

    const signupForm = useFormik({
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
        }),
        onSubmit: async values => {
            setErrorMessage(undefined);
            setIsLoginRequest(true);
            const { response, err } = await userApi.signup(values);
            setIsLoginRequest(false);

            if(response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("Sign up success");
            }


            if(err) {
                setErrorMessage(err.message);
                toast.error("Something went wrong!")
            }
        }
    })

    return (
        <>
            <Box
                component="form"
                onSubmit={signupForm.handleSubmit}
            >
                <Stack spacing={3}>
                    <TextField
                        type="text"
                        placeholder='Username'
                        name='username'
                        fullWidth
                        value={signupForm.values.username}
                        onChange={signupForm.handleChange}
                        error={signupForm.touched.username
                            && signupForm.errors.username !== undefined
                        }
                        helperText={signupForm.touched.username
                            && signupForm.errors.username
                        }
                    />
                    <TextField
                        type="text"
                        placeholder='Displayname'
                        name='displayname'
                        fullWidth
                        value={signupForm.values.displayName}
                        onChange={signupForm.handleChange}
                        error={signupForm.touched.displayName
                            && signupForm.errors.displayName !== undefined
                        }
                        helperText={signupForm.touched.displayName
                            && signupForm.errors.displayName
                        }
                    />
                </Stack>
            </Box>
        </>
    );
};

export default SignupForm;
