import { UserInformation } from './user-info';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class UserData implements InMemoryDbService {
    createDb() {
        const userData: UserInformation[] = [
            {
                id: 1,
                fName: 'Dhruv',
                lName: 'Garg',
                email: 'dhruv.garg05@gmail.com',
                phoneNo: 7830735009,
                status: 'active',
            }, {
                id: 2,
                fName: 'Saurabh',
                lName: 'Gaumat',
                email: 'shgaumat@gmail.com',
                phoneNo: 7830735009,
                status: 'inactive',
            }
        ];
        return { userData };
    }
}

