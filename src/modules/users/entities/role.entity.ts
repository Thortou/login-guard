import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { UserEntity, UserModel } from "./user.entity";
import { PerrmissionEntity, PerrmissionModel } from "./permission.entity";
export type RoleName = 'super-admin' | 'dev' | 'customer' | string;
@Entity({ name: 'roles' })
export class RoleModel {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;
    @Column({ type: 'varchar', length: 150 })
    name!: RoleName;

    @ManyToMany(() => UserModel, (user) => user.roles, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    users: Relation<UserModel[]>

    @ManyToMany(() => PerrmissionModel, (permssion) => permssion.roles)
    @JoinTable({
        name: 'role_to_permission',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
    })
    permissions: Relation<PerrmissionModel[]>

    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn({nullable: true})
    delete_at?: Date;
}


export class RoleEntity {
    id!: number;
    name!: RoleName;
    users: UserEntity[]
    permissions: PerrmissionEntity[]
    create_at!: Date;
    update_at!: Date;
    delete_at?: Date;
}