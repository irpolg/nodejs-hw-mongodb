//02-08-2024

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
