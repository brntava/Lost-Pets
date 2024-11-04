import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';

import { Loading } from '~/components/Loading';
import { usePetsContext } from '~/context/petsContext';

export const Login = () => {
  const { handleSubmitLogin, setVisitorUser } = usePetsContext();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigation = useNavigation();

  return (
    <>
      <Loading />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.Container}>
            <View style={styles.UserImage}>
              <Image source={require('../../../assets/paw-pet-login.png')} style={styles.Image} />
            </View>
            <Text style={styles.title}>Lost Pets</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.inputEmail}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="#000"
                onChangeText={(text) => setUserEmail(text)}
              />
              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect
                placeholderTextColor="#000"
                onChangeText={(text) => setUserPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.buttonForm}
                onPress={() => handleSubmitLogin(userEmail, userPassword)}>
                <Text style={styles.textButton}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('createUser')}>
                <Text style={styles.ButtonCreate}>Cadastre-se</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisitorUser(true);

                  navigation.navigate('feed');
                }}>
                <Text style={styles.ButtonCreate}>Entrar como visitante</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
