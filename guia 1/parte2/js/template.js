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
    titulo: "Auriculares Bluetooth",
    desc: "Cancelación de ruido, hasta 30h de batería.",
    precio: "$320.000",
    img: "https://andro4all.com/hero/2019/12/Ofertas-en-AirPods.jpg?width=768&aspect_ratio=16:9&format=nowebp"
  }
];

productos.forEach(producto => {
  const clon = template.content.cloneNode(true);
  clon.querySelector(".title").textContent = producto.titulo;
  clon.querySelector(".desc").textContent = producto.desc;
  clon.querySelector(".price").textContent = producto.precio;
  clon.querySelector(".product-img").src = producto.img;
  clon.querySelector(".product-img").alt = producto.titulo;
  clon.querySelector(".buy-btn").addEventListener("click", () => {
    alert(`¡Gracias por tu interés en ${producto.titulo}! Pronto nos pondremos en contacto.`);
  });
  contenedor.appendChild(clon);
});