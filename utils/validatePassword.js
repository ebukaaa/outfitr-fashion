export default function validatePassword(value) {
  if (
    value.match(/[a-z]/g) &&
    value.match(/[A-Z]/g) &&
    value.match(/[0-9]/g) &&
    value.length >= 8
  )
    return true;

  return false;
}
