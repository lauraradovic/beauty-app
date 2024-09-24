<template>
  <div class="gallery">
    <div
      v-for="(photos, folderName) in groupedPhotos"
      :key="folderName"
      class="photo-group"
    >
      <h2>{{ folderName }}</h2>
      <div class="photo-grid">
        <div v-for="photo in photos" :key="photo.url" class="photo-item">
          <img :src="photo.url" alt="Gallery Photo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "@/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  name: "GalleryView",
  data() {
    return {
      groupedPhotos: {},
    };
  },
  created() {
    this.fetchFoldersAndPhotos();
  },
  methods: {
    async fetchFoldersAndPhotos() {
      const rootRef = ref(storage);
      try {
        const res = await listAll(rootRef);
        for (const folderRef of res.prefixes) {
          const folderName = folderRef.name;
          await this.fetchPhotosFromFolder(folderRef, folderName);
        }
      } catch (error) {
        console.error("Error fetching folders and photos: ", error);
      }
    },
    async fetchPhotosFromFolder(folderRef, folderName) {
      try {
        const res = await listAll(folderRef);
        const photoUrls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { url };
          })
        );

        this.groupedPhotos[folderName] = photoUrls;
      } catch (error) {
        console.error("Error fetching photos from folder:", folderName, error);
      }
    },
  },
};
</script>

<style scoped>
.gallery {
  padding-top: 80px;
}

.photo-group {
  margin-bottom: 40px;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start; /* Align items to the start */
}

.photo-item {
  flex: 1 1 auto; /* Allows the item to grow and shrink */
  max-width: 200px; /* Maximum width for each item */
  height: 150px; /* Fixed height */
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensures the image maintains its aspect ratio and fits within the box */
  border-radius: 5px;
}
</style>
