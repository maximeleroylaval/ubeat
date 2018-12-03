<template>
  <div>
    {{ query }}
  </div>
</template>

<script>
  import * as api from '@/api';

  export default {
    name: 'Search',
    props: {
    },
    data() {
      return {
        type: this.$route.params.type,
        query: this.$route.params.query.value
      };
    },
    async created() {
      api.searchGlobal(this.query);
    }
  };
</script>

<style scoped>

</style>
