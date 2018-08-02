//正整数
export function isPositiveInteger(str) {
  return /^\d+$/.test(str);
}

export function isTrueString(str) {
  return /^true$/i.test(str);
}

export default {
  isPositiveInteger,
  isTrueString,
};
