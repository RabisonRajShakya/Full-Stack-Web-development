const QuestionSet = require("../modal/QuestionSetModel");

async function createQuestionSetController(req, res) {
    const data = req.body;
    const { id } = req.user;

    const finalData = {
        ...data,
        createdBy: id
    };

    // Save finalData to the database or perform other actions
    const createSet = new QuestionSet(finalData);
    await createSet.save();

    res.status(201).json({
        message: "Question set created successfully",
    });
}
module.exports = {
    createQuestionSetController,
};