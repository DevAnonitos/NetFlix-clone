import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Modal } from "@mui/material";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

import { useSpring, animated } from 'react-spring';

const actionState = {
    signin: "signin",
    signup: "signup",
};

const AuthModal = () => {
    const { authModalOpen } = useSelector((state) => state.authModal);

    const dispatch = useDispatch();

    const [action, setAction] = useState(actionState.signin);

    useEffect(() => {
        if(authModalOpen) setAction(actionState.signin);
    }, [authModalOpen]);

    const handleClose = () => {
        dispatch(setAuthModalOpen(false));
    };

    const switchAuthState = (state) => {
        setAction(state);
    };

    const animation = useSpring({
        opacity: authModalOpen ? 1 : 0,
        scale: authModalOpen ? 1 : 0.8,
        from: {
            opacity: 0,
            scale: 0.8,
        },
    });

    return (
        <>
            <Modal
                open={authModalOpen}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        maxWidth: "600px",
                        padding: 4,
                        outline: "none",
                    }}
                >
                    <animated.div
                        style={{
                            opacity: animation.opacity,
                            transform: animation.scale.to((s) => `scale(${s})`),
                        }}
                    >
                        <Box
                            sx={{
                                padding: 4,
                                boxShadow: 24,
                                backgroundColor: "background.paper",
                                borderRadius: "25px",
                            }}
                        >
                            <Box
                                sx={{
                                    textAlign: "center",
                                    marginBottom: "2rem",
                                }}
                            >
                                <Logo />
                            </Box>
                            {action === actionState.signin &&
                                <SigninForm
                                    switchAuthState={() =>
                                        switchAuthState(actionState.signup)
                                    }
                                />
                            }
                            {action === actionState.signup &&
                                <SignupForm
                                    switchAuthState={() =>
                                        switchAuthState(actionState.signin)
                                    }
                                />
                            }
                        </Box>
                    </animated.div>
                </Box>
            </Modal>
        </>
    )
};

export default AuthModal;
