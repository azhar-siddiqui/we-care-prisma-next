export const tests = [
  {
    testId: 'bb2fa78f-2d41-4fb0-930e-5594800d03a7',
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
    testId: '7a051a19-306f-4be5-a771-4533e3d8755a',
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
    testId: 'a2938a96-2281-4b29-98d8-aaf1ad62587',
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
    testId: 'f37d9a63-7695-4954-942a-f5183b5b46ec',
    testName: 'Differential Count',
    colSpan: true,
  },
  {
    testId: '4e436d3f-150f-4de9-b4de-8e8b2d847f4f',
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
    testId: '4bc55c7c-cbd5-410d-93c6-2caeed4cc35e',
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
    testId: '5677f463-5ce6-4b05-8a09-994ef36ab989',
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
    testId: 'c4374466-0984-4de8-a348-d0a87589e730',
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
    testId: '71393693-f70c-4903-8239-c270d278091a',
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
    testId: 'f71845d6-5ce8-5541-925a-9ad7209ccb7c',
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
    testId: 'bea98d52-9a29-14c1-a380-778eb4778dd8',
    testName: 'Blood Indicates',
    colSpan: true,
  },
  {
    testId: 'e43c8c94-2806-1a35-97c3-79956fbb16d0',
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
    testId: '438c4029-846d-2d5c-a645-7b021a27479a',
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
    testId: '2320c480-d96a-d074-be06-1ea1499ef0e4',
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
    testId: '6e0fbcdd-3533-667a-beba-3fd3427bfe75',
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
    testId: '41381208-8bd7-b197-82a9-214c74cbe27b',
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
    testId: '1ccf50de-a3b1-0839-8cc2-3884f175989b',
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

export const groupTestData = [
  {
    id: '2cb7432b-36e8-428b-be35-6042e91382f1',
    groupTestName: 'Complete Blood Count (CBC)',
    tests: tests,
  },
];

const tempWithoutGroupTest = [
  { id: 'ae7ed863-cf9a-45b5-9282-71ad8586be49', groupTestName: 'Widal Test' },
  {
    id: 'f86e1f1b-4154-48f1-a527-7855ec116a24',
    groupTestName: 'Blood Sugar (Fasting)',
  },
  {
    id: '56db77ad-3e07-4794-b4e7-20f3d4396a01',
    groupTestName: 'Blood Sugar (Postprandial)',
  },
  { id: 'b3f54bd0-7aec-4c50-aeae-39ab71cc4b3a', groupTestName: 'HbA1c' },
  {
    id: '45082923-082d-4a8c-8d43-4ed3714fef01',
    groupTestName: 'Liver Function Test (LFT)',
  },
  {
    id: 'b27945ad-68e9-4afa-9520-0f12ac552bff',
    groupTestName: 'Kidney Function Test (KFT)',
  },
  {
    id: 'b4902f80-4f9b-4032-9a5c-845a3aa59b4d',
    groupTestName: 'Lipid Profile',
  },
  {
    id: 'affcc032-cb31-4096-8ea0-e4bffa1f56b1',
    groupTestName: 'Thyroid Profile (T3, T4, TSH)',
  },
  {
    id: 'c1513d71-a211-48bb-a5a9-6161039622f0',
    groupTestName: 'Urine Routine',
  },
  {
    id: 'a3c1bb21-966d-4597-8644-652e074b1cfa',
    groupTestName: 'Stool Routine',
  },
  {
    id: '240df3cc-e703-4c18-80a3-ea18cb630ee2',
    groupTestName: 'Malaria Parasite (MP)',
  },
  {
    id: '83407997-f3d5-4a44-bd72-2c40ea79c653',
    groupTestName: 'Dengue NS1 Antigen',
  },
  { id: 'cd866e91-4e84-4caa-bd95-2b15339483b8', groupTestName: 'Typhoid IgM' },
  { id: '5e4c2303-971e-48fb-b6d3-0828731d125b', groupTestName: 'Vitamin D' },
  { id: 'b8737c43-7245-4fa2-aba0-7b799d1ecdb8', groupTestName: 'Vitamin B12' },
  {
    id: 'd739c2db-004c-4e97-bae2-27557b4b1866',
    groupTestName: 'Electrolytes (Na, K, Cl)',
  },
  { id: 'f365d377-36f9-48ad-8ffc-b17b08984f1f', groupTestName: 'ESR' },
  {
    id: 'df75b93e-1bf8-43f1-bbaa-95d8745fce24',
    groupTestName: 'CRP (C-Reactive Protein)',
  },
  {
    id: 'e383f013-66f1-4d18-8587-26136b09aefe',
    groupTestName: 'Rheumatoid Factor (RA)',
  },
  { id: '0fd0b8a2-276b-46b3-ba1e-175f888ea291', groupTestName: 'HIV I & II' },
  {
    id: 'bd69e8c4-9b44-44ba-b611-f3cfe512d001',
    groupTestName: 'Hepatitis B Surface Antigen (HBsAg)',
  },
  {
    id: '2e15a4bf-af69-4fc9-b27b-687af021fbd3',
    groupTestName: 'Hepatitis C Virus (HCV)',
  },
  {
    id: 'f45193a4-5e38-410d-919a-dae3c206c8c7',
    groupTestName: 'Prothrombin Time (PT)',
  },
  {
    id: '5b6d0e7e-767e-49f5-a6bb-94a9b770d594',
    groupTestName: 'Blood Grouping and Rh Typing',
  },
  {
    id: 'a2c3e00c-4610-477c-bb26-823911ab1b92',
    groupTestName: 'Pregnancy Test (Urine hCG)',
  },
  {
    id: '6e2c67c1-547f-401f-823f-c71851c573fb',
    groupTestName: 'Serum Calcium',
  },
  {
    id: '85c61e2b-bb3f-4ffc-bba5-3ddbb629a6ed',
    groupTestName: 'Serum Uric Acid',
  },
  { id: 'f88a962f-0550-471a-b263-72f4b1f048ae', groupTestName: 'Ferritin' },
  {
    id: '72e76004-33ad-4819-834f-44befd976baf',
    groupTestName: 'ANA (Antinuclear Antibody)',
  },
];
