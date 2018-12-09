<template>
    <div class="home">
    <data-list></data-list>
  </div>

</template>

<script>
import dataList from '@/components/dataList'

export default {
  name: 'home',
  components: {
    dataList
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
  }

</style>
