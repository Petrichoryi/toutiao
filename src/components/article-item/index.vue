<template>
    <van-cell class="article-item">
        <div slot="title" class="title">{{article.title}}</div>
        <div slot="label">
            <div class="cover-wrap" v-if="article.cover.type===3">
                <div class="cover-wrap-item"
                v-for="(img,index) in article.cover.images"
                    :key="index">
                    <van-image width="98" height="73" fit="cover"

                    :src="img"/>
                </div>
            </div>
            <div class="label-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate|relativeTime}}</span>
            </div>
        </div>
        <van-image

        fit="cover"
        v-if="article.cover.type===1"
        :src="article.cover.images[0]"></van-image>

    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped lang="less">
.article-item{

    .title{
        font-size: 16px;
        color:#3a3a3a;
        overflow: hidden;
        white-space: nowrap;//文本不会换行，在同一行继续，直到遇到标签为止
        text-overflow: ellipsis;//当文本溢出时显示省略号
    }

    /deep/ .van-cell__title{
        flex: unset;
        width: 60%;
        .cover-wrap{
            padding:15px 0;
            display: flex;
            .cover-wrap-item{
                flex: 1;
                &:not(:last-child){
                    padding-right: 4px;
                }
            }
        }
        .label-wrap{
            font-size:11px;
            color:#b4b4b4;
            span{
                margin-right: 12px;
            }
        }
    }
    /deep/ .van-cell__value{
        margin-left: 12px;
    }

}
</style>
