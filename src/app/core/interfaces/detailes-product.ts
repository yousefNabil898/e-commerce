
export interface ICategory {
    _id: string;
    name:  string;
    slug: string;
    image?: string;
  }
  
  export interface IBrand {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  }
  
  export interface ISubcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  export interface DetailesProduct {
    sold: number;
    images: string[];
    subcategory: ISubcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    reviews: any[]; // You may want to define a separate interface for reviews if needed
    id: string; // Ensure this matches with `_id` if used consistently
  }
  