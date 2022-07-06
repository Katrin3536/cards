import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Button from '@mui/material/Button';
import GradeIcon from '@mui/icons-material/Grade';
import style from './CardsTable.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from '../../../components/common/routes/RoutesConstants';

interface Data {
    question: string,
    answer: string,
    lastUpdated: Date,
    grade: string,
}

function createData(
    question: string,
    answer: string,
    lastUpdated: Date,
    grade: string,
): Data {
    return {
        question,
        answer,
        lastUpdated,
        grade,
    };
}


const rows = [
    createData('What is WebWorker?', 'It is a service...', new Date('7/6/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('6/6/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('11/5/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('3/3/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('6/2/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('12/17/2021')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('1/24/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('9/5/2022')/*.toLocaleDateString()*/, 'star'),
    createData('What is WebWorker?', 'It is a service...', new Date('1/1/2022')/*.toLocaleDateString()*/, 'star'),
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

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: any, b: any) => number) {
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
    textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
    sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'question',
        textAlign: 'left',
        disablePadding: false,
        label: 'Question',
    },
    {
        id: 'answer',
        textAlign: 'left',
        disablePadding: true,
        label: 'Answer',
    },
    {
        id: 'lastUpdated',
        textAlign: 'right',
        disablePadding: true,
        label: 'Last Updated',
        sortable: true,
    },
    {
        id: 'grade',
        textAlign: 'center',
        disablePadding: false,
        label: 'Grade',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
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
                        {headCell.sortable ?
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                            : headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = () => {

    return (
        <Toolbar>
            <Link to={PATH.REGISTRATION}>
                <Button style={{marginRight: '10px'}}>
                    <ArrowBackOutlinedIcon/>
                </Button>
            </Link>
            <Typography
                sx={{flex: '1 1 100%'}}
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
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('lastUpdated');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const navigate = useNavigate();

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const labelDisplayedRows = ({from, to, count}: any) => {
        console.log(from, to, count, rows.length);
        return `${page + 1} of ${Math.ceil(count / rowsPerPage)}`;
    };

    return (
        <Box className={style.container}>
            <EnhancedTableToolbar/>
            <input type={'text'} placeholder={'Search...'} style={{margin: '0 0 16px 0'}}/>
            <Paper sx={{width: '100%', mb: 5}}>
                <TableContainer className={style[`table-container`]}>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort<Data>(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            key={row.question}
                                            onClick={()=> navigate(PATH.PROFILE, {
                                                state: { question: row.question, answer: row.answer }})
                                            }>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align={headCells.find(cell => cell.id === 'question')?.textAlign}
                                            >
                                                {row.question}
                                            </TableCell>
                                            <TableCell
                                                padding="normal"
                                                align={headCells.find(cell => cell.id === 'answer')?.textAlign}>{row.answer}</TableCell>
                                            <TableCell
                                                padding="normal"
                                                align={headCells.find(cell => cell.id === 'lastUpdated')?.textAlign}>
                                                {row.lastUpdated.toLocaleDateString()}
                                            </TableCell>
                                            <TableCell
                                                padding="normal"
                                                align={headCells.find(cell => cell.id === 'grade')?.textAlign}>
                                                <GradeIcon style={{color: 'rgba(33, 38, 143, 1)'}} fontSize="small"/>
                                                <GradeIcon fontSize="small"/>
                                                <GradeIcon fontSize="small"/>
                                                <GradeIcon fontSize="small"/>
                                                <GradeIcon fontSize="small"/>
                                            </TableCell>
                                            {/*<TableCell align="right"><button>Learn</button></TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage={'Cards per page:'}
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
