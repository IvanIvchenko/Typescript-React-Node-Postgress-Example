import { Grid, TextField, Typography } from '@mui/material';
import React, {ChangeEvent, FC} from 'react'
import { SuperheroFull, FormState } from '../utils/interfaces'
import ImagesFilenames from './ImagesFilenamesList'
import { SmallOnClickButton, UpploadMainImageButton } from './Buttons';
import DisplayImages from './DisplayImages';
import ImagesDropzone from './Dropzone';

interface SuperheroFormInputProps {
    superhero: FormState,
    onSubmit: () => void,
    onCancelClick: () => void,
    onInputChange: (e: ChangeEvent) => void,
    onImageUpload: (image: File[]) => void,
    onImageDelete: (imageName: string) => void,
    onMainImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

const SuperheroForm: FC<SuperheroFormInputProps> = ({
    superhero,
    onSubmit,
    onCancelClick,
    onInputChange,
    onImageUpload,
    onImageDelete,
    onMainImageUpload
}) => {
    return(
        <Grid
            container
            sx={{
                '& > :not(style)': { my: 2, width: '1000px' }
            }}
            display="flex"
            flexDirection="column"
            wrap="nowrap"
        >
            <Grid item>
                <DisplayImages
                    mainImage={superhero.mainImage}
                    images={superhero.images}
                />
            </Grid>
            <Grid item >
                <TextField
                    id="nickname"
                    label="Nickname"
                    variant="standard"
                    multiline
                    style={{ maxWidth: '30%', minWidth: '30%' }}
                    value={superhero.nickname}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid item >
                <TextField
                    id="real_name"
                    label="Real name"
                    variant="standard"
                    multiline
                    style={{ maxWidth: '30%', minWidth: '30%' }}
                    value={superhero.real_name}
                    onChange={onInputChange}
                />
            </Grid>
            <TextField
                id="origin_description"
                label="Origin description"
                variant="standard"
                multiline
                minRows={3}
                style={{ maxWidth: '100%', minWidth: '100%' }}
                value={superhero.origin_description}
                onChange={onInputChange}
            />
            <TextField
                id="superpowers"
                label="Superpowers"
                variant="standard"
                multiline
                minRows={2}
                style={{ maxWidth: '100%', minWidth: '100%' }}
                value={superhero.superpowers}
                onChange={onInputChange}
            />
            <TextField
                id="catch_phrase"
                label="Catch phrase"
                variant="standard"
                multiline
                minRows={1}
                style={{ maxWidth: '100%', minWidth: '100%' }}
                value={superhero.catch_phrase}
                onChange={onInputChange}
            />
            <label htmlFor="mainImage">
                <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="mainImage"
                    name="mainImage"
                    type="file"
                    onChange={onMainImageUpload}
                />

                <UpploadMainImageButton>
                    Upload main image
                </UpploadMainImageButton>
            </label>
            <Grid item >
                <ImagesDropzone onDrop={onImageUpload} />
                {superhero.images.length !== 0 ?
                    <>
                        <Typography style={{ color: "black" }}>
                            Images:
                        </Typography>
                        <ImagesFilenames images={superhero.images} onDelete={onImageDelete} />
                    </>
                    : null
                }
            </Grid>
            <Grid
                container
                direction="row"
                display='flex'
                justifyContent='space-between'
                wrap="nowrap"
            >
                <Grid item >
                    <SmallOnClickButton
                        onClick={onSubmit}
                    >
                        Submit
                    </SmallOnClickButton>
                </Grid>
                <Grid item >
                    <SmallOnClickButton
                        onClick={onCancelClick}
                    >
                        Cancel
                    </SmallOnClickButton>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default SuperheroForm