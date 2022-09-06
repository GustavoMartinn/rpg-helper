import * as React from "react";
import {
  Button,
  Typography,
  CardMedia,
  CardContent,
  DialogActions,
  DialogContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { removeItem } from "../services/querys";

export default function ItemDialog({
  item,
  handleClose,
  removeItemArray,
  idPersonagem,
}) {
  const [confirmar1, setConfirmar1] = React.useState(false);
  const [confirmar2, setConfirmar2] = React.useState(false);

  const deleteItem = () => {
    setConfirmar1(false);
    setConfirmar2(false);
    removeItem(idPersonagem, item.id);
    removeItemArray(item.id);
    handleClose();
  };
  return (
    <div>
      {/* <DialogTitle>{item.nome}</DialogTitle>
       */}
      <CardHeader title={item.nome} subheader={item.tag} />
      <DialogContent>
        <CardMedia
          component="img"
          height="200"
          image={item.imagem}
          alt={item.nome}
          referrerPolicy="no-referrer"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.descricao}
          </Typography>
        </CardContent>
      </DialogContent>
      <DialogActions>
        {!confirmar1 && !confirmar2 && (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => setConfirmar1(true)}
          >
            Excluir do Inventario
          </Button>
        )}
        {confirmar1 && !confirmar2 && (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => setConfirmar2(true)}
          >
            Certeza?
          </Button>
        )}
        {confirmar1 && confirmar2 && (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={deleteItem}
          >
            Essa ação não pode ser desfeita
          </Button>
        )}
      </DialogActions>
    </div>
  );
}
