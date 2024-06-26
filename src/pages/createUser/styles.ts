import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#228c80',
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputForm: {
    backgroundColor: '#FFF',
    marginTop: 16,
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 8,
    paddingLeft: 0,
  },
  buttonForm: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 250,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  textButton: {
    color: '#228c80',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
