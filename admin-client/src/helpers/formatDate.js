import { format } from 'date-fns';

export function formatDate(v) {
  return format(v, 'dd/MM/yyyy hh:mm:ss');
}
