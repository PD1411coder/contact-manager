import React from 'react'

import { FileUploader } from "react-drag-drop-files";
import './Aside.css'


const fileTypes = ["CSV"];

const ImportContact = ({uploadData, setIsAlert, setIsUpload}) => {
const style = {height: "84%",
    width:"40%"

}

    
    const onDrop = async(file) => {

        const formData = new FormData();
        formData.append("file", file);

        const data = await fetch(
          "https://contacts-manager-backend.herokuapp.com/api/contactpost",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const response = await data.json();
        uploadData();
        if(response.status === "success"){
          setIsUpload(true);
          setTimeout(() => {
            setIsUpload(false);
          }, 3000);
        }
        setIsAlert(false);
        console.log(response);
    }

  return (
    <div className="fileuploader">
      <FileUploader
        handleChange={onDrop}
        types={fileTypes}
        name="file"
        style={style}
      />
    </div>
  );
}

export default ImportContact;