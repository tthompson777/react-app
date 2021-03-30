import './styles.css';

export const InputSearch = ({searchValue, handleChange}) => {

    return (
      <input 
      className="text-input"
        onChange={handleChange}
        value={searchValue}
        type="search"
      />
    );
  }