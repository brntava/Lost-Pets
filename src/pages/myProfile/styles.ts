import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 18,
    color: '#000',
    fontSize: 28,
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profilePicture: {
    borderRadius: 75,
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuContainer: {
    marginLeft: 10,
  },
});

export default styles;
