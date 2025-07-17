import config from "../config/config.js";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)//setEndpoint(...): Sets the base URL of your Appwrite backend.
            //This method is used to tell the Appwrite Client where your Appwrite backend is 
            //running — that is, it sets the base URL for all API requests your app will make.

            .setProject(config.appwriteProjectId);// setProject(...): Sets the project ID for your Appwrite project.
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, coverImg, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    coverImg,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw new Error(`Appwrite service :: createPost :: error ${error}`);
        }
    }

    async updatePost(slug, {content, coverImg}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    content,
                    coverImg,
                }
            )
        } catch (error) {
            throw new Error(`Appwrite service :: updatePost :: error ${error}`);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw new Error(`Appwrite service :: deletePost :: error ${error}`);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw new Error(`Appwrite service :: getPost :: error ${error}`);
        }
    }

    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries ,
            )
        } catch (error) {
           console.log(`Appwrite service :: getPosts :: error ${error}`);
            return false;
        }
    }

    //upload files

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            ); 
        } catch (error) {
            throw new Error(`Appwrite service :: uploadFile :: error ${error}`);
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log(`Appwrite service :: deleteFile :: error ${error}`);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            throw new Error(`Appwrite service :: getFilePreview :: error ${error}`);
        }
    }

}


const service = new Service();
export default service;