<template>
  <div>
    <header>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">O nama</router-link></li>
          <li><router-link to="/contact">Kontakt</router-link></li>
          <li><router-link to="/gallery">Galerija</router-link></li>
          <li><router-link to="/services">Usluge</router-link></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
header {
  width: 100%;
  background-color: #eddbc0; /* Lighter beige color */
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.logo img {
  height: 80px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 25px;
}

nav ul li a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

nav ul li a:hover {
  text-decoration: underline;
}

/* This will prevent the main content from overlapping with the fixed header */
</style>
