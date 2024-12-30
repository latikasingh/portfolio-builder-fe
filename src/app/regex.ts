export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;

export const phoneRegex = /^\d{10}$/;

export const percentageRegex = /^(100|[1-9][0-9]?)$/;

export const linkRegex =
  /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
