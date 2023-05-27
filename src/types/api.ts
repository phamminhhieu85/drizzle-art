type BasicResponse = {
  error: boolean;
  message: string;
  action?: string;
};

export type CreatePhoto = { input: { name: string } };
