import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import FileUploader from './components/FileUploader';
import Statistics from './components/Statistics';
import { analyzeText } from './utils/analyzeText';
import { encryptFile, decryptFile } from './utils/encryptFile';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [stats, setStats] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');
  const [encryptedContent, setEncryptedContent] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');
  const [theme, setTheme] = useState('light');
  const [showInitialScreen, setShowInitialScreen] = useState(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleFileUpload = (content) => {
    setFileContent(content);
    setModifiedContent('');
    setEncryptedContent('');
    setDecryptedContent('');
    const analyzedStats = analyzeText(content);
    setStats(analyzedStats);
    setShowInitialScreen(false);
  };

  const handleInsertWord = () => {
    if (fileContent) {
      const updatedContent = `ISPGAYA\n${fileContent}`;
      setModifiedContent(updatedContent);
      const analyzedStats = analyzeText(updatedContent);
      setStats(analyzedStats);
    }
  };

  const handleEncryption = () => {
    if (modifiedContent) {
      const encrypted = encryptFile(modifiedContent);
      setEncryptedContent(encrypted);
      downloadEncryptedFile(encrypted);
    }
  };

  const handleDecryption = () => {
    if (encryptedContent) {
      const decrypted = decryptFile(encryptedContent);
      setDecryptedContent(decrypted);
    }
  };

  const downloadEncryptedFile = (content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encrypted_file.txt';
    link.click();
  };

  const handleBack = () => {
    setShowInitialScreen(true);
    setStats(null);
    setFileContent('');
    setModifiedContent('');
    setEncryptedContent('');
    setDecryptedContent('');
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1
          style={{
            color: theme === 'light' ? 'white' : 'black',
          }}
        >
          Analisador de Ficheiros
        </h1>
        <span className="theme-icon" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
      </header>
      <main className="app-content">
        {showInitialScreen ? (
          <div className="upload-box">
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        ) : (
          <>
            {stats && (
              <div>
                <Statistics stats={stats} />
              </div>
            )}
            <div className="input-buttons">
              <button onClick={handleInsertWord}>Inserir "ISPGAYA" no Ficheiro</button>
              {modifiedContent && (
                <button onClick={handleEncryption}>Encriptar e Fazer Download</button>
              )}
              {encryptedContent && (
                <button onClick={handleDecryption}>Desencriptar</button>
              )}
              <button onClick={handleBack}>Voltar</button>
            </div>
            {decryptedContent && (
              <div className="decrypted-box">
                <h3>Conteúdo Desencriptado:</h3>
                <pre>{decryptedContent}</pre>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
