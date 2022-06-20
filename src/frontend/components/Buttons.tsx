import { Button } from "@mui/material"
import React, { FC } from "react"
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

interface DefaultButtonInputProps {
    fullWidth?: boolean,
    variant?: 
    'contained'
    | 'outlined'
    | 'text',
    size?: 	
    'small'
    | 'medium'
    | 'large',
    uppload?: boolean
    onClick?: () => void,
    children: React.ReactNode
}

interface UpploadMainImageButtonInputProps extends DefaultButtonInputProps{}
interface SmallOnClickButtonInputProps extends DefaultButtonInputProps{}

const DefaultButton: FC<DefaultButtonInputProps> = ({ children, fullWidth, variant, size, uppload, ...props }) => {
    return (
        <>
            <Button
                variant= {variant ? variant : "contained"}
                color="primary"
                size = {size ? size : "medium"}
                fullWidth={fullWidth}
                sx={{
                    boxShadow: 0,
                }}
                component = {uppload ? "span" : "div"}
                {...props}
            >
                {children}
            </Button>
        </>
    )
}

export const UpploadMainImageButton: FC<UpploadMainImageButtonInputProps> = ({children, ...props}) =>{
    return(
        <DefaultButton fullWidth={true} uppload={true} {...props}>
            <ImageSearchIcon />
            {children}
        </DefaultButton>
    )
}

export const SmallOnClickButton: FC<SmallOnClickButtonInputProps> = ({children, onClick, ...props}) =>{
    return(
        <DefaultButton onClick={onClick} {...props}>
            {children}
        </DefaultButton>
    )
}