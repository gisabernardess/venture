import { format } from 'date-fns';

export function isEmpty(obj: unknown) {
  return Object.keys(obj).length === 0;
}

export function refreshPage() {
  window.location.reload();
}

export function toFormatDate(date: string) {
  return date && format(new Date(date), 'PPP');
}
