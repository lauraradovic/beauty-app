<template>
  <div class="about-component">
    <div class="about-content">
      <h1>O nama</h1>
      <p>
        Dobrodošli u Beauty Salon Glamour, novu zvijezdu u beauty svijetu grada.
        Iako smo novaci, brzo smo stekli reputaciju kao vrhunska destinacija za
        iznimne tretmane.
      </p>
      <p>
        Moderna oprema i luksuzni proizvodi pružaju vam vrhunske tretmane za
        lice i tijelo. Naš prijateljski tim osigurat će da se osjećate blistavo
        i opušteno.
      </p>
      <p>
        Posjetite nas u Beauty Salonu Glamour i doživite poseban tretman koji će
        vas oduševiti.
      </p>
    </div>
    <div class="about-image">
      <img src="@/assets/aboutUs.jpg" alt="About Us" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-component {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.about-content {
  flex: 1;
  margin-right: 40px;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>
