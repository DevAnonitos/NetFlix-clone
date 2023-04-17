import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
    {
        display: "Home",
        path: "/",
        icon: <HomeOutlinedIcon />,
        state: "home"
    },
    {
        display: "Movies",
        path: "/movie",
        icon: <SlideshowOutlinedIcon />,
        state: "movie"
    },
    {
        display: "TV series",
        path: "/tv",
        icon: <LiveTvOutlinedIcon />,
        state: "tv"
    },
    {
        display: "Search",
        path: "/search",
        icon: <SearchOutlinedIcon />,
        state: "search"
    }
];

const user = [
    {
        display: "Favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutlinedIcon />,
        state: "favorite"
    },
    {
        display: "Reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon />,
        state: "reviews"
    },
    {
        display: "Password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon />,
        state: "password.update"
    }
];

const menuConfigs = { main, user };

export default menuConfigs;
