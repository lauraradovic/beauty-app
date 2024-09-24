<template>
  <div class="admin-page">
    <h1>Admin Dashboard</h1>

    <form @submit.prevent="addService" class="service-form">
      <div class="form-group">
        <label for="name">Ime usluge:</label>
        <input type="text" v-model="newService.name" required />
      </div>
      <div class="form-group">
        <label for="price">Cijena:</label>
        <input type="number" v-model="newService.price" required />
      </div>
      <button type="submit" class="add-service-btn">Dodaj uslugu</button>
    </form>

    <div class="admin-content">
      <div class="photo-upload-section">
        <h2>Upload Photo</h2>

        <div class="photo-upload-group">
          <select v-model="selectedFolder" @change="fetchPhotos">
            <option disabled value="">Odaberi grupu</option>
            <option v-for="folder in folders" :key="folder" :value="folder">
              {{ folder }}
            </option>
          </select>
          <button @click="triggerFileInput" class="choose-photo-btn">
            Choose Photo
          </button>
          <button
            @click="uploadPhoto"
            :disabled="!selectedFile || !selectedFolder"
            class="upload-photo-btn"
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            style="display: none"
          />
        </div>

        <div v-if="selectedFile" class="image-preview">
          <h3>Prikaz slike:</h3>
          <img :src="previewImage" alt="Selected Image" width="200" />
        </div>

        <h2>Uploaded Photos</h2>
        <ul class="photos-list">
          <li v-for="photo in photos" :key="photo.url">
            <img :src="photo.url" alt="Photo" width="100" />
            <button @click="deletePhoto(photo.url)">Delete</button>
          </li>
        </ul>
      </div>

      <div class="services-section">
        <h2>Postojeće usluge</h2>
        <table class="services-table">
          <thead>
            <tr>
              <th>Ime usluge</th>
              <th>Cijena (EUR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id">
              <td>{{ service.name }}</td>
              <td>{{ service.price }}</td>
              <td>
                <button class="delete-btn" @click="deleteService(service.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default {
  name: "AdminPage",
  data() {
    return {
      newService: {
        name: "",
        price: null,
      },
      services: [],
      photos: [],
      selectedFile: null,
      previewImage: null,
      selectedFolder: "",
      folders: [],
    };
  },
  created() {
    this.fetchServices();
    this.fetchFolders();
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
    async addService() {
      try {
        const newServiceRef = await addDoc(
          collection(db, "services"),
          this.newService
        );
        this.services.push({
          id: newServiceRef.id,
          ...this.newService,
        });
        this.newService.name = "";
        this.newService.price = null;
      } catch (error) {
        console.error("Error adding service: ", error);
      }
    },
    async deleteService(id) {
      try {
        await deleteDoc(doc(db, "services", id));
        this.services = this.services.filter((service) => service.id !== id);
      } catch (error) {
        console.error("Error deleting service: ", error);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.selectedFile);
    },
    async uploadPhoto() {
      if (this.selectedFile && this.selectedFolder) {
        try {
          const storageRef = ref(
            storage,
            `${this.selectedFolder}/${this.selectedFile.name}`
          );
          await uploadBytes(storageRef, this.selectedFile);
          this.selectedFile = null;
          this.previewImage = null;
          this.fetchPhotos();
          console.log("Photo uploaded successfully.");
        } catch (error) {
          console.error("Error uploading photo: ", error);
        }
      }
    },
    async fetchFolders() {
      try {
        const listRef = ref(storage);
        const res = await listAll(listRef);
        this.folders = res.prefixes.map((folderRef) => folderRef.name);
      } catch (error) {
        console.error("Error fetching folders: ", error);
      }
    },
    async fetchPhotos() {
      try {
        if (!this.selectedFolder) return;
        const listRef = ref(storage, this.selectedFolder);
        const res = await listAll(listRef);
        this.photos = await Promise.all(
          res.items.map(async (item) => {
            const downloadURL = await getDownloadURL(item);
            return { url: downloadURL };
          })
        );
      } catch (error) {
        console.error("Error fetching photos: ", error);
      }
    },
    async deletePhoto(photoUrl) {
      try {
        const storageRef = ref(storage, photoUrl);
        await deleteObject(storageRef);
        this.photos = this.photos.filter((photo) => photo.url !== photoUrl);
      } catch (error) {
        console.error("Error deleting photo: ", error);
      }
    },
  },
};
</script>

<style scoped>
.admin-page {
  max-width: 100%;
  width: 100%;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 70px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2em;
  color: #333;
}

.service-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
}

.service-form .form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.service-form input {
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-service-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.admin-content {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
}

.photo-upload-section,
.services-section {
  flex: 1;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.photo-upload-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
}

.choose-photo-btn,
.upload-photo-btn {
  width: 40%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.image-preview {
  margin-top: 20px;
  text-align: center;
}

.image-preview img {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  max-width: 100%;
}

.photos-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.photos-list li {
  list-style: none;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
}

.services-table th,
.services-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.services-table th {
  background-color: #f2f2f2;
}

.services-table tr:hover {
  background-color: #f1f1f1;
}

.delete-btn {
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.9em;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
