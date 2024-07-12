import Snackbar from "awesome-snackbar";

export const successAlert = (text) => {
  return new Snackbar(text, {
    timeout: 5000,
    position: "top-center",
    style: {
      container: [
        ["background-color", "green"],
        ["border-radius", "8px"],
      ],
      message: [
        ["font-family", "Inter"],
        ["font-weight", "700"],
      ],
    },
  });
}

export const errorAlert = (text) => {
  new Snackbar(text, {
    timeout: 5000,
    position: "top-center",
    style: {
      container: [
        ["background-color", "red"],
        ["border-radius", "8px"],
      ],
      message: [
        ["font-family", "Inter"],
        ["font-weight", "700"],
      ],
    },
  });
}
