import React, { ChangeEvent, useState } from "react";
import style from "./SearchForm.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CardPacksType } from "../../api/packs-api";
import { CardType } from "../../api/cards-api";

type SearchFormPropsType = {
  data: Array<CardPacksType>;
  getFilteredData: (filteredData: Array<CardPacksType>) => void;
};

export const SearchForm: React.FC<SearchFormPropsType> = ({
  data,
  getFilteredData,
}) => {
  const [value, setValue] = useState("");

  const filteredData = data.filter((pack) =>
    pack.name.toLowerCase().includes(value.toLowerCase())
  );

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
    getFilteredData(filteredData);
    console.log(filteredData);
  };

  return (
    <TextField
      size={"small"}
      InputProps={{
        type: "search",
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={onChangeHandler}
    />
  );
};
