import Joi from 'joi';

const validationRegister = async (req,res,next)=>{
        const schema = Joi.object({
            name: Joi.string()
                .min(3).message("the minimum number of string characters required is 3 or more")
                .max(30).message("the maximum number of string characters required is 3o or less than")
                .pattern(new RegExp(/^[a-zA-Z ]*$/))
                .required(),
                email: Joi.string()
                .email(),
        
            password: Joi.string()
               .required()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})")).message("the password should contain lowercase, uppercase and alphanumeric value"),
        
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