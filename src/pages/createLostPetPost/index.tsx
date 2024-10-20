import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, RefObject, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

import { ImagePickerScreen } from '~/components/ImagePickerScreen';
import { Loading } from '~/components/Loading';
import { SightingMap } from '~/components/SightingMap';
import { usePetsContext } from '~/context/petsContext';
import { SighthingType } from '~/types/sighthingTypes';

export const CreateLostPetPost = () => {
  const {
    sightings,
    setSightings,
    showSightings,
    setShowSightings,
    handleSubmitMissingPet,
    handleEditMissingPet,
    loggedUser,
    tabIndex,
  } = usePetsContext();

  const routes = useRoute();

  const editingPost = routes.params?.editingPost;
  const petImages = editingPost?.images;

  const [petName, setPetName] = useState<string>(editingPost?.pet.name ?? '');
  const [petSpecies, setPetSpecies] = useState<string>(editingPost?.pet.species ?? '');
  const [petAge, setPetAge] = useState<string>(editingPost?.pet.age ?? '');
  const [ageUnit, setAgeUnit] = useState('Anos');
  const [petDescription, setPetDescription] = useState<string>(editingPost?.pet.description);
  const [showPicker, setShowPicker] = useState(false);

  const [userContact, setUserContact] = useState(loggedUser?.contacts ?? []);
  const [editingIndex, setEditingIndex] = useState<any>(null);
  const [tempData, setTempData] = useState({
    description: '',
    address: '',
  });

  const speciesInput = useRef(null);
  const ageInput = useRef(null);
  const descriptionInput = useRef(null);
  const sightingDateInput = useRef(null);
  const contactInput = useRef(null);
  const opContactInput = useRef(null);

  const navigation = useNavigation();

  const handleNextInput = (nextInput: RefObject<HTMLInputElement>) => {
    nextInput.current.focus();
  };

  useEffect(() => {
    if (editingPost) setAgeUnit(petAge.includes('00') ? 'Meses' : ' Anos');
  }, []);

  useEffect(() => {
    if (tabIndex === 1) {
      setPetName('');
      setPetSpecies('');
      setPetAge('');
      setPetDescription('');
      setSightings([]);
      setUserContact(loggedUser?.contacts);
    }
  }, [tabIndex]);

  const handleEditToggle = (index: number | null, item: any) => {
    setEditingIndex(index);
    setTempData({
      description: item.description,
      address: item.location.address,
    });
  };

  const handleInputChange = (field: any, value: string) => {
    setTempData({
      ...tempData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    handleSubmitMissingPet({
      name: petName,
      species: petSpecies,
      age: ageUnit === 'Meses' ? `00${petAge}` : `11${petAge}`,
      description: petDescription,
      contact: userContact,
    });
  };

  const handleSave = (index: number, item: any) => {
    const updatedSighting = {
      ...item,
      description: tempData.description,
      location: {
        ...item.location,
        address: tempData.address,
      },
    };

    setSightings((prevSightings: SighthingType[]) => {
      const newSightings = [...prevSightings];
      newSightings[index] = updatedSighting;
      return newSightings;
    });

    setEditingIndex(null);
  };

  const handleRemoveSighting = async (index: number) => {
    setSightings(sightings.filter((_, i) => i !== index));
  };

  return (
    <>
      <Loading />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                {editingPost ? 'Editar Publicação' : 'Criar Publicação'}
              </Text>
            </View>
            <Text style={styles.label}>Nome do Pet</Text>
            <TextInput
              style={styles.input}
              value={petName}
              maxLength={25}
              onChangeText={(text: string) => setPetName(text.slice(0, 100))}
              onSubmitEditing={() => handleNextInput(speciesInput)}
              returnKeyType="next"
              placeholder="Nome"
            />
            <Text style={styles.label}>Espécie/Raça</Text>
            <TextInput
              ref={speciesInput}
              style={styles.input}
              value={petSpecies}
              maxLength={25}
              onChangeText={(text: string) => setPetSpecies(text.slice(0, 100))}
              onSubmitEditing={() => handleNextInput(ageInput)}
              returnKeyType="next"
              placeholder="Especie"
            />

            <Text style={styles.label}>Idade Pet</Text>
            <View style={styles.ageContainer}>
              <TextInput
                ref={ageInput}
                style={styles.input}
                value={petAge.includes('00') ? petAge.replace('00', '') : petAge.replace('11', '')}
                onChangeText={(text: string) => setPetAge(text)}
                onSubmitEditing={() => handleNextInput(contactInput)}
                keyboardType="numeric"
                returnKeyType="next"
                maxLength={2}
                placeholder="Idade"
              />
              <TouchableOpacity
                style={styles.ageUnitContainer}
                onPress={() => setShowPicker(showPicker)}>
                <Text style={styles.ageUnitText}>{ageUnit}</Text>
              </TouchableOpacity>
              <Picker
                selectedValue={ageUnit}
                style={styles.agePicker}
                onValueChange={(itemValue) => setAgeUnit(itemValue)}>
                <Picker.Item label="Anos" value="Anos" />
                <Picker.Item label="Meses" value="Meses" />
              </Picker>
            </View>

            <Text style={styles.label}>Contato</Text>
            <TextInput
              ref={contactInput}
              style={styles.input}
              value={userContact[0].content ?? loggedUser?.contacts[0].content}
              onChangeText={(text) => {
                let formattedText = text.replace(/\D/g, '');

                if (formattedText.length >= 10) {
                  if (formattedText.length <= 10) {
                    formattedText = formattedText.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                  } else {
                    formattedText = formattedText.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                  }
                }

                setUserContact((prevContacts) => {
                  const updatedContacts = [...prevContacts];
                  updatedContacts[0] = { ...updatedContacts[0], content: formattedText };

                  return updatedContacts;
                });
              }}
              onSubmitEditing={() => handleNextInput(opContactInput)}
              keyboardType="numeric"
              returnKeyType="next"
              maxLength={15}
              placeholder="Contato"
            />
            <Text style={styles.label}>Contato Opcional</Text>
            <TextInput
              ref={opContactInput}
              style={styles.input}
              value={userContact[1]?.content ?? loggedUser?.contacts[1]?.content}
              onChangeText={(text) => {
                let formattedText = text.replace(/\D/g, '');

                if (formattedText.length >= 10) {
                  if (formattedText.length <= 10) {
                    formattedText = formattedText.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                  } else {
                    formattedText = formattedText.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                  }
                }

                setUserContact((prevContacts) => {
                  const updatedContacts = [...prevContacts];
                  updatedContacts[1] = { ...updatedContacts[1], content: formattedText };

                  return updatedContacts;
                });
              }}
              onSubmitEditing={() => handleNextInput(descriptionInput)}
              keyboardType="numeric"
              returnKeyType="next"
              maxLength={15}
              placeholder="Contato opcional"
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              ref={descriptionInput}
              style={[styles.input, styles.descriptionInput]}
              multiline
              numberOfLines={4}
              value={petDescription}
              onChangeText={setPetDescription}
              onSubmitEditing={() => handleNextInput(sightingDateInput)}
              returnKeyType="next"
              placeholder="Descrição..."
            />

            {!editingPost && (
              <>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('sightingModal')}>
                  <Text style={styles.addButtonLabel}>Adicionar Avistamento</Text>
                </TouchableOpacity>
                {sightings.length > 0 ||
                  (editingPost?.sightings.length > 0 && (
                    <TouchableOpacity
                      style={styles.showSightingButton}
                      onPress={() => setShowSightings(!showSightings)}>
                      <Text style={styles.showSightingButtonLabel}>
                        {showSightings ? 'Esconder Avistamentos' : 'Ver Avistamentos'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                {showSightings &&
                  sightings.map((item: SighthingType, index: number) => {
                    return (
                      <Card style={styles.sightingCard} key={index}>
                        <Card.Title
                          title={item.sightingDate.toLocaleDateString('pt-br')}
                          titleVariant="titleMedium"
                          right={(props) => (
                            <View style={{ flexDirection: 'row' }}>
                              {editingIndex === index ? (
                                <IconButton
                                  {...props}
                                  icon="check"
                                  onPress={() => handleSave(index, item)}
                                  style={{ paddingLeft: 10 }}
                                  size={20}
                                />
                              ) : (
                                <IconButton
                                  {...props}
                                  icon="pencil"
                                  onPress={() => handleEditToggle(index, item)}
                                  style={{ paddingLeft: 10 }}
                                  size={20}
                                />
                              )}
                              <IconButton
                                {...props}
                                icon="trash-can-outline"
                                onPress={() => handleRemoveSighting(index)}
                                style={{ paddingRight: 10 }}
                                size={20}
                              />
                            </View>
                          )}
                        />
                        <Card.Content>
                          {editingIndex === index ? (
                            <TextInput
                              value={tempData.description}
                              onChangeText={(text) => handleInputChange('description', text)}
                              style={[styles.input, styles.sightingDescription]}
                            />
                          ) : (
                            <Text style={styles.sightingDescription} variant="bodyMedium">
                              {item.description}
                            </Text>
                          )}
                          <View style={styles.sightingLocation}>
                            <SightingMap isModal location={item.location} />
                          </View>
                        </Card.Content>
                      </Card>
                    );
                  })}
              </>
            )}
            <ImagePickerScreen
              isEditing={!!editingPost}
              petId={editingPost?.id}
              editingImages={petImages}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                return editingPost
                  ? handleEditMissingPet(editingPost?.id, {
                      name: petName,
                      species: petSpecies,
                      age:
                        ageUnit === 'Meses'
                          ? `00${petAge.includes('00') ? petAge.replace('00', '') : petAge.replace('11', '')}`
                          : `11${petAge.includes('11') ? petAge.replace('11', '') : petAge.replace('00', '')}`,
                      description: petDescription,
                    })
                  : handleSubmit();
              }}>
              <Text style={styles.submitButtonText}>
                {editingPost ? 'Salvar' : 'Enviar Publicação'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
