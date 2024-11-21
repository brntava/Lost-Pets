import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import styles from './styles';

import { FeedPost } from '~/components/FeedPost';
import { ImagePickerScreen } from '~/components/ImagePickerScreen';
import { usePetsContext } from '~/context/petsContext';
import { getUser } from '~/services/Users/users';

const URL = process.env.URL;

export const MyProfile = () => {
  const { loggedUser, userImage } = usePetsContext();

  const [userPost, setUserPost] = useState<any>([]);

  const imageUri = userImage?.uri ?? loggedUser.image?.url?.replace('http://localhost:5241', URL);

  const fetchUserData = async () => {
    const id = loggedUser.id;

    try {
      const user = await getUser(id);

      setUserPost(user?.missingPets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderUserInfo = () => (
    <View style={styles.userInfo}>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Nome</Text>
        <Text style={styles.userInfoValue}>{loggedUser.userName}</Text>
      </View>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Email</Text>
        <Text style={styles.userInfoValue}>{loggedUser.email}</Text>
      </View>
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Contato</Text>
        <Text style={styles.userInfoValue}>{loggedUser.contacts[0]?.content}</Text>
      </View>
      {loggedUser.contacts.length > 1 && (
        <View style={styles.userInfoContent}>
          <Text style={styles.userInfoLabel}>Contato Opcional</Text>
          <Text style={styles.userInfoValue}>{loggedUser.contacts[1]?.content}</Text>
        </View>
      )}
      <View style={styles.userInfoContent}>
        <Text style={styles.userInfoLabel}>Minhas publicações:</Text>
        {userPost && userPost.length > 0 ? (
          <FlatList
            data={userPost}
            renderItem={({ item, index }) => <FeedPost item={item} index={index} key={index} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.userInfoValue}>Não há nenhuma publicação</Text>
        )}
      </View>
    </View>
  );
  return (
    <FlatList
      data={[{}]}
      renderItem={() => (
        <View style={styles.container}>
          {imageUri ? (
            <Avatar.Image
              style={styles.profilePicture}
              source={{
                uri: imageUri,
              }}
              size={120}
            />
          ) : (
            <Avatar.Icon
              style={[styles.profilePicture, { backgroundColor: 'lightgray' }]}
              size={120}
              icon="account"
            />
          )}
          <ImagePickerScreen isProfile />
          <Text style={styles.welcomeText}>Olá, {loggedUser.userName}!</Text>
          {renderUserInfo()}
        </View>
      )}
      keyExtractor={() => 'unique-key'}
    />
  );
};

export default MyProfile;
