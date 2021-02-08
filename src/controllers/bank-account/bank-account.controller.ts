import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/models/bank-account.model';
import { Repository } from 'typeorm';

@Controller('bank-account')
export class BankAccountController {

    constructor(
        @InjectRepository(BankAccount)
        private bankAccountRepository: Repository<BankAccount>
    ){}

    @Get()
    index(){
        return this.bankAccountRepository.find();
    }

    @Get()
    show(){

    }

}
