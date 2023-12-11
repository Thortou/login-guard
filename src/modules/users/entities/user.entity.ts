import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { RoleEntity, RoleModel } from "./role.entity";
import { ProfileEntity, ProfileModel } from "src/modules/profiles/entities/profile.entity";

@Entity({ name: 'users' })
export class UserModel {
    @PrimaryGeneratedColumn({})
    id: number;
    @Column()
    username: string;
    @Column()
    tel: string;
    @Column()
    gmail: string;
    @Column()
    password: string;

    @OneToOne(() => ProfileModel, (profile) => profile.user, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    profile: Relation<ProfileModel>;

    @ManyToMany(() => RoleModel, (role) => role.users, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'user_to_role',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    })
    roles: Relation<RoleModel[]>

    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn()
    delete_at?: Date;
}

export class UserEntity {
    id: number;
    username: string;
    tel: string;
    gmail: string;
    password: string;
    profile: ProfileEntity;
    roles: RoleEntity[];
    create_at!: Date;
    update_at!: Date;
    delete_at?: Date;
}