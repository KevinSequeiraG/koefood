import { USERTYPE } from "@prisma/client"
export const user = [
    {
        id: 207890254,
        userType: USERTYPE.ADMIN,
        name: 'Erick',
        lastname: 'Rojas',
        email: 'admin@gmail.com',
        password: '12345678',
        idRestaurant: 1
    },
    {
        id: 105820157,
        userType: USERTYPE.WAITER,
        name: 'Kevin',
        lastname: 'Sequeira',
        email: 'waiter1@gmail.com',
        password: '12345678',
        idRestaurant: 1
    },
    {
        id: 106590851,
        userType: USERTYPE.WAITER,
        name: 'Oscar',
        lastname: 'Saborio',
        email: 'waiter2@gmail.com',
        password: '12345678',
        idRestaurant: 2
    },
    {
        id: 109590856,
        userType: USERTYPE.WAITER,
        name: 'Sonia',
        lastname: 'Esquivel',
        email: 'waiter3@gmail.com',
        password: '12345678',
        idRestaurant: 3
    },
    {
        id: 208850224,
        userType: USERTYPE.USER,
        name: 'Vinicio',
        lastname: 'Picado',
        email: 'usuario@gmail.com',
        password: '12345678',
        idRestaurant: 1
    },
    {
        id: 203660124,
        userType: USERTYPE.USER,
        name: 'Steven',
        lastname: 'Garita',
        email: 'usuario2@gmail.com',
        password: '12345678',
        idRestaurant: 2
    },
    {
        id: 208150797,
        userType: USERTYPE.USER,
        name: 'Gabriel',
        lastname: 'Arias',
        email: 'usuario3@gmail.com',
        password: '12345678',
        idRestaurant: 2
    }
]