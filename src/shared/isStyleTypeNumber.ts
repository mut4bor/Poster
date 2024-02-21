export const isStyleTypeNumber = (
  styleElement: unknown | undefined
): styleElement is number => {
  return typeof styleElement === 'number' ? true : false;
};
