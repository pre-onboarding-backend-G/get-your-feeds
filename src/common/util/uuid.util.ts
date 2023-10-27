import { v4 as uuidv4 } from 'uuid';

export function generateNoDashUUID(): string {
  return uuidv4().replace(/-/g, '');
}
