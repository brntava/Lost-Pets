import { useEffect, useState } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Chip, Portal, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { TopMenu } from '../../components/TopMenu';

import { FeedPost } from '~/components/FeedPost';
import { Loading } from '~/components/Loading';
import { usePetsContext } from '~/context/petsContext';

export const Feed = () => {
  const { handleSearchMissingPet, missingPetPost, setTabIndex, feedLocation, loggedUser } =
    usePetsContext();

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    handleSearchMissingPet();

    setRefreshing(false);
  };

  useEffect(() => {
    handleSearchMissingPet();

    if (feedLocation.address === '') {
      setModalVisible(true);
    }
  }, []);

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Loading />
      <SafeAreaView style={styles.container}>
        <TopMenu />
        <Chip icon="map-marker" style={styles.feedMapLocation} onPress={() => setTabIndex(2)}>
          {feedLocation.address !== '' ? feedLocation.address : 'Selecionar localização...'}
        </Chip>
        {feedLocation.address === '' ? (
          <Portal>
            <Modal
              visible={modalVisible}
              style={{ backgroundColor: '#000', opacity: 0.7 }}
              dismissable={false}
              contentContainerStyle={styles.modalContainer}>
              <View style={styles.notFoundTextContainer}>
                <Text style={styles.notFoundTitle}>
                  Olá {loggedUser ? loggedUser.userName : 'visitante'}!
                </Text>
                <Text style={styles.notFoundText}>
                  Selecione uma localização para filtrar publicações
                </Text>
                <Chip
                  icon="map-marker"
                  style={[styles.feedMapLocation, styles.feedMapLocationModal]}
                  onPress={() => {
                    setTabIndex(2);
                    closeModal();
                  }}>
                  {feedLocation.address !== '' ? feedLocation.address : 'Selecionar localização...'}
                </Chip>
              </View>
            </Modal>
          </Portal>
        ) : (
          <FlatList
            data={missingPetPost}
            renderItem={({ item, index }) => <FeedPost item={item} index={index} />}
            style={styles.feedPostContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>Não há publicações no momento</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </>
  );
};
