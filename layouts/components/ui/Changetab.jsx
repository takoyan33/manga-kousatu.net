import { useEffect, useState, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { database } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { query, orderBy } from "firebase/firestore";
import React from "react";

// type Props = {
//   getData?: () => Promise<void>;
//   handledesSort?: () => Promise<void>;
//   handlelikeSort?: () => Promise<void>;
// };

// eslint-disable-next-line react/display-name
export const Changetab = React.memo(
  ({ handledesSort, getData, handlelikeSort }) => {
    const [firedata, setFiredata] = useState([]);

    const databaseRef = collection(database, "posts");
    const q = query(databaseRef, orderBy("timestamp", "desc"));
    //新しい順
    const u = query(databaseRef, orderBy("timestamp"));
    //古い順
    const f = query(databaseRef, orderBy("likes", "desc"));
    //いいね数順

    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">並び順</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            label="並び順"
          >
            <MenuItem value="新しい順" onClick={getData}>
              新しい順
            </MenuItem>
            <MenuItem value="古い順" onClick={handledesSort}>
              古い順
            </MenuItem>
            <MenuItem value="いいね順" onClick={handlelikeSort}>
              いいね順
            </MenuItem>
          </Select>
        </FormControl>
      </>
    );

    return { firedata };
  }
);
