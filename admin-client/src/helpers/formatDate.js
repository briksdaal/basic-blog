import { format } from 'date-fns';

export function formatDate(v) {
  return format(v, 'dd/MM/yyyy hh:mm:ss');
}

export function formatForDatePicker(v) {
  return format(v, "yyyy-MM-dd'T'hh:mm:ss");
}
