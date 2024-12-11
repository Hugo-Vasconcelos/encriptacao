import React from 'react';
import { Bar } from 'react-chartjs-2';

const Statistics = ({ stats }) => {
  const { spaceCount, letterCount, specialCharCount, wordCount } = stats;

  const sortedEntries = Object.entries(letterCount).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  const sortedLabels = sortedEntries.map(([key]) => key);
  const sortedValues = sortedEntries.map(([, value]) => value);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Ocorrências de letras',
        data: sortedValues,
        backgroundColor: 'rgba(200, 100, 200, 1)',
      },
    ],
  };

  return (
    <div>
      <h2>Estatísticas</h2>
      <p>Número de palavras: {wordCount}</p>
      <p>Número de espaços: {spaceCount}</p>
      <p>Número de caracteres especiais: {specialCharCount}</p>
      <div className="chart-container">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Statistics;