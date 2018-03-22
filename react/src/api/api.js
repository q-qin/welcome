import Server from './server';

class API extends Server{

  /**
   *  获取列表数据
   *  @method get
   *  @return {promise}
   */
  async getList(params = {}){
    try{
      let rs = await this.axios('get', '/news/list', params); 
      if(rs && rs.code === 0){
        return rs;
      }else{
        let err = {
          tip: '获取列表数据失败',
          response: rs,
          data: params,
          url: 'news/list',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  获取详情数据
   *  @method get
   *  @return {promise}
   */
  async getDetail(params = {}){
    try{
      let rs = await this.axios('get', '/news/detail', params); 
      if(rs && rs.code === 0){
        return rs;
      }else{
        let err = {
          tip: '获取详情失败',
          response: rs,
          data: params,
          url: 'news/detail',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();