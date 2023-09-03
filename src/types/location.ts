export interface Location {
  id: string;

  isArchived?: boolean | null;
  createdAt?: string;
  updatedAt?: string;

  locationName: string;
  address: AddressDTO;
  companyName: string;
  contacts?: ContactDTO[];
  contact?: ContactDTO;
  isActive?: boolean;
  instruction?: InstructionDTO;
  instructions?: InstructionDTO[];
  tenantId?: string;
}
export interface CreatedLocation {
  isArchived?: boolean | null;
  createdAt?: string;
  updatedAt?: string;

  locationName: string;
  address: AddressDTO;
  companyName: string;
  contacts?: ContactDTO[];
  contact?: ContactDTO;
  isActive?: boolean;
  instruction?: InstructionDTO;
  instructions?: InstructionDTO[];
  tenantId?: string;
}
export interface ContactDTO {
  contactName: string;
  contactPhone?: string;
  contactEmail: string;
  contactRole: string;
}
export interface InstructionDTO {
  instructionType: string;
  instructionDescription: string;
  instructionCreationTimestamp: string;
}

export interface AddressDTO {
  city: string;
  state: string;
  country?: string;
  postalCode: string;
}
