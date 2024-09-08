import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    marginTop: 20,
  },
  cardImgContinainer: {
    marginTop: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    width: 280,
    height: 230,
    marginRight: 8,
  },
  cardComment: {
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12,
    height: 35,
    backgroundColor: '#ededed',
  },
  cardSightings: {
    marginTop: 16,
    marginBottom: 0,
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ageContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 15,
    paddingLeft: 5,
  },
  petDescription: {
    marginTop: 8,
    fontSize: 16,
    width: '100%',
  },
  postSightingsModalContainer: {
    margin: 20,
    maxHeight: 600,
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderRadius: 12,
  },
  sightingCard: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    margin: 16,
  },
  postSightingsModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    marginBottom: 0,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  sightingLocation: {
    marginTop: 10,
    marginBottom: 10,
  },
  sightingAddress: {
    marginBottom: 10,
    fontSize: 14,
  },
  sightingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editInput: {
    fontSize: 16,
    marginTop: 10,
    backgroundColor: '#fffafa',
    height: 40,
    width: '100%',
  },
  editTextarea: {
    height: 100,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
