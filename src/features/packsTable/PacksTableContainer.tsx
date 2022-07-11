import React from "react";
import { useAppSelector } from "../../bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { isLoggedInSelector } from "../../bll/reducers/auth-reducer";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { Box, Button } from "@mui/material";
import { PacksTable } from "./PacksTable";
import style from "./PacksTableContainer.module.css";
import { ListType } from "../../utils/enum";

export const PacksTableContainer: React.FC = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(appStatusSelect);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listType, setListType] = React.useState(ListType.All);

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
              onClick={() => setListType(ListType.My)}
            >
              my
            </Button>
            <Button
              variant="contained"
              size={"small"}
              onClick={() => setListType(ListType.All)}
            >
              all
            </Button>
          </Grid>

          <Grid item xs={10} className={style.rightSide}>
            <h4 className={style.rightTitle}>Packs list</h4>
            <PacksTable
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              listType={listType}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
