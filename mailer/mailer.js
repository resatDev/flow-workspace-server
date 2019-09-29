const nodemailer = require('nodemailer')
function mailer(name, surname, password, to){
    var transfer = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"resatmemisunof4@gmail.com",
            pass:"Ravza123."
        }
    });
    
    var mailInfo = {
        from:"resatmemisunof4@gmail.com",
        to:to,
        subject:"NodeJs",
        text:`
            Hello dear ${name} and ${surname},
    
            Your password in JotForm Flow WorkSpace: ${password}
    
            Take care of you.
            
            `,
    };
    
    transfer.sendMail(mailInfo,function(error){
        if(error) console.log(error);
        else console.log('mail is send to: ', mailInfo.to)
    });
}

module.exports = mailer