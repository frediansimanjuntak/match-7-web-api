import * as express from "express";
import {TodoRoutes} from "../api/todo/route/todo-route";
import {UserRoutes} from "../api/user/route/user-route";
import {QuizRoutes} from "../api/quiz/route/quiz-route";
import {InterestRoutes} from "../api/interest/route/interest-route";


export class Routes {
   static init(app: express.Application, router: express.Router) {
     TodoRoutes.init(router);
     UserRoutes.init(router);     
     QuizRoutes.init(router);
     InterestRoutes.init(router);

    
     app.use('/auth', require('../auth').default);
     app.use("/", router);
   }
}
  