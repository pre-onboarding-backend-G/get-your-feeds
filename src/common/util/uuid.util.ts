import { v1 as uuidv1 } from 'uuid';

export function generateNoDashUUID(): string {
  return uuidv1().replace(/-/g, '');
}
