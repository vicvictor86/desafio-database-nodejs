// import AppError from '../errors/AppError';

import { getCustomRepository  } from "typeorm";
import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository";

class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne(id);

    if(!transaction){
      throw new Error("Transaction not found");
    }

    await transactionRepository.delete(id);

    return transaction;
  }
}

export default DeleteTransactionService;
