import { parse } from 'csv-parse';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  type: "income" | "outcome";

  title: string;

  value: number;

  category: string;

}

class ImportTransactionsService {
  async execute(fileCsv: Express.Multer.File): Promise<Transaction[]> {
    const csvFilePath = path.join(uploadConfig.directory, fileCsv.filename);
    const csvFileExists = await fs.promises.stat(csvFilePath);
    const createTransactionService = new CreateTransactionService();

    if(!csvFileExists){
      throw new AppError('Csv file not found');
    }

    const readCSVStream = fs.createReadStream(csvFilePath);
    const parseStream = parse({ 
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });
    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Request[] = [];
    parseCSV.on('data', line => {
      const title = line[0];
      const type = line[1];
      const value = line[2];
      const category = line[3];      
      lines.push({ title, type, value, category });
    })
    
    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    })

    const transactions: Transaction[] = [];
    for (const line of lines){
      transactions.push(await createTransactionService.execute(line));
    }
    
    return transactions;
  }
}

export default ImportTransactionsService;
