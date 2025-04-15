export interface IGeneral {
  curp: string;
  name: string;
  lastName: string;
  dateOfBirth: number[];
  sex: boolean;
  postalCode: string;
  city: string;
  state: string;
  yearOfDiagnosis: number;
  geneticDiagnosis: boolean;
  typeOfDiagnosis: "FISH" | "MLPA" | "METHYLATION";
  requiresGrowthHormone: boolean;
  levelOfEducation:
    | "MATERNAL"
    | "KINDERGARTEN"
    | "ELEMENTARY_SCHOOL" //ELEMENTARY_SCHOOL
    | "MIDDLE_SCHOOL" //MIDDLE_SCHOOL
    | "HIGH_SCHOOL" //HIGH_SCHOOL
    | "COLLEGE";
  specialEducation: boolean;
  studying: boolean;
  socialSecurityRegime: string;
  otherAilments: string[];
  otherOtherAilments: string[];
  reasonsForJoining: string[];
  otherReasonForJoining?: string[];
  tutorName: string;
  age: number;
}

export interface IPersonalInfo
  extends Pick<
    IGeneral,
    | "name"
    | "lastName"
    | "tutorName"
    | "dateOfBirth"
    | "sex"
    | "state"
    | "city"
    | "postalCode"
    | "curp"
  > {}

export interface IStaff {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: number[] | string;
  phone: string;
  password: string;
  position: string;
  role: "USER" | "ADMIN" | string;
}

export interface IBeneficiary {
  curp: string;
  name: string;
  lastName: string;
  dateOfBirth: number[] | string;
  sex: boolean;
  postalCode: string;
  city: string;
  state: string;
  yearOfDiagnosis: number;
  geneticDiagnosis: boolean;
  typeOfDiagnosis: "FISH" | "MLPA" | "METHYLATION";
  requiresGrowthHormone: boolean;
  levelOfEducation:
    | "MATERNAL"
    | "KINDERGARTEN"
    | "ELEMENTARY_SCHOOL" //ELEMENTARY_SCHOOL
    | "MIDDLE_SCHOOL" //MIDDLE_SCHOOL
    | "HIGH_SCHOOL" //HIGH_SCHOOL
    | "COLLEGE";
  specialEducation: boolean;
  studying: boolean;
  socialSecurityRegime:
    | "NONE"
    | "IMSS"
    | "ISSSTE"
    | "INSABI"
    | "SEDENA"
    | "PEMEX"
    | "MAJOR_MEDIC_EXPENSES";
  ailments:
    | "OVERWEIGHT"
    | "OBESITY"
    | "TYPE_2_DIABETES"
    | "BEHAVIOURAL_PROBLEMS"
    | "LANGUAGE_PROBLEMS"
    | "RESPIRATORY_PROBLEMS"
    | "GROWTH_HORMONE_DEFICIENCY"
    | "SCOLIOSIS"
    | "HYPOTHYROIDISM"
    | "GASTROINTESTINAL_PROBLEMS"
    | "SKIN_PROBLEMS"
    | "CIRCULATORY_PROBLEMS"
    | "DENTAL_PROBLEMS";
  otherOtherAilments: string;
  reasonsForJoining:
    | "KNOWLEDGE"
    | "COMMUNITY"
    | "MEDICAL_SUPPORT"
    | "ECONOMIC_SUPPORT"
    | "OTHER";
  otherReasonsForJoining: string;
  age: string;
}

export interface ITutor {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: number[] | string;
  occupation: string;
  phone1: number;
  phone2: number;
  maritalStatus: "MARRIED" | "SINGLE" | "WIDOWED" | "DIVORCED" | "PARTNERSHIP";
}

export interface ISchooling
  extends Pick<
    IGeneral,
    | "name"
    | "lastName"
    | "age"
    | "sex"
    | "city"
    | "state"
    | "levelOfEducation"
    | "specialEducation"
    | "studying"
    | "curp"
  > {}

export interface IDiagnosesAndAilments
  extends Pick<
    IGeneral,
    | "name"
    | "lastName"
    | "age"
    | "sex"
    | "city"
    | "state"
    | "yearOfDiagnosis"
    | "geneticDiagnosis"
    | "typeOfDiagnosis"
    | "otherAilments"
    | "otherOtherAilments"
    | "requiresGrowthHormone"
    | "curp"
  > {}

export interface IComplementaryInfo
  extends Pick<
    IGeneral,
    | "name"
    | "lastName"
    | "age"
    | "sex"
    | "city"
    | "state"
    | "yearOfDiagnosis"
    | "socialSecurityRegime"
    | "reasonsForJoining"
    | "otherReasonForJoining"
    | "curp"
  > {}

export interface IParentsTutors
  extends Pick<IGeneral, "curp" | "name" | "lastName" | "dateOfBirth" | "age"> {
  tutorEmail: string;
  tutorName: string;
  tutorLastName: string;
  tutorDateOfBirth: IGeneral["dateOfBirth"];
  tutorOccupation: string;
  tutorPhone1: string;
  tutorPhone2: string | null;
  tutorMaritalStatus:
    | "MARRIED"
    | "SINGLE"
    | "WIDOWED"
    | "DIVORCED"
    | "PARTNERSHIP";
}

export interface ICard {
  title: string;
  description: string;
}

export interface TableResponse<T> {
  content: T;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IMail {
  to: string;
  subject: string;
  message: string;
}
