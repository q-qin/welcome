/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//www.3keji.com:4001/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = '//www.3keji.com:4001';
}else{
  baseURL = '//www.3keji.com:4001';
}


export default {imgUrl, baseURL}