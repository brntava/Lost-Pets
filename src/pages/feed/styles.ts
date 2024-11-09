import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 20,
    paddingBottom: 15,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  notFoundContainer: {
    height: 550,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundTextContainer: {
    width: 360,
    justifyContent: 'center',
  },
  notFoundTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 15,
    marginBottom: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 20,
    lineHeight: 30,
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
  feedMapLocationModal: {
    borderRadius: 5,
    marginHorizontal: 12,
    height: 50,
  },
});
