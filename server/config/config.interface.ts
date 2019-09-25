export interface InterfaceConfig {
    Database: InterfaceDatabase;
    // Cloudinary: InterfaceCloudinary;
    Port: number;
}

export interface InterfaceDatabase {
    DBNAME: string;
    HOST: string;
    PASSWORD: string;
    URL: string;
    USERNAME: string;

}
export const config = {
    PRODUCTION: "production",
    STAGGING: "staging"
};
