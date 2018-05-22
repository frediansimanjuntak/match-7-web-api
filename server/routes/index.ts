import * as express from "express";
import {UserRoutes} from "../api/user/route/user-route";
import {QuizRoutes} from "../api/quiz/route/quiz-route";
import {QuestionRoutes} from "../api/question/route/question-route";
import {InterestRoutes} from "../api/interest/route/interest-route";
import {UserQuizAnswerRoutes} from "../api/user_quiz_answer/route/user_quiz_answer-route";
import {AttachmentRoutes} from "../api/attachment/route/attachment-route";
import {ChatRoutes} from "../api/chat/route/chat-route";
import {MatchRoutes} from "../api/match/route/match-route";


export class Routes {
   static init(app: express.Application, router: express.Router) {
     UserRoutes.init(router);     
     QuizRoutes.init(router);
     QuestionRoutes.init(router);
     InterestRoutes.init(router);
     UserQuizAnswerRoutes.init(router);
     AttachmentRoutes.init(router);
     ChatRoutes.init(router);
     MatchRoutes.init(router);

    
     app.use('/auth', require('../auth').default);
     app.use("/", router);
   }
}
  