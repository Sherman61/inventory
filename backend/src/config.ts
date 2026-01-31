export const config = {
  port: Number(process.env.PORT ?? 3000),
  isAdmin: (process.env.IS_ADMIN ?? 'false').toLowerCase() === 'true',
};
