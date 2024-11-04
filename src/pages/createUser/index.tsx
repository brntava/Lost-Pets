import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';

import { Loading } from '~/components/Loading';
import { usePetsContext } from '~/context/petsContext';
import { UserErrorTypes } from '~/types/userTypes';

export const CreateUser = () => {
  const { handleRegisterUser } = usePetsContext();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [opInputPhone, setOPInputPhone] = useState('');
  const [contacts, setContacts] = useState([
    {
      type: 0,
      content: '',
      createdAt: new Date(),
      updatedAt: null,
    },
  ]);

  const [errors, setErrors] = useState<UserErrorTypes>({
    name: '',
    email: '',
    password: '',
    phone: '',
    opPhone: '',
  });

  useEffect(() => {
    setContacts([
      {
        type: 0,
        content: inputPhone,
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);

    if (opInputPhone !== '') {
      setContacts([
        ...contacts,
        {
          type: 0,
          content: opInputPhone,
          createdAt: new Date(),
          updatedAt: null,
        },
      ]);
    }
  }, [inputPhone, opInputPhone]);

  const validateFields = () => {
    let isValid = true;

    const newErrors: UserErrorTypes = {};
    const userNameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    if (userName === '' || !userNameRegex.test(userName)) {
      newErrors.name =
        userName === '' ? 'Nome inválido' : 'Não é permitido espaço e caracteres especiais';

      isValid = false;
    }

    if (email === '' || !emailRegex.test(email)) {
      newErrors.email = 'Email inválido';

      isValid = false;
    }

    if (password === '' || password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';

      isValid = false;
    }

    if (inputPhone === '' || !phoneRegex.test(inputPhone)) {
      newErrors.phone = 'Número inválido';

      isValid = false;
    }

    if (opInputPhone !== '' && !phoneRegex.test(opInputPhone)) {
      newErrors.opPhone = 'Número inválido';

      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleRegister = () => {
    validateFields();

    if (!validateFields()) return;

    handleRegisterUser({
      userName,
      email,
      password,
      contacts,
    });
  };

  return (
    <>
      <Loading />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          scrollEnabled>
          <View style={styles.Container}>
            <Text style={styles.title}>CADASTRE-SE</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.inputForm}
                placeholder="Nome"
                autoComplete="username"
                autoCapitalize="none"
                placeholderTextColor="#000"
                autoCorrect={false}
                onChangeText={(text) => setUserName(text)}
                error={!!errors.name}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

              <TextInput
                value={email}
                style={styles.inputForm}
                placeholder="Email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#000"
                onChangeText={(text) => setEmail(text)}
                error={!!errors.email}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              <TextInput
                value={password}
                style={styles.inputForm}
                placeholder="Senha"
                autoComplete="password"
                placeholderTextColor="#000"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                error={!!errors.password}
              />
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

              <TextInput
                style={styles.inputForm}
                value={inputPhone}
                placeholder="Telefone"
                placeholderTextColor="#000"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={15}
                onChangeText={(text) => {
                  let formattedText = text.replace(/\D/g, '');

                  if (formattedText.length >= 10) {
                    if (formattedText.length <= 10) {
                      formattedText = formattedText.replace(
                        /(\d{2})(\d{4})(\d{0,4})/,
                        '($1) $2-$3'
                      );
                    } else {
                      formattedText = formattedText.replace(
                        /(\d{2})(\d{5})(\d{0,4})/,
                        '($1) $2-$3'
                      );
                    }
                  }

                  setInputPhone(formattedText);
                }}
                error={!!errors.phone}
              />
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

              <TextInput
                value={opInputPhone}
                style={styles.inputForm}
                placeholder="Telefone (opcional)"
                placeholderTextColor="#000"
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={15}
                onChangeText={(text) => {
                  let formattedText = text.replace(/\D/g, '');

                  if (formattedText.length >= 10) {
                    if (formattedText.length <= 10) {
                      formattedText = formattedText.replace(
                        /(\d{2})(\d{4})(\d{0,4})/,
                        '($1) $2-$3'
                      );
                    } else {
                      formattedText = formattedText.replace(
                        /(\d{2})(\d{5})(\d{0,4})/,
                        '($1) $2-$3'
                      );
                    }
                  }

                  setOPInputPhone(formattedText);
                }}
              />
              {errors.opPhone ? <Text style={styles.errorText}>{errors.opPhone}</Text> : null}

              <TouchableOpacity style={styles.buttonForm} onPress={handleRegister}>
                <Text style={styles.textButton}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
