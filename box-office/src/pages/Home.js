import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  // State to manage the radio buttons
  const [searchOption, setSearchOption] = useState('shows');

  // Check  whether the radio button is set to Shows
  const isShowsSearch = searchOption === 'shows';

  // Fetching results from api when the Search button is clicked
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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

    // Results from api - Switching between show and actors based on the api result
    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  console.log(searchOption);

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows_search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actors_search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
