<template>
  <section class="vh-100" style="background: linear-gradient(to right, #f8f9fa, #e9ecef);">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg rounded-4 border-0">
            <div class="row g-0">
              <!-- Avatar & Name -->
              <div
                class="col-md-4 d-flex flex-column align-items-center justify-content-center text-white text-center p-4"
                style="background: linear-gradient(135deg, #6a11cb, #2575fc); border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; position: relative;">

                <div class="position-relative avatar-wrapper" @click="triggerFileInput" style="cursor: pointer;">
                  <img :src="profile.image || defaultImage" alt="Avatar" class="rounded-circle border border-white"
                    style="width: 100px; height: 100px; object-fit: cover;" />
                  <div class="overlay d-flex justify-content-center align-items-center rounded-circle">
                    <span class="material-symbols-outlined">photo_camera</span>
                  </div>
                  <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="onImageChange" />
                </div>

                <h5 class="fw-bold mt-3">{{ profile.username || 'Mystery Human' }}</h5>
                <span class="fst-italic">Adventurer Profile</span>
              </div>

              <!-- Info -->
              <div class="col-md-8">
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Your Info Dashboard</h5>
                    <button class="btn btn-sm btn-outline-secondary" @click="isEditing = !isEditing">
                      {{ isEditing ? 'Cancel' : 'Edit' }}
                    </button>
                  </div>
                  <hr />

                  <!-- Editable or Read-only -->
                  <div v-if="isEditing">
                    <div class="form-group mb-3">
                      <label>Username</label>
                      <input type="text" v-model="profile.username" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                      <label>Email</label>
                      <input type="email" v-model="profile.email" class="form-control" />
                    </div>

                    <div class="form-group mb-3">
                      <label>Latest Project</label>
                      <input type="text" v-model="profile.recentProject" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                      <label>Most Popular Project</label>
                      <input type="text" v-model="profile.mostViewedProject" class="form-control" />
                    </div>
                    <button class="btn btn-success" @click="saveProfile">Save Changes</button>
                  </div>

                  <div v-else>
                    <p><strong>Email:</strong> {{ profile.email || 'No Email Provided' }}</p>
                    <p><strong>Password:</strong> ******** (Change it under "Change Password")</p>
                    <h6 class="mt-4">Project Highlights</h6>
                    <p><strong>Latest:</strong> {{ profile.recentProject || 'Nothing Yet' }}</p>
                    <p><strong>Most Popular:</strong> {{ profile.mostViewedProject || 'Still Waiting for Fame' }}</p>
                  </div>

                  <div class="d-flex justify-content-end mt-4">
                    <button @click.prevent="$router.push('/')" class="btn btn-outline-primary px-4">
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div> <!-- row -->
          </div> <!-- card -->
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: 'Profile',
  data() {
    return {
      isEditing: false,
      profile: {
        image: '',
        username: '',
        email: '',
        recentProject: '',
        mostViewedProject: ''
      },
      defaultImage: 'https://via.placeholder.com/100'
    };
  },
  mounted() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.profile = {
        ...this.profile,
        ...currentUser
      };
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;

          // ✅ Cập nhật ảnh trong `profile`
          this.profile.image = base64;

          // ✅ Lưu vào localStorage để component khác dùng
          localStorage.setItem('globalAvatarImage', base64);

          // ✅ Đồng thời cập nhật lại `currentUser` trong localStorage
          this.profile.image = base64;
          localStorage.setItem('currentUser', JSON.stringify(this.profile));

          // Đồng bộ ảnh với danh sách users
          const users = JSON.parse(localStorage.getItem('users')) || [];
          const index = users.findIndex(u => u.email === this.profile.email);
          if (index !== -1) {
            users[index].image = base64;
            localStorage.setItem('users', JSON.stringify(users));
          }


          // ✅ Gửi sự kiện để các nơi khác biết ảnh đã đổi
          window.dispatchEvent(new Event('avatar-updated'));
        };
        reader.readAsDataURL(file);
      }
    },

    // ✅ Hàm lưu profile khi nhấn "Save Changes"
    saveProfile() {
      // Lưu currentUser (hiện tại đang đăng nhập)
      localStorage.setItem('currentUser', JSON.stringify(this.profile));

      // Đồng bộ vào danh sách users
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const index = users.findIndex(u => u.email === this.profile.email);

      if (index !== -1) {
        users[index] = { ...users[index], ...this.profile };
        localStorage.setItem('users', JSON.stringify(users));
      }

      this.isEditing = false;
    }

  }
};
</script>




<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #f6d365;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  color: white;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  opacity: 0;
  transition: 0.3s ease;
  font-size: 24px;
}

.avatar-wrapper:hover .overlay {
  opacity: 1;
  cursor: pointer;
}
</style>