import { useState } from "react";

export default function useSignUpInput(initialFormData) {
    const [formData, setFormData] = useState(initialFormData);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    
    const handleLocationChange = (e) => {
        setFormData((prevData) => ({ ...prevData, location: e.target.value }));
    }

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, profilePhoto: e.target.files[0] }));
    }

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return {
        formData,
        handleFileChange,
        handleInputChange,
        handleLocationChange,
        resetForm
    };
}