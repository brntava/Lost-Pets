import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 70,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ageUnitContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    right: 15,
  },
  agePicker: {
    width: 50,
    position: 'absolute',
    top: -1,
    right: 0,
  },
  ageUnitText: {
    fontSize: 16,
    marginRight: 5,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelIconsContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
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
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sightingCard: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingTop: 12,
  },
  sightingLocation: {
    marginTop: 10,
    marginBottom: 10,
  },
  sightingAddress: {
    marginBottom: 10,
    fontSize: 14,
  },
  sightingDescription: {
    marginBottom: 12,
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
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  showSightingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#228c80',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 20,
  },
  showSightingButtonLabel: {
    color: '#228c80',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  selectButton: {
    marginTop: 15,
    backgroundColor: '#228c80',
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
