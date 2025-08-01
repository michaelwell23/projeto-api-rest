import { Knex } from 'knex';

declare module 'knex/types/tales' {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      type: 'credit' | 'debit';
      created_at: Date;
      session_id?: string;
    };
  }
}
