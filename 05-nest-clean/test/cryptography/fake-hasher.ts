import { HashCompare } from '@/domain/forum/application/cryptography/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator';

export class FakeHasher implements HasherGenerator, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('hashed-');
  }

  async compare(plain: string, hashedValue: string): Promise<boolean> {
    return plain.concat('hashed-') === hashedValue;
  }
}
