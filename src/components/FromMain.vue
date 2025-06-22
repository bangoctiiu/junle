<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <!-- Header -->
    <header class="app-header sticky-top border-bottom">
      <nav class="container d-flex flex-wrap justify-content-between align-items-center py-3">
        <a href="#" class="app-logo fs-3 fw-bold text-decoration-none">MySocial</a>
        <div class="d-flex align-items-center gap-3">
          <div class="nav-buttons d-flex flex-wrap gap-2">
            <template v-if="!isAuthenticated">
              <router-link to="/register" class="btn btn-outline-primary d-flex align-items-center">
                <span class="material-symbols-outlined me-1">person_add</span> Sign Up
              </router-link>
              <router-link to="/login" class="btn btn-primary d-flex align-items-center">
                <span class="material-symbols-outlined me-1">login</span> Log In
              </router-link>
            </template>
            <template v-else>
              <router-link to="/" class="btn btn-outline-secondary d-flex align-items-center">
                <span class="material-symbols-outlined me-1">arrow_back</span> Back to Feed
              </router-link>
              <router-link to="/forgot-password" class="btn btn-outline-info d-flex align-items-center">
                <span class="material-symbols-outlined me-1">lock_reset</span> Change Password
              </router-link>
              <router-link to="/profile" class="btn btn-outline-success d-flex align-items-center">
                <span class="material-symbols-outlined me-1">account_circle</span> View Profile
              </router-link>
              <button class="btn btn-outline-danger d-flex align-items-center" @click="logout">
                <span class="material-symbols-outlined me-1">logout</span> Log Out
              </button>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow-1 container py-5">
      <!-- Create or Edit Post -->
      <div v-if="isAuthenticated" class="mb-5">
        <h4 class="fw-bold mb-3">{{ editPostId ? 'Editing Post' : 'Create a New Post' }}</h4>
        <input v-model="newPost.title" class="form-control mb-2" placeholder="What's the headline?" />
        <textarea v-model="newPost.content" class="form-control mb-2" rows="3" placeholder="Write something cool..."></textarea>
        <input type="file" class="form-control mb-3" @change="onImageSelected" />
        <button class="btn btn-gradient" @click="submitPost">
          <span class="material-symbols-outlined me-1">{{ editPostId ? 'save' : 'send' }}</span>
          {{ editPostId ? 'Update Post' : 'Post It!' }}
        </button>
      </div>
      <div v-else class="alert alert-warning">
        Please <router-link to="/login">log in</router-link> to share your amazing thoughts.
      </div>

      <!-- Posts List -->
      <section class="posts-list row gy-4">
        <article class="col-12 col-md-6 col-lg-4" v-for="post in posts" :key="post.id">
          <div class="card h-100 shadow-lg glassmorphism">
            <img :src="post.image || 'https://via.placeholder.com/300x200?text=No+Image'" class="card-img-top" :alt="post.title || 'No Image'" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">{{ post.title }}</h5>
              <p class="card-text flex-grow-1">{{ post.content }}</p>
              <small class="text-muted">Posted by {{ post.author }} · {{ post.time }}</small>

              <div class="d-flex justify-content-center gap-2 mt-3">
                <!-- Edit Button -->
                <button class="btn btn-warning d-flex align-items-center gap-1 px-3 py-1 rounded-pill shadow-sm"
                        @click="startEdit(post)" title="Edit this masterpiece">
                  <span class="material-symbols-outlined">edit_square</span>
                  <span>Edit</span>
                </button>

                <!-- Delete Button -->
                <button class="btn btn-danger d-flex align-items-center gap-1 px-3 py-1 rounded-pill shadow-sm"
                        @click="deletePost(post.id)" title="Delete this post forever... RIP">
                  <span class="material-symbols-outlined">delete_forever</span>
                  <span>Delete</span>
                </button>
              </div>

              <!-- Comments -->
              <div class="mt-3">
                <h6>💬 Comments:</h6>
                <ul class="list-unstyled" v-if="post.comments && post.comments.length">
                  <li v-for="(comment, index) in post.comments" :key="index" class="mb-2">
                    <strong>{{ comment.author }}</strong>: {{ comment.content }}
                    <br /><small class="text-muted">{{ comment.time }}</small>
                  </li>
                </ul>
                <div v-if="isAuthenticated" class="d-flex gap-2">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newComment[post.id]"
                    placeholder="Leave a cool comment..."
                    @keyup.enter="addComment(post.id)"
                  />
                  <button class="btn btn-outline-secondary" @click="addComment(post.id)">Send</button>
                </div>
                <div v-else class="alert alert-warning mt-2 p-2 small">
                  Log in to join the conversation! <router-link to="/login">Click here</router-link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>

    <!-- Footer -->
    <footer class="app-footer border-top py-4 mt-auto">
      <div class="container text-center text-muted small">
        © 2025 MySocial. All rights reserved. Built with ☕, 💻 and too many snacks.
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  name: 'FormMain',
  data() {
    return {
      isAuthenticated: false,
      currentUser: null,
      posts: [],
      editPostId: null,
      newPost: {
        title: '',
        content: '',
        image: null,
      },
      newComment: {},
    };
  },
  mounted() {
    this.checkAuth();
    this.loadPosts();
  },
  methods: {
    // ✅ Kiểm tra trạng thái đăng nhập
    checkAuth() {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.isAuthenticated = true;
        this.currentUser = JSON.parse(savedUser);
      } else {
        this.isAuthenticated = false;
        this.currentUser = null;
      }
    },

    // ✅ Đăng xuất
    logout() {
      this.isAuthenticated = false;
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      alert('Đã đăng xuất!');
      this.$router.push('/login');
    },

    // ✅ Chọn ảnh bài viết
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.newPost.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // ✅ Gửi bài viết mới hoặc cập nhật bài đang sửa
    submitPost() {
      if (!this.currentUser) {
        alert('Vui lòng đăng nhập để đăng bài.');
        return;
      }

      if (!this.newPost.title || !this.newPost.content) {
        alert('Vui lòng nhập tiêu đề và nội dung.');
        return;
      }

      const saved = localStorage.getItem('socialPosts');
      const posts = saved ? JSON.parse(saved) : [];

      if (this.editPostId) {
        // ✅ Sửa bài viết
        const index = posts.findIndex(p => p.id === this.editPostId);
        if (index !== -1) {
          posts[index].title = this.newPost.title;
          posts[index].content = this.newPost.content;
          posts[index].image = this.newPost.image;
        }
        this.editPostId = null;
      } else {
        // ✅ Thêm bài viết mới
        const newPostData = {
          id: Date.now(),
          title: this.newPost.title,
          content: this.newPost.content,
          author: this.currentUser.username,
          time: new Date().toLocaleString(),
          image: this.newPost.image,
          comments: [],
        };
        posts.unshift(newPostData);
      }

      // ✅ Lưu lại vào localStorage
  localStorage.setItem('socialPosts', JSON.stringify(posts));

       // Reset và load lại
  this.newPost = { title: '', content: '', image: null };
  this.loadPosts(); // chỉ load
    },

    // ✅ Tải danh sách bài viết từ localStorage
    loadPosts() {
      const saved = localStorage.getItem('socialPosts');
      this.posts = saved ? JSON.parse(saved) : [];
    },

    // ✅ Bắt đầu sửa bài viết
    startEdit(post) {
      this.editPostId = post.id;
      this.newPost = {
        title: post.title,
        content: post.content,
        image: post.image,
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ✅ Xóa bài viết
    deletePost(id) {
      if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        const saved = localStorage.getItem('socialPosts');
        const posts = saved ? JSON.parse(saved) : [];
        const updated = posts.filter(p => p.id !== id);
        localStorage.setItem('socialPosts', JSON.stringify(updated));
        this.loadPosts();
      }
    },

    // ✅ Thêm bình luận
    addComment(postId) {
      const commentText = this.newComment[postId];
      if (!commentText) return;

      const saved = localStorage.getItem('socialPosts');
      const posts = saved ? JSON.parse(saved) : [];
      const index = posts.findIndex(p => p.id === postId);
      if (index !== -1) {
        posts[index].comments.push({
          author: this.currentUser.username,
          content: commentText,
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem('socialPosts', JSON.stringify(posts));
        this.newComment[postId] = '';
        this.loadPosts();
      }
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

.app-container {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  transition: background-color 0.3s ease;
  width: 100%;
  overflow-x: hidden;
}

.app-header {
  background: linear-gradient(135deg, #ffffff, #e0f2ff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1030;
}

.app-logo {
  background: linear-gradient(45deg, #007bff, #00ddeb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  user-select: none;
  transition: transform 0.3s ease;
}

.app-logo:hover {
  transform: scale(1.05);
}

.nav-buttons button.btn,
.nav-buttons a.btn {
  min-width: 120px;
  border-radius: 30px;
  padding: 10px 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-buttons button.btn:hover,
.nav-buttons a.btn:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-2px);
}

.btn-gradient {
  background: linear-gradient(45deg, #007bff, #00ddeb);
  color: white;
  border: none;
  border-radius: 30px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
}

.btn-danger {
  border-radius: 20px;
}

.posts-list .card {
  border: none;
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.posts-list .card:hover {
  transform: scale(1.02);
}

.posts-list .card-title {
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.posts-list .card-text {
  color: #495057;
  line-height: 1.6;
}

.app-footer {
  background: linear-gradient(135deg, #f0f2f5, #ffffff);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 767.98px) {
  .nav-buttons {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  .nav-buttons button.btn,
  .nav-buttons a.btn {
    min-width: 100%;
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
/* Nút sửa và xóa bài viết - đẹp hơn */
.btn-warning, .btn-danger {
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-warning:hover {
  background-color: #f0ad4e;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(240, 173, 78, 0.3);
}

.btn-danger:hover {
  background-color: #d9534f;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(217, 83, 79, 0.3);
}

.btn .material-symbols-outlined {
  font-size: 18px;
}
/*  nút quay lại */
.btn-back {
  background: linear-gradient(135deg, #dee2e6, #f8f9fa); /* xám sáng */
  border: 1px solid #ced4da;
  color: #343a40;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.btn-back:hover {
  background: linear-gradient(135deg, #cfe2ff, #d6e4ff); /* chuyển xanh nhẹ */
  color: #0d6efd;
  border-color: #b6d4fe;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
}

.btn-back .material-symbols-outlined {
  font-size: 20px;
}
/*  hết nút quay lại */

</style>