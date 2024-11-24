import bcrypt from 'bcrypt'

export class BcryptService {

    static async hashPassword(password: string) {
        const SALT_ROUNDS: number = 10
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    static async verifyPassword(passwordTextPlane: string, hashDB: string) {
        const isMatch = await bcrypt.compare(passwordTextPlane, hashDB)
        return isMatch
    }
}

export const hashPassword = async (contrasenia: string) => {
    const password = contrasenia
    const hash = await BcryptService.hashPassword(password)
    return hash
}

export const verifyPassword = async (contrasenia: string, hash: string) => {
    const isMatch = await BcryptService.verifyPassword(contrasenia, hash)
    return isMatch
}