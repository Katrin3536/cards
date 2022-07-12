import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import style from "./PaginationSelect.module.css";

type PaginationGroupType = {
  cardsTotalCount?: number;
  pageCount?: number;
  page?: number;
  disable?: boolean;
  onChangePage: (page: number) => void;
  onChangeValue: (value: number) => void;
};

export const PaginationSelect = (props: PaginationGroupType) => {
  const {
    cardsTotalCount,
    pageCount,
    page,
    disable,
    onChangeValue,
    onChangePage,
  } = props;

  const changePageCountHandler = (event: SelectChangeEvent) => {
    if (pageCount && +event.target.value !== pageCount) {
      onChangeValue(+event.target.value);
    }
  };

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onChangePage(value);
  };

  return (
    <div className={style.pagination}>
      <Stack spacing={2}>
        <Pagination
          disabled={disable}
          count={cardsTotalCount}
          page={page}
          shape="rounded"
          onChange={changePageHandler}
        />
      </Stack>
      <div className={style.select}>
        <span>Packs per page: </span>
        <Select
          disabled={disable}
          size="small"
          value={String(pageCount)}
          onChange={changePageCountHandler}
          sx={{ minWidth: "60px", height: "30px" }}
        >
          <MenuItem value="5">{"5"}</MenuItem>
          <MenuItem value="10">{"10"}</MenuItem>
          <MenuItem value="15">{"15"}</MenuItem>
        </Select>
      </div>
    </div>
  );
};
