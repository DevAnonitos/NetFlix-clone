import React from 'react';
import { Typography, useTheme } from '@mui/material';

const Logo = () => {
    const theme = useTheme();
    return (
        <>
            <Typography fontWeight="700" fontSize="1.7rem">
                MovieNet<span className='text-emerald-500'>Flix</span>
            </Typography>
        </>
    );
};

export default Logo;
