import {
    DeleteResult,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    In,
    ObjectLiteral,
    Repository,
    SaveOptions,
} from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { IQueryOptions } from "./interfaces";
import { BaseEntity } from "./base.entity";

export class BaseRepository<Entity extends BaseEntity & ObjectLiteral> extends Repository<Entity> {
    save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity> {
        return super.save(entity, options);
    }

    saveMany<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]> {
        return super.save(entities, options);
    }

    update(id: number, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return super.update(id, partialEntity);
    }

    updateOne(
        conditions: FindConditions<Entity>,
        partialEntity: QueryDeepPartialEntity<Entity>,
    ): Promise<UpdateResult> {
        return super.update(conditions, partialEntity);
    }

    updateMany(
        findConditions: FindConditions<Entity>,
        partialEntity: QueryDeepPartialEntity<Entity>,
    ): Promise<UpdateResult> {
        return super.update(findConditions, partialEntity);
    }

    updateByIds(ids: number[], partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        return this.updateMany({ id: In(ids) as any }, partialEntity);
    }

    get(id: number, options: FindOneOptions): Promise<Entity | undefined> {
        return super.findOne(id, options);
    }

    getOne(where: FindOneOptions<Entity>["where"], options: FindOneOptions<Entity>): Promise<Entity | undefined> {
        return super.findOne({ ...options, where });
    }

    getByIds(
        ids: number[],
        queryOptions?: IQueryOptions<Entity>,
        options?: FindManyOptions<Entity>,
    ): Promise<[Entity[], number]> {
        return super.findAndCount({ where: In(ids), ...options, ...queryOptions });
    }

    getMany(
        where: FindOneOptions<Entity>["where"],
        queryOptions?: IQueryOptions<Entity>,
        options?: FindManyOptions<Entity>,
    ): Promise<[Entity[], number]> {
        return super.findAndCount({ ...options, where, ...queryOptions });
    }

    delete(id: number): Promise<DeleteResult> {
        return super.softDelete(id);
    }

    deleteByIds(ids: number[]): Promise<DeleteResult> {
        return super.softDelete(ids);
    }

    hardDelete(id: number): Promise<DeleteResult> {
        return super.delete(id);
    }

    hardDeleteByIds(ids: number[]): Promise<DeleteResult> {
        return super.delete(ids);
    }
}
