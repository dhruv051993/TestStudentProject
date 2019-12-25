import { Product } from './product';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ProductData implements InMemoryDbService {
    createDb() {
        const products: Product[] = [
            {
                id: 1,
                fName: 'Dhruv',
                lName: 'Garg',
                email: 'dhruv.garg05@gmail.com',
                phoneNo: 7830735009,
                status: 'Active',
            }, {
                id: 2,
                fName: 'Saurabh',
                lName: 'Gaumar',
                email: 'saurabh.gaumat@gmail.com',
                phoneNo: 7830735009,
                status: 'InActive',
            }
        ];

        return { products };
    }
}

