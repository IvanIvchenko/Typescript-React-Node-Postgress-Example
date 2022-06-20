import React, { FC } from "react";
import Dropzone from "react-dropzone";

interface ImagesDropzoneInputProps{
  onDrop: (images: File[]) => void
}
const ImagesDropzone: FC<ImagesDropzoneInputProps> = ({ onDrop }) => {

  return (
      <Dropzone
        onDrop={(acceptedFiles: File[]) => onDrop(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <div 
          {...getRootProps({ className: "dropzone" })}
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '3px',
            backgroundColor: '#fafafa',
            color: 'black',
          }}
          >
            <input {...getInputProps()} />
            <p style={{color: 'black'}}>Drag'n'drop images, or click to select files</p>
          </div>
        )}
      </Dropzone>
  );
}

export default ImagesDropzone