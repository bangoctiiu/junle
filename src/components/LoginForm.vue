<template>
  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded w-100" style="max-width: 900px; overflow: hidden;">
      <!-- Login Form -->
      <div class="col-md-6 bg-white p-5">
        <h2 class="text-center mb-4">Welcome Back 👋</h2>
        <p class="text-center text-muted mb-4">
          Ready to take over the dashboard? Enter your email and secret code.
        </p>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="you@awesome.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Let Me In 🚪
          </button>
          <div class="text-center mt-3">
            <router-link to="/forgot-password">Oops, I forgot my password 🤯</router-link>
          </div>
          <div class="text-center mt-2">
            <router-link to="/register" class="text-primary">
              No account yet? Join the crew here 🚀
            </router-link>
          </div>
        </form>
      </div>

      <!-- Right banner -->
      <div
        class="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
        style="background: linear-gradient(135deg, #6a1b9a, #00bcd4);"
      >
        <h4 class="text-center mb-3">You're just one login away from awesomeness ✨</h4>
        <blockquote class="blockquote text-center">
          <p class="mb-3">
            "Honestly, logging in here changed my life. Highly recommended!"
          </p>
          <footer class="blockquote-footer text-white-50">— A Very Happy Admin</footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === this.email && u.password === this.password);

      if (user) {
        const oldData = JSON.parse(localStorage.getItem('currentUser')) || {};

        const userData = {
          username: user.username,
          email: user.email,
          avatar: user.avatar || oldData.avatar || '',
          recentProject: oldData.recentProject || '',
          mostViewedProject: oldData.mostViewedProject || ''
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        window.location.href = '/';
      } else {
        alert('Đăng nhập thất bại! Kiểm tra lại email và mật khẩu.');
      }
    }
  }
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 0;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 8px;
  padding: 10px;
  font-weight: 500;
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

@media (max-width: 767.98px) {
  .col-md-6:nth-child(2) {
    display: none;
  }
  .col-md-6:first-child {
    width: 100%;
  }
}
</style>
