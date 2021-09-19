export function validateEmail(address) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(address).toLowerCase()
  );
}
export function validatePassword(value) {
  if (
    value.match(/[a-z]/g) &&
    value.match(/[A-Z]/g) &&
    value.match(/[0-9]/g) &&
    value.length >= 8
  ) {
    return true;
  }
  return false;
}
