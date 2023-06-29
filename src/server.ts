import { application } from "express";
import App from "./app";
try {
    const application = new App()
  
} catch (error) {
    console.log(error)
}