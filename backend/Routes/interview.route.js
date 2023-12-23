const express = require("express");
const { InterviewModel } = require("../models/interview.model");

require("dotenv").config();

const { OpenAI } = require("openai");
const apiKey = process.env.openAPIKEY;

const openai = new OpenAI({ apiKey: apiKey });

const interviewRouter = express.Router();

const mern = `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

    Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object. 
    Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
    
    JD: MERN, MongoDB, Express, React and Node (Junior)
    
    Skills: Express, React, Node.
    
    Just ask one question at a time and wait for me to give the answer(If I give a completely wrong or mostly wrong answer you will have to provide the correct answer as your response as well as the next question). Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`;

const endingPrompt = `stop the interview. And return the feedback object based on the your evaluation of the questions answered by me. You should only return the feedback object, not a single line or word more. the feedback object should follow this schema(except the interview key). Feedback Object Schema: {
  strengths: [{ type: String }],
  improvementAreas: [{ type: String }],
  overallScore: { type: Number },
};
Remember to only send the feedback object in and nothing else like a variable or something, you response should be something like "{"strengths:"["Good understanding of the concepts",...], "improvementAreas":["Could work on implementations",...],"overallScore":6.5}" , it should just be a strified object and nothing else.Don't even add symbols to your response in the end like ';' '.' etc, it should just be a a stringified JS object that I can perform JSON.parse on.
`;

interviewRouter.post("/start", async (req, res) => {
  // const {type}= req.body;

  try {
    let startConvo = [{ role: "user", content: mern }];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: startConvo,
    });

    const firstQue = response.choices[0].message.content;

    const gptReply = { role: "assistant", content: firstQue };

    startConvo = [...startConvo, gptReply];

    const newInterview = new InterviewModel({ conversation: startConvo });
    await newInterview.save();

    res
      .status(200)
      .send({
        success: true,
        message: "Interview Started",
        data:newInterview,
        newQue: firstQue,
      });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

interviewRouter.post("/update/:id", async (req, res) => {
  const { conversation } = req.body;
  const { id } = req.params;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    const nextQuestion = response.choices[0].message.content;

    const newConvo = [
      ...conversation,
      { role: "assistant", content: nextQuestion },
    ];

    const updatedInterview = await InterviewModel.findByIdAndUpdate(
      id,
      { conversation: newConvo },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      data:updatedInterview,
      newQue: nextQuestion,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Something went wrong while updating" });
  }
});

interviewRouter.post("/end/:id", async (req, res) => {
  const { id } = req.params;
  const { conversation } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...conversation, { role: "user", content: endingPrompt }],
    });

    const ans = response.choices[0].message.content;
    const feedback = JSON.parse(ans);

    const feedbackAdded = await InterviewModel.findByIdAndUpdate(
      id,
      { feedback: feedback },
      { new: true } 
    );

    res.status(200).send({
      success: true,
      message: "Thank you for attempting this interview",
      data:feedbackAdded,
      newQue:feedback
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: "Couldn't End Interview" });
  }
});

module.exports = { interviewRouter };
