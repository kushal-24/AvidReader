import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

/**
basically CLient Account Id and Databases are the main classes built in and have certain properties 
already defined and by using this keyword we can access those properties
 */
export class AuthService{
    client= new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
            .setProject(config.appwriteProjectId); // Your Appwrite Project ID
            this.account = new Account(this.client);
    }

    //this constructor is created to initialize the client and account properties
    //and to connnect to the Appwrite server so it can be connected whenever authService is called


    async createAccount({email, password,name}){
        try {
            const userAccount=await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            );
            if(userAccount){
                //call another method
            }else{
                return userAccount;
            }

        } catch (error) {
            throw new Error(`Error creating account: ${error.message}`);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error getting current user: ${error.message}`);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions("current");//deletes sessions frome everywhere the user has logged in
            //return await this.account.deleteSession("current"); deletes only one session
        } catch (error) {
            console.log(`Error logging out: ${error.message}`);
            throw error;
        }
    }
}

const authService= new AuthService();

export default authService;