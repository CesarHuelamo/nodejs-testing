const env = process.env.NODE_ENV || "run";

const config = {
  run: {
    mongo: {
      url: "mongodb://admin:admin@127.0.0.1",
      dbName: "testing",
    },
  },
  test: {
    mongo: {
      url: "mongodb://admin:admin@127.0.0.1",
      dbName: "testing",
    },
  },
};

export default config[env];
