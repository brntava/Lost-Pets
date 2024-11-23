import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
  },
  cardImgContinainer: {
    marginTop: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    width: 335,
    height: 230,
    marginRight: 8,
    borderRadius: 12,
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
    margin: 20,
    paddingTop: 16,
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
  sightingDescription: {
    fontSize: 14,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    height: '100%',
  },
  fullImage: {
    width: '90%',
    height: '50%',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
});
