import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { MdModeEdit, MdDelete, MdAddCircle } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import PropTypes from "prop-types";
// Dialog
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: 1,
        height: 1,
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};

const TableGrid = ({ rows, coloums }) => {
  const [open, setOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);

  const handleEdit = (e) => {
    alert("Edit Item");
  };

  const handleDelete = (e) => {
    alert("Delete Item");
  };

  const cellExpandOption = {
    renderCell: renderCellExpand,
  };

  const mergeRenderCellExpand = coloums.map((item) => {
    return { ...item, ...cellExpandOption };
  });

  const coloumsData = [
    ...mergeRenderCellExpand,
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: () => [
        <GridActionsCellItem
          icon={<MdModeEdit />}
          label="Edit"
          onClick={handleEdit}
        />,

        <GridActionsCellItem
          icon={<MdDelete />}
          label="Delete"
          onClick={handleDelete}
        />,
      ],
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />

        <Button onClick={handleDialogOpen}>
          <MdAddCircle /> Add
        </Button>
        {/* <GridToolbarFilterButton /> */}
        {/* <GridToolbarDensitySelector /> */}
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }

  //Dialog
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ height: 450, width: "100%" }}>
      <DataGrid
        columns={coloumsData}
        rows={rows}
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        rowCount={100}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ADD Data"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField id="outlined-basic" label="age" variant="outlined" />
              <TextField
                id="outlined-basic"
                label="address"
                variant="outlined"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Add</Button>
          <Button onClick={handleDialogClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableGrid;
