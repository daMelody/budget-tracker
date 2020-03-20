import { Transaction } from '../transaction/transaction';

export class Transfer {
    from: Transaction;
    to: Transaction;

    constructor() {
        this.from = new Transaction();
        this.to = new Transaction();
    }
}
