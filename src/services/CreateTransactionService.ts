// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request{
  type: "income" | "outcome";
  title: string;
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({ type, title, value, category }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if(type === 'outcome' && total - value < 0){
      throw new Error('Invalid transaction, balance negative');
    }

    let categoryInstance = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });
    
    if(!categoryInstance){
      categoryInstance = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryInstance);
    }

    const transaction = transactionsRepository.create({
      title,
      category_id: categoryInstance.id,
      type,
      value,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
