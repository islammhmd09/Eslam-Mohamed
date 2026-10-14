import { isUpload } from '@/config/fields';
import { AppError } from './errors';
const MAX_LENGTH = { text: 200, textarea: 5000 };
const SAFE_LINK = /^(https:\/\/|http:\/\/|mailto:|tel:)/i;

/** Builds a clean data object from the section's field definitions; throws 400 on bad input. */
export function validate(section, input = {}) {
  const data = {}, errors = [];
  for (const { name, type, required } of section.fields) {
    const value = String(input[name] ?? '').trim();
    if (required && !value) errors.push(`${name} is required`);
    if (value.length > (MAX_LENGTH[type] ?? 600)) errors.push(`${name} is too long`);
    if (value && (type === 'url' || isUpload(type)) && !SAFE_LINK.test(value)) errors.push(`${name} must be a valid link`);
    data[name] = value;
  }
  if (errors.length) throw new AppError(errors.join('; '));
  return data;
}
