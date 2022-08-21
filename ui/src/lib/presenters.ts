export const abbreviatedAddress = (address: string) => {
  return address.slice(0,6) + '...' + address.slice(-7);
}

export const pluralize = (thing: string, count: number) => {
  return count === 1 ? thing : `${thing}s`;
}
