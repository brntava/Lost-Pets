import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 10,
    padding: 20,
  },
  modalContainer: {
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#ededed',
  },
  cancelText: {
    color: '#f00',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  descriptionInput: {
    height: 100,
  },
  addButton: {
    backgroundColor: '#228c80',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  addButtonLabel: {
    color: '#FFF',
    fontSize: 16,
  },
  sightingItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sightingDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sightingLocation: {
    marginBottom: 5,
  },
  sightingDescription: {
    marginBottom: 5,
  },
  sightingButton: {
    backgroundColor: '#228c80',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  sightingButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#228c80',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});