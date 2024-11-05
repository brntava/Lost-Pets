import { createStackNavigator } from '@react-navigation/stack';
import { Platform, View, Image } from 'react-native';

import { styles } from '../components/TopMenu/styles';
import { CreateLostPetPost } from '../pages/createLostPetPost/index';
import { CreateUser } from '../pages/createUser';
import { Login } from '../pages/login';

import { BottomMenu } from '~/components/BottomMenu';
import { SearchSighting } from '~/pages/searchSighting';
import { SightingModal } from '~/pages/sightingModal';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createUser"
        component={CreateUser}
        options={{
          headerShown: true,
          headerTitle: Platform.OS === 'android' ? 'Login' : '',
          headerBackTitle: 'Login',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <View style={styles.menuLogoContainer}>
              <Image
                style={styles.menuLogoImage}
                source={require('../../assets/paw-pet-login.png')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="feed"
        component={BottomMenu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createLostPetPost"
        component={CreateLostPetPost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sightingModal"
        component={SightingModal}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Voltar',
          headerTintColor: '#000',
          headerRight: () => (
            <View style={styles.menuLogoContainer}>
              <Image
                style={styles.menuLogoImage}
                source={require('../../assets/paw-pet-login.png')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="searchSighting"
        component={SearchSighting}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Voltar',
          headerTintColor: '#1d1a1a',
          headerRight: () => (
            <View style={styles.menuLogoContainer}>
              <Image
                style={styles.menuLogoImage}
                source={require('../../assets/paw-pet-login.png')}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
