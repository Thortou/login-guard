import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { UserEntity, UserModel } from "./user.entity";
import { PerrmissionModel } from "./permission.entity";

@Entity({ name: 'roles' })
export class RoleModel {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    @Column({ type: 'varchar', length: 150 })
    name: string;

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
    @DeleteDateColumn()
    delete_at?: Date;
}


export class RoleEntity {
    id: number;
    name: string;
    users: UserEntity[]
    permissions: PerrmissionModel[]
    create_at!: Date;
    update_at!: Date;
    delete_at?: Date;
}