import { UserEntity, UserModel } from "../../../modules/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

@Entity({name: 'profiles'})
export class ProfileModel {
    @PrimaryGeneratedColumn({unsigned: true})
    id!: number;
    @Column({nullable: true})
    first_name?: string;
    @Column({nullable: true})
    last_name?: string;
    @Column({nullable: true})
    gender?: string;
    @Column({nullable: true})
    dob?: Date;
    @Column({ nullable: true })
    user_id?: number;
  
    @OneToOne(() => UserModel, (user) => user.profile, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    })
    @JoinColumn({ name: 'user_id' })
    user?: Relation<UserModel>;

    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn({nullable: true})
    delete_at?: Date;
}
export class ProfileEntity {
    id!: number;
    first_name?: string;
    last_name?: string;
    gender?: string;
    dob?: Date;
    user?: UserEntity;
    create_at!: Date;
    update_at!: Date;
    delete_at?: Date;
}