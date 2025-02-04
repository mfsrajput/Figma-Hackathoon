export interface Product {
    _id: string;
    title: string;
    description: string;
    productImage?:{
        asset: {
            _ref: string;
            _type: "image";
        }
    };
    price: number;
    tags: string[];
    discountPercentage?: number;
    isNew: boolean;
}