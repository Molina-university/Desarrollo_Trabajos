<template>
  <div class="login-container">
    <div class="login-card card-custom">
      <div class="login-header">
        <h2>🖥️ Sistema de Componentes PC</h2>
        <p>Inicia sesión para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input
            id="usuario"
            v-model="form.usuario"
            type="text"
            class="input-custom"
            placeholder="Ingresa tu usuario"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="clave">Contraseña</label>
          <input
            id="clave"
            v-model="form.clave"
            type="password"
            class="input-custom"
            placeholder="Ingresa tu contraseña"
            required
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          class="btn-custom btn-primary"
          :disabled="loading"
        >
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else>Cargando...</span>
        </button>

        <div v-if="error" class="alert-custom alert-danger">
          {{ error }}
        </div>

        <div v-if="loading" class="loading-spinner"></div>
      </form>

      <div class="login-footer">
        <small>Usuarios de prueba: admin / jerson</small>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../servIces/productService';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const form = ref({
      usuario: '',
      clave: ''
    });
    const error = ref('');
    const loading = ref(false);

    const handleLogin = async () => {
      error.value = '';
      
      if (!form.value.usuario.trim() || !form.value.clave.trim()) {
        error.value = 'Por favor completa todos los campos';
        return;
      }

      loading.value = true;

      try {
        const usuarioValido = await loginUser(
          form.value.usuario,
          form.value.clave
        );

        if (usuarioValido) {
          localStorage.setItem('logueado', 'true');
          localStorage.setItem('usuario', JSON.stringify(usuarioValido));
          router.push('/dashboard');
        } else {
          error.value = 'Credenciales incorrectas. Intenta nuevamente.';
        }
      } catch (err) {
        error.value = 'Error al conectar con el servidor. Intenta más tarde.';
        console.error('Error en login:', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      error,
      loading,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-md);
}

.login-card {
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.5s ease-out;
}

.card-custom {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #0d6efd;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #6c757d;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #212529;
}

.input-custom {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;
}

.input-custom:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-custom {
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  font-size: 1rem;
}

.btn-primary {
  width: 100%;
  background-color: #0d6efd;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0b5ed7;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert-custom {
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
}

.loading-spinner {
  border: 3px solid #f8f9fa;
  border-top: 3px solid #0d6efd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>