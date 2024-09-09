import httpInstance from "@/utils/http";


export const result = () => {
  return httpInstance({
    url: 'home/category/head',
    method: 'get',
  })
}