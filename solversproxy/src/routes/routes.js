import express from "express"
import { consumeController} from "../controllers/controllers.js"

const router = express.Router();

router.get("/consumeProblems", consumeController);
// router.get("/pushResults", pushController);

export default router;