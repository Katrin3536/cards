import * as React from "react";
import { alpha } from "@mui/material/styles";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Button from "@mui/material/Button";
import GradeIcon from "@mui/icons-material/Grade";
import style from "./CardsTable.module.css";
import { addCardTC, getCardsListTC } from "../../bll/reducers/cards-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getPacksListTC } from "../../bll/reducers/packs-reducer";
import { PATH } from "../common/routes/RoutesConstants";
import { useNavigate } from "react-router-dom";

interface Data {
  question: string;
  answer: string;
  lastUpdated: string;
  grade: string;
}
function createData(
  question: string,
  answer: string,
  lastUpdated: string,
  grade: string
): Data {
  return {
    question,
    answer,
    lastUpdated,
    grade,
  };
}

const rows = [
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
  createData(
    "What is WebWorker?",
    "It is a service...",
    new Date().toLocaleDateString(),
    "star"
  ),
];

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
  numeric: boolean;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "question",
    numeric: false,
    disablePadding: false,
    label: "Question",
  },
  {
    id: "answer",
    numeric: true,
    disablePadding: false,
    label: "Answer",
  },
  {
    id: "lastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last Updated",
    sortable: true,
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Button style={{ marginRight: "10px" }}>
        <ArrowBackOutlinedIcon />
      </Button>
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
  const [orderBy, setOrderBy] = React.useState<keyof Data>("answer");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useAppDispatch();

  const cardsSelector = useAppSelector((state) => state.cards.cards);

  const cardsForRender = cardsSelector.map((card) => card.question);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getPacksListTC(1, 8));

    dispatch(getCardsListTC(1, 8, "62c551acbe53c41174945eec"));
    dispatch(
      addCardTC(1, 8, "React???", "Library", "62c551acbe53c41174945eec")
    );
  }, []);

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
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const labelDisplayedRows = ({ from, to, count }: any) => {
    console.log(from, to, count, rows.length);
    return `${page + 1} of ${Math.ceil(count / rowsPerPage)}`;
  };

  return (
    <Box className={style.container}>
      <Paper sx={{ width: "100%", mb: 5 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort<Data>(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.question);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      onClick={() =>
                        navigate(PATH.CARD_INFO, {
                          state: { question: row.question, answer: row.answer },
                        })
                      }
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.question}
                      </TableCell>
                      <TableCell align="right">{row.answer}</TableCell>
                      <TableCell align="right">{row.lastUpdated}</TableCell>
                      <TableCell align="right">
                        <GradeIcon fontSize="small" />
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
          count={rows.length}
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
