import { useNavigation } from '@react-navigation/native';
import React, { useRef, RefObject, useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

import { ImagePickerScreen } from '~/components/ImagePickerScreen';
import { SightingMap } from '~/components/SightingMap';
import { usePetsContext } from '~/context/petsContext';
import { SighthingType } from '~/types/sighthingTypes';
import { formatDate } from '~/utils/formatDate';

export const CreateLostPetPost = () => {
  const {
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
    showSightings,
    setShowSightings,
    handleSubmitMissingPet,
    missingPetContact,
    setMissingPetContact,
  } = usePetsContext();

  const speciesInput = useRef(null);
  const ageInput = useRef(null);
  const descriptionInput = useRef(null);
  const sightingDateInput = useRef(null);
  const contactInput = useRef(null);

  const [editingIndex, setEditingIndex] = useState<any>(null);
  const [tempData, setTempData] = useState({
    description: '',
    sightingDate: '',
    address: '',
  });

  const navigation = useNavigation();

  const handleNextInput = (nextInput: RefObject<HTMLInputElement>) => {
    nextInput.current.focus();
  };

  const handleEditToggle = (index: number | null, item: any) => {
    setEditingIndex(index);
    setTempData({
      description: item.description,
      sightingDate: item.sightingDate,
      address: item.location.address,
    });
  };

  const handleInputChange = (field: any, value: string) => {
    setTempData({
      ...tempData,
      [field]: field === 'sightingDate' ? formatDate(value) : value,
    });
  };

  const handleSave = (index: number, item: any) => {
    const updatedSighting = {
      ...item,
      description: tempData.description,
      sightingDate: tempData.sightingDate,
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

  const handleRemoveSighting = async (sightingId: string) => {
    setSightings(sightings.filter((sighting) => sighting.id !== sightingId));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Nome do Pet</Text>
          <TextInput
            style={styles.input}
            value={petName}
            onChangeText={(text: string) => setPetName(text.slice(0, 100))}
            onSubmitEditing={() => handleNextInput(speciesInput)}
            returnKeyType="next"
            placeholder="Nome..."
          />
          <Text style={styles.label}>Espécie/Raça</Text>
          <TextInput
            ref={speciesInput}
            style={styles.input}
            value={petSpecies}
            onChangeText={(text: string) => setPetSpecies(text.slice(0, 100))}
            onSubmitEditing={() => handleNextInput(ageInput)}
            returnKeyType="next"
            placeholder="Especie..."
          />
          <Text style={styles.label}>Idade do Pet</Text>
          <TextInput
            ref={ageInput}
            style={styles.input}
            value={petAge}
            onChangeText={(text: string) => setPetAge(text)}
            onSubmitEditing={() => handleNextInput(descriptionInput)}
            keyboardType="numeric"
            returnKeyType="next"
            maxLength={3}
            placeholder="Idade... Ex(0.x meses ou 2 anos)"
          />
          <Text style={styles.label}>Telefone para contato</Text>
          <TextInput
            ref={contactInput}
            style={styles.input}
            value={missingPetContact}
            onChangeText={(text: string) => setMissingPetContact(text)}
            onSubmitEditing={() => handleNextInput(descriptionInput)}
            keyboardType="numeric"
            returnKeyType="next"
            maxLength={11}
            placeholder="(00) 0000-0000"
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('sightingModal')}>
            <Text style={styles.addButtonLabel}>Adicionar Avistamento</Text>
          </TouchableOpacity>
          {sightings.length > 0 && (
            <TouchableOpacity
              style={styles.showSightingButton}
              onPress={() => setShowSightings(!showSightings)}>
              <Text style={styles.showSightingButtonLabel}>
                {showSightings ? 'Esconder Avistamentos' : 'Ver Avistamentos'}
              </Text>
            </TouchableOpacity>
          )}
          {showSightings && (
            <>
              {sightings.map((item: SighthingType, index: number) => {
                return (
                  <Card style={styles.sightingCard} key={index}>
                    <Card.Title
                      title={editingIndex === index ? <></> : item.sightingDate}
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
                            onPress={() => handleRemoveSighting(index.toString())}
                            style={{ paddingRight: 10 }}
                            size={20}
                          />
                        </View>
                      )}
                    />
                    <Card.Content>
                      {editingIndex === index ? (
                        <TextInput
                          value={tempData.sightingDate}
                          onChangeText={(text) => handleInputChange('sightingDate', text)}
                          style={[styles.input, { marginBottom: 10 }]}
                          placeholder="DD/MM/AAAA"
                          keyboardType="numeric"
                        />
                      ) : (
                        <></>
                      )}
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
          <ImagePickerScreen />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitMissingPet}>
            <Text style={styles.submitButtonText}>Enviar Publicação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
