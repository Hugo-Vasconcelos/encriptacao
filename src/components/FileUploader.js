import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        onFileUpload(content);
      };
      if (file.type === 'application/msword') {
        alert('Ficheiros .doc serão processados como texto simples.');
        reader.readAsText(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".txt,.doc" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;