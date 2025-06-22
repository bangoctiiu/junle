<template>

  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded w-100" style="max-width: 900px; overflow: hidden;">
      <div class="col-md-6 bg-white p-5">
        <h2 class="text-center mb-3 text-warning">Forgot Password</h2>
        <div v-if="step === 'sendEmail'">
          <p class="text-center text-muted mb-4">Enter your email to receive a verification code.</p>
          <form @submit.prevent="sendResetCode">
            <div class="form-group mb-3">
              <label for="email">Email address</label>
              <input v-model="email" id="email" type="email" class="form-control" placeholder="Enter email" required />
            </div>
            <button type="submit" class="btn btn-warning w-100 mb-2" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Code' }}
            </button>
            <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </form>
        </div>
        <div v-else-if="step === 'verifyCode'">
          <p class="text-center text-muted mb-4">We've sent a verification code to your email. Please enter it below.
          </p>
          <p class="text-center text-info mb-4">Verification code (for testing): {{ verificationCode }}</p>
          <form @submit.prevent="verifyCode">
            <div class="form-group mb-3">
              <label for="code">Verification Code</label>
              <input v-model="verificationCodeInput" id="code" type="text" class="form-control" placeholder="Enter code"
                required />
            </div>
            <button type="submit" class="btn btn-success w-100 mb-2">Verify Code</button>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            <div class="text-center mt-3">
              <a href="#" @click.prevent="step = 'sendEmail'">Resend Code</a>
            </div>
          </form>
        </div>
        <div v-else-if="step === 'codeVerified'">
          <h5 class="text-center text-success">Code verified successfully!</h5>
          <form @submit.prevent="resetPassword">
            <div class="form-group mt-3">
              <label for="newPassword">New Password</label>
              <input v-model="newPassword" id="newPassword" type="password" class="form-control" required />
            </div>
            <div class="form-group mt-3">
              <label for="confirmPassword">Confirm Password</label>
              <input v-model="confirmPassword" id="confirmPassword" type="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3">Reset Password</button>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            <div v-if="successMessage" class="alert alert-success mt-3 text-center">
              {{ successMessage }}
              <br />
              <a href="#" @click.prevent="$router.push('/login')" class="btn btn-link mt-2">Login</a>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
        style="background: linear-gradient(135deg, #f7971e, #ffd200);">
        <h4 class="text-center mb-3">Need help?</h4>
        <blockquote class="blockquote text-center">
          <p class="mb-3">"We'll help you recover your account quickly and securely."</p>
          <footer class="blockquote-footer text-white-50">Support Team</footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  data() {
    return {
      email: '',
      verificationCode: '', // Mã xác minh ngẫu nhiên
      verificationCodeInput: '', // Mã nhập từ người dùng
      newPassword: '',
      confirmPassword: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
      step: 'sendEmail'
    };
  },
  mounted() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  },
  methods: {
    sendResetCode() {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(user => user.email === this.email);
      if (!userExists) {
        this.errorMessage = 'This email is not registered.';
        this.loading = false;
        return;
      }
      // Tạo mã xác minh ngẫu nhiên (6 chữ số)
      this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      this.successMessage = `A verification code has been sent to ${this.email}. Check your inbox (code for testing: ${this.verificationCode}).`;
      this.step = 'verifyCode';
      this.loading = false;
    },
    verifyCode() {
      this.errorMessage = '';
      if (this.verificationCodeInput === this.verificationCode) {
        this.step = 'codeVerified';
      } else {
        this.errorMessage = 'Invalid code. Please try again.';
      }
    },
    resetPassword() {
      this.errorMessage = '';
      this.successMessage = '';
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(user => user.email === this.email);
      if (index !== -1) {
        users[index].password = this.newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.email === this.email) {
          currentUser.password = this.newPassword;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.successMessage = 'Password has been reset. You can now login.';
      } else {
        this.errorMessage = 'Something went wrong. Try again.';
      }
    }
  }
};
</script>