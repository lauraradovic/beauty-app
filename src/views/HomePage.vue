<template>
  <div class="main-content">
    <section class="hero">
      <div id="carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="@/assets/slide1.jpg"
              class="d-block w-100"
              alt="Slide 1"
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/slide2.jpg"
              class="d-block w-100"
              alt="Slide 2"
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/slide3.jpg"
              class="d-block w-100"
              alt="Slide 3"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Prethodno</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Sljedeće</span>
        </button>
      </div>

      <div class="hero-text">
        <h1>Dobrodošli u naš mali svijet.</h1>
        <p>
          Ovdje, u našem mirnom kutku ljepote i relaksacije, posvećeni smo
          pružanju vrhunske njege i usluga koje će vas osvježiti i osnažiti. Naš
          tim stručnjaka je tu da se pobrine da se osjećate i izgledate najbolje
          moguće.
        </p>
      </div>
    </section>
    <section class="services"></section>
  </div>
</template>

<style scoped>
.main-content {
  padding: 0;
}

.hero {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.carousel {
  width: 100%;
  height: calc(100vh - 80px);
}

.carousel-inner {
  width: 100%;
  height: 100%;
}

.carousel-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0 20px;
}

.hero-text h1 {
  font-size: 2.5rem;
  margin: 0;
}

.hero-text p {
  font-size: 1.25rem;
  margin-top: 10px;
}

.services {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px 0;
}
</style>
