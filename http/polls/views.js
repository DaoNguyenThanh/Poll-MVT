const models = require(require('path').resolve('./') + '/models');
const session = require('express-session');
const { WebClient, ErrorCode } = require('@slack/web-api');

exports.new = async (req, res, next) => {
    res.render('polls/new');
}

exports.index = async (req, res, next) => {
    //console.log(req.session.user);
    const user_infor = req.session.user;
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
    })
    // console.log(req.session);
    //console.log(JSON.stringify(polls));

    res.render('polls/index', { polls, user_infor });
    
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

exports.username = async (req, res, next) => {
  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;
  // Initialize
  const web = new WebClient(token);
  try {
  // Call the users.info method using the WebClient
  const result = await web.users.info({
    user: req.body.user
  });

   console.log(result);
  }
  catch (error) {
   // Check the code property, and when its a PlatformError, log the whole response.
   if (error.code === ErrorCode.PlatformError) {
    console.log(error.data);
  } else {
    // Some other error, oh no!
    console.log('Well, that was unexpected.');
    }
  }
  
  res.redirect('/polls');
}    