import React, { useState, useMemo } from 'react';
import { SplitSquareHorizontal, Copy, Trash2 } from 'lucide-react';

function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const differences = useMemo(() => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    const maxLength = Math.max(words1.length, words2.length);
    const diffs = [];

    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || '';
      const word2 = words2[i] || '';
      diffs.push({
        word1,
        word2,
        isDifferent: word1 !== word2
      });
    }

    return diffs;
  }, [text1, text2]);

  const stats = useMemo(() => {
    const differentWords = differences.filter(d => d.isDifferent).length;
    const totalWords = differences.length;
    const similarity = totalWords ? ((totalWords - differentWords) / totalWords) * 100 : 100;
    
    return {
      differentWords,
      totalWords,
      similarity: similarity.toFixed(1)
    };
  }, [differences]);

  const handleClear = () => {
    setText1('');
    setText2('');
  };

  const handleCopy = () => {
    const comparisonResult = differences
      .map(d => `${d.word1} ${d.isDifferent ? '≠' : '='} ${d.word2}`)
      .join('\n');
    navigator.clipboard.writeText(comparisonResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SplitSquareHorizontal className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Text Comparison Tool</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy Results</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="text1" className="block text-sm font-medium text-gray-700">
              First Text
            </label>
            <textarea
              id="text1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your first text here..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="text2" className="block text-sm font-medium text-gray-700">
              Second Text
            </label>
            <textarea
              id="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your second text here..."
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Comparison Results</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Words</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWords}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Different Words</p>
              <p className="text-2xl font-bold text-gray-900">{stats.differentWords}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Similarity</p>
              <p className="text-2xl font-bold text-gray-900">{stats.similarity}%</p>
            </div>
          </div>

          <div className="space-y-2">
            {differences.map((diff, index) => (
              <div key={index} className="flex gap-4 p-2 rounded hover:bg-gray-50">
                <span className={diff.isDifferent ? 'text-red-600' : 'text-green-600'}>
                  {diff.word1 || '(empty)'}
                </span>
                <span className="text-gray-400">→</span>
                <span className={diff.isDifferent ? 'text-red-600' : 'text-green-600'}>
                  {diff.word2 || '(empty)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;