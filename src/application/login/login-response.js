const loginResponseBuilder = ({ user, jwt }) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  jwt,
});

module.exports = { loginResponseBuilder };
