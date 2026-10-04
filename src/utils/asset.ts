// Préfixe les fichiers du dossier public/ avec la base de l'application
// (ex. "/fitforge/" sur GitHub Pages, "/" en local).
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
