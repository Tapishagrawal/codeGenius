const express = require("express");
const { InterviewModel } = require("../models/interview.model");

require("dotenv").config();

const { OpenAI } = require("openai");
const { allPrompts, endingPrompt } = require("../utils/allPrompts");
const apiKey = process.env.openAPIKEY;

const openai = new OpenAI({ apiKey: apiKey });

const interviewRouter = express.Router();

   
interviewRouter.post("/start", async (req, res) => {
  const {type}= req.body;

  try {

    const typeOfPrompt= allPrompts[type];

    let startConvo = [{ role: "user", content: typeOfPrompt }];

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

interviewRouter.patch("/update/:id", async (req, res) => {
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

interviewRouter.patch("/end/:id", async (req, res) => {
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

interviewRouter.get("/get/:id", async(req,res)=>{
    // console.log("hi")

    const { id } = req.params;
  
    try {
       
        const interviewData = await InterviewModel.findById({_id:id});

        if (!interviewData) {
          return res.status(404).send({
            success: false,
            message: "Interview data not found",
          });
        } 

        res.status(200).send({
            success: true,
            message: "Interview data fetched successfully",
            data:interviewData,
        });

    } catch (err) {
      console.log(err);
      res.status(400).send({ success: false, message: "Interview data not found" });
    }
}); 


module.exports = { interviewRouter };
