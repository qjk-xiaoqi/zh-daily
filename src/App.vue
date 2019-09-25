<template>
    <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item" 
          :class="{on: type === 'recommend'}" 
          @click="handleToRecommend">每日推荐</div>

        <!-- 主体日报下有子类列表ul，默认是收起的，点击主体日报可以切换ul 的展开和收起状态 -->
        <div class="daily-menu-item" 
          :class="{on: type === 'daily'}"
           @click="showThemes = !showThemes">主体日报</div>

         <!-- 使用数据 showThemes来控制ul的状态,ul用来显示主题日报的文章类型 -->
        <ul v-show="showThemes">
            <li v-for="item in themes" :key="item.id">
              <a 
                :class="{on: item.id === themeId && type === 'daily'}"
                @click="handleToTheme(item.id)">{{ item.name }}</a>
            </li>
        </ul>
      </div>


      <div class="daily-list"  >
        <!-- 如果type===‘recommend’就显示每日推荐的文章 -->
        <template v-if="type === 'recommend'">
          <div v-for="list in recommendList" :key="list.id">
            <!-- 显示日期 -->
            <div class="daily-date">{{formatDay(list.date)}}</div>
            <Item v-for="item in list.stories" 
              :data="item" 
              :key="item.id" @click.native="handleClick(item.id)" >
            </Item>
          </div>
        </template>
        <!-- 否则显示type===‘daily’的主题日报的文章 -->
        <template v-if="type === 'daily'">
          <Item v-for="item in list" 
            :data="item" 
            :key="item.id">
          </Item>
        </template>
      </div>

       
      <daily-article  :id="articleId"></daily-article>

      
    </div>
</template>

<script>
  import $ from './util/util.js'; // 获取Util对象
  import Item from './components/item.vue';
  import dailyArticle from './components/daily-article.vue';

  export default {
    name: 'App' ,
    components: {
      Item,
      dailyArticle
    },
    
    data() {
      return {
        themes: [], // 主题日报类别列表
        showThemes: false,
        type: 'recommend',
        recommendList: [],// 每日推荐文章的数据
        dailyTime: $.getTodayTime(),// 当天时间
        isLoading: false,
        list:[],// 主题日报文章的数据
        themeId: 0,
        articleId: 0
    }
    },
    methods: {   
      handleToTheme(id) {
        // 改变菜单分类
        this.type = 'daily';
        // 设置当前点击子类的主体日报id
        this.themeId = id;
        // 清空中间栏的数据
        this.list = [];
        $.ajax.get('theme/' + id).then(res => {
          // 过滤掉类型为1的文章，该类型下的文章为空
          this.list = res.stories.filter(item => item.type !== 1);
        })

    },
    // 获得主题日报文章类型的数据
      getThemes () {
        // axios 发起get请求
        $.ajax.get('themes').then(res => {
          this.themes = res.others;
        })
      },
     
    handleToRecommend() {
      this.type = 'recommend';
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },   
    // 获得推荐列表的数据
    getRecommendList() {
      // 加载时设置为true，加载完成后设置false
      this.isLoading = true;
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      $.ajax.get('news/before/' + prevDay).then(res => {
        this.recommendList.push(res);
        this.isLoading = false;
      })
    },

    formatDay(date) {
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      if((month.substr(0, 1) === '0') )month =month.substr(1, 1);
      if(month.substr(0, 1) === '0') day = day.substr(1, 1);
      return `${month} 月${day} 日`;
    },

    handleClick(id) {
      this.articleId = id;
    },
     
 
    mounted () {
      // 初始化时调用
      this.getRecommendList();
      this.getThemes();
      // // 获取DOM
      // const $list  = this.$ref.list;
      // // daily-list元素监听中栏的滚动事件，到底部自动加载前一天的推荐列表
      // $list.addEventListener('scroll', ()=>{
      //   // 在“主体日报”或正在加载推荐列表时停止操作
      //   if(this.type === 'daily' || this.isLoading) return;
      //   // 已经滚动的距离加页面的高度等于高度时整个内容区域，视为接触底部
      //   if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
      //     // 时间相对减少一天
      //     this.dailyTime -= 86400000;
      //     this.getRecommendList();
      //   }
      // });
    }
    }
  
  }
</script>
 
 



