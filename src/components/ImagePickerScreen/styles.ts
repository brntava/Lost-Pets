import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  addImg: {
    fontSize: 28,
    marginRight: 8,
  },
  image: {
    width: '88%',
    height: 230,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  trashIcon: {
    position: 'absolute',
    right: 0,
    paddingLeft: 15,
  },
  addProfileImageContainer: {
    position: 'absolute',
    top: '6.2%',
    right: '39%',
  },
  addProfileImage: {
    fontSize: 40,
  },
});
