module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "bin/rails server -p 3000",
    },
  },
};
