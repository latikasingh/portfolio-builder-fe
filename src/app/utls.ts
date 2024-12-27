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
