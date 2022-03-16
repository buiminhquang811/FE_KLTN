export const ParseSimpleEndpoint = (data) => {
  let url;
  Object.keys(data).map((key, index) => {
      return url = `${url ? url : ''}${index !== 0 ? '&' : ''}${key}=${data[key]}`
  })
  return url;
}