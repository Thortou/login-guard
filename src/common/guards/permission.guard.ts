import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/users/user.service';
import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { Permission } from 'src/modules/users/entities/permission.entity';
import { UserModel } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private _reflector: Reflector, private readonly userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this._reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest<{ user: UserModel }>();
    const { id } = user;

    
    // Customize the output format
    const dataUser = await this.userService.findOne(id)
    if (!dataUser) throw new NotFoundException();

    if (
      dataUser.roles.some((role) => role.name === 'super-admin')
    )
      return true;
    return requiredPermissions.some((permission) =>
      dataUser.roles?.some((role) =>
        role.permissions.some((per) => per.name === permission),
      ),
    );
  }
} 