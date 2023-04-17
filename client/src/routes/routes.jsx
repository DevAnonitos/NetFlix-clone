import {
    HomePage,
    PersonDetail,
    FavoriteList,
    MediaDetail,
    MediaList,
    MediaSearch,
    PasswordUpdate,
    ReviewList
} from "../pages";

import { ProtectedPage } from "../components/common";

export const routesGen = {
    home: "/",
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    mediaSearch: "/search",
    person: (id) => `/person/${id}`,
    favoriteList: "/favorites",
    reviewList: "/reviews",
    passwordUpdate: "password-update"
};

const routes = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/person/:personId",
        element: <PersonDetail />,
        state: "person.detail"
    },
    {
        path: "/search",
        element: <MediaSearch />,
        state: "search"
    },
    {
        path: "/password-update",
        element: (
            <ProtectedPage>
                <PasswordUpdate />
            </ProtectedPage>
        ),
        state: "password.update"
    },
    {
        path: "/favorites",
        element: (
            <ProtectedPage>
                <FavoriteList />
            </ProtectedPage>
        ),
        state: "favorites"
    },
    {
        path: "/reviews",
        element: (
            <ProtectedPage>
                <ReviewList />
            </ProtectedPage>
        ),
        state: "reviews"
    },
    {
        path: "/:mediaType",
        element: <MediaList />
    },
    {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail />
    }
];

export default routes;
