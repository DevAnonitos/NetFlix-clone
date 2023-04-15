const favoriteUtils = {
    check: ({ listFavorite, mediaId }) => listFavorite && listFavorite.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
};

export default favoriteUtils;
