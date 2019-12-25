import { Product } from './product';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ProductData implements InMemoryDbService {
    createDb() {
        const products: Product[] = [
            {
                id: 1,
                name: 'Scissors',
                description: 'coming soon',
                price: 4.99
            }, {
                id: 2,
                name: 'Steak Knives',
                description: 'coming soon',
                price: 10.99
            }
        ];

        return { products };
    }
}

