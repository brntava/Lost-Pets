import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingTop: 60,
    width: '100%',
    height: '100%',
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  menuTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 180,
    width: '100%',
  },
  closeButton: {
    paddingRight: 10,
  },
  menuItems: {
    marginBottom: 10,
    alignItems: 'center',
  },
  menuItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
    width: 280,
    borderWidth: 1,
    borderColor: '#228c80',
    alignItems: 'center',
    borderRadius: 5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228c80',
  },
  bar: {
    borderWidth: 1,
    borderColor: '#f00',
    marginBottom: 30,
    marginTop: 10,
    width: 200,
  },
  logoutButton: {
    borderColor: '#f00',
  },
  logoutButtonText: {
    color: 'red',
  },
});
