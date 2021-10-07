export const config = {
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://venture-server.herokuapp.com'
      : 'http://localhost:3333',
  projectUrl: 'https://github.com/gisabernardess/venture',
  linkedInUrl: 'https://www.linkedin.com/in/gisabernardess/',
};
