import axios from 'axios';

import { LoggedUser, LoginResponse, UserLoginBody, UserRequestBody } from '~/types/userTypes';

const URL = process.env.URL;

export const registerUser = async (body: UserRequestBody) => {
  return await axios.post(`${URL}/api/User/register`, body);
};

export const loginUser = async (body: UserLoginBody) => {
  const { data } = await axios.post<LoginResponse>(`${URL}/api/User/login`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { token, user } = data;

  return {
    token,
    user,
  };
};

export const getUser = async (id: string) => {
  const { data } = await axios.get<Promise<LoggedUser>>(`${URL}/api/User/${id}`);

  if (!data) return;

  return data;
};
