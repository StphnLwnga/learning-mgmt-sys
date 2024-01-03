import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Renders a Tooltip component with the given trigger and content.
 *
 * @param {React.ReactNode} trigger - The element that triggers the tooltip.
 * @param {React.ReactNode} content - The content to be displayed in the tooltip.
 * @return {JSX.Element} The rendered Tooltip component.
 */
const TooltipComponent = ({ trigger, content }: { trigger: React.ReactNode, content: React.ReactNode }): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipComponent;