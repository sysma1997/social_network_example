export interface UserLoginRepository {
    login(username: string, password: string): Promise<boolean>
}