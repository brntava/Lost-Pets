import { getItemAsync } from 'expo-secure-store';

export const getUserToken = async () => {
  try {
    const token = await getItemAsync('userToken');

    if (!token) return;

    return token;
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
};
