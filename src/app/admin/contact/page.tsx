import { Box, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import { api, HydrateClient } from '~/trpc/server';
import TableContact from './components/Table/TableContact';
export const metadata: Metadata = {
  title: 'Quản lý liên hệ của khách ahngf '
};
export default async function ContactManagementPage({
  searchParams
}: {
  searchParams?: {
    s?: string;
    page?: string;
    limit?: string;
  };
}) {
  const s = searchParams?.s || '';
  const currentPage = searchParams?.page || '1';
  const limit = searchParams?.limit ?? '5';
  await Promise.all([
    api.Contact.getAll.prefetch(),
    api.Contact.find.prefetch({ skip: +currentPage, take: +limit, s })
  ]);
  return (
    <HydrateClient>
      <Divider my={'md'} />
      <Stack gap={'lg'} pb={'xl'} mb={'xl'}>
        <Flex align={'center'} justify={'space-between'}>
          <Box>
            <Title mb={4} className='font-quicksand' order={2}>
              Quản lý liên hệ của khách hàng
            </Title>
            <Text size='sm' c={'dimmed'}>
              Danh sách tất cả liên hệ của khách hàng trong hệ thống PhungFood
            </Text>
          </Box>
        </Flex>

        <TableContact />
      </Stack>
    </HydrateClient>
  );
}
