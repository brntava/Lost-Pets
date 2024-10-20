import { ContactType } from '~/types/contactTypes';

export const findUpdatedContacts = (arr1: ContactType[], arr2: ContactType[]) => {
  if (arr1.length !== arr2.length) {
    return arr1;
  }

  return arr1?.filter((contact, index) => {
    return contact !== arr2[index];
  });
};
