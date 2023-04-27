import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const favoriteEndpoints = {
    list: "user/favorites",
    add: "user/favorites",
    remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
    getList: async () => {
        try {
            const response = await publicClient.get(favoriteEndpoints.list);
            const headers = {
                'content-type': response.headers['content-type'],
                'content-length': response.headers['content-length'],
            };
            const data = response.data;
            const serializableResponse = {
                headers,
                data,
            };
            return { response: serializableResponse };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
        try {
            const response = await privateClient.post(favoriteEndpoints.add, {
                mediaId,
                mediaType,
                mediaTitle,
                mediaPoster,
                mediaRate,
            });

            return { response };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    remove: async ({ favoriteId }) => {
        try {
            const response = await privateClient.delete(favoriteEndpoints.remove({
                favoriteId,
            }));

            return { response };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

export default favoriteApi;
