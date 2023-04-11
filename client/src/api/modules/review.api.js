import privateClient from "../client/public.client";

const reviewEndpoints = {
    list: "review",
    add: "review",
    remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
    }) => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.add,
                {
                    mediaId,
                    mediaPoster,
                    mediaType,
                    mediaTitle,
                    content,
                }
            );

            return { response };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    remove: async ({ reviewId }) => {
        try {
            const response = await privateClient.delete(reviewEndpoints.remove({
                reviewId
            }));

            return { response };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getList: async () => {
        try {
            const response = await privateClient.get(reviewEndpoints.list);

            return { response };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
