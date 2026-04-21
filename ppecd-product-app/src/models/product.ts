export interface Product {
    id: number;
    name: string;
    description: string;    
    price: number;
    imageUrl: string;
    productCode: string;
    categoryId: number;
    categoryName: string;
    rowVersion : []
}
