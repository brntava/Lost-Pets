import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  welcomeText: {
    marginTop: 25,
    color: '#228c80',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  userInfo: {
    borderWidth: 1,
    borderColor: '#228c80',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  userInfoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  userInfoContent: {
    marginTop: 16,
  },
  userInfoValue: {
    marginBottom: 10,
    fontSize: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 10,
    borderColor: '#f79307',
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default styles;
