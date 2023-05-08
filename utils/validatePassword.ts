export const validatePassword = (pass: string): boolean => {
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

  const result = pass.match(regx);
  
  return !result;
}