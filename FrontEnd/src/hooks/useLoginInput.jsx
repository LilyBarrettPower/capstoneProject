// create a custom hook for the login form on the login page
import { useState } from "react";

export function useLoginInput(initialValue) {
    // useLoginInput function takes initialValue as a parameter 
    const [value, setValue] = useState(initialValue);
    // the custom hook uses useState internally

    function handleChange(e) {
        setValue(e.target.value);
    }
    // A generic handler function to update state

    const reset = () => setValue('');
    // a generic function to reset input values

    const inputProps = {
        value: value,
        onChange: handleChange
    };
    // create an inputProps object that contains the two properties: value and onChange

    return [inputProps, reset];
    // return an array containing two elements
}