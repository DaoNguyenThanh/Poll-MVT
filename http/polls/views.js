const models = require(require('path').resolve('./') + '/models');
const session = require('express-session');
const { WebClient, ErrorCode } = require('@slack/web-api');

exports.new = async (req, res, next) => {
    res.render('polls/new');
}

exports.index = async (req, res, next) => {
    const username = req.session.username;
    //Query lay danh sach cac cuoc khao sat
    const polls = await models.Poll.findMany({
        include: {
            questions:{   
                select: {
                    id: true,
                    name:  true,
                    type: true, 
                    answers: {
                        select: {
                            id: true,
                            name: true,
                            _count: {
                                select: {
                                    users: true
                                }
                            }
                        }
                    }
                },
            }
        }
    });
    // const totalVotes = answers._count.users.reduce((total, n) => total += n, 0 );
    // console.log(totalVotes);
    const totalVotes = await models.Result.findUnique({
        select: {
            user_id: true
          },
        where: {
            user_id_answer_id: {
                answer_id:  parseInt(req.body.answer_id),
                user_id: req.session.user
            }
        }
    });
    console.log(totalVotes);
    //console.log(req.session);
    //console.log(JSON.stringify(polls));
    res.render('polls/index', { polls, username, totalVotes});
    
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

  // let result = models.Result.findUnique({
  //   where: {
  //     answer_id: Number(req.body.answer_id),
  //     user_id: 1
  //   }
  // })
  // if (!result)
  //   await models.Result.create({
  //     data: {
  //       answer_id: Number(req.body.answer_id),
  //       user_id: 1
  //     }
  //   })
  await models.Result.upsert({
    where: {
      user_id_answer_id: {
        answer_id: Number(req.body.answer_id),
        user_id: req.session.user
      }
    },
    create: {
      answer_id: Number(req.body.answer_id),
      user_id: req.session.user
    },
    update: {
      user_id: req.session.user
    }
  })
  
  res.redirect('/polls');
}  