import ajax from '@/config/ajax'

export default {
	saveuser({commit,state},userinfo){
		//const rs = ajax('')
		commit('SAVEUSERINFO', userinfo);
	}
}