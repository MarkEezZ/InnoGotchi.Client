import { useState, useEffect } from "react"
import { ValidationsType } from "../Types/Types";

const useValidation = (value: string, validations: ValidationsType) => {
    
    const [isEmptyError, setEmptyError] = useState<boolean>(false);
    const [isNullError, setNullError] = useState<boolean>(false);
    const [isMinLengthError, setMinLengthError] = useState<boolean>(false);
    const [isContainSpaceError, setContainSpaceError] = useState<boolean>(false);
    const [isMaxLengthError, setMaxLengthError] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isMinValueError, setMinValueError] = useState<boolean>(false);
    const [isMaxValueError, setMaxValueError] = useState<boolean>(false);
    const [isNumberError, setNumberError] = useState<boolean>(false);

    const [isInputValid, setInputValid] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmptyError(false) : setEmptyError(true);
                    break;

                case "isNull": 
                    value == null ? setNullError(true) : setNullError(false);
                    break;
                
                case 'isContainSpaces':
                    value.includes(" ") ? setContainSpaceError(true) : setContainSpaceError(false);
                    break;

                case 'minLength':
                    (value.length >= Number(validations['minLength'])) ? setMinLengthError(false) : setMinLengthError(true);
                    break;

                case 'maxLength':
                    (value.length <= Number(validations['maxLength'])) ? setMaxLengthError(false) : setMaxLengthError(true);
                    break;

                case 'minValue':
                    (Number(value) >= Number(validations['minValue'])) ? setMinValueError(false) : setMinValueError(true);
                    break;

                case 'maxValue':
                    (Number(value) <= Number(validations['maxValue'])) ? setMaxValueError(false) : setMaxValueError(true);
                    break;

                case 'isEmail':
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? setEmailError(false) : setEmailError(true);
                    break;

                case 'isNumber':
                    (!Number.isNaN(parseInt(value)) || value === "") ? setNumberError(false) : setNumberError(true);
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmptyError || isNullError || isMinLengthError || isContainSpaceError || isMaxLengthError || isEmailError || isMinValueError || isMaxValueError || isNumberError) {
            setInputValid(false);
        }
        else {
            setInputValid(true);
        }
    }, [isEmptyError, isNullError, isMinLengthError, isContainSpaceError, isMaxLengthError, isEmailError, isMinValueError, isMaxValueError, isNumberError]);

    return { 
        isEmptyError, 
        isNullError, 
        isMinLengthError, 
        isContainSpaceError, 
        isMaxLengthError, 
        isEmailError,
        isMinValueError,
        isMaxValueError,
        isNumberError,
        isInputValid
    }
}
 
export default useValidation;