const models = require(require('path').resolve('./') + '/models');
const serializers = require('./serializers');
const { json } = require("express");

//creating form
exports.create = async (req, res, next) => {
    let arr = req.body.answer_name;
    let arrayAnswerName = JSON.stringify(arr).split(",");
    for (let i= 0;i < arrayAnswerName.length;i++) {
        let answerName = arrayAnswerName[i];
        return answerName;
    }
    await models.Poll.create({
        data: {
            name: req.body.poll_name,   
                questions: { 
                    create: {
                        name:  req.body.question_name,
                        type:  req.body.question_type,
                        answers: {
                            create: {
                                name: answerName
                            }
                        }
                    }
                }   
        }
    })
    res.redirect('/polls');
}

exports.index = async (req, res, next) => {
    // Query lay danh sach cac cuoc khao sat
    const polls = await models.Poll.findMany({
    // const myJSON = await models.Poll.findMany({
        include: {
            questions:{   
                select: { 
                    name:  true,
                    type: true, 
                    answers: {
                        select: {
                            name: true
                        }
                    }
                } 
            }
        }
    })
    res.render('polls/index', { polls });
}