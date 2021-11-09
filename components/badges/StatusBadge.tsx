import { Badge } from "@chakra-ui/react"

const StatusBadge = ({ status }: { status: string | undefined }) => {
  let color = 'yellow'
  let statusText = 'waiting'
  if (status === 'failed') {
    color = 'red'
    statusText = 'failed'
  } else if (status === 'success') {
    color = 'green'
    statusText = 'success'
  }
  return (
    <Badge colorScheme={color} >
      {statusText}
    </Badge>
  )
}

export default StatusBadge