export const formatedData = (creationDate) => {
  const data = new Date(creationDate);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  if (day < 10 && month < 10) return ['0' + day, '0' + month, year].join('/');
  if (day < 10) return ['0' + day, month, year].join('/');
  if (month < 10) return [day, '0' + month, year].join('/');
  return [day, month, year].join('/');
};

export const getRentability = (value) => {
  return Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
