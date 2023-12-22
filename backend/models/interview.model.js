
const mongoose = require('mongoose');


const interviewSchema = new mongoose.Schema(
    {
     conversation:[],
     feedback:Object
    },{
    versionKey:false
   }
);

const InterviewModel= mongoose.model('Interview', interviewSchema);

module.exports = {InterviewModel}
