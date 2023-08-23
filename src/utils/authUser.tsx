export const getUser = (): User | null => {
  const Rawuser = localStorage.getItem('user');
  if (!Rawuser) {
    return null;
  } else {
    return JSON.parse(Rawuser);
  }
};

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const deleteUser = () => {
  localStorage.removeItem('user');
};
