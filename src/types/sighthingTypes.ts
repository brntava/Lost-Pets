import { LocationType } from './locationTypes';
import { LoggedUser } from './userTypes';

export interface SighthingType {
  id?: string;
  sightingDate: Date;
  location: LocationType;
  description: string;
  user: LoggedUser;
  address: string;
}

export interface SighthingTypeRequest {
  sightingDate: Date;
  location: LocationType;
  address: string;
  description: string;
  missingPetId?: string;
}
