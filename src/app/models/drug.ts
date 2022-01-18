export class Drug {
  app!: string;
  product!: string;
  nmeIngredients!: string;
  unii!: string;
  therapeuticClass!: string;
  substanceClass!: string;
  moleculeType!: string;
  specificType!: string;
  appType!: string;
  appRef!: string;
  indDate!: string;
  indDateNote!: string;
  indDateRef!: string;
  appSubmittedDate!: string;
  appSubmittedDateRef!: string;
  appApprovalDate!: string;
  daysInClinicalDevelopment!: number;
  daysInReview!: number;
  first!: boolean;
  orphan!: boolean;
  fastTrack!: boolean;
  breakthrough!: boolean;
  priority!: boolean;
  accelerated!: boolean;
  nonFirstCycle!: boolean;
  blackBox!: boolean;
  diagnosticImaging!: boolean;
  animalRule!: boolean;
  SMILES!: string;
  logP!: number;
  innovation!: string;
  disease!: string;
  pharmacology!: string;
  target!: string;
  indication!: string;
  crlRef!: string;
  initClinicalStudy!: number;
  date!: number; // utc number for date and month
  year!: number;
  fullDate!: number;
  developmentTime!: number;
constructor() {}

}
