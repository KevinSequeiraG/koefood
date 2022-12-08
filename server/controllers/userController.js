const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { USERTYPE } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      userRestaurant: true,
    },
  });
  response.json(users);
};

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.password, salt);
  const user = await prisma.user.create({
    data: {
      id: userData.id,
      userType: USERTYPE.USER,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      password: hash,
      state: true,
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

//Crear nuevo usuario
module.exports.registerByAdmin = async (request, response, next) => {
  const userData = request.body;
  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.password, salt);
  const user = await prisma.user.create({
    data: {
      id: userData.id,
      userType: userData.userType,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      password: hash,
      idRestaurant: userData.idRestaurant,
      state: true,
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.user.findUnique({
    where: {
      email: userReq.email,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
    return
  }
  if (user.state == false) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
    return;
  }

  if (user && userReq.password) {
    //Verifica la contraseña
    const checkPassword = bcrypt.compareSync(userReq.password, user.password);
    if (checkPassword) {
      //Si el usuario es correcto: email y password
      //Crear el token
      const payload = {
        email: user.email,
        userType: user.userType,
      };
      //Crea el token con el payload, llave secreta
      // y el tiempo de expiración
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        data: {
          user,
          token,
        },
      });
    } else {
      response.status(402).send({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
  }
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { userRestaurant: true },
  });
  response.json(user);
};

module.exports.delete = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const user = await prisma.user.delete({
    where: { id: id },
  });
  response.json(user);
};

//Obtener por Id
module.exports.getByEmail = async (request, response, next) => {
  let email = request.params.id;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  response.json(user);
};

//Actualizar una mesa
module.exports.update = async (request, response, next) => {
  let userData = request.body;
  let idUser = parseInt(request.params.id);
  //Obtener videojuego viejo
  // const restaurantTableViejo = await prisma.restaurantTable.findUnique({
  //     where: { id: idRestaurantTable }
  // });

  const newUser = await prisma.user.update({
    where: {
      id: idUser,
    },
    data: {
      //id: userData.id,
      userType: userData.userType,
      name: userData.name,
      lastname: userData.lastname,
      //email: userData.email,
      //password: hash,
      idRestaurant: userData.idRestaurant,
    },
  });
  response.json(newUser);
};

module.exports.updateStateSetActive = async (request, response, next) => {
  let idUser = parseInt(request.params.id);

  const newUser = await prisma.user.update({
    where: {
      id: idUser,
    },
    data: {
      state: true,
    },
  });
  response.json(newUser);
};

module.exports.updateStateSetInactive = async (request, response, next) => {
  let idUser = parseInt(request.params.id);

  const newUser = await prisma.user.update({
    where: {
      id: idUser,
    },
    data: {
      state: false,
    },
  });
  response.json(newUser);
};
