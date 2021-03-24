export const GET_PRODUCTS_DETAILS = "GET_PRODUCTS_DETAILS"
export const GET_USER_INFO = "GET_USER_INFO"
export const ADD_POINTS = "ADD_POINTS"
export const REDEEM_USER_HISTORY = "REDEEM_USER_HISTORY"
export const BUY_PRODUCT = "BUY_PRODUCT"
export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRkNDc1MTdlNzE4NzAwMjBlMzhmNzMiLCJpYXQiOjE2MTU2NzcyNjV9.eu2ZM1rCedre8GHEk3JZczRO9mm2iHXS47xOQUO4Esg"

export const getProductsDetails = (products) => {
    return{
        type: GET_PRODUCTS_DETAILS,
        products
    }
}

export const getUserData = (user) => {
    return{
        type: GET_USER_INFO,
        user
    }
}

export const addUserPoints = (points) => {
    return{
        type: ADD_POINTS,
        points
    }
}

export const purchaseProduct = (buy) => {
    return{
        type: BUY_PRODUCT,
        buy
    }
}