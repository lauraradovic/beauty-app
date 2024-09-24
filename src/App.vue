<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view></router-view>
    </main>
    <FooTer />
  </div>
</template>

<script>
import FooTer from "./components/FooTer.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooTer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Global styles */
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  header {
    flex-direction: column;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  .services {
    flex-direction: column;
  }
}
</style>
