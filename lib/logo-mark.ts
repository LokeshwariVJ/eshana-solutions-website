// Shared geometry for the inline brand mark and generated browser icons.
export const logoMarkPaths = [
  "M4 4H38.5V13.2C34 6.2 29.2 5 22 5H16V21.3C12.8 24.2 10.4 28 9.2 32.6V12C9.2 8.1 8 5.7 4 4.3Z",
  "M3.8 43.2C7.4 42 8 39.8 8.8 36.7C11 27 17 19.2 28.5 18C34.5 17.3 39.6 15.7 44 11.8C41.5 23.8 33.5 28.8 23.1 29.5C20.3 29.7 18.4 30.1 16 31.1V36.2C16 40.6 18.3 42.2 23.5 42.2C30.6 42.2 36 38.7 40 32.7V43.2ZM9.5 38.7C14.5 29.3 26 27.3 32.4 21.1C21.8 25.4 14 26.3 9.5 38.7Z",
];

export function logoIconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="2" fill="#f8f4ed"/><g fill="#2f6f6a" fill-rule="evenodd">${logoMarkPaths.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
}
