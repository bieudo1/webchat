import { useFormContext, Controller } from "react-hook-form";
import { styled,Button } from "@mui/material";
import UploadSingleFile from "../UploadSingleFile";
import { Icon } from "../icon";
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
function FButtonUPloadFile({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          sx={{p: 0,border: "unset"}}
        >
          <Icon.SendPicture/>
          <VisuallyHiddenInput type="file" />
        </Button>
        );
      }}
    />
  );
}

export default FButtonUPloadFile;