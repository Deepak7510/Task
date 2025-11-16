import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

function LoadingButton({
  loadingState = false,
  text = "Save",
  type = "button",
  onClickFunction,
  userClassName = "",
}) {
  return (
    <Button
      className={cn(userClassName)}
      type={type}
      onClick={onClickFunction && onClickFunction()}
      disabled={loadingState}
    >
      {loadingState && <Spinner />}
      {text}
    </Button>
  );
}

export default LoadingButton;
