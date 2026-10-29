import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber(
        {
            // decimal_digits: 2,
        }
    )
    @Min(0)
    price: number;

}
