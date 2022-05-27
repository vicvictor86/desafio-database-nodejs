import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AlterVisualizationTransactionService from '../services/AlterVisualizationTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const alterVisualizationTransactionService = new AlterVisualizationTransactionService();

  const transactions = await transactionsRepository.find();  
  const transactionsModified = await alterVisualizationTransactionService.execute(transactions);
  
  const balance = await transactionsRepository.getBalance();

  return response.status(200).json({ transactions : transactionsModified, balance });
});

transactionsRouter.post('/', async (request, response) => {
  try{
    const { type, title, value, category } = request.body;
  
    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({ type, title, value, category });
  
    return response.status(200).json(transaction);
  } catch (err){
    return response.status(400).json({ message: (err as Error).message, status: "error" });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  
  const deleteTransactionService = new DeleteTransactionService();
  const transaction = await deleteTransactionService.execute(id);

  return response.status(200).json(transaction);
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
