import { Module } from '@nestjs/common';

import { JwtEncrypter } from './jwt-encrypter';
import { BcryptHasher } from './bcrypt-hasher';

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { HashCompare } from '@/domain/forum/application/cryptography/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcryptHasher },
    { provide: HasherGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashCompare, HasherGenerator],
})
export class CryptographyModule {}
