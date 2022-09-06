import {
  Button,
  CardMedia,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import ItemDialog from "../components/ItemDialog";
import { getInventario, getStatus, updateStatus } from "../services/querys";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";

export default function Inventario() {
  const [itens, setItens] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [novoStatus, setNovoStatus] = React.useState("");
  const [item, setItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const campanha = urlParams.get("campanha");
  const personagem = urlParams.get("jogador");
  const id = urlParams.get("id");

  const removeItem = (itemId) => {
    setItens(itens.filter((i) => i.id !== itemId));
  };

  React.useEffect(() => {
    (async () => {
      await getInventario(id).then((res) => {
        setItens(res);
      });
    })();
    (async () => {
      await getStatus(id).then((res) => {
        setStatus(res);
      });
    })();
  }, []);

  const visualizarItens = (item) => {
    setItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (index, value, key) => {
    let statusCopy = JSON.parse(JSON.stringify(status));
    statusCopy[index][key] = value;
    setStatus(statusCopy);
  };

  const handleDeleteStatus = (index) => {
    let statusCopy = JSON.parse(JSON.stringify(status));
    statusCopy.splice(index, 1);
    setStatus(statusCopy);
  };

  const handleAddStatus = () => {
    let statusCopy = JSON.parse(JSON.stringify(status));
    const novoObjeto = '{"' + novoStatus + '": "0"}';
    JSON.parse(novoObjeto);
    statusCopy.push(JSON.parse(novoObjeto));
    setStatus(statusCopy);
    setNovoStatus("");
  };

  const handleUpdateStatus = async () => {
    setLoading(true);
    await updateStatus(id, JSON.stringify(status)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography variant="h6" component="div">
                {personagem}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">{campanha}</Typography>
            </Grid>
          </Grid>
          <IconButton
            sx={{ position: "absolute", right: 0 }}
            aria-label="reload"
            onClick={() => {
              document.location.reload(true);
            }}
          >
            <CachedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid sx={{ margin: "56px" }}></Grid>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" component="div">
            Status do Personagem
          </Typography>
        </Grid>
        <Grid container item direction="column">
          {status.map((status, index) => {
            return (
              <Grid
                container
                item
                justifyContent="space-between"
                alignItems="flex-end"
                key={Object.keys(status)[0]}
                sx={{ margin: "8px 0px" }}
              >
                <Grid item xs={10} sx={{ padding: "0px 16px" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-name"
                    label={`${Object.keys(status)[0]}`}
                    variant="standard"
                    value={Object.values(status)[0]}
                    onChange={(event) =>
                      handleChange(
                        index,
                        event.target.value,
                        Object.keys(status)[0]
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2} sx={{ padding: "0px 16px" }}>
                  <IconButton
                    sx={{ padding: 0 }}
                    aria-label="delete"
                    onClick={() => handleDeleteStatus(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ margin: "8px 0px" }}
          >
            <Grid item xs={10} sx={{ padding: "0px 16px" }}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-name"
                label="Nome do novo status"
                variant="standard"
                value={novoStatus}
                onChange={(event) => setNovoStatus(event.target.value)}
              />
            </Grid>
            <Grid item xs={2} sx={{ padding: "0px 16px" }}>
              <IconButton
                sx={{ padding: 0 }}
                aria-label="delete"
                onClick={handleAddStatus}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="end"
          alignItems="center"
          sx={{ margin: "8px 8px" }}
        >
          <Button
            variant="contained"
            onClick={handleUpdateStatus}
            disabled={loading}
          >
            Salvar Status {loading && <CircularProgress size={24} />}
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6" component="div">
              Inventário
            </Typography>
          </Grid>
        </Grid>
        {itens.map((item) => (
          <Button
            key={item.id}
            sx={{
              width: "20vw",
              height: "20vw",
              padding: 0,
              margin: "1vw",
              border: "3px solid #3B3B3B",
              borderRadius: "10px",
            }}
            onClick={() => visualizarItens(item)}
          >
            <CardMedia
              component="img"
              height="100%"
              image={item.imagem}
              alt={item.nome}
              referrerPolicy="no-referrer"
              sx={{ borderRadius: "10px" }}
            />
          </Button>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <ItemDialog
          item={item}
          idPersonagem={id}
          handleClose={handleClose}
          removeItemArray={removeItem}
        />
      </Dialog>
    </React.Fragment>
  );
}
