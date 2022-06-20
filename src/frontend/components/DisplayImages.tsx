import { ImageList, ImageListItem } from '@mui/material'
import React, { FC } from 'react'
import getImageListColumnLength from '../utils/getImageListColumnLength'

interface DisplayImagesInputProps{
    mainImage: File | null,
    images: File[] | null,
}

const DisplayImages: FC<DisplayImagesInputProps> = ({ mainImage, images }) => {
    return mainImage || images ? (
        <ImageList
            sx={{ maxheight: 400 }}
            cols={
                getImageListColumnLength(images) 
            }
            gap={3}
            rowHeight={400}
        >
            {mainImage ?
                <ImageListItem key={mainImage.name}>
                    <img
                        style={{
                            maxHeight: '100%',
                            maxWidth: "100%",
                            minHeight: '100%',
                            minWidth: "20%"
                        }}
                        src={URL.createObjectURL(mainImage)}
                        alt="mainImage"
                    />
                </ImageListItem>
                : null
            }
            {images && images.length ?
                images.map((item) => (
                    <ImageListItem key={item.name}>
                        <img
                            style={{
                                maxHeight: '100%',
                                maxWidth: "100%",
                                minHeight: '100%',
                                minWidth: "20%"
                            }}
                            src={URL.createObjectURL(item)}
                            alt="img"
                        />
                    </ImageListItem>
                ))
                : null
            }
        </ImageList>
    ) : null
}

export default DisplayImages