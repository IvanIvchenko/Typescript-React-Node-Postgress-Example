import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { FormState } from "../utils/interfaces";
import SuperheroForm from "./SuperheroForm";

interface AddSuperheroInputProps {
    onFormSubmit: (att:FormState) => void
    onFormCancelClick: () => void
}

const AddSuperhero: FC<AddSuperheroInputProps> = ({ onFormSubmit, onFormCancelClick }) => {

    const defaultValues = {
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        mainImage: null,
        images: []
    } as FormState;

    const [formValues, setFormValues] = useState(defaultValues)

    const handleInputChange = (e: ChangeEvent) => {
        const { id, value } = e.target as HTMLTextAreaElement;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleMainImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            mainImage: (e.target.files as FileList)[0]
        })
    }

    const handleImagesUpload = (event: File[]) => {
        setFormValues({
            ...formValues,
            images: [...formValues.images, ...event]
        })
    }

    const handleImageDelete = (value: string) => {
        setFormValues({
            ...formValues,
            images: formValues.images.filter(image => image.name !== value)
        })
    }

    const handleSubmit = () => {
        onFormSubmit(formValues)
    }

    const handleCancelClick = () => {
        onFormCancelClick()
    }

    return (
        <SuperheroForm 
            superhero = {formValues}
            onSubmit={handleSubmit}
            onImageDelete={handleImageDelete}
            onImageUpload={handleImagesUpload}
            onMainImageUpload={handleMainImageUpload}
            onInputChange={handleInputChange}
            onCancelClick={handleCancelClick}
        />
    )
}

export default AddSuperhero