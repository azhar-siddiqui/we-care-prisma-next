type NormalRange = {
  min: number | undefined;
  max: number | undefined;
};

export type TestData = {
  testId: string;
  testName: string;
  unit?: string;
  normal_range?: {
    adult_male: NormalRange;
    adult_female: NormalRange;
    child_male: NormalRange;
    child_female: NormalRange;
  };
  colSpan?: boolean;
};

export enum BloodGroupType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export enum RhFactor {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
}

export const tests: TestData[] = [
  {
    testId: 'cbc-001',
    testName: 'Hemoglobin (Hb)',
    unit: 'g/dL',
    normal_range: {
      adult_male: { min: 13.8, max: 17.2 },
      adult_female: { min: 12.1, max: 15.1 },
      child_male: { min: 11.0, max: 16.0 },
      child_female: { min: 11.0, max: 16.0 },
    },
  },
  {
    testId: 'cbc-002',
    testName: 'Total R.B.C',
    unit: 'million cells/µL',
    normal_range: {
      adult_male: { min: 4.6, max: 6.2 },
      adult_female: { min: 4.2, max: 5.4 },
      child_male: { min: 4.1, max: 5.5 },
      child_female: { min: 4.1, max: 5.5 },
    },
  },
  {
    testId: 'cbc-008',
    testName: 'Total W.B.C',
    unit: 'cells/µL',
    normal_range: {
      adult_male: { min: 4500, max: 11000 },
      adult_female: { min: 4500, max: 11000 },
      child_male: { min: 5000, max: 13000 },
      child_female: { min: 5000, max: 13000 },
    },
  },
  {
    testId: 'cbc-diff-header',
    testName: 'Differential Count',
    colSpan: true,
  },
  {
    testId: 'cbc-009',
    testName: 'Neutrophils',
    unit: '%',
    normal_range: {
      adult_male: { min: 40, max: 60 },
      adult_female: { min: 40, max: 60 },
      child_male: { min: 30, max: 60 },
      child_female: { min: 30, max: 60 },
    },
  },
  {
    testId: 'cbc-010',
    testName: 'Lymphocytes',
    unit: '%',
    normal_range: {
      adult_male: { min: 20, max: 40 },
      adult_female: { min: 20, max: 40 },
      child_male: { min: 30, max: 70 },
      child_female: { min: 30, max: 70 },
    },
  },
  {
    testId: 'cbc-011',
    testName: 'Monocytes',
    unit: '%',
    normal_range: {
      adult_male: { min: 2, max: 8 },
      adult_female: { min: 2, max: 8 },
      child_male: { min: 2, max: 8 },
      child_female: { min: 2, max: 8 },
    },
  },
  {
    testId: 'cbc-012',
    testName: 'Eosinophils',
    unit: '%',
    normal_range: {
      adult_male: { min: 1, max: 4 },
      adult_female: { min: 1, max: 4 },
      child_male: { min: 1, max: 4 },
      child_female: { min: 1, max: 4 },
    },
  },
  {
    testId: 'cbc-013',
    testName: 'Basophils',
    unit: '%',
    normal_range: {
      adult_male: { min: 0.5, max: 1 },
      adult_female: { min: 0.5, max: 1 },
      child_male: { min: 0.5, max: 1 },
      child_female: { min: 0.5, max: 1 },
    },
  },
  {
    testId: 'cbc-014',
    testName: 'Platelet Count',
    unit: 'lakh/µL',
    normal_range: {
      adult_male: { min: 1.5, max: 4.5 },
      adult_female: { min: 1.5, max: 4.5 },
      child_male: { min: 1.5, max: 4.5 },
      child_female: { min: 1.5, max: 4.5 },
    },
  },
  {
    testId: 'cbc-diff-header',
    testName: 'Blood Indicates',
    colSpan: true,
  },
  {
    testId: 'cbc-015',
    testName: 'H.C.T. (Hematocrit)',
    unit: '%',
    normal_range: {
      adult_male: { min: 40, max: 54 },
      adult_female: { min: 36, max: 48 },
      child_male: { min: 35, max: 45 },
      child_female: { min: 35, max: 45 },
    },
  },
  {
    testId: 'cbc-016',
    testName: 'M.C.V (Mean Corpuscular Volume)',
    unit: 'fL',
    normal_range: {
      adult_male: { min: 80, max: 100 },
      adult_female: { min: 80, max: 100 },
      child_male: { min: 70, max: 86 },
      child_female: { min: 70, max: 86 },
    },
  },
  {
    testId: 'cbc-017',
    testName: 'M.C.H (Mean Corpuscular Hemoglobin)',
    unit: 'pg',
    normal_range: {
      adult_male: { min: 27, max: 33 },
      adult_female: { min: 27, max: 33 },
      child_male: { min: 24, max: 30 },
      child_female: { min: 24, max: 30 },
    },
  },
  {
    testId: 'cbc-018',
    testName: 'M.C.H.C (Mean Corpuscular Hemoglobin Concentration)',
    unit: 'g/dL',
    normal_range: {
      adult_male: { min: 32, max: 36 },
      adult_female: { min: 32, max: 36 },
      child_male: { min: 30, max: 35 },
      child_female: { min: 30, max: 35 },
    },
  },
  {
    testId: 'cbc-018',
    testName: 'R.D.W (Red Cell Distribution Width)',
    unit: '%',
    normal_range: {
      adult_male: { min: 11.5, max: 14.5 },
      adult_female: { min: 11.5, max: 14.5 },
      child_male: { min: 11.5, max: 14.5 },
      child_female: { min: 11.5, max: 14.5 },
    },
  },
  {
    testId: 'cbc-019',
    testName: 'M.P.V (Mean Platelet Volume)',
    unit: 'fL',
    normal_range: {
      adult_male: { min: 7.5, max: 11.5 },
      adult_female: { min: 7.5, max: 11.5 },
      child_male: { min: 7.5, max: 11.5 },
      child_female: { min: 7.5, max: 11.5 },
    },
  },
];

export const patinet = {
  test: tests,
};
