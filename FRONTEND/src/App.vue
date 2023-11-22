<template>
  <div id="app">
 
     <routerView :session_user="session_user" :session_admin="session_admin"></routerView> 
   
   </div>
</template>
<script>
import store from '@/store';
export default {
  computed: {
    session_user() {
      return store.state.session_user; // Thay vì this.$store, 
    },
    session_admin() {
      return store.state.session_admin; // Thay vì this.$store, 
    },
  },
};
console.log(store.state.session_user)
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
}

#app > * {
  flex: 1;
}
.content {
  flex: 1; 
  

}
.page {
max-width: 500px;
margin: auto;
}  
</style>
