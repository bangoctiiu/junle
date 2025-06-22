<template>
<section v-if="!profileExists" class="vh-100" style="background-color: #f4f5f7;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3" style="border-radius: .5rem;">
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white"
              style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
              <div class="my-5">
                <img v-if="profile.image" :src="profile.image" alt="Your Majestic Avatar" class="img-fluid" style="width: 80px;" />
                <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/*" class="d-none" />
                <label for="imageUpload" class="btn btn-custom mt-2">Upload Your Face</label>
              </div>
              <input v-model="profile.name" class="form-control text-center text-white bg-transparent border-0"
                placeholder="What shall we call you, mighty one?" />
              <input v-model="profile.job" class="form-control text-center text-white bg-transparent border-0 mt-2"
                placeholder="Your epic job title" />
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Your Secret Identity</h6>
                <hr class="mt-0 mb-4">
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Magic Mailbox</h6>
                    <input v-model="profile.email" class="form-control" placeholder="you@example.com" />
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Bat-Signal Number</h6>
                    <input v-model="profile.phone" class="form-control" placeholder="(+84) Your Hotline" />
                  </div>
                </div>
                <h6>Legendary Quests</h6>
                <hr class="mt-0 mb-4">
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Last Adventure</h6>
                    <input v-model="profile.recentProject" class="form-control" placeholder="What did you just conquer?" />
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Fan Favorite</h6>
                    <input v-model="profile.mostViewedProject" class="form-control"
                      placeholder="Which quest gained the most fame?" />
                  </div>
                </div>
                <div class="d-flex justify-content-start">
                  <button @click="saveProfile" class="btn btn-primary">Save My Legend</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<router-view v-else></router-view>

</template>

<script>
export default {
  name: 'CreateProfile',
  data() {
    return {
      profile: {
        name: '',
        job: '',
        email: '',
        phone: '',
        recentProject: '',
        mostViewedProject: '',
        image: null
      },
      profileExists: false
    }
  },
  mounted() {
    this.checkProfileExists();
  },
  methods: {
    checkProfileExists() {
      const savedProfile = localStorage.getItem('userProfile');
      this.profileExists = !!savedProfile;
      if (this.profileExists) {
        this.$router.push('/');
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profile.image = URL.createObjectURL(file);
      }
    },
    saveProfile() {
      const requiredFields = [
        this.profile.name,
        this.profile.job,
        this.profile.email,
        this.profile.phone,
        this.profile.recentProject,
        this.profile.mostViewedProject
      ];

      if (requiredFields.some(field => !field.trim())) {
        alert('Please fill in all fields before saving.');
        return;
      }

      localStorage.setItem('userProfile', JSON.stringify(this.profile));
      this.profileExists = true;
      this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('userProfile');
      this.profileExists = false;
      this.profile = {
        name: '',
        job: '',
        email: '',
        phone: '',
        recentProject: '',
        mostViewedProject: '',
        image: null
      };
      this.$router.push('/login'); // Redirect to login page after logout
    }
  }
}
</script>

<style scoped>
.gradient-custom {
  background: #f6d365;
  background: -webkit-linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));
  background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-custom {
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-custom:hover {
  background-color: #0056b3;
}
</style>