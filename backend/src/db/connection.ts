export function getConnectionString(): string {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error('DB_URL is not set');
  }

  const url = new URL(dbUrl);

  if (process.env.DB_HOST) {
    url.hostname = process.env.DB_HOST;
  }

  if (process.env.DB_PORT) {
    url.port = process.env.DB_PORT;
  }

  return url.toString();
}
