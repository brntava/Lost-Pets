import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

import { styles } from './styles';

type SkeletonProps = {
  fullScreen?: boolean;
};

export const ImageSkeleton = ({ fullScreen }: SkeletonProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);

      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [animation]);

  const animatedStyle = {
    opacity: animation,
  };

  return (
    <View style={fullScreen ? styles.containerFull : styles.container}>
      <Animated.View style={[fullScreen ? styles.lineFull : styles.line, animatedStyle]} />
    </View>
  );
};
