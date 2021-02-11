import { IsEnum, IsString } from 'class-validator';
import { Action } from '../../../../constants/enums/cart';

export class SetItemInCartDto {
  @IsString()
  mealId: string
}

export class DeleteMealFromCartDto extends SetItemInCartDto{
}

export class ChangeItemInCartDto {
  @IsEnum(Action)
  action: Action
  @IsString()
  mealId: string
}
