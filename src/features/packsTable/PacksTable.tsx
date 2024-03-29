import React, { ChangeEvent, useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import ApiIcon from "@mui/icons-material/Api";
import {
  addPackTC,
  deletePackTC,
  getSearchPacksListTC,
  getSortPacksListTC,
  packsSelect,
  pageCountSelect,
  pageSelect,
  setPageAC,
  setPageCountAC,
  totalPacksCountSelect,
  updatePackNameTC,
} from "../../bll/reducers/packs-reducer";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { userIDSelect } from "../../bll/reducers/profile-reducer";
import Button from "@mui/material/Button";
import style from "./PacksTable.module.css";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { useDebounce } from "../../utils/useDebounce";
import { PaginationSelect } from "./pagination/PaginationSelect";

interface Data {
  id: string;
  name: string;
  cards: number;
  create: string;
  update: string;
  createdBy: string;
  actions: string;
  label: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
  disablePadding: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    textAlign: "left",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "cards",
    textAlign: "left",
    disablePadding: false,
    label: "Cards",
  },
  {
    id: "update",
    textAlign: "left",
    disablePadding: false,
    label: "Last updated",
  },
  {
    id: "createdBy",
    textAlign: "left",
    disablePadding: false,
    label: "Created by",
  },
  {
    id: "actions",
    textAlign: "left",
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableHead: React.FC = () => {
  const [updated, setUpdated] = useState<"0updated" | "1updated">("0updated");
  const dispatch = useAppDispatch();

  const sortByUpdateHandler = () => {
    setUpdated(updated === "0updated" ? "1updated" : "0updated");
    dispatch(getSortPacksListTC(updated));
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.textAlign}
            padding="normal"
          >
            <TableSortLabel
              active={headCell.label === "Last updated"}
              direction={updated === "1updated" ? "asc" : "desc"}
              onClick={sortByUpdateHandler}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const PacksTable: React.FC = () => {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPacksCount = useAppSelector(totalPacksCountSelect);
  const packsSelector = useAppSelector(packsSelect);
  const userID = useAppSelector(userIDSelect);
  const status = useAppSelector(appStatusSelect);
  const page = useAppSelector(pageSelect);
  const rowsPerPage = useAppSelector(pageCountSelect);

  // ==== SEARCHING =====

  const debouncedValue = useDebounce<string>(value, 1500);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue.length) {
      dispatch(getSearchPacksListTC(debouncedValue));
      dispatch(setPageAC(1));
    }
  }, [dispatch, debouncedValue, page, rowsPerPage]);

  //=================================

  const handleChangePage = (newPage: number) => {
    dispatch(setPageAC(newPage));
  };

  const handleChangeRowsPerPage = (pageCount: number) => {
    dispatch(setPageCountAC(pageCount));
  };

  // ==== ACTIONS ====

  // ==== ADD NEW PACK ====

  const addNewPackCallback = () => {
    dispatch(addPackTC(page, rowsPerPage, "Training card_new"));
  };

  // ==== DELETE PACK ====

  const deletePackHandler = (packID: string) => {
    dispatch(deletePackTC(page, rowsPerPage, packID));
  };

  // ==== UPDATE PACK NAME ====

  const updatePackHandler = (packID: string) => {
    dispatch(
      updatePackNameTC(page, rowsPerPage, packID, "Updated name by Max")
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <div className={style.search_group}>
          <TextField
            fullWidth
            size={"small"}
            placeholder="Search"
            disabled={status === "loading"}
            value={value}
            onChange={onChangeHandler}
            InputProps={{
              type: "search",
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            disabled={status === "loading"}
            className={style.search_btn}
            style={{ width: "30%", marginLeft: "30px" }}
            onClick={addNewPackCallback}
          >
            add new pack
          </Button>
        </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead />
            <TableBody>
              {packsSelector.length ? (
                packsSelector.map((card, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align={
                          headCells.find((cell) => cell.id === "name")
                            ?.textAlign
                        }
                        onClick={() =>
                          navigate(PATH.CARDS_LIST, {
                            state: {
                              pack_id: card._id,
                              cardsCount: card.cardsCount,
                            },
                          })
                        }
                        style={{ paddingLeft: "30px" }}
                      >
                        {card.name.slice(0, 70)}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "cards")
                            ?.textAlign
                        }
                      >
                        {card.cardsCount}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "update")
                            ?.textAlign
                        }
                      >
                        {card.updated.slice(0, 10)}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "create")
                            ?.textAlign
                        }
                      >
                        {card.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton disabled={status === "loading"}>
                          <ApiIcon />
                        </IconButton>
                        <IconButton
                          disabled={status === "loading"}
                          onClick={() => deletePackHandler(card._id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          disabled={status === "loading"}
                          onClick={() => updatePackHandler(card._id)}
                        >
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div>Packs not found...</div> //Стилизовать!!!
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationSelect
          disable={status === "loading"}
          cardsTotalCount={totalPacksCount}
          pageCount={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeValue={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
