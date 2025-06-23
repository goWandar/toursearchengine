import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (accessToken: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    return Date.now() >= exp * 1000;
  } catch (err) {
    return true;
  }
};
