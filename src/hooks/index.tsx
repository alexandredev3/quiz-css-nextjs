import { ReactNode } from 'react';

import api from '../../services/api';
import { ExternalDBProvider } from './ExternalDBContext';

export async function getServerSideProps() {
  const response = await api({
    baseURL: `http://localhost:3000/api`,
    url: '/externalDb',
    method: 'GET',
  });

  const data = response.data;

  return {
    props: {
      data,
    },
  };
}

export default function AppContext({ children, data }: Props) {
  return <ExternalDBProvider data={data}>{children}</ExternalDBProvider>;
}
