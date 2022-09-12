Category Schema
    _id: string,
    name: string,
    seoUrl: string,
    img: string
/categories
    GET - Get all categories - (/)
        return all categories
    GET - Get category by id - (/:categoryID)
        return category
    POST - Create a new category - (/)
        create a new category
        body: {Category JSON}
        return the new category
    PUT - Update a category - (/:categoryID)
        update a category
        body: {Category JSON}
        return the updated category
    DELETE - Delete a category - (/:categoryID)
        delete a category
        return the deleted category



Product Schema
    _id: string,
    categoryId: string,
    name: string,
    price: number,
    stock: number,
    description: string,
    img: string
/products
    GET - Get all products - (/)
        return all products
    GET - Get product by id - (/:productID)
        return product
    POST - Create a new product - (/)
        create a new product
        body: {Product JSON}
        return the new product
    PUT - Update a product - (/:productID)
        update a product
        body: {Product JSON}
        return the updated product
    DELETE - Delete a product - (/:productID)
        delete a product
        return the deleted product


User Schema
    _id : string,
    username: string,
    email: string,
    password: string,
    createdDate: date,
    isAdmin: boolean
/users
    POST - Login - (/login)
        login a user
        body: {username, password}
        return {message, _id, email, token, isAdmin}
    POST - Register - (/register)
        register a user
        body: {username, email, password}
        return {
            message : str
            result : UserSchema
    PUT - Update a user - (/:userID)
        update a user
        body: {User JSON}
        return the updated user
    DELETE - Delete a user - (/:userID)
        delete a user
        return the deleted user