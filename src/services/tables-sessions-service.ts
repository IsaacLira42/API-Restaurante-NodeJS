import { TablesSessionsRepository, CreateTableSessionDTO } from "../repositories/tables-sessions-repository.js";
import { TablesRepository } from "../repositories/tables-repository.js";
import { AppError } from "../utils/AppError.js";

export class TablesSessionsService {
    private tablesSessionsRepository: TablesSessionsRepository;
    private tablesRepository: TablesRepository;

    constructor() {
        this.tablesSessionsRepository = new TablesSessionsRepository();
        this.tablesRepository = new TablesRepository();
    }

    async listAll() {
        return this.tablesSessionsRepository.findAll();
    }

    async create(data: CreateTableSessionDTO) {
        const tableExists = await this.tablesRepository.findById(data.tableId);
        if (!tableExists) {
            throw new AppError("Mesa não encontrada", 404);
        }

        const existingSession = await this.tablesSessionsRepository.findOpenByTableId(data.tableId);
        if (existingSession) {
            throw new AppError("Já existe uma sessão aberta para esta mesa", 400);
        }

        return this.tablesSessionsRepository.create(data);
    }

    async close(id: number) {
        const sessionExists = await this.tablesSessionsRepository.findById(id);
        if (!sessionExists) {
            throw new AppError("Sessão de mesa não encontrada", 404);
        }

        if (sessionExists.closed_at !== null) {
            throw new AppError("Esta sessão de mesa já está fechada", 400);
        }

        return this.tablesSessionsRepository.close(id);
    }
}
