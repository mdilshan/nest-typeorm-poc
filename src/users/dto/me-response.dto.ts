import { ApiProperty } from "@nestjs/swagger";

export class MeResponse {
    @ApiProperty({ example: 1, description: 'Id of the user' })
    id: number;

    @ApiProperty({ example: 'test@gmail.com', description: 'Email of the user' })
    email: string;

    @ApiProperty({ example: true, description: 'Is the email verified?' })
    verified: boolean;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the user' })
    dob: string;

    @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
    name: string;

    @ApiProperty({ example: [1, 2, 3], description: 'Array of shopping preference ids' })
    shoppingPreferences: any[];
}