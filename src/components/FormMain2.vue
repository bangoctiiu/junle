<template>
  <div>
    <!-- HEADER -->
    <header role="banner" aria-label="Main Navigation">
      <div class="header-left" aria-label="Logo and Brand">
        <span class="material-icons" aria-hidden="true">home</span>
        <span>MySocial</span>
      </div>
      <div class="header-middle" role="search">
        <div class="header-search">
          <input type="search" aria-label="Search social network" placeholder="Search" />
        </div>
      </div>

      <template v-if="!isAuthenticated">
        <router-link to="/register" class="btn btn-outline-primary d-flex align-items-center">
          <span class="material-symbols-outlined me-1">person_add</span> Đăng ký
        </router-link>
        <router-link to="/login" class="btn btn-primary d-flex align-items-center">
          <span class="material-symbols-outlined me-1">login</span> Đăng nhập
        </router-link>
      </template>
      <template v-if="isAuthenticated">
        <router-link to="/forgot-password" class="btn btn-info text-white d-flex align-items-center px-3 py-2 rounded">
          <span class="material-symbols-outlined me-1">lock_reset</span> Đổi mật khẩu
        </router-link>

        <button class="btn-logout d-flex align-items-center" @click="logout">
          <span class="material-symbols-outlined me-1">logout</span> Đăng xuất
        </button>




      </template>


      <div class="header-right" aria-label="Primary Actions">
        <button class="header-icon-btn" aria-label="Notifications" title="Notifications" type="button">
          <span class="material-icons" aria-hidden="true">notifications</span>
        </button>
        <button class="header-icon-btn" aria-label="Messages" title="Messages" type="button">
          <span class="material-icons" aria-hidden="true">email</span>
        </button>
        <button class="header-icon-btn" aria-label="Watch Video" title="Watch Video" type="button">
          <span class="material-icons" aria-hidden="true">smart_display</span>
        </button>

        <router-link to="/profile" class="avatar-button">
          <img :src="avatarImage || defaultAvatar" alt="Profile" width="60" height="60" class="avatar-img" />
        </router-link>





      </div>
    </header>
    <main>
      <!-- Left Sidebar -->
      <aside class="left-sidebar" role="complementary" aria-label="Primary navigation and shortcuts">
        <nav aria-label="Main navigation">
          <ul class="menu-list" role="list">
            <li><a href="#" tabindex="0"><span class="material-icons" aria-hidden="true">article</span>Latest News</a>
            </li>
            <li><a href="#"><span class="material-icons" aria-hidden="true">group</span>Friends</a></li>
            <li><a href="#"><span class="material-icons" aria-hidden="true">groups</span>Group</a></li>
            <li><a href="#"><span class="material-icons" aria-hidden="true">storefront</span>Marketplace</a></li>
            <li><a href="#"><span class="material-icons" aria-hidden="true">ondemand_video</span>Watch</a></li>
          </ul>
          <button class="see-more" aria-label="See more menu items" type="button">See More</button>
        </nav>

        <section class="shortcuts-section" aria-label="Your Shortcuts">
          <h3>Your Shortcuts</h3>
          <div class="shortcut-item" tabindex="0" role="button" aria-pressed="false">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0a72a5bd-f6aa-48cb-9487-d3b65cf23246.png"
              alt="Web Developers group thumbnail" loading="lazy" />
            <span class="shortcut-string">Web Developers</span>
          </div>
          <div class="shortcut-item" tabindex="0" role="button" aria-pressed="false">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fbd49f73-708d-4d0a-a0c8-0d3d057fd52b.png"
              alt="Web Design course group thumbnail" loading="lazy" />
            <span class="shortcut-string">Web Design course</span>
          </div>
          <div class="shortcut-item" tabindex="0" role="button" aria-pressed="false">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6d2c0eab-2e2c-4677-99e2-8b774d500937.png"
              alt="Full Stack Development group thumbnail" loading="lazy" />
            <span class="shortcut-string">Full Stack Development</span>
          </div>
          <div class="shortcut-item" tabindex="0" role="button" aria-pressed="false">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b275aef6-7909-4e3e-8d18-9bb692beab45.png"
              alt="Website Experts group thumbnail" loading="lazy" />
            <span class="shortcut-string">Website Experts</span>
          </div>
        </section>
      </aside>

      <!-- Center Feed -->
      <section class="feed" aria-label="Main feed">
        <!-- Stories -->
        <section aria-label="User stories" class="stories horizontal-scroll" tabindex="0">
          <article class="story-card story-post" tabindex="0" role="button" aria-pressed="false"
            aria-label="Post a new story">
            <span class="material-icons" aria-hidden="true">add</span>
            Post Story
          </article>

          <article class="story-card"
            style="background-image: url('http://statictuoitre.mediacdn.vn/2017/13-1512755474971.jpg');"
            aria-label="Story by Alison">
            <div class="story-layer"></div>
            <img class="story-image"
              src="https://hips.hearstapps.com/hmg-prod/images/alison-hammond-attends-the-launch-of-wahlburgers-uk-debut-news-photo-1141111445-1561107660.jpg?resize=980:*"
              alt="Profile picture of Alison" loading="lazy" />
            <div class="story-name">Alison</div>
          </article>

          <article class="story-card"
            style="background-image: url('https://statictuoitre.mediacdn.vn/thumb_w/730/2017/3-1512755474923.jpg');"
            aria-label="Story by Jackson">
            <div class="story-layer"></div>
            <img class="story-image"
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2949d896-c0c2-4284-92e8-a9bad2de31cd.png"
              alt="Profile picture of Jackson" loading="lazy" />
            <div class="story-name">Jackson</div>
          </article>

          <article class="story-card"
            style="background-image: url('https://statictuoitre.mediacdn.vn/thumb_w/730/2017/7-1512755474943.jpg');"
            aria-label="Story by Samona">
            <div class="story-layer"></div>
            <img class="story-image"
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/19eed509-1b6c-4197-942b-238fbff5c3b2.png"
              alt="Profile picture of Samona" loading="lazy" />
            <div class="story-name">Samona</div>
          </article>

          <article class="story-card"
            style="background-image: url('https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2022/01/10/anh-bia-phong-canh-tuyet-dep-cho-zalo_024636601.jpg');"
            aria-label="Story by John Doe">
            <div class="story-layer"></div>
            <img class="story-image"
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2e321042-73ae-4c49-bbc8-b3b712bd4c33.png"
              alt="Profile picture of John Doe" loading="lazy" />
            <div class="story-name">John Doe</div>
          </article>
        </section>
        <!-- Thanh chia -->
        <hr class="divider" />

        <!-- Nút tùy chọn -->
        <div class="post-actions">
          <button class="post-action-btn">
            <span class="material-icons" style="color: #ec1818;">videocam</span>
            <span>Live Video</span>
          </button>
          <button class="post-action-btn">
            <span class="material-icons" style="color: #4caf50;">photo_camera</span>
            <span>Photo/Video</span>
          </button>
          <button class="post-action-btn">
            <span class="material-icons" style="color: #fbbf24;">sentiment_satisfied</span>
            <span>Feeling/Activity</span>
          </button>
        </div>
        <!-- Post Create -->
        <section class="post-create-card" aria-label="Create a new post">
          <div class="post-header">
            <router-link to="/profile" class="avatar-button">
              <img :src="avatarImage || defaultAvatar" alt="Profile" width="60" height="60" class="avatar-img" />
            </router-link>



            <!-- Nút đăng bài viết -->
            <template v-if="isAuthenticated">
              <button @click="$router.push('/create-post')" class="post-input post-button" type="button">
                <span class="post-placeholder">Đăng bài viết</span>
              </button>
            </template>

          </div>
          <section class="post-list">
            <div v-if="posts.length === 0" class="text-muted mt-3">
              No epic posts yet. Be the first to break the silence! 🦗
            </div>

            <div v-for="(post, index) in posts" :key="post.id" class="post-card border rounded p-3 mb-3 shadow">
              <h5 class="fw-bold">{{ post.title }}</h5>
              <p class="text-muted mb-1">
                Posted by <strong>{{ post.author }}</strong> · {{ post.time }}
              </p>

              <p class="mb-2">{{ post.content }}</p>

              <div v-if="post.image" class="mb-2">
                <img :src="post.image" alt="Post Image" class="img-fluid rounded" />
              </div>

              <div class="mt-3">
                <h6>💬 Comments Zone:</h6>
                <ul v-if="post.comments && post.comments.length" class="list-unstyled">
                  <li v-for="(comment, idx) in post.comments" :key="idx" class="mb-1">
                    <strong>{{ comment.author }}</strong>: {{ comment.content }}<br />
                    <small class="text-muted">{{ comment.time }}</small>
                  </li>
                </ul>

                <div v-if="isAuthenticated" class="d-flex gap-2">
                  <input v-model="newComment[post.id]" @keyup.enter="addComment(post.id)"
                    class="form-control form-control-sm" placeholder="Drop your hot take 💥..." />
                  <button class="btn btn-sm btn-outline-secondary" @click="addComment(post.id)">
                    Send 🚀
                  </button>
                </div>
              </div>
            </div>
          </section>




        </section>


        <!-- Post Card -->
      </section>
      <aside class="right-sidebar">
        <!-- Events Section -->
        <section class="events">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Events</h5>
            <a href="#" class="text-primary small fw-semibold">See All</a>
          </div>
          <div class="event-item d-flex align-items-start gap-3 mb-4">
            <div
              class="event-date text-white text-center rounded d-flex flex-column justify-content-center align-items-center"
              style="background-color: #2d72fc; width: 60px; height: 60px;">
              <div class="fw-bold fs-5">18</div>
              <small>March</small>
            </div>
            <div class="flex-grow-1">
              <div class="fw-semibold">Social Media</div>
              <div class="text-muted small">
                <span class="material-icons text-muted small me-1">location_on</span>Willson Tech Park
              </div>
              <a href="#" class="text-primary small">More Info</a>
            </div>
          </div>

          <div class="event-item d-flex align-items-start gap-3 mb-4">
            <div
              class="event-date text-white text-center rounded d-flex flex-column justify-content-center align-items-center"
              style="background-color: #2d72fc; width: 60px; height: 60px;">
              <div class="fw-bold fs-5">22</div>
              <small>June</small>
            </div>
            <div class="flex-grow-1">
              <div class="fw-semibold">Mobile Marketing</div>
              <div class="text-muted small">
                <span class="material-icons text-muted small me-1">location_on</span>Willson Tech Park
              </div>
              <a href="#" class="text-primary small">More Info</a>
            </div>
          </div>

        </section>
        <!-- Conversations Section -->
        <section class="conversations mt-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Conversation</h5>
            <button class="btn  p-0 small text-primary fw-semibold">Hide Chat</button>
          </div>

          <div class="conversation-item d-flex align-items-center mb-3">
            <div class="position-relative me-3">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/54bbcbbc-8398-4d1e-89c4-f836e5fd4b19.png"
                alt="Alison Mina" class="rounded-circle" width="40" height="40">
              <span class="online-dot bg-success rounded-circle position-absolute bottom-0 end-0 border border-white"
                style="width: 10px; height: 10px;"></span>
            </div>
            <span>Alison Mina</span>
          </div>

          <div class="conversation-item d-flex align-items-center mb-3">
            <div class="position-relative me-3">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e4995ad-db8e-4a37-b583-787242332469.png"
                alt="Jackson Aston" class="rounded-circle" width="40" height="40">
              <span class="online-dot bg-success rounded-circle position-absolute bottom-0 end-0 border border-white"
                style="width: 10px; height: 10px;"></span>
            </div>
            <span>Jackson Aston</span>
          </div>

          <div class="conversation-item d-flex align-items-center mb-3">
            <div class="position-relative me-3">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a918438c-5fb0-4931-a01d-1de667ad4cc0.png"
                alt="Samona Rose" class="rounded-circle" width="40" height="40">
              <span class="online-dot bg-success rounded-circle position-absolute bottom-0 end-0 border border-white"
                style="width: 10px; height: 10px;"></span>
            </div>
            <span>Samona Rose</span>
          </div>
        </section>
      </aside>

    </main>

    <!-- Footer -->
    <footer style="background-color: #2d72fc; color: white; padding: 40px 0; text-align: center;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
          <div style="flex: 1; min-width: 200px; margin: 10px; text-align: left;">
            <h4>About Us</h4>
            <p>Socialbook is a modern social network that connects people around the world. Join us to share your
              stories,
              connect with friends, and discover new interests.</p>
          </div>
          <div style="flex: 1; min-width: 200px; margin: 10px; text-align: left;">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:support@socialbook.com" style="color: white;">support@socialbook.com</a></p>
            <p>Phone: <a href="tel:+1234567890" style="color: white;">+1 (234) 567-890</a></p>
            <p>Address: 123 Social St, City, Country</p>
          </div>
          <div style="flex: 1; min-width: 200px; margin: 10px; text-align: left;">
            <h4>Quick Links</h4>
            <nav>
              <a href="#" style="color: white; display: block; margin: 5px 0;">Privacy Policy</a>
              <a href="#" style="color: white; display: block; margin: 5px 0;">Terms of Service</a>
              <a href="#" style="color: white; display: block; margin: 5px 0;">Help Center</a>
              <a href="#" style="color: white; display: block; margin: 5px 0;">Careers</a>
            </nav>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.3); padding-top: 20px;">
          <p>&copy; 2023 Socialbook. All rights reserved.</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: "FormMain2",
  data() {
    return {
      isAuthenticated: false,
      currentUser: null,
      posts: [],
      newComment: {},
      avatarImage: ''

    };
  },

  mounted() {

    // Đăng nhập
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.isAuthenticated = true;
      this.currentUser = JSON.parse(user);
    } else {
      this.isAuthenticated = false;
      this.currentUser = null;
    }

    // Bài viết
    const saved = localStorage.getItem('socialPosts');
    this.posts = saved ? JSON.parse(saved) : [];

    // Lấy avatar
    this.loadAvatar();

    // 🔁 Nghe sự kiện avatar thay đổi
    window.addEventListener('avatar-updated', this.loadAvatar);
  },

  beforeUnmount() {
    // 🔕 Dọn sự kiện khi component bị huỷ
    window.removeEventListener('avatar-updated', this.loadAvatar);
  },


  methods: {
    loadAvatar() {
      const avatar = localStorage.getItem('globalAvatarImage');
      this.avatarImage = avatar || '';
    },

    addComment(postId) {
      const commentText = this.newComment[postId];
      if (!commentText || !this.currentUser) return;

      const saved = localStorage.getItem('socialPosts');
      const posts = saved ? JSON.parse(saved) : [];

      const index = posts.findIndex(p => p.id === postId);
      if (index !== -1) {
        posts[index].comments.push({
          author: this.currentUser.username,
          content: commentText,
          time: new Date().toLocaleTimeString()
        });
        localStorage.setItem('socialPosts', JSON.stringify(posts));
        this.posts = posts;
        this.newComment[postId] = '';
      }
    },
    logout() {
      // Xoá thông tin người dùng khỏi localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('globalAvatarImage');

      // Điều hướng về trang đăng nhập hoặc trang chủ
      this.$router.push('/login'); // hoặc '/' nếu không có login
    }
  }

};

</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #e8efff;
  color: #20232a;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: inherit;
}

/* nut dang xuat */
.btn-logout {
  background-color: #e53935 !important;
  /* đỏ rõ ràng */
  color: white !important;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-logout:hover {
  background-color: #c62828 !important;
}

/* end dang xuat */

button {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  border: none;
  background: none;
}

.horizontal-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #90a0c0 transparent;
}

.horizontal-scroll::-webkit-scrollbar {
  height: 6px;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  background-color: #90a0c0;
  border-radius: 3px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

main {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 24px;
  padding: 16px 0 80px;
  flex: 1 0 auto;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

header {
  background: #2d72fc;
  padding: 0 16px;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  color: white;
  user-select: none;
  box-shadow: 0 2px 7px rgb(0 0 0 / 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
  font-size: 20px;
}

.header-left .material-icons {
  font-size: 28px;
  font-weight: 900;
}

.header-middle {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-search {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.header-search input {
  width: 100%;
  padding: 8px 48px 8px 16px;
  border-radius: 24px;
  border: none;
  font-size: 14px;
  outline-offset: 2px;
}

.header-search .material-icons {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-btn {
  background: transparent;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  color: white;
}

.header-icon-btn:hover,
.header-icon-btn:focus {
  background: rgb(255 255 255 / 0.15);
  outline: none;
}

.header-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  object-fit: cover;
}

.left-sidebar {
  background: white;
  border-radius: 12px;
  padding: 24px 16px 24px 24px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: fit-content;
  max-height: calc(100vh - 80px);
  position: sticky;
  top: 72px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.menu-list li a {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 600;
  color: #444d63;
  font-size: 15px;
  transition: color 0.3s ease;
}

.menu-list li a:hover,
.menu-list li a:focus {
  color: #2d72fc;
  outline: none;
}

.menu-list li a .material-icons {
  font-size: 22px;
  color: #8e99af;
  flex-shrink: 0;
  min-width: 24px;
}

.see-more {
  font-weight: 600;
  font-size: 13px;
  color: #2d72fc;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;
  width: fit-content;
}

.see-more:hover,
.see-more:focus {
  text-decoration: underline;
  outline: none;
}

.shortcuts-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.shortcuts-section h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #292f45;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 6px;
  transition: background-color 0.3s ease;
}

.shortcut-item:hover,
.shortcut-item:focus {
  background-color: #f5f7fb;
  outline: none;
}

.shortcut-item img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.shortcut-string {
  font-weight: 600;
  color: #232742;
  font-size: 14px;
}

.stories {
  display: flex;
  gap: 16px;
  background: white;
  padding: 16px 16px 12px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.stories::-webkit-scrollbar {
  display: none;
}

.story-card {
  position: relative;
  min-width: 100px;
  height: 180px;
  background-size: cover;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.15);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  user-select: none;
  transition: transform 0.3s ease;
}

.story-card:hover,
.story-card:focus {
  transform: scale(1.1);
  outline: none;
  z-index: 10;
  box-shadow: 0 8px 15px rgb(0 0 0 / 0.25);
}

.story-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 20%, transparent 60%);
  border-radius: 12px;
}

.story-image {
  width: 40px;
  height: 40px;
  border: 3px solid #2d72fc;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background-color: white;
}

.story-name {
  position: relative;
  z-index: 1;
}

.story-post {
  background-color: #f1f3f8;
  border: 2px dashed #a6b0cc;
  color: #3a4a9a;
  font-weight: 700;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #2d72fc;
  cursor: pointer;
  border-radius: 12px;
}

.story-post .material-icons {
  font-size: 36px;
  margin-bottom: 6px;
}

/* responsive */
@media (max-width: 767px) {
  header {
    justify-content: space-between;
  }

  .header-middle,
  .header-right {
    display: none;
  }

  main {
    grid-template-columns: 1fr;
    padding: 12px 16px 60px;
  }

  aside.left-sidebar,
  aside.right-sidebar {
    display: none;
  }
}

.post-create-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.post-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.post-input {
  flex: 1;
  background-color: #f1f3f6;
  border-radius: 999px;
  padding: 12px 20px;
  min-height: 44px;
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: text;
}

.post-input:empty:before {
  content: attr(placeholder);
  color: #888;
  pointer-events: none;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 16px 0 12px;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
}

.post-action-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #444;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.post-action-btn:hover {
  background-color: #f0f2f5;
}

.post-button {
  width: 100%;
  background-color: #2d72fc;
  /* Màu xanh Facebook */
  color: white;
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Căn trái chữ */
  transition: background-color 0.2s ease;
}

.post-button:hover {
  background-color: #1c50c7;
}

.post-placeholder {
  color: white;
}

.right-sidebar {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;
  max-width: 320px;

  height: auto;
  flex-grow: 0;
  align-self: flex-start;
}

.avatar-button {
  display: inline-block;
  border-radius: 50%;
  padding: 3px;
  background-color: #1e73f0;
  /* xanh dương viền */
  transition: transform 0.2s;
}

.avatar-button:hover {
  transform: scale(1.05);
}

.avatar-img {
  border-radius: 50%;
  display: block;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>