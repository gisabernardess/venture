export function isEmpty(obj: unknown) {
  return Object.keys(obj).length === 0;
}

export function refreshPage() {
  window.location.reload();
}
