const template = document.getElementById("card-template");
const contenedor = document.getElementById("contenedor");

const productos = [
  {
    titulo: "Laptop Pro 15”",
    desc: "Procesador Intel i7, 16GB RAM, 512GB SSD. Ideal para trabajo y estudio.",
    precio: "$4.200.000",
    img: "https://fdn.gsmarena.com/imgroot/news/20/06/xiaomi-mi-notebook-15-pro-2020-announced/-1220x526/gsmarena_000.jpg"
  },
  {
    titulo: "Mouse Inalámbrico",
    desc: "Ergonómico, batería recargable, conexión Bluetooth.",
    precio: "$120.000",
    img: "https://m.media-amazon.com/images/I/41CRB81nNQL._UF350,350_QL80_.jpg"
  },
  {
    titulo: "Teclado Mecánico RGB",
    desc: "Switches silenciosos, retroiluminación personalizable.",
    precio: "$250.000",
    img: "https://m.media-amazon.com/images/I/81DdEW1t4eL._UF1000,1000_QL80_.jpg"
  },
  {
    titulo: "Monitor 27” 4K",
    desc: "Resolución UHD, panel IPS, ideal para diseño y gaming.",
    precio: "$1.800.000",
    img: "https://img.global.news.samsung.com/mx/wp-content/uploads/2022/02/Odyssey-Neo-G9_2.jpg"
  },
  {
    titulo: "Auriculares Gaming",
    desc: "Cancelación de ruido, hasta 30h de batería.",
    precio: "$320.000",
    img: "https://ocelot.com.mx/wp-content/uploads/2024/12/PHANTOM-HD-3.jpg"
  },
  {
    titulo: "Tarjeta de video GTX 1660",
    desc: "Rendimiento excepcional para gaming y diseño gráfico.",
    precio: "$1.200.000",
    img: "https://cyberteccr.com/storage/2022/09/Aorus-Geforce-RTX-3090-2.png"
  },
  {
    titulo: "CPU Ryzen 7 7800",
    desc: "Procesador de alto rendimiento para gaming y multitarea.",
    precio: "$320.000",
    img: "https://www.coolmod.com/blog/wp-content/uploads/2024/01/AMD-Ryzen-7-7800X-3D.jpg"
  },
  {
    titulo: "Modem WiFi 6",
    desc: "Conexión ultrarrápida y estable para todos tus dispositivos.",
    precio: "$180.000",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aRvp1DRUy79JBgP5xlKH8yy7DEYGQix9uA&s"
  }
];

// Carrito de compras
let carrito = [];

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  if (!carritoDiv) return;
  carritoDiv.innerHTML = "";
  if (carrito.length === 0) {
    carritoDiv.textContent = "El carrito está vacío.";
    return;
  }
  carrito.forEach((producto, idx) => {
    const item = document.createElement("div");
    item.textContent = `${producto.titulo} - ${producto.precio}`;
    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "Retirar";
    btnQuitar.addEventListener("click", () => {
      retirarProducto(idx);
    });
    item.appendChild(btnQuitar);
    carritoDiv.appendChild(item);
  });
}

// Función para comprar/agregar al carrito
function comprarProducto(producto) {
  carrito.push(producto);
  actualizarCarrito();
  alert(`¡${producto.titulo} agregado al carrito!`);
}

// Función para retirar producto del carrito
function retirarProducto(idx) {
  carrito.splice(idx, 1);
  actualizarCarrito();
}

// Renderizado de productos
productos.forEach(producto => {
  const clon = template.content.cloneNode(true);
  clon.querySelector(".title").textContent = producto.titulo;
  clon.querySelector(".desc").textContent = producto.desc;
  clon.querySelector(".price").textContent = producto.precio;
  clon.querySelector(".product-img").src = producto.img;
  clon.querySelector(".product-img").alt = producto.titulo;
  clon.querySelector(".buy-btn").addEventListener("click", () => {
    comprarProducto(producto);
  });
  contenedor.appendChild(clon);
});

// Inicializar carrito en la vista
actualizarCarrito();