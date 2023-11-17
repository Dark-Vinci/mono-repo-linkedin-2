export function navState(isActive: boolean, isPending: boolean): string {
  if (isActive) {
    return 'nav.active';
  }

  if (isPending) {
    return 'nav.pending';
  }

  return '';
}
