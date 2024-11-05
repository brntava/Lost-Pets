import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

import { createContact, deleteContact, updateContact } from '~/services/Contacts/contacts';
import {
  addMissingPet,
  addMissingPetImage,
  deleteMissingPetImage,
  editMissingPet,
  getMissingPet,
} from '~/services/MissingPets/missingPets';
import { createSighthing, deleteSighthing } from '~/services/MissingPets/sighthings';
import { loginUser, registerUser } from '~/services/Users/users';
import { CommentsType } from '~/types/commentTypes';
import { ContactType } from '~/types/contactTypes';
import { LocationType } from '~/types/locationTypes';
import { PetTypeRequest } from '~/types/petTypes';
import { ImageType } from '~/types/photoTypes';
import { SighthingType } from '~/types/sighthingTypes';
import { LoggedUser, LoginResponse, UserRequestBody } from '~/types/userTypes';
import { findUpdatedContacts } from '~/utils/findUpdatedContacts';
import { getUserToken } from '~/utils/getUserToken';
import { saveUserToken } from '~/utils/saveUserToken';

type FeedLocationType = {
  address: string;
  lat: number;
  lng: number;
};

type MyContextType = {
  petName: string;
  setPetName: (petName: string) => void;
  petSpecies: string;
  setPetSpecies: (petSpecies: string) => void;
  petAge: string;
  setPetAge: (petAge: string) => void;
  petDescription: string;
  setPetDescription: (petDescription: string) => void;
  sightings: any[];
  setSightings: (sightings: any) => void;
  sightingDate: Date;
  setSightingDate: (sightingDate: Date) => void;
  sightingDescription: string;
  setSightingDescription: (sightingDescription: string) => void;
  showSightings: boolean;
  setShowSightings: (showSightings: boolean) => void;
  addSightingVisible: boolean;
  setAddSightingVisible: (addSightingVisible: boolean) => void;
  comments: any;
  setComments: (comments: any) => void;
  handleAddSighting: (isPost: boolean, missingPetId: string) => void;
  handleSubmitMissingPet: (data: PetTypeRequest) => void;
  sightingLocation: LocationType;
  setSightingLocation: (sightingLocation: LocationType) => void;
  missingPetPost: any[];
  setMissingPetPost: (missingPetPost: never[]) => void;
  petPhoto: any[];
  setPetPhoto: (petPhoto: any) => void;
  missingPetContact: string;
  setMissingPetContact: (missingPetContact: string) => void;
  handleRemoveSighting: (index: string) => void;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  isFeedLocation: boolean;
  setIsFeedLocation: (isFeedLocation: boolean) => void;
  feedLocation: FeedLocationType;
  setFeedLocation: (feedLocation: FeedLocationType) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleSubmitLogin: (user: string, password: string) => void;
  loggedUser: LoggedUser;
  setLoggedUser: (loggedUser: LoggedUser | null) => void;
  visitorUser: boolean;
  setVisitorUser: (visitorUser: boolean) => void;
  handleRegisterUser: (data: UserRequestBody) => void;
  handleEditMissingPet: (id: string, data: PetTypeRequest) => void;
  handleSearchMissingPet: () => void;
  postSightings: any;
  setPostSightings: (postSightings: any) => void;
  editingAddPetPhoto: any;
  setEditingAddPetPhoto: (editingAddPetPhoto: any) => void;
  editingRemovePetPhoto: any;
  setEditingRemovePetPhoto: (editingRemovePetPhoto: any) => void;
};

const PetsContext = createContext<MyContextType | undefined>(undefined);

export const PetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [isFeedLocation, setIsFeedLocation] = useState(false);
  const [feedLocation, setFeedLocation] = useState<FeedLocationType>({
    address: '',
    lat: 0,
    lng: 0,
  });

  const [sightingDate, setSightingDate] = useState(new Date());
  const [sightingDescription, setSightingDescription] = useState('');
  const [showSightings, setShowSightings] = useState(false);
  const [addSightingVisible, setAddSightingVisible] = useState(false);
  const [sightingLocation, setSightingLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0032,
    longitudeDelta: 0.0032,
    address: '',
  });
  const [petPhoto, setPetPhoto] = useState<any>([]);
  const [editingAddPetPhoto, setEditingAddPetPhoto] = useState<any>({});
  const [editingRemovePetPhoto, setEditingRemovePetPhoto] = useState<any>({});
  const [missingPetContact, setMissingPetContact] = useState('');
  const [postSightings, setPostSightings] = useState<any>([]);

  const [comments, setComments] = useState([]);

  const [sightings, setSightings] = useState<SighthingType[]>([]);
  const [missingPetPost, setMissingPetPost] = useState([]);

  const [loggedUser, setLoggedUser] = useState<any>({});
  const [visitorUser, setVisitorUser] = useState(false);

  const { latitude, longitude, address } = sightingLocation;

  const navigation = useNavigation();

  const handleRegisterUser = async (data: UserRequestBody) => {
    try {
      setLoading(true);

      await registerUser(data);

      await handleSubmitLogin(data.email, data.password);

      setLoading(false);

      alert('Usuario cadastrado com sucesso!');
    } catch (err) {
      setLoading(false);

      alert(`Ocorreu um erro inesperado: ${err.response?.data}`);

      throw new Error(`Error ${err}`);
    }
  };

  const handleSubmitLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const data: LoginResponse = await loginUser({
        email: 'bruno5@gmail.com',
        password: '123456',
      });

      const { token, user } = data;

      saveUserToken(token);
      setLoggedUser(user);

      return navigation.reset({
        index: 0,
        routes: [{ name: 'feed' }],
      });
    } catch (err) {
      alert('Usúario ou senha incorreta');

      console.log(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleAddSighting = async (isPost: boolean, missingPetId: string) => {
    if (!sightingDate || !sightingLocation || !sightingDescription) {
      alert('É necessário preencher todos os campos informados');
      return;
    }

    const autCookie = await getUserToken();

    if (!autCookie) return;

    let newSighting = {
      user: loggedUser?.user,
      sightingDate,
      location: {
        latitude,
        longitude,
        address,
      },
      description: sightingDescription,
      missingPetId,
    };

    if (isPost) {
      setLoading(true);

      const { data } = await createSighthing(newSighting, autCookie);

      await handleSearchMissingPet();

      setLoading(false);

      newSighting = data;
    }

    setSightings([...sightings, newSighting]);
    setSightingDescription('');
    setShowSightings(true);
    setAddSightingVisible(false);

    navigation.goBack();
  };

  const handleRemoveSighting = async (sightingId: string) => {
    const autCookie = await getUserToken();

    if (!autCookie) return;

    setLoading(true);

    await deleteSighthing(sightingId, autCookie);

    await handleSearchMissingPet();

    setLoading(false);
  };

  const handleSubmitMissingPet = async (data: PetTypeRequest) => {
    if (
      data.name === '' ||
      data.age === null ||
      data.species === '' ||
      data.description === '' ||
      sightings.length === 0 ||
      petPhoto.length === 0
    ) {
      alert('É necessário preencher todos os campos informados e pelos menos um avistamento');
      return;
    }

    const postData = {
      sightings: sightings.map((sighting, index) => ({
        sightingDate: sighting.sightingDate,
        location: {
          latitude: sighting.location.latitude,
          longitude: sighting.location.longitude,
          address: sighting.location.address,
        },
        description: sighting.description,
      })),
      pet: {
        name: data.name,
        species: data.species,
        age: data.age,
        description: data.description,
      },
      status: 0,
    };

    try {
      const token = await getUserToken();

      if (!token) return;

      setLoading(true);

      const addMissingPetPromisse = await addMissingPet(postData, token);

      const contactsToUpdate = findUpdatedContacts(data.contact ?? [], loggedUser?.contacts);

      const updateContactPromises = contactsToUpdate?.map(async (contact: ContactType) => {
        if (!contact.id) {
          return await createContact(
            {
              type: 0,
              content: contact.content,
            },
            token
          );
        }

        if (contact.content !== '') {
          return await updateContact(
            contact.id,
            {
              type: 0,
              content: contact.content,
            },
            token
          );
        }
      });

      if (data.removedContact?.removed) {
        await deleteContact(data.removedContact.id, token);
      }

      const uploadPromises = petPhoto?.map(async (photo: any) => {
        const formData = new FormData();

        formData.append('formFiles', {
          uri: photo.uri,
          name: photo.fileName || 'name',
          type: photo.type,
        });

        await addMissingPetImage(addMissingPetPromisse.id, formData, token);
      });

      await Promise.all([addMissingPetPromisse, ...updateContactPromises, ...uploadPromises]);

      handleSearchMissingPet();

      setPetPhoto([]);
      setMissingPetContact('');

      setLoading(false);
      setTabIndex(0);
    } catch (err) {
      console.error('Error:', err);

      setLoading(false);
    }
  };

  const handleEditMissingPet = async (id: string, data: PetTypeRequest) => {
    try {
      const autCookie = await getUserToken();

      if (
        !autCookie ||
        data.name === '' ||
        data.species === '' ||
        data.age === null ||
        data.description === ''
      ) {
        alert('Preencha todos os campos');

        return;
      }

      if (petPhoto.length === 0) {
        alert('É necessário pelo menos uma foto');

        return;
      }

      const body = {
        pet: {
          id,
          name: data.name,
          species: data.species,
          age: data.age,
          description: data.description,
        },
        status: 0,
      };

      setLoading(true);

      if (editingRemovePetPhoto) {
        if (editingRemovePetPhoto.removed?.length > 0) {
          for (const { petId, imageId } of editingRemovePetPhoto.removed) {
            await deleteMissingPetImage(petId, imageId, autCookie);
          }

          setEditingRemovePetPhoto({ removed: [] });
        }
      }

      if (editingAddPetPhoto) {
        if (editingAddPetPhoto.added?.length > 0) {
          for (const { petId, formData } of editingAddPetPhoto.added) {
            await addMissingPetImage(petId, formData, autCookie);
          }

          setEditingAddPetPhoto({ added: [] });
        }
      }

      const editMissingPetPromisse = await editMissingPet(id, body, autCookie);

      const contactsToUpdate = findUpdatedContacts(data.contact ?? [], loggedUser?.contacts);

      const updateContactPromises = contactsToUpdate?.map(async (contact: ContactType) => {
        if (!contact.id) {
          return await createContact(
            {
              type: 0,
              content: contact.content,
            },
            autCookie
          );
        }

        return await updateContact(
          contact.id,
          {
            type: 0,
            content: contact.content,
          },
          autCookie
        );
      });

      if (data.removedContact?.removed) {
        await deleteContact(data.removedContact.id, autCookie);
      }

      await Promise.all([editMissingPetPromisse, ...updateContactPromises]);

      handleSearchMissingPet();

      setPetPhoto([]);

      setLoading(false);

      navigation.navigate('feed');
    } catch (err) {
      setPetPhoto([]);
      setLoading(false);

      console.error('Error:', err);
    }
  };

  const handleSearchMissingPet = async () => {
    const data = (await getMissingPet(feedLocation.lat, feedLocation.lng, 50)) as any;

    setMissingPetPost(data ?? []);
  };

  useEffect(() => {
    setIsFeedLocation(false);

    if (tabIndex === 2) setIsFeedLocation(true);
  }, [tabIndex]);

  return (
    <PetsContext.Provider
      value={{
        petName,
        setPetName,
        petSpecies,
        setPetSpecies,
        petAge,
        setPetAge,
        petDescription,
        setPetDescription,
        sightings,
        setSightings,
        sightingDate,
        setSightingDate,
        sightingDescription,
        setSightingDescription,
        comments,
        setComments,
        showSightings,
        setShowSightings,
        addSightingVisible,
        setAddSightingVisible,
        handleAddSighting,
        handleSubmitMissingPet,
        handleSubmitLogin,
        sightingLocation,
        setSightingLocation,
        missingPetPost,
        setMissingPetPost,
        petPhoto,
        setPetPhoto,
        missingPetContact,
        setMissingPetContact,
        handleRemoveSighting,
        tabIndex,
        setTabIndex,
        isFeedLocation,
        setIsFeedLocation,
        feedLocation,
        setFeedLocation,
        loading,
        setLoading,
        loggedUser,
        setLoggedUser,
        visitorUser,
        setVisitorUser,
        handleRegisterUser,
        handleEditMissingPet,
        handleSearchMissingPet,
        postSightings,
        setPostSightings,
        editingAddPetPhoto,
        setEditingAddPetPhoto,
        editingRemovePetPhoto,
        setEditingRemovePetPhoto,
      }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePetsContext = (): MyContextType => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
