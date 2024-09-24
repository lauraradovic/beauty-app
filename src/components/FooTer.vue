<template>
  <footer>
    <p>&copy; 2024 Laura Radović. All rights reserved.</p>
    <div class="right-section">
      <a href="https://www.instagram.com/fidit_uniri/"
        ><img src="@/assets/instagram-icon.png" alt="Instagram"
      /></a>
      <router-link v-if="isAdminLoggedIn" to="/admin" class="admin-link"
        >Admin</router-link
      >
      <router-link v-else to="/login" class="admin-link">Login</router-link>
      <a v-if="isAdminLoggedIn" href="#" class="admin-link" @click="logout"
        >Logout</a
      >
    </div>
  </footer>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "FooTer",
  data() {
    return {
      isAdminLoggedIn: false,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.isAdminLoggedIn = !!user;
    });
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.push("/"); // Redirect to home page after logout
        })
        .catch((error) => {
          console.error("Logout failed: ", error);
        });
    },
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  background-color: #eddbc0;
  color: #a89b88;
  display: flex;
  justify-content: space-between; /* Space between text and right section */
  align-items: center;
  padding: 10px 20px; /* Adjusted padding */
  box-sizing: border-box;
  border-top: 1px solid #444;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}

footer p {
  margin: 0;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-section a {
  color: #a89b88;
  text-decoration: none;
  margin-left: 15px; /* Space between icons and "Admin" */
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.right-section a img {
  height: 20px; /* Adjust icon size */
  width: 20px;
  margin-left: 10px; /* Space between icons */
}

.right-section .admin-link {
  opacity: 0.7; /* Slight transparency */
  font-size: 12px;
}

.right-section .admin-link:hover {
  opacity: 1; /* Full opacity on hover */
}
</style>
