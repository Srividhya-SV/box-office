import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  // Fetching results from api when the Search button is clicked
  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };

  // To associate the search text with the state
  const onInputChange = ev => {
    setInput(ev.target.value);
    // console.log(ev.target.value);
  };

  // To call the search function when Enter is pressed
  const onKeyDown = ev => {
    // Calling the search api function when the Enter key is pressed
    if (ev.keyCode === 13) {
      onSearch();
    }
    console.log(ev.keyCode);
  };

  const renderResults = () => {
    // No results for gibbish search value
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }

    // Results from api
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
