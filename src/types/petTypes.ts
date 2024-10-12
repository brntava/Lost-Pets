export interface PetType {
  id: string;
  name: string;
  species: string;
  age: string;
  description: string;
}

export interface PetTypeRequest {
  name: string;
  species: string;
  age: string;
  description: string;
}
