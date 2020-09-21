export const pluralize = (singularForm, pluralForm, groupSize) => {
  return groupSize === 1 ? singularForm : pluralForm;
};
