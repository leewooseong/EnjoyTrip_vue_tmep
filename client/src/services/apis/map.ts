import axios from 'axios'

const openApiKey = import.meta.env.VITE_PUBLIC_API_ENCODING_KEY

export const getSiDoData = async (areaSiDoURL: string) => {
  const siDoRes = await axios.get(areaSiDoURL)
  const resData = siDoRes.data.response.body.items.item
  return resData
}

export const getGunGuData = async (areaGunGuURL: string) => {
  const gunGuRes = await axios.get(areaGunGuURL)
  const resData = gunGuRes.data.response.body.items.item
  return resData
}

export const getSearchedData = async ({ siDoCode, gunGuCode, category, searchWord }: any) => {
  const baseUrl = `https://apis.data.go.kr/B551011/KorService1/`
  let queryString = `serviceKey=${openApiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`
  if (parseInt(siDoCode)) queryString += `&areaCode=${siDoCode}`
  if (parseInt(gunGuCode)) queryString += `&sigunguCode=${gunGuCode}`
  if (parseInt(category)) queryString += `&contentTypeId=${category}`
  const keyword = searchWord

  let service = ``
  if (keyword) {
    service = `searchKeyword1`
    queryString += `&keyword=${keyword}`
  } else {
    service = `areaBasedList1`
  }
  const searchUrl = baseUrl + service + '?' + queryString

  const apiRes = await axios.get(searchUrl)
  const resData = apiRes.data.response.body.items.item

  return resData
}
