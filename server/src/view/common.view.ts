import { Response } from "express";

/**
 * View Layer.
 * Provides a set of most common HTTP responses.
 */
export abstract class CommonView {
    static noContent = (res: Response) => res
        .status(204)
        .end();
    
    static notFound = (res: Response) => res
        .status(404)
        .send("Not Found");
    
    static unacceptable = (res: Response, message?: string) => res
        .status(406)
        .send(message ?? "Not Acceptable");
    
    static throwError = (res: Response) => res
        .status(500)
        .send("Internal Server Error");
}