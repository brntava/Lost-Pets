import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 20,
    paddingBottom: 15,
  },
  notFoundcontainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    marginRight: 10,
  },
  addPublicationButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#228c80',
    zIndex: 999,
    top: '76%',
    right: '6%',
    elevation: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
  },
  feedPostContainer: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  feedMapLocation: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
});
