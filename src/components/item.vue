<template>
    <a class="daily-item">
        <!-- 如果data有images选项就显示 -->
        <div class="daily-img" v-if="data.images">
            <img :src="imgPath + data.images[0]">    
        </div>  
        <!-- 否则只显示这个div -->
        <div class="daily-title" :class="{onImg: !data.images}">{{data.title}}</div>   
    </a>
</template>
<script>
    import $ from '../util/util.js';
    export default {
        props: {
            data: {
                type: Object
            }
        },
        data () {
            return {
                imgPath: $.imgPath
            }
        }
    }
</script>