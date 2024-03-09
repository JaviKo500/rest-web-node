import { Router } from 'express';

export class AppRoutes {
   static get routes():Router {
      const router = Router();

      router.get('/api/todo', (req, res) => {
         res.status(200).json({
           data: [
               { id: 1, text: 'But milk', createAt: new Date() },
               { id: 1, text: 'But milk', createAt: new Date() },
               { id: 1, text: 'But milk', createAt: new Date() },
            ],
         });
      });
      
      return router;
   }
}