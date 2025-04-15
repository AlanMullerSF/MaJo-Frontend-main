import { useMemo } from "react";
import { states } from "../pages/registration-form/components/BeneficiaryInfo";

// TODO render filters depending on page and bring them from the backend

// TODO add age and yearOfDiagnosis filters they're already implemented in the back
/**
 * Applies the specified filters to the current page.
 * @param {FilterConfig[]} filters - An array of filter configurations to apply.
 * @returns FiltersType
 */
export const useFilters = () => {
  const sexOptions = useMemo(
    () => [...[true, false].map((sex) => ({ sex }))],
    [],
  );

  const stateOptions = useMemo(
    () => [...states.map((state) => ({ state }))],
    [],
  );

  const levelOfEducationOptions = useMemo(
    () => [
      ...[
        "MATERNAL",
        "KINDERGARTEN",
        "ELEMENTARY_SCHOOL", //ELEMENTARY_SCHOOL
        "MIDDLE_SCHOOL", //MIDDLE_SCHOOL
        "HIGH_SCHOOL", //HIGH_SCHOOL
        "COLLEGE",
      ].map((levelOfEducation) => ({ levelOfEducation })),
    ],
    [],
  );

  const specialEducationOptions = useMemo(
    () => [...[true, false].map((specialEducation) => ({ specialEducation }))],
    [],
  );

  const studyingOptions = useMemo(
    () => [...[true, false].map((studying) => ({ studying }))],
    [],
  );

  const geneticDiagnosisOptions = useMemo(
    () => [...[true, false].map((geneticDiagnosis) => ({ geneticDiagnosis }))],
    [],
  );

  const typeOfDiagnosisOptions = useMemo(
    () => [
      ...["FISH", "MLPA", "METHYLATION"].map((typeOfDiagnosis) => ({
        typeOfDiagnosis,
      })),
    ],
    [],
  );

  const requiresGrowthHormoneOptions = useMemo(
    () => [
      ...[true, false].map((requiresGrowthHormone) => ({
        requiresGrowthHormone,
      })),
    ],
    [],
  );

  const ailmentsOptions = useMemo(
    () => [
      ...[
        "OVERWEIGHT",
        "OBESITY",
        "TYPE_2_DIABETES",
        "BEHAVIOURAL_PROBLEMS",
        "LANGUAGE_PROBLEMS",
        "RESPIRATORY_PROBLEMS",
        "GROWTH_HORMONE_DEFICIENCY",
        "SCOLIOSIS",
        "HYPOTHYROIDISM",
        "GASTROINTESTINAL_PROBLEMS",
        "SKIN_PROBLEMS",
        "CIRCULATORY_PROBLEMS",
        "DENTAL_PROBLEMS",
      ].map((ailments) => ({ ailments })),
    ],
    [],
  );

  const socialSecurityRegimeOptions = useMemo(
    () => [
      ...[
        "NONE",
        "IMSS",
        "ISSSTE",
        "INSABI",
        "SEDENA",
        "PEMEX",
        "MAJOR_MEDIC_EXPENSES",
      ].map((socialSecurityRegime) => ({ socialSecurityRegime })),
    ],
    [],
  );

  return [
    sexOptions,
    stateOptions,
    levelOfEducationOptions,
    specialEducationOptions,
    studyingOptions,
    geneticDiagnosisOptions,
    typeOfDiagnosisOptions,
    requiresGrowthHormoneOptions,
    ailmentsOptions,
    socialSecurityRegimeOptions,
  ];
};

export type FiltersType = ReturnType<typeof useFilters>;
