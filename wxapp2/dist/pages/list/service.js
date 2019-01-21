import { Service } from '../../lib/core/index'

const getMainData = Service({
  url: 'https://xapi.elong.com/newxcxlist/getlistdata/',
  method: 'post',
  dataType: 'form-data',
  noLoading: false,
  cache: true,
  cacheTime: 30 * 1000,
  retry: 3,
  retryTime: 2000
})

export default getMainData
