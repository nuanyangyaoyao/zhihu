<template>
  <div class="collect">
    <Navi :title="'收藏'" />
    <div class="collect-box">
      <div
        class="content"
        v-for="(itme, index) in storageOne"
        :key="index"
        @click="DetailsPage(itme.id)"
      >
        <div class="content-test">
          <div class="text">
            <div class="content-text-one warp-text">{{ itme.title }}</div>
            <div class="content-text-two warp-text">{{ itme.hint }}</div>
          </div>
          <div class="content-img">
            <img :src="itme.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  components: { Navi },
  name: "Collect",

  data(){
      return{
          id:'',
          storageOne:[],
          AppId:[],
          collectData:[],
      }
  },

  created(){
      this.collectData = Array.from(new Set(this.$root.collectDataApp));
      for(let i=0;i<this.collectData.length;i++){
        this.AppId.push(this.collectData[i]);
        this.getId(this.AppId[i])
      }
      
  },

  methods:{

      DetailsPage(id){
        this.$router.push({name: 'Detail' , params:{id}})
      },

      getId(id){
          this.axios({
        method: "get",
        url: "https://apis.netstart.cn/zhihudaily/story/"+id,
      })
        .then((result) => {
          this.storageOne.push(result.data.story)
        })
        .catch((err) => {
        });
      }
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  .content-img {
    margin-left: auto;
    width: 70px;
    height: 70px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 3px;
    }
  }
  .content-test {
    padding: 15px 15px;
    display: flex;
    align-items: center;
    .text{
      flex: 5;
    }
    .content-text-one {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .content-text-two {
      font-size: 12px;
      color: rgb(206, 203, 203);
    }
  }
}
</style>
