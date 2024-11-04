import { CommentsType } from './commentTypes';
import { PostImageType } from './imageTypes';
import { PetTypeRequest, PetType } from './petTypes';
import { SighthingTypeRequest, SighthingType } from './sighthingTypes';
import { LoggedUser } from './userTypes';

export interface MissingPetTypeRequest {
  sightings: SighthingTypeRequest[];
  pet: PetTypeRequest;
  status: number; // 0 - Lost | 1 - Found | 2 - Deactivated
}

export interface MissingPetType {
  comments: CommentsType[];
  createdAt: string;
  updatedAt: string;
  id: string;
  sightings: SighthingType[];
  pet: PetType;
  images: PostImageType[];
  user: LoggedUser;
  status: number; // 0 - Lost | 1 - Found | 2 - Deactivated
}

export interface EditMissingPetType {
  pet: PetTypeRequest;
  status: number; // 0 - Lost | 1 - Found | 2 - Deactivated
}

export interface MissingPetImageRequest {
  uri: string;
  name: string;
  type: string;
}
