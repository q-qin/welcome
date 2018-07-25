<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="false"
	            page-name="$route.meta.title" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="ranking" v-show="!loading">
			<div class="rank_bg">
				<div class="top">
					<div class="week left" :class="{'active':key=='week'}" @click="getRank('week')">
						周排行
					</div>
					<div class="total right" :class="{'active':key=='total'}"  @click="getRank('total')">
						总排行
					</div>
				</div>
				<div class="bottom">
					<div class="box">
						<div class="content">
							<table cellpadding="0" cellspacing="0">
								<colgroup>
								    <col width="15">
								    <col width="30%">
								    <col width="25%">
								    <col width="30%">
								</colgroup>
								<thead>
									<tr>
										<th class="rank">排名</th>
										<th>用户</th>
										<th>好友数</th>
										<th>总收入(元)</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,$index) in list" :key="$index">
										<td class="rank" :class="{'one':$index==0,'two':$index==1,'three':$index==2}">{{$index+1}}</td>
										<td>{{item.nickname}}</td>
										<td>{{item.friends_num}}</td>
										<td>{{item.rank_income}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
	    </div>
	</div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "ranking",
  data() {
    return {
      loading: true,
      key: "",
      week: [],
      total: [],
      list: []
    };
  },
  components: {
    nvHead,
    nvLoading
  },
  created() {
    this.$Progress.start();
    this.getRank("total");
  },
  mounted() {},
  methods: {
    /**
     * 获取排行榜list
     */
    async getRank(key) {
      if (this.key != key) {
        if (key == "week") {
          if (this.week.length == 0) {
            let params = {
              type: 1
            };
            let comm = await appcall.getAppData();
            let rs = await ajax(
              "post",
              this.$apiurl + "/rank/users_income_tongji",
              comm,
              params
            );
            if (rs && rs.code === 1001 && rs.data) {
              this.loading = false;
              this.week = rs.data.list;
            } else if (rs && rs.code === 1008) {
              this.loading = false;
              this.week = [];
            } else {
              this.$alert(rs.msg);
            }
          }
          this.list = this.week;
        }
        if (key == "total") {
          if (this.total.length == 0) {
            let params = {
              type: 2
            };
            let comm = await appcall.getAppData();

            let rs = await ajax(
              "post",
              this.$apiurl + "/rank/users_income_tongji",
              comm,
              params
            );
            this.$Progress.finish();
            if (rs && rs.code === 1001 && rs.data) {
              this.loading = false;
              this.total = rs.data.list;
            } else if (rs && rs.code === 1008) {
              this.loading = false;
              this.total = [];
            } else {
              this.$alert(rs.msg);
            }
          }
          this.list = this.total;
        }

        this.key = key;
      }
    }
  },
  filters: {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin";
.ranking {
  background: url("../../../assets/images/activities/rank_top.png") no-repeat
    top center;
  background-size: 100%;
  background-color: #f4fcff;
  padding-top: 5rem;
  .rank_bg {
    position: relative;
    .top {
      position: absolute;
      left: 0;
      top: -0.6rem;
      width: 100%;
      .week {
        width: 3.23rem;
        height: 1.02rem;
        .background('activities/rank_week.png');
        text-align: center;
        font-size: 0.48rem;
        color: #8a64e9;
        line-height: 0.9rem;
        &.active {
          color: #fff;
          background-image: url("../../../assets/images/activities/rank_week_act.png");
        }
      }
      .total {
        width: 3.23rem;
        height: 1.02rem;
        .background('activities/rank_total.png');
        text-align: center;
        font-size: 0.48rem;
        color: #8a64e9;
        line-height: 0.9rem;
        &.active {
          color: #fff;
          background-image: url("../../../assets/images/activities/rank_total_act.png");
        }
      }
    }
    .bottom {
      background: #fff1ca;
      border-radius: 0.3rem;
      margin: 0 0.2rem 0;
      padding: 0.6rem 0.15rem 0.6rem;
      .box {
        border-top: 0.09rem solid #ffca61;
        border-radius: 0.25rem 0.25rem 0 0;
        .content {
          border-top: 0.04rem solid #fff1ca;
          background: #fff;
          border-radius: 0.25rem;
          padding: 0.28rem 0.1rem;
          table {
            width: 100%;
            th {
              font-size: 0.36rem;
              line-height: 0.5rem;
              font-weight: normal;
              padding: 0 0.05rem 0.2rem;
              text-align: center;
              color: #ffca61;
              .border(#ffca61,bottom);
            }
            td {
              font-size: 0.3rem;
              line-height: 0.4rem;
              padding: 0.2rem 0.05rem;
              text-align: center;
              color: #333;
              .border(#fce37d,top);
              &.rank {
                color: #ffcb11;
                &.one {
                  .background('activities/rank_one.png');
                  background-size: 0.6rem;
                  color: #fff;
                }
                &.two {
                  .background('activities/rank_two.png');
                  background-size: 0.6rem;
                  color: #fff;
                }
                &.three {
                  .background('activities/rank_three.png');
                  background-size: 0.6rem;
                  color: #fff;
                }
              }
            }
            tr:first-child td {
              border-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
