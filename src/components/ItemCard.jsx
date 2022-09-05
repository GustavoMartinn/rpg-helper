import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
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
