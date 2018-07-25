const SAVEUSERINFO = 'SAVEUSERINFO'

export default {
	// 保存用户信息
	[SAVEUSERINFO](state, userinfo) {
		state.userinfo = userinfo;
	}
}