import { useState } from "react";

export default function useSignUpInput(initialFormData) {
    // state to manage form data
    const [formData, setFormData] = useState(initialFormData);
    // handle generic input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    // handle the location input change
    const handleLocationChange = (e) => {
        setFormData((prevData) => ({ ...prevData, Location: e.target.value }));
    }
    // handle file change for the profile photo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            ProfilePhoto: file,
        });
    };
    // reset the form 
    const resetForm = () => {
        setFormData(initialFormData);
    };
// return an object with the formData and the functions
    return {
        formData,
        handleInputChange,
        handleLocationChange,
        handleFileChange,
        resetForm
    };
}