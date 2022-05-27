import { getRepository } from "typeorm";
import Category from "../models/Category";
import Transaction from "../models/Transaction";

interface Response {
    id: string;

    title: string;

    type: string;

    value: number;
    
    category: Category | undefined;

    category_id?: string;

    created_at: Date;

    updated_at: Date;
}

class AlterVisualizationTransactionService{
    public async execute(transactions: Transaction[]): Promise<Response[]> {
        const categoryRepository = getRepository(Category);
        const categories : Response[] = [];

        for (const transaction of transactions){
            const categoryInstance = await categoryRepository.findOne(transaction.category_id);
            const newCategory: Response = {...transaction, category : categoryInstance};
           
            delete newCategory.category_id;

            categories.push(newCategory);
        }

        return categories;
    }
}

export default AlterVisualizationTransactionService;