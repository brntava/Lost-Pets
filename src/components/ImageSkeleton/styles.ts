import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 335,
    height: 230,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 8,
    position: 'absolute',
    zIndex: 9999999,
  },
  containerFull: {
    width: '90%',
    height: 300,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 8,
    position: 'absolute',
    zIndex: 9999999,
  },
  line: {
    height: 200,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  lineFull: {
    height: 270,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});
