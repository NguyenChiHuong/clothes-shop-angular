import { UUID } from "crypto";

export interface Product{
    id:UUID;
    name: string;
    price:Float32Array;
    description:string;
    thumbnail:string;
    url:string;
}