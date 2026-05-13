export const validateRequiredText = (text) => {
  if (!text || typeof text !== "string" || text.trim().length < 5) {
    return "Please provide at least 5 characters of text.";
  }

  if (text.length > 12000) {
    return "Text is too long. Please keep it under 12,000 characters.";
  }

  return null;
};

export const validateAuthInput = ({ name, email, password }, isRegister = false) => {
  if (isRegister && (!name || name.trim().length < 2)) {
    return "Name must be at least 2 characters.";
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return "A valid email address is required.";
  }

  if (!password || password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return null;
};
