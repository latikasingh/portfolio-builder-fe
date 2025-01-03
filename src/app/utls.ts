export const jsonToFormData = (
  data: any,
  formData: FormData = new FormData(),
  parentKey: string = '',
): FormData => {
  if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value && typeof value === 'object' && !(value instanceof File)) {
        jsonToFormData(value, formData, fullKey);
      } else if (value !== undefined && value !== null) {
        formData.append(fullKey, value);
      }
    });
  } else if (data !== undefined && data !== null) {
    formData.append(parentKey, data);
  }

  return formData;
};

export const defaultSvg =
  '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>';
