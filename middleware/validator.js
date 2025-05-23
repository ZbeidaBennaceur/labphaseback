const {check,validationResult} = require ('express-validator')

exports.registerValidation=()=>[
    check("name","Le nom d'utilisateur est obligatoire").not().isEmpty(),
    check("email", "Veuillez entrer une adresse mail valide").isEmail(),
    check("password","Le mot de passe doit contenir au moins 6 caractères, uniquement des lettres et des chiffres, avec au moins une lettre et un chiffre").isLength({min:6,max:15})
.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
];

exports.loginValidation = () => [
    check("email", "L'email est invalide").isEmail(),
    check("password", "Le mot de passe doit contenir au moins 6 caractères").isLength({ min: 6 }).withMessage('Email ou mot de passe invalide')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Email ou mot de passe invalide'),
  ];


exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    errors.isEmpty()?next():res.status(400).json({errors:errors.array()})
}