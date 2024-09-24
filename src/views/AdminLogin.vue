<template>
  <div class="admin-login">
    <h2>Admin prijava</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Lozinka:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Prijava</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/"); // Redirect to admin dashboard after login
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 100px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
}

.admin-login h2 {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #555;
}
</style>
