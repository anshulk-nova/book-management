import { Module } from '@nestjs/common';
import { bookModule } from './BookModule/book.module';


@Module({
    imports: [bookModule],
})
export class AppModule {}

//npx eslint --init.
//npx eslint --fix
