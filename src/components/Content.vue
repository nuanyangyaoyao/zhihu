<template>
	<div class="content">
	    <div class="old-left">
	      <div class="old-text warp-text">
	        {{ k.title }}
	      </div>
	      <div class="old-author">
	        {{ k.hint }}
	      </div>
	    </div>
	    <div class="old-right">
	      <div class="old-img">
	        <img class="auto-img" :src="k.images" alt="" />
	      </div>
	    </div>
	  </div>
</template>

<script>
	export default {
		name: 'Content',
		props: ['k']
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		  align-items: center;
		  padding: 10px 10px;
		  .old-left {
		    .old-text {
		      padding-right: 10px;
		      font-size: 14px;
		      margin-bottom: 3px;
		    }
		    .old-author{
		      font-size: 12px;
		      color: rgb(182, 176, 176);
		    }
		  }
		  .old-right{
		    margin-left: auto;
		    .old-img{
		      width: 60px;
		      height: 60px;
		    }
		  }
	}
</style>
