import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { FeedPost } from '~/components/FeedPost';
import { usePetsContext } from '~/context/petsContext';
import styles from './styles';
import { getUser } from '~/services/Users/users';

export const MyProfile = () => {
  const { missingPetPost, loggedUser } = usePetsContext();
  
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    contact: '',
    missingPets: []
  });

  const fetchUserData = async () => {
    const id = loggedUser.id;

    try {
      const user = await getUser(id, 'GET');

      setUserData({
        email: loggedUser.email,
        userName: loggedUser.userName,
        contact: loggedUser.contacts[0]?.content || '',
        missingPets: user.missingPets
      });
    } catch (error) {
      }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  
  const renderUserInfo = () => (
    <><View style={styles.userInfo}>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Nome:</Text>
        <Text style={styles.userInfoValue}>{loggedUser.userName}</Text>
      </View>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Email:</Text>
        <Text style={styles.userInfoValue}>{loggedUser.email}</Text>
      </View>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Contato:</Text>
        <Text style={styles.userInfoValue}>{loggedUser.contacts[0]?.content}</Text>
      </View>
      {loggedUser.contacts.length > 1 && (
        <View style={styles.userInfoContent}>
          <Text style={styles.userInfoLabel}>Contato Opcional:</Text>
          <Text style={styles.userInfoValue}>{loggedUser.contacts[1]?.content}</Text>
        </View>
        )}
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Minhas publicações</Text>
        {missingPetPost && missingPetPost.length > 0 ? (
          <FlatList
            data={missingPetPost}
            renderItem={({ item, index }) => <FeedPost item={item} index={index} />}
            keyExtractor={(item) => item.id} />
        ) : (
          <Text style={styles.userInfoValue}>Não há nenhuma publicação</Text>
        )}
      </View>
    </View></>
  );
  return (
    <FlatList
      data={[{}]}
      renderItem={() => (
        <View style={styles.container}>
          <Image
            style={styles.profilePicture}
            source={require('../../../assets/paw-pet-login.png')}
          />
          <Text style={styles.welcomeText}>Olá, {loggedUser.userName}!</Text>
          {renderUserInfo()}
        </View>
      )}
      keyExtractor={() => 'unique-key'} 
    />
  );
};

export default MyProfile;