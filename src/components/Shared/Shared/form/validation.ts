interface Input {
  name: string;
  age: number;
  bio: string;
  language: string;
};
type FormError = ;

interface Validate {
  input: Input;
  setError: (error: FormError) => void;
}

export const validate = ({ input, setError }: Validate) => {
  if (input.language === " ") {
    setError({ name: "language", message: "please pick something" });
    return false;
  }
  if (input.language === "javascript") {
    setError({ name: "language", message: "true + true + true cannot be 3 ffs" });
    return false;
  }
  if (input.name === "") {
    setError({ name: "name", message: "name cant be empty" });
    return false;
  }
  if (input.age < 5) {
    setError({ name: "age", message: "age has to be > 5" });
    return false;
  }
    if (input.language === "java") {
      setError({
        name: "language",
        message: "twe get it , you're different",
      });
      return false;
    }

  // no errors found in validation
  setError({ name: "", message: "" });
  return true;
};
