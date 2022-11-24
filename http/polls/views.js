const models = require(require('path').resolve('./') + '/models');
 
exports.new = async (req, res, next) => {
    res.render('polls/new');
}

exports.index = async (req, res, next) => {
    //Query lay danh sach cac cuoc khao sat
    const polls = await models.Poll.findMany({
        include: {
            questions:{   
                select: { 
                    name:  true,
                    type: true, 
                    answers: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                } 
            }
        }
    })
    res.render('polls/index', { polls });
}
//creating form
exports.create = async (req, res, next) => {
    let answerNameData = [];
    for (let i = 0; i < req.body.answer_name.length; i++) {
        answerNameData.push({
            name: req.body.answer_name[i]
        })
    }
    await models.Poll.create({
        data: {
            name: req.body.poll_name,   
                questions: { 
                    create: {
                        name:  req.body.question_name,
                        type:  req.body.question_type,
                        answers: {
                            create: answerNameData
                        },
                    }
                }   
        }
    })
    res.redirect('/polls');
}

exports.vote = async (req, res, next) => {

    const isResult = await models.Result.create({
        data: {
            create: {
                answers_id: req.params.answer_id,
                users_id: 1
            }
        }
    })
    res.render('polls/show', { isResult });
}

exports.count = async (req, res, next) => {
    
    const count_voting = await models.Result.findMany({
        include: {
            _count: {
              select: { 
                user_id : true,
                answer_id: true
              }
            }
          }
    })
    
    res.render('polls/index', {count_voting});
}
