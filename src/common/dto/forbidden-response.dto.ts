import { ApiProperty } from "@nestjs/swagger";

export class ExceptionResponseDto {
    @ApiProperty()
    message: string;
    @ApiProperty()
    error: string
    @ApiProperty()
    statusCode: number
}