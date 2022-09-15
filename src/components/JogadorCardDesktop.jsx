import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  Menu,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../services/querys";

export default function JogadorCardDesktop({ personagem }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itens, setItens] = React.useState(personagem.itens);
  const [viewItem, setViewItem] = React.useState({});
  const [openItem, setOpenItem] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (idItem) => {
    removeItem(personagem.id, idItem);
    removeItemArray(idItem);
  };
  const removeItemArray = (idItem) => {
    const newItens = itens.filter((item) => item.id !== idItem);
    setItens(newItens);
  };

  const handleViewItem = (item) => {
    setViewItem(item);
    setOpenItem(true);
  };
  const handleCloseItem = () => {
    setOpenItem(false);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <Tooltip title={`Visualizar itens de ${personagem.nome}`}>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={personagem.nome}
      />
      <CardContent>
        {personagem.status.map((status) => {
          return (
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={Object.keys(status)[0]}
            >
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {Object.keys(status)[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {Object.values(status)[0]}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </CardContent>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Grid container direction="column" padding={2}>
          {itens.map((item, index) => {
            return (
              <Grid
                container
                item
                key={`item-${personagem.nome}-${index}`}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={1}>
                  <Tooltip title="Vizualizar">
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewItem(item)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={10} sx={{ padding: "0vw 2vw" }}>
                  {item.nome}
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Deletar">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Menu>
      <Dialog open={openItem} onClose={handleCloseItem}>
        <CardHeader title={viewItem.nome} subheader={viewItem.tag} />
        <DialogContent>
          <CardMedia
            component="img"
            height="200"
            image={viewItem.imagem}
            alt={viewItem.nome}
            referrerPolicy="no-referrer"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {viewItem.descricao}
            </Typography>
          </CardContent>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
