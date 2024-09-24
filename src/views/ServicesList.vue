<template>
  <div class="services-page d-flex">
    <div class="main-content d-flex flex-column">
      <div class="image-container position-relative">
        <img src="@/assets/woman.jpg" alt="Cosmetic Image" class="img-fluid" />
        <div class="overlay-text">
          <p>
            Naš kozmetički salon ponosno nudi širok spektar usluga dizajniranih
            da zadovolje sve vaše potrebe. Svaka usluga je pažljivo osmišljena
            kako bi vam pružila vrhunsko iskustvo i doprinijela vašem osjećaju
            blagostanja i samopouzdanja.
          </p>
        </div>
      </div>

      <div class="service-list mt-4">
        <h2 class="text-center">Tretmani Lica</h2>
        <table class="table table-striped">
          <thead class="bg-warning text-white">
            <tr>
              <th>Tretman</th>
              <th class="text-right">Cijena tretmana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id">
              <td>{{ service.name }}</td>
              <td class="text-right">{{ service.price }} EUR</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "ServicesList",
  data() {
    return {
      services: [],
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const snapshot = await getDocs(collection(db, "services"));
        this.services = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching services: ", error);
      }
    },
  },
};
</script>

<style scoped>
.services-page {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.image-container {
  position: relative;
  max-height: 400px;

  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.service-list {
  margin-top: 20px;
}

.service-list table {
  width: 100%;
}

.service-list th,
.service-list td {
  padding: 10px;
}
</style>
