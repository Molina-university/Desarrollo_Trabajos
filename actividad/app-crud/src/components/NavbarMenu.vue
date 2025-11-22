<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <span class="logo">🖥️</span>
        <span class="brand-text">PC Components Manager</span>
      </div>

      <button class="navbar-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navbar-nav" :class="{ 'active': menuOpen }">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" @click="closeMenu">
            📊 Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos" class="nav-link" @click="closeMenu">
            🛒 Productos
          </router-link>
        </li>
        <li class="nav-item">
          <span class="nav-user">👤 {{ nombreUsuario }}</span>
        </li>
        <li class="nav-item">
          <a @click="handleLogout" class="nav-link logout-link">
            🚪 Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavbarMenu',
  setup() {
    const router = useRouter();
    const menuOpen = ref(false);
    const nombreUsuario = ref('Usuario');

    const handleLogout = () => {
      if (confirm('¿Estás seguro de cerrar sesión?')) {
        localStorage.removeItem('logueado');
        localStorage.removeItem('usuario');
        router.push('/');
      }
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const closeMenu = () => {
      menuOpen.value = false;
    };

    onMounted(() => {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        try {
          const userData = JSON.parse(usuario);
          nombreUsuario.value = userData.usuario || 'Usuario';
        } catch (e) {
          console.error('Error al parsear usuario:', e);
        }
      }
    });

    return {
      menuOpen,
      nombreUsuario,
      handleLogout,
      toggleMenu,
      closeMenu
    };
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

.logo {
  font-size: 1.5rem;
}

.brand-text {
  display: none;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.navbar-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: 0.15s ease-in-out;
}

.navbar-nav {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: 0.15s ease-in-out;
  cursor: pointer;
  display: block;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-link:hover {
  background-color: rgba(220, 53, 69, 0.3);
}

.nav-user {
  color: white;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

/* Responsive */
@media (min-width: 768px) {
  .brand-text {
    display: inline;
  }
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .navbar-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1.5rem;
    gap: 0.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .navbar-nav.active {
    max-height: 400px;
  }

  .nav-link {
    width: 100%;
    text-align: left;
  }
}
</style>