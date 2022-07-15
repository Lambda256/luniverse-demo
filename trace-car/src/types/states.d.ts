
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

  /* Type of item from events response */
  interface EventsResponseItem {
    eventId: string,
    objectId: string,
    traceProgramId: string, 
    eventTxId: string,
    tx: object,
    timestamp: number,
    userName: string,
    eventName: string,
    data: string,
    createdBy: object,
    createdAt: string,
  }
}