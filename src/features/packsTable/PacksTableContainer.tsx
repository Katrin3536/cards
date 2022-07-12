import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { isLoggedInSelector } from "../../bll/reducers/auth-reducer";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { Box, Button } from "@mui/material";
import { PacksTable } from "./PacksTable";
import style from "./PacksTableContainer.module.css";
import { SuperDoubleRange } from "../../components/common/superDoubleRange/SuperDoubleRange";
import {
  getPacksListTC,
  getRangeredPacksListTC,
  getUserPacksListTC,
  pageCountSelect,
  pageSelect,
} from "../../bll/reducers/packs-reducer";
import { userIDSelect } from "../../bll/reducers/profile-reducer";

export const PacksTableContainer: React.FC = () => {
  const [allPacks, setAllPacks] = useState(0);
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(appStatusSelect);
  const page = useAppSelector(pageSelect);
  const rowsPerPage = useAppSelector(pageCountSelect);
  const userID = useAppSelector(userIDSelect);

  useEffect(() => {
    dispatch(getPacksListTC(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage, allPacks]);

  const changeRangeHandler = (value_1: number, value_2: number) => {
    dispatch(getRangeredPacksListTC(page, rowsPerPage, value_1, value_2));
  };

  const getMyListHandler = () => {
    dispatch(getUserPacksListTC(userID));
  };

  const getAllListHandler = () => {
    setAllPacks(1);
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Box className={style.container}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={2} className={style.leftSide}>
            <h4 className={style.leftTitle}>Show packs cards</h4>
            <Button
              variant="contained"
              size={"small"}
              style={{ marginRight: "10px" }}
              onClick={getMyListHandler}
            >
              my
            </Button>
            <Button
              variant="contained"
              size={"small"}
              onClick={getAllListHandler}
            >
              all
            </Button>
            <div className={style.slider}>
              <h4 className={style.leftTitle}>Number of cards</h4>
              <SuperDoubleRange
                onChangeRange={changeRangeHandler}
                className={style.range}
                status={status}
              />
            </div>
          </Grid>

          <Grid item xs={10} className={style.rightSide}>
            <h4 className={style.rightTitle}>Packs list</h4>
            <PacksTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
