import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar estilos globales (OPCIONAL - puedes eliminar esta línea si no usas global.css)
import './assets/styles/global.css';

const app = createApp(App);

app.use(router);
app.mount('#app');