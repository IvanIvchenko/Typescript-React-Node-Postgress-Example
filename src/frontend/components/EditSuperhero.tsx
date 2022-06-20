import React, { useState, FC, ChangeEvent } from "react";
import { FormState, SuperheroFull } from "../utils/interfaces";
import SuperheroForm from "./SuperheroForm";

interface EditSuperheroInputProps {
    superhero: SuperheroFull,
    onSubmit: (fv: FormState) => void,
    onCancelClick: (superhero: SuperheroFull) => void
}

const EditSuperhero: FC<EditSuperheroInputProps> = ({ superhero, onSubmit, onCancelClick }) => {

    const defaultValues = {
        nickname: superhero.nickname,
        real_name: superhero.real_name,
        origin_description: superhero.origin_description,
        superpowers: superhero.superpowers,
        catch_phrase: superhero.catch_phrase,
        mainImage: null,
        images: [],
    } as FormState;

    const [formValues, setFormValues] = useState(defaultValues)

    const handleCancelClick = () => {
        return onCancelClick(superhero)
    }

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

    const handleImagesUpload = (images: File[]) => {
        setFormValues({
            ...formValues,
            images: [...formValues.images, ...images]
        })
    }

    const handleImageDelete = (imageName: string) => {
        setFormValues({
            ...formValues,
            images: formValues.images.filter(image => image.name !== imageName)
        })
    }

    const handleSubmit = () => {
        return onSubmit(formValues)
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

export default EditSuperhero