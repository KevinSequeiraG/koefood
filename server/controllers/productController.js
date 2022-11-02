const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const products = await prisma.product.findMany({
        orderBy: {
            name: 'asc',
        },
        include: {
            productToRestaurantProduct: true,
        }
    });
    response.json(products);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const product = await prisma.product.findUnique({
        where: { id: id },
        include: {
            ProductToRestaurant: {
                include:{productToRestaurantRestaurant:true}
            },
            productToRestaurantProduct: {
                select: {
                    description: true,
                    id: true,
                }
            }
        },
    });
    response.json(product);
};
//Crear un videojuego
// module.exports.create = async (request, response, next) => {
//   let videojuego = request.body;
//   const newVideojuego = await prisma.videojuego.create({
//     data: {
//       nombre: videojuego.nombre,
//       descripcion: videojuego.descripcion,
//       precio: videojuego.precio,
//       publicar: videojuego.publicar,
//       generos: {
//         //Generos tiene que ser {id:valor}
//         connect: videojuego.generos,
//       },
//     },
//   });
//   response.json(newVideojuego);
// };
// //Actualizar un videojuego
// module.exports.update = async (request, response, next) => {
//   let videojuego = request.body;
//   let idVideojuego = parseInt(request.params.id);
//   //Obtener videojuego viejo
//   const videojuegoViejo = await prisma.videojuego.findUnique({
//     where: { id: idVideojuego },
//     include: {
//       generos: {
//         select:{
//           id:true
//         }
//       }
//     }
//   });

//   const newVideojuego = await prisma.videojuego.update({
//     where: {
//       id: idVideojuego,
//     },
//     data: {
//       nombre: videojuego.nombre,
//       descripcion: videojuego.descripcion,
//       precio: videojuego.precio,
//       publicar: videojuego.publicar,
//       generos: {
//         //Generos tiene que ser {id:valor}
//         disconnect:videojuegoViejo.generos,
//         connect: videojuego.generos,
//       },
//     },
//   });
//   response.json(newVideojuego);
// };
