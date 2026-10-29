import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNumber(
        {
            maxDecimalPlaces: 3,
        }
    )
    @Min(0)
    @Type(() => Number)
    public price: number;

}
