import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/modules/users/entities/permission.entity';

export const PERMISSION_KEY = 'PERMISSION_KEY';
export const Permissions = (...per: Permission[]) => SetMetadata(PERMISSION_KEY, per);