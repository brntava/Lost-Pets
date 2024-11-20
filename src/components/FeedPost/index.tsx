import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Text,
  Chip,
  Portal,
  Modal,
  Icon,
  Menu,
} from 'react-native-paper';

import { styles } from './styles';
import { Comments } from '../Comments';
import { ImageSkeleton } from '../ImageSkeleton';
import { SightingMap } from '../SightingMap';

import { usePetsContext } from '~/context/petsContext';
import { deleteMissingPet } from '~/services/MissingPets/missingPets';
import { PostImageType } from '~/types/imageTypes';
import { MissingPetType } from '~/types/missingPetTypes';
import { SightingModalNavigationProp } from '~/types/navigationTypes';
import { getUserToken } from '~/utils/getUserToken';

type FeedPostProps = {
  item: MissingPetType;
  index: number;
};

const URL = process.env.URL;

export const FeedPost = ({ item, index }: FeedPostProps) => {
  const {
    handleRemoveSighting,
    loggedUser,
    handleSearchMissingPet,
    setLoading,
    visitorUser,
    userImage,
  } = usePetsContext();

  const petName = item.pet.name;
  const petSpecies = item.pet.species;
  const petAge = item.pet.age;
  const userContact = item.user.contacts;
  const petDescription = item.pet.description;

  const [visible, setVisible] = useState(false);
  const [renderPostSightings, setRenderPostSightings] = useState(false);

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);

  const [optionsVisible, setOptionsVisible] = useState(false);

  const openMenu = () => setOptionsVisible(true);
  const closeMenu = () => setOptionsVisible(false);

  const navigation = useNavigation<SightingModalNavigationProp>();

  const isUserPost = item.user.id === loggedUser?.id;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const openImageModal = (imageUri: string) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const handleAddPostSighting = () => {
    setRenderPostSightings(false);

    navigation.navigate('sightingModal', { isPost: true, missingPetId: item.id });
  };

  const handleDelete = (id: string) => {
    Alert.alert('', 'Tem certeza que deseja excluir?', [
      {
        text: 'Cancelar',
        style: 'destructive',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const autCookie = await getUserToken();

          if (!autCookie) return;

          setLoading(true);

          await deleteMissingPet(id, autCookie);

          handleSearchMissingPet();

          setLoading(false);
        },
      },
    ]);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={imageModalVisible}
          onDismiss={closeImageModal}
          contentContainerStyle={styles.imageModal}>
          {imageLoad && <ImageSkeleton fullScreen />}
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
              onLoadStart={() => setImageLoad(true)}
              onLoad={() => setImageLoad(false)}
              onError={() => {
                setImageLoad(false);
                console.error('Erro ao carregar a imagem');
              }}
            />
          )}
          <IconButton
            icon="close"
            iconColor="#fff"
            size={30}
            onPress={closeImageModal}
            style={styles.closeButton}
          />
        </Modal>
      </Portal>
      <View style={styles.cardContainer} key={index}>
        <Card style={{ backgroundColor: '#fffafa' }}>
          <Card.Title
            title={item.user.userName}
            subtitle={new Date(item.createdAt).toLocaleString('pt-br', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
            titleVariant="titleMedium"
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{
                  uri: userImage.uri ?? item.user.image.url.replace('http://localhost:5241', URL),
                }}
              />
            )}
            right={(props) => (
              <>
                {isUserPost && (
                  <Menu
                    visible={optionsVisible}
                    onDismiss={closeMenu}
                    style={{ marginTop: 20 }}
                    contentStyle={{ backgroundColor: '#fffafa' }}
                    anchor={
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        size={20}
                        onPress={openMenu}
                        style={{ paddingRight: 10 }}
                      />
                    }>
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        navigation.navigate('createLostPetPost', {
                          editingPost: {
                            id: item.id,
                            pet: item.pet,
                            sightings: item.sightings,
                            images: item.images,
                            contacts: item.user.contacts,
                          },
                        });
                      }}
                      title="Editar"
                      leadingIcon="pencil"
                    />
                    <Menu.Item onPress={() => {}} title="Desativar" leadingIcon="eye-off" />
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        handleDelete(item.id);
                      }}
                      title="Excluir"
                      leadingIcon="trash-can-outline"
                    />
                  </Menu>
                )}
              </>
            )}
          />
          <Card.Content>
            <View style={{ flexWrap: 'wrap' }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Text style={styles.postTitle}>
                  {petName} | {petSpecies}
                </Text>
                <View style={styles.contactContainer}>
                  <Icon source="phone" size={18} />
                  <Text style={styles.postContent}>
                    {userContact.length > 1
                      ? `${userContact[0]?.content} | ${userContact[1]?.content}`
                      : `${userContact[0]?.content}`}
                  </Text>
                </View>
                <View style={styles.ageContainer}>
                  <Icon source="calendar-month" size={18} />
                  <Text style={styles.postContent}>
                    {petAge.includes('00')
                      ? `${petAge.replace('00', '')} ${petAge === '001' ? 'Mes' : 'Meses'}`
                      : `${petAge.replace('11', '')} ${petAge === '111' ? 'Ano' : 'Anos'}`}
                  </Text>
                </View>
              </View>
              <Text style={styles.petDescription}>{petDescription}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.cardImgContinainer}>
                {item.images?.map((image: PostImageType, index: number) => {
                  const imgURL = image.url.replace('http://localhost:5241', `${URL}/`);

                  return (
                    <TouchableOpacity key={index} onPress={() => openImageModal(imgURL)}>
                      <Card.Cover
                        source={{
                          uri: imgURL,
                        }}
                        onError={() => {
                          console.error('Erro ao carregar a imagem');
                        }}
                        style={styles.cardImg}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Card.Content>
          <Chip
            icon="map-marker"
            style={[styles.cardComment, styles.cardSightings]}
            onPress={() => setRenderPostSightings(true)}>
            Avistamentos
          </Chip>
          {renderPostSightings && (
            <Portal>
              <Modal
                visible={renderPostSightings}
                onDismiss={() => setRenderPostSightings(false)}
                contentContainerStyle={styles.postSightingsModalContainer}>
                <View style={styles.postSightingsModalHeader}>
                  <IconButton
                    icon="close"
                    size={30}
                    onPress={() => setRenderPostSightings(false)}
                  />
                  <Text style={styles.sightingTitle}>Avistamentos</Text>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => {
                      if (visitorUser) return;

                      handleAddPostSighting();
                    }}
                    iconColor="#fff"
                    style={
                      !visitorUser
                        ? { backgroundColor: '#228c80' }
                        : { backgroundColor: 'transparent' }
                    }
                  />
                </View>
                <ScrollView>
                  {item.sightings.map(
                    ({ sightingDate, description, location, id, user, address }, index: number) => {
                      const isUserSighting = user.id === loggedUser?.id;

                      return (
                        <Card style={styles.sightingCard} key={id}>
                          <Card.Title
                            title={new Date(sightingDate).toLocaleDateString('pt-br')}
                            titleVariant="titleMedium"
                            subtitle={address}
                            subtitleStyle={{ flexWrap: 'wrap', marginBottom: 12 }}
                            subtitleNumberOfLines={2}
                            right={(props) => (
                              <>
                                {isUserSighting && (
                                  <IconButton
                                    {...props}
                                    icon="trash-can-outline"
                                    onPress={() => {
                                      if (item.sightings.length === 1) {
                                        alert(
                                          'Não foi possível remover. \n\nÉ necessário pelo menos um avistamento por publicação.'
                                        );
                                        return;
                                      }

                                      Alert.alert('', 'Tem certeza que deseja excluir?', [
                                        {
                                          text: 'Cancelar',
                                          style: 'destructive',
                                        },
                                        {
                                          text: 'Excluir',
                                          onPress: async () => {
                                            handleRemoveSighting(`${id}`);
                                            setRenderPostSightings(false);
                                          },
                                        },
                                      ]);
                                    }}
                                    style={{ paddingRight: 10 }}
                                    size={15}
                                  />
                                )}
                              </>
                            )}
                          />
                          <Card.Content>
                            <Text style={styles.sightingDescription} variant="bodyMedium">
                              {description}
                            </Text>
                            <View style={styles.sightingLocation}>
                              <SightingMap isModal location={location} />
                            </View>
                          </Card.Content>
                        </Card>
                      );
                    }
                  )}
                </ScrollView>
              </Modal>
            </Portal>
          )}
          <Chip icon="comment" style={styles.cardComment} onPress={showModal}>
            Comentarios...
          </Chip>
          <Comments visible={visible} hideModal={hideModal} item={item} key={index} />
        </Card>
      </View>
    </>
  );
};
