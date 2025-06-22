<template>
  
  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded w-100" style="max-width: 900px; overflow: hidden;">
      <!-- Form Register -->
      <div class="col-md-6 bg-white p-5">
        <h2 class="text-center mb-4">Register</h2>
        <p class="text-center text-muted mb-4">Create an account to join our community!</p>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
      </div>
      <!-- Nội dung quảng cáo -->
      <div class="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
           style="background: linear-gradient(135deg, #ff5722, #ffca28);">
        <h4 class="text-center mb-3">Join the Community!</h4>
        <blockquote class="blockquote text-center">
          <p class="mb-3">"Sign up today and unlock amazing features with MySocial."</p>
          <footer class="blockquote-footer text-white-50">MySocial Team</footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === this.email)) {
        alert('Email đã được đăng ký!');
        return;
      }
      users.push({ username: this.username, email: this.email, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      this.$router.push('/login');
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-primary {
  background-color: #ff5722;
  border-color: #ff5722;
  border-radius: 8px;
  padding: 10px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #e64a19;
  border-color: #e64a19;
  transform: translateY(-2px);
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