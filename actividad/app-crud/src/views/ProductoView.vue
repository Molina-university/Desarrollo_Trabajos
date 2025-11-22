<template>
  <div class="productos-container">
    <div class="container-custom">
      <div class="productos-header">
        <h2>🖥️ Gestión de Componentes de PC</h2>
        <p>Administra tu inventario de hardware</p>
      </div>

      <!-- Formulario de agregar/editar -->
      <div class="card-custom">
        <h4>{{ editando ? 'Editar' : 'Agregar' }} Componente</h4>
        
        <form @submit.prevent="guardarProducto" class="producto-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre del Componente</label>
              <input
                v-model="form.nombre"
                type="text"
                class="input-custom"
                placeholder="Ej: Intel Core i7-13700K"
                required
              />
            </div>

            <div class="form-group">
              <label>Categoría</label>
              <select v-model="form.categoria" class="input-custom" required>
                <option value="">Seleccionar...</option>
                <option value="Procesador">Procesador</option>
                <option value="Tarjeta Gráfica">Tarjeta Gráfica</option>
                <option value="Memoria RAM">Memoria RAM</option>
                <option value="Almacenamiento">Almacenamiento</option>
                <option value="Placa Madre">Placa Madre</option>
                <option value="Fuente de Poder">Fuente de Poder</option>
                <option value="Gabinete">Gabinete</option>
                <option value="Refrigeración">Refrigeración</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Precio (USD)</label>
              <input
                v-model.number="form.precio"
                type="number"
                step="0.01"
                class="input-custom"
                placeholder="299.99"
                required
              />
            </div>

            <div class="form-group">
              <label>Stock</label>
              <input
                v-model.number="form.stock"
                type="number"
                class="input-custom"
                placeholder="15"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Descripción</label>
            <textarea
              v-model="form.descripcion"
              class="input-custom"
              rows="3"
              placeholder="Características del componente..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-custom btn-success" :disabled="loading">
              {{ editando ? '💾 Actualizar' : '➕ Agregar' }} Componente
            </button>
            <button
              v-if="editando"
              type="button"
              class="btn-custom btn-secondary"
              @click="cancelarEdicion"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Mensajes -->
      <div v-if="mensaje" class="alert-custom alert-success">
        {{ mensaje }}
      </div>

      <div v-if="error" class="alert-custom alert-danger">
        {{ error }}
      </div>

      <!-- Tabla de productos -->
      <div class="card-custom">
        <h4>📦 Inventario Actual</h4>
        
        <div v-if="loading" class="loading-spinner"></div>

        <div v-else-if="productos.length === 0" class="empty-state">
          <p>No hay componentes en el inventario</p>
          <small>Agrega el primer componente usando el formulario</small>
        </div>

        <table v-else class="table-custom">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td><strong>{{ producto.nombre }}</strong></td>
              <td>
                <span class="badge" :class="getBadgeClass(producto.categoria)">
                  {{ producto.categoria }}
                </span>
              </td>
              <td>${{ producto.precio.toFixed(2) }}</td>
              <td>
                <span :class="{'stock-bajo': producto.stock < 5}">
                  {{ producto.stock }} unidades
                </span>
              </td>
              <td>{{ producto.descripcion || 'Sin descripción' }}</td>
              <td class="actions">
                <button
                  @click="editarProducto(producto)"
                  class="btn-custom btn-info btn-sm"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  @click="confirmarEliminar(producto)"
                  class="btn-custom btn-danger btn-sm"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../servIces/productService';

export default {
  name: 'ProductoView',
  setup() {
    const productos = ref([]);
    const form = ref({
      nombre: '',
      categoria: '',
      precio: null,
      stock: null,
      descripcion: ''
    });
    const editando = ref(false);
    const productoEditando = ref(null);
    const loading = ref(false);
    const mensaje = ref('');
    const error = ref('');

    const cargarProductos = async () => {
      loading.value = true;
      error.value = '';
      
      try {
        productos.value = await getAllProducts();
      } catch (err) {
        error.value = 'Error al cargar los productos';
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    const guardarProducto = async () => {
      mensaje.value = '';
      error.value = '';
      loading.value = true;

      try {
        if (editando.value) {
          await updateProduct(productoEditando.value.id, form.value);
          mensaje.value = 'Componente actualizado exitosamente';
        } else {
          await createProduct(form.value);
          mensaje.value = 'Componente agregado exitosamente';
        }

        await cargarProductos();
        limpiarFormulario();
        
        setTimeout(() => {
          mensaje.value = '';
        }, 3000);
      } catch (err) {
        error.value = 'Error al guardar el componente';
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    const editarProducto = (producto) => {
      editando.value = true;
      productoEditando.value = producto;
      form.value = {
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        stock: producto.stock,
        descripcion: producto.descripcion || ''
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
      limpiarFormulario();
    };

    const confirmarEliminar = async (producto) => {
      if (confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
        await eliminarProducto(producto.id);
      }
    };

    const eliminarProducto = async (id) => {
      loading.value = true;
      error.value = '';

      try {
        await deleteProduct(id);
        mensaje.value = 'Componente eliminado exitosamente';
        await cargarProductos();
        
        setTimeout(() => {
          mensaje.value = '';
        }, 3000);
      } catch (err) {
        error.value = 'Error al eliminar el componente';
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    const limpiarFormulario = () => {
      form.value = {
        nombre: '',
        categoria: '',
        precio: null,
        stock: null,
        descripcion: ''
      };
      editando.value = false;
      productoEditando.value = null;
    };

    const getBadgeClass = (categoria) => {
      const classes = {
        'Procesador': 'badge-primary',
        'Tarjeta Gráfica': 'badge-success',
        'Memoria RAM': 'badge-info',
        'Almacenamiento': 'badge-warning',
        'Placa Madre': 'badge-danger',
        'Fuente de Poder': 'badge-secondary',
        'Gabinete': 'badge-dark',
        'Refrigeración': 'badge-light'
      };
      return classes[categoria] || 'badge-secondary';
    };

    onMounted(() => {
      cargarProductos();
    });

    return {
      productos,
      form,
      editando,
      productoEditando,
      loading,
      mensaje,
      error,
      cargarProductos,
      guardarProducto,
      editarProducto,
      cancelarEdicion,
      confirmarEliminar,
      getBadgeClass
    };
  }
};
</script>

<style scoped>
.productos-container {
  padding: 2rem 0;
  min-height: 100vh;
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.card-custom {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.productos-header {
  text-align: center;
  margin-bottom: 2rem;
}

.productos-header h2 {
  color: #0d6efd;
  margin-bottom: 0.5rem;
}

.productos-header p {
  color: #6c757d;
}

.producto-form {
  margin-top: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
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

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
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

.btn-success {
  background-color: #198754;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #157347;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-info {
  background-color: #0dcaf0;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.alert-custom {
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
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

.table-custom {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.table-custom thead {
  background-color: #0d6efd;
  color: white;
}

.table-custom th,
.table-custom td {
  padding: 1rem;
  text-align: left;
}

.table-custom tbody tr {
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.15s ease-in-out;
}

.table-custom tbody tr:hover {
  background-color: #f8f9fa;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-primary { background-color: #cfe2ff; color: #084298; }
.badge-success { background-color: #d1e7dd; color: #0f5132; }
.badge-info { background-color: #cff4fc; color: #055160; }
.badge-warning { background-color: #fff3cd; color: #664d03; }
.badge-danger { background-color: #f8d7da; color: #842029; }
.badge-secondary { background-color: #e2e3e5; color: #41464b; }
.badge-dark { background-color: #ced4da; color: #212529; }
.badge-light { background-color: #f8f9fa; color: #6c757d; border: 1px solid #dee2e6; }

.stock-bajo {
  color: #dc3545;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>