export interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  identificationNumber: string;
  
  // Contact Information
  phoneNumber: string;
  email: string;
  address: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Program Enrollment
  preferredProgram: string;
  joiningDate: string;
  
  // Accommodation
  requiresAccommodation: boolean;
  checkInDate?: string;
  
  // Airport Pickup
  requiresAirportPickup: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  
  // Additional
  photo?: File;
}

export type FormStep = 
  | 'personal'
  | 'contact'
  | 'emergency'
  | 'program'
  | 'accommodation'
  | 'airport'
  | 'additional'; 