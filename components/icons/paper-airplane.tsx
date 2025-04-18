interface PaperAirplaneProps {
  className?: string
}

export function PaperAirplane({ className = "" }: PaperAirplaneProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0.541622 0.541622C0.0673376 0.788401 -0.120541 1.37741 0.0673376 1.87138L3.00246 10L0.0673376 18.1286C-0.120541 18.6226 0.0673376 19.2116 0.541622 19.4584C0.788401 19.5818 1.03518 19.5818 1.28196 19.5818C1.52874 19.5818 1.77552 19.4584 1.89889 19.335L19.5818 10.8292C19.9521 10.5824 20.0754 10.1118 19.9521 9.64118C19.8287 9.17055 19.4584 8.92377 18.9878 8.80041L1.89889 0.294843C1.52874 0.0480639 0.964906 0.294843 0.541622 0.541622Z" />
    </svg>
  )
}
