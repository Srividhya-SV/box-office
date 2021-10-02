import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from './Home.styled';

const Home = () => {
  const [input, setInput] = useLastQuery();
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  console.log(searchOption);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
