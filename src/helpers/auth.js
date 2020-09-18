import jwtDecoder from 'jwt-decode';

export const fetchDateFromToken = (token) => {
  return jwtDecoder(token);
};
