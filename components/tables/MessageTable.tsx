import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { MessageProps } from 'pages/message'
import StatusBadge from 'components/badges/StatusBadge'
import { DateFormatter } from 'components/formatter/DateFormatter'

type MessageTableProps = {
  data: MessageProps[]
}

export default function MessageTable({ data }: MessageTableProps) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Phone Number</Th>
          <Th>Message</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          data?.map((message: MessageProps) => (
            <Tr key={message.id}>
              <Td>{DateFormatter(message.createdAt)}</Td>
              <Td>{message.phoneNumber}</Td>
              <Td>
                {message.message}
              </Td>
              <Td>
                <StatusBadge status={message.status} />
              </Td>
            </Tr>
          ))
        }
      </Tbody>
    </Table>
  )
}
