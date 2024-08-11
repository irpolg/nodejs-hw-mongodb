function parseNumber(maybeNumber, defaultValue) {
  if (typeof maybeNumber !== 'string') {
    return defaultValue;
  }

  const parsedNumber = parseInt(maybeNumber); // поверне число

  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1); // 1- дефолтне значення для сторінки
  const parsedPerPage = parseNumber(perPage, 10); //10- дефолтне значення - елементів на сторінці
  //console.log(page, perPage);
  //console.log(parsedPage, parsedPerPage);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
