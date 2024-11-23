import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';

import { Loading } from '~/components/Loading';
import { usePetsContext } from '~/context/petsContext';

export const Login = () => {
  const { handleSubmitLogin, setVisitorUser } = usePetsContext();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigation = useNavigation();

  const passwordInputRef = useRef(null);

  return (
    <>
      <Loading />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        extraScrollHeight={20}
        enableOnAndroid>
        <View style={styles.Container}>
          <View style={styles.UserImage}>
            <Image source={require('../../../assets/paw-pet-login.png')} style={styles.Image} />
          </View>
          <Text style={styles.title}>Lost Pets</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.inputEmail}
              value={userEmail}
              placeholder="Email"
              autoCapitalize="none"
              mode="outlined"
              placeholderTextColor="#000"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
              onChangeText={(text) => setUserEmail(text)}
            />
            <TextInput
              ref={passwordInputRef}
              style={styles.inputPassword}
              value={userPassword}
              placeholder="Senha"
              autoCapitalize="none"
              mode="outlined"
              autoCorrect
              placeholderTextColor="#000"
              returnKeyType="done"
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
      </KeyboardAwareScrollView>
    </>
  );
};
