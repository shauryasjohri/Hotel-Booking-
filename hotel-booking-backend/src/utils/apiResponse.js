/**
 * Consistent API response helpers.
 */
export const success = (res, data, status = 200) => {
  res.status(status).json({ success: true, data });
};

export const created = (res, data) => {
  success(res, data, 201);
};
