import React, {useState, useEffect} from 'react';
import Async from 'react-select/async';
import Select, {components} from 'react-select';
import Search from '../../icons/SearchIcon';
import {loadSuggestions} from "../../actions/crudActions";
import {useTranslation} from "react-i18next";

const AutosuggestSearchTour = ({onSearchSuggestion, onSearchPhrase, city, language, placeholder}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [input, setInput] = useState("");
    const {t} = useTranslation();
    let options = []; //Stores the given suggestions
    let searchPhrase; //Text you type into the field

    const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
        const value = selectedOption ? selectedOption.label : '';
        onSearchSuggestion(value);
    };

    //What the component should do while I type in values
    const handleInputChange = (inputValue) => {
        if (city !== null) {
            searchPhrase = inputValue;
            loadSuggestions(inputValue, city.value, language) //Call the backend
                .then((suggestions) => {
                    const newOptions = suggestions.map((suggestion) => ({ //Get the New suggestions and format them the correct way
                        label: suggestion.suggestion,
                        value: suggestion.suggestion,
                    }));
                    options = newOptions;
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    const filterOptions = (inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterOptions(inputValue));
        }, 1000);
    };

    const styles = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            borderColor: '#fff',
            minHeight: '55px',
            height: '55px',
            boxShadow: state.isFocused ? null : null,
            minWidth: '300px',
            '&:hover': {
                borderColor: '#fff',
            },
        }),
        option: (provided) => ({
            ...provided,
            textAlign: 'left',
        }),
    };
    useEffect(() =>{
        onSearchPhrase(input)
    }, [input])

    const NoOptionsMessage = props => {
        return (
            <components.NoOptionsMessage {...props}>
                <span className="custom-css-class">No Suggestions</span>
            </components.NoOptionsMessage>
        );

    };

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Search
                style={{strokeWidth: 1, stroke: '#101010', fill: '#101010'}}
            />
            <Async
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    NoOptionsMessage
                }}
                options={options}
                inputValue={input}
                placeholder={placeholder ? placeholder : t("start.suche")}
                styles={styles}
                loadOptions={loadOptions}
                value={selectedOption}
                onChange={handleSelect}
                isClearable={false}
                onInputChange={(value, action) => {
                    if (action.action === 'input-change') {
                        setInput(value);
                        handleInputChange(value);
                    }
                }}
            />
        </div>
    );
};
export default AutosuggestSearchTour;
