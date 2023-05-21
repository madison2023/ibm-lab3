/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router.
 *
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require("express");
const router = express.Router();

// Question Data
const Questions = require("../../models/questions-data.json");
// Hint: get a bonus task here
const shuffleArray = require("../../utils/shuffle");

/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 *
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 *
 */
router.get("/", (req, res) => {
  res.send(
    Questions.map((q, i) => ({
      question: q.question,
      options: shuffleArray(q.options),
      id: i.toString(),
    }))
  );
});

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get("/count", (req, res) => {
  let num = Questions.length;
  jsonCount = { count: num };
  res.json(jsonCount);
});

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get("/:qId", (req, res) => {
  let myQ = {};
  //ensures the given qId is within the array's bounds, if it is not the function will return an empty JSON
  if (req.params.qId >= 0 && req.params.qId < Questions.length) {
    myQ = {
      question: Questions[req.params.qId].question,
      options: Questions[req.params.qId].options,
      id: req.params.qId,
    };
  }
  res.json(myQ);
});

/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results.
 * Calculation of the result will happen here and you
 * would only send the results.
 *
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 *
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post("/result", (req, res) => {
  var totalCorrect = 0;
  var totalQuestions = 0;
  var passingPercentage = 0.5;

  var answerKey = Questions.map((q, i) => ({
    answer: q.answer,
    id: i.toString(),
  }));

  for (const [questionId, userAnswer] of Object.entries(req.body)) {
    var correctAnswer = answerKey.find((x) => x.id === questionId).answer;
    if (correctAnswer === userAnswer) {
      totalCorrect++;
    }
    totalQuestions++;
  }

  var passOrFail =
    totalCorrect / totalQuestions >= passingPercentage ? "pass" : "fail";

  var returnJson = {
    summary: passOrFail,
    score: totalCorrect,
    total: totalQuestions,
  };

  res.json(returnJson);
});

module.exports = router;
