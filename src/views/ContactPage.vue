<template>
  <div class="contact-page container">
    <h1 class="text-center mb-4">Kontakt forma</h1>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Vaše ime</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              v-model="form.name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Vaša e-mail adresa</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="date">Datum</label>
            <input
              type="date"
              id="date"
              name="date"
              class="form-control"
              v-model="form.date"
              required
            />
          </div>
          <div class="form-group">
            <label for="time">Vrijeme</label>
            <select
              id="time"
              name="time"
              class="form-control"
              v-model="form.time"
              required
            >
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Molimo navesti usluge koje želite:</label>
            <textarea
              id="message"
              name="message"
              class="form-control"
              rows="5"
              v-model="form.message"
              required
            ></textarea>
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="gdprConsent"
              v-model="form.gdprConsent"
              required
            />
            <label class="form-check-label" for="gdprConsent">
              Slažem se da ovo web mjesto pohranjuje moje poslane podatke na
              takav način da mogu odgovoriti na moj upit.
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Pošalji
          </button>
        </form>
      </div>

      <div class="col-md-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.1481746094246!2d14.451534276600633!3d45.325630242673206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a1ab74dc9b0f%3A0x9048c0f84aeab3f4!2sSveu%C4%8Dili%C5%A1te%20u%20Rijeci!5e0!3m2!1sen!2shr!4v1723130723116!5m2!1sen!2shr"
          width="100%"
          height="400"
          frameborder="0"
          style="border: 0"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>

    <div
      class="modal fade"
      id="successModal"
      tabindex="-1"
      aria-labelledby="successModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Obavijest</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Zahtjev uspješno poslan!</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        date: "",
        time: "",
        message: "",
        gdprConsent: false,
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.form.message.trim()) {
        alert("Molimo navedite usluge koje želite.");
        return;
      }

      const templateParams = { ...this.form };

      emailjs
        .send(
          "service_4395q0h",
          "template_j8wb3qv",
          templateParams,
          "oF-77kDqtLD-u5pV1"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);

            var successModal = new window.bootstrap.Modal(
              document.getElementById("successModal")
            );
            successModal.show();

            this.form = {
              name: "",
              email: "",
              date: "",
              time: "",
              message: "",
              gdprConsent: false,
            };
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
  },
};
</script>

<style scoped>
.contact-page {
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 8px;
  margin-top: 80px;
}

h1 {
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.form-check-label {
  font-size: 14px;
}

iframe {
  border: 0;
  border-radius: 8px;
}
</style>
