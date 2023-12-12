import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { RoleEntity, RoleModel } from "./role.entity";

export enum Permission {
    //Permssion Task
    CREATE_TASK = 'create_task',
    UPDATE_TASK = 'update_task',
    READ_TASK = 'read_task',
    DELETE_TASK = 'delete_task',

    //profile
    CREATE_PROFILE = 'create_profile',
    UPDATE_PROFILE = 'update_profile',
    READ_PROFILE = 'read_profile',
    DELETE_PROFILE = 'delete_profile',
    //user

    CREATE_USER = 'create_user',
    UPDATE_USER = 'update_user',
    READ_USER = 'read_user',
    DELETE_USER = 'delete_user'

}
@Entity({ name: 'permission' })
export class PerrmissionModel {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    @Column({ type: 'varchar', length: 150 })
    name: Permission;

    @ManyToMany(() => RoleModel, (role) => role.permissions, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    roles: Relation<RoleModel[]>

    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn({nullable: true})
    delete_at?: Date;
}

export class PerrmissionEntity {
    id: number;
    name: Permission;
    roles: RoleEntity[]
    create_at!: Date;
    update_at!: Date;
    delete_at?: Date;
}