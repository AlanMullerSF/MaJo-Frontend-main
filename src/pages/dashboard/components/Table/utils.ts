import i18n from "../../../../i18n/i18n";
import moment from "moment";

/**
 * Displays a sort button on the page.
 * @returns boolean
 */
export const showSortButton = (title: string) => {
  return ["Edad", "Apellidos", "Nombre", "Año de diagnóstico"].includes(title);
};

/**
 * Formats a table value by adding appropriate spacing and alignment.
 * @param {string} value - The value to format.
 * @returns The formatted table value.
 */
export const formatTableValue = (attribute: string, value: unknown) => {
  if (attribute === "sex") {
    return value === false ? i18n.t("male") : i18n.t("female");
  }
  if (attribute === "dateOfBirth" || attribute === "tutorDateOfBirth") {
    // @ts-expect-error value is an array of numbers
    const validDate = new Date(value[0], value[1] - 1, value[2]);
    // Now you can use Moment.js to format the validDate
    const formattedDate = moment(validDate).format("DD/MM/YYYY");
    return `${formattedDate}`;
  }
  if (attribute === "tutorMaritalStatus") {
    return i18n.t(value as string);
  }
  if (attribute === "studying" || attribute === "requiresGrowthHormone") {
    return value === false ? i18n.t("no") : i18n.t("yes");
  }

  if (attribute === "geneticDiagnosis") {
    return value === false ? i18n.t("clinic") : i18n.t("genetic");
  }

  if (attribute === "otherAilments" || attribute === "reasonsForJoining") {
    return (value as string[]).length === 0
      ? "-"
      : (value as string[]).map((el) => i18n.t(el)).join(", ");
  }

  if (attribute === "specialEducation") {
    return value === false
      ? i18n.t("regular education")
      : i18n.t("special education");
  }

  if (attribute === "levelOfEducation") {
    return i18n.t(value as string);
  }

  if (
    attribute === "age" ||
    attribute === "yearOfDiagnosis" ||
    attribute === "tutorAge"
  )
    return value as string;

  return (value as string)?.length ? i18n.t(value as string) : "-";
};
