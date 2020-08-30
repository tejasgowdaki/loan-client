import jwtDecoder from 'jwt-decode';

export const fetchAccountFromToken = (token) => {
  return jwtDecoder(token);
};
