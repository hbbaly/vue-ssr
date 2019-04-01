<template>
  <div class="page page-home">
    <div v-for="item in topicList" :key="item.id">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'item-view',
  data: () => ({
    loading: true
  }),

  computed: {
    ...mapGetters(['topicList'])
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('GET_TOPICS')
    ])
  },
  // Fetch comments when mounted on the client

  // refetch comments if item changed

  mounted(){
    console.log(this.topicList,'topicList');
    
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta, .meta a
    color #828282
  .meta a
    text-decoration underline

.item-view-comments
  background-color #fff
  margin-top 10px
  padding 0 2em .5em

.item-view-comments-header
  margin 0
  font-size 1.1em
  padding 1em 0
  position relative
  .spinner
    display inline-block
    margin -15px 0

.comment-children
  list-style-type none
  padding 0
  margin 0

@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>
