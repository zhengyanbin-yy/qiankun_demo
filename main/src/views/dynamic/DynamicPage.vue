<template>
  <show-param />
</template>

<script>
import ShowParam from '@/views/dynamic/ShowParam'
export default {
  name: 'DynamicPage',
  components: { ShowParam },
  props: {
    tabKey: String
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
