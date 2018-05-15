import * as express from "express";
import {UserRoutes} from "../api/user/route/user-route";
import {QuizRoutes} from "../api/quiz/route/quiz-route";
import {InterestRoutes} from "../api/interest/route/interest-route";


export class Routes {
   static init(app: express.Application, router: express.Router) {
     UserRoutes.init(router);     
     QuizRoutes.init(router);
     InterestRoutes.init(router);

    
     app.use('/auth', require('../auth').default);
     app.use("/", router);
   }
}
  