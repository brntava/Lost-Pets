import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, Platform, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

import { styles } from './styles';

import { usePetsContext } from '~/context/petsContext';
import { addUserImage } from '~/services/Users/users';
import { ImageType } from '~/types/imageTypes';
import { getUserToken } from '~/utils/getUserToken';

type ImageProps = {
  isEditing?: boolean;
  petId?: string;
  editingImages?: any;
  isProfile?: boolean;
};

type EditingPetPhotoParams = {
  added?: [
    {
      petId: string;
      formData: FormData;
    },
  ];
  removed?: [
    {
      petId: string;
      imageId: string;
    },
  ];
};

const baseURL = process.env.URL;

export const ImagePickerScreen = ({ isEditing, petId, editingImages, isProfile }: ImageProps) => {
  const { petPhoto, setPetPhoto, setEditingAddPetPhoto, setEditingRemovePetPhoto, setUserImage } =
    usePetsContext();

  const [editPostImages, setEditPostImages] = useState(editingImages ?? []);

  useEffect(() => {
    if (isEditing) setPetPhoto(editingImages);
  }, []);

  const pickImage = async () => {
    if (Platform.OS === 'web') return;

    const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (libraryStatus.status !== 'granted') {
      alert('Desculpe, precisamos da permissão da galeria para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    if (isProfile) {
      setUserImage(result.assets[0]);
      handleUserImage(result.assets[0]);
    }

    const formData = new FormData();

    formData.append('formFiles', {
      uri: result.assets[0].uri,
      name: result.assets[0].fileName || 'name',
      type: result.assets[0].type,
    });

    if (isEditing) {
      setEditingAddPetPhoto((photos: EditingPetPhotoParams) => ({
        added: [
          ...(photos?.added || []),
          {
            petId,
            formData,
          },
        ],
      }));
    }

    if (!isProfile) setPetPhoto((img: any) => [...img, result.assets[0]]);
  };

  const removeImage = (imgIndex: number) => {
    if (isEditing) {
      setEditingRemovePetPhoto((photos: EditingPetPhotoParams) => ({
        removed: [
          ...(photos?.removed || []),
          {
            petId,
            imageId: editPostImages[imgIndex]?.id,
          },
        ],
      }));

      setEditPostImages((images: ImageType[]) => images.filter((_, index) => index !== imgIndex));
    }

    setPetPhoto((images: ImageType[]) => images.filter((_, index) => index !== imgIndex));
  };

  const handleUserImage = async (image: any) => {
    const formData = new FormData();

    formData.append('formFile', {
      uri: image?.uri,
      name: image.fileName || 'name',
      type: image.type,
    });

    try {
      const autCookie = await getUserToken();

      if (!autCookie) return;

      const image2 = await addUserImage(formData, autCookie);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isProfile ? (
        <View style={styles.addProfileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.addProfileImage}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Fotos</Text>
            {petPhoto?.length < 4 && (
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.addImg}>+</Text>
              </TouchableOpacity>
            )}
          </View>
          {petPhoto && (
            <>
              {petPhoto.map((img: any, index: number) => {
                const imgURL = img.url?.replace('https://localhost:5241', `${baseURL}/`);

                return (
                  <View style={styles.imageContainer} key={index}>
                    <Image source={{ uri: img.uri ?? imgURL }} style={styles.image} />
                    <IconButton
                      icon="trash-can"
                      size={20}
                      style={styles.trashIcon}
                      onPress={() => removeImage(index)}
                    />
                  </View>
                );
              })}
            </>
          )}
        </View>
      )}
    </>
  );
};
