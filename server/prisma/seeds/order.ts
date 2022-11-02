import { ORDERSTATE } from "@prisma/client"
import { PAYMENTTYPE } from "@prisma/client"
export const order = [
    {
        subTotal: 38300,
        iva: 4979,
        clientPaymentInCash: 0,
        clientPaymentInCard: 43279,
        orderTotal: 43279,
        idUser: 208850224,
        idWaiter: 105820157,
        idRestaurant: 1,
        idTable: 1,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 20800,
        iva: 2704,
        clientPaymentInCash: 0,
        clientPaymentInCard: 23504,
        orderTotal: 23504,
        idUser: 203660124,
        idWaiter: 106590851,
        idRestaurant: 1,
        idTable: 2,
        state: ORDERSTATE.TOPAY,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 45000,
        iva: 5850,
        clientPaymentInCash: 0,
        clientPaymentInCard: 50850,
        orderTotal: 50850,
        idUser: 208150797,
        idWaiter: 109590856,
        idRestaurant: 2,
        idTable: 7,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.CARD
    },
    {
        subTotal: 18100,
        iva: 2353,
        clientPaymentInCash: 453,
        clientPaymentInCard: 20000,
        orderTotal: 20453,
        idUser: 208150797,
        idWaiter: 109590856,
        idRestaurant: 3,
        idTable: 13,
        state: ORDERSTATE.REGISTERED,
        paymentOption: PAYMENTTYPE.BOTH
    },
]