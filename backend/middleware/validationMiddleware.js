const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    return res.status(400).json({ message: error.message || 'Validation failed' });
  }
};

export default validate;
