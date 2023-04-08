export const loginResponseBuilder = ({ user, jwt }) => ({
  user: {
    id: user.id,
    name: user.name,
  },
  jwt,
});
