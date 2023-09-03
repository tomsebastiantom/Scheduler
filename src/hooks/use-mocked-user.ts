import type { User } from 'src/types/user';

export const useMockedUser = (): User => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    name: 'Anika Visser',
    email: 'anika.visser@devias.io',
    username:" Aik",
    password:"123456",
    createdAt:"2021-06-01T12:20:32.000Z",
    updatedAt:"2021-06-01T12:20:32.000Z",
  };
};
