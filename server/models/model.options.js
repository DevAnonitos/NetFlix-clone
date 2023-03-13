const modelOptions = {
    toJSON: {
        virtual: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    toObject: {
        virtual: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    versionKey: false,
    timestamps: true,
};

export default modelOptions;
