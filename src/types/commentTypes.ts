import { LoggedUser } from './userTypes';

export interface CommentsType {
  id: string;
  userId: string;
  createdAt: string;
  awnsersTo: string;
  awnsers: [] | CommentsType[];
  content: string;
  user: LoggedUser;
  missingPetId: string;
}
