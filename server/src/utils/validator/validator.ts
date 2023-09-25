import z from "zod";
import { Request, Response } from "express";
import { CommonView } from "../../view/common.view.js";

/**
 * Validation middleware that helps extracting proper Types from Express Requests.
 * Implements Zod validation
 * @param schema Zod schema for specific route path
 * @param handler Handler endpoint. Usually - Service method
 * @returns 
 */
export const Check = <TBody, TQuery, TParam>(
    schema: {
        body?: z.Schema<TBody>;
        query?: z.Schema<TQuery>;
        param?: z.Schema<TParam>;
    },
    handler: (
        req: Request<TParam, unknown, TBody, TQuery>,
        res: Response
    ) => Response | Promise<Response>
) => (req: Request, res: Response): Promise<Response> | Response => {
    
    // Trying to parse Request with given Zod Schemas
    const paramResult = schema.param?.safeParse(req.params);
    const queryResult = schema.query?.safeParse(req.query);
    const bodyResult = schema.body?.safeParse(req.body);

    // Return 406 if parse fails
    if (paramResult?.success == false)
        return CommonView.unacceptable(res, paramResult?.error.message || "");

    if (queryResult?.success == false)
        return CommonView.unacceptable(res, queryResult?.error.message || "");

    if (bodyResult?.success == false)
        return CommonView.unacceptable(res, bodyResult?.error.message || "");
    
    // Continue executing if all good
    return handler(req as any, res);
};