import { CreateTourInput } from "./create-tour-input";

export interface UpdateTourInput
  extends Pick<CreateTourInput, "price" | "startDate"> {}
