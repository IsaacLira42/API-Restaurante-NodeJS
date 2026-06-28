import { TablesRepository, CreateTableDTO, UpdateTableDTO } from "../repositories/tables-repository.js";
import { AppError } from "../utils/AppError.js";

export class TablesService {
    private tablesRepository: TablesRepository;

    constructor() {
        this.tablesRepository = new TablesRepository();
    }

    async listAll() {
        return this.tablesRepository.findAll();
    }

    async create(data: CreateTableDTO) {
        const existingTable = await this.tablesRepository.findByNumber(data.table_number);
        if (existingTable) {
            throw new AppError(`Já existe uma mesa cadastrada com o número ${data.table_number}`, 400);
        }

        return this.tablesRepository.create(data);
    }

    async update(id: number, data: UpdateTableDTO) {
        const tableExists = await this.tablesRepository.findById(id);
        if (!tableExists) {
            throw new AppError("Mesa não encontrada", 404);
        }

        const duplicateNumberTable = await this.tablesRepository.findAnotherWithNumber(data.table_number, id);
        if (duplicateNumberTable) {
            throw new AppError(`Já existe uma mesa com o número ${data.table_number}`, 400);
        }

        return this.tablesRepository.update(id, data);
    }

    async remove(id: number) {
        const tableExists = await this.tablesRepository.findById(id);
        if (!tableExists) {
            throw new AppError("Mesa não encontrada", 404);
        }

        return this.tablesRepository.delete(id);
    }
}
