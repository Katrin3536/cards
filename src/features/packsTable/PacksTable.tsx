import React, { useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import {
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import ApiIcon from "@mui/icons-material/Api";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";
import { getPacksListTC } from "../../bll/reducers/packs-reducer";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { useNavigate } from "react-router-dom";

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

export function PacksTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("update");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPacksCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );
  const packsSelector = useAppSelector((state) => state.packs.packsCards);

  useEffect(() => {
    dispatch(getPacksListTC(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

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

  const labelDisplayedRows = ({ from, to, count }: any) => {
    return `${page + 1} of ${Math.ceil(count / rowsPerPage)}`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer>
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
              {stableSort(packsSelector, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((card, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={index}
                      onClick={() =>
                        navigate(PATH.CARDS_LIST, {
                          state: { pack_id: card._id },
                        })
                      }
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align={
                          headCells.find((cell) => cell.id === "name")
                            ?.textAlign
                        }
                        style={{ paddingLeft: "30px" }}
                      >
                        {card.name}
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
                        {card.created.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <ApiIcon />
                        </IconButton>
                        <IconButton>
                          <Delete />
                        </IconButton>
                        <IconButton>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Packs per page:"}
          showFirstButton={true}
          showLastButton={true}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={totalPacksCount ? totalPacksCount : packsSelector.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={labelDisplayedRows}
        />
      </Paper>
    </Box>
  );
}
