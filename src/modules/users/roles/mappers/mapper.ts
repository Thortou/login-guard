export interface IMapperDto<Entity, Dto> {
    toEntity(dto: Dto): Entity;
  }