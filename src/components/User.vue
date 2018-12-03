<template>
<div>
  Salut
</div>
</template>

<script>
  import * as api from '@/api';
  import * as User from '@/models/User';

  export default {
    name: 'User',
    data() {
      return {
        id: this.$route.params.id,
        user: User
      };
    },
    async created() {
      const tmpUser = await api.getUser(this.id);
      console.log(tmpUser);
      this.user = tmpUser.results[0];
    }
  };
</script>

<style scoped>

</style>
