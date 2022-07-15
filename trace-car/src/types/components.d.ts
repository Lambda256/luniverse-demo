import { AxiosError, AxiosResponse } from "axios";

export {}

declare global {
  /* Type of AuthTokenForm */
  namespace AuthTokenFormType {
    interface InputLabel {
      required?: boolean;
    }
  
    interface Input {
      textTransform?: string;
    }
  
    interface TabBtn {
      active?: boolean;
    }
  }

  /* Type of GenerateForm */
  namespace GenerateForm {
    interface Props {
      authToken?: string | null;
    }
  }

  /* Type of Error */
  namespace ErrorType {
    interface Props {
      error: AxiosError<Data> | Error
      onClick?: Function
    }

    interface Data {
      code: string
      message: string
      result: boolean
    }
  }
  
  /* Type of InputForm */
  namespace InputFormType {
    interface InputForm {
      title?: string;
      mode?: string;
    }
  
    interface InputLabel {
      required?: boolean;
    }
  
    interface Input {
      textTransform?: string;
    }
  }
  
  /* Type of ItemInfo */
  namespace ItemInfoType {
    interface Props {
      itemData: ItemData;
    }
  
    interface Span {
      textTransform?: string;
    }
  
  }
  interface ItemData {
    id: string;
    image: number;
    owner: string;
    plateNumber: string;
    model: string;
    year: number;
    mileage: number;
    description?: string;
  }
}