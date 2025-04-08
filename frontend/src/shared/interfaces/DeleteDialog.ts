export interface IdeleteDialog {
  show: boolean;
  tittle: string;
  Onclose: () => void;
  handleDelete: () => void;
}
