export interface UserUpdateImageRepository {
    updateImage(image: File): Promise<boolean>
}