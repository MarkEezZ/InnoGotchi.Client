import { useState } from "react"
import { ValidationsType } from "../Types/Types";
import useValidation from "./UseValidation";

const useInput = (initialValue: string, validations: ValidationsType) => {
    
    const [value, setValue] = useState<string>(initialValue);
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations);

    const onChange = (e : React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onBlur = (e : React.FormEvent<HTMLInputElement>) => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export default useInput;