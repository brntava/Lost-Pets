import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { styles } from './styles';

import { usePetsContext } from '~/context/petsContext';

export const Loading = () => {
  const { loading } = usePetsContext();

  if (!loading) return null;

  const { height, width } = Dimensions.get('window');

  return (
    <View
      style={[
        styles.loadingOverlay,
        {
          width,
          height,
        },
      ]}>
      <ActivityIndicator animating color="#fff" size={50} />
    </View>
  );
};
