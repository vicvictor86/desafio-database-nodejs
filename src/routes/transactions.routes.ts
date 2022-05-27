import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import multer from 'multer';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AlterVisualizationTransactionService from '../services/AlterVisualizationTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

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

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const fileCsv = request.file;
  const importTransactionService = new ImportTransactionsService();

  const transactions = await importTransactionService.execute(fileCsv);

  response.status(200).json(transactions);
});

export default transactionsRouter;
