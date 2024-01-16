import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class AddShoppingPreferenceDto {
    @ApiProperty({ example: [1, 2, 3], description: 'Array of shopping preference ids' })
    @IsArray()
    @IsNumber({}, { each: true })
    preferencesIds: number[];
}