import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export async function isNotValid(password: string, hash: string): Promise<boolean> {  
    return !await validatePassword(password, hash);
}