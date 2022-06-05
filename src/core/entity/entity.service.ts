import { BaseEntity } from "./base.entity";
import { BaseRepository } from "./entity.repository";
import { FindConditions, FindManyOptions, FindOneOptions, SaveOptions } from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { EntityUtils } from "./entity.utils";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { NotFoundException } from "@nestjs/common";
import { IPaginatedResponse, IStatusResponse, IQueryOptions, IQueryError } from "./interfaces";
import { Operation } from "./entity.enums";
import { EntityErrors } from "./entity.error.responses";
import { relations } from "../config";
import { User } from "../../modules/user/entities";

// noinspection JSUnusedGlobalSymbols
export abstract class EntityService<Entity extends BaseEntity> {
    protected constructor(
        protected readonly repository: BaseRepository<Entity>,
        protected readonly entityName: string,
        protected readonly uniqueFieldName?: string,
    ) {}

    // abstract map(entity: Entity): Entity;

    async create<T extends DeepPartial<Entity>>(
        createDto: T,
        options?: SaveOptions,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<Entity> {
        try {
            const entity = await this.repository.save(createDto, options);
            return this.get(entity.id);
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (err) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async createMany<T extends DeepPartial<Entity>>(
        createDto: T[],
        options?: SaveOptions,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<Entity[]> {
        try {
            return await this.repository.saveMany(createDto, options);
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async update<T extends QueryDeepPartialEntity<Entity>>(
        id: number,
        updateDto: T,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = await this.repository.update(id, updateDto);
            if (affected !== 0) {
                return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async updateOne<T extends QueryDeepPartialEntity<Entity>>(
        conditions: FindConditions<Entity>,
        updateDto: T,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = await this.repository.updateOne(conditions, updateDto);
            if (affected !== 0) {
                return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async updateMany<T extends QueryDeepPartialEntity<Entity>>(
        conditions: FindConditions<Entity>,
        updateDto: T,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = await this.repository.updateMany(conditions, updateDto);
            if (affected !== 0) {
                return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
            }
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async updateByIds<T extends QueryDeepPartialEntity<Entity>>(
        ids: number[],
        updateDto: T,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = await this.repository.updateByIds(ids, updateDto);
            if (affected !== 0) {
                return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
            }
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async get(id: number, options?: FindOneOptions<Entity>, eh?: (err: any) => Error | void): Promise<Entity> {
        try {
            const entity = await this.repository.get(id, options);
            if (entity) {
                return entity;
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async getOne(
        where: FindOneOptions<Entity>["where"],
        options?: FindOneOptions<Entity>,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<Entity> {
        try {
            const entity = await this.repository.getOne(where, { relations, ...options });
            if (entity) {
                return entity;
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async getMany(
        where: FindOneOptions<Entity>["where"],
        queryOptions?: IQueryOptions<Entity>,
        options?: FindManyOptions<Entity>,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IPaginatedResponse<Entity>> {
        try {
            let [data, rowCount] = await this.repository.getMany(where, queryOptions, { relations, ...options });
            return { data, rowCount };
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    getWithoutPagination(
        where: FindOneOptions<Entity>["where"],
        options?: FindOneOptions<Entity>,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<Entity[]> {
        try {
            return this.repository.find({ ...options, where });
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async getAll(
        queryOptions?: IQueryOptions<Entity>,
        options?: FindOneOptions<Entity>,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IPaginatedResponse<Entity>> {
        try {
            let [data, rowCount] = await this.repository.getMany({}, queryOptions, { relations, ...options });
            return { data, rowCount };
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async delete(
        id: number,
        deletedBy: User,
        wipe?: boolean,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = wipe ? await this.repository.hardDelete(id) : await this.repository.delete(id);
            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    await this.update(id, { deletedBy } as any);
                }
                return EntityUtils.handleSuccess(Operation.DELETE, this.entityName);
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async deleteByIds(
        ids: number[],
        deletedBy?: User,
        wipe?: boolean,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        try {
            const { affected } = wipe
                ? await this.repository.hardDeleteByIds(ids)
                : await this.repository.deleteByIds(ids);
            if (affected !== 0) {
                if (!wipe && deletedBy) {
                    await this.updateByIds(ids, { deletedBy } as any);
                }
                return EntityUtils.handleSuccess(Operation.DELETE, this.entityName);
            }
            return Promise.reject(new NotFoundException(EntityErrors.E_404_ID(this.entityName)));
        } catch (e: any) {
            if (eh) {
                const err = eh(e);
                if (e) {
                    throw err;
                }
            }
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }
}
