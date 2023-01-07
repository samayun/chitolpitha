import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetsService {
  create(createPetInput: CreatePetInput) {
    return {
      id: 2
    }
  }

  findAll() {
    return [{
      id: 1
    }];
  }

  findOne(id: number) {
    return {
      id
    };
  }

  update(id: number, updatePetInput: UpdatePetInput) {
    return {
      id
    }
  }

  remove(id: number) {
    return {
      id
    };
  }
}
