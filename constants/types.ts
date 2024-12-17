  export interface Package {
    id: number;
    image: string;
    title: string;
    price: number;
    sold: number;
    quantity: number;
    rating: number;
    oldPrice?: number;
    isBookmarked?: boolean;
    isFreeShipping?: boolean;
    offerLabel?: string;
    discount?: string;
    offerLabelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  }