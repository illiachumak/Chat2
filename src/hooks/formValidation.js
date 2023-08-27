import validator from 'validator'

const useFormValidation = (name, email, password, confirmPassword) => {
   
    if(name.length < 3) return 'Name should me more than 3 characters!'
    if(!validator.isEmail(email)) return 'Enter a valid email!'
    if(!validator.isStrongPassword(password)) return 'Password is too simple!'
    if(!(confirmPassword === password)) return 'Confirm password!'
    else return ''
}

export default useFormValidation;
