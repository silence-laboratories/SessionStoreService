//  src/global.d.ts
import 'express';          // <-- ensures the module is in scope

declare global {
  namespace Express {
    interface Request {
      /** UUID of the caller – injected by auth middleware */
      userId: string;
    }
  }
}

export {};                 // <-- marks the file as a module
