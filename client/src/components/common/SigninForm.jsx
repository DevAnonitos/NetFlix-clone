import React, { useState, useEffect } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontSize: 16,
    },
});


const SigninForm = ({ switchAuthState }) => {

    const dispatch = useDispatch();

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signinForm = useFormik({
        initialValues: {
            password: "",
            username: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "Username minimum 8 characters🥲")
                .required("Username is required 😀"),
            password: Yup.string()
                .min(8, "Password minimum 8 characters🥲")
                .required("Password is required 😀"),
        }),
        onSubmit: async values => {
            setErrorMessage(undefined);
            setIsLoginRequest(true);
            console.log("Dark");
            const { response, err } = await userApi.signin(values);
            setIsLoginRequest(false);

            if(response) {
                signinForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                localStorage.setItem("user", JSON.stringify(response));
                toast.success("Sign in success😀");
            }

            if(err) {
                setErrorMessage(err.message);
                toast.error("Something went wrongs😢");
            }
        },
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch(setUser(user));
        }
    }, []);

    return (
        <>
            <Box
                component="form"
                onSubmit={signinForm.handleSubmit}
            >
                <Stack spacing={3}>
                    <TextField
                        type='text'
                        placeholder='Username'
                        name='username'
                        fullWidth
                        onChange={signinForm.handleChange}
                        value={signinForm.values.username}
                        error={signinForm.touched.username
                            && signinForm.errors.username !== undefined
                        }
                        helperText={signinForm.touched.username
                            && signinForm.errors.username
                        }
                    />
                    <TextField
                        type='password'
                        placeholder='Password'
                        name='password'
                        fullWidth
                        value={signinForm.values.password}
                        onChange={signinForm.handleChange}
                        error={signinForm.touched.password
                            && signinForm.errors.password !== undefined
                        }
                        helperText={signinForm.touched.password
                            && signinForm.errors.password
                        }
                    />
                </Stack>
                <ThemeProvider theme={theme}>
                    <LoadingButton
                        type='submit'
                        fullWidth
                        size='large'
                        variant='contained'
                        sx={{
                            marginTop: 4,
                            backgroundColor: "#25c2a0",
                            ":hover": {
                                backgroundColor: "#24d2a9",
                            },
                        }}
                        loading={isLoginRequest}
                    >
                        Sign In
                    </LoadingButton>
                </ThemeProvider>

                <Button
                    fullWidth
                    sx={{
                        marginTop: 1,
                        color: "#25c2a0"
                    }}
                    onClick={() => switchAuthState()}
                >
                    Sign up
                </Button>
                {errorMessage && (
                    <Box sx={{marginTop: 2}}>
                        <Alert
                            severity='error'
                            variant='outline'
                        >
                            {errorMessage}
                        </Alert>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default SigninForm;
