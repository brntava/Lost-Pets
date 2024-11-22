import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, RefObject, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, Icon, IconButton, Modal, Portal, Text } from 'react-native-paper';
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
  const [editContact, setEditContact] = useState(false);
  const [editOpContact, setEditOpContact] = useState(false);
  const [removedContact, setRemovedContact] = useState('');

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
    if (editingPost) {
      const unit = petAge.includes('00') ? 'Meses' : 'Anos';

      setAgeUnit(unit);
    }

    setRemovedContact('');
    setUserContact(editingPost?.contacts ?? loggedUser?.contacts);
  }, []);

  useEffect(() => {
    if (tabIndex === 1) {
      setPetName('');
      setPetSpecies('');
      setPetAge('');
      setPetDescription('');
      setRemovedContact('');
      setSightings([]);
      setEditContact(false);
      setEditOpContact(false);
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
      removedContact: {
        removed: removedContact !== '',
        id: removedContact !== '' ? removedContact : '',
      },
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

  const handleEditContact = () => {
    if (editContact) contactInput.current.focus();

    setEditContact(!editContact);
  };

  const handleEditOpContact = () => {
    setEditOpContact(!editOpContact);
    if (!editOpContact) opContactInput.current.focus();
  };

  const handleDeleteOpContact = () => {
    setUserContact((prevContacts) => {
      const updatedContacts = [...prevContacts];

      updatedContacts[1].content = '';

      setRemovedContact(updatedContacts[1].id);

      return updatedContacts;
    });
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
              <TouchableOpacity style={styles.ageUnitContainer} onPress={() => setShowPicker(true)}>
                <Text style={styles.ageUnitText}>{ageUnit}</Text>
                <Icon source="arrow-down-drop-circle-outline" size={18} color="black" />
              </TouchableOpacity>
            </View>
            {showPicker && (
              <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                  <Picker
                    selectedValue={ageUnit}
                    onValueChange={setAgeUnit}
                    style={{ height: 180 }}>
                    <Picker.Item label="Anos" value="Anos" />
                    <Picker.Item label="Meses" value="Meses" />
                  </Picker>
                  <Button
                    mode="contained"
                    onPress={() => setShowPicker(false)}
                    style={styles.selectButton}>
                    Selecionar
                  </Button>
                </View>
              </View>
            )}

            <View style={styles.labelContainer}>
              <Text style={styles.label}>Contato</Text>
              <TouchableOpacity onPress={handleEditContact}>
                <IconButton
                  icon={editContact ? 'check' : 'pencil'}
                  size={17}
                  style={{ paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              ref={contactInput}
              style={[styles.input, !editContact ? styles.inputDisabled : {}]}
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
              editable={editContact}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Contato Opcional</Text>
              <View style={styles.labelIconsContainer}>
                <TouchableOpacity onPress={handleEditOpContact}>
                  <IconButton
                    icon={editOpContact ? 'check' : 'pencil'}
                    size={17}
                    style={{ paddingTop: 10 }}
                  />
                </TouchableOpacity>
                {userContact[1]?.content ? (
                  <TouchableOpacity onPress={handleDeleteOpContact}>
                    <IconButton icon="trash-can" size={17} style={{ paddingTop: 10 }} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <TextInput
              ref={opContactInput}
              style={[styles.input, !editOpContact ? styles.inputDisabled : {}]}
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
              editable={editOpContact}
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
                          subtitle={item.address}
                          subtitleStyle={{ flexWrap: 'wrap', marginBottom: 12 }}
                          subtitleNumberOfLines={2}
                          right={(props) => (
                            <View style={{ flexDirection: 'row' }}>
                              {editingIndex === index ? (
                                <IconButton
                                  {...props}
                                  icon="check"
                                  onPress={() => handleSave(index, item)}
                                  style={{ paddingLeft: 10 }}
                                  size={15}
                                />
                              ) : (
                                <IconButton
                                  {...props}
                                  icon="pencil"
                                  onPress={() => handleEditToggle(index, item)}
                                  style={{ paddingLeft: 10 }}
                                  size={15}
                                />
                              )}
                              <IconButton
                                {...props}
                                icon="trash-can-outline"
                                onPress={() => handleRemoveSighting(index)}
                                style={{ paddingRight: 10 }}
                                size={15}
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
                      contact: userContact,
                      removedContact: {
                        removed: removedContact !== '',
                        id: removedContact !== '' ? removedContact : '',
                      },
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
