//for refresh & login
export const setupCookie = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    //expires: 1000 * 60 * 60 * 24, //скільки живе токен
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    //expires: 1000 * 60 * 60 * 24,
    expires: session.refreshTokenValidUntil,
  });
};
