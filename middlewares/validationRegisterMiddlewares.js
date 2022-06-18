import Joi from 'joi';

const validationRegister = async (req,res,next)=>{
   
        const {name,email,password,password_confirmation,tc} = req.body
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
                email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        
            password: Joi.string()
               .required()
            
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")),
        
            password_confirmation: Joi.ref('password')
           
    }).unknown(true)

    try{
        const value = await schema.validateAsync(req.body,{abortEarly:false});
       next();
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}

export default validationRegister;