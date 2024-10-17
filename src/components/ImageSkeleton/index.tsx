import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const ImageSkeleton = () => {
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
    <View style={styles.container}>
      <Animated.View style={[styles.line, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
    height: 230,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 8,
  },
  line: {
    height: 200,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});
