
export {};

declare global {
  namespace States {
    /* Type of API keys */
    interface APIkeys {
      accessKey: string;
      secretKey: string;
      expiresIn: number;
    }
    
    /* Type of AuthToken */
    interface AuthToken {
      token: string;
      expiryAt: string;
    }
  }
  
  /* Type of generating AuthToken response */
  interface GenerateAuthTokenResponse {
    code: string;
    data: {
      authToken: AuthToken
    };
  }

  /* Type of Transaction */
  interface Tx {
    fromAddress: string,
    inputs: string,
    receipt: string,
    result: number,
    status: string,
    txId: string,
  }

  /* Type of item from events response */
  interface EventsResponseItem {
    eventId: string,
    objectId: string,
    traceProgramId: string, 
    eventTxId: string,
    tx: Tx,
    timestamp: number,
    userName: string,
    eventName: string,
    data: string,
    createdBy: object,
    createdAt: string,
  }

  /* Type of object with attributes */
  interface Params {
    [key: string]: any
  }
}