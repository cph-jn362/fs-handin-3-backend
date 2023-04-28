import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDTO } from './dtos/create-problem.dto';
import { ProblemEntity } from './entities/problem.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(ProblemEntity)
    private problemRepository: Repository<ProblemEntity>,
    private readonly httpService: HttpService,
  ) {}

  async saveImage(base64EncodedImage: string): Promise<string> {
    const formData = new FormData();
      formData.append('image', base64EncodedImage);
      const { data: imageData } = await firstValueFrom(
        this.httpService
          .post(
            `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
            formData,
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.log("error!!!!!");
              throw error;
            }),
          ),
      );
      return imageData.image.display_url;
  }

  createProblem(createProblemDTO: CreateProblemDTO) {
    return this.problemRepository.save(createProblemDTO);
  }

  findAllProblems() {
    return this.problemRepository.find();
  }

  findOneProblem(id: number) {
    return this.problemRepository.findOneBy({ id: id });
  }

  deleteProblem(id: number) {
    return this.problemRepository.delete(id);
  }
}
