const login = async ({ email, password}) => {
    console.log(`login user in user repository ${email}`);
}

const register = async ({ email, password, name, phoneNumber, address }) => {
    console.log(`register success user in user repository ${email}`);
}

export default {
    login, register
}