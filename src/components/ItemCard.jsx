import * as React from "react";

import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { addItem } from "../services/querys";

export default function ItemCard({ item, personagens }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (idPersonagem) => {
    addItem(idPersonagem, item.id);
    setAnchorEl(null);
  };
  return (
    <Card sx={{ width: "calc(100vw - 32px)" }}>
      <CardHeader
        action={
          <React.Fragment>
            <IconButton aria-label="adicionar aos favoritos">
              <FavoriteIcon />
            </IconButton>
            <IconButton
              aria-label="adicione ao jogador"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {personagens.map((option) => {
                return (
                  <MenuItem
                    key={option.id}
                    onClick={() => handleAdd(option.id)}
                  >
                    Adicionar à {option.nome}
                  </MenuItem>
                );
              })}
            </Menu>
          </React.Fragment>
        }
        title={item.nome}
        subheader={item.tag}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Ver Detalhes</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
