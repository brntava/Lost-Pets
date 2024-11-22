import axios from 'axios';

import { EditMissingPetType, MissingPetTypeRequest, MissingPetType } from '~/types/missingPetTypes';

const URL = process.env.URL;

export const addMissingPet = async (body: MissingPetTypeRequest, autCookie: string) => {
  const { data } = await axios.post<Promise<MissingPetType>>(`${URL}/api/MissingPet`, body, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });

  return data;
};

export const getMissingPet = async (lat: number, lng: number, radius: number) => {
  try {
    const { data } = await axios.get<Promise<MissingPetTypeRequest>>(
      `${URL}/api/MissingPet?latitude=${lat}&longitude=${lng}&radius=${radius}`
    );

    if (!data) return;

    return data;
  } catch (err) {
    throw new Error(`Error ${err}`);
  }
};

export const getMissingPetId = async (id: string) => {
  try {
    const { data } = await axios.get<Promise<MissingPetTypeRequest>>(`${URL}/api/MissingPet/${id}`);

    if (!data) return;

    return data;
  } catch (err) {
    throw new Error(`Error ${err}`);
  }
};

export const editMissingPet = async (
  petId: string,
  body: EditMissingPetType,
  autCookie: string
) => {
  const { data } = await axios.put<Promise<MissingPetTypeRequest>>(
    `${URL}/api/MissingPet/${petId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${autCookie}`,
      },
    }
  );

  return data;
};

export const deleteMissingPet = async (petId: string, autCookie: string) => {
  return await axios.delete<Promise<MissingPetTypeRequest>>(`${URL}/api/MissingPet/${petId}`, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });
};

export const deactivateMissingPet = async (petId: string, autCookie: string) => {
  return await axios.delete(`${URL}/api/MissingPet/${petId}/deactivate`, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });
};

export const activateMissingPet = async (petId: string, autCookie: string) => {
  return await axios.post(
    `${URL}/api/MissingPet/${petId}/activate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${autCookie}`,
      },
    }
  );
};

export const addMissingPetImage = async (petId: string, body: FormData, autCookie: string) => {
  const { data } = await axios.post<Promise<MissingPetTypeRequest>>(
    `${URL}/api/MissingPet/${petId}/image`,
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${autCookie}`,
      },
    }
  );

  return data;
};

export const deleteMissingPetImage = async (petId: string, imgId: string, autCookie: string) => {
  return await axios.delete(`${URL}/api/MissingPet/${petId}/image/${imgId}`, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });
};
