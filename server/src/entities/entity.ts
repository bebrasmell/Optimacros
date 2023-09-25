import { Model, Schema, model, connect } from "mongoose";
import { Deconstructor, Keys } from "utils/types/type.utils.js";
import { Id } from "./entity.z.js";

// Exclude this fields so nothing could modify them
const EXCLUDED_FIELDS = ["id", "_id", "__v"];

/**
 * Adapter layer which performs DB transactions
 */
export class Entity<EType extends { id: Id }> {

    /**
     * Connects to a **database** with specified __params__
     * @public Entity.connect
     * @param params host, port, name
     * @returns Mongoose
     */
    static connect(params: {
        host: string,
        port: number,
        name: string
    }) {
        return connect(`mongodb://${params.host}:${params.port}/${params.port}`);
    }
    
    /**
     * @private
     * Stores MongoDB model
    */
    #model: Model<EType>;

    /**
     * Entity constructor
     * @param collection Collection name
     * @param schema MongoDB schema
     */
    constructor(
        public readonly collection: string,
        private readonly schema: Schema<EType>
        ) {
        this.#model = model<EType>(this.collection, this.schema);
    }

    /**
     * Creates Document with defined **Model**
     * @param data Document to create
     * @returns Saved document
     */
    async create(data: Omit<EType, "id">): Promise<EType> {
        const ref = new this.#model(data);
        this.#model.create(ref);

        console.log(`🗳️ Created new ${this.#model.collection.name}:`, ref.id);
        return ref;
    }
    /**
     * Lists Documents in specified order
     * @param sort Field to sort by (optional)
     * @returns List of Documents
     */
    async list(sort?: Keys<EType>): Promise<EType[]> {
        if (!sort) return this.#model.find().exec();
        
        return this.#model.find().sort(sort as string).exec();
    }
    /**
     * Read Document by ID
     * @param id
     * @returns Document
     */
    async read(id: Id): Promise<EType | undefined> {
        return await this.#model.findById(id) ?? undefined;
    }
    /**
     * Updates specified fields
     * @param ref Document to be updated
     * @param data Changes to make
     * @returns Updated Document
     */
    async update(ref: EType, data: Partial<EType>): Promise<true> {
        const update_ref = Object.entries(data) as Deconstructor<EType>;
        const fields = update_ref.filter(([key]) => !EXCLUDED_FIELDS.includes(key as string));
        const update: any = {};

        for (const [key, value] of fields) {
            if (ref[key] !== value) {
                update[key] = value;
                ref[key] = value;
            }
        }
        const keys = Object.keys(update);
        if (keys.length === 0) return true;

        await this.#model.updateOne({ _id: ref.id }, update).exec();
        console.log(`🗳️ Updating ${this.#model.collection.name} ${ref.id}:`, keys.join(','));
        return true;
    }
    /**
     * Deletes a Document
     * @param ref Document to be deleted
     * @returns true or never
     */
    async delete(ref: EType): Promise<true> {
        await this.#model.deleteOne({ _id: ref.id }).exec();
        console.log(`🗑️ Deleted ${this.#model.collection.name} ${ref.id}`);
        return true;
    }
}