const plus = (value1: number, value2: number) => {
  const value1String = value1.toString();
  const value2String = value2.toString();
  const dotIndex1 = value1String.indexOf(".");
  const dotIndex2 = value2String.indexOf(".");

  let fixedSize = 0;
  if (dotIndex1 >= 0) {
    fixedSize = value1String.length - dotIndex1;
  }

  if (dotIndex2 >= 0) {
    const value2FixedSize = value2String.length - dotIndex2;
    if (value2FixedSize > fixedSize) {
      fixedSize = value2FixedSize;
    }
  }
  const fixed = Math.pow(10, fixedSize);
  return Math.round((value1 * fixed + value2 * fixed)) / fixed;
}

export const useFloat = () => {
  return { plus };
};
