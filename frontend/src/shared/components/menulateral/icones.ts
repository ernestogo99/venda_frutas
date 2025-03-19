import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {
  LocationCity,
  People,
  SvgIconComponent,
  Restaurant,
  PointOfSale,
} from "@mui/icons-material";
import { Star } from "@mui/icons-material";

const iconMapping: Record<string, SvgIconComponent> = {
  home: HomeIcon,
  info: InfoIcon,
  star: Star,
  city: LocationCity,
  contact_mail: ContactMailIcon,
  people: People,
  restaurant: Restaurant,
  sale: PointOfSale,
};

export default iconMapping;
