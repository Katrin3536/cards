import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Button from "@mui/material/Button";
import GradeIcon from "@mui/icons-material/Grade";
import style from "./CardsTable.module.css";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getCardsListTC } from "../../bll/reducers/cards-reducer";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Data {
  question: string;
  answer: string;
  lastUpdated: Date;
  grade: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: any, b: any) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "question",
    textAlign: "left",
    disablePadding: false,
    label: "Question",
  },
  {
    id: "answer",
    textAlign: "left",
    disablePadding: true,
    label: "Answer",
  },
  {
    id: "lastUpdated",
    textAlign: "right",
    disablePadding: true,
    label: "Last Updated",
    sortable: true,
  },
  {
    id: "grade",
    textAlign: "center",
    disablePadding: false,
    label: "Grade",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.textAlign}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Link to={PATH.PACKS_LIST}>
        <Button style={{ marginRight: "10px" }}>
          <ArrowBackOutlinedIcon />
        </Button>
      </Link>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Pack Name
      </Typography>
    </Toolbar>
  );
};

export const CardsTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("lastUpdated");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cardsSelector = useAppSelector((state) => state.cards.cards);
  const cardsTotalCountSelector = useAppSelector(
    (state) => state.cards.cardsTotalCount
  );

  interface LocationType {
    pack_id: string;
  }

  const location = useLocation();
  let { pack_id } = location.state as LocationType;

  React.useEffect(() => {
    dispatch(getCardsListTC(page, rowsPerPage, pack_id));
  }, [dispatch, page, rowsPerPage, pack_id]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const labelDisplayedRows = ({ from, to, count }: any) => {
    console.log(from, to, count, cardsTotalCountSelector);
    return `${page} of ${Math.ceil(count / rowsPerPage)}`;
  };

  // ==== SEARCHING =====

  const [value, setValue] = React.useState("");

  const filteredData = cardsSelector.filter((card) =>
    card.question.toLowerCase().includes(value.toLowerCase())
  );

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  return (
    <Box className={style.container}>
      <EnhancedTableToolbar />
      <div style={{ marginBottom: "20px" }}>
        <TextField
          fullWidth={true}
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
      </div>
      <Paper sx={{ width: "100%", mb: 5 }}>
        <TableContainer className={style[`table-container`]}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                // .slice(1, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={index}
                      onClick={() =>
                        navigate(
                          PATH.CARD_INFO,

                          {
                            // replace: true,
                            state: {
                              question: row.question,
                              answer: row.answer,
                              pack_id: pack_id,
                            },
                          }
                        )
                      }
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "question")
                            ?.textAlign
                        }
                      >
                        {row.question}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "answer")
                            ?.textAlign
                        }
                      >
                        {row.answer}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "lastUpdated")
                            ?.textAlign
                        }
                      >
                        {row.updated.slice(0, 10)}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "grade")
                            ?.textAlign
                        }
                      >
                        <GradeIcon
                          style={{ color: "rgba(33, 38, 143, 1)" }}
                          fontSize="small"
                        />
                        <GradeIcon fontSize="small" />
                        <GradeIcon fontSize="small" />
                        <GradeIcon fontSize="small" />
                        <GradeIcon fontSize="small" />
                      </TableCell>
                      {/*<TableCell align="right"><button>Learn</button></TableCell>*/}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Cards per page:"}
          showFirstButton={true}
          showLastButton={true}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cardsTotalCountSelector}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={labelDisplayedRows}
        />
      </Paper>
    </Box>
  );
};
