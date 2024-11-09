import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  sightingPlaceContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 12,
    fontWeight: 'bold',
  },
  sightingPlaceLabel: {
    marginTop: 0,
    marginBottom: 0,
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
  },
  sightingAddres: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#228c80',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    paddingBottom: 2,
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
  },
  modalButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
