import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeMode = {
    dark: "dark",
    light: "light",
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode === themeMode.dark ? {
            primary: {
                main: "#20232a",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#61dafb",
                contrastText: "#ffffff",
            },
            background: {
                default: "#282c34",
                paper: "#131313"
            }
        } : {
            primary: {
                main: " #61dafb"
            },
            secondary: {
                main: "#17a2b8"
            },
            background: {
                default: colors.grey["100"],
            },
        };

        return createTheme({
            palette: {
                mode,
                ...customPalette,
            },
            components: {
                MuiButton: {
                    defaultProps: {disableElevation: true},
                },
            },
        })
    },
};

export default themeConfigs;
