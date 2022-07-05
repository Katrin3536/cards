import React from "react";
import TableBody from '@mui/material/TableBody';
import {Button, IconButton, Paper, Table, TableContainer, TableHead, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Delete} from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import ApiIcon from '@mui/icons-material/Api';
import TablePagination from "@mui/material/TablePagination";

export type cardType = {
    _id: string
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string
}


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'Cards',
        numeric: true,
        disablePadding: false,
        label: 'Cards',
    },
    {
        id: 'LastUpdated',
        numeric: true,
        disablePadding: false,
        label: 'Last updated',
    },
    {
        id: 'CreatedBy',
        numeric: true,
        disablePadding: false,
        label: 'Created by',
    },
    {
        id: 'Actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

export function EnhancedTableHead() {

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}


export default function EnhancedTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const totalPacksCount = useSelector<AppRootStateType, number | null>(state => state.cards.cardPacksTotalCount)
    const cardPacks = useSelector<AppRootStateType, any>(state => state.cards.cardPacks)



    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        size={'medium'}
                    >
                        <EnhancedTableHead/>
                        <TableBody>
                            {

                                cardPacks.map((card: cardType, index: number) => {

                                return (
                                    <TableRow hover>

                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            {card.name}
                                        </TableCell>
                                        <TableCell align="right">{card.cardsCount}</TableCell>
                                        <TableCell align="right">{card.updated}</TableCell>
                                        <TableCell align="right">{card.created}</TableCell>
                                        <TableCell align="right">
                                            <IconButton>
                                                <ApiIcon />
                                            </IconButton>
                                            <IconButton>
                                                <Delete/>
                                            </IconButton>
                                            <IconButton>
                                                <CreateIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalPacksCount ? totalPacksCount : cardPacks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}
