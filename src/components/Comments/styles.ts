import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    height: '80%',
    margin: 'auto',
    justifyContent: 'space-between',
    maxHeight: 800,
    borderRadius: 12,
  },
  modalHeaderContainer: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  modalInputContainerAndroid: {
    marginBottom: 0,
    justifyContent: 'flex-end',
    height: '10%',
    position: 'relative',
  },
  modalInputContainerIOS: {
    marginBottom: 50,
  },
  modalInputContainerIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  modalInputContainerIconEdit: {
    top: 0,
    right: 10,
  },
  modalCardContainer: {
    height: '78%',
    paddingBottom: 10,
    paddingTop: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 35,
  },
  modalCard: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: 'rgba(0,0,0, 0.0)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalCardAwnser: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 0,
  },
  modalNoComments: {
    height: '100%',
    textAlign: 'center',
  },
  answerCommentChip: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    backgroundColor: '#fff',
  },
  answerCommentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerCommentHeaderText: {
    fontSize: 12,
    marginLeft: 20,
    fontWeight: '500',
  },
  answerCommentContent: {
    marginBottom: 5,
  },
  answerCommentContentText: {
    fontSize: 12,
    marginLeft: 20,
  },
  answerCommentContainer: {
    marginHorizontal: 10,
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
