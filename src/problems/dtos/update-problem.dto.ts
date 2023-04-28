import { PartialType } from "@nestjs/mapped-types";
import { CreateProblemDTO } from "./create-problem.dto";

export class UpdateProblemDTO extends PartialType(CreateProblemDTO){}