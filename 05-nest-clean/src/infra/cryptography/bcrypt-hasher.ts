import { hash, compare } from 'bcryptjs';

import { HashCompare } from '@/domain/forum/application/cryptography/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator';

export class BcryptHasher implements HasherGenerator, HashCompare {
  private HAsH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HAsH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
